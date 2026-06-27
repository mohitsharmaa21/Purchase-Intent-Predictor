import React, { useState } from 'react';
import { Terminal, X, ExternalLink } from 'lucide-react';

const KAGGLE_URL = "https://www.kaggle.com/code/mohitsharma7231/online-shoppers-intention-lightgbm-model#Model-Evaluation-&-Results";

export default function ModelSourcePopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = () => {
    window.open(KAGGLE_URL, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Blinking clickable popup bar just above the footer */}
      <div className="model-popup-bar" onClick={() => setIsOpen(true)}>
        <div className="popup-bar-content">
          <div className="popup-pulse-dot" />
          <span className="popup-text">
            <strong>ML Pipeline:</strong> LightGBM Classifier model script & hyperparameters are loaded and validated.
          </span>
        </div>
        <button className="popup-btn" onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}>
          <Terminal className="w-4 h-4 mr-1.5" />
          Preview Model Source Code
        </button>
      </div>

      {/* Redirect Modal */}
      {isOpen && (
        <div className="modal-overlay active" onClick={() => setIsOpen(false)}>
          <div className="modal-container active" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div className="modal-header-title">
                <Terminal className="w-5 h-5 text-primary" style={{ color: 'var(--error)' }} />
                <div>
                  <h3 className="modal-title">Model Source Code Preview</h3>
                  <span className="text-secondary" style={{ fontSize: '0.75rem' }}>LightGBM Pipeline Details</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.75rem', lineHeight: '1.6' }}>
                Click on the Kaggle button below to preview the complete model source code, preprocessing pipeline, and model evaluation results.
              </p>
              
              <button 
                className="popup-btn" 
                onClick={handleRedirect}
                style={{ 
                  padding: '0.85rem 2rem', 
                  fontSize: '0.95rem', 
                  width: '100%', 
                  justifyContent: 'center', 
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #008bb9 0%, #20beff 100%)',
                  boxShadow: '0 4px 15px rgba(32, 190, 255, 0.3)'
                }}
              >
                <ExternalLink className="w-4.5 h-4.5 mr-2" />
                Preview Source Code on Kaggle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
