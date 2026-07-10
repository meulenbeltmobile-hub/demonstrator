import { useLanguage } from '../context/LanguageContext';

export default function AppSourceBadge({ type, variant = 'tab' }) {
  const { tr } = useLanguage();
  if (!type) return null;

  const entry = tr.product.appSource?.[type];
  if (!entry) return null;

  const isFull = variant === 'full';
  return (
    <span className={isFull ? 'app-source-pill' : 'app-source-tab'}>
      {isFull ? entry.full : entry.tab}
    </span>
  );
}
