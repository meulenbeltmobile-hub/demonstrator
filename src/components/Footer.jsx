import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
  const { tr, lang, setLang } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <Logo size={24} />
              Applied AI in Action
            </div>
            <p className="footer-tagline">{tr.footer.tagline}</p>
          </div>

          <div className="footer-col">
            <h4>Solutions</h4>
            <Link to="/solutions">{tr.nav.solutions}</Link>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <Link to="/applications">{tr.nav.tools}</Link>
            <Link to="/products">{tr.nav.products}</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">{tr.nav.about}</Link>
            <Link to="/blog">{tr.nav.blog}</Link>
            <Link to="/form">{tr.form.eyebrow}</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">{tr.nav.privacy}</Link>
            <Link to="/terms">{tr.nav.terms}</Link>
            <Link to="/legal">{tr.nav.legal}</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">{tr.footer.rights}</span>
          <div className="footer-langs">
            {[
              { code: 'en', label: 'EN' },
              { code: 'fr', label: 'FR' },
              { code: 'de', label: 'DE' },
            ].map((lng) => (
              <button
                key={lng.code}
                className={`lang-btn ${lang === lng.code ? 'active' : ''}`}
                onClick={() => setLang(lng.code)}
                aria-label={`Switch to ${lng.label}`}
              >
                {lng.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
