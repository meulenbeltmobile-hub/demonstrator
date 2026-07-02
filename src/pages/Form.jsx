import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const EMPTY = {
  appName: '', name: '', email: '', status: '',
  description: '', targetAudience: '', languages: '',
  codingTools: '', database: '', authentication: '', multiTenancy: '',
  website: '', hostingProvider: '', paymentProvider: '',
  social: '',
  objectives: '',
};

const PHASE_ICONS = {
  think: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M9 13h6M9.5 15.5h5M10.5 18h3"/></svg>,
  build: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  deploy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/><path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/><path d="M6 12l-3 4h3M18 12l3 4h-3"/></svg>,
  market: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/><path d="M16 8.5a3 3 0 010 7"/></svg>,
};

const PHASE_COLORS = { think: '#2563EB', build: '#F59E0B', deploy: '#2563EB', market: '#F59E0B' };

export default function Form() {
  const { tr } = useLanguage();
  const f = tr.form;
  const p = tr.pipeline;
  const [values, setValues] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();

    // Structured payload, grouped by go-to-market phase.
    // Ready to POST once the email back-end is connected.
    const payload = {
      appName: values.appName,
      name: values.name,
      email: values.email,
      status: values.status,
      think: {
        description: values.description,
        targetAudience: values.targetAudience,
        languages: values.languages,
      },
      build: {
        codingTools: values.codingTools,
        database: values.database,
        authentication: values.authentication,
        multiTenancy: values.multiTenancy,
      },
      deploy: {
        website: values.website,
        hostingProvider: values.hostingProvider,
        paymentProvider: values.paymentProvider,
      },
      market: {
        social: values.social,
      },
      objectives: values.objectives,
    };

    // TODO: send `payload` to the email back-end (e.g. await fetch('/api/enquiry', { method: 'POST', ... }))
    // once it is available. For now we just acknowledge receipt.
    void payload;

    setSent(true);
  }

  function PhaseHeader({ phase }) {
    return (
      <div className="form-phase-header">
        <span className="form-phase-icon">{PHASE_ICONS[phase]}</span>
        <span className="form-phase-name">{p[phase]}</span>
      </div>
    );
  }

  return (
    <>
      <SEO title="Get started — Tell us about your application" path="/form" noindex={true} />

      <section className="blog-hero">
        <div className="blog-hero-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="blog-eyebrow">{f.eyebrow}</div>
          <h1 className="blog-hero-title">{f.title}</h1>
          <p className="blog-hero-sub">{f.subtitle}</p>
        </div>
      </section>

      <section className="form-page-section">
        <div className="container">
          {sent ? (
            <p className="contact-success form-success">{f.success}</p>
          ) : (
            <form className="contact-form form-lg" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label htmlFor="f-appname">{f.appName}</label>
                <input id="f-appname" type="text" value={values.appName} onChange={set('appName')} />
              </div>
              <div className="form-grid">
                <div className="contact-field">
                  <label htmlFor="f-name">{f.name} *</label>
                  <input id="f-name" type="text" required value={values.name} onChange={set('name')} />
                </div>
                <div className="contact-field">
                  <label htmlFor="f-email">{f.email} *</label>
                  <input id="f-email" type="email" required value={values.email} onChange={set('email')} />
                </div>
              </div>

              <div className="form-group">
                <div className="form-group-heading">{f.statusHeading}</div>
                <div className="form-radio-group">
                  {[['production', f.statusProduction], ['development', f.statusDevelopment], ['idea', f.statusIdea]].map(([key, label]) => (
                    <label key={key} className="form-radio">
                      <input type="radio" name="status" value={key} checked={values.status === key} onChange={set('status')} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prepare (phase key 'think') */}
              <div className="form-phase" style={{ '--phase-color': PHASE_COLORS.think }}>
                <PhaseHeader phase="think" />
                <div className="contact-field">
                  <label htmlFor="f-description">{f.appDescription}</label>
                  <textarea id="f-description" rows={3} value={values.description} onChange={set('description')} />
                </div>
                <div className="form-grid">
                  <div className="contact-field">
                    <label htmlFor="f-audience">{f.targetAudience}</label>
                    <input id="f-audience" type="text" value={values.targetAudience} onChange={set('targetAudience')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-languages">{f.languages}</label>
                    <input id="f-languages" type="text" value={values.languages} onChange={set('languages')} />
                  </div>
                </div>
              </div>

              {/* Build */}
              <div className="form-phase" style={{ '--phase-color': PHASE_COLORS.build }}>
                <PhaseHeader phase="build" />
                <div className="form-grid">
                  <div className="contact-field">
                    <label htmlFor="f-coding">{f.codingTools}</label>
                    <input id="f-coding" type="text" value={values.codingTools} onChange={set('codingTools')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-database">{f.database}</label>
                    <input id="f-database" type="text" value={values.database} onChange={set('database')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-auth">{f.authentication}</label>
                    <input id="f-auth" type="text" value={values.authentication} onChange={set('authentication')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-tenancy">{f.multiTenancy}</label>
                    <input id="f-tenancy" type="text" value={values.multiTenancy} onChange={set('multiTenancy')} />
                  </div>
                </div>
              </div>

              {/* Deploy */}
              <div className="form-phase" style={{ '--phase-color': PHASE_COLORS.deploy }}>
                <PhaseHeader phase="deploy" />
                <div className="form-grid">
                  <div className="contact-field">
                    <label htmlFor="f-website">{f.url}</label>
                    <input id="f-website" type="url" placeholder="https://" value={values.website} onChange={set('website')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-hosting">{f.hostingProvider}</label>
                    <input id="f-hosting" type="text" value={values.hostingProvider} onChange={set('hostingProvider')} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="f-payment">{f.paymentProvider}</label>
                    <input id="f-payment" type="text" value={values.paymentProvider} onChange={set('paymentProvider')} />
                  </div>
                </div>
              </div>

              {/* Market */}
              <div className="form-phase" style={{ '--phase-color': PHASE_COLORS.market }}>
                <PhaseHeader phase="market" />
                <div className="contact-field">
                  <label htmlFor="f-social">{f.socialHeading}</label>
                  <input
                    id="f-social"
                    type="text"
                    placeholder={f.socialHint}
                    value={values.social}
                    onChange={set('social')}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="f-objectives">{f.objectives}</label>
                <textarea id="f-objectives" rows={4} value={values.objectives} onChange={set('objectives')} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg">{f.send}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
