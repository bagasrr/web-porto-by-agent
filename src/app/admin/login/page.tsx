'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="brutal-border brutal-shadow-lg bg-card-bg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-space-mono)] mb-6 text-center">Admin Login</h1>
        
        {error && (
          <div className="bg-accent-red text-white font-bold p-3 mb-4 brutal-border">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 brutal-border focus:outline-none focus:bg-accent-yellow transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 brutal-border focus:outline-none focus:bg-accent-yellow transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-6 brutal-btn bg-accent-blue text-white py-3 font-bold text-lg"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
