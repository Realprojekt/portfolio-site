import { useLanguage } from '../i18n/LanguageContext'

export default function Skills({ skillGroups }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section container" id="skills">
      <span className="section-label">{t.section.skills}</span>
      <h2 className="section-title">{t.titles.skills}</h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category.en}>
            <h3>{group.category[lang]}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span className="skill-tag" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
