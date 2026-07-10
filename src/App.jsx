import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Tools from './pages/Tools';
import Solutions from './pages/Solutions';
import Blog from './pages/Blog';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Legal from './pages/Legal';
import Form from './pages/Form';

export default function App() {
  return (
    <LanguageProvider>
      <div className="page-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/applications" element={<Tools />} />
            {/* legacy path — keep old links working */}
            <Route path="/tools" element={<Navigate to="/applications" replace />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
