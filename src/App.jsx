import { useState, useEffect } from 'react';
import { portfolioData } from './Components/portfolioData';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaGraduationCap, 
  FaCode, 
  FaFolderOpen, 
  FaPaperPlane,
  FaFilePdf,
  FaDownload,
  FaEye,
  FaBriefcase
} from 'react-icons/fa6';
import './App.css';

// 🔄 Continuous Looping Typewriter Effect Component
function Typewriter({ text, speed = 120, pause = 1500 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Type forward
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && currentIndex === text.length) {
      // Wait at the end before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && currentIndex > 0) {
      // Delete backward
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2);
    } else if (isDeleting && currentIndex === 0) {
      // Restart typing loop
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text, speed, pause]);

  return (
    <span className="typewriter-text">
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const resumeUrl = "/resume.pdf";

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="portfolio-app">
      {/* Top Navbar */}
     {/* Top Navbar */}
<nav className="navbar">
  {/* Plain text logo */}
  <div className="logo">PORTFOLIO</div>
  
  <div className="nav-links">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#internships">Internships</a>
    <a href="#projects">Projects</a>
    <a href="#education">Education</a>
    <a href="#resume">Resume</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

      <main className="container">
        {/* Hero / About Section */}
        <section id="about" className="hero-section">
          <div className="fresher-badge">Fresher • Open to Opportunities</div>
          
          {/* ♾️ Continuous Looping Animation */}
          <h1>
            Hi, I'm <Typewriter text={portfolioData.name} speed={120} pause={1500} />
          </h1>
          
          <h2>{portfolioData.role}</h2>
          <p className="bio">{portfolioData.bio}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Projects</a>
            <a href={resumeUrl} download="My_Resume.pdf" className="btn btn-secondary flex-btn">
              <FaDownload /> Download CV
            </a>
          </div>

          <div className="social-links">
            <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" title="GitHub"><FaGithub size={22} /></a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin size={22} /></a>
            <a href={`mailto:${portfolioData.contact.email}`} title="Email"><FaEnvelope size={22} /></a>
          </div>
        </section>

        {/* 💻 Technical Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title"><FaCode className="icon" /> Technical Skills</h2>
          <div className="skills-container">
            {portfolioData.skills.map((group, index) => (
              <div key={index} className="skill-row">
                <span className="skill-category-label">{group.category}:</span>
                <span className="skill-items-list">{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 💼 Internship Section */}
        {portfolioData.internships && portfolioData.internships.length > 0 && (
          <section id="internships" className="section">
            <h2 className="section-title"><FaBriefcase className="icon" /> Internship & Experience</h2>
            <div className="internship-list">
              {portfolioData.internships.map((intern, index) => (
                <div key={index} className="internship-card">
                  <div className="internship-header">
                    <div className="header-left">
                      <h3>{intern.role}</h3>
                      <h4>{intern.company}</h4>
                    </div>
                    <div className="header-right">
                      <span className="badge-duration">{intern.duration}</span>
                      <span className="location">{intern.location}</span>
                    </div>
                  </div>
                  <ul className="internship-points">
                    {intern.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title"><FaFolderOpen className="icon" /> Featured Projects</h2>
          <div className="projects-grid">
            {portfolioData.projects.map((proj, index) => (
              <div key={index} className="project-card">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="tech-tags">
                  {proj.tech.map((t, i) => <span key={i}>{t}</span>)}
                </div>
                <div className="project-actions">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="link-btn">Code (GitHub)</a>
                  <a href={proj.live} target="_blank" rel="noreferrer" className="link-btn live-btn">Live Demo</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2 className="section-title"><FaGraduationCap className="icon" /> Education</h2>
          <div className="education-timeline">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="education-card">
                <h3>{edu.degree}</h3>
                <h4>{edu.college}</h4>
                <div className="edu-details">
                  <span><strong>Year:</strong> {edu.year}</span>
                  <span><strong>Grade:</strong> {edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section">
          <h2 className="section-title"><FaFilePdf className="icon" /> Resume / CV</h2>
          <div className="resume-card">
            <div className="resume-info">
              <h3>My Official Resume</h3>
              <p>You can view or download my latest updated resume using the buttons below.</p>
            </div>
            <div className="resume-actions">
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary flex-btn">
                <FaEye /> View Resume
              </a>
              <a href={resumeUrl} download="My_Resume.pdf" className="btn btn-primary flex-btn">
                <FaDownload /> Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="section-title"><FaPaperPlane className="icon" /> Get In Touch</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <p>Main active job search kar raha hoon. Agar aapke paas koi opportunity hai toh zaroor connect karein!</p>
              <div className="info-item"><FaEnvelope /> {portfolioData.contact.email}</div>
              <div className="info-item"><FaPhone /> {portfolioData.contact.phone}</div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Aapka Naam" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Aapka Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              <textarea 
                rows="4" 
                placeholder="Aapka Message" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
              {submitted && <p className="success-msg">Message sent successfully!</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {portfolioData.name}. Built with React.js</p>
      </footer>
    </div>
  );
}

export default App;