import React from 'react';
import './Page.css';
import GoogleAd from '../components/GoogleAd';

const Home = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="hero-section">
          <h1 className="page-title">Welcome to Economic Storm Platform 🚀</h1>
          <p className="hero-subtitle">
            Your All-in-One Enterprise Solution for Economic Projects, Marketing, and Business Development
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Economic Projects</h3>
            <p>Comprehensive project management and tracking for all your economic initiatives.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Marketing Excellence</h3>
            <p>Advanced marketing campaigns, analytics, and content strategy tools.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Business Development</h3>
            <p>Strategic partnerships, market analysis, and growth initiatives management.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗄️</div>
            <h3>All-in-One Data Bank</h3>
            <p>Centralized database system for enterprise data management and analytics.</p>
          </div>
        </div>

        {/* Sidebar Ad Space - Customer Ads */}
        <div className="sidebar-ad">
          <GoogleAd slot="3803888958" format="rectangle" />
        </div>

        <div className="info-section">
          <h2>🎯 Platform Capabilities</h2>
          <ul className="capabilities-list">
            <li>✅ Scalable architecture for enterprise needs</li>
            <li>✅ Comprehensive data bank with advanced analytics</li>
            <li>✅ API-first design for seamless integrations</li>
            <li>✅ Security-focused implementation</li>
            <li>✅ AI-powered collaboration with GitHub Copilot</li>
            <li>✅ Automated workflows and intelligent issue management</li>
          </ul>
        </div>

        <div className="cta-section">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join thousands of enterprises using Economic Storm Platform to drive growth and innovation.</p>
          <button className="cta-button">Get Started Today</button>
        </div>

        {/* In-content Ad Space - For Ad */}
        <div className="content-ad">
          <GoogleAd slot="4790216305" format="horizontal" />
        </div>
      </div>
    </div>
  );
};

export default Home;
