'use client'

import { useEffect, useState } from 'react'
import { Heart, Music2, VolumeX, Volume2, Sparkles, Mail, ChevronDown } from 'lucide-react'

const memories = [
  { src: '/media/photo-01.jpg', note: 'mon amour', rotate: '-3deg' },
  { src: '/media/photo-02.jpg', note: 'notre complicité', rotate: '4deg' },
  { src: '/media/photo-03.jpg', note: 'juste nous deux', rotate: '-2deg' },
  { src: '/media/photo-04.jpg', note: 'nos moments à deux', rotate: '3deg' },
  { src: '/media/photo-05.jpg', note: 'pour toujours', rotate: '-4deg' },
  { src: '/media/photo-06.jpg', note: 'mon chez-moi, c’est toi', rotate: '2deg' },
  { src: '/media/photo-07.jpg', note: 'mon sourire préféré', rotate: '-3deg' },
  { src: '/media/photo-08.jpg', note: 'toujours là pour moi', rotate: '3deg' },
]

const letter = `Joyeux anniversaire mon amour ❤️🥹🎂

Aujourd’hui, je veux simplement te rappeler à quel point tu comptes pour moi.

Ça fait 3 ans et 4 mois qu’on partage une histoire, avec ses hauts, ses bas, nos disputes, nos désaccords et parfois nos moments difficiles. Mais malgré tout, tu as toujours été là pour moi, et je n’oublierai jamais ça.

Merci d’avoir été présent dans les moments où j’avais besoin de toi, de m’avoir soutenue et de ne pas m’avoir laissée seule face à certaines épreuves.

Même quand on ne se comprend pas, même quand on se dispute, tu restes une personne qui occupe une place immense dans mon cœur.

Je ne te souhaite pas seulement un joyeux anniversaire, je prie surtout Allah de t’accorder une longue vie, une bonne santé, la réussite et tout le bonheur que ton cœur mérite.

Qu’Il te protège et facilite tous tes projets.

Sache que je tiens énormément à toi.

Merci pour ces 3 ans et 4 mois, pour ta présence et pour tout ce qu’on a partagé.

Je t’aime, et j’espère qu’on aura encore beaucoup de beaux moments à vivre ensemble. ❤️🥹`

function FloatingHearts({ count = 12 }: { count?: number }) {
  return <div className="hearts" aria-hidden="true">{Array.from({ length: count }).map((_, i) => <span key={i} style={{ '--i': i } as React.CSSProperties}>♥</span>)}</div>
}

function Photo({ src, note, rotate }: { src: string; note: string; rotate: string }) {
  return <figure className="polaroid" style={{ '--rotate': rotate } as React.CSSProperties}>
    <div className="photo-frame"><img src={src} alt={note} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('photo-placeholder') }} /></div>
    <figcaption>{note}</figcaption>
  </figure>
}

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [kissed, setKissed] = useState(false)
  const [music, setMusic] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const openLetter = () => {
    setOpened(true)
    document.body.classList.add('letter-opened')
    window.setTimeout(() => document.getElementById('birthday')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), reduced ? 0 : 1100)
  }

  return <main className={reduced ? 'reduce-motion' : ''}>
    {!opened && <section className="intro" aria-label="Introduction">
      <FloatingHearts count={8} />
      <div className="intro-copy"><span className="eyebrow">une petite attention pour toi</span><h1>Tu as du courrier !</h1><p>Une petite surprise pour toi...</p></div>
      <button className="envelope-button" onClick={openLetter} aria-label="Ouvrir ma lettre">
        <div className="envelope"><Mail size={42} strokeWidth={1.2} /><div className="flap" /><span className="seal">♥</span></div>
      </button>
      <button className="open-cta" onClick={openLetter}>Ouvrir ma lettre <Heart size={14} fill="currentColor" /></button>
      <button className="skip" onClick={openLetter}>passer l’introduction <ChevronDown size={14} /></button>
    </section>}

    <div className={opened ? 'site visible' : 'site'}>
      <button className="music-toggle" onClick={() => setMusic(!music)} aria-label={music ? 'Désactiver la musique' : 'Activer la musique'}>{music ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>{music ? 'son activé' : 'son désactivé'}</span></button>
      <section id="birthday" className="hero section-rule">
        <FloatingHearts />
        <div className="hero-kicker">pour celui qui fait chanter mon cœur</div>
        <div className="hero-title"><span className="slide-left">JOYEUX</span><span className="outline slide-right">ANNIVERSAIRE,</span><span className="script slide-up">mon amour</span></div>
        <div className="hero-portrait">
          <img src="/media/photo-02.jpg" alt="Photo de nous" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className="stamp">est. us<br /><b>2023</b></span>
        </div>
        <div className="hero-note note-one">ma personne préférée <Heart size={11} fill="currentColor" /></div><div className="hero-note note-two">pour toujours et à jamais</div>
        <p className="hero-bottom">Aujourd’hui, tout est à propos de toi.</p>
        <a className="scroll-cue" href="#memories">découvrir notre histoire <ChevronDown size={15} /></a>
      </section>

      <section id="memories" className="memories section-rule">
        <div className="section-heading"><span className="eyebrow">les petits détails</span><h2>Nos souvenirs</h2><p>Chaque photo raconte une histoire.</p></div>
        <div className="memory-grid">{memories.map((memory, i) => <Photo key={memory.src} {...memory} />)}<p className="between-note">Mes souvenirs préférés<br />sont avec toi.</p><p className="memory-counter">08 / ∞</p></div>
        <p className="duration">3 ans et 4 mois de nous.</p>
      </section>

      <section className="moments section-rule"><div className="section-heading"><span className="eyebrow">sous les projecteurs</span><h2>Ton moment, <em>ta passion</em> <span className="football">⚽</span></h2></div><div className="video-grid"><figure className="video-card"><video controls playsInline preload="metadata"><source src="/media/foot.mp4" type="video/mp4" /></video><figcaption>Continue de poursuivre tes rêves.</figcaption></figure><figure className="video-card offset"><video controls playsInline preload="metadata"><source src="/media/foot2.mp4" type="video/mp4" /></video><figcaption>Je suis toujours fière de toi.</figcaption></figure></div></section>

      <section className="reveal section-rule"><span className="eyebrow">une petite question</span><h2>Celui qui t&apos;a toujours<br />soutenue et encouragée...</h2><div className="voice-video"><video controls playsInline><source src="/media/voice-message.mp4" type="video/mp4" /></video><span className="play-note">écoute attentivement</span></div><p className="reveal-answer">LUI. OUI, LUI. <Heart size={30} fill="currentColor" /></p></section>

      <section className="love-letter section-rule"><div className="letter-paper"><div className="letter-top"><span>à ma personne préférée</span><Heart size={17} fill="currentColor" /></div><h2>Une lettre d&apos;amour</h2><div className="letter-body">{letter.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div><div className="signature">À toi pour toujours,<br /><span>Ta chérie <Heart size={15} fill="currentColor" /></span></div><div className="letter-doodle">de tout mon cœur</div></div></section>

      <section className="anniversary section-rule"><FloatingHearts count={6} /><span className="eyebrow">et ce n&apos;est que le début</span><h2><span>3 ANS</span><i>&</i><span>4 MOIS</span></h2><p>Tant de souvenirs, tant d&apos;histoires,<br />et encore tellement de choses à vivre.</p></section>

      <section className="finale"><FloatingHearts count={16} /><Sparkles className="sparkle sparkle-one" /><Sparkles className="sparkle sparkle-two" /><span className="eyebrow">une dernière chose</span><h2>Et si je devais choisir encore,<br /><em>je te choisirais toujours.</em></h2><p className="final-love">Joyeux anniversaire, mon amour. <Heart size={19} fill="currentColor" /></p><button className="kiss-button" onClick={() => setKissed(true)}>Un dernier bisou ? <span>💋</span></button>{kissed && <div className="kiss-reveal" role="status"><div className="kiss-hearts">♥ ♥ ♥</div><strong>JE T&apos;AIME</strong><span>toujours, toujours, toujours</span></div>}</section>
      <footer>fait avec amour, rien que pour toi <Heart size={12} fill="currentColor" /></footer>
    </div>
  </main>
}
