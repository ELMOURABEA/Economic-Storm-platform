import React from 'react';
import './Page.css';
import GoogleAd from '../components/GoogleAd';

const BusinessDevelopment = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">🤝 Business Development</h1>
        <p className="page-subtitle">Build strategic partnerships and drive business growth</p>

        <div className="content-section">
          <h2>Growth Initiatives</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🤝 Partnership Management</h3>
              <p>Track and manage strategic business partnerships effectively.</p>
            </div>
            <div className="feature-card">
              <h3>🔍 Market Analysis</h3>
              <p>Deep insights into market trends and opportunities.</p>
            </div>
            <div className="feature-card">
              <h3>📞 Contact Management</h3>
              <p>Organize and nurture your business relationships.</p>
            </div>
            <div className="feature-card">
              <h3>💼 Deal Pipeline</h3>
              <p>Track opportunities from lead to close.</p>
            </div>
          </div>
        </div>

        {/* Ad Space - Banner (reuse) */}
        <div className="content-ad">
          <GoogleAd slot="1979671399" format="horizontal" />
        </div>

        <div className="content-section">
          <h2>Partnership Opportunities</h2>
          <div className="opportunities-list">
            <div className="opportunity-card">
              <h3>Technology Partner</h3>
              <p>Integration opportunities with leading tech platforms</p>
              <span className="opportunity-status active">Active</span>
            </div>
            <div className="opportunity-card">
              <h3>Strategic Alliance</h3>
              <p>Joint venture possibilities in emerging markets</p>
              <span className="opportunity-status pending">In Progress</span>
            </div>
            <div className="opportunity-card">
              <h3>Distribution Network</h3>
              <p>Expand reach through partnership channels</p>
              <span className="opportunity-status active">Active</span>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="primary-button">Add Partnership</button>
          <button className="secondary-button">View Pipeline</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopment;
