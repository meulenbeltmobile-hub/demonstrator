const FIELDS = ['shortTitle', 'title', 'why', 'shortDesc', 'longDesc', 'fullDesc', 'bio', 'ctaLabel', 'cta2Label'];

async function translateOne(text, from, to) {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const translated = data.responseData?.translatedText;
  if (!translated) throw new Error('Empty response');
  return translated;
}

export async function autoTranslate(form) {
  const langs = form.languages ?? [];
  if (langs.length < 2) return { form, translated: false };

  // Source = first language that has a title
  const sourceLang = langs.find((lc) => form.title?.[lc]?.trim()) ?? langs[0];

  // Collect jobs: fields that are empty in a non-source language
  const jobs = [];
  for (const lc of langs) {
    if (lc === sourceLang) continue;
    for (const field of FIELDS) {
      const src = form[field]?.[sourceLang]?.trim();
      const dst = form[field]?.[lc]?.trim();
      if (src && !dst) jobs.push({ field, lc, src });
    }
  }

  if (jobs.length === 0) return { form, translated: false };

  // Run all jobs in parallel
  const settled = await Promise.allSettled(
    jobs.map((job) =>
      translateOne(job.src, sourceLang, job.lc).then((text) => ({ ...job, text }))
    )
  );

  // Apply successful results
  const updated = { ...form };
  for (const result of settled) {
    if (result.status === 'fulfilled') {
      const { field, lc, text } = result.value;
      updated[field] = { ...updated[field], [lc]: text };
    }
  }

  const anyFailed = settled.some((r) => r.status === 'rejected');
  return { form: updated, translated: true, anyFailed };
}
