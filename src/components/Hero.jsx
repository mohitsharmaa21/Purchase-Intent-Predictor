import React from 'react';
import { Brain, Zap, Database, Activity, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onStartClick }) {
  return (
    <section className="hero-section animate-fade-in-up">
      <div className="hero-layout-grid">
        
        {/* LEFT COLUMN: Texts & CTA */}
        <div className="hero-text-side">
          <div className="hero-badges-row" style={{ justifyContent: 'flex-start' }}>
            <span className="hero-badge">
              <Brain className="w-3.5 h-3.5 text-indigo-500" />
              AI Intent Scoring
            </span>
            <span className="hero-badge">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Real-time API
            </span>
          </div>

          <h1 className="hero-title" style={{ textAlign: 'left', maxWidth: 'none' }}>
            Purchase Intent Predictor
          </h1>
          
          <p className="hero-subtitle" style={{ textAlign: 'left', maxWidth: 'none' }}>
            Purchase Intent Prediction uses machine learning to analyze visitor behavior and estimate whether a customer is likely to complete a purchase.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button 
              onClick={onStartClick}
              className="btn btn-primary btn-ripple"
              style={{ padding: '1rem 2.5rem', fontSize: '1rem', width: 'auto', flex: 'none', borderRadius: '30px' }}
            >
              <Sparkles className="w-4 h-4" />
              Start Prediction
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            
            <a 
              href="#visual-insights" 
              className="btn btn-secondary"
              style={{ padding: '1rem 1.75rem', fontSize: '0.95rem', width: 'auto', flex: 'none', borderRadius: '30px' }}
            >
              Explore Analytics
            </a>
          </div>

          <div className="hero-footer-features" style={{ display: 'flex', gap: '1.25rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <Database className="w-4 h-4 text-emerald-500" /> Databricks Model Serving
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              <Activity className="w-4 h-4 text-rose-500" /> 34 Shopper Vector Fields
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Animated Shopper Neural Flow Graphic */}
        <div className="hero-graphic-side">
          <div className="neural-intent-visualizer">
            <svg viewBox="0 0 400 350" fill="none" className="neural-svg">
              {/* Connection Lines with animated dash array */}
              <path d="M 60,50 L 200,175" stroke="var(--border-color)" strokeWidth="2" />
              <path d="M 60,110 L 200,175" stroke="var(--border-color)" strokeWidth="2" />
              <path d="M 60,175 L 200,175" stroke="var(--border-color)" strokeWidth="2" />
              <path d="M 60,240 L 200,175" stroke="var(--border-color)" strokeWidth="2" />
              <path d="M 60,300 L 200,175" stroke="var(--border-color)" strokeWidth="2" />
              
              <path d="M 200,175 L 340,175" stroke="var(--primary)" strokeWidth="3" strokeDasharray="8 6" className="flow-dash-main" />

              {/* Animated signals flowing to Central Hub */}
              <circle r="3.5" fill="var(--primary)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 60,50 L 200,175" />
              </circle>
              <circle r="3.5" fill="var(--success)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 60,110 L 200,175" />
              </circle>
              <circle r="3.5" fill="var(--error)">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 60,175 L 200,175" />
              </circle>
              <circle r="3.5" fill="var(--primary)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 60,240 L 200,175" />
              </circle>
              <circle r="3.5" fill="var(--warning)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 60,300 L 200,175" />
              </circle>

              {/* Shopper Activity Nodes */}
              <g className="node-group" transform="translate(60, 50)">
                <circle r="18" fill="var(--bg-secondary)" stroke="var(--primary)" strokeWidth="1.5" className="node-circle" />
                <text y="3" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="700">PAGE VAL</text>
              </g>
              
              <g className="node-group" transform="translate(60, 110)">
                <circle r="18" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="1.5" className="node-circle" />
                <text y="3" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="700">DURATION</text>
              </g>

              <g className="node-group" transform="translate(60, 175)">
                <circle r="18" fill="var(--bg-secondary)" stroke="var(--error)" strokeWidth="1.5" className="node-circle" />
                <text y="3" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="700">BOUNCE</text>
              </g>

              <g className="node-group" transform="translate(60, 240)">
                <circle r="18" fill="var(--bg-secondary)" stroke="var(--primary)" strokeWidth="1.5" className="node-circle" />
                <text y="3" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="700">PRODUCT</text>
              </g>

              <g className="node-group" transform="translate(60, 300)">
                <circle r="18" fill="var(--bg-secondary)" stroke="var(--warning)" strokeWidth="1.5" className="node-circle" />
                <text y="3" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5" fontWeight="700">VISITOR</text>
              </g>

              {/* Central Hub Neural Intent node */}
              <g className="node-group hub-node" transform="translate(200, 175)">
                <circle r="34" fill="var(--bg-secondary)" stroke="var(--primary)" strokeWidth="3.5" className="hub-circle" />
                <circle r="34" fill="var(--primary-glow)" className="pulse-circle" />
                <text y="4" textAnchor="middle" fill="var(--primary)" fontSize="11" fontWeight="800">AI MODEL</text>
              </g>

              {/* Final Decision Node (Shopping Cart) */}
              <g className="node-group decision-node" transform="translate(340, 175)">
                <circle r="28" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="2.5" className="node-circle" />
                {/* SVG Shopping Cart Icon */}
                <path d="M-10,-10 L-6,-10 L-2,4 L8,4 L12,-6 L-4,-6" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="-1" cy="9" r="2.5" fill="var(--success)" />
                <circle cx="7" cy="9" r="2.5" fill="var(--success)" />
                <text y="-14" textAnchor="middle" fill="var(--success)" fontSize="8" fontWeight="800">PURCHASE INTENT</text>
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
