let cache = null;

export async function loadGlossary() {
  if (cache) return cache;
  try {
    const res = await fetch('/api/glossary');
    if (!res.ok) return {};
    cache = await res.json();
    return cache;
  } catch {
    return {};
  }
}

export async function saveGlossaryEntry(lang, source, translation) {
  cache = null;
  await fetch('/api/save-glossary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang, source, translation }),
  });
}
