import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <Logo size={30} />
          <div className="brand-text">
            <span>Applied AI in Action</span>
            <span className="brand-sub">Configurator</span>
          </div>
        </div>
        <span className="navbar-badge">Admin</span>
      </div>
    </nav>
  );
}
