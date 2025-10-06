import React from 'react'
import { ThemeContext } from '../theme/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = React.useContext(ThemeContext)
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-md text-sm font-medium border border-[var(--border)] hover:bg-[var(--surface-2)] transition"
      aria-label="Toggle color theme"
      title="Toggle theme"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
