const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
];

const PHASES = [
  { key: 'think',  label: 'Prepare', color: '#2563EB' },
  { key: 'build',  label: 'Build',   color: '#F59E0B' },
  { key: 'deploy', label: 'Deploy',  color: '#2563EB' },
  { key: 'market', label: 'Market',  color: '#F59E0B' },
];

export default function PackageEditor({ packages, onChange }) {
  function update(idx, mutate) {
    onChange(packages.map((p, i) => (i === idx ? mutate({ ...p }) : p)));
  }
  const setName = (idx, lc, val) => update(idx, (p) => ({ ...p, name: { ...p.name, [lc]: val } }));
  const setPrice = (idx, val) => update(idx, (p) => ({ ...p, price: val }));
  const setPopular = (idx, val) => update(idx, (p) => ({ ...p, popular: val }));
  const setFeatures = (idx, phase, lc, text) =>
    update(idx, (p) => ({
      ...p,
      features: { ...p.features, [phase]: { ...p.features[phase], [lc]: text.split('\n') } },
    }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {packages.map((pkg, idx) => (
        <div key={pkg.id} className="item-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16, padding: 20 }}>

          {/* Header: names + price + popular */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {LANGS.map((l) => (
              <div className="form-group" key={l.code} style={{ minWidth: 150, flex: 1 }}>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Name <span className="lang-flag">{l.label}</span></label>
                <input className="form-input" value={pkg.name?.[l.code] ?? ''} onChange={(e) => setName(idx, l.code, e.target.value)} />
              </div>
            ))}
            <div className="form-group" style={{ minWidth: 130 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Price</label>
              <input className="form-input" value={pkg.price ?? ''} onChange={(e) => setPrice(idx, e.target.value)} placeholder="e.g. 500 €/month" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', paddingBottom: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <input type="checkbox" checked={!!pkg.popular} onChange={(e) => setPopular(idx, e.target.checked)} />
              Most popular
            </label>
          </div>

          {/* Phases × languages feature lists */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {PHASES.map((ph) => (
              <div key={ph.key} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--gray-700)', marginBottom: 10 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: ph.color }} />
                  {ph.label}
                </div>
                {LANGS.map((l) => (
                  <div className="form-group" key={l.code} style={{ marginBottom: 8 }}>
                    <label className="form-label" style={{ fontSize: '0.68rem' }}>Features <span className="lang-flag">{l.label}</span> <span style={{ fontWeight: 400, color: 'var(--gray-400)', textTransform: 'none', letterSpacing: 0 }}>— one per line</span></label>
                    <textarea
                      className="form-textarea"
                      value={(pkg.features?.[ph.key]?.[l.code] ?? []).join('\n')}
                      onChange={(e) => setFeatures(idx, ph.key, l.code, e.target.value)}
                      rows={3}
                      style={{ minHeight: 54 }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
