import React from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookieConsent()
    if (consent === null) {
      // No choice made yet, show banner
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent('accepted')
    setVisible(false)
  }

  const handleReject = () => {
    setCookieConsent('rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--surface-1)] border-t border-[var(--border)] shadow-lg">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-[var(--fg)]">
            We use cookies to remember your language preference and keep you signed in. 
            By clicking "Accept", you consent to our use of essential cookies. 
            <Link to="/" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openPrivacy')) }} className="underline ml-1 hover:text-[var(--fg-muted)]">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-[var(--border)] rounded-md hover:bg-[var(--surface-2)] transition"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper functions to manage cookie consent
function getCookieConsent(): 'accepted' | 'rejected' | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'cookie_consent') {
      return value as 'accepted' | 'rejected'
    }
  }
  return null
}

function setCookieConsent(value: 'accepted' | 'rejected') {
  // Set cookie for 1 year (365 days)
  const maxAge = 365 * 24 * 60 * 60 // 1 year in seconds
  document.cookie = `cookie_consent=${value}; max-age=${maxAge}; path=/; SameSite=Lax`
}
