import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, Brain } from 'lucide-react';

export default function PredictionResult({ result, rawInputs }) {
  const { prediction, isMock } = result;

  useEffect(() => {
    if (prediction === 1) {
      // Trigger a premium confetti spray
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [prediction]);

  // Generate dynamic AI insight text based on inputs
  const getAIInsight = () => {
    const pageVal = parseFloat(rawInputs.PageValues) || 0;
    const prodCount = parseInt(rawInputs.ProductRelated) || 0;
    const prodTime = parseFloat(rawInputs.ProductRelated_Duration) || 0;
    const exitRate = parseFloat(rawInputs.ExitRates) || 0;
    const bounceRate = parseFloat(rawInputs.BounceRates) || 0;

    if (prediction === 1) {
      if (pageVal > 10) {
        return `High Page Value (${pageVal.toFixed(1)}) indicating intense buying activity. Shopper visited multiple high-value transaction-related pages.`;
      }
      return `Strong Product Related activity (${prodCount} pages, ${Math.round(prodTime)}s duration) and low exit behavior suggest stable interest and high likelihood of conversion.`;
    } else {
      if (exitRate > 8 || bounceRate > 5) {
        return `High exit rate (${exitRate.toFixed(1)}%) and bounce rate (${bounceRate.toFixed(1)}%) indicate critical friction. Shopper is disengaging and bouncing without exploration.`;
      }
      return `Low overall product interaction and minimal page value indicate a low-intent browsing or window-shopping session.`;
    }
  };

  return (
    <div id="prediction-result" className="result-section animate-fade-in-up">
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Brain className="w-6 h-6 text-indigo-500" />
        Prediction Outcome
      </h2>

      <div className="result-card-container">
        
        {/* INTENT CARD */}
        {prediction === 1 ? (
          <div className="premium-card intent-card intent-glow-success">
            <span className="intent-badge intent-badge-high">
              High Purchase Intent
            </span>
            <div className="intent-icon-outer intent-icon-high" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="intent-status-title text-emerald-500">Likely to Purchase</h4>
            <p className="intent-explanation">
              The AI model has determined this visitor shows strong buying signals. High probability of checking out during this session.
            </p>
            <div className="intent-raw-box">
              Raw Model Output: <span className="intent-raw-value">1</span>
            </div>
            {isMock && !result.corsFallback && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>* Local Simulation Mode</div>
            )}
          </div>
        ) : (
          <div className="premium-card intent-card intent-glow-error">
            <span className="intent-badge intent-badge-low">
              Low Purchase Intent
            </span>
            <div className="intent-icon-outer intent-icon-low" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}>
              <XCircle className="w-10 h-10" />
            </div>
            <h4 className="intent-status-title text-rose-500">Not Likely to Purchase</h4>
            <p className="intent-explanation">
              The shopper is showing typical browsing patterns without conversion markers. Minimal transaction likelihood detected.
            </p>
            <div className="intent-raw-box">
              Raw Model Output: <span className="intent-raw-value">0</span>
            </div>
            {isMock && !result.corsFallback && (
              <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>* Local Simulation Mode</div>
            )}
          </div>
        )}

        {/* AI INSIGHTS CARD */}
        <div className="premium-card ai-insights-panel">
          <div>
            <div className="insight-header">
              <Sparkles className="w-5 h-5 insight-sparkle-icon" />
              <span>Real-Time AI Insight</span>
            </div>
            <blockquote className="insight-text-quote">
              "{getAIInsight()}"
            </blockquote>
            <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
              Our models look at features like Page Values and Exit Rates to evaluate the exact probability boundary. Higher interaction rates and session duration correspond to immediate conversion.
            </p>
          </div>

          <div className="insights-metrics-pills" style={{ marginTop: '1.5rem' }}>
            <span className="insight-pill">Page Value: {parseFloat(rawInputs.PageValues || 0).toFixed(1)}</span>
            <span className="insight-pill">Bounce Rate: {parseFloat(rawInputs.BounceRates || 0).toFixed(1)}%</span>
            <span className="insight-pill">Exit Rate: {parseFloat(rawInputs.ExitRates || 0).toFixed(1)}%</span>
            <span className="insight-pill">Product Pages: {parseInt(rawInputs.ProductRelated || 0)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
