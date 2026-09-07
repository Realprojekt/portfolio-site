import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

function getStoredOverride() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable - fall through
  }
  return null
}

export function ThemeProvider({ children }) {
  const [override, setOverride] = useState(getStoredOverride)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e) => setSystemTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  const theme = override ?? systemTheme

  useEffect(() => {
    if (override) {
      document.documentElement.setAttribute('data-theme', override)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [override])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setOverride(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore write failures
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
