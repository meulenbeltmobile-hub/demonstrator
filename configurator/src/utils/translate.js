import { loadGlossary } from './glossary';

const FIELDS = ['shortTitle', 'title', 'why', 'shortDesc', 'longDesc', 'fullDesc', 'bio', 'ctaLabel', 'cta2Label'];

async function translateOne(text, from, to) {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // Force UTF-8 decoding — MyMemory returns UTF-8 but sometimes signals wrong charset
  const buffer = await res.arrayBuffer();
  const data = JSON.parse(new TextDecoder('utf-8').decode(buffer));
  const translated = data.responseData?.translatedText;
  if (!translated) throw new Error('Empty response');
  return translated;
}

// Translate all empty FIELDS for a single target language from EN source.
// Glossary entries are applied first; only remaining fields hit the API.
export async function translateLang(form, targetLang) {
  const sourceLang = 'en';
  const glossary = await loadGlossary();
  const langGlossary = glossary[targetLang] ?? {};

  const jobs = FIELDS
    .map((field) => {
      const src = form[field]?.[sourceLang]?.trim();
      const dst = form[field]?.[targetLang]?.trim();
      return (src && !dst) ? { field, src } : null;
    })
    .filter(Boolean);

  if (jobs.length === 0) return { form, anyFailed: false };

  const updated = { ...form };
  const apiJobs = [];

  for (const job of jobs) {
    if (langGlossary[job.src]) {
      updated[job.field] = { ...updated[job.field], [targetLang]: langGlossary[job.src] };
    } else {
      apiJobs.push(job);
    }
  }

  if (apiJobs.length === 0) return { form: updated, anyFailed: false };

  const settled = await Promise.allSettled(
    apiJobs.map((job) =>
      translateOne(job.src, sourceLang, targetLang).then((text) => ({ ...job, text }))
    )
  );

  for (const result of settled) {
    if (result.status === 'fulfilled') {
      const { field, text } = result.value;
      updated[field] = { ...updated[field], [targetLang]: text };
    }
  }

  const anyFailed = settled.some((r) => r.status === 'rejected');
  return { form: updated, anyFailed };
}
