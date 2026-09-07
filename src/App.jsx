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
import { useLanguage } from './i18n/LanguageContext'

function App() {
  const { t } = useLanguage()

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <Nav name={profile.name} />
      <main id="main">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skillGroups={skillGroups} />
        <Projects projects={projects} />
        <Experience experience={experience} education={education} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  )
}

export default App
