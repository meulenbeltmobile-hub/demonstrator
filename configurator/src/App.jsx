import Navbar from './components/Navbar';
import Configurator from './pages/Configurator';

export default function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">
        <Configurator />
      </main>
    </div>
  );
}
