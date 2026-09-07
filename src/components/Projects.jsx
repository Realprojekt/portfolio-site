import { useLanguage } from '../i18n/LanguageContext'

export default function Projects({ projects }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section container" id="projects">
      <span className="section-label">{t.section.projects}</span>
      <h2 className="section-title">{t.titles.projects}</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            className={`project-card${project.highlight ? ' highlight' : ''}`}
            key={project.title}
          >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project[lang].description}</p>
            <div className="project-tech">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer">{t.buttons.code} →</a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer">{t.buttons.liveDemo} →</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
