export default function Skills({ skillGroups }) {
  return (
    <section className="section container" id="skills">
      <span className="section-label">02 · Skills</span>
      <h2 className="section-title">What I work with</h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
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
