import { useLanguage } from '../i18n/LanguageContext'

export default function Experience({ experience, education }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section container" id="experience">
      <span className="section-label">{t.section.experience}</span>
      <h2 className="section-title">{t.titles.experience}</h2>
      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline-item" key={job.company}>
            <span className="timeline-period">{job.period[lang]}</span>
            <div>
              <h3 className="timeline-role">{job[lang].role}</h3>
              <span className="timeline-company">{job.company}</span>
              <ul>
                {job[lang].points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {education?.length > 0 && (
        <div className="education-item">
          {education.map((ed) => (
            <div className="timeline-item" key={ed.school}>
              <span className="timeline-period">{ed.period[lang]}</span>
              <div>
                <h3 className="timeline-role">{ed[lang].degree}</h3>
                <span className="timeline-company">{ed.school}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
