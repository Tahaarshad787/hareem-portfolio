import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { env } from './env.js'
import './App.css'


import chineseCover from '../src/assets/gallery/chinese-tapestry-bedding/cover.png'
import bedding1 from '../src/assets/gallery/chinese-tapestry-bedding/bedding1.png'
import bedding2 from '../src/assets/gallery/chinese-tapestry-bedding/bedding2.png'
import bedding3 from '../src/assets/gallery/chinese-tapestry-bedding/bedding3.png'
import bedding4 from '../src/assets/gallery/chinese-tapestry-bedding/bedding4.png'
import logo from '../src/assets/logo.png'
import booti from '../src/assets/gallery/booti-pattern/cover.png'
import booti1 from '../src/assets/gallery/booti-pattern/booti1.png'
import booti2 from '../src/assets/gallery/booti-pattern/booti2.png'
import booti3 from '../src/assets/gallery/booti-pattern/booti3.png'
import booti4 from '../src/assets/gallery/booti-pattern/booti4.png'
import seaShells from '../src/assets/gallery/oceanic/cover.png'
import seaShells1 from '../src/assets/gallery/oceanic/seaShells1.png'
import seaShells2 from '../src/assets/gallery/oceanic/seaShells2.png'
import seaShells3 from '../src/assets/gallery/oceanic/seaShells3.png'
import seaShells4 from '../src/assets/gallery/oceanic/seaShells4.png'
import shadowForms from '../src/assets/gallery/luminous/cover.png'
import shadowForms1 from '../src/assets/gallery/luminous/shadowForms1.png'
import shadowForms2 from '../src/assets/gallery/luminous/shadowForms2.png'
import shadowForms3 from '../src/assets/gallery/luminous/shadowForms3.png'
import shadowForms4 from '../src/assets/gallery/luminous/shadowForms4.png'
import radiant from '../src/assets/gallery/tie-dye/cover.png'
import radiant1 from '../src/assets/gallery/tie-dye/radiant1.png'
import radiant2 from '../src/assets/gallery/tie-dye/radiant2.png'
import radiant3 from '../src/assets/gallery/tie-dye/radiant3.png'
import radiant4 from '../src/assets/gallery/tie-dye/radiant4.png'
import fluidity from '../src/assets/gallery/marbling/cover.png'
import fluidity1 from '../src/assets/gallery/marbling/fluidity1.png'
import fluidity2 from '../src/assets/gallery/marbling/fluidity2.png'
import fluidity3 from '../src/assets/gallery/marbling/fluidity3.png'
import fluidity4 from '../src/assets/gallery/marbling/fluidity4.png'
import cvPdfUrl from './assets/Hameez Naz.pdf?url'

const IconDownload = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 4v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="m8 12 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const IconLinkedIn = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

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

/** Card thumbnail: photo from `public/gallery/...`; gradient + emoji if file missing. */
function GalleryThumb({ project }) {
  const [broken, setBroken] = useState(false)
  const gradient = `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})`
  const showEmoji = !project.cover || broken
  return (
    <div className="gallery-thumb">
      <div className="gallery-thumb-bg" style={{ background: gradient }} aria-hidden />
      {!showEmoji && (
        <img
          src={project.cover}
          alt=""
          className="gallery-thumb-img"
          loading="lazy"
          onError={() => setBroken(true)}
        />
      )}
      {showEmoji && (
        <div className="gallery-emoji" aria-hidden>{project.emoji}</div>
      )}
      <div className="gallery-overlay">
        <span>Click to view all images →</span>
      </div>
    </div>
  )
}

function App() {
  const [formData, setFormData] = useState({ senderEmail: '', message: '' })
  const [submitState, setSubmitState] = useState({ loading: false, message: '', isError: false })
  const [lightbox, setLightbox] = useState({ open: false, projectIdx: 0, thumbIdx: 0 })
  const [lbMainImgFailed, setLbMainImgFailed] = useState(false)
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
      title: 'Bedding Set Design Chinese Tapestry Inspired',
      type: 'Print Design',
      emoji: '🌸',
      colors: ['#fce7f3', '#f3e8ff', '#fef3c7', '#e8f5e9'],
      desc: 'Concept: Inspired by traditional Chinese tapestry, this collection explores symbolic floral motifs and flowing vine patterns, focusing on rhythm, balance, and ornamental composition.\n\nDesign Approach: Motifs are stylized and arranged using organic curves to create movement and visual harmony across the bedding set. A full-drop repeat pattern is applied to ensure seamless continuity.\n\nApplication: The collection includes a duvet cover, bedsheets, pillows, and cushions, designed as a cohesive set with consistent motif placement.\n\nTechnique: Poster paint, hand-rendered motifs, repeat pattern development.\n\nOutcome: A culturally inspired textile design that combines traditional aesthetics with contemporary product application.',
      tools: ['Chinese tapestry inspired', 'Rhythm & balance', 'Poster paint', 'Motif development', 'Repeat Pattern'],
      thumbEmojis: ['🌸', '🌺', '🌼', '🌷'],
      cover: chineseCover,
      images: [bedding1, bedding2, bedding3, bedding4],
    },
    {
      title: 'Table Linen Design Indian Booti Inspired',
      type: 'Booti Pattern',
      emoji: '💙',
      colors: ['#e0f2fe', '#dbeafe', '#e0e7ff', '#ede9fe'],
      desc: 'Concept: Inspired by traditional Indian booti motifs, this collection explores delicate floral elements through repetition, symmetry, and balanced composition.\n\nDesign Approach: Stylized booti motifs are arranged in structured layouts to create rhythm and visual harmony. A full-drop repeat pattern is developed for the tablecloth, while placement-based designs are adapted for smaller items.\n\nApplication: The collection includes a tablecloth, runner, placemats, napkins, and coasters, designed as a cohesive set with variation in scale and layout.\n\nTechnique: Poster paint, hand-rendered motifs, repeat pattern development.\n\nOutcome: A functional table linen collection that translates traditional Indian textile aesthetics into a contemporary context.',
      tools: ['Indian Booti Inspired', 'Repeat Pattern', 'Soft Color Palette', 'Traditional Motifs','Product Design'],
      thumbEmojis: ['💙', '🌊', '✨', '🦋'],
      cover: booti,
      images: [booti1, booti2, booti3, booti4],
    },
    {
      title: 'Sea Shells & Corals (Cross Stitch Integration)',
      type: 'Oceanic',
      emoji: '🔷',
      colors: ['#fef3c7', '#ffedd5', '#fce7f3', '#f0fdf4'],
      desc: 'Concept: Inspired by marine life, this design explores sea shells, corals, and underwater textures through a calm and rhythmic composition.\n\nDesign Approach: Motifs are arranged in a half-drop repeat to create a natural sense of movement, reflecting the flow of the ocean.\n\nTechnique: A combination of surface pattern design and cross stitch is used to introduce texture and a handcrafted quality, creating contrast between structured stitching and organic forms.\n\nColor Palette: Ocean blue base with soft pastel tones including blush pink, muted green, and off-white.\n\nOutcome: A textile design that captures the serenity of marine life while experimenting with repeat structures and mixed techniques.',
      tools: ['Marine Inspired','Half Drop Repeat', 'Cross stitch', 'Ocean Color Palette', 'Mixed Techniques'],
      thumbEmojis: ['🔷', '⬡', '◈', '▲'],
      cover: seaShells,
      images: [seaShells1, seaShells2, seaShells3, seaShells4],
    },
    {
      title: 'Shadow Forms with Stripes',
      type: 'Luminous',
      emoji: '🌹',
      colors: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#fdf2f8'],
      desc: 'Concept: This design explores the contrast between shadow-like botanical forms and structured striped backgrounds, creating depth and layering.\n\nDesign Approach: Organic plant silhouettes are placed over horizontal stripes to highlight the interplay between softness and structure.\n\nPattern Development: A half-drop repeat is used to introduce movement and avoid visual monotony across the surface.\n\nColor Palette: Muted tones of dusty pink, sage green, and deep teal combined with blue and white stripes for a calm yet balanced composition.\n\nOutcome: A textile design that merges organic and linear elements, emphasizing rhythm, contrast, and visual harmony.',
      tools: ['Shadow Concept', 'Half Drop Repeat', 'Muted palette', 'Organic vs Structured', 'Surface Pattern'],
      thumbEmojis: ['🌹', '✿', '❀', '🪷'],
      cover: shadowForms,
      images: [shadowForms1, shadowForms2, shadowForms3, shadowForms4],
    },
    {
      title: ' Tie-Dye Resist Patterns Square Fold & Sunburst Techniques',
      type: ' Radiant',
      emoji: '🌿',
      colors: ['#f0fdf4', '#dcfce7', '#d1fae5', '#ecfdf5'],
      desc: 'Concept: This project explores traditional tie-dye techniques through the contrast of structured and organic resist patterns.\n\nDesign Approach: The square fold technique creates geometric, grid-like formations, while the sunburst technique produces radiating circular motifs, adding movement and variation.\n\nTechnique: Tie-dye resist (square fold and sunburst), hand-dyed fabric.\n\nColor Palette: Monochromatic indigo tones, highlighting depth and tonal variation.\n\nApplication: Developed as cushion designs, showcasing both techniques within a cohesive textile study.\n\nOutcome: A study of resist dyeing that balances control and unpredictability, creating visually distinct yet harmonious patterns.',
      tools: ['Tie-Dye Resist', 'Square Fold', 'Sunburst Technique', 'Indigo Color Palette', 'Textile Experiment'],
      thumbEmojis: ['🌿', '🦜', '🌻', '🍃'],
      cover: radiant,
      images: [radiant1, radiant2, radiant3, radiant4],
    },
    {
      title: 'The Art of Marbling',
      type: 'Fluidity',
      emoji: '🧵',
      colors: ['#fef3c7', '#fce7f3', '#e0f2fe', '#f0fdf4'],
      desc: 'Concept: This project explores marbling as a technique to create fluid, organic surface patterns through the interaction of paint on water.\n\nDesign Approach: Multiple compositions are developed to experiment with movement, texture, and color variation, resulting in unique swirling and layered patterns.\n\nColor Exploration: A range of palettes is used, from bold contrasts like black and white with orange accents to softer pastel tones including blue, pink, and green.\n\nTechnique: Marbling using oil paint on water.\n\nOutcome: A series of experimental textile surfaces showcasing fluid pattern formation, color variation, and expressive mark-making.',
      tools: ['Marbling Technique', 'Fluid Patterns', 'Color Exploration', 'Surface Experiment', 'Organic Forms'],
      thumbEmojis: ['🧵', '✂️', '🎨', '✨'],
      cover: fluidity,
      images: [fluidity1, fluidity2, fluidity3, fluidity4],
    },
  ]

  const skillGroups = [
    {
      icon: '🎨',
      title: 'Core Design Skills',
      tags: [
        'Surface Pattern Design',
        'Repeat Pattern Development',
        'Motif Design & Placement',
        'Color Palette Development',
      ],
    },
    {
      icon: '💻',
      title: 'Digital Tools',
      tags: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Digital Pattern Development',
        'Print Layout Preparation',
      ],
    },
    {
      icon: '🧵',
      title: 'Textile Techniques',
      tags: [
        'Block Printing',
        'Tie & Dye Techniques',
        'Stencil Printing',
        'Fabric Painting',
        'Basic Weaving',
        'Embroidery',
      ],
    },
    {
      icon: '✏️',
      title: 'Art & Design Foundation',
      tags: [
        'Sketching & Concept Drawing',
        'Illustration',
        'Composition & Layout',
        'Texture Development',
        'Mixed Media Exploration',
      ],
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

  useEffect(() => {
    if (lightbox.open) setLbMainImgFailed(false)
  }, [lightbox.open, lightbox.projectIdx, lightbox.thumbIdx])

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setSubmitState({
        loading: false,
        isError: true,
        message: 'Email service is not configured. Add your EmailJS keys in the .env file.',
      })
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
      setSubmitState({ loading: false, isError: false, message: 'Message sent successfully! ✓' })
      setFormData({ senderEmail: '', message: '' })
    } catch {
      setSubmitState({ loading: false, isError: true, message: 'Could not send your message. Please try again.' })
    }
  }

  const openLightbox = (idx) => setLightbox({ open: true, projectIdx: idx, thumbIdx: 0 })
  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }))
  const setThumb = (i) => setLightbox((prev) => ({ ...prev, thumbIdx: i }))

  const closeMenu = () => setMenuOpen(false)
  const activeProject = projects[lightbox.projectIdx]
  const lbSlides = activeProject.images?.length ? activeProject.images : null
  const hasLbImages = Boolean(lbSlides?.length)
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Gallery', 'Contact']
  const renderProjectDesc = (text) => {
    const highlightedLabels = new Set([
      'Concept',
      'Design Approach',
      'Application',
      'Technique',
      'Pattern Development',
      'Color Palette',
      'Color Exploration',
      'Outcome',
    ])
    return text.split('\n\n').map((block, i) => {
      const colonIdx = block.indexOf(':')
      if (colonIdx > 0) {
        const label = block.slice(0, colonIdx).trim()
        if (highlightedLabels.has(label)) {
          const content = block.slice(colonIdx + 1).trim()
          return (
            <span key={`${label}-${i}`} className="lb-desc-row">
              <span className="lb-desc-label">{label}:</span> {content}
            </span>
          )
        }
      }
      return <span key={`row-${i}`} className="lb-desc-row">{block}</span>
    })
  }

  return (
    <div className="portfolio">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-brand">
          <img src={logo} alt="Hareem Naz" style={{ maxWidth: '170px' }} />
        </div>

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
             Hi, I'm Hareem 
            <span className="hero-gradient">A Textile Designer</span>
            Exploring Patterns, Textures &amp; Color
          </h1>
          <p className="hero-sub">
          I create textile designs that combine traditional techniques like block printing and tie-dye with modern digital processes, focusing on surface patterns and fabric prints that are both visually engaging and production-ready.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in Touch ✦</a>
            <a href="#gallery" className="btn btn-outline">View My Work  →</a>
            <a href={cvPdfUrl} className="btn btn-download" download="Hameez-Naz-CV.pdf">
              <IconDownload className="btn-icon" />
              <span>Download CV</span>
            </a>
            {env.VITE_LINKEDIN_URL ? (
              <a
                href={env.VITE_LINKEDIN_URL}
                className="btn btn-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconLinkedIn className="btn-icon" />
                <span>LinkedIn</span>
              </a>
            ) : null}
          </div>
          <div className="hero-stats">
            {[['10+', 'Techniques'], ['2+', 'Years Study'], ['12+', 'Projects'], ['∞', 'Creativity']].map(([num, label]) => (
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
              <p>I am a textile design student specializing in surface pattern design, fabric prints, and color development. My work combines traditional techniques like block printing and tie-dye with digital tools to create thoughtful and production-ready textile designs.Inspired by nature and cultural elements, I focus on developing patterns that are both visually engaging and commercially relevant.</p>
              <p>My work is inspired by nature, contemporary trends, and cultural elements, I focus on developing patterns that are both visually engaging and commercially relevant.</p>
              <p><strong>I specialize in:</strong></p>
              <ul className="about-specialties">
                <li>Surface Pattern Design</li>
                <li>Fabric Print Development</li>
                <li>Digital Textile Design</li>
              </ul>
              <p>My goal is to design textiles that not only look beautiful but also communicate a story and connect with people.</p>
              <div className="about-stats">
                {[['2024', 'Started', 'rose'], ['10+', 'Techniques', 'teal'], ['∞', 'Ideas', 'gold']].map(([n, l, c]) => (
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
            <h2 className="section-title light">SKILLS &amp; EXPERTISE</h2>
            <p className="section-sub light">I combine traditional textile techniques with digital tools to create surface patterns and fabric designs that are both visually engaging and production ready.</p>
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
            <p className="section-sub muted">Developing practical skills in textile design through hands-on projects, focusing on surface patterns, fabric techniques, and design applications.</p>
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
                <p className="exp-org">Karachi School of Arts</p>
                <ul className="exp-list">
                  <li>Developed textile designs for home products including bedding and table linen.</li>
                  <li>Created surface patterns using block printing, tie-dye, and stencil techniques.</li>
                  <li>Designed repeat patterns and motifs through both hand and digital processes.</li>
                  <li>Explored color palettes and textures to enhance visual appeal and functionality.</li>
                  <li>Combined traditional craftsmanship with contemporary design approaches.</li>
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
            
          </div>
          <div className="gallery-grid reveal" ref={addReveal}>
            {projects.map((project, i) => (
              <article key={project.title} className="gallery-card" onClick={() => openLightbox(i)}>
                <GalleryThumb project={project} />
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
            <h2 className="contact-title">Let&apos;s collaborate and bring creative textile ideas to life.</h2>
            <p className="contact-sub">
              Contact me at{' '}
              <a href="mailto:hareemnaz24@gmail.com" className="contact-email">hareemnaz24@gmail.com</a>
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
        <span className="footer-brand">© 2026 Hareem Naz. All rights reserved.</span>
        </span>
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
              style={
                lbMainImgFailed || !hasLbImages
                  ? {
                      background: `linear-gradient(135deg, ${activeProject.colors[lightbox.thumbIdx]}, ${activeProject.colors[(lightbox.thumbIdx + 1) % activeProject.colors.length]})`,
                    }
                  : { background: '#1a0a12' }
              }
            >
              {!lbMainImgFailed && hasLbImages && lbSlides[lightbox.thumbIdx] ? (
                <img
                  key={`${lightbox.projectIdx}-${lightbox.thumbIdx}`}
                  src={lbSlides[lightbox.thumbIdx]}
                  alt=""
                  className="lb-main-img"
                  onError={() => setLbMainImgFailed(true)}
                />
              ) : (
                <span className="lb-main-emoji">{activeProject.thumbEmojis[lightbox.thumbIdx]}</span>
              )}
            </div>
            <div className="lb-thumbs">
              {hasLbImages
                ? lbSlides.map((src, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`lb-thumb ${i === lightbox.thumbIdx ? 'active' : ''}`}
                      onClick={() => setThumb(i)}
                      aria-label={`Image ${i + 1}`}
                    >
                      <span className="lb-thumb-emoji" aria-hidden>{activeProject.thumbEmojis[i]}</span>
                      <img
                        src={src}
                        alt=""
                        className="lb-thumb-img"
                        onError={(e) => {
                          e.currentTarget.classList.add('lb-thumb-img--hide')
                        }}
                      />
                    </button>
                  ))
                : activeProject.thumbEmojis.map((em, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`lb-thumb ${i === lightbox.thumbIdx ? 'active' : ''}`}
                      style={{
                        background: `linear-gradient(135deg, ${activeProject.colors[i]}, ${activeProject.colors[(i + 1) % activeProject.colors.length]})`,
                      }}
                      onClick={() => setThumb(i)}
                      aria-label={`Slide ${i + 1}`}
                    >
                      <span>{em}</span>
                    </button>
                  ))}
            </div>
            <div className="lb-body">
              <p className="lb-type">{activeProject.type}</p>
              <h3 className="lb-title">{activeProject.title}</h3>
              <p className="lb-desc">{renderProjectDesc(activeProject.desc)}</p>
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
