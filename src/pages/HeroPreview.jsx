import { useLanguage } from '../context/LanguageContext';

/* ── shared hero text ── */
function HeroText({ tr }) {
  return (
    <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
      <h1 className="hero-tagline">{tr.hero.tagline}</h1>
      <p className="hero-subtitle">{tr.hero.subtitle}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   OPTION A — "The Spark"
   Lightbulb at centre; code brackets + AI nodes
   radiate outward like an idea coming to life.
   Palette: current blue gradient, warm accents.
══════════════════════════════════════════════ */
function OptionA({ tr }) {
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 60%, #2563EB 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Background SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Central lightbulb */}
        <g transform="translate(600,200)" opacity="0.12">
          <circle cx="0" cy="-30" r="70" fill="none" stroke="white" strokeWidth="6" />
          <path d="M-25,40 L25,40 M-20,55 L20,55 M-10,70 L10,70" stroke="white" strokeWidth="6" strokeLinecap="round" />
          <line x1="0" y1="-30" x2="0" y2="-100" stroke="#F59E0B" strokeWidth="3" opacity="4" />
          <path d="M-20,-20 Q0,-50 20,-20" fill="none" stroke="white" strokeWidth="4" />
        </g>

        {/* Radiating glow */}
        <circle cx="600" cy="200" r="140" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
        <circle cx="600" cy="200" r="200" fill="none" stroke="white" strokeWidth="1" opacity="0.05" />
        <circle cx="600" cy="200" r="280" fill="none" stroke="white" strokeWidth="1" opacity="0.04" />

        {/* Code brackets — left */}
        <text x="160" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'</>'}</text>
        <text x="120" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'{ }'}</text>
        <text x="200" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'// AI'}</text>

        {/* Code brackets — right */}
        <text x="970" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'<AI/>'}</text>
        <text x="1010" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'[ ]'}</text>
        <text x="980" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'def idea'}</text>

        {/* AI dots — scattered nodes */}
        {[
          [300, 120], [420, 80], [500, 140], [700, 80], [800, 120], [900, 90],
          [250, 280], [380, 320], [500, 290], [700, 310], [830, 280], [950, 320],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={i % 3 === 0 ? '#F59E0B' : 'white'} opacity={i % 3 === 0 ? '0.5' : '0.2'} />
        ))}

        {/* Connecting lines between nodes */}
        <polyline points="300,120 420,80 500,140 600,170 700,80 800,120 900,90" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
        <polyline points="250,280 380,320 500,290 600,230 700,310 830,280 950,320" fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
        <line x1="500" y1="140" x2="500" y2="290" stroke="white" strokeWidth="1" opacity="0.07" />
        <line x1="700" y1="80" x2="700" y2="310" stroke="white" strokeWidth="1" opacity="0.07" />
      </svg>

      <HeroText tr={tr} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   OPTION B — "Neural Web"
   Full-screen neural network of connected nodes.
   A lightbulb silhouette emerges from the node
   cluster at centre. Orange nodes = key ideas.
   Dark navy feel — serious and AI-forward.
══════════════════════════════════════════════ */
function OptionB({ tr }) {
  const nodes = [
    [600, 200], // centre (bulb top)
    [600, 310], // bulb body
    [530, 155], [670, 155],
    [470, 115], [730, 115],
    [420, 200], [780, 200],
    [460, 290], [740, 290],
    // outer ring
    [310, 120], [890, 120],
    [260, 200], [940, 200],
    [310, 290], [890, 290],
    [380, 350], [820, 350],
    [500, 380], [700, 380],
    // far edges
    [100, 80],  [1100, 80],
    [80, 200],  [1120, 200],
    [100, 330], [1100, 330],
    [200, 380], [1000, 380],
  ];

  const edges = [
    [0,2],[0,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],
    [2,6],[3,7],[4,10],[5,11],[6,12],[7,13],[8,14],[9,15],
    [10,12],[11,13],[12,14],[13,15],[14,16],[15,17],[16,18],[17,19],
    [10,20],[11,21],[12,22],[13,23],[14,24],[15,25],[16,26],[17,27],
    [1,8],[1,9],[0,1],
  ];

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #0F172A 0%, #1E1B4B 50%, #1E3A8A 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]}
            x2={nodes[b][0]} y2={nodes[b][1]}
            stroke="white" strokeWidth="1" opacity="0.12"
          />
        ))}
        {/* Nodes */}
        {nodes.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx} cy={cy}
            r={i < 2 ? 9 : i < 10 ? 6 : 4}
            fill={i < 2 ? '#F59E0B' : i < 10 ? 'white' : 'white'}
            opacity={i < 2 ? 0.85 : i < 10 ? 0.4 : 0.18}
          />
        ))}
        {/* Lightbulb glow at centre */}
        <circle cx="600" cy="200" r="60" fill="#F59E0B" opacity="0.06" />
        <circle cx="600" cy="200" r="100" fill="#F59E0B" opacity="0.03" />
        {/* Code label */}
        <text x="60" y="60" fontFamily="monospace" fontSize="18" fill="white" opacity="0.18">{'model.predict(idea)'}</text>
        <text x="900" y="370" fontFamily="monospace" fontSize="16" fill="#F59E0B" opacity="0.3">{'train(data, epochs=∞)'}</text>
      </svg>

      <HeroText tr={tr} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   OPTION C — "Code Stream"
   Three large symbolic icons (💡 ⟶ </> ⟶ 🧠)
   float as watermarks on a dark gradient with
   faint falling-code lines in the background.
   Cinematic, warm, clearly tells the story.
══════════════════════════════════════════════ */
function OptionC({ tr }) {
  const codeLines = [
    ['import intelligence', 200, 60],
    ['const idea = new Idea()', 340, 100],
    ['llm.generate(prompt)', 80, 200],
    ['deploy(app, { sovereign: true })', 600, 50],
    ['await model.complete()', 860, 150],
    ['profit = revenue - llmCost', 980, 280],
    ['return robust(app)', 160, 330],
    ['<App viable />', 700, 340],
  ];

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #7C3AED 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Faint code strings */}
        {codeLines.map(([text, x, y], i) => (
          <text key={i} x={x} y={y} fontFamily="monospace" fontSize="13" fill="white" opacity="0.12">{text}</text>
        ))}

        {/* Large watermark: Lightbulb */}
        <g transform="translate(200,200)" opacity="0.13">
          <circle cx="0" cy="-20" r="55" fill="none" stroke="white" strokeWidth="5" />
          <path d="M-18,35 Q-18,50 0,50 Q18,50 18,35 L18,20 Q18,5 0,5 Q-18,5 -18,20 Z" fill="none" stroke="white" strokeWidth="4" />
          <line x1="-12" y1="50" x2="12" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="-8" y1="62" x2="8" y2="62" stroke="white" strokeWidth="4" strokeLinecap="round" />
          {/* filament */}
          <path d="M-12,10 Q0,-15 12,10" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="3" />
          {/* rays */}
          <line x1="0" y1="-80" x2="0" y2="-100" stroke="#F59E0B" strokeWidth="3" opacity="3.5" strokeLinecap="round" />
          <line x1="52" y1="-60" x2="66" y2="-72" stroke="#F59E0B" strokeWidth="3" opacity="3.5" strokeLinecap="round" />
          <line x1="-52" y1="-60" x2="-66" y2="-72" stroke="#F59E0B" strokeWidth="3" opacity="3.5" strokeLinecap="round" />
          <line x1="65" y1="-20" x2="82" y2="-20" stroke="#F59E0B" strokeWidth="3" opacity="3.5" strokeLinecap="round" />
          <line x1="-65" y1="-20" x2="-82" y2="-20" stroke="#F59E0B" strokeWidth="3" opacity="3.5" strokeLinecap="round" />
        </g>

        {/* Arrow 1 */}
        <path d="M340,200 L430,200" stroke="white" strokeWidth="2" opacity="0.2" markerEnd="url(#arr)" />

        {/* Large watermark: Code brackets */}
        <g transform="translate(600,200)" opacity="0.13">
          <text x="-70" y="20" fontFamily="monospace" fontSize="110" fill="white" fontWeight="900">{'<>'}</text>
          <text x="-20" y="15" fontFamily="monospace" fontSize="30" fill="#F59E0B" opacity="4" fontWeight="bold">{'/'}</text>
        </g>

        {/* Arrow 2 */}
        <path d="M780,200 L860,200" stroke="white" strokeWidth="2" opacity="0.2" />

        {/* Large watermark: Brain / AI node */}
        <g transform="translate(1010,200)" opacity="0.13">
          {/* simplified brain shape with nodes */}
          <ellipse cx="0" cy="-15" rx="55" ry="45" fill="none" stroke="white" strokeWidth="4" />
          <line x1="-55" y1="-15" x2="55" y2="-15" stroke="white" strokeWidth="2" opacity="0.5" />
          <circle cx="-30" cy="-35" r="6" fill="white" />
          <circle cx="30" cy="-35" r="6" fill="white" />
          <circle cx="-45" cy="-10" r="5" fill="#F59E0B" opacity="3" />
          <circle cx="45" cy="-10" r="5" fill="#F59E0B" opacity="3" />
          <circle cx="0" cy="-10" r="7" fill="white" />
          <line x1="-30" y1="-35" x2="0" y2="-10" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="-35" x2="0" y2="-10" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="-45" y1="-10" x2="0" y2="-10" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="45" y1="-10" x2="0" y2="-10" stroke="white" strokeWidth="1.5" opacity="0.6" />
          {/* stem */}
          <line x1="-20" y1="30" x2="-20" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="30" x2="20" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="-20" y1="55" x2="20" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Labels */}
        <text x="155" y="340" fontFamily="Inter, sans-serif" fontSize="13" fill="white" opacity="0.35" textAnchor="middle">Idea</text>
        <text x="600" y="340" fontFamily="Inter, sans-serif" fontSize="13" fill="white" opacity="0.35" textAnchor="middle">Code</text>
        <text x="1010" y="340" fontFamily="Inter, sans-serif" fontSize="13" fill="white" opacity="0.35" textAnchor="middle">AI</text>
      </svg>

      <HeroText tr={tr} />
    </section>
  );
}

/* ── Preview page ── */
const LABELS = [
  { id: 'A', name: '"The Spark"', desc: 'Blue gradient · central lightbulb · code symbols + AI nodes radiate outward' },
  { id: 'B', name: '"Neural Web"', desc: 'Dark navy · full neural network mesh · lightbulb glows at centre in orange' },
  { id: 'C', name: '"Code Stream"', desc: 'Blue-purple gradient · three watermark icons (💡 → </> → 🧠) · faint code lines' },
];

export default function HeroPreview() {
  const { tr } = useLanguage();
  return (
    <div style={{ paddingTop: 68 }}>
      {LABELS.map(({ id, name, desc }, i) => (
        <div key={id}>
          <div style={{
            background: '#F9FAFB',
            borderBottom: '1px solid #E5E7EB',
            padding: '16px 32px',
            display: 'flex',
            gap: 16,
            alignItems: 'baseline',
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
