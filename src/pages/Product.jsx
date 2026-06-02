import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import products from '../data/products';

const PIPELINE = [
  {
    key: 'all',
    label: 'All',
    color: '#374151',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    items: [],
  },
  {
    key: 'think',
    label: 'Think',
    color: '#1E40AF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M9 13h6M9.5 15.5h5M10.5 18h3"/>
      </svg>
    ),
    items: ['Strategic technical advice', 'AI impact advice', 'Go-to-Market advice'],
  },
  {
    key: 'build',
    label: 'Build',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    items: ['Coding support services', 'Document processing, semantic enrichment'],
  },
  {
    key: 'prepare',
    label: 'Prepare',
    color: '#1E40AF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2"/>
        <path d="M9 7h6M9 11h6M9 15h4"/>
      </svg>
    ),
    items: ['Keyword selection', 'Domain acquisition', 'Website design & CMS', 'Payment provider'],
  },
  {
    key: 'deploy',
    label: 'Deploy',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/>
        <path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/>
        <path d="M6 12l-3 4h3M18 12l3 4h-3"/>
      </svg>
    ),
    items: ['Secure SaaS', 'On premise'],
  },
  {
    key: 'market',
    label: 'Market',
    color: '#1E40AF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/>
        <path d="M16 8.5a3 3 0 010 7"/>
      </svg>
    ),
    items: ['SEO / GEO marketing', 'Social network marketing', 'Business development'],
  },
  {
    key: 'support',
    label: 'Scale',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6M3 22v-6h6"/>
        <path d="M3.51 9a9 9 0 0113.82-3.63L21 8M3 16l3.67 2.63A9 9 0 0020.49 15"/>
      </svg>
    ),
    items: ['Customer support', 'Quality monitoring', 'LLM change', 'New markets & geographies'],
  },
];

export default function Product() {
  const { tr } = useLanguage();
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = category === 'all'
    ? products
    : products.filter((p) => (p.categories ?? [p.category]).includes(category));

  return (
    <>
      <header className="page-header">
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
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
          <text x="200" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'// AI'}</text>
          <text x="970" y="160" fontFamily="monospace" fontSize="52" fill="white" opacity="0.15" fontWeight="bold">{'<AI/>'}</text>
          <text x="1010" y="260" fontFamily="monospace" fontSize="28" fill="#F59E0B" opacity="0.25">{'[ ]'}</text>
          <text x="980" y="310" fontFamily="monospace" fontSize="22" fill="white" opacity="0.12">{'def idea'}</text>
          {[
            [300,120],[420,80],[500,140],[700,80],[800,120],[900,90],
            [250,280],[380,320],[500,290],[700,310],[830,280],[950,320],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4"
              fill={i % 3 === 0 ? '#F59E0B' : 'white'}
              opacity={i % 3 === 0 ? 0.5 : 0.2}
            />
          ))}
          <polyline points="300,120 420,80 500,140 600,170 700,80 800,120 900,90"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <polyline points="250,280 380,320 500,290 600,230 700,310 830,280 950,320"
            fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
          <line x1="500" y1="140" x2="500" y2="290" stroke="white" strokeWidth="1" opacity="0.07" />
          <line x1="700" y1="80"  x2="700" y2="310" stroke="white" strokeWidth="1" opacity="0.07" />
        </svg>
        <div className="container" style={{ position: 'relative' }}>
          <h1>{tr.product.header}</h1>
        </div>
      </header>

      {/* Pipeline — interactive filter */}
      <section className="pipeline-section">
        <div className="container">
          <div className="pipeline-filter-bar">
            {PIPELINE.map((step) => (
              <div className="pipeline-filter-step" key={step.key}>
                <button
                  className={`filter-btn ${category === step.key ? 'active' : ''}`}
                  onClick={() => setCategory(step.key)}
                  aria-pressed={category === step.key}
                >
                  {step.label}
                </button>
                {step.items.length > 0 && (
                  <ul className={`pipeline-items ${category === step.key ? 'pipeline-items--active' : ''}`}>
                    {step.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-section">
        <div className="container">
          <div className="vignette-grid">
            {filtered.length === 0 ? (
              <p className="no-results">{tr.product.noResults}</p>
            ) : (
              filtered.map((item) => (
                <Vignette key={item.id} item={item} onClick={setSelected} />
              ))
            )}
          </div>
        </div>
      </section>

      {selected && (
        <Modal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
