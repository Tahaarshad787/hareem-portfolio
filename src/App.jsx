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
      desc: 'This bedding set is inspired by the rich visual language of traditional Chinese tapestry, reflecting elegance, symbolism, and rhythmic pattern composition. The set includes a duvet cover, flat bedsheet, fitted bedsheet, pillows, and back cushions, designed as a cohesive collection. The design features stylized floral motifs and flowing vine elements, influenced by traditional East Asian decorative patterns. These motifs are arranged with a sense of balance and movement, echoing the ornamental qualities often found in Chinese textile art. The use of organic curves and delicate detailing enhances the overall sophistication of the design. A full drop repeat pattern is applied on the main bedsheet, ensuring seamless continuity and demonstrating an understanding of professional textile repeat systems. The placement of motifs across different components of the set is carefully considered to maintain visual harmony. The color palette draws inspiration from classic Chinese aesthetics, incorporating rich and warm tones that create a bold yet graceful appearance. The entire design is executed using poster paints, showcasing control over brushwork, color blending, and surface technique. This project highlights the integration of cultural inspiration with contemporary textile application, reflecting strong skills in motif development, repeat design, and product visualization.',
      tools: ['Chinese tapestry inspired', 'Rhythm & balance', 'Poster paint', 'Motif development'],
      thumbEmojis: ['🌸', '🌺', '🌼', '🌷'],
      cover: chineseCover,
      images: [bedding1, bedding2, bedding3, bedding4],
    },
    {
      title: 'Table Linen Design Indian Booti Inspired',
      type: 'Booti Pattern',
      emoji: '💙',
      colors: ['#e0f2fe', '#dbeafe', '#e0e7ff', '#ede9fe'],
      desc: 'This table linen set is inspired by the traditional Indian Booti motif, known for its delicate, repetitive floral elements and timeless appeal in textile design. The collection includes a tablecloth, table runner, placemat, napkin, and coaster, all designed to maintain a cohesive and balanced aesthetic.The design prominently features stylized booti motifs, combined with complementary floral elements, arranged in a structured yet visually pleasing composition. The motifs reflect traditional Indian textile ornamentation, characterized by symmetry, repetition, and fine detailing.A full drop repeat pattern is developed for the tablecloth, ensuring seamless continuity across the surface. The arrangement of motifs is carefully adapted for each product within the set—larger layouts for the tablecloth and runner, and more minimal, placement-based designs for napkins and coasters—creating both variety and harmony within the collection.The color palette is soft yet elegant, enhancing the traditional essence while giving the design a contemporary touch. The entire set is executed using poster paints, demonstrating precision in brushwork, clean edges, and effective color application.This project reflects a strong understanding of traditional motif adaptation, repeat pattern development, and product-based design, translating heritage inspiration into functional textile applications.',
      tools: ['Booti pattern', 'Soft palette', 'Traditional aesthetic', 'Contemporary touch'],
      thumbEmojis: ['💙', '🌊', '✨', '🦋'],
      cover: booti,
      images: [booti1, booti2, booti3, booti4],
    },
    {
      title: 'Sea Shells & Corals (Cross Stitch Integration)',
      type: 'Oceanic',
      emoji: '🔷',
      colors: ['#fef3c7', '#ffedd5', '#fce7f3', '#f0fdf4'],
      desc: 'This textile design is inspired by the beauty of underwater marine life, particularly sea shells and coral formations. The theme explores the organic shapes, textures, and calm rhythm of the ocean, translated into a decorative surface pattern.The composition features a variety of stylized shells, corals, and sea plants arranged over a deep ocean-blue background. Soft pastel tones such as blush pink, muted green, off-white, and accents of orange are used to create contrast while maintaining a soothing, aquatic color palette.The design is developed using a half drop repeat, where motifs are staggered vertically to create a more dynamic and flowing arrangement. This repeat style enhances visual movement, mimicking the natural drift and balance found in underwater environments.A cross stitch technique is incorporated as a central element, adding texture and a handcrafted feel to the design. The stitched section introduces a pixel-like structure that contrasts with the smooth printed motifs, creating an interesting fusion of traditional embroidery and surface design.Overall, the design aims to capture the serenity and richness of marine life while experimenting with repeat patterns and mixed textile techniques.',
      tools: ['Ocean rhythm', 'Cross stitch', 'Handcrafted feel', 'Ocean palette'],
      thumbEmojis: ['🔷', '⬡', '◈', '▲'],
      cover: seaShells,
      images: [seaShells1, seaShells2, seaShells3, seaShells4],
    },
    {
      title: 'Shadow Forms with Stripes',
      type: 'Luminous',
      emoji: '🌹',
      colors: ['#fce7f3', '#fbcfe8', '#f9a8d4', '#fdf2f8'],
      desc: 'This textile design explores the theme of shadow, focusing on the interplay between organic forms and structured backgrounds. The composition features stylized botanical silhouettes that resemble shadow-like shapes, creating a sense of depth and layering.The background is developed using horizontal stripes in varying tones of blue and white, representing rhythm and continuity. These stripes contrast with the soft, flowing plant motifs, enhancing the visual impact of the “shadow” effect. The muted color palette—featuring dusty pinks, sage green, and deep teal—adds a calm yet sophisticated feel to the design.The pattern is arranged in a half drop repeat, where motifs are staggered vertically. This arrangement breaks monotony and introduces movement, allowing the design to appear more natural and dynamic across the surface.Overall, the design combines the concept of shadow with linear elements, creating a balanced composition that merges softness with structure. The use of contrast between stripes and organic shapes highlights depth, rhythm, and visual harmony.',
      tools: ['Layered composition', 'Muted palette', 'Color harmony', 'Surface layering'],
      thumbEmojis: ['🌹', '✿', '❀', '🪷'],
      cover: shadowForms,
      images: [shadowForms1, shadowForms2, shadowForms3, shadowForms4],
    },
    {
      title: ' Tie-Dye Resist Patterns – Square Fold & Sunburst Techniques',
      type: ' Radiant',
      emoji: '🌿',
      colors: ['#f0fdf4', '#dcfce7', '#d1fae5', '#ecfdf5'],
      desc: 'This textile exploration focuses on traditional tie-dye resist techniques, highlighting the controlled manipulation of fabric to create structured and organic patterns.The first cushion is developed using the square fold technique, where the fabric is systematically folded and bound to produce a grid-like pattern. The resulting design features intersecting linear formations with soft, diffused edges, demonstrating precision combined with the fluidity of dye absorption.The second cushion utilizes the sunburst technique, achieved through point binding. This method creates radiating circular motifs that resemble bursts of light, adding a sense of movement and rhythm to the composition.A monochromatic indigo color palette is employed across both pieces, emphasizing tonal variation and enhancing the visual depth of the resist patterns. The contrast between the geometric order of the square fold and the organic dynamism of the sunburst creates a balanced and engaging textile study.Overall, this work reflects an exploration of traditional dyeing methods, showcasing the interplay between control and unpredictability while producing visually distinct yet harmonious surface designs.',
      tools: ['Monochromatic', 'Textile experiment', 'Dyeing process', 'Cushion design'],
      thumbEmojis: ['🌿', '🦜', '🌻', '🍃'],
      cover: radiant,
      images: [radiant1, radiant2, radiant3, radiant4],
    },
    {
      title: 'The Art of Marbling',
      type: 'Fluidity',
      emoji: '🧵',
      colors: ['#fef3c7', '#fce7f3', '#e0f2fe', '#f0fdf4'],
      desc: 'This assignment explores the artistic technique of marbling, where oil paint and water interact to create flowing, organic patterns. Because oil and water naturally repel each other, the paint floats and spreads unpredictably across the surface, forming unique swirls, veins, and textures.In the image, six small compositions are mounted on a warm-toned background, each showcasing a different color combination and pattern. Some pieces emphasize bold contrast—like black and white with hints of orange—while others use softer palettes such as pastel blues, pinks, and greens. The designs range from tightly swirled, high-energy movement to more subtle, airy blends with scattered droplets.',
      tools: ['Oil paint', 'Water interaction', 'Fluid art', 'Floating paint'],
      thumbEmojis: ['🧵', '✂️', '🎨', '✨'],
      cover: fluidity,
      images: [fluidity1, fluidity2, fluidity3, fluidity4],
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
            <a href={cvPdfUrl} className="btn btn-ghost" download="Hameez-Naz-CV.pdf">
              Download CV
            </a>
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
            <h2 className="contact-title">Let&apos;s Work Together</h2>
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