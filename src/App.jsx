import { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import backgroundImage from './assets/background.png';
import './App.css';

function App() {
  /* Track card visibility for fade-in animation */
  const [isVisible, setIsVisible] = useState(false);

  /* Trigger fade-in after initial render */
  useState(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  });

  return (
    <main className="login-page" role="main">
      {/* Full-screen background — single continuous artwork */}
      <div
        className="login-page__background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* Dark overlay for contrast */}
      <div className="login-page__overlay" aria-hidden="true" />

      {/* Centered login card */}
      <section
        className={`login-card ${isVisible ? 'login-card--visible' : ''}`}
        aria-label="Login section"
      >
        {/* Pass background URL so left panel can mirror it seamlessly */}
        <LeftPanel backgroundUrl={backgroundImage} />
        <RightPanel />
      </section>
    </main>
  );
}

export default App;
