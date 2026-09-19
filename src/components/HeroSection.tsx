import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import type { Profile } from "@/lib/data";

type HeroProps = {
  profile: Profile | null;
};

export default function HeroSection({ profile }: HeroProps) {
  const name = profile?.fullName || "Bagas Ramadhan Rusnadi";
  const title = profile?.title || "Software Engineer";
  const heroTitle = profile?.heroTitle || "I Build Things For The Web.";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-glow pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[var(--glow-primary)] rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--glow-accent)] rounded-full blur-[100px] opacity-30" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="eyebrow">{title}</span>
            </div>

            {/* Main heading */}
            <h1 className="font-[family-name:var(--font-display)] font-bold leading-[1.1] tracking-tight mb-6">
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[var(--text)]">{heroTitle}</span>
            </h1>

            {/* Name & intro */}
            <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Hi, I&apos;m <span className="text-[var(--text)] font-semibold">{name}</span>. I craft performant, elegant digital experiences from front to back.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <a href="#projects" className="btn btn-primary btn-lg group">
                View My Work
                <HiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                <HiDownload size={18} />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <span className="text-sm text-[var(--text-muted)] font-medium">Connect</span>
              <div className="flex items-center gap-2">
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--accent-border)] transition-all"
                    title="Email"
                    aria-label="Send email"
                  >
                    <MdEmail size={17} />
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--accent-border)] transition-all"
                    title="LinkedIn"
                    aria-label="LinkedIn profile"
                  >
                    <FaLinkedin size={15} />
                  </a>
                )}
                {profile?.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--accent-border)] transition-all"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Profile image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-30 blur-2xl scale-110" />

              {/* FRAME UTAMA (Border background) */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl border border-accent-border shadow-2xl">
                {/* 1. LAYER DALAM: Terpotong rapi di dalam rounded border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {/* Background Gradient / Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent z-10" />

                  {/* Foto badan bawah */}
                  <div className="absolute inset-x-0 bottom-0 h-[125%] origin-bottom">
                    <Image src="/assets/hero-section-photo.png" alt={name} fill className="object-contain object-bottom" priority sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px" />
                  </div>
                </div>

                {/* 2. LAYER LUAR (POP-OUT): Kepala & bahu keluar border */}
                {/* [mask-image:linear-gradient(to_bottom,black_60%,transparent_60%)] memotong separuh badan ke bawah agar tidak menabrak border bawah */}
                <div className="absolute inset-x-0 bottom-0 h-[125%] origin-bottom pointer-events-none z-20 [mask-image:linear-gradient(to_bottom,black_65%,transparent_65%)]">
                  <Image src="/assets/hero-section-photo.png" alt="" aria-hidden="true" fill className="object-contain object-bottom" priority sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 card px-4 py-2 bg-[var(--surface-elevated)] border border-[var(--accent-border)] z-30">
                <span className="text-xs text-[var(--text-muted)] block">Available for</span>
                <span className="text-sm font-semibold text-[var(--success)]">● Freelance / Full-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--text-muted)]">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
