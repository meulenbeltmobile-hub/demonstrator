import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import products from '../data/products';

const PIPELINE = [
  {
    key: 'all',
    label: 'All',
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M9 13h6M9.5 15.5h5M10.5 18h3"/>
      </svg>
    ),
    items: [],
  },
  {
    key: 'build',
    label: 'Build',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    items: [],
  },
  {
    key: 'deploy',
    label: 'Deploy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/>
        <path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/>
        <path d="M6 12l-3 4h3M18 12l3 4h-3"/>
      </svg>
    ),
    items: [],
  },
  {
    key: 'market',
    label: 'Market',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/>
        <path d="M16 8.5a3 3 0 010 7"/>
      </svg>
    ),
    items: [],
  },
];

export default function Tools() {
  const { tr, lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);

  const langFiltered = products.filter((p) => !p.languages || p.languages.includes(lang));
  const filtered = category === 'all'
    ? langFiltered
    : langFiltered.filter((p) => (p.categories ?? []).includes(category));

  return (
    <>
      <SEO title="Tools — Find the Right Tools" path="/tools" noindex={true} />
      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{tr.nav.tools}</div>
          <h1 className="blog-hero-title">{tr.toolsPage.heroTitle}</h1>
          <p className="blog-hero-sub">{tr.toolsPage.heroSub}</p>
        </div>
      </section>

      {/* Pipeline — interactive filter */}
      <section className="pipeline-section">
        <div className="container">
          <div className="pipeline-filter-bar">
            {PIPELINE.map((step) => (
              <div className="pipeline-filter-step" key={step.key}>
                <button
                  className={`filter-btn ${category === step.key ? 'active' : ''}`}
                  onClick={() => setCategory(category === step.key ? 'all' : step.key)}
                  aria-pressed={category === step.key}
                >
                  {tr.pipeline[step.key]}
                </button>
                {(tr.pipeline.items[step.key] ?? []).length > 0 && (
                  <ul className={`pipeline-items ${category === step.key ? 'pipeline-items--active' : ''}`}>
                    {(tr.pipeline.items[step.key] ?? []).map((item, j) => (
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
