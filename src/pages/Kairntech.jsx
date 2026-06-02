import { useLanguage } from '../context/LanguageContext';

export default function Kairntech() {
  const { tr } = useLanguage();
  const k = tr.kairntech;

  return (
    <>
      <header className="kairntech-hero">
        <div className="container">
          <h1>{k.header}</h1>
          <p className="tagline">"{k.tagline}"</p>
          <p className="description">{k.description}</p>
        </div>
      </header>

      <section className="kairntech-section">
        <div className="container">
          <h2 className="section-title">{k.whyTitle}</h2>
          <div className="reasons-grid">
            {k.reasons.map((r, i) => (
              <div className="reason-card" key={i}>
                <div className="reason-num">{i + 1}</div>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kairntech-cta">
        <div className="container">
          <h2>Ready to build with Kairntech?</h2>
          <p>Explore the platform and connect your application to production-grade language AI.</p>
          <a
            href={k.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            {k.ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
