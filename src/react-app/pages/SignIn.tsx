import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Turnstile from '../components/Turnstile'

type NavState = { from?: { pathname?: string } }

export default function SignIn() {
  const nav = useNavigate()
  const loc = useLocation()
  const state = (loc.state ?? {}) as NavState
  const [token, setToken] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (!token) { alert('Complete Turnstile'); return }
    const r = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: String(fd.get('email') || ''),
        password: String(fd.get('password') || ''),
        turnstileToken: token,
        locale: 'en'
      })
    })
    if (!r.ok) { alert('Invalid credentials'); return }
    const to = state.from?.pathname ?? '/dashboard'
    nav(to, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" placeholder="Email" type="email" className="input" required />
        <input name="password" placeholder="Password" type="password" className="input" required />
        <Turnstile onToken={setToken} />
        <button className="btn-primary w-full" type="submit">Sign in</button>
      </form>
      <p className="text-sm text-neutral-400 mt-3">New here? <Link to="/signup" className="underline">Create an account</Link></p>
    </div>
  )
}
