import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function renderBold(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

const FEATURES = ['robustness', 'profitability', 'sovereignty'];

/* On-brand illustrations for the three "hurdle" blocks.
   Swap any of these for a real photo later by replacing the <svg> with
   <img src="/your-photo.jpg" alt="" />. */
const HURDLE_ILLUS = [
  // 0 — Technical complexity: photo (code on screen)
  (
    <img src="/technical-complexity.jpg" alt="Technical complexity" />
  ),
  // 1 — Marketing challenges: photo
  (
    <img src="/marketing-challenge.jpg" alt="Marketing challenges" />
  ),
  // 2 — Strategic concerns: photo
  (
    <img src="/strategic-concern.jpg" alt="Strategic concerns" />
  ),
];

export default function Home() {
  const { tr } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="hero" aria-label="Hero">
        {/* Option A background — lightbulb + code symbols + AI nodes */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Lightbulb — halfway between left and center, half size */}
          <g transform="translate(320,200) scale(0.5)" opacity="0.22">
            <circle cx="0" cy="-30" r="70" fill="none" stroke="white" strokeWidth="6" />
            <path d="M-25,40 L25,40 M-20,55 L20,55 M-10,70 L10,70" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M-20,-20 Q0,5 20,-20" fill="none" stroke="white" strokeWidth="4" />
          </g>

          {/* Radiating rings around lightbulb */}
          <circle cx="320" cy="200" r="60" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <circle cx="320" cy="200" r="90" fill="none" stroke="white" strokeWidth="1" opacity="0.05" />
          <circle cx="320" cy="200" r="125" fill="none" stroke="white" strokeWidth="1" opacity="0.03" />

          {/* Code symbols — left */}
          <text x="160" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'</>'}</text>
          <text x="120" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'{ }'}</text>
          <text x="200" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'// AI'}</text>

          {/* Code symbols — right */}
          <text x="970" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'<AI/>'}</text>
          <text x="1010" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'[ ]'}</text>
          <text x="980" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'def idea'}</text>

          {/* AI node arcs */}
          {[
            [300,120],[420,80],[500,140],[700,80],[800,120],[900,90],
            [250,280],[380,320],[500,290],[700,310],[830,280],[950,320],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4"
              fill={i % 3 === 0 ? '#F59E0B' : 'white'}
              opacity={i % 3 === 0 ? 0.5 : 0.2}
            />
          ))}

          {/* Connecting lines */}
          <polyline points="300,120 420,80 500,140 600,170 700,80 800,120 900,90"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <polyline points="250,280 380,320 500,290 600,230 700,310 830,280 950,320"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <line x1="500" y1="140" x2="500" y2="290" stroke="white" strokeWidth="1" opacity="0.07" />
          <line x1="700" y1="80"  x2="700" y2="310" stroke="white" strokeWidth="1" opacity="0.07" />
        </svg>

        <div className="hero-content">
          <h1 className="hero-tagline">
            {tr.hero.tagline1}<br />{tr.hero.tagline2}
          </h1>
          <p className="hero-subtitle">{renderBold(tr.hero.subtitle)}</p>
        </div>
      </section>

      {/* Section 2 — CTA */}
      <section className="cta-section" aria-label="Get started">
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="fadeEdgeCta" cx="50%" cy="50%" r="55%">
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
          </defs>
          <text x="60"  y="200" fontFamily="monospace" fontSize="52" fill="#1E40AF" opacity="0.1" fontWeight="bold">{'</>'}</text>
          <text x="30"  y="310" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.18">{'{ }'}</text>
          <text x="950" y="200" fontFamily="monospace" fontSize="52" fill="#1E40AF" opacity="0.1" fontWeight="bold">{'<AI/>'}</text>
          <text x="990" y="310" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.18">{'[ ]'}</text>
          {[[200,80],[340,50],[460,90],[580,60],[700,85],[840,55],[980,90],[1080,65]].map(([cx,cy],i)=>(
            <circle key={`t${i}`} cx={cx} cy={cy} r="4" fill={i%3===0?'#F59E0B':'#1E40AF'} opacity={i%3===0?0.28:0.13}/>
          ))}
          <polyline points="200,80 340,50 460,90 580,60 700,85 840,55 980,90 1080,65" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.07"/>
          {[[150,190],[300,215],[440,180],[570,205],[700,185],[830,210],[970,185],[1100,205]].map(([cx,cy],i)=>(
            <circle key={`um${i}`} cx={cx} cy={cy} r="4" fill={i%3===1?'#F59E0B':'#1E40AF'} opacity={i%3===1?0.28:0.13}/>
          ))}
          <polyline points="150,190 300,215 440,180 570,205 700,185 830,210 970,185 1100,205" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.07"/>
          {[[160,530],[310,555],[450,520],[580,545],[710,525],[850,550],[990,520],[1110,545]].map(([cx,cy],i)=>(
            <circle key={`lm${i}`} cx={cx} cy={cy} r="4" fill={i%3===0?'#F59E0B':'#1E40AF'} opacity={i%3===0?0.28:0.13}/>
          ))}
          <polyline points="160,530 310,555 450,520 580,545 710,525 850,550 990,520 1110,545" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.07"/>
          {[[200,660],[360,680],[500,650],[640,670],[780,650],[920,675],[1060,655]].map(([cx,cy],i)=>(
            <circle key={`b${i}`} cx={cx} cy={cy} r="4" fill={i%3===2?'#F59E0B':'#1E40AF'} opacity={i%3===2?0.28:0.13}/>
          ))}
          <polyline points="200,660 360,680 500,650 640,670 780,650 920,675 1060,655" fill="none" stroke="#1E40AF" strokeWidth="1" opacity="0.07"/>
          {[340,460,580,700,840,980].map((x,i)=>(
            <line key={`v${i}`} x1={x} y1={50} x2={x+(i%2===0?-20:20)} y2={680} stroke="#1E40AF" strokeWidth="1" opacity="0.04"/>
          ))}
          <rect x="0" y="0" width="1200" height="750" fill="url(#fadeEdgeCta)" />
        </svg>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              🚀 {tr.cta.developer}
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/solutions')}>
              🔍 {tr.cta.customer}
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 — About / Narrative */}
      <section className="about-section" aria-label="About">
        <div className="about-inner">
          <p className="about-opening">{renderBold(tr.about.opening)} {tr.about.opening2}</p>
          <p className="about-opening">{tr.about.opening3}</p>
          <p className="about-opening">{tr.about.opening4}</p>
        </div>
      </section>

      {/* Hurdles header — full-width blue banner */}
      <section className="hurdles-header" aria-label="Hurdles">
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g transform="translate(600,200)" opacity="0.12">
            <circle cx="0" cy="-30" r="70" fill="none" stroke="white" strokeWidth="6" />
            <path d="M-25,40 L25,40 M-20,55 L20,55 M-10,70 L10,70" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M-20,-20 Q0,5 20,-20" fill="none" stroke="white" strokeWidth="4" />
          </g>
          <circle cx="600" cy="200" r="140" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <circle cx="600" cy="200" r="200" fill="none" stroke="white" strokeWidth="1" opacity="0.05" />
          <circle cx="600" cy="200" r="280" fill="none" stroke="white" strokeWidth="1" opacity="0.04" />
          <text x="160" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'</>'}</text>
          <text x="120" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'{ }'}</text>
          <text x="970" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'<AI/>'}</text>
          <text x="1010" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'[ ]'}</text>
          {[
            [300,120],[420,80],[500,140],[700,80],[800,120],[900,90],
            [250,280],[380,320],[500,290],[700,310],[830,280],[950,320],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4"
              fill={i % 3 === 0 ? '#F59E0B' : 'white'}
              opacity={i % 3 === 0 ? 0.5 : 0.2} />
          ))}
          <polyline points="300,120 420,80 500,140 600,170 700,80 800,120 900,90"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <polyline points="250,280 380,320 500,290 600,230 700,310 830,280 950,320"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
        </svg>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="hurdles-title">{tr.about.hurdlesTitle}</h2>
          <p className="hurdles-subtitle">{tr.about.hurdlesSubtitle}</p>
        </div>
      </section>

      {/* Hurdles blocks */}
      <section className="hurdles-body">
        <div className="container">
          <div className="hurdles">
            {tr.about.hurdles.map((h, i) => (
              <div className="hurdles-block" key={i}>
                <div className="hurdles-illus">{HURDLE_ILLUS[i]}</div>
                <div className="hurdles-text">
                  <h3>{h.title}</h3>
                  <ul className="hurdles-list">
                    {h.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="about-mission">
            <div className="about-mission-line">{tr.about.bold2top}</div>
            <div className="about-mission-mid">
              <span className="about-mission-rule" aria-hidden="true" />
              {tr.about.bold2mid}
              <span className="about-mission-rule" aria-hidden="true" />
            </div>
            <div className="about-mission-line">{tr.about.bold2bot}</div>
          </div>
        </div>
      </section>

      {/* Section 3 — Robustness / Profitability / Sovereignty */}
      <section className="features-section" aria-label="Key pillars">
        {/* Same SVG node vocabulary as hero for continuity */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="600" cy="200" r="180" fill="none" stroke="white" strokeWidth="1" opacity="0.06" />
          <circle cx="600" cy="200" r="280" fill="none" stroke="white" strokeWidth="1" opacity="0.04" />
          <text x="60"  y="120" fontFamily="monospace" fontSize="40" fill="white" opacity="0.08" fontWeight="bold">{'</>'}</text>
          <text x="40"  y="290" fontFamily="monospace" fontSize="22" fill="#F59E0B" opacity="0.2">{'{ }'}</text>
          <text x="960" y="120" fontFamily="monospace" fontSize="40" fill="white" opacity="0.08" fontWeight="bold">{'<AI/>'}</text>
          <text x="990" y="290" fontFamily="monospace" fontSize="22" fill="#F59E0B" opacity="0.2">{'[ ]'}</text>
          {[[220,60],[380,40],[520,75],[680,40],[840,65],[1000,45]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill={i%3===0?'#F59E0B':'white'} opacity={i%3===0?0.4:0.15} />
          ))}
          <polyline points="220,60 380,40 520,75 680,40 840,65 1000,45" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          {[[220,340],[380,360],[520,330],[680,355],[840,335],[1000,355]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill={i%3===1?'#F59E0B':'white'} opacity={i%3===1?0.4:0.15} />
          ))}
          <polyline points="220,340 380,360 520,330 680,355 840,335 1000,355" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="features-heading">{tr.features.heading}</h2>
          <p className="features-subheading">{renderBold(tr.features.subheading)}</p>
          <div className="features-grid">
            {FEATURES.map((key) => (
              <div className="feature-card" key={key}>
                <h3>{tr.features[key].title}</h3>
                <p>{tr.features[key].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <ContactForm />
    </>
  );
}

function ContactForm() {
  const { tr } = useLanguage();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setEmail('');
    setQuestion('');
  }

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="contact-heading">{tr.contact.heading}</h2>
        <p className="contact-subheading">{tr.contact.subheading}</p>
        {sent ? (
          <p className="contact-success">{tr.contact.success}</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-email">{tr.contact.email}</label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-question">{tr.contact.question}</label>
              <textarea
                id="contact-question"
                required
                rows={4}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="..."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              {tr.contact.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
