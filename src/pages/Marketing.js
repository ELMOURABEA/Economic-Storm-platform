import React from 'react';
import './Page.css';
import GoogleAd from '../components/GoogleAd';

const Marketing = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">📊 Marketing</h1>
        <p className="page-subtitle">Drive growth with advanced marketing campaigns and analytics</p>

        <div className="content-section">
          <h2>Marketing Tools</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📱 Campaign Management</h3>
              <p>Create, manage, and optimize marketing campaigns across all channels.</p>
            </div>
            <div className="feature-card">
              <h3>📝 Content Strategy</h3>
              <p>Plan and execute effective content marketing strategies.</p>
            </div>
            <div className="feature-card">
              <h3>🎯 Target Analytics</h3>
              <p>Understand your audience with deep analytics and insights.</p>
            </div>
            <div className="feature-card">
              <h3>🔗 Social Integration</h3>
              <p>Connect with your audience across all social media platforms.</p>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="content-ad">
          <GoogleAd slot="4444444444" format="horizontal" />
        </div>

        <div className="content-section">
          <h2>Campaign Performance</h2>
          <div className="performance-stats">
            <div className="stat-item">
              <span className="stat-icon">👁️</span>
              <div className="stat-info">
                <div className="stat-value">1.2M</div>
                <div className="stat-label">Total Impressions</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🖱️</span>
              <div className="stat-info">
                <div className="stat-value">45K</div>
                <div className="stat-label">Click-through Rate</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <div className="stat-info">
                <div className="stat-value">$150K</div>
                <div className="stat-label">Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="primary-button">Launch Campaign</button>
          <button className="secondary-button">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
