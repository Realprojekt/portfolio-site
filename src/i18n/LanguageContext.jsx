import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'de') return stored
  } catch {
    // localStorage unavailable (private browsing etc.) - fall through
  }
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de')) {
    return 'de'
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // ignore write failures
    }
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'de' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
