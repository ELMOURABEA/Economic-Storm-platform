import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EconomicProjects from './pages/EconomicProjects';
import Marketing from './pages/Marketing';
import BusinessDevelopment from './pages/BusinessDevelopment';
import DataBank from './pages/DataBank';
import GoogleAd from './components/GoogleAd';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1 className="logo">🚀 Economic Storm Platform</h1>
            <nav className="nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/economic-projects" className="nav-link">Economic Projects</Link>
              <Link to="/marketing" className="nav-link">Marketing</Link>
              <Link to="/business-development" className="nav-link">Business Development</Link>
              <Link to="/data-bank" className="nav-link">Data Bank</Link>
            </nav>
          </div>
        </header>

        {/* Top Advertisement Space - Banner Ad (eco-Storm) */}
        <div className="ad-container top-ad">
          <GoogleAd slot="1979671399" format="horizontal" />
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/economic-projects" element={<EconomicProjects />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/business-development" element={<BusinessDevelopment />} />
            <Route path="/data-bank" element={<DataBank />} />
          </Routes>
        </main>

        {/* Bottom Advertisement Space - Implant Advertising (alshameel) */}
        <div className="ad-container bottom-ad">
          <GoogleAd slot="9387388128" format="horizontal" />
        </div>

        <footer className="App-footer">
          <div className="container">
            <p>&copy; 2025 Economic Storm Platform. All rights reserved.</p>
            <p>Built with ❤️ and powered by GitHub Copilot Agent 🤖</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
