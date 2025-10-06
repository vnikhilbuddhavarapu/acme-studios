import React from 'react'

type Theme = 'dark' | 'light'
type Ctx = { theme: Theme; toggle: () => void; set: (t: Theme) => void }
export const ThemeContext = React.createContext<Ctx>({ theme: 'dark', toggle: () => {}, set: () => {} })

const THEME_KEY = 'theme'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const fromCookie = /(?:^|;\s*)theme=(dark|light)/.exec(document.cookie)?.[1] as Theme | undefined
    const fromStorage = (localStorage.getItem(THEME_KEY) as Theme | null) ?? undefined
    return fromCookie ?? fromStorage ?? 'dark'
  })

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
    document.cookie = `theme=${theme}; Max-Age=31536000; path=/`
  }, [theme])

  const toggle = React.useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const set = React.useCallback((t: Theme) => setTheme(t), [])

  return <ThemeContext.Provider value={{ theme, toggle, set }}>{children}</ThemeContext.Provider>
}
