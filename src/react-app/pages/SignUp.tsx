import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Turnstile from '../components/Turnstile'

export default function SignUp() {
  const nav = useNavigate()
  const [token, setToken] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (!token) { alert('Complete Turnstile'); return }
    const r = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        firstName: String(fd.get('firstName') || ''),
        email: String(fd.get('email') || ''),
        password: String(fd.get('password') || ''),
        turnstileToken: token,
        locale: 'en'
      })
    })
    if (!r.ok) { alert('Sign up failed'); return }
    nav('/dashboard', { replace: true })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="firstName" placeholder="First name" className="input" required />
        <input name="email" placeholder="Email" type="email" className="input" required />
        <input name="password" placeholder="Password" type="password" className="input" required />
        <Turnstile onToken={setToken} />
        <button className="btn-primary w-full" type="submit">Create account</button>
      </form>
      <p className="text-sm text-neutral-400 mt-3">Have an account? <Link to="/signin" className="underline">Sign in</Link></p>
    </div>
  )
}
