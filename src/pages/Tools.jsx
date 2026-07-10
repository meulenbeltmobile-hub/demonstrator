import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import products from '../data/products';

const APP_SOURCES = ['powered', 'partner', 'choice'];

export default function Tools() {
  const { tr, lang } = useLanguage();
  const [source, setSource] = useState('all');
  const [selected, setSelected] = useState(null);

  const langFiltered = products.filter((p) => !p.languages || p.languages.includes(lang));
  const filtered = source === 'all'
    ? langFiltered
    : langFiltered.filter((p) => p.appSource === source);

  return (
    <>
      <SEO title="Applications — Find the Right Applications" path="/applications" noindex={true} />
      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{tr.nav.tools}</div>
          <h1 className="blog-hero-title">{tr.toolsPage.heroTitle}</h1>
          <p className="blog-hero-sub">{tr.toolsPage.heroSub}</p>
        </div>
      </section>

      {/* App source — interactive filter */}
      <section className="pipeline-section">
        <div className="container">
          <div className="pipeline-bar-row">
            <div className="pipeline-filter-bar">
              <button
                className={`filter-btn ${source === 'all' ? 'active' : ''}`}
                onClick={() => setSource('all')}
                aria-pressed={source === 'all'}
              >
                {tr.product.categories.all}
              </button>
              {APP_SOURCES.map((key) => (
                <button
                  key={key}
                  className={`filter-btn ${source === key ? 'active' : ''}`}
                  onClick={() => setSource(source === key ? 'all' : key)}
                  aria-pressed={source === key}
                >
                  {tr.product.appSource[key].tab}
                </button>
              ))}
            </div>
            <Link to="/form" className="btn btn-primary pipeline-cta">
              {tr.form.eyebrow}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
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
