import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import CategoryFilter from '../components/CategoryFilter';
import solutions from '../data/solutions';

export default function Solutions() {
  const { tr } = useLanguage();
  const [category, setCategory] = useState('all');
  const [vertical, setVertical] = useState('all');
  const [selected, setSelected] = useState(null);

  const cats = tr.solutions.categories;
  const verts = tr.solutions.verticals;

  const categories = [
    { key: 'all', label: cats.all },
    { key: 'personal-productivity', label: cats['personal-productivity'] },
    { key: 'enterprise-solutions', label: cats['enterprise-solutions'] },
  ];

  const verticals = [
    { key: 'all', label: verts.all },
    { key: 'pharma', label: verts.pharma },
    { key: 'publishing', label: verts.publishing },
    { key: 'finance', label: verts.finance },
    { key: 'industry', label: verts.industry },
    { key: 'public-sector', label: verts['public-sector'] },
  ];

  function handleCategoryChange(key) {
    setCategory(key);
    setVertical('all');
  }

  const filtered = solutions.filter((s) => {
    const cats  = s.categories ?? [s.category];
    const verts = s.verticals  ?? (s.vertical ? [s.vertical] : []);
    if (category !== 'all' && !cats.includes(category)) return false;
    if (category === 'enterprise-solutions' && vertical !== 'all' && verts.length > 0 && !verts.includes(vertical)) return false;
    return true;
  });

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
          <h1>{tr.solutions.header}</h1>
          <p>{tr.solutions.description}</p>
        </div>
      </header>

      <section className="grid-section">
        <div className="container">
          <div className="grid-controls" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <CategoryFilter
              categories={categories}
              active={category}
              onChange={handleCategoryChange}
            />
            {category === 'enterprise-solutions' && (
              <CategoryFilter
                categories={verticals}
                active={vertical}
                onChange={setVertical}
              />
            )}
          </div>

          <div className="vignette-grid">
            {filtered.length === 0 ? (
              <p className="no-results">{tr.solutions.noResults}</p>
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
