import React from 'react';
import { 
  BarChart3, TrendingDown, LogOut, DollarSign, 
  Compass, Clock, Layers, Sliders, Info, FileText 
} from 'lucide-react';

export default function VisualAnalytics({ rawInputs, features }) {
  
  // Format helpers
  const formatNum = (num, decimals = 2) => {
    if (num === undefined || isNaN(num)) return '0.00';
    return Number(num).toFixed(decimals);
  };

  const bounce = parseFloat(rawInputs.BounceRates) || 0;
  const exit = parseFloat(rawInputs.ExitRates) || 0;
  const pageValue = parseFloat(rawInputs.PageValues) || 0;
  const admin = parseInt(rawInputs.Administrative) || 0;
  const info = parseInt(rawInputs.Informational) || 0;
  const prod = parseInt(rawInputs.ProductRelated) || 0;

  // Compute a custom Conversion Affinity Score (0-100) based strictly on inputs
  const calculateAffinity = () => {
    // PageValues is the most critical: pageValue of 20+ yields 60 points max
    const pvScore = Math.min(60, (pageValue / 20) * 60);
    // Product count: 25+ pages yields 25 points max
    const prodScore = Math.min(25, (prod / 25) * 25);
    // Exit/Bounce friction: exit < 2% gives 15 points max
    const frictionScore = Math.max(0, 15 - (exit * 1.5));
    
    return Math.min(100, Math.max(0, Math.round(pvScore + prodScore + frictionScore)));
  };

  const affinityScore = calculateAffinity();

  // Circular gauge SVG computations
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (affinityScore / 100) * circumference;

  return (
    <div className="analytics-section animate-fade-in-up" id="visual-insights">
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart3 className="w-6 h-6 text-indigo-500" />
        Visual Session Insights
      </h2>

      <div className="analytics-grid">
        
        {/* CIRCULAR GAUGE CARD */}
        <div className="premium-card circular-gauge-container">
          <h3 className="card-title" style={{ fontSize: '1.05rem', textAlign: 'center' }}>Buyer Intent Score</h3>
          <p className="text-secondary text-center" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
            Calculated score of buying activity
          </p>

          <div className="gauge-svg-wrapper">
            <svg height="150" width="150">
              <circle
                className="gauge-bg"
                r={normalizedRadius}
                cx="75"
                cy="75"
              />
              <circle
                className="gauge-fill"
                stroke={affinityScore > 75 ? 'var(--success)' : affinityScore > 35 ? 'var(--primary)' : 'var(--error)'}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx="75"
                cy="75"
              />
            </svg>
            <div className="gauge-center-text">
              <span className="gauge-percentage">{affinityScore}%</span>
              <span className="gauge-label">Affinity</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            <span className="badge-status badge-status-purchase" style={{ fontSize: '0.65rem' }}>
              PV weight: {(pageValue > 0 ? (pageValue / 20 * 60) : 0).toFixed(0)}%
            </span>
            <span className="badge-status badge-status-no-purchase" style={{ fontSize: '0.65rem', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              Friction: {(exit * 1.5).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* PROGRESS METRICS LIST */}
        <div className="premium-card progress-list-card">
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>Friction & Navigation Ratios</h3>
          
          {/* Bounce Rate indicator */}
          <div className="indicator-row">
            <div className="indicator-info">
              <span>Bounce Rate</span>
              <span>{formatNum(bounce, 2)}%</span>
            </div>
            <div className="indicator-bar-bg">
              <div 
                className="indicator-bar-fill" 
                style={{ 
                  width: `${Math.min(100, bounce * 5)}%`, 
                  background: bounce > 5 ? 'var(--error)' : 'var(--success)' 
                }} 
              />
            </div>
          </div>

          {/* Exit Rate indicator */}
          <div className="indicator-row">
            <div className="indicator-info">
              <span>Exit Rate</span>
              <span>{formatNum(exit, 2)}%</span>
            </div>
            <div className="indicator-bar-bg">
              <div 
                className="indicator-bar-fill" 
                style={{ 
                  width: `${Math.min(100, exit * 5)}%`, 
                  background: exit > 6 ? 'var(--error)' : 'var(--success)' 
                }} 
              />
            </div>
          </div>

          {/* Product Focus Ratio */}
          <div className="indicator-row">
            <div className="indicator-info">
              <span>Product Focus Ratio</span>
              <span>{formatNum(features.ProductFocusRatio || 0, 3)}</span>
            </div>
            <div className="indicator-bar-bg">
              <div 
                className="indicator-bar-fill" 
                style={{ width: `${(features.ProductFocusRatio || 0) * 100}%`, background: 'var(--primary)' }} 
              />
            </div>
          </div>

          {/* Product Time Ratio */}
          <div className="indicator-row">
            <div className="indicator-info">
              <span>Product Time Ratio</span>
              <span>{formatNum(features.ProductTimeRatio || 0, 3)}</span>
            </div>
            <div className="indicator-bar-bg">
              <div 
                className="indicator-bar-fill" 
                style={{ width: `${(features.ProductTimeRatio || 0) * 100}%`, background: 'var(--primary)' }} 
              />
            </div>
          </div>
        </div>

        {/* METRICS CARDS PANEL */}
        <div className="analytics-metrics-panel">
          <div className="mini-metric-card">
            <div className="mini-metric-title">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Total Pages
            </div>
            <div className="mini-metric-value">{Math.round(features.TotalPages || 0)}</div>
          </div>

          <div className="mini-metric-card">
            <div className="mini-metric-title">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              Duration
            </div>
            <div className="mini-metric-value">{formatNum(features.TotalDuration, 0)}s</div>
          </div>

          <div className="mini-metric-card">
            <div className="mini-metric-title">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              Val / Prod
            </div>
            <div className="mini-metric-value">{formatNum(features.ValuePerProduct, 2)}</div>
          </div>

          <div className="mini-metric-card">
            <div className="mini-metric-title">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              Bounce-Exit
            </div>
            <div className="mini-metric-value" style={{ color: features.BounceExitDiff >= 0 ? 'var(--warning-text)' : 'var(--success)' }}>
              {formatNum(features.BounceExitDiff, 1)}%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
