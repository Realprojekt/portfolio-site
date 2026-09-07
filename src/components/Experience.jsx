export default function Experience({ experience, education }) {
  return (
    <section className="section container" id="experience">
      <span className="section-label">04 · Experience</span>
      <h2 className="section-title">Where I've worked</h2>
      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline-item" key={job.role + job.company}>
            <span className="timeline-period">{job.period}</span>
            <div>
              <h3 className="timeline-role">{job.role}</h3>
              <span className="timeline-company">{job.company}</span>
              <ul>
                {job.points.map((point, i) => (
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
            <div className="timeline-item" key={ed.degree}>
              <span className="timeline-period">{ed.period}</span>
              <div>
                <h3 className="timeline-role">{ed.degree}</h3>
                <span className="timeline-company">{ed.school}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
