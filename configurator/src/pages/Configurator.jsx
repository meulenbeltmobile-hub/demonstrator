import { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ExportModal from '../components/ExportModal';
import PackageEditor from '../components/PackageEditor';
import { seedPeople, seedProducts, seedSolutions, seedPackages } from '../data/seeds';

const STORAGE_KEY = 'aaia-config-items';
const PACKAGES_KEY = 'aaia-config-packages';

const PEOPLE_TOOLS_CATEGORIES = [
  { key: 'think',  label: 'Prepare',  items: ['Strategic technical advice', 'AI impact advice', 'Go-to-Market advice'],              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="5"/><path d="M9 13h6M9.5 15.5h5M10.5 18h3"/></svg> },
  { key: 'build',  label: 'Build',  items: ['Coding support services', 'Document processing, semantic enrichment'],               icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
  { key: 'deploy', label: 'Deploy', items: ['Secure SaaS', 'On premise'],                                                         icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 8 6 13 6 16h12c0-3-.5-8-6-14z"/><path d="M6 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"/><path d="M6 12l-3 4h3M18 12l3 4h-3"/></svg> },
  { key: 'market', label: 'Market', items: ['SEO / GEO marketing', 'Social network marketing', 'Business development'],           icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3l-7 4H5a1 1 0 00-1 1v6a1 1 0 001 1h6l7 4V3z"/><path d="M16 8.5a3 3 0 010 7"/></svg> },
];

const LANG_LABELS = { en: 'EN', fr: 'FR', de: 'DE' };

const APP_SOURCE_LABELS = {
  powered: 'Powered by AAIA',
  partner: 'Premium Partners',
  choice: "AAIA's Choice",
};

function migrateItem(item) {
  return {
    ...item,
    categories: item.categories ?? (item.category ? [item.category] : []),
    verticals:  item.verticals  ?? (item.vertical  ? [item.vertical]  : []),
    languages:  item.languages  ?? ['en', 'fr', 'de'],
  };
}

function completeness(item) {
  let score = 0;
  for (const value of Object.values(item)) {
    if (value == null || value === '') continue;
    if (typeof value === 'object') {
      score += Object.values(value).filter((v) => v != null && v !== '' && (!Array.isArray(v) || v.length)).length;
    } else {
      score += 1;
    }
  }
  return score;
}

// Collapse items that share the same type + English short title into one,
// keeping the most complete/recent copy. This is a safety net against any
// browser's localStorage still holding a duplicate from before the
// loadItems() resurrection bug was fixed — without it, opening the
// configurator from a stale browser silently re-introduces the duplicate.
function dedupeByTitle(items) {
  const groups = new Map();
  items.forEach((item, index) => {
    const title = (item.shortTitle?.en || '').trim().toLowerCase();
    const key = title ? `${item.type}::${title}` : `unique::${item.id}::${index}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  const result = [];
  for (const group of groups.values()) {
    if (group.length > 1) {
      group.sort((a, b) => completeness(b) - completeness(a) || b.id - a.id);
    }
    result.push(group[0]);
  }
  return result;
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      // localStorage is the source of truth once it exists — do NOT merge
      // seed items back in, or every delete gets silently undone on reload.
      return dedupeByTitle(JSON.parse(raw).map(migrateItem));
    }
  } catch {}
  return dedupeByTitle([...seedPeople, ...seedProducts, ...seedSolutions]);
}

function loadPackages() {
  try {
    const raw = localStorage.getItem(PACKAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedPackages;
}

// Drop blank feature lines so the written data file stays clean ([""] -> []),
// while the editor keeps the raw text for a smooth typing experience.
function cleanPackagesForFile(packages) {
  return packages.map((p) => ({
    ...p,
    features: Object.fromEntries(
      Object.entries(p.features ?? {}).map(([phase, langs]) => [
        phase,
        Object.fromEntries(
          Object.entries(langs ?? {}).map(([lc, arr]) => [lc, (arr ?? []).filter((f) => f && f.trim())]),
        ),
      ]),
    ),
  }));
}

function saveAll(items, packages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
  // Persist to the website data files via Vite dev-server middleware (silent fail in production)
  fetch('/api/save-seeds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      people:    items.filter((i) => i.type === 'people'),
      products:  items.filter((i) => i.type === 'tools-services'),
      solutions: items.filter((i) => i.type === 'solutions'),
      packages:  cleanPackagesForFile(packages),
    }),
  }).catch(() => {});
}

function Avatar({ avatar, size = 44 }) {
  if (avatar.type === 'logo') {
    return (
      <div style={{
        width: 'auto', maxWidth: 80, height: size, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={avatar.url} alt="" style={{ maxWidth: 80, maxHeight: size, objectFit: 'contain' }} />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.28, color: '#fff', overflow: 'hidden',
      background: avatar.type === 'initials' ? avatar.bg : '#E5E7EB',
    }}>
      {avatar.type === 'image'
        ? <img src={avatar.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span>{avatar.value || '?'}</span>}
    </div>
  );
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button className={`tab-btn ${active ? 'active' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Configurator() {
  const [items, setItems] = useState(loadItems);
  const [packages, setPackages] = useState(loadPackages);
  const [typeFilter,     setTypeFilter]     = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editing,       setEditing]       = useState(null);
  const [showExport,    setShowExport]    = useState(false);
  const [publishing,    setPublishing]    = useState(false);
  const [publishStatus, setPublishStatus] = useState(null);
  const [publishMsg,    setPublishMsg]    = useState('');

  useEffect(() => { saveAll(items, packages); }, [items, packages]);

  async function handlePublish() {
    setPublishing(true);
    setPublishStatus(null);
    try {
      const res = await fetch('/api/publish', { method: 'POST' });
      const data = await res.json();
      setPublishStatus(res.ok ? 'ok' : 'error');
      setPublishMsg(data.message || data.error || '');
    } catch (err) {
      setPublishStatus('error');
      setPublishMsg(err.message);
    } finally {
      setPublishing(false);
      setTimeout(() => setPublishStatus(null), 4000);
    }
  }

  function handleTypeChange(t) {
    setTypeFilter(t);
    setCategoryFilter('all');
  }

  function handleCategoryChange(c) {
    setCategoryFilter(c);
  }

  // Only People are organised by go-to-market phase. Applications (tools) are
  // categorised by app source instead, set on the item form.
  const categoryList = typeFilter === 'people' ? PEOPLE_TOOLS_CATEGORIES : null;

  const filtered = items.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && !item.categories?.includes(categoryFilter)) return false;
    return true;
  });

  function handleSave(saved) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [...prev, saved];
    });
    setEditing(null);
  }

  function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleReset() {
    if (window.confirm('Reset all data to the built-in seed data? This cannot be undone.')) {
      setItems([...seedPeople, ...seedProducts, ...seedSolutions]);
    }
  }

  const editingItem = editing && editing !== 'new-tools' && editing !== 'new-people'
    ? items.find((i) => i.id === editing) ?? null : null;
  const editingType = editing === 'new-tools' ? 'tools-services'
    : editing === 'new-people' ? 'people'
    : editingItem?.type ?? 'tools-services';

  return (
    <>
      <header className="config-header">
        <div className="container">
          <h1>Content Configurator</h1>
          <p>Manage the content displayed on the Applied AI in Action website.</p>
        </div>
      </header>

      {/* Sticky controls bar */}
      <div className="controls-bar">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Row 1: Type + Export */}
          <div className="controls-inner">
            <div className="controls-group">
              <span className="controls-label">Type</span>
              <FilterBtn active={typeFilter === 'all'} onClick={() => handleTypeChange('all')}>All</FilterBtn>
              <FilterBtn active={typeFilter === 'people'} onClick={() => handleTypeChange('people')}>People</FilterBtn>
              <FilterBtn active={typeFilter === 'tools-services'} onClick={() => handleTypeChange('tools-services')}>Tools</FilterBtn>
              <FilterBtn active={typeFilter === 'packages'} onClick={() => handleTypeChange('packages')}>Packages</FilterBtn>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              {publishMsg && (
                <span style={{ fontSize: '0.8rem', color: publishStatus === 'ok' ? 'var(--green)' : 'var(--red)' }}>
                  {publishMsg}
                </span>
              )}
              <button
                className="btn btn-secondary"
                onClick={handlePublish}
                disabled={publishing}
              >
                {publishing ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Publishing…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Row 2: Category filter */}
          {categoryList && (
            <div style={{ paddingTop: 4 }}>
              <div className="controls-label" style={{ marginBottom: 8 }}>
                Categories
              </div>
              <div className="pipeline-cat-bar">
                <FilterBtn active={categoryFilter === 'all'} onClick={() => handleCategoryChange('all')}>All</FilterBtn>
                {categoryList.map((c) => (
                  <div key={c.key} className="pipeline-filter-step">
                    <button
                      className={`pipeline-cat-btn${categoryFilter === c.key ? ' active' : ''}`}
                      onClick={() => handleCategoryChange(c.key)}
                    >
                      {c.icon && <span className="pipeline-cat-icon">{c.icon}</span>}
                      {c.label}
                    </button>
                    {c.items?.length > 0 && (
                      <ul className="pipeline-items">
                        {c.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Main content */}
      <section className="content-area">
        <div className="container">
          {typeFilter === 'packages' ? (
            <PackageEditor packages={packages} onChange={setPackages} />
          ) : (
          <>
          <div className="content-toolbar">
            <span className="items-count">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} shown
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setEditing('new-people')}>+ Add Person</button>
              <button className="btn btn-outline btn-sm" onClick={() => setEditing('new-tools')}>+ Add Tool</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>No items match the current filter.</p>
            </div>
          ) : (
            <div className="item-list">
              {filtered.map((item) => {
                const catLabels = (item.categories ?? []).map(
                  (k) => PEOPLE_TOOLS_CATEGORIES.find((c) => c.key === k)?.label ?? k
                );
                const appSourceLabel = APP_SOURCE_LABELS[item.appSource] ?? null;

                return (
                  <div key={item.id} className="item-card">
                    <Avatar avatar={item.avatar} />

                    <div className="item-info">
                      <div className="item-title">{item.shortTitle?.en || item.title?.en || '(untitled)'}</div>
                      <div className="item-meta">
                        {item.peopleName && <span className="item-meta-chip blue">{item.peopleName}</span>}
                      {item.toolName && <span className="item-meta-chip blue">{item.toolName}</span>}
                      {item.companyName && <span className="item-meta-chip" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{item.companyName}</span>}
                        <span className="item-meta-chip" style={{
                          background: item.type === 'tools-services' ? 'var(--blue-mid)' : 'var(--green-light)',
                          color: item.type === 'tools-services' ? 'var(--blue)' : 'var(--green)',
                        }}>
                          {item.type === 'tools-services' ? 'Tool' : 'People'}
                        </span>
                        {appSourceLabel && (
                          <span className="item-meta-chip" style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}>
                            {appSourceLabel}
                          </span>
                        )}
                        {catLabels.map((l) => (
                          <span key={l} className="item-meta-chip">{l}</span>
                        ))}
                        {(item.languages ?? []).map((lc) => (
                          <span key={lc} className="item-meta-chip" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
                            {LANG_LABELS[lc] ?? lc.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="item-price">{item.price}</div>

                    <div className="item-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => setEditing(item.id)} title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-icon" onClick={() => handleDelete(item.id, item.title?.en || '(untitled)')} title="Delete" style={{ color: 'var(--red)' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </>
          )}
        </div>
      </section>

      {editing && (
        <ItemForm
          key={editing}
          item={editingItem}
          itemType={editingType}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {showExport && <ExportModal items={items} onClose={() => setShowExport(false)} />}
    </>
  );
}
