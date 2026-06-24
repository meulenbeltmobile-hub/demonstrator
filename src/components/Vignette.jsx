import { useLanguage } from '../context/LanguageContext';

function Avatar({ avatar }) {
  if (avatar.type === 'logo' && avatar.url) {
    return (
      <div className="avatar-logo">
        <img src={avatar.url} alt="" />
      </div>
    );
  }
  if (avatar.type === 'image' && avatar.url) {
    return (
      <div className="avatar">
        <img src={avatar.url} alt="" />
      </div>
    );
  }
  return (
    <div className="avatar" style={{ background: avatar.bg || '#1E40AF' }}>
      {avatar.value}
    </div>
  );
}

export default function Vignette({ item, onClick }) {
  const { lang } = useLanguage();

  const title = typeof item.title === 'string' ? item.title : item.title?.[lang] ?? '';
  const pitch = typeof item.why === 'string' ? item.why : item.why?.[lang] ?? '';

  return (
    <article
      className="vignette-card"
      onClick={() => onClick(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(item); }}
      tabIndex={0}
      role="button"
      aria-label={`${title}${item.peopleName || item.name ? ` — ${item.peopleName || item.name}` : ''}`}
    >
      <div className="vignette-body">
        <Avatar avatar={item.avatar} />
        {item.shortTitle && <div className="vignette-short-title">
          {typeof item.shortTitle === 'object' ? item.shortTitle[lang] : item.shortTitle}
        </div>}
        <div className="vignette-title">{title}</div>
        <p className="vignette-desc">{pitch}</p>
      </div>
      <div className="vignette-price">
        <span className="price-label">{item.price || ''}</span>
        <button className="btn-ask-now" aria-label="Learn more">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </article>
  );
}
