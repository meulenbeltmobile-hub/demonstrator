import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import solutions from '../data/solutions';

export default function Solutions() {
  const { tr, lang } = useLanguage();
  const [selected, setSelected] = useState(null);

  const filtered = solutions.filter((s) => !s.languages || s.languages.includes(lang));

  return (
    <>
      <SEO title="Packaged Solutions" path="/solutions" noindex={true} />
      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{tr.nav.solutions}</div>
          <h1 className="blog-hero-title">{tr.solutions.heroTitle}</h1>
          <p className="blog-hero-sub">{tr.solutions.heroSub}</p>
        </div>
      </section>

      <section className="grid-section">
        <div className="container">
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
