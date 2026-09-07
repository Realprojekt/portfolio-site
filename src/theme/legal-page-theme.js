const SUN_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>'

const MOON_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>'

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
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

function currentTheme() {
  return getStoredOverride() ?? getSystemTheme()
}

function applyTheme(override) {
  if (override) {
    document.documentElement.setAttribute('data-theme', override)
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

applyTheme(getStoredOverride())

const btn = document.querySelector('[data-theme-toggle]')

function updateButton() {
  if (!btn) return
  const theme = currentTheme()
  btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON
  btn.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln',
  )
}

if (btn) {
  updateButton()
  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore write failures
    }
    updateButton()
  })
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!getStoredOverride()) updateButton()
  })
}
