import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { tr } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">
            Applied AI in Action
          </div>
          <div className="footer-tagline">{tr.footer.tagline}</div>
        </div>
        <div className="footer-copy">{tr.footer.rights}</div>
      </div>
    </footer>
  );
}
