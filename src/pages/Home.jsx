import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

function renderBold(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

const FEATURES = ['robustness', 'profitability', 'sovereignty'];

const FEATURE_ICONS = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
];

const PHASES = [
  {
    key: 'think', label: 'Prepare', color: '#2563EB',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M9 13h6M9.5 15.5h5M10.5 18h3"/></svg>,
  },
  {
    key: 'build', label: 'Build', color: '#F59E0B',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    key: 'deploy', label: 'Deploy', color: '#2563EB',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/><path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/><path d="M6 12l-3 4h3M18 12l3 4h-3"/></svg>,
  },
  {
    key: 'market', label: 'Market', color: '#F59E0B',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/><path d="M16 8.5a3 3 0 010 7"/></svg>,
  },
];

const HURDLE_ILLUS = [
  <img src="/technical-complexity.jpg" alt="Technical complexity" />,
  <img src="/marketing-challenge.jpg" alt="Marketing challenges" />,
  <img src="/strategic-concern.jpg" alt="Strategic challenges" />,
];

export default function Home() {
  const { tr } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <SEO
        path="/"
        description="Applied AI in Action connects AI-powered app builders with an ecosystem of people and tools to turn ideas into robust, market-ready and sovereign web applications."
      />
      {/* Hero */}
      <section className="hero" aria-label="Hero">
        <div className="hero-content">
          <h1 className="hero-tagline">
            {tr.hero.tagline1}{' '}
            <span className="hero-accent">{tr.hero.tagline2}</span>
          </h1>
          <p className="hero-subtitle">{renderBold(tr.hero.subtitle)}</p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              {tr.cta.developer}
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/tools')}>
              {tr.cta.tools}
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/solutions')}>
              {tr.cta.customer}
            </button>
          </div>
        </div>
      </section>

      {/* About / Narrative */}
      <section className="about-section" aria-label="About">
        <div className="about-inner">
          <p className="about-opening">
            {tr.about.opening}<br />
            {renderBold(tr.about.openingBold)}<br />
            {tr.about.opening2}
          </p>
        </div>
      </section>

      {/* Hurdles header */}
      <section className="hurdles-header" aria-label="Hurdles">
        <div className="container">
          <h2 className="hurdles-title">{tr.about.hurdlesTitleMain} <span className="hero-accent">{tr.about.hurdlesTitleAccent}</span></h2>
          {tr.about.hurdlesSubtitle && <p className="hurdles-subtitle">{tr.about.hurdlesSubtitle}</p>}
        </div>
      </section>

      {/* Hurdles blocks */}
      <section className="hurdles-body">
        <div className="container">
          <div className="hurdles">
            {tr.about.hurdles.map((h, i) => (
              <div className="hurdles-block" key={i}>
                <div className="hurdles-illus">{HURDLE_ILLUS[i]}</div>
                <div className="hurdles-text">
                  <h3>{h.title}</h3>
                  <ul className="hurdles-list">
                    {h.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="about-mission">
            <div className="about-mission-line">
              {tr.about.bold2top}<span className="hero-accent">{tr.about.bold2mid}</span>
            </div>
            <div className="about-mission-sub">{tr.about.bold2bot}</div>
            <div className="about-mission-cta">
              <span className="about-mission-cta-label">{tr.about.missionCta}</span>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/blog#manifesto')}>{tr.about.manifesto}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — dark navy */}
      <section className="features-section" aria-label="Key pillars">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="features-heading">{tr.features.heading}</h2>
          <p className="features-subheading">{renderBold(tr.features.subheading)}</p>
          <div className="features-grid">
            {FEATURES.map((key, i) => (
              <div className="feature-card" key={key}>
                <div className="feature-card-icon">{FEATURE_ICONS[i]}</div>
                <h3>{tr.features[key].title}</h3>
                <p>{tr.features[key].description}</p>
              </div>
            ))}
          </div>
          <div className="features-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>{tr.features.ctaPeople}</button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/tools')}>{tr.features.ctaTools}</button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="how-it-works-title">{tr.hiw.title}</h2>
          <p className="how-it-works-sub">{tr.hiw.sub}</p>
          <div className="hiw-pipeline">
            {PHASES.map((phase, i) => (
              <div className="hiw-phase-wrap" key={phase.key}>
                <div className="hiw-phase" style={{ '--phase-color': phase.color }}>
                  <div className="hiw-phase-icon">{phase.icon}</div>
                  <div className="hiw-phase-label">{phase.label}</div>
                </div>
                {i < PHASES.length - 1 && (
                  <svg className="hiw-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                )}
              </div>
            ))}
          </div>
          <div className="hiw-columns">
            <article className="vignette-card hiw-vignette-preview" aria-hidden="true">
              <div className="vignette-body">
                <div className="avatar" style={{ background: '#0F1A3D' }}></div>
                <div style={{ width: '45%', height: '8px', borderRadius: '3px', background: '#F59E0B', opacity: 0.8, marginBottom: '14px' }}></div>
                <div style={{ width: '90%', height: '12px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.2, marginBottom: '6px' }}></div>
                <div style={{ width: '78%', height: '12px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.2, marginBottom: '16px' }}></div>
                <div style={{ width: '100%', height: '8px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.1, marginBottom: '6px' }}></div>
                <div style={{ width: '94%', height: '8px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.1, marginBottom: '6px' }}></div>
                <div style={{ width: '85%', height: '8px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.1, marginBottom: '6px' }}></div>
                <div style={{ width: '68%', height: '8px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.1 }}></div>
              </div>
              <div className="vignette-price">
                <div style={{ width: '80px', height: '8px', borderRadius: '3px', background: '#0F1A3D', opacity: 0.15 }}></div>
                <button className="btn-ask-now" aria-label="Learn more" tabIndex={-1}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </article>
            <div className="hiw-text-col">
              <p className="hiw-description">{tr.hiw.description}</p>
              <p className="hiw-extra">
                {tr.hiw.form1}<Link to="/form" className="hiw-solutions-link">{tr.hiw.formLink}</Link>{tr.hiw.form2}
              </p>
              <p className="hiw-extra">
                {tr.hiw.extra1}<Link to="/solutions" className="hiw-solutions-link">{tr.hiw.extraLink}</Link>{tr.hiw.extra2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <ContactForm />
    </>
  );
}

function ContactForm() {
  const { tr } = useLanguage();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setEmail('');
    setQuestion('');
  }

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="contact-heading">{tr.contact.heading}</h2>
        <p className="contact-subheading">{tr.contact.subheading}</p>
        {sent ? (
          <p className="contact-success">{tr.contact.success}</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-email">{tr.contact.email}</label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-question">{tr.contact.question}</label>
              <textarea
                id="contact-question"
                required
                rows={4}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="..."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              {tr.contact.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
