import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Legal() {
  const { tr } = useLanguage();
  return (
    <>
      <SEO title={tr.nav.legal} path="/legal" noindex={true} />
      <header className="page-header">
        <div className="container" style={{ position: 'relative' }}>
          <h1>{tr.nav.legal}</h1>
        </div>
      </header>
      <section className="grid-section">
        <div className="container">
          <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '80px 0' }}>
            Legal Notice / Mentions Légales / Impressum — coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
