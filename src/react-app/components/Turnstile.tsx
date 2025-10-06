import React from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: {
        sitekey: string
        callback: (token: string) => void
        theme?: 'light' | 'dark'
      }) => string | number
      reset: (id: string | number) => void
      remove: (id: string | number) => void
    }
    __cfTurnstileScriptAdded?: boolean
  }
}

type Props = {
  onToken: (t: string) => void
  theme?: 'light' | 'dark'
  className?: string
}

const FALLBACK_TEST_KEY = '1x00000000000000000000AA'

export default function Turnstile({ onToken, theme, className }: Props) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const widgetIdRef = React.useRef<string | number | null>(null)
  const [siteKey, setSiteKey] = React.useState<string | null>(null)

  // Inject script once globally
  React.useEffect(() => {
    const src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    if (!window.__cfTurnstileScriptAdded && !document.querySelector(`script[src="${src}"]`) && !window.turnstile) {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.defer = true
      s.setAttribute('data-cf-turnstile-script', '1')
      document.head.appendChild(s)
      window.__cfTurnstileScriptAdded = true
    }
  }, [])

  // Fetch the public site key from Worker
  React.useEffect(() => {
    let on = true
    fetch('/api/turnstile/sitekey', { credentials: 'include' })
      .then((r) => r.json())
      .then((j) => { if (on) setSiteKey(j.siteKey || FALLBACK_TEST_KEY) })
      .catch(() => { if (on) setSiteKey(FALLBACK_TEST_KEY) })
    return () => { on = false }
  }, [])

  // Render widget when ready
  React.useEffect(() => {
    let alive = true
    const tryRender = () => {
      if (!alive) return
      if (!siteKey || !window.turnstile || !hostRef.current) {
        setTimeout(tryRender, 80)
        return
      }
      if (widgetIdRef.current != null) {
        try { window.turnstile.reset(widgetIdRef.current) } catch {
            // ignore
        }
      }
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        theme
      })
    }
    tryRender()
    return () => { alive = false }
  }, [siteKey, theme, onToken])

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (widgetIdRef.current != null && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current) } catch {
            // ignore
        }
      }
    }
  }, [])

  return <div ref={hostRef} className={className} />
}
