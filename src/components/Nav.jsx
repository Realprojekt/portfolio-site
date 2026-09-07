import { useLanguage } from '../i18n/LanguageContext'

export default function Nav({ name }) {
  const { lang, setLang, t } = useLanguage()

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top">{name}</a>
        <nav className="nav-links" aria-label={t.nav.primary}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="lang-toggle" role="group" aria-label="Language / Sprache">
          <button
            type="button"
            className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
            aria-pressed={lang === 'en'}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === 'de' ? 'lang-btn active' : 'lang-btn'}
            aria-pressed={lang === 'de'}
            onClick={() => setLang('de')}
          >
            DE
          </button>
        </div>
      </div>
    </header>
  )
}
