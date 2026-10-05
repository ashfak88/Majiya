import { Fragment, useEffect, useRef, useState } from 'react'
import Credit from './components/Credit'

const FLORAL = '/images/floral-border.png'
const MAP_URL = 'https://maps.google.com/?q=Royal+Orchid+Pavilion,+Whitefield,+Bangalore'
const WEDDING = new Date('2026-09-14T16:30:00+05:30')
const clip = { clipPath: 'inset(8px 0px 0px 0px)', marginTop: '-8px' }
const fill = 'absolute inset-0 w-full h-full'

const Dove = ({ wrap, img = '', style = clip }) => (
  <div className={wrap}>
    <img src="/images/dove.png" alt="Flying Dove" className={`w-full h-auto block ${img}`.trim()} style={style} />
  </div>
)
const Floral = () => <img src={FLORAL} alt="Floral Border" className="w-full h-auto object-cover block relative z-10 translate-y-[2px]" />
const Mask = 'linear-gradient(to bottom, black 0%, black 60%, transparent 95%)'
const gateBg = { backgroundImage: 'repeating-linear-gradient(to right, #6b040b 0px, #8c0913 25px, #ad0d19 50px, #8c0913 75px, #6b040b 100px)' }

function timeLeft() {
  const d = WEDDING.getTime() - Date.now()
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return { days: Math.floor(d / 864e5), hours: Math.floor((d % 864e5) / 36e5), minutes: Math.floor((d % 36e5) / 6e4), seconds: Math.floor((d % 6e4) / 1e3) }
}

export default function App() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [form, setForm] = useState({ name: '', attending: 'yes' })
  const [sent, setSent] = useState(false)
  const [gate, setGate] = useState(true)
  const [opening, setOpening] = useState(false)
  const [cardsIn, setCardsIn] = useState(false)
  const [dot, setDot] = useState('0px')
  const heroVideo = useRef(null)

  // some phones (low-power mode) refuse to autoplay on their own; try again on the first touch
  useEffect(() => {
    const v = heroVideo.current
    if (!v) return
    const play = () => v.play().catch(() => {})
    play()
    window.addEventListener('pointerdown', play, { once: true })
    return () => window.removeEventListener('pointerdown', play)
  }, [])

  useEffect(() => {
    const el = document.getElementById('dress-code-cards')
    if (!el || typeof IntersectionObserver === 'undefined') { setCardsIn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCardsIn(true) }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const move = () => {
      const c = document.getElementById('timeline-container'), a = document.getElementById('first-timeline-dot'), b = document.getElementById('last-timeline-dot')
      if (!c || !a || !b) return
      const cr = c.getBoundingClientRect(), ar = a.getBoundingClientRect(), br = b.getBoundingClientRect()
      const y0 = ar.top + ar.height / 2 - cr.top, y1 = br.top + br.height / 2 - cr.top
      const p = Math.max(0, Math.min(1, (window.innerHeight / 2 - cr.top) / cr.height))
      setDot(`${y0 + p * (y1 - y0)}px`)
    }
    window.addEventListener('scroll', move)
    const id = setTimeout(move, 100)
    return () => { window.removeEventListener('scroll', move); clearTimeout(id) }
  }, [])

  useEffect(() => {
    setT(timeLeft())
    const id = setInterval(() => setT(timeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const openGate = () => { setOpening(true); setTimeout(() => setGate(false), 1000) }
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setRsvpOpen(false); setSent(false); setForm({ name: '', attending: 'yes' }) }, 3000)
  }
  const cardIn = cardsIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
  const units = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]
  const swatches = [['Sage', '#8c7e4b'], ['Burgundy', '#3a1d26'], ['Slate', '#4d4545'], ['Taupe', '#9d8d8d']]

  return (
    <div className="relative min-h-screen">
      {gate && (
        <div onClick={openGate} className="fixed inset-0 z-50 overflow-hidden flex cursor-pointer">
          <div className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-1000 ease-in-out z-40 border-r border-[#ffe088]/20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] ${opening ? '-translate-x-full' : 'translate-x-0'}`} style={gateBg}>
            <div className="w-full h-full bg-gradient-to-b from-black/25 via-transparent to-black/35" />
          </div>
          <div className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-1000 ease-in-out z-40 border-l border-[#ffe088]/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${opening ? 'translate-x-full' : 'translate-x-0'}`} style={gateBg}>
            <div className="w-full h-full bg-gradient-to-b from-black/25 via-transparent to-black/35" />
          </div>
          <div className={`absolute inset-0 m-auto w-32 h-32 rounded-full z-50 flex flex-col items-center justify-center bg-[#8c0913] border-4 border-[#ffe088] shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95 ${opening ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="absolute inset-1 rounded-full border border-[#ffe088]/40 flex flex-col items-center justify-center">
              <span className="font-script text-[#ffe088] text-4xl mb-0.5">♥</span>
              <span className="font-display-lg text-[#ffe088] text-[10px] tracking-[0.25em] uppercase font-bold">Open</span>
            </div>
          </div>
        </div>
      )}

      <section className="relative h-screen w-full flex items-center justify-center bg-[#fdfbf7] overflow-hidden" id="hero">
        <video ref={heroVideo} className="absolute inset-0 w-full h-full object-cover" src="/images/the_video_should_be_looping_wi.mp4" autoPlay loop muted playsInline />
      </section>

      <div className="w-full bg-gradient-to-b from-[#fdfbf7] via-[#fdfbf7] via-40% to-primary-container relative">
        <Dove wrap="absolute top-2 left-4 md:left-12 w-20 md:w-28 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="transform -scale-x-100" />
        <Dove wrap="absolute top-4 left-[22%] md:left-[28%] w-14 md:w-22 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="transform -scale-x-100 opacity-90" />
        <Dove wrap="absolute top-1 left-1/2 -translate-x-1/2 w-16 md:w-24 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Dove wrap="absolute top-3 right-[22%] md:right-[28%] w-14 md:w-22 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="opacity-90" />
        <Dove wrap="absolute top-2 right-4 md:right-12 w-20 md:w-28 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Floral />
      </div>

      <section className="bg-primary-container text-on-primary py-24 px-8 text-center relative z-10" id="message">
        <div className="max-w-2xl mx-auto space-y-10">
          <h3 className="font-script text-5xl md:text-6xl text-on-primary-container">Dear Friends and Family,</h3>
          <div className="font-display-lg italic text-xl md:text-2xl leading-relaxed space-y-8 opacity-95">
            <p>As we get ready to say “I do,” we feel grateful for the wonderful people in our lives.</p>
            <p>Your support means the world to us, and we would be honored to have you with us as we begin our life together.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 text-center" id="countdown">
        <div className="max-w-xl mx-auto px-4">
          <h4 className="font-script text-4xl text-primary-container mb-12">The Celebration Begins In</h4>
          <div className="flex justify-between md:justify-center md:space-x-12 items-center">
            {units.map(([k, label], i) => (
              <Fragment key={k}>
                {i > 0 && <span className="font-display-lg text-4xl text-outline-variant">:</span>}
                <div className="flex flex-col">
                  <span className="font-display-lg text-5xl md:text-6xl text-on-surface transition-all duration-300 transform hover:scale-110">{t[k]}</span>
                  <span className="font-label-caps text-xs text-on-surface-variant mt-2">{label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-surface relative">
        <Dove wrap="absolute top-2 left-6 md:left-24 w-16 md:w-24 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="transform -scale-x-100" />
        <Floral />
      </div>

      <section className="bg-primary-container text-on-primary py-24 px-4 relative overflow-hidden" id="timeline">
        <div className="max-w-lg mx-auto text-center relative z-10">
          <h3 className="font-script text-5xl mb-16">Schedule of Events</h3>
          <div id="timeline-container" className="relative space-y-16 timeline-vertical">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 transition-[top] duration-500 ease-out" style={{ top: dot }}>
              <img alt="Scrolling Rose" className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-lg" src="/images/scrolling_rose.png" />
            </div>
            {[
              ['first-timeline-dot', 'Sunday, 13th Sept 2026', '09:30 AM - 10:30 AM', 'Marriage Solemnisation', ['The Grand Palace Hall', 'Indiranagar, Bangalore']],
              ['last-timeline-dot', 'Monday, 14th Sept 2026', '04:30 PM - 07:30 PM', 'Wedding Celebration', ['Royal Orchid Pavilion', 'Whitefield, Bangalore']],
            ].map(([id, day, time, title, place]) => (
              <div key={id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 group">
                <div className="text-right pr-4 transition-all duration-300 group-hover:scale-105">
                  <span className="font-label-caps text-xs block text-white/70">{day}</span>
                  <span className="font-display-lg text-xl md:text-2xl font-semibold">{time}</span>
                </div>
                <div className="relative z-10 flex justify-center">
                  <div id={id} className="w-3 h-3 bg-white rotate-45 border border-tertiary transition-transform duration-500 group-hover:scale-125" />
                </div>
                <div className="text-left pl-4 leading-tight">
                  <span className="font-display-lg text-lg md:text-xl font-semibold block">{title}</span>
                  <span className="text-xs text-white/80 mt-1 block">{place[0]}<br />{place[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 text-center relative overflow-hidden" id="venue">
        <div className="absolute top-2 right-2 w-36 md:w-52 pointer-events-none opacity-85 z-10 overflow-hidden">
          <img src="/images/dove.png" alt="Flying Dove" className="w-full h-auto mix-blend-multiply block" style={clip} />
        </div>
        <div className="max-w-2xl mx-auto space-y-10 px-6 relative z-20">
          <h3 className="font-script text-5xl text-primary-container">Location</h3>
          <div className="space-y-2">
            <h4 className="font-display-lg text-3xl text-on-surface">Royal Orchid Pavilion</h4>
            <p className="font-body-lg text-on-surface-variant italic">Whitefield, Bangalore,</p>
            <p className="font-body-lg text-on-surface-variant italic">Karnataka, India</p>
          </div>
        </div>
        <div className="pt-8 w-full">
          <img alt="Venue Sketch" className="w-full h-auto max-w-6xl mx-auto object-cover transition-all duration-700 hover:scale-102" style={{ maskImage: Mask, WebkitMaskImage: Mask }} src="/images/venue_building_full.png" />
        </div>
        <div className="mt-8">
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-container text-on-primary px-8 py-4 font-display-lg text-sm tracking-[0.25em] shadow-md hover:shadow-lg hover:bg-primary-container/90 transition-all active:scale-95 cursor-pointer uppercase">Get Directions</a>
        </div>
      </section>

      <div className="w-full bg-surface relative">
        <Dove wrap="absolute top-2 right-6 md:right-24 w-16 md:w-24 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Floral />
      </div>

      <section className="bg-primary-container text-on-primary py-24 px-6 relative" id="dress-code">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="font-script text-5xl">Dress Code</h3>
          <p className="font-display-lg italic opacity-90 max-w-2xl mx-auto text-lg md:text-xl">We kindly invite you to dress in elegant attire that reflects the style and spirit of our special day.</p>
          <div className="flex justify-center flex-wrap gap-6 py-6">
            {swatches.map(([name, c]) => (
              <div key={name} className="flex flex-col items-center space-y-2 group">
                <div className="w-16 h-16 rounded-full border-4 border-white/30 shadow-xl transition-all duration-300 transform group-hover:scale-110" style={{ background: c }} />
                <span className="text-[10px] uppercase tracking-widest font-label-caps">{name}</span>
              </div>
            ))}
          </div>
          <div id="dress-code-cards" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 px-4">
            {[
              ['Save The Date', '/images/inspiration_1.png', 'rotate-[-2deg]', '', 'Save The Date:', 'A celebration of love, laughter, and a beautiful lifetime ahead. We are so excited to share our special day with all our beloved friends and family.'],
              ['Our Engagement', '/images/inspiration_2.png', 'rotate-[3deg]', 'mt-8 md:mt-0 delay-200', 'Our Engagement:', 'A journey together, hand on hand, filled with love and promise. The beginning of a beautiful forever.'],
            ].map(([alt, src, rot, extra, h, p]) => (
              <div key={alt} className={`relative group transition-all duration-1000 ease-out ${extra} ${cardIn}`.replace(/\s+/g, ' ')}>
                <div className={`bg-surface p-3 ${rot} shadow-2xl transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02]`}>
                  <div className="relative aspect-[4/5] bg-surface-dim overflow-hidden">
                    <img alt={alt} src={src} className="object-cover scale-[1.03]" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                  </div>
                  <div className="p-6 text-on-surface text-left">
                    <h5 className="font-display-lg font-bold text-lg mb-2">{h}</h5>
                    <p className="font-body-sm leading-relaxed opacity-80">{p}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 px-8 text-center relative overflow-hidden" id="rsvp">
        <div className="max-w-2xl mx-auto space-y-12">
          <h3 className="font-script text-5xl text-primary-container">Details</h3>
          <div className="border-t border-b border-outline-variant/30 py-8 my-8 max-w-md mx-auto space-y-6">
            <div>
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-2">Invited By (Hosts)</span>
              <p className="font-display-lg text-2xl text-on-surface font-semibold">Mr. Ramesh Sharma</p>
              <p className="font-script text-primary text-2xl my-0.5">&amp;</p>
              <p className="font-display-lg text-2xl text-on-surface font-semibold">Mrs. Sunita Sharma</p>
            </div>
            <div className="pt-2">
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-1">Residence Address</span>
              <p className="font-body-lg text-on-surface-variant italic">Villa 42, Green Meadows,</p>
              <p className="font-body-lg text-on-surface-variant italic">Whitefield, Bangalore</p>
            </div>
            <div className="pt-2">
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-1">Contact Numbers</span>
              <div className="flex justify-center space-x-6 text-on-surface font-display-lg text-base">
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
                <span className="text-outline-variant">|</span>
                <a href="tel:+919123456789" className="hover:text-primary transition-colors">+91 91234 56789</a>
              </div>
            </div>
          </div>
          <div className="space-y-4 max-w-xl mx-auto pt-4">
            <p className="font-display-lg italic text-on-surface-variant text-xl leading-relaxed">“We cordially invite your esteemed presence with family on the auspicious occasion of the marriage of our Son.”</p>
          </div>
          <div className="pt-6">
            <button onClick={() => setRsvpOpen(true)} className="inline-block bg-primary-container text-on-primary px-12 py-5 font-display-lg text-xl tracking-[0.2em] shadow-xl hover:shadow-2xl hover:bg-primary-container/90 transition-all active:scale-95 cursor-pointer">CONFIRM ATTENDANCE</button>
          </div>
        </div>
      </section>

      <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden" id="final-slide">
        <img alt="Aditya and Riya" className="absolute inset-0 w-full h-full object-cover" src="/images/couple_last_slide.png" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8F0E1C]/60 via-[#8F0E1C]/25 via-25% to-transparent pointer-events-none" />
        <div className="relative z-10 text-center px-6">
          <h3 className="font-script text-white text-7xl md:text-8xl text-shadow-elegant leading-tight mb-4 drop-shadow-md">Hope to see you there!</h3>
          <div className="flex flex-col items-center justify-center mt-6">
            <span className="font-display-lg text-white text-3xl md:text-4xl tracking-[0.2em] uppercase drop-shadow-md">Aditya Sharma</span>
            <span className="font-script text-[#ffe088] text-4xl md:text-5xl my-1 drop-shadow-md">and</span>
            <span className="font-display-lg text-white text-3xl md:text-4xl tracking-[0.2em] uppercase drop-shadow-md">Riya Patel</span>
          </div>
        </div>
        <footer className="absolute bottom-8 left-0 right-0 z-10 text-center text-[10px] text-white/70 tracking-[0.4em] font-label-caps uppercase">© 2026 ADITYA SHARMA &amp; RIYA PATEL</footer>
        <Credit />
      </section>

      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface max-w-md w-full rounded-lg shadow-2xl p-8 relative border border-primary/20">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors text-2xl font-bold cursor-pointer">×</button>
            {sent ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto text-primary text-4xl">♥</div>
                <h4 className="font-script text-5xl text-primary-container">Thank You!</h4>
                <p className="font-display-lg italic text-lg text-on-surface">{form.attending === 'yes' ? 'We look forward to celebrating with you!' : 'We are sorry you cannot make it, but appreciate your response.'}</p>
                <p className="text-xs text-on-surface-variant font-body-sm">Your RSVP details have been received.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="text-center">
                  <h4 className="font-script text-4xl text-primary-container mb-2">RSVP</h4>
                  <p className="font-body-sm text-on-surface-variant">Please confirm your attendance</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">Full Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">Will you attend?</label>
                    <select value={form.attending} onChange={(e) => setForm({ ...form, attending: e.target.value })} className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface">
                      <option value="yes">Yes, I will be attending</option>
                      <option value="no">No, I cannot attend</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-on-primary py-3 font-display-lg text-lg tracking-widest hover:bg-primary/95 transition-all shadow-md active:scale-98 cursor-pointer">SEND RSVP</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
