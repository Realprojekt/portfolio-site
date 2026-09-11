import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import PerceptronDemo from './perceptron/PerceptronDemo'

const demoComponents = {
  perceptron: PerceptronDemo,
}

function projectVariant(project) {
  if (project.demoKey) return 'demo'
  if (project.highlight) return 'feature'
  return 'compact'
}

export default function Projects({ projects }) {
  const { lang, t } = useLanguage()
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleDemo = (index) => {
    setExpandedIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="section container" id="projects">
      <span className="section-label">{t.section.projects}</span>
      <h2 className="section-title">{t.titles.projects}</h2>
      <div className="projects-list">
        {projects.map((project, index) => {
          const DemoComponent = project.demoKey ? demoComponents[project.demoKey] : null
          const isExpanded = expandedIndex === index
          const variant = projectVariant(project)

          return (
            <article className={`project project--${variant}`} key={project[lang].title}>
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-body">
                <h3 className="project-title">{project[lang].title}</h3>
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
                      onClick={() => toggleDemo(index)}
                    >
                      {isExpanded ? t.buttons.hideDemo : t.buttons.showDemo} →
                    </button>
                  )}
                </div>
                {DemoComponent && isExpanded && <DemoComponent />}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
