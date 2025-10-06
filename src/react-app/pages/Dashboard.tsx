import { useEffect, useState } from 'react'

type User = { id: number; first_name: string; email: string } | null

export default function Dashboard() {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/auth/me').then(async (r) => {
      const data = await r.json()
      if (mounted) setUser(data.user ?? null)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-4 rounded-xl border border-neutral-800 p-6">
        <p className="text-lg">
          {user ? <>Hey <span className="font-semibold">{user.first_name}</span> 👋</> : 'Loading…'}
        </p>
        <p className="text-neutral-400 mt-2">Here’s your space. We’ll surface recent activity, saved projects, and settings.</p>
      </div>
    </div>
  )
}
