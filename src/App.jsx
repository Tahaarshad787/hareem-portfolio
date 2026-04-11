import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { env } from './env.js'
import './App.css'

/* ── Textile SVG decoration components ─────────────── */

// Hexagon / ikat weave pattern
const DecoHex = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="currentColor" strokeWidth="2.5"/>
    <polygon points="100,30 170,67.5 170,132.5 100,170 30,132.5 30,67.5" stroke="currentColor" strokeWidth="2"/>
    <polygon points="100,50 150,75 150,125 100,150 50,125 50,75" stroke="currentColor" strokeWidth="1.5"/>
    <polygon points="100,70 130,82.5 130,117.5 100,130 70,117.5 70,82.5" stroke="currentColor" strokeWidth="1"/>
    <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4"/>
    <line x1="10" y1="55" x2="190" y2="145" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4"/>
    <line x1="190" y1="55" x2="10" y2="145" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4"/>
  </svg>
)

// Block print floral motif
const DecoFloral = ({ className }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="90" cy="90" r="12" stroke="currentColor" strokeWidth="2.5"/>
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <ellipse key={i} cx="90" cy="90" rx="8" ry="30"
        stroke="currentColor" strokeWidth="2"
        transform={`rotate(${deg} 90 90) translate(0 -30)`}/>
    ))}
    {[0,60,120,180,240,300].map((deg, i) => (
      <circle key={i} cx={90 + 55*Math.cos(deg*Math.PI/180)} cy={90 + 55*Math.sin(deg*Math.PI/180)}
        r="7" stroke="currentColor" strokeWidth="1.5"/>
    ))}
    <circle cx="90" cy="90" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5"/>
    <circle cx="90" cy="90" r="78" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 7"/>
  </svg>
)

// Bandhani dot pattern
const DecoBandhani = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[20,50,80,110,140,170].map(x =>
      [20,50,80,110,140,170].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" stroke="currentColor" strokeWidth="1.5"/>
      ))
    )}
    {[35,65,95,125,155].map(x =>
      [35,65,95,125,155].map(y => (
        <circle key={`s-${x}-${y}`} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.5"/>
      ))
    )}
    <rect x="10" y="10" width="180" height="180" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4"/>
  </svg>
)

// Cross stitch / embroidery pattern
const DecoCrossStitch = ({ className }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[20,40,60,80,100,120,140].map(x =>
      [20,40,60,80,100,120,140].map(y => (
        <g key={`${x}-${y}`}>
          <line x1={x-7} y1={y-7} x2={x+7} y2={y+7} stroke="currentColor" strokeWidth="1.2"/>
          <line x1={x+7} y1={y-7} x2={x-7} y2={y+7} stroke="currentColor" strokeWidth="1.2"/>
        </g>
      ))
    )}
    <rect x="5" y="5" width="150" height="150" stroke="currentColor" strokeWidth="2" rx="4"/>
  </svg>
)

// Ralli / patchwork geometric
const DecoRalli = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="85" height="85" stroke="currentColor" strokeWidth="2"/>
    <rect x="105" y="10" width="85" height="85" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="105" width="85" height="85" stroke="currentColor" strokeWidth="2"/>
    <rect x="105" y="105" width="85" height="85" stroke="currentColor" strokeWidth="2"/>
    <line x1="10" y1="10" x2="95" y2="95" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="95" y1="10" x2="10" y2="95" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="105" y1="10" x2="190" y2="95" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="190" y1="10" x2="105" y2="95" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="10" y1="105" x2="95" y2="190" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="95" y1="105" x2="10" y2="190" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="2"/>
    <polygon points="100,82 118,118 82,118" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

// Stencil leaf/paisley
const DecoStencil = ({ className }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M90 20 C130 20 160 55 160 90 C160 130 130 165 90 160 C60 165 20 140 20 100 C20 55 50 20 90 20Z"
      stroke="currentColor" strokeWidth="2.5"/>
    <path d="M90 40 C120 40 145 65 145 90 C145 120 120 145 90 142 C65 145 35 128 35 105 C35 65 60 40 90 40Z"
      stroke="currentColor" strokeWidth="1.5"/>
    <path d="M90 60 C110 60 128 75 128 90 C128 110 110 125 90 123 C72 125 55 112 55 97 C55 75 70 60 90 60Z"
      stroke="currentColor" strokeWidth="1"/>
    <circle cx="90" cy="90" r="8" stroke="currentColor" strokeWidth="2"/>
    <line x1="90" y1="20" x2="90" y2="160" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 5"/>
  </svg>
)

// Thread spool / weave for contact
const DecoSpool = ({ className }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="45" rx="50" ry="18" stroke="currentColor" strokeWidth="2"/>
    <ellipse cx="90" cy="135" rx="50" ry="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="40" y1="45" x2="40" y2="135" stroke="currentColor" strokeWidth="2"/>
    <line x1="140" y1="45" x2="140" y2="135" stroke="currentColor" strokeWidth="2"/>
    {[60,70,80,90,100,110,120].map(y => (
      <ellipse key={y} cx="90" cy={y} rx="35" ry="5" stroke="currentColor" strokeWidth="0.8"/>
    ))}
  </svg>
)

// Emoji-style yarn ball (chunky fills + black outline like 🎨 ✏️ 💻 on system emoji font)
const ink = '#18181b'
const IconTextileTechniques = () => (
  <svg
    className="skill-card-icon-svg skill-card-icon-svg--emoji"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 22c5-10 18-12 26-4 4 4 5 11 2 17-4 9-3 16 4 18 5 2 12-2 14-9"
      fill="#fde047"
      stroke={ink}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse cx="36" cy="40" rx="21" ry="19" fill="#f472b6" stroke={ink} strokeWidth="2.6" />
    <path
      d="M22 34q14 6 28 2M20 42q16 7 32 2M24 50q10 3 20 1"
      stroke={ink}
      strokeWidth="2.15"
      strokeLinecap="round"
    />
    <ellipse cx="28" cy="32" rx="7" ry="5" fill="#fda4af" stroke={ink} strokeWidth="2" transform="rotate(-28 28 32)" />
    <path
      d="M46 14q8 6 10 16"
      fill="none"
      stroke="#14b8a6"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="54" cy="12" r="4.5" fill="#5eead4" stroke={ink} strokeWidth="2.2" />
  </svg>
)

function App() {
  const [formData, setFormData] = useState({ senderEmail: '', message: '' })
  const [submitState, setSubmitState] = useState({ loading: false, message: '', isError: false })
  const [lightbox, setLightbox] = useState({ open: false, projectIdx: 0, thumbIdx: 0 })
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const revealRefs = useRef([])

  const emailConfig = {
    serviceId: env.VITE_EMAILJS_SERVICE_ID,
    templateId: env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
    toEmail: env.VITE_RECEIVER_EMAIL,
  }

  const projects = [
    {
      title: 'Floral Block Print Bedding',
      type: 'Home Textile',
      emoji: '🌸',
      colors: ['#fce7f3', '#f3e8ff', '#fef3c7', '#e8f5e9'],
      desc: 'Traditional floral motifs hand-carved and block-printed on cotton fabric for a luxury bedding set. Inspired by Sindhi embroidery patterns with a modern color palette.',
      tools: ['Block Printing', 'Pattern Design', 'Color Mixing', 'Cotton Fabric'],
      thumbEmojis: ['🌸', '🌺', '🌼', '🌷'],
    },
    {
      title: 'Shibori Indigo Table Linen',
      type: 'Surface Design',
      emoji: '💙',
      colors: ['#e0f2fe', '#dbeafe', '#e0e7ff', '#ede9fe'],
      desc: 'Japanese Shibori tie-dye technique applied to linen table cloth and napkins. Each piece is unique with organic indigo patterns through folding and binding.',
      tools: ['Shibori Technique', 'Tie & Dye', 'Indigo Dyeing', 'Linen'],
      thumbEmojis: ['💙', '🌊', '✨', '🦋'],
    },
    {
      title: 'Geometric Stencil Cushion Collection',
      type: 'Home Decor',
      emoji: '🔷',
      colors: ['#fef3c7', '#ffedd5', '#fce7f3', '#f0fdf4'],
      desc: 'Modern geometric patterns created using hand-cut stencils with fabric paint. Bold angular motifs in earthy terracotta and sage tones.',
      tools: ['Stencil Printing', 'Geometric Design', 'Fabric Paint', 'Cotton Canvas'],
      thumbEmojis: ['🔷', '⬡', '◈', '▲'],
    },
    {
      title: 'Bandhani Dupatta in Rose Tones',
      type: 'Traditional Textile',
      emoji: '🌹',
      colors: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#fdf2f8'],
      desc: 'Hand-tied Bandhani technique creating intricate dot patterns on chiffon dupatta. Celebrates Pakistani traditional craft with a contemporary rose and gold palette.',
      tools: ['Bandhani', 'Tie & Dye', 'Chiffon', 'Traditional Craft'],
      thumbEmojis: ['🌹', '✿', '❀', '🪷'],
    },
    {
      title: 'Cross Stitch Garden Wall Art',
      type: 'Embroidery',
      emoji: '🌿',
      colors: ['#f0fdf4', '#dcfce7', '#d1fae5', '#ecfdf5'],
      desc: 'Detailed cross stitch embroidery featuring a botanical garden scene with birds and flowers. Hand-stitched on Aida cloth using premium DMC threads.',
      tools: ['Cross Stitch', 'Embroidery', 'Botanical Design', 'DMC Threads'],
      thumbEmojis: ['🌿', '🦜', '🌻', '🍃'],
    },
    {
      title: 'Ralli Patchwork Throw Blanket',
      type: 'Applique Work',
      emoji: '🧵',
      colors: ['#fef3c7', '#fce7f3', '#e0f2fe', '#f0fdf4'],
      desc: 'Traditional Sindhi Ralli applique technique creating a vibrant patchwork throw. Hand-stitched geometric patterns in bright festive colors representing cultural heritage.',
      tools: ['Ralli Work', 'Applique', 'Patchwork', 'Hand Stitching'],
      thumbEmojis: ['🧵', '✂️', '🎨', '✨'],
    },
  ]

  const skillGroups = [
    {
      icon: '🎨',
      title: 'Creative Skills',
      tags: ['Textile Pattern Design', 'Color Theory', 'Surface Design', 'Motif Creation', 'Repeat Patterns', 'Theme Design'],
    },
    {
      icon: <IconTextileTechniques />,
      title: 'Textile Techniques',
      tags: ['Block Printing', 'Tie & Dye', 'Stencil Printing', 'Fabric Painting', 'Cross Stitch', 'Applique (Ralli)', 'Basic Weaving'],
    },
    {
      icon: '✏️',
      title: 'Art & Design',
      tags: ['Sketching', 'Illustration', 'Composition Layout', 'Texture Creation', 'Mixed Media', 'Background Development'],
    },
    {
      icon: '💻',
      title: 'Digital Tools',
      tags: ['Adobe Photoshop', 'Adobe Illustrator'],
      extra: ['Creativity', 'Detail Oriented', 'Innovation', 'Time Management'],
    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    revealRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setSubmitState({ loading: false, isError: true, message: 'Email service configure nahi hai. .env me EmailJS keys add karein.' })
      return
    }
    setSubmitState({ loading: true, message: '', isError: false })
    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        { sender_email: formData.senderEmail, message: formData.message, to_email: emailConfig.toEmail, reply_to: formData.senderEmail },
        { publicKey: emailConfig.publicKey }
      )
      setSubmitState({ loading: false, isError: false, message: 'Message send ho gaya! ✓' })
      setFormData({ senderEmail: '', message: '' })
    } catch {
      setSubmitState({ loading: false, isError: true, message: 'Send nahi ho saka. Dobara try karein.' })
    }
  }

  const openLightbox = (idx) => setLightbox({ open: true, projectIdx: idx, thumbIdx: 0 })
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }))
  const setThumb = (i) => setLightbox((prev) => ({ ...prev, thumbIdx: i }))

  const closeMenu = () => setMenuOpen(false)
  const activeProject = projects[lightbox.projectIdx]
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Gallery', 'Contact']

  return (
    <div className="portfolio">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-brand">Hareem Studio</div>

        {/* Desktop centered links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </div>

        {/* Hamburger icon */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
        ))}
      </div>

      {/* ── HERO ────────────────────────────────────────── */}
      <section id="home" className="hero">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        {/* Textile pattern decorations */}
        <DecoHex className="pattern-hex" style={{ color: '#c2185b' }} />
        <DecoFloral className="pattern-diamond" style={{ color: '#0d9488' }} />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for work
          </div>
          <h1 className="hero-h1">
            Crafting Beautiful
            <span className="hero-gradient">Textile Designs</span>
            with Passion &amp; Precision
          </h1>
          <p className="hero-sub">
            Pakistan-based Textile Designer specializing in surface design, pattern creation, block printing, and fabric exploration. Blending traditional techniques with modern aesthetics.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in Touch ✦</a>
            <a href="#gallery" className="btn btn-outline">View Gallery →</a>
            <a href="/cv.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">Download CV</a>
          </div>
          <div className="hero-stats">
            {[['5+', 'Techniques'], ['2+', 'Years Study'], ['12+', 'Projects'], ['∞', 'Creativity']].map(([num, label]) => (
              <div key={label} className="hero-stat">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────── */}
      <section id="about">
        {/* Textile decorations */}
        <DecoHex className="deco-thread" style={{ color: '#c2185b' }} />
        <DecoFloral className="deco-floral" style={{ color: '#f59e0b' }} />

        <div className="section-inner">
          <div className="about-card reveal" ref={addReveal}>
            <div className="about-visual">
              <div className="card-stack">
                <div className="stack-back1" />
                <div className="stack-back2" />
                <div className="stack-front">
                  <span className="stack-icon">🧵</span>
                  <h3>Hareem</h3>
                  <p>Textile Designer &amp; Surface Design Specialist</p>
                  <span className="stack-location">Karachi, PK</span>
                </div>
              </div>
            </div>
            <div className="about-text">
              <div className="section-label">About Me</div>
              <h2>Where Tradition Meets Modern Design</h2>
              <p>I am a creative and passionate textile design student with a strong interest in surface design and fabric exploration. My work combines traditional techniques with contemporary aesthetics.</p>
              <p>Hands-on experience in block printing, tie and dye, stencil printing, and designing home textiles such as bedding and table linen. I love experimenting with colors, textures, and patterns.</p>
              <p>Currently seeking opportunities to gain practical experience and contribute creatively within the textile industry.</p>
              <div className="about-stats">
                {[['2024', 'Started', 'rose'], ['7+', 'Techniques', 'teal'], ['∞', 'Ideas', 'gold']].map(([n, l, c]) => (
                  <div key={l} className="about-stat">
                    <span className={`about-stat-num color-${c}`}>{n}</span>
                    <span className="about-stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────── */}
      <section id="skills" className="skills-section">
        {/* Ikat weave pattern */}
        <DecoHex className="deco-ikat" style={{ color: '#e91e8c' }} />
        <DecoRalli className="deco-block" style={{ color: '#14b8a6' }} />

        <div className="skills-inner">
          <div className="reveal" ref={addReveal}>
            <div className="section-label light">Expertise</div>
            <h2 className="section-title light">Skills &amp; Techniques</h2>
            <p className="section-sub light">A comprehensive set of creative and technical skills developed through academic and studio practice.</p>
          </div>
          <div className="skills-grid reveal" ref={addReveal}>
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-card">
                <div className="skill-card-icon">{group.icon}</div>
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
                {group.extra && (
                  <div className="skill-extra">
                    <div className="skill-extra-label">Soft Skills</div>
                    <div className="skill-tags">
                      {group.extra.map((tag) => (
                        <span key={tag} className="skill-tag soft">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────── */}
      <section id="experience">
        {/* Bandhani dot + cross stitch decorations */}
        <DecoBandhani className="deco-bandhani" style={{ color: '#c2185b' }} />
        <DecoCrossStitch className="deco-cross" style={{ color: '#0d9488' }} />

        <div className="section-inner">
          <div className="reveal" ref={addReveal}>
            <div className="section-label">Journey</div>
            <h2 className="section-title dark">My Experience</h2>
            <p className="section-sub muted">Academic and practical textile design journey from 2024 to present.</p>
          </div>
          <div className="timeline reveal" ref={addReveal}>
            <div className="timeline-line" />
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="exp-card">
                <div className="exp-head">
                  <h3>Textile Design Student</h3>
                  <span className="exp-year">2024 – Present</span>
                </div>
                <p className="exp-org">University Program &amp; Studio Practice</p>
                <ul className="exp-list">
                  <li>Designed and developed home textile products including bedding and table linen based on various themes.</li>
                  <li>Practiced multiple surface design techniques such as block printing, tie and dye, and stencil printing.</li>
                  <li>Explored color combinations, textures, and pattern development through academic projects.</li>
                  <li>Created original design concepts using both traditional and modern approaches.</li>
                </ul>
                <div className="exp-chips">
                  {['Block Printing', 'Tie & Dye', 'Stencil Printing', 'Pattern Development', 'Home Textiles', 'Color Exploration'].map((c) => (
                    <span key={c} className="exp-chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────── */}
      <section id="gallery" className="gallery-section">
        {/* Ralli + stencil/paisley decorations */}
        <DecoRalli className="deco-ralli" style={{ color: '#c2185b' }} />
        <DecoStencil className="deco-stencil" style={{ color: '#0d9488' }} />

        <div className="gallery-inner">
          <div className="gallery-header reveal" ref={addReveal}>
            <div>
              <div className="section-label">Portfolio</div>
              <h2 className="section-title dark">Design Gallery</h2>
            </div>
            <p className="gallery-hint">Click any project to view all 4 images in the lightbox.</p>
          </div>
          <div className="gallery-grid reveal" ref={addReveal}>
            {projects.map((project, i) => (
              <article key={project.title} className="gallery-card" onClick={() => openLightbox(i)}>
                <div className="gallery-thumb" style={{ background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` }}>
                  <div className="gallery-emoji">{project.emoji}</div>
                  <div className="gallery-overlay">
                    <span>Click to view all images →</span>
                  </div>
                </div>
                <div className="gallery-info">
                  <p className="gallery-type">{project.type}</p>
                  <h3 className="gallery-title">{project.title}</h3>
                  <p className="gallery-desc">{project.desc.slice(0, 100)}…</p>
                  <p className="gallery-tools">{project.tools.slice(0, 2).join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact">
        <DecoSpool className="deco-contact" style={{ color: '#c2185b' }} />

        <div className="section-inner">
          <div className="contact-card reveal" ref={addReveal}>
            <div className="contact-icon">✉️</div>
            <div className="section-label" style={{ textAlign: 'center' }}>Get In Touch</div>
            <h2 className="contact-title">Let&apos;s Work Together</h2>
            <p className="contact-sub">
              Contact me at{' '}
              <a href="mailto:tahaarshad311@gmail.com" className="contact-email">tahaarshad311@gmail.com</a>
              {' '}or use the form below.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="senderEmail">Your Email</label>
                <input
                  id="senderEmail"
                  type="email"
                  name="senderEmail"
                  placeholder="hello@gmail.com"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Hello! I'd love to discuss a project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact-btn" disabled={submitState.loading}>
                {submitState.loading ? 'Sending…' : 'Send Message'}
              </button>
              {submitState.message && (
                <p className={`form-status ${submitState.isError ? 'error' : 'success'}`}>
                  {submitState.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="footer">
        <span>Designed with <span className="footer-heart">♥</span> by{' '}
        <span className="footer-brand">Hareem Studio</span> · Karachi, Pakistan</span>
      </footer>

      {/* ── LIGHTBOX ────────────────────────────────────── */}
      <div
        className={`lightbox ${lightbox.open ? 'open' : ''}`}
        onClick={(e) => e.target.classList.contains('lightbox') && closeLightbox()}
      >
        {lightbox.open && (
          <div className="lb-inner">
            <button className="lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
            <div
              className="lb-main"
              style={{
                background: `linear-gradient(135deg, ${activeProject.colors[lightbox.thumbIdx]}, ${activeProject.colors[(lightbox.thumbIdx + 1) % activeProject.colors.length]})`,
              }}
            >
              <span className="lb-main-emoji">{activeProject.thumbEmojis[lightbox.thumbIdx]}</span>
            </div>
            <div className="lb-thumbs">
              {activeProject.thumbEmojis.map((em, i) => (
                <div
                  key={i}
                  className={`lb-thumb ${i === lightbox.thumbIdx ? 'active' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${activeProject.colors[i]}, ${activeProject.colors[(i + 1) % activeProject.colors.length]})` }}
                  onClick={() => setThumb(i)}
                >
                  <span>{em}</span>
                </div>
              ))}
            </div>
            <div className="lb-body">
              <p className="lb-type">{activeProject.type}</p>
              <h3 className="lb-title">{activeProject.title}</h3>
              <p className="lb-desc">{activeProject.desc}</p>
              <div className="lb-tools">
                {activeProject.tools.map((t) => (
                  <span key={t} className="lb-tool">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default App