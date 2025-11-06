import React from 'react';
import './Page.css';
import GoogleAd from '../components/GoogleAd';

const EconomicProjects = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">💼 Economic Projects</h1>
        <p className="page-subtitle">Manage and track your economic initiatives with powerful tools</p>

        <div className="content-section">
          <h2>Project Management Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📋 Project Planning</h3>
              <p>Strategic planning and roadmap creation for economic projects.</p>
            </div>
            <div className="feature-card">
              <h3>📈 Financial Tracking</h3>
              <p>Real-time budget monitoring and financial performance analysis.</p>
            </div>
            <div className="feature-card">
              <h3>⏱️ Timeline Management</h3>
              <p>Milestone tracking and deadline management tools.</p>
            </div>
            <div className="feature-card">
              <h3>👥 Team Collaboration</h3>
              <p>Collaborate with team members and stakeholders effectively.</p>
            </div>
          </div>
        </div>

        {/* Mid-page Ad */}
        <div className="content-ad">
          <GoogleAd slot="3333333333" format="horizontal" />
        </div>

        <div className="content-section">
          <h2>Success Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">500+</div>
              <div className="metric-label">Active Projects</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">98%</div>
              <div className="metric-label">Success Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">$2M+</div>
              <div className="metric-label">Revenue Generated</div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="primary-button">Create New Project</button>
          <button className="secondary-button">View All Projects</button>
        </div>
      </div>
    </div>
  );
};

export default EconomicProjects;
