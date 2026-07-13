import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import solutions from '../data/solutions';
import packages from '../data/packages';

const PHASES = [
  { key: 'think',  color: '#2563EB' },
  { key: 'build',  color: '#F59E0B' },
  { key: 'deploy', color: '#2563EB' },
  { key: 'market', color: '#F59E0B' },
];

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

      {/* Packages — one box per tier, split into the four phases */}
      <section className="packages-section">
        <div className="container">
          <p className="packages-intro">{tr.solutions.packagesIntro}</p>
          <div className="packages-list">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`package-box${pkg.popular ? ' package-box--featured' : ''}`}>
                <div className="package-header">
                  <span className="package-name">{pkg.name?.[lang] ?? pkg.name?.en}</span>
                  {pkg.popular && <span className="package-popular">{tr.solutions.packagesPopular}</span>}
                  {pkg.price && <span className="package-price">{pkg.price}</span>}
                </div>
                {PHASES.map((ph) => (
                  <div className="package-phase" key={ph.key}>
                    <div className="package-phase-label">
                      <span className="package-phase-dot" style={{ background: ph.color }} />
                      {tr.pipeline[ph.key]}
                    </div>
                    <ul className="package-feature-list">
                      {(pkg.features?.[ph.key]?.[lang] ?? []).filter((f) => f.trim()).map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {filtered.length > 0 && (
        <section className="grid-section">
          <div className="container">
            <div className="vignette-grid">
              {filtered.map((item) => (
                <Vignette key={item.id} item={item} onClick={setSelected} />
              ))}
            </div>
          </div>
        </section>
      )}

      {selected && (
        <Modal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
