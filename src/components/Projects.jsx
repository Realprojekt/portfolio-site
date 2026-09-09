import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import PerceptronDemo from './perceptron/PerceptronDemo'

const demoComponents = {
  perceptron: PerceptronDemo,
}

export default function Projects({ projects }) {
  const { lang, t } = useLanguage()
  const [expandedDemo, setExpandedDemo] = useState(null)

  const toggleDemo = (title) => {
    setExpandedDemo((current) => (current === title ? null : title))
  }

  return (
    <section className="section container" id="projects">
      <span className="section-label">{t.section.projects}</span>
      <h2 className="section-title">{t.titles.projects}</h2>
      <div className="projects-grid">
        {projects.map((project) => {
          const DemoComponent = project.demoKey ? demoComponents[project.demoKey] : null
          const isExpanded = expandedDemo === project.title

          return (
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
                {DemoComponent && (
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleDemo(project.title)}
                  >
                    {isExpanded ? t.buttons.hideDemo : t.buttons.showDemo} →
                  </button>
                )}
              </div>
              {DemoComponent && isExpanded && <DemoComponent />}
            </article>
          )
        })}
      </div>
    </section>
  )
}
