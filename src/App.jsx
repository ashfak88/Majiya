import { Fragment, useEffect, useState } from 'react'
import Credit from './components/Credit'
import Petals from './components/Petals'

const FLORAL = '/images/floral-border.png'
const GADAG_MAP_URL = 'https://maps.google.com/?q=Eidga+Shadi+Mahal,+Near+Aman+School,+Railway+Station+Road,+Gadag'
const KUNDGOL_MAP_URL = 'https://maps.google.com/?q=Anjuman+Shadi+Mahal,+Near+Court+circle,+Kundgol'
const WEDDING = new Date('2026-10-17T12:00:00+05:30')
const clip = { clipPath: 'inset(8px 0px 0px 0px)', marginTop: '-8px' }

const Dove = ({ wrap, img = '', style = clip }) => (
  <div className={wrap}>
    <img src="/images/dove.png" alt="Flying Dove" className={`w-full h-auto block ${img}`.trim()} style={style} />
  </div>
)
const Floral = () => (
  <img 
    src={FLORAL} 
    alt="Floral Border" 
    className="w-full h-auto object-cover block relative z-10" 
    style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
  />
)
const Mask = 'linear-gradient(to bottom, black 0%, black 60%, transparent 95%)'
function timeLeft() {
  const d = WEDDING.getTime() - Date.now()
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(d / 864e5),
    hours: Math.floor((d % 864e5) / 36e5),
    minutes: Math.floor((d % 36e5) / 6e4),
    seconds: Math.floor((d % 6e4) / 1e3),
  }
}

export default function App() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [form, setForm] = useState({ name: '', guests: '1', functionChoice: 'both', attending: 'yes' })
  const [sent, setSent] = useState(false)
  const [gate, setGate] = useState(true)
  const [opening, setOpening] = useState(false)
  const [cardsIn, setCardsIn] = useState(false)
  const [dot, setDot] = useState('0px')

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
    setTimeout(() => { setRsvpOpen(false); setSent(false); setForm({ name: '', guests: '1', functionChoice: 'both', attending: 'yes' }) }, 3000)
  }
  const cardIn = cardsIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
  const units = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]
  const swatches = [
    ['Royal Crimson', '#8c0913'],
    ['Antique Gold', '#b8860b'],
    ['Emerald Green', '#1b4d3e'],
    ['Champagne Ivory', '#dcd2be'],
  ]

  return (
    <div className="relative min-h-screen">
      <Petals />
      {/* Royal Opening Curtain / Gate */}
      {gate && (
        <div onClick={openGate} className="fixed inset-0 z-50 overflow-hidden flex cursor-pointer">
          <div 
            className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-1000 ease-in-out z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)] ${opening ? '-translate-x-full' : 'translate-x-0'}`}
            style={{ backgroundColor: '#790009', borderRight: '1px solid rgba(212, 175, 55, 0.4)' }}
          >
            <div className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(to right, #3d0003 0%, #8b000b 20%, #a1010e 40%, #540005 60%, #a1010e 80%, #3d0003 100%)' }}></div>
          </div>
          <div 
            className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-1000 ease-in-out z-40 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${opening ? 'translate-x-full' : 'translate-x-0'}`}
            style={{ backgroundColor: '#790009' }}
          >
            <div className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(to right, #3d0003 0%, #8b000b 20%, #a1010e 40%, #540005 60%, #a1010e 80%, #3d0003 100%)' }}></div>
          </div>
          <div
            className={`absolute inset-0 m-auto z-50 flex items-center justify-center transition-all duration-700 hover:scale-105 active:scale-95 filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${opening ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
            style={{ width: '140px', height: '140px' }}
          >
            <div className="w-full h-full rounded-full p-1.5 flex items-center justify-center" style={{ backgroundColor: '#800511', border: '2px solid #eed174' }}>
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center pt-2" style={{ border: '1px solid #eed174' }}>
                <span className="text-xl mb-1 drop-shadow-sm" style={{ color: '#eed174' }}>♥</span>
                <span className="tracking-[0.25em] uppercase font-serif font-bold ml-[0.25em]" style={{ color: '#eed174', fontSize: '11px' }}>OPEN</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative h-screen w-full flex items-center justify-center bg-[#fdfbf7] overflow-hidden z-20" 
        id="hero"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)' }}
      >
        <img
          src="/images/hero_invitation_card.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
        />
        <img
          src="/images/hero_invitation_card.jpg"
          alt="Nashiruddin &amp; Majiya - Wedding Invitation"
          className="relative z-10 w-full h-full object-contain mx-auto select-none drop-shadow-2xl"
        />
      </section>

      <div className="w-full relative -mt-40 pt-40 z-10" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, rgba(173,9,23,0.3) 50%, #ad0917 100%)' }}>
        <Dove wrap="absolute top-32 left-4 md:left-12 w-20 md:w-28 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="transform -scale-x-100" />
        <Dove wrap="absolute top-40 left-[22%] md:left-[28%] w-14 md:w-22 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="transform -scale-x-100 opacity-90" />
        <Dove wrap="absolute top-28 left-1/2 -translate-x-1/2 w-16 md:w-24 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Dove wrap="absolute top-36 right-[22%] md:right-[28%] w-14 md:w-22 pointer-events-none z-20 overflow-hidden mix-blend-multiply" img="opacity-90" />
        <Dove wrap="absolute top-32 right-4 md:right-12 w-20 md:w-28 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Floral />
      </div>

      <section className="bg-primary-container text-on-primary py-24 px-8 text-center relative z-10" id="message">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="font-['Amiri',serif] text-2xl md:text-3xl text-[#ffe088] opacity-95">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-[#ffe088]/90 tracking-widest italic max-w-xl mx-auto leading-relaxed">
            “And of His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them; and He placed between you love and mercy.” (Surah Ar-Rum 30:21)
          </p>
          <div className="w-16 h-0.5 bg-[#ffe088]/40 mx-auto" />
          <h3 className="font-script text-5xl md:text-6xl text-on-primary-container">Dear Friends and Family,</h3>
          <div className="font-display-lg italic text-lg md:text-xl leading-relaxed space-y-6 opacity-95">
            <p>
              With the divine blessings of Almighty Allah and the warm affection of our elders, we cordially invite you and your family to grace the auspicious occasion of the Nikah ceremony uniting
            </p>
            <p className="font-display-lg text-2xl md:text-3xl font-semibold text-[#ffe088] not-italic">
              Nashiruddin Pathan &amp; Majiya Kagadgar
            </p>
            <p>
              Your esteemed presence and heartfelt prayers (Duas) will be the most cherished blessing as they embark on this sacred journey of togetherness.
            </p>
          </div>
        </div>
      </section>

      {/* Countdown Timer to Nikah */}
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

      <div className="w-full relative" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ad0917 100%)' }}>
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
              [
                'first-timeline-dot',
                'Saturday, 17th Oct 2026',
                '12:00 PM',
                'Nikah Ceremony',
                ['Eidga Shadi Mahal', 'Near Aman School, Railway Station Road, Gadag'],
              ],
              [
                'last-timeline-dot',
                'Sunday, 18th Oct 2026',
                '01:00 PM',
                'Dawat-E-Walima',
                ['Anjuman Shadi Mahal', 'Near Court circle, Kundgol'],
              ],
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
                  <span className="font-display-lg text-lg md:text-xl font-semibold block text-[#ffe088]">{title}</span>
                  <span className="text-xs text-white/80 mt-1 block">{place[0]}<br />{place[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Both Wedding Venues with Maps */}
      <section className="bg-[#f0f0f0] py-24 text-center relative overflow-hidden" id="venue">
        <div className="max-w-5xl mx-auto space-y-12 px-6 relative z-20">
          <div className="grid grid-cols-1 gap-12 text-center">
            {/* Nikah Venue Card */}
            <div className="bg-white max-w-sm mx-auto w-full shadow-md flex flex-col items-center pt-10 pb-12 overflow-hidden">
              <h3 className="font-script text-5xl text-[#b51221] mb-6">Location</h3>
              <h4 className="font-display-lg text-3xl text-[#1f2937] mb-3 px-4">Eidga Shadi Mahal</h4>
              <p className="font-body-lg text-[#4b5563] text-lg italic px-4">Near Aman School,</p>
              <p className="font-body-lg text-[#4b5563] text-lg italic px-4">Railway Station Road, Gadag</p>
              
              <div className="w-full relative mt-8 mb-8 flex justify-center">
                <img 
                  src="/images/venue_sketch.png" 
                  alt="Venue Sketch" 
                  className="w-full h-auto object-cover opacity-90 scale-105"
                  style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
                />
              </div>

              <a
                href={GADAG_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-3/4 mx-auto text-center inline-block bg-[#aa111f] text-white px-6 py-3.5 font-body-sm text-sm tracking-[0.2em] shadow hover:bg-[#8f0e1a] transition-colors uppercase font-semibold cursor-pointer"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dove & Floral Border Transition */}
      <div className="w-full relative" style={{ background: 'linear-gradient(to bottom, #f0f0f0 0%, #ffffff 100%)' }}>
        <Dove wrap="absolute top-2 right-6 md:right-24 w-16 md:w-24 pointer-events-none z-20 overflow-hidden mix-blend-multiply" />
        <Floral />
      </div>



      {/* Details & Hosts / Contacts Section */}
      <section className="bg-surface py-24 px-8 text-center relative overflow-hidden" id="rsvp">
        <div className="max-w-2xl mx-auto space-y-12">
          <h3 className="font-script text-5xl text-primary-container">Invitation Details</h3>
          <div className="border-t border-b border-outline-variant/30 py-8 my-8 max-w-lg mx-auto space-y-6">
            <div>
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-3">Cordially Invited By</span>
              <p className="font-display-lg text-2xl text-on-surface font-semibold">Mr. Shijauddin Pathan</p>
              <p className="font-script text-primary text-2xl my-0.5">&amp;</p>
              <p className="font-display-lg text-2xl text-on-surface font-semibold">Mrs. Malan bi Pathan</p>
              <p className="font-body-sm text-xs text-primary font-semibold uppercase tracking-widest mt-1">(Groom&apos;s Parents)</p>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-2">With Kind Regards From</span>
              <p className="font-display-lg text-xl text-on-surface font-semibold">Mr. Mhamad ali Kagadgar &amp; Family</p>
              <p className="font-body-sm text-xs text-primary font-semibold uppercase tracking-widest mt-1">(Bride&apos;s Family)</p>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <span className="block text-xs font-label-caps uppercase text-on-surface-variant tracking-widest mb-2">Contact Numbers</span>
              <div className="flex flex-wrap justify-center items-center gap-4 text-on-surface font-display-lg text-base">
                <a href="tel:+919986295509" className="hover:text-primary transition-colors flex items-center space-x-1.5 font-semibold">
                  <span>📞</span>
                  <span>+91 99862 95509</span>
                </a>
                <span className="text-outline-variant">|</span>
                <a href="tel:+919482027869" className="hover:text-primary transition-colors flex items-center space-x-1.5 font-semibold">
                  <span>📞</span>
                  <span>+91 94820 27869</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4 max-w-xl mx-auto pt-2">
            <p className="font-display-lg italic text-on-surface-variant text-lg sm:text-xl leading-relaxed">
              “We cordially invite your esteemed presence with family and friends on the auspicious occasion of the marriage of our son.”
            </p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setRsvpOpen(true)}
              className="inline-block bg-primary-container text-on-primary px-10 py-4 font-display-lg text-base sm:text-lg tracking-[0.2em] shadow-xl hover:shadow-2xl hover:bg-primary-container/90 transition-all active:scale-95 cursor-pointer uppercase font-semibold"
            >
              CONFIRM ATTENDANCE
            </button>
            <a
              href="https://wa.me/919986295509?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20confirm%20attendance%20for%20Nashiruddin%20%26%20Majiya%27s%20Wedding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#25D366] text-white px-8 py-4 font-display-lg text-base sm:text-lg tracking-[0.15em] shadow-xl hover:bg-[#20ba5a] transition-all active:scale-95 cursor-pointer uppercase font-semibold"
            >
              <span>RSVP via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final Slide Section (No couple photos - magnificent royal wedding decor backdrop) */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden" id="final-slide">
        <img alt="Celebration Decor" className="absolute inset-0 w-full h-full object-cover" src="/images/final_slide_bg.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8F0E1C]/75 via-[#8F0E1C]/40 via-30% to-black/80 pointer-events-none" />
        <div className="relative z-10 text-center px-6">
          <h3 className="font-script text-[#ffe088] text-6xl md:text-8xl text-shadow-elegant leading-tight mb-4 drop-shadow-md">
            Hope to see you there!
          </h3>
          <div className="flex flex-col items-center justify-center mt-6">
            <span className="font-display-lg text-white text-3xl md:text-5xl tracking-[0.18em] uppercase drop-shadow-md font-bold">
              Nashiruddin Pathan
            </span>
            <span className="font-script text-[#ffe088] text-4xl md:text-6xl my-1 drop-shadow-md">
              and
            </span>
            <span className="font-display-lg text-white text-3xl md:text-5xl tracking-[0.18em] uppercase drop-shadow-md font-bold">
              Majiya Kagadgar
            </span>
          </div>
          <p className="font-display-lg italic text-white/90 text-sm md:text-base mt-6 tracking-wider max-w-lg mx-auto">
            With best compliments from Pathan &amp; Kagadgar Families, Relatives &amp; Friends
          </p>
        </div>
        <footer className="absolute bottom-8 left-0 right-0 z-10 text-center text-[10px] text-white/70 tracking-[0.35em] font-label-caps uppercase">
          © 2026 NASHIRUDDIN PATHAN &amp; MAJIYA KAGADGAR
        </footer>
        <Credit />
      </section>

      {/* RSVP Modal */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface max-w-md w-full rounded-2xl shadow-2xl p-8 relative border border-primary/20">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors text-2xl font-bold cursor-pointer">×</button>
            {sent ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto text-primary text-4xl">♥</div>
                <h4 className="font-script text-5xl text-primary-container">Thank You!</h4>
                <p className="font-display-lg italic text-lg text-on-surface">
                  {form.attending === 'yes' ? 'We look forward to celebrating with you!' : 'We appreciate your warm wishes!'}
                </p>
                <p className="text-xs text-on-surface-variant font-body-sm">Your RSVP details have been received.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="text-center">
                  <h4 className="font-script text-4xl text-primary-container mb-1">RSVP</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">Please confirm your attendance</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface text-sm"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">Which Function(s) will you attend?</label>
                    <select
                      value={form.functionChoice}
                      onChange={(e) => setForm({ ...form, functionChoice: e.target.value })}
                      className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface text-sm"
                    >
                      <option value="both">Both Nikah (17 Oct) &amp; Walima (18 Oct)</option>
                      <option value="nikah">Nikah Ceremony Only (17 Oct - Gadag)</option>
                      <option value="walima">Dawat-E-Walima Only (18 Oct - Kundgol)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">Will you attend?</label>
                      <select
                        value={form.attending}
                        onChange={(e) => setForm({ ...form, attending: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface text-sm"
                      >
                        <option value="yes">Yes, Attending</option>
                        <option value="no">Cannot Attend</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-label-caps uppercase text-on-surface-variant mb-1">No. of Guests</label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant bg-surface rounded focus:outline-none focus:border-primary text-on-surface text-sm"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ (Family)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 font-display-lg text-base tracking-widest hover:bg-primary/95 transition-all shadow-md active:scale-98 cursor-pointer font-semibold uppercase"
                >
                  SEND RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
