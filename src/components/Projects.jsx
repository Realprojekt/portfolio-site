export default function Projects({ projects }) {
  return (
    <section className="section container" id="projects">
      <span className="section-label">03 · Projects</span>
      <h2 className="section-title">Things I've built</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            className={`project-card${project.highlight ? ' highlight' : ''}`}
            key={project.title}
          >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="project-links">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer">Code →</a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer">Live Demo →</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
