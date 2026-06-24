import { useState, useEffect } from 'react';
import { autoTranslate } from '../utils/translate';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
];

const PEOPLE_TOOLS_CATEGORIES = [
  { key: 'think',  label: 'Think',  items: ['Strategic technical advice', 'AI impact advice', 'Go-to-Market advice'],    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="5"/><path d="M9 13h6M9.5 15.5h5M10.5 18h3"/></svg> },
  { key: 'build',  label: 'Build',  items: ['Coding support services', 'Document processing, semantic enrichment'],      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
  { key: 'deploy', label: 'Deploy', items: ['Secure SaaS', 'On premise'],                                               icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/><path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/><path d="M6 12l-3 4h3M18 12l3 4h-3"/></svg> },
  { key: 'market', label: 'Market', items: ['SEO / GEO marketing', 'Social network marketing', 'Business development'],  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/><path d="M16 8.5a3 3 0 010 7"/></svg> },
];

const SOLUTION_CATEGORIES = [
  { key: 'personal-productivity', label: 'Personal productivity' },
  { key: 'enterprise-solutions', label: 'Enterprise solutions' },
];

const VERTICALS = [
  { key: 'pharma', label: 'Pharma' },
  { key: 'publishing', label: 'Publishing' },
  { key: 'finance', label: 'Finance' },
  { key: 'industry', label: 'Industry' },
  { key: 'public-sector', label: 'Public sector' },
];

const PRESET_COLORS = [
  '#1E40AF', '#1E3A8A', '#2563EB', '#0D9488',
  '#16A34A', '#D97706', '#DC2626', '#7C3AED',
  '#9CA3AF', '#111827',
];

const TABS = [
  { key: 'item',     label: 'Item' },
  { key: 'vignette', label: 'Vignette' },
  { key: 'details',  label: 'Details' },
];

function AvatarPicker({ avatar, onChange }) {
  function set(path, value) {
    const parts = path.split('.');
    if (parts.length === 1) {
      onChange({ ...avatar, [path]: value });
    } else {
      onChange({ ...avatar, [parts[1]]: value });
    }
  }

  return (
    <div className="avatar-preview">
      {avatar.type === 'logo' ? (
        <div className="avatar-preview-logo">
          {avatar.url
            ? <img src={avatar.url} alt="" />
            : <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>Logo</span>}
        </div>
      ) : (
        <div
          className="avatar-preview-circle"
          style={avatar.type === 'initials' ? { background: avatar.bg } : {}}
        >
          {avatar.type === 'image' && avatar.url
            ? <img src={avatar.url} alt="" />
            : <span>{avatar.value || '?'}</span>}
        </div>
      )}
      <div className="avatar-preview-fields">
        <div className="form-row" style={{ gap: 8 }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.72rem' }}>Style</label>
            <select
              className="form-select"
              value={avatar.type}
              onChange={(e) => onChange({ ...avatar, type: e.target.value })}
            >
              <option value="initials">Initials</option>
              <option value="image">Image (circle)</option>
              <option value="logo">Logo (uncropped)</option>
            </select>
          </div>
          {avatar.type === 'initials' ? (
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Initials</label>
              <input
                className="form-input"
                value={avatar.value}
                onChange={(e) => onChange({ ...avatar, value: e.target.value.toUpperCase().slice(0, 3) })}
                maxLength={3}
                placeholder="AB"
              />
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem' }}>
                {avatar.type === 'logo' ? 'Logo path' : 'Image path'}
              </label>
              <input
                className="form-input"
                value={avatar.url || ''}
                onChange={(e) => onChange({ ...avatar, url: e.target.value })}
                placeholder={avatar.type === 'logo' ? '/logo.png' : '/photo.png'}
              />
            </div>
          )}
        </div>
        {avatar.type === 'initials' && (
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.72rem' }}>Background colour</label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange({ ...avatar, bg: c })}
                  style={{
                    width: 22, height: 22, borderRadius: '50%', background: c,
                    border: 'none', cursor: 'pointer',
                    outline: avatar.bg === c ? '2.5px solid #1E40AF' : 'none',
                    outlineOffset: 2,
                  }}
                  aria-label={c}
                />
              ))}
              <input
                type="color"
                value={avatar.bg}
                onChange={(e) => onChange({ ...avatar, bg: e.target.value })}
                style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0 }}
                title="Custom colour"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniAvatarPreview({ avatar }) {
  if (avatar.type === 'logo' && avatar.url) {
    return (
      <div style={{ width: 36, height: 36, borderRadius: 4, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={avatar.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    );
  }
  if (avatar.type === 'image' && avatar.url) {
    return (
      <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden' }}>
        <img src={avatar.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatar.bg || '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.72rem', fontWeight: 700 }}>
      {avatar.value || '?'}
    </div>
  );
}

function AvatarSelector({ label, value, onChange, avatarPeople, avatarTool, avatarCompany, toolLabel }) {
  const options = [
    { key: 'people',  label: 'People',  avatar: avatarPeople },
    { key: 'tool',    label: toolLabel || 'Tool', avatar: avatarTool },
    { key: 'company', label: 'Company', avatar: avatarCompany },
  ];
  return (
    <div className="form-group" style={{ marginBottom: 20 }}>
      <label className="form-label">{label}</label>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        {options.map(({ key, label: optLabel, avatar }) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                border: `2px solid ${selected ? 'var(--blue)' : 'var(--gray-200)'}`,
                background: selected ? '#EFF6FF' : 'transparent',
              }}
            >
              <MiniAvatarPreview avatar={avatar} />
              <span style={{ fontSize: '0.72rem', color: selected ? 'var(--blue)' : 'var(--gray-500)', fontWeight: selected ? 600 : 400 }}>
                {optLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function normalise(item, type) {
  return {
    id: null,
    type: type ?? 'tools-services',
    categories: [],
    verticals: [],
    languages: ['en'],
    avatarPeople:  { type: 'initials', value: '', bg: '#1E40AF' },
    avatarTool:    { type: 'initials', value: '', bg: '#1E40AF' },
    avatarCompany: { type: 'initials', value: '', bg: '#9CA3AF' },
    vignetteAvatar: 'people',
    detailsAvatar:  'people',
    peopleName: '',
    peopleLink: '',
    toolName: '',
    toolLink: '',
    companyName: '',
    companyLink: '',
    name: '',
    shortTitle: { en: '', fr: '', de: '' },
    title: { en: '', fr: '', de: '' },
    shortDesc: { en: '', fr: '', de: '' },
    why:      { en: '', fr: '', de: '' },
    longDesc: { en: '', fr: '', de: '' },
    fullDesc: { en: '', fr: '', de: '' },
    bio: { en: '', fr: '', de: '' },
    ctaLabel:  { en: '', fr: '', de: '' },
    ctaUrl:    { en: '', fr: '', de: '' },
    cta2Label: { en: '', fr: '', de: '' },
    cta2Url:   { en: '', fr: '', de: '' },
    price: '',
    link: '',
    ...item,
    name: item?.name ?? '',
    shortTitle: (item?.shortTitle && typeof item.shortTitle === 'object')
      ? item.shortTitle
      : { en: item?.shortTitle ?? '', fr: '', de: '' },
    link: item?.link ?? '',
    price: item?.price ?? '',
    categories: item?.categories ?? (item?.category ? [item.category] : []),
    verticals: item?.verticals ?? (item?.vertical ? [item.vertical] : []),
    languages: item?.languages ?? ['en', 'fr', 'de'],
    avatarPeople:  item?.avatarPeople ?? item?.avatar ?? { type: 'initials', value: '', bg: '#1E40AF' },
    avatarTool:    item?.avatarTool ?? { type: 'initials', value: '', bg: '#1E40AF' },
    avatarCompany: item?.avatarCompany ?? { type: 'initials', value: '', bg: '#9CA3AF' },
    vignetteAvatar: item?.vignetteAvatar ?? 'people',
    detailsAvatar:  item?.detailsAvatar ?? 'people',
    peopleName: item?.peopleName ?? item?.name ?? '',
    peopleLink: item?.peopleLink ?? item?.link ?? '',
    toolName: item?.toolName ?? '',
    toolLink: item?.toolLink ?? '',
    companyName: item?.companyName ?? '',
    companyLink: item?.companyLink ?? '',
  };
}

export default function ItemForm({ item, itemType, onSave, onClose }) {
  const [form, setForm] = useState(() => normalise(item, itemType));
  const [activeTab, setActiveTab] = useState('item');
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState(false);
  const isNew = !item?.id;
  const typeLabel = form.type === 'people' ? 'Person' : form.type === 'solutions' ? 'Solution' : 'Tool';

  const categoryList = (form.type === 'tools-services' || form.type === 'people') ? PEOPLE_TOOLS_CATEGORIES
    : form.type === 'solutions' ? SOLUTION_CATEGORIES : null;
  const showVerticals = form.type === 'solutions' && form.categories.includes('enterprise-solutions');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function setField(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...cur[parts[i]] };
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function toggleArr(field, key) {
    setForm((prev) => {
      const arr = prev[field] ?? [];
      return {
        ...prev,
        [field]: arr.includes(key) ? arr.filter((k) => k !== key) : [...arr, key],
      };
    });
  }

  function handleTypeChange(t) {
    setForm((prev) => ({ ...prev, type: t, categories: [], verticals: [] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTranslateError(false);
    setTranslating(true);

    let finalForm = form;
    try {
      const { form: translated, anyFailed } = await autoTranslate(form);
      finalForm = translated;
      if (anyFailed) setTranslateError(true);
    } catch {
      setTranslateError(true);
    } finally {
      setTranslating(false);
    }

    function cleanAvatar(av) {
      if (av.type === 'image') return { type: 'image', url: av.url?.trim() || '' };
      if (av.type === 'logo')  return { type: 'logo',  url: av.url?.trim() || '' };
      return { type: 'initials', value: av.value?.trim() || '?', bg: av.bg };
    }

    function getAvatarByKey(key) {
      if (key === 'tool')    return cleanAvatar(finalForm.avatarTool);
      if (key === 'company') return cleanAvatar(finalForm.avatarCompany);
      return cleanAvatar(finalForm.avatarPeople);
    }

    const saved = {
      ...finalForm,
      id:            finalForm.id ?? Date.now(),
      type:          finalForm.type,
      peopleName:    finalForm.peopleName.trim() || null,
      peopleLink:    finalForm.peopleLink.trim() || null,
      toolName:      finalForm.toolName.trim() || null,
      toolLink:      finalForm.toolLink.trim() || null,
      companyName:   finalForm.companyName.trim() || null,
      companyLink:   finalForm.companyLink.trim() || null,
      name:          finalForm.peopleName.trim() || finalForm.toolName.trim() || null,
      link:          finalForm.peopleLink.trim() || finalForm.toolLink.trim() || null,
      verticals:     showVerticals ? finalForm.verticals : [],
      avatarPeople:  cleanAvatar(finalForm.avatarPeople),
      avatarTool:    cleanAvatar(finalForm.avatarTool),
      avatarCompany: cleanAvatar(finalForm.avatarCompany),
      vignetteAvatar: finalForm.vignetteAvatar,
      detailsAvatar:  finalForm.detailsAvatar,
      avatar:        getAvatarByKey(finalForm.vignetteAvatar),
      avatarDetails: getAvatarByKey(finalForm.detailsAvatar),
    };
    onSave(saved);
  }

  const activeLangs = LANGS.filter((l) => form.languages.includes(l.code));

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg" role="dialog" aria-modal="true" aria-label={isNew ? 'Add item' : 'Edit item'}>
        <div className="modal-header">
          <h2>{isNew ? `Add ${typeLabel}` : `Edit ${typeLabel}`}</h2>
          <button className="modal-close btn-ghost" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* Name fields — always visible */}
            <div className="form-row" style={{ gap: 12, marginBottom: 20, gridTemplateColumns: form.type === 'people' ? '1fr 1fr' : '1fr 1fr 1fr' }}>
              <div className="form-group">
                <label className="form-label">People Name</label>
                <input
                  className="form-input"
                  value={form.peopleName}
                  onChange={(e) => setField('peopleName', e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required={form.type === 'people'}
                />
                <input
                  className="form-input"
                  type="url"
                  value={form.peopleLink}
                  onChange={(e) => setField('peopleLink', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  style={{ marginTop: 6 }}
                />
              </div>
              {form.type !== 'people' && (
                <div className="form-group">
                  <label className="form-label">
                    {form.type === 'solutions' ? 'Solution Name' : 'Tool Name'}
                  </label>
                  <input
                    className="form-input"
                    value={form.toolName}
                    onChange={(e) => setField('toolName', e.target.value)}
                    placeholder={form.type === 'solutions' ? 'e.g. AI Document Suite' : 'e.g. Nazars'}
                    required
                  />
                  <input
                    className="form-input"
                    type="url"
                    value={form.toolLink}
                    onChange={(e) => setField('toolLink', e.target.value)}
                    placeholder="https://..."
                    style={{ marginTop: 6 }}
                  />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  className="form-input"
                  value={form.companyName}
                  onChange={(e) => setField('companyName', e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
                <input
                  className="form-input"
                  type="url"
                  value={form.companyLink}
                  onChange={(e) => setField('companyLink', e.target.value)}
                  placeholder="https://..."
                  style={{ marginTop: 6 }}
                />
              </div>
            </div>

            {/* Tab bar */}
            <div className="modal-tab-bar">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`modal-tab-btn${activeTab === key ? ' active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Tab: Item ── */}
            {activeTab === 'item' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {/* Type */}
                <div className="form-group">
                  <div className="form-section-title" style={{ marginBottom: 10 }}>Type</div>
                  <div className="type-radio-group">
                    {[
                      { value: 'people',        label: 'People' },
                      { value: 'tools-services', label: 'Tools' },
                      { value: 'solutions',      label: 'Solutions' },
                    ].map(({ value, label }) => (
                      <label key={value} className={`type-radio-label ${form.type === value ? 'checked' : ''}`}>
                        <input
                          type="radio"
                          name="item-type"
                          value={value}
                          checked={form.type === value}
                          onChange={() => handleTypeChange(value)}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                {categoryList && (
                  <div className="form-group">
                    <div className="form-section-title" style={{ marginBottom: 10 }}>
                      {form.type === 'solutions' ? 'Solution Categories' : 'Categories'}
                      {form.categories.length === 0 && (
                        <span style={{ marginLeft: 8, fontWeight: 400, color: 'var(--red)', fontSize: '0.75rem', textTransform: 'none', letterSpacing: 0 }}>
                          Select at least one
                        </span>
                      )}
                    </div>
                    <div className="pipeline-cat-bar" style={{ flexWrap: 'wrap' }}>
                      {categoryList.map((c) => {
                        const checked = form.categories.includes(c.key);
                        return (
                          <div key={c.key} className="pipeline-filter-step">
                            <button
                              type="button"
                              className={`pipeline-cat-btn${checked ? ' active' : ''}`}
                              onClick={() => toggleArr('categories', c.key)}
                            >
                              {c.icon && <span className="pipeline-cat-icon">{c.icon}</span>}
                              {c.label}
                            </button>
                            {c.items?.length > 0 && (
                              <ul className="pipeline-items">
                                {c.items.map((itm, i) => <li key={i}>{itm}</li>)}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Verticals */}
                {showVerticals && (
                  <div className="form-group">
                    <div className="form-section-title" style={{ marginBottom: 10 }}>
                      Verticals
                      <span style={{ marginLeft: 8, fontWeight: 400, color: 'var(--gray-400)', fontSize: '0.75rem', textTransform: 'none', letterSpacing: 0 }}>
                        leave blank to appear in all
                      </span>
                    </div>
                    <div className="check-grid check-grid-wide">
                      {VERTICALS.map((v) => {
                        const checked = form.verticals.includes(v.key);
                        return (
                          <label key={v.key} className={`check-tile ${checked ? 'checked' : ''}`}>
                            <input type="checkbox" checked={checked} onChange={() => toggleArr('verticals', v.key)} />
                            {v.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Languages */}
                <div className="form-group">
                  <div className="form-section-title" style={{ marginBottom: 10 }}>Languages</div>
                  <div className="lang-check-row">
                    {LANGS.map((l) => {
                      const checked = form.languages.includes(l.code);
                      return (
                        <label key={l.code} className={`lang-tile ${checked ? 'checked' : ''}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggleArr('languages', l.code)} />
                          {l.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Avatars */}
                <div className="form-group">
                  <div className="form-section-title" style={{ marginBottom: 10 }}>Avatars</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>People Avatar</div>
                      <AvatarPicker
                        avatar={form.avatarPeople}
                        onChange={(av) => setForm((prev) => ({ ...prev, avatarPeople: av }))}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {form.type === 'solutions' ? 'Solution Avatar' : 'Tool Avatar'}
                      </div>
                      <AvatarPicker
                        avatar={form.avatarTool}
                        onChange={(av) => setForm((prev) => ({ ...prev, avatarTool: av }))}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Avatar</div>
                      <AvatarPicker
                        avatar={form.avatarCompany}
                        onChange={(av) => setForm((prev) => ({ ...prev, avatarCompany: av }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Vignette ── */}
            {activeTab === 'vignette' && (
              <div>
                <AvatarSelector
                  label="Avatar"
                  value={form.vignetteAvatar}
                  onChange={(v) => setField('vignetteAvatar', v)}
                  avatarPeople={form.avatarPeople}
                  avatarTool={form.avatarTool}
                  avatarCompany={form.avatarCompany}
                  toolLabel={form.type === 'solutions' ? 'Solution' : 'Tool'}
                />
                {activeLangs.length > 0 ? activeLangs.map((lang) => (
                  <div key={lang.code} className="lang-section" style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--blue)', marginBottom: 10 }}>
                      {lang.label}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Short title <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <input
                        className="form-input"
                        value={form.shortTitle?.[lang.code] ?? ''}
                        onChange={(e) => setField(`shortTitle.${lang.code}`, e.target.value)}
                        placeholder="e.g. Kairntech Partner, Senior Developer"
                        maxLength={60}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Title <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <input
                        className="form-input"
                        value={form.title[lang.code]}
                        onChange={(e) => setField(`title.${lang.code}`, e.target.value)}
                        placeholder={`Title in ${lang.label}`}
                        required={lang.code === 'en'}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Pitch <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        value={form.why?.[lang.code] ?? ''}
                        onChange={(e) => setField(`why.${lang.code}`, e.target.value)}
                        placeholder={`Key reasons — why choose this in ${lang.label}`}
                        style={{ minHeight: 80 }}
                      />
                    </div>
                  </div>
                )) : (
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>Select at least one language on the Item tab.</p>
                )}

                {/* Offer — single field, not per-language */}
                <div className="form-group" style={{ marginTop: 8 }}>
                  <label className="form-label">Offer</label>
                  <input
                    className="form-input"
                    value={form.price}
                    onChange={(e) => setField('price', e.target.value)}
                    placeholder="e.g. 100 EUR / hour"
                  />
                </div>
              </div>
            )}

            {/* ── Tab: Details ── */}
            {activeTab === 'details' && (
              <div>
                <AvatarSelector
                  label="Avatar"
                  value={form.detailsAvatar}
                  onChange={(v) => setField('detailsAvatar', v)}
                  avatarPeople={form.avatarPeople}
                  avatarTool={form.avatarTool}
                  avatarCompany={form.avatarCompany}
                  toolLabel={form.type === 'solutions' ? 'Solution' : 'Tool'}
                />
                {activeLangs.length > 0 ? activeLangs.map((lang) => (
                  <div key={lang.code} className="lang-section" style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--blue)', marginBottom: 10 }}>
                      {lang.label}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Bio <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        value={form.bio?.[lang.code] ?? ''}
                        onChange={(e) => setField(`bio.${lang.code}`, e.target.value)}
                        placeholder={`Short biography or background in ${lang.label}`}
                        style={{ minHeight: 80 }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Description <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <input
                        className="form-input"
                        value={form.shortDesc[lang.code]}
                        onChange={(e) => setField(`shortDesc.${lang.code}`, e.target.value)}
                        placeholder={`Description in ${lang.label}`}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Why <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        value={form.longDesc?.[lang.code] ?? ''}
                        onChange={(e) => setField(`longDesc.${lang.code}`, e.target.value)}
                        placeholder={`Why choose this in ${lang.label}`}
                        style={{ minHeight: 100 }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Next steps <span className="lang-flag">{lang.code.toUpperCase()}</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        value={form.fullDesc[lang.code]}
                        onChange={(e) => setField(`fullDesc.${lang.code}`, e.target.value)}
                        placeholder={`Next steps in ${lang.label}`}
                        style={{ minHeight: 80 }}
                      />
                    </div>
                    <div className="form-row" style={{ gap: 8 }}>
                      <div className="form-group">
                        <label className="form-label">
                          Action item 1 <span className="lang-flag">{lang.code.toUpperCase()}</span>
                        </label>
                        <input
                          className="form-input"
                          value={form.ctaLabel?.[lang.code] ?? ''}
                          onChange={(e) => setField(`ctaLabel.${lang.code}`, e.target.value)}
                          placeholder="e.g. Book a session"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Button URL 1 <span className="lang-flag">{lang.code.toUpperCase()}</span>
                          <span style={{ fontWeight: 400, color: 'var(--gray-400)', textTransform: 'none', letterSpacing: 0, marginLeft: 4 }}>(empty → contact form)</span>
                        </label>
                        <input
                          className="form-input"
                          type="url"
                          value={form.ctaUrl?.[lang.code] ?? ''}
                          onChange={(e) => setField(`ctaUrl.${lang.code}`, e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="form-row" style={{ gap: 8 }}>
                      <div className="form-group">
                        <label className="form-label">
                          Action item 2 <span className="lang-flag">{lang.code.toUpperCase()}</span>
                        </label>
                        <input
                          className="form-input"
                          value={form.cta2Label?.[lang.code] ?? ''}
                          onChange={(e) => setField(`cta2Label.${lang.code}`, e.target.value)}
                          placeholder="e.g. Learn more"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Button URL 2 <span className="lang-flag">{lang.code.toUpperCase()}</span>
                        </label>
                        <input
                          className="form-input"
                          type="url"
                          value={form.cta2Url?.[lang.code] ?? ''}
                          onChange={(e) => setField(`cta2Url.${lang.code}`, e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                )) : (
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>Select at least one language on the Item tab.</p>
                )}
              </div>
            )}

          </div>

          <div className="modal-footer">
            {translateError && (
              <span style={{ fontSize: '0.8rem', color: 'var(--orange-dark)', marginRight: 'auto' }}>
                Some translations failed — content saved as-is.
              </span>
            )}
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={translating}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={(categoryList !== null && form.categories.length === 0) || translating}>
              {translating ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Translating…
                </>
              ) : (
                isNew ? `Add ${typeLabel}` : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
