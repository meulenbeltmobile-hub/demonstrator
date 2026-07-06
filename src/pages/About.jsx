import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

function renderBold(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function About() {
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const a = tr.aboutPage;
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <>
      <SEO title="About" path="/about" noindex={true} />

      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{a.eyebrow}</div>
          <h1 className="blog-hero-title">{a.title}</h1>
          <p className="blog-hero-sub">{a.lead}</p>
        </div>
      </section>

      <section className="about-note-section">
        <div className="container">
          <div className="about-note">
            <p>{renderBold(a.p1)}</p>
            <p>{renderBold(a.p2)}</p>
            <p>{renderBold(a.p3)}</p>
            <p>{renderBold(a.p4)}</p>

            <div className="about-motto">
              <p className="about-motto-lead">{a.mottoLead}</p>
              <p className="about-motto-text">{a.motto}</p>
            </div>

            <div className="about-signature">
              {photoFailed ? (
                <div className="about-photo about-photo-fallback" aria-hidden="true">GM</div>
              ) : (
                <img
                  src="/geert.meulenbelt.png"
                  alt={a.signature}
                  className="about-photo"
                  onError={() => setPhotoFailed(true)}
                />
              )}
              <div>
                <div className="about-signature-name">{a.signature}</div>
                <a
                  className="about-linkedin-link"
                  href="https://www.linkedin.com/in/geertmeulenbelt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.linkedin} →
                </a>
              </div>
            </div>

            <div className="about-manifesto-cta">
              <span>{a.manifestoCta}</span>
              <button className="btn btn-outline" onClick={() => navigate('/blog#manifesto')}>
                {a.manifestoLink}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
