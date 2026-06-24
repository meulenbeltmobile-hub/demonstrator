import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Privacy() {
  const { tr } = useLanguage();
  return (
    <>
      <SEO title={tr.nav.privacy} path="/privacy" noindex={true} />
      <header className="page-header">
        <div className="container" style={{ position: 'relative' }}>
          <h1>{tr.nav.privacy}</h1>
        </div>
      </header>
      <section className="grid-section">
        <div className="container">
          <p style={{ color: 'var(--gray-500)', textAlign: 'center', padding: '80px 0' }}>
            Privacy Policy — coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
