import React from 'react';
import { Sigma } from 'lucide-react';

export default function FeatureSummary({ features }) {
  // Safe formatting helper
  const formatNum = (num, decimals = 2) => {
    if (num === undefined || isNaN(num)) return '0.00';
    return Number(num).toFixed(decimals);
  };

  const getFocusBadgeColor = (val) => {
    if (val > 0.8) return 'var(--primary)';
    if (val > 0.5) return 'var(--success)';
    return 'var(--text-secondary)';
  };

  return (
    <div className="premium-card">
      <div className="card-header-group">
        <div className="card-icon-box">
          <Sigma className="w-5 h-5" />
        </div>
        <h3 className="card-title">Feature Engineering Summary</h3>
      </div>

      <div className="features-summary-container">
        
        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Total Pages Visited = Administrative + Informational + ProductRelated">Total Pages</div>
          <div className="summary-metric-value">{Math.round(features.TotalPages || 0)}</div>
        </div>

        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Total Duration = Administrative Duration + Informational Duration + ProductRelated Duration">Total Duration</div>
          <div className="summary-metric-value">{formatNum(features.TotalDuration, 1)}s</div>
        </div>

        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Value Per Product = PageValues / (ProductRelated + 1)">Value Per Product</div>
          <div className="summary-metric-value" style={{ color: features.ValuePerProduct > 0 ? 'var(--success)' : 'inherit' }}>
            {formatNum(features.ValuePerProduct, 2)}
          </div>
        </div>

        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Product Focus Ratio = ProductRelated / (TotalPages + 1)">Product Focus Ratio</div>
          <div className="summary-metric-value" style={{ color: getFocusBadgeColor(features.ProductFocusRatio) }}>
            {formatNum(features.ProductFocusRatio, 3)}
          </div>
        </div>

        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Product Time Ratio = ProductRelated Duration / (TotalDuration + 1)">Product Time Ratio</div>
          <div className="summary-metric-value">
            {formatNum(features.ProductTimeRatio, 3)}
          </div>
        </div>

        <div className="summary-metric-card">
          <div className="summary-metric-label" title="Bounce Exit Difference = ExitRates - BounceRates">Bounce Exit Diff</div>
          <div className="summary-metric-value" style={{ color: features.BounceExitDiff >= 0 ? 'var(--warning-text)' : 'var(--success)' }}>
            {formatNum(features.BounceExitDiff, 2)}%
          </div>
        </div>

      </div>

      <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }} className="text-center">
        ⚡ Values above are calculated in real-time before transmission.
      </div>
    </div>
  );
}
