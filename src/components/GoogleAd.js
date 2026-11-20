import React, { useEffect } from 'react';
import './GoogleAd.css';

const GoogleAd = ({ slot, format = 'auto', responsive = true }) => {
  useEffect(() => {
    try {
      // Push ad to adsbygoogle
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('Error loading Google Ad:', e);
    }
  }, []);

  // In development mode, show placeholder
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="ad-placeholder" style={{
        backgroundColor: '#f0f0f0',
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        minHeight: format === 'horizontal' ? '90px' : '250px',
      }}>
        <p style={{ color: '#666', margin: 0 }}>
          📢 Google Ad Space (Slot: {slot})
        </p>
        <p style={{ color: '#999', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
          Ad will display in production mode
        </p>
      </div>
    );
  }

  return (
    <div className="google-ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-app-pub-8167320193401713"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default GoogleAd;
