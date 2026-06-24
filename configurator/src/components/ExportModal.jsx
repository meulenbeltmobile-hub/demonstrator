import { useState, useEffect } from 'react';

function jsArray(arr) {
  if (!arr || arr.length === 0) return '[]';
  return `[${arr.map((v) => `'${v}'`).join(', ')}]`;
}

function escapeSingle(str) {
  return (str ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n');
}

function serialiseItem(item) {
  const lines = [];
  lines.push(`  {`);
  lines.push(`    id: ${item.id},`);
  lines.push(`    categories: ${jsArray(item.categories)},`);
  if (item.verticals && item.verticals.length > 0) {
    lines.push(`    verticals: ${jsArray(item.verticals)},`);
  }
  if (item.languages && item.languages.length > 0) {
    lines.push(`    languages: ${jsArray(item.languages)},`);
  }

  if (item.avatar.type === 'initials') {
    lines.push(`    avatar: { type: 'initials', value: '${escapeSingle(item.avatar.value)}', bg: '${item.avatar.bg}' },`);
  } else if (item.avatar.type === 'logo') {
    lines.push(`    avatar: { type: 'logo', url: '${escapeSingle(item.avatar.url)}' },`);
  } else {
    lines.push(`    avatar: { type: 'image', url: '${escapeSingle(item.avatar.url)}' },`);
  }

  lines.push(`    name: ${item.name ? `'${escapeSingle(item.name)}'` : 'null'},`);
  if (item.shortTitle && typeof item.shortTitle === 'object' && Object.values(item.shortTitle).some(Boolean)) {
    lines.push(`    shortTitle: {`);
    for (const [lc, val] of Object.entries(item.shortTitle)) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  lines.push(`    title: {`);
  for (const [lc, val] of Object.entries(item.title ?? {})) {
    if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
  }
  lines.push(`    },`);

  if (item.bio && Object.values(item.bio).some(Boolean)) {
    lines.push(`    bio: {`);
    for (const [lc, val] of Object.entries(item.bio ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  if (item.why && Object.values(item.why).some(Boolean)) {
    lines.push(`    why: {`);
    for (const [lc, val] of Object.entries(item.why ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  if (item.shortDesc && Object.values(item.shortDesc).some(Boolean)) {
    lines.push(`    shortDesc: {`);
    for (const [lc, val] of Object.entries(item.shortDesc ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  if (item.longDesc && Object.values(item.longDesc).some(Boolean)) {
    lines.push(`    longDesc: {`);
    for (const [lc, val] of Object.entries(item.longDesc ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  if (item.fullDesc && Object.values(item.fullDesc).some(Boolean)) {
    lines.push(`    fullDesc: {`);
    for (const [lc, val] of Object.entries(item.fullDesc ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  if (item.ctaLabel && Object.values(item.ctaLabel).some(Boolean)) {
    lines.push(`    ctaLabel: {`);
    for (const [lc, val] of Object.entries(item.ctaLabel ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }
  if (item.ctaUrl && Object.values(item.ctaUrl).some(Boolean)) {
    lines.push(`    ctaUrl: {`);
    for (const [lc, val] of Object.entries(item.ctaUrl ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }
  if (item.cta2Label && Object.values(item.cta2Label).some(Boolean)) {
    lines.push(`    cta2Label: {`);
    for (const [lc, val] of Object.entries(item.cta2Label ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }
  if (item.cta2Url && Object.values(item.cta2Url).some(Boolean)) {
    lines.push(`    cta2Url: {`);
    for (const [lc, val] of Object.entries(item.cta2Url ?? {})) {
      if (val) lines.push(`      ${lc}: '${escapeSingle(val)}',`);
    }
    lines.push(`    },`);
  }

  lines.push(`    price: '${escapeSingle(item.price)}',`);
  lines.push(`    link: ${item.link ? `'${escapeSingle(item.link)}'` : 'null'},`);
  lines.push(`  },`);
  return lines.join('\n');
}

function serialiseItemWithType(item) {
  // Insert type: after id: by prepending it
  const base = serialiseItem(item);
  return base.replace(
    `    id: ${item.id},`,
    `    id: ${item.id},\n    type: '${item.type}',`
  );
}

function generateJs(items, varName, fileName) {
  if (items.length === 0) {
    return `// ${fileName}\nconst ${varName} = [];\n\nexport default ${varName};\n`;
  }
  const body = items.map(serialiseItem).join('\n');
  return `// Content managed via AAIA Configurator\nconst ${varName} = [\n${body}\n];\n\nexport default ${varName};\n`;
}

function generateSeeds(toolsItems, solutionItems) {
  const pBody = toolsItems.length > 0 ? toolsItems.map(serialiseItemWithType).join('\n') : '';
  const sBody = solutionItems.length > 0 ? solutionItems.map(serialiseItemWithType).join('\n') : '';
  return (
    `// Generated by AAIA Configurator — drop this file into:\n` +
    `// aaia-configurator/src/data/seeds.js\n\n` +
    `export const seedProducts = [\n${pBody}${pBody ? '\n' : ''}];\n\n` +
    `export const seedSolutions = [\n${sBody}${sBody ? '\n' : ''}];\n`
  );
}

export default function ExportModal({ items, onClose }) {
  const [tab, setTab] = useState('tools');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toolsItems    = items.filter((i) => i.type === 'tools-services');
  const solutionItems = items.filter((i) => i.type === 'solutions');

  const code = tab === 'tools'
    ? generateJs(toolsItems, 'products', 'products.js')
    : tab === 'solutions'
      ? generateJs(solutionItems, 'solutions', 'solutions.js')
      : generateSeeds(toolsItems, solutionItems);

  const fileName = tab === 'tools' ? 'products.js' : tab === 'solutions' ? 'solutions.js' : 'seeds.js';

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg" role="dialog" aria-modal="true" aria-label="Export data">
        <div className="modal-header">
          <h2>Export Data Files</h2>
          <button className="modal-close btn-ghost" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: 16 }}>
            {tab === 'seeds'
              ? <>Download <code style={{ background: 'var(--gray-100)', padding: '1px 5px', borderRadius: 4, fontSize: '0.82rem' }}>seeds.js</code> and replace <code style={{ background: 'var(--gray-100)', padding: '1px 5px', borderRadius: 4, fontSize: '0.82rem' }}>aaia-configurator/src/data/seeds.js</code> to permanently back up all items.</>
              : <>Copy or download and replace the file in <code style={{ background: 'var(--gray-100)', padding: '1px 5px', borderRadius: 4, fontSize: '0.82rem' }}>aaia-website/src/data/</code>.</>
            }
          </p>

          <div className="export-tabs">
            <button
              className={`export-tab-btn ${tab === 'tools' ? 'active' : ''}`}
              onClick={() => { setTab('tools'); setCopied(false); }}
            >
              products.js <span style={{ opacity: 0.6, fontWeight: 400 }}>({toolsItems.length})</span>
            </button>
            <button
              className={`export-tab-btn ${tab === 'solutions' ? 'active' : ''}`}
              onClick={() => { setTab('solutions'); setCopied(false); }}
            >
              solutions.js <span style={{ opacity: 0.6, fontWeight: 400 }}>({solutionItems.length})</span>
            </button>
            <button
              className={`export-tab-btn ${tab === 'seeds' ? 'active' : ''}`}
              onClick={() => { setTab('seeds'); setCopied(false); }}
              style={{ borderColor: 'var(--orange)', color: tab === 'seeds' ? 'var(--white)' : 'var(--orange-dark)', background: tab === 'seeds' ? 'var(--orange)' : '' }}
            >
              seeds.js <span style={{ opacity: 0.6, fontWeight: 400 }}>({items.length} total)</span>
            </button>
          </div>

          <div className="copy-bar">
            <span>{fileName}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm btn-outline" onClick={handleDownload}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
              <button className="btn btn-sm btn-primary" onClick={handleCopy}>
                {copied ? (
                  <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
                ) : (
                  <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>Copy</>
                )}
              </button>
            </div>
          </div>

          <pre className="code-block">{code}</pre>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
