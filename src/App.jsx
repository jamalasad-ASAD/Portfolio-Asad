import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import profilePic from './profile.jpg';
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
  FaBriefcase,
  FaBars,
  FaXmark
} from 'react-icons/fa6';
import './App.css';

// 🔄 Looping Typewriter Effect Component
function Typewriter({ text, speed = 120, pause = 1500 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, speed / 2);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, pause]);

  return (
    <span className="typewriter-text">
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 📱 Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const resumeUrl = "/resume.pdf";

  // Initialize EmailJS on mount
  useEffect(() => {
    emailjs.init("vXZGlrFVZVPhiQaf9");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📩 Handle EmailJS Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      user_name: formData.name,
      from_email: formData.email,
      user_email: formData.email,
      phone_number: formData.phone,
      user_phone: formData.phone,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs.send(
      'service_fhb8e4h',
      'template_96ffv3n',
      templateParams,
      'vXZGlrFVZVPhiQaf9'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    })
    .catch((error) => {
      setLoading(false);
      console.error("EmailJS Error Details:", error);
      alert(`Failed to send message (${error.text || error.status || 'Error'}). Check console for details.`);
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="portfolio-app">
      {/* Top Responsive Navbar */}
      <nav className="navbar">
        <div className="logo">PORTFOLIO</div>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
        </button>

        {/* Middle Capsule/Circle Container for Navigation Links */}
        <div className={`nav-links-wrapper ${menuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#internships" onClick={() => setMenuOpen(false)}>Internships</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
            <a href="#resume" onClick={() => setMenuOpen(false)}>Resume</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </div>

        {/* Outer Right Action Button */}
        <div className="navbar-action">
          <a href="#contact" className="btn-hire-me">Hire Me</a>
        </div>
      </nav>

      <main className="container">
        {/* Hero / About Section */}
        <section id="about" className="hero-section">
          <div className="hero-content">
            {/* Left Side: 3D Image */}
            <div className="hero-left">
              <div className="profile-img-3d-wrapper">
                <img 
                  src={profilePic} 
                  alt={portfolioData.name} 
                  className="profile-img-3d" 
                />
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="hero-right">
              <div className="fresher-badge">Fresher • Open to Opportunities</div>
              
              <h1 className="hero-white-title">
                Hi, I'm <Typewriter text={portfolioData.name} speed={120} pause={1500} />
              </h1>
              
              <h2>{portfolioData.role}</h2>
              <p className="bio">{portfolioData.bio}</p>

              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">View My Projects</a>
                <a href={resumeUrl} download="ASAD_JAMAL_Resume.pdf" className="btn btn-secondary flex-btn">
                  <FaDownload /> Download CV
                </a>
              </div>

              {/* 🔗 Social Links */}
              <div className="social-links">
                <a 
                  href={portfolioData.contact.github || "https://github.com/jamalasad-ASAD"} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="GitHub Profile"
                >
                  <FaGithub size={22} />
                </a>
                <a 
                  href={portfolioData.contact.linkedin || "https://www.linkedin.com/in/asad-jamal-289a31248/"} 
                  target="_blank" 
                  rel="noreferrer" 
                  title="LinkedIn Profile"
                >
                  <FaLinkedin size={22} />
                </a>
                <a href={`mailto:${portfolioData.contact.email}`} title="Email"><FaEnvelope size={22} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
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

        {/* Internship Section */}
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
              <a href={resumeUrl} download="ASAD_JAMAL_Resume.pdf" className="btn btn-primary flex-btn">
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
              <p>I am actively looking for new job opportunities. If you have any relevant openings, I would love to connect!</p>
              <div className="info-item"><FaEnvelope /> {portfolioData.contact.email}</div>
              <div className="info-item"><FaPhone /> {portfolioData.contact.phone}</div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                required 
              />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Contact Number" 
                required 
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4" 
                placeholder="Type Message" 
                required
              ></textarea>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              {submitted && <p className="success-msg">Message sent directly to inbox!</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {portfolioData.name}. Built By AsAd JaMaL.</p>
      </footer>
    </div>
  );
}

export default App;