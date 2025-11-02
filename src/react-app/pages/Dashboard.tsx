import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type User = { id: number; first_name: string; email: string } | null

export default function Dashboard() {
  const { t } = useTranslation('common')
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
      <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
      
      {/* Welcome Card */}
      <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
        <p className="text-lg">
          {user ? <>{t('dashboard.greeting')} <span className="font-semibold">{user.first_name}</span> 👋</> : t('dashboard.loading')}
        </p>
        <p className="text-[var(--muted)] mt-2">{t('dashboard.description')}</p>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <div className="card p-6">
          <div className="text-2xl font-bold text-[var(--accent)]">3</div>
          <div className="text-sm text-[var(--muted)] mt-1">{t('dashboard.activeProjects')}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-[var(--accent)]">12</div>
          <div className="text-sm text-[var(--muted)] mt-1">{t('dashboard.completedProjects')}</div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-[var(--accent)]">98%</div>
          <div className="text-sm text-[var(--muted)] mt-1">{t('dashboard.uptime')}</div>
        </div>
      </div>

      {/* Current Projects */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.currentProjects')}</h2>
        <div className="space-y-4">
          <div className="card p-6 hover:translate-y-[-2px] transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{t('dashboard.project1Title')}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{t('dashboard.project1Desc')}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span>⏱️ {t('dashboard.dueIn')} 5 {t('dashboard.days')}</span>
                  <span>📊 {t('dashboard.progress')}: 75%</span>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                {t('dashboard.onTrack')}
              </span>
            </div>
            <div className="mt-4 h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="card p-6 hover:translate-y-[-2px] transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{t('dashboard.project2Title')}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{t('dashboard.project2Desc')}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span>⏱️ {t('dashboard.dueIn')} 12 {t('dashboard.days')}</span>
                  <span>📊 {t('dashboard.progress')}: 45%</span>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {t('dashboard.inProgress')}
              </span>
            </div>
            <div className="mt-4 h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="card p-6 hover:translate-y-[-2px] transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{t('dashboard.project3Title')}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{t('dashboard.project3Desc')}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span>⏱️ {t('dashboard.dueIn')} 3 {t('dashboard.days')}</span>
                  <span>📊 {t('dashboard.progress')}: 90%</span>
                </div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                {t('dashboard.review')}
              </span>
            </div>
            <div className="mt-4 h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.recentActivity')}</h2>
        <div className="card p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm">{t('dashboard.activity1')}</p>
                <p className="text-xs text-[var(--muted)] mt-1">2 {t('dashboard.hoursAgo')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm">{t('dashboard.activity2')}</p>
                <p className="text-xs text-[var(--muted)] mt-1">5 {t('dashboard.hoursAgo')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm">{t('dashboard.activity3')}</p>
                <p className="text-xs text-[var(--muted)] mt-1">1 {t('dashboard.dayAgo')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickActions')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="card p-6 text-left hover:translate-y-[-2px] transition">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold">{t('dashboard.newTicket')}</div>
            <div className="text-xs text-[var(--muted)] mt-1">{t('dashboard.newTicketDesc')}</div>
          </button>
          <button className="card p-6 text-left hover:translate-y-[-2px] transition">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">{t('dashboard.viewReports')}</div>
            <div className="text-xs text-[var(--muted)] mt-1">{t('dashboard.viewReportsDesc')}</div>
          </button>
          <button className="card p-6 text-left hover:translate-y-[-2px] transition">
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold">{t('dashboard.contactTeam')}</div>
            <div className="text-xs text-[var(--muted)] mt-1">{t('dashboard.contactTeamDesc')}</div>
          </button>
          <button className="card p-6 text-left hover:translate-y-[-2px] transition">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-semibold">{t('dashboard.documentation')}</div>
            <div className="text-xs text-[var(--muted)] mt-1">{t('dashboard.documentationDesc')}</div>
          </button>
        </div>
      </div>
    </div>
  )
}
