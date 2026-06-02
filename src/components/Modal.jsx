import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Avatar({ avatar, size = 56 }) {
  if (avatar.type === 'logo' && avatar.url) {
    return (
      <div className="avatar-logo" style={{ height: size }}>
        <img src={avatar.url} alt="" />
      </div>
    );
  }
  if (avatar.type === 'image' && avatar.url) {
    return (
      <div className="avatar" style={{ width: size, height: size }}>
        <img src={avatar.url} alt="" />
      </div>
    );
  }
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, background: avatar.bg || '#1E40AF' }}
    >
      {avatar.value}
    </div>
  );
}

export default function Modal({ item, onClose }) {
  const { lang, tr } = useLanguage();

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  const title     = typeof item.title    === 'string' ? item.title    : item.title[lang];
  const longDesc  = item.longDesc  ? (typeof item.longDesc  === 'string' ? item.longDesc  : item.longDesc[lang])  : null;
  const shortDesc = item.shortDesc ? (typeof item.shortDesc === 'string' ? item.shortDesc : item.shortDesc[lang]) : null;
  const fullDesc  = typeof item.fullDesc === 'string' ? item.fullDesc : item.fullDesc[lang];
  const bio       = item.bio ? (typeof item.bio === 'string' ? item.bio : item.bio[lang]) : null;
  const why       = item.why ? (typeof item.why === 'string' ? item.why : item.why[lang]) : null;
  const shortTitle = item.shortTitle
    ? (typeof item.shortTitle === 'object' ? item.shortTitle[lang] : item.shortTitle)
    : null;
  const ctaLabel  = item.ctaLabel?.[lang] || tr.modal.learnMore;
  const ctaUrl    = item.ctaUrl?.[lang] || null;
  const cta2Label = item.cta2Label?.[lang] || null;
  const cta2Url   = item.cta2Url?.[lang] || null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <div className="modal-header modal-header--two-col">
          {/* Left: avatar + name + link */}
          <div className="modal-header-left">
            <Avatar avatar={item.avatar} size={80} />
            {item.name && <div className="modal-name">{item.name}</div>}
            {item.link && (
              <a
                className="modal-link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                {item.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
              </a>
            )}
          </div>
          {/* Right: shortTitle + bio */}
          <div className="modal-header-right">
            {shortTitle && <div className="modal-short-title">{shortTitle}</div>}
            {bio && <p className="modal-bio">{bio}</p>}
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={tr.modal.close}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {longDesc && (
            <div className="modal-section">
              <h4 className="modal-section-title">Description</h4>
              <p className="modal-description">{longDesc}</p>
            </div>
          )}
          {why && (
            <div className="modal-section">
              <h4 className="modal-section-title">Why {shortTitle || title}?</h4>
              <p className="modal-description">{why}</p>
            </div>
          )}
          {fullDesc && (
            <div className="modal-section">
              <h4 className="modal-section-title">Next steps and special offers</h4>
              <p className="modal-description">{fullDesc}</p>
            </div>
          )}
          <div className="modal-actions">
            {ctaUrl ? (
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {ctaLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ) : (
              <a href="/contact" className="btn btn-primary">{ctaLabel}</a>
            )}
            {cta2Label && (
              cta2Url
                ? <a href={cta2Url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">{cta2Label}</a>
                : <a href="/contact" className="btn btn-outline">{cta2Label}</a>
            )}
            <button className="btn btn-outline" onClick={onClose}>{tr.modal.close}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
