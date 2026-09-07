import { useLanguage } from '../i18n/LanguageContext'

export default function Contact({ profile }) {
  const { t } = useLanguage()

  return (
    <section className="section container" id="contact">
      <span className="section-label">{t.section.contact}</span>
      <h2 className="contact-title">{t.titles.contact}</h2>
      <p className="contact-text">{t.contactText}</p>
      <div className="contact-actions">
        <a className="btn btn-primary" href={`mailto:${profile.email}`}>{t.buttons.sayHello}</a>
        {profile.social
          .filter((s) => s.label !== 'Email')
          .map((s) => (
            <a className="btn btn-secondary" key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
      </div>
    </section>
  )
}
