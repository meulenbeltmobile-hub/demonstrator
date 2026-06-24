import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const PRINCIPLE_COLORS = ['blue', 'orange', 'green'];
const CARD_COLORS = ['blue', 'orange', 'navy'];
const CARD_TAG_CLASSES = ['blog-article-tag', 'blog-article-tag blog-article-tag--orange', 'blog-article-tag blog-article-tag--navy'];

const PRINCIPLE_ICONS = [
  <svg key="p1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  <svg key="p2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="p3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12a5 5 0 0 0-5-5 5 5 0 0 0 5-5 5 5 0 0 0 5 5 5 5 0 0 0-5 5z"/></svg>,
];

const CARD_ICONS = [
  <svg key="c1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  <svg key="c2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  <svg key="c3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
];

export default function Blog() {
  const { tr } = useLanguage();
  const { hash } = useLocation();
  const b = tr.blog;
  const [s1, s2, s3, s4, s5] = b.sections;

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="Blog — Insights & Philosophy"
        description="Practical thinking on AI tools, business impact, and the art of building well. Manifesto, guides, and perspectives from the Applied AI in Action team."
        path="/blog"
      />

      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{b.eyebrow}</div>
          <h1 className="blog-hero-title">{b.heroTitle}</h1>
          <p className="blog-hero-sub">{b.heroSub}</p>
        </div>
      </section>

      <section id="manifesto" className="blog-manifesto-wrap">
        <div className="container">
          <div className="blog-manifesto-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-6-6-8-6-14z"/><path d="M12 12c0 3-2 4-2 7a2 2 0 0 0 4 0c0-3-2-4-2-7z"/></svg>
            {b.manifestoBadge}
          </div>

          <h2 className="blog-manifesto-title">
            {b.manifestoTitle1}<br />
            <span className="hero-accent">{b.manifestoTitle2}</span>
          </h2>
          <div className="blog-manifesto-meta">
            <span>{b.meta.author}</span>
            <span className="blog-meta-dot" />
            <span>{b.meta.date}</span>
            <span className="blog-meta-dot" />
            <span>{b.meta.readTime}</span>
          </div>

          <blockquote className="blog-pull-quote">{b.pullQuote}</blockquote>

          <div className="blog-section">
            <h3 className="blog-section-heading">
              <span className="blog-section-num">{s1.num}</span>
              {s1.heading}
            </h3>
            <p>{s1.body}</p>
          </div>

          <div className="blog-section">
            <h3 className="blog-section-heading">
              <span className="blog-section-num">{s2.num}</span>
              {s2.heading}
            </h3>
            <p>{s2.body}</p>
          </div>

          <div className="blog-section">
            <h3 className="blog-section-heading">
              <span className="blog-section-num">{s3.num}</span>
              {s3.heading}
            </h3>
            <p>{s3.body}</p>
          </div>

          <div className="blog-section">
            <h3 className="blog-section-heading">
              <span className="blog-section-num">{s4.num}</span>
              {s4.heading}
            </h3>
            <div className="blog-principle-cards">
              {b.principles.map((p, i) => (
                <div className="blog-principle-card" key={i}>
                  <div className={`blog-principle-icon blog-principle-icon--${PRINCIPLE_COLORS[i]}`}>
                    {PRINCIPLE_ICONS[i]}
                  </div>
                  <h4>{p.heading}</h4>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="blog-section">
            <h3 className="blog-section-heading">
              <span className="blog-section-num">{s5.num}</span>
              {s5.heading}
            </h3>
            <p>{s5.body1}</p>
            <p>{s5.body2}</p>
            <div className="blog-linkedin-callout">
              <div className="blog-linkedin-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <div className="blog-linkedin-title">{b.linkedinTitle}</div>
                <div className="blog-linkedin-sub">{b.linkedinSub}</div>
              </div>
            </div>
          </div>

          <div className="blog-manifesto-closing">
            <p>
              {b.closing1}<span className="hero-accent">{b.closingAccent}</span><br />
              {b.closing2}
            </p>
          </div>
        </div>
      </section>

      <section className="blog-more-section">
        <div className="container">
          <div className="blog-more-label">{b.moreLabel}</div>
          <div className="blog-article-grid">
            {b.cards.map((card, i) => (
              <div className="blog-article-card" key={i}>
                <div className={`blog-article-img blog-article-img--${CARD_COLORS[i]}`}>
                  {CARD_ICONS[i]}
                </div>
                <div className="blog-article-body">
                  <div className={CARD_TAG_CLASSES[i]}>{card.tag}</div>
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                  <span className="blog-coming-soon">{card.soon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
