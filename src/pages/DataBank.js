import React from 'react';
import './Page.css';
import GoogleAd from '../components/GoogleAd';

const DataBank = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">🗄️ All-in-One Data Bank</h1>
        <p className="page-subtitle">Centralized enterprise data management and analytics</p>

        <div className="content-section">
          <h2>Data Management Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>💾 Data Storage</h3>
              <p>Secure, scalable storage for all your enterprise data.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Analytics Engine</h3>
              <p>Powerful analytics to extract insights from your data.</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Security</h3>
              <p>Enterprise-grade security and compliance features.</p>
            </div>
            <div className="feature-card">
              <h3>🔄 Integration</h3>
              <p>Seamless integration with your existing systems.</p>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="content-ad">
          <GoogleAd slot="6666666666" format="horizontal" />
        </div>

        <div className="content-section">
          <h2>Data Statistics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">10TB+</div>
              <div className="metric-label">Data Stored</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">99.9%</div>
              <div className="metric-label">Uptime</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">5000+</div>
              <div className="metric-label">Daily Queries</div>
            </div>
          </div>
        </div>

        <div className="data-categories">
          <h2>Data Categories</h2>
          <div className="categories-grid">
            <div className="category-item">📈 Financial Data</div>
            <div className="category-item">👥 Customer Information</div>
            <div className="category-item">📊 Analytics Reports</div>
            <div className="category-item">💼 Project Data</div>
            <div className="category-item">📱 Marketing Metrics</div>
            <div className="category-item">🤝 Partnership Records</div>
          </div>
        </div>

        <div className="action-section">
          <button className="primary-button">Access Data Bank</button>
          <button className="secondary-button">Export Reports</button>
        </div>
      </div>
    </div>
  );
};

export default DataBank;
