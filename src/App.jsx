import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { profile } from './data/profile'
import { skillGroups } from './data/skills'
import { projects } from './data/projects'
import { experience, education } from './data/experience'

function App() {
  return (
    <>
      <Nav name={profile.name} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skillGroups={skillGroups} />
      <Projects projects={projects} />
      <Experience experience={experience} education={education} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </>
  )
}

export default App
