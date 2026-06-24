import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Vignette from '../components/Vignette';
import Modal from '../components/Modal';
import CategoryFilter from '../components/CategoryFilter';
import solutions from '../data/solutions';

export default function Solutions() {
  const { tr, lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);

  const cats = tr.solutions.categories;

  const categories = [
    { key: 'all', label: cats.all },
    { key: 'personal-productivity', label: cats['personal-productivity'] },
    { key: 'enterprise-solutions', label: cats['enterprise-solutions'] },
  ];

  const langFiltered = solutions.filter((s) => !s.languages || s.languages.includes(lang));
  const filtered = category === 'all'
    ? langFiltered
    : langFiltered.filter((s) => (s.categories ?? [s.category]).includes(category));

  return (
    <>
      <SEO title="Solutions — Explore AI Applications" path="/solutions" noindex={true} />
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
          <div className="grid-controls">
            <CategoryFilter
              categories={categories}
              active={category}
              onChange={setCategory}
            />
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
