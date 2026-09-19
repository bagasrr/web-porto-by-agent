"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiLockClosed, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-glow px-4">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-glow-primary rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold font-display text-text hover:text-accent transition-colors">
            BRR<span className="text-accent">.</span>
          </Link>
          <p className="text-text-muted text-sm mt-2">Content Management</p>
        </div>

        <div className="card">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-dark-burgundy border border-accent-border flex items-center justify-center">
              <HiLockClosed size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="font-bold text-text font-display">Admin Login</h1>
              <p className="text-xs text-text-muted">Sign in to manage your portfolio</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="toast toast-error mb-5" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="label" htmlFor="login-email">
                Email
              </label>
              <input id="login-email" type="email" className="input" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor="login-password">
                Password
              </label>
              <input id="login-password" type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full group mt-2">
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-text-muted hover:text-text transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
