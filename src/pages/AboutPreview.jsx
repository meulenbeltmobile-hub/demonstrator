import { useLanguage } from '../context/LanguageContext';

function AboutContent({ tr }) {
  return (
    <div className="about-inner" style={{ position: 'relative', zIndex: 1 }}>
      <p className="about-opening">{tr.about.opening}</p>
      <div className="about-callout">{tr.about.bold1}</div>
      <div className="about-cards">
        <div className="about-card">{tr.about.card1}</div>
        <div className="about-card">{tr.about.card2}</div>
        <div className="about-card">{tr.about.card3}</div>
      </div>
      <div className="about-callout mission">{tr.about.bold2}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   OPTION A — "Watermark Trio"
   Three large faint icons spread across the
   section: bulb top-left, </> centre-right,
   brain bottom-right. Nodes connect them like
   a thread. Very soft — text stays primary.
══════════════════════════════════════════════ */
function OptionA({ tr }) {
  return (
    <section className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">

        {/* Lightbulb — top left */}
        <g transform="translate(130,130)" opacity="0.07">
          <circle cx="0" cy="0" r="80" fill="none" stroke="#1E40AF" strokeWidth="8" />
          <path d="M-30,80 L30,80 M-24,100 L24,100 M-14,120 L14,120"
            stroke="#1E40AF" strokeWidth="8" strokeLinecap="round" />
          <path d="M-28,20 Q0,-30 28,20" fill="none" stroke="#1E40AF" strokeWidth="6" />
          {/* Rays */}
          <line x1="0" y1="-100" x2="0" y2="-130" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="70" y1="-70" x2="90" y2="-90" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="-70" y1="-70" x2="-90" y2="-90" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="95" y1="0" x2="120" y2="0" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="-95" y1="0" x2="-120" y2="0" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Code brackets — centre right */}
        <g transform="translate(1000,340)" opacity="0.06">
          <text x="-90" y="60" fontFamily="monospace" fontSize="160" fill="#1E40AF" fontWeight="900">{'<>'}</text>
          <text x="-10" y="50" fontFamily="monospace" fontSize="50" fill="#F59E0B" opacity="1.5" fontWeight="bold">{'/'}</text>
        </g>

        {/* Brain/AI — bottom left */}
        <g transform="translate(160,580)" opacity="0.07">
          <ellipse cx="0" cy="0" rx="70" ry="55" fill="none" stroke="#1E40AF" strokeWidth="6" />
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#1E40AF" strokeWidth="3" opacity="0.5" />
          <circle cx="-35" cy="-22" r="9" fill="#1E40AF" />
          <circle cx="35" cy="-22" r="9" fill="#1E40AF" />
          <circle cx="-55" cy="5" r="7" fill="#F59E0B" />
          <circle cx="55" cy="5" r="7" fill="#F59E0B" />
          <circle cx="0" cy="5" r="10" fill="#1E40AF" />
          <line x1="-35" y1="-22" x2="0" y2="5" stroke="#1E40AF" strokeWidth="2" />
          <line x1="35" y1="-22" x2="0" y2="5" stroke="#1E40AF" strokeWidth="2" />
          <line x1="-55" y1="5" x2="0" y2="5" stroke="#1E40AF" strokeWidth="2" />
          <line x1="55" y1="5" x2="0" y2="5" stroke="#1E40AF" strokeWidth="2" />
          <line x1="-25" y1="55" x2="-25" y2="80" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
          <line x1="25" y1="55" x2="25" y2="80" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
          <line x1="-25" y1="80" x2="25" y2="80" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Connecting node thread */}
        {[[130,130],[300,220],[500,300],[700,340],[900,360],[1000,340]].map(([x,y],i,a) =>
          i < a.length-1 ? <line key={i} x1={x} y1={y} x2={a[i+1][0]} y2={a[i+1][1]}
            stroke="#1E40AF" strokeWidth="1" opacity="0.06" strokeDasharray="6 6" /> : null
        )}
        {[[130,130],[300,220],[500,300],[700,340],[900,360],[1000,340]].map(([x,y],i) =>
          <circle key={i} cx={x} cy={y} r="4" fill={i%2===0?'#1E40AF':'#F59E0B'} opacity="0.15" />
        )}
      </svg>
      <AboutContent tr={tr} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   OPTION B — "Left Margin Story"
   A vertical blue stripe runs down the left
   edge. Icons are pinned along it like milestones:
   bulb at top, code in middle, brain at bottom.
   Orange accent dots mark key transitions.
   Feels like a structured roadmap !
══════════════════════════════════════════════ */
function OptionB({ tr }) {
  return (
    <section className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">

        {/* Vertical gradient spine */}
        <defs>
          <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect x="58" y="60" width="4" height="580" fill="url(#spine)" rx="2" />

        {/* Bulb milestone — top */}
        <g transform="translate(60,110)" opacity="0.15">
          <circle cx="0" cy="0" r="36" fill="none" stroke="#1E40AF" strokeWidth="4" />
          <path d="M-12,36 L12,36 M-9,46 L9,46" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
          <path d="M-12,8 Q0,-12 12,8" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <line x1="0" y1="-44" x2="0" y2="-56" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="-32" x2="40" y2="-40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="-32" y1="-32" x2="-40" y2="-40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="62" cy="110" r="7" fill="#F59E0B" opacity="0.4" />

        {/* Code milestone — middle */}
        <g transform="translate(60,350)" opacity="0.12">
          <text x="-40" y="22" fontFamily="monospace" fontSize="60" fill="#1E40AF" fontWeight="900">{'<>'}</text>
          <text x="-6" y="18" fontFamily="monospace" fontSize="20" fill="#F59E0B" fontWeight="bold">{'/'}</text>
        </g>
        <circle cx="62" cy="350" r="7" fill="#1E40AF" opacity="0.35" />

        {/* Brain milestone — bottom */}
        <g transform="translate(60,570)" opacity="0.14">
          <ellipse cx="0" cy="0" rx="34" ry="26" fill="none" stroke="#1E40AF" strokeWidth="4" />
          <circle cx="-16" cy="-10" r="5" fill="#1E40AF" />
          <circle cx="16" cy="-10" r="5" fill="#1E40AF" />
          <circle cx="0" cy="4" r="6" fill="#F59E0B" />
          <line x1="-16" y1="-10" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="16" y1="-10" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="-12" y1="26" x2="-12" y2="40" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="26" x2="12" y2="40" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
          <line x1="-12" y1="40" x2="12" y2="40" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="62" cy="570" r="7" fill="#F59E0B" opacity="0.4" />

        {/* Faint horizontal echoes */}
        <line x1="62" y1="110" x2="200" y2="110" stroke="#1E40AF" strokeWidth="1" opacity="0.06" strokeDasharray="4 4" />
        <line x1="62" y1="350" x2="200" y2="350" stroke="#F59E0B" strokeWidth="1" opacity="0.06" strokeDasharray="4 4" />
        <line x1="62" y1="570" x2="200" y2="570" stroke="#1E40AF" strokeWidth="1" opacity="0.06" strokeDasharray="4 4" />

        {/* Very faint right-side scatter dots */}
        {[[900,80],[1050,160],[1100,300],[1020,460],[930,580]].map(([x,y],i)=>
          <circle key={i} cx={x} cy={y} r={i%2===0?5:3}
            fill={i%2===0?'#1E40AF':'#F59E0B'} opacity="0.07" />
        )}
      </svg>
      <AboutContent tr={tr} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   OPTION C — "Corner Halos"
   Each icon lives in a corner with a soft radial
   glow behind it. The four corners: bulb top-left,
   code top-right, brain bottom-left, nodes
   bottom-right. A very faint dot-grid fills the
   centre — gives depth without distracting.
══════════════════════════════════════════════ */
function OptionC({ tr }) {
  const dotGrid = [];
  for (let x = 200; x < 1000; x += 80) {
    for (let y = 100; y < 650; y += 80) {
      dotGrid.push([x, y]);
    }
  }
  return (
    <section className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Corner halos */}
        <ellipse cx="120" cy="120" rx="160" ry="160" fill="url(#glowBlue)" />
        <ellipse cx="1080" cy="120" rx="160" ry="160" fill="url(#glowOrange)" />
        <ellipse cx="120" cy="600" rx="160" ry="160" fill="url(#glowOrange)" />
        <ellipse cx="1080" cy="600" rx="160" ry="160" fill="url(#glowBlue)" />

        {/* Dot grid */}
        {dotGrid.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#1E40AF" opacity="0.06" />
        ))}

        {/* Top-left: Lightbulb */}
        <g transform="translate(110,110)" opacity="0.13">
          <circle cx="0" cy="0" r="44" fill="none" stroke="#1E40AF" strokeWidth="5" />
          <path d="M-16,44 L16,44 M-11,57 L11,57 M-6,68 L6,68"
            stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" />
          <path d="M-16,10 Q0,-18 16,10" fill="none" stroke="#F59E0B" strokeWidth="4" />
          <line x1="0" y1="-55" x2="0" y2="-70" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <line x1="40" y1="-40" x2="50" y2="-50" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <line x1="-40" y1="-40" x2="-50" y2="-50" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <line x1="54" y1="0" x2="68" y2="0" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <line x1="-54" y1="0" x2="-68" y2="0" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Top-right: Code */}
        <g transform="translate(1080,90)" opacity="0.1">
          <text x="-72" y="36" fontFamily="monospace" fontSize="90" fill="#1E40AF" fontWeight="900">{'<>'}</text>
          <text x="-10" y="28" fontFamily="monospace" fontSize="30" fill="#F59E0B" fontWeight="bold">{'/'}</text>
        </g>

        {/* Bottom-left: Brain */}
        <g transform="translate(110,600)" opacity="0.12">
          <ellipse cx="0" cy="0" rx="50" ry="38" fill="none" stroke="#F59E0B" strokeWidth="5" />
          <circle cx="-24" cy="-14" r="7" fill="#1E40AF" />
          <circle cx="24" cy="-14" r="7" fill="#1E40AF" />
          <circle cx="-40" cy="4" r="5" fill="#F59E0B" />
          <circle cx="40" cy="4" r="5" fill="#F59E0B" />
          <circle cx="0" cy="4" r="8" fill="#1E40AF" />
          <line x1="-24" y1="-14" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="24" y1="-14" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="-40" y1="4" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="40" y1="4" x2="0" y2="4" stroke="#1E40AF" strokeWidth="2" />
          <line x1="-18" y1="38" x2="-18" y2="58" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
          <line x1="18" y1="38" x2="18" y2="58" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
          <line x1="-18" y1="58" x2="18" y2="58" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Bottom-right: Node cluster */}
        <g transform="translate(1080,600)" opacity="0.13">
          {[[-40,-30],[0,-50],[40,-30],[50,10],[20,50],[-20,50],[-50,10]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={i===0||i===3?7:5}
              fill={i%2===0?'#1E40AF':'#F59E0B'} />
          ))}
          {[[0,0],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[0,3],[1,4]].map(([a,b],i)=>{
            const pts=[[-40,-30],[0,-50],[40,-30],[50,10],[20,50],[-20,50],[-50,10]];
            return <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]}
              stroke="#1E40AF" strokeWidth="2" opacity="0.6" />;
          })}
        </g>
      </svg>
      <AboutContent tr={tr} />
    </section>
  );
}

const LABELS = [
  { id: 'A', name: '"Watermark Trio"', desc: 'Large faint icons (bulb left, code right, brain bottom) connected by a dashed node thread' },
  { id: 'B', name: '"Left Margin Story"', desc: 'Vertical spine on left edge with bulb → code → brain as milestones, faint horizontal dashes extending right' },
  { id: 'C', name: '"Corner Halos"', desc: 'Soft radial glow + icon in each corner, subtle dot grid in the centre for depth' },
];

export default function AboutPreview() {
  const { tr } = useLanguage();
  return (
    <div style={{ paddingTop: 68 }}>
      {LABELS.map(({ id, name, desc }) => (
        <div key={id}>
          <div style={{
            background: '#F9FAFB', borderBottom: '1px solid #E5E7EB',
            padding: '16px 32px', display: 'flex', gap: 16, alignItems: 'baseline',
          }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E40AF' }}>Option {id} — {name}</span>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>{desc}</span>
          </div>
          {id === 'A' && <OptionA tr={tr} />}
          {id === 'B' && <OptionB tr={tr} />}
          {id === 'C' && <OptionC tr={tr} />}
        </div>
      ))}
    </div>
  );
}
