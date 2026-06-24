import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
];

export default function Navbar() {
  const { lang, setLang, tr } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: tr.nav.home },
    { to: '/products', label: tr.nav.products },
    { to: '/tools', label: tr.nav.tools },
    { to: '/solutions', label: tr.nav.solutions },
    { to: '/blog', label: tr.nav.blog },
    { to: '/about', label: tr.nav.about },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <Logo size={28} />
          <span className="brand-text">
            <span>Applied AI</span>
            <span>in Action</span>
          </span>
        </Link>

        <ul className="navbar-nav">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="lang-switcher" role="group" aria-label="Language selector">
          {LANGS.map((lng) => (
            <button
              key={lng.code}
              className={`lang-btn ${lang === lng.code ? 'active' : ''}`}
              onClick={() => setLang(lng.code)}
              aria-pressed={lang === lng.code}
              aria-label={`Switch to ${lng.label}`}
            >
              {lng.label}
            </button>
          ))}
        </div>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
        <div className="mobile-lang">
          {LANGS.map((lng) => (
            <button
              key={lng.code}
              className={`lang-btn ${lang === lng.code ? 'active' : ''}`}
              onClick={() => { setLang(lng.code); setOpen(false); }}
              aria-label={`Switch to ${lng.label}`}
            >
              {lng.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
