import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.appliedaiinaction.com';
const DEFAULT_DESC = 'Applied AI in Action connects AI-powered app builders with an ecosystem of people and tools to turn ideas into robust, market-ready and sovereign web applications.';

export default function SEO({ title, description = DEFAULT_DESC, noindex = false, path = '' }) {
  const fullTitle = title ? `${title} — Applied AI in Action` : 'Applied AI in Action';
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Applied AI in Action" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
