import React, { useState, useMemo } from 'react';
import { calculateFeatures } from './utils/featureEngineering';
import { validateInputs } from './utils/validation';
import { SAMPLE_VISITORS } from './utils/samples';
import { predictPurchaseIntent } from './services/api';

import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import FeatureSummary from './components/FeatureSummary';
import PredictionResult from './components/PredictionResult';
import VisualAnalytics from './components/VisualAnalytics';
import PredictionHistory from './components/PredictionHistory';
import ThemeToggle from './components/ThemeToggle';

import { BrainCircuit, Cpu, Layers, ShoppingCart, MousePointer, BarChart2, Brain, Database, Sparkles } from 'lucide-react';
import './styles/App.css';

const DEFAULT_INPUTS = {
  Administrative: 0,
  Administrative_Duration: 0,
  Informational: 0,
  Informational_Duration: 0,
  ProductRelated: 0,
  ProductRelated_Duration: 0,
  BounceRates: 0,
  ExitRates: 0,
  PageValues: 0,
  SpecialDay: 0,
  OperatingSystems: 1,
  Browser: 1,
  Region: 1,
  TrafficType: 1,
  Weekend: false,
  Month: "Mar",
  VisitorType: "Returning Visitor"
};

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [errors, setErrors] = useState({});
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [shakeForm, setShakeForm] = useState(false);

  // Compute engineered features live based on input values
  const engineeredFeatures = useMemo(() => {
    return calculateFeatures(inputs);
  }, [inputs]);

  // Handle standard number/text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => {
      const updated = { ...prev, [name]: value };
      
      // If errors existed on this field, clear them dynamically on change
      if (errors[name]) {
        setErrors(err => {
          const clone = { ...err };
          delete clone[name];
          return clone;
        });
      }
      return updated;
    });
  };

  // Handle toggles (Weekend)
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setInputs(prev => ({ ...prev, [name]: checked }));
  };

  // Handle dropdowns (Month, VisitorType)
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Fill in Sample Visitor (Balanced Profile)
  const handleTrySample = () => {
    const sample = SAMPLE_VISITORS[Math.floor(Math.random() * SAMPLE_VISITORS.length)];
    setInputs(sample);
    setErrors({});
    setPredictionResult(null);
  };

  // Reset form to default values
  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setErrors({});
    setPredictionResult(null);
  };

  // Submit and run Prediction Model Serving Flow
  const handlePredict = async () => {
    const validation = validateInputs(inputs);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setShakeForm(true);
      // Reset shake state after animation ends
      setTimeout(() => setShakeForm(false), 500);
      return;
    }

    setErrors({});
    setIsPredicting(true);

    try {
      const result = await predictPurchaseIntent(inputs, engineeredFeatures);
      setPredictionResult(result);
      
      // Format timestamps for logs display
      const timeStr = new Date().toLocaleTimeString();
      const dateStr = new Date().toLocaleDateString();
      
      // Add current session history entry
      const logEntry = {
        timestamp: `${dateStr} ${timeStr}`,
        month: inputs.Month,
        visitorType: inputs.VisitorType,
        prediction: result.prediction,
        isMock: result.isMock
      };
      
      setHistory(prev => [logEntry, ...prev]);

      // Scroll smoothly to prediction outcomes card
      setTimeout(() => {
        const el = document.getElementById('prediction-result');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      alert(`Model serving request failed. Detail: ${err.message}`);
    } finally {
      setIsPredicting(false);
    }
  };

  // Export Inputs as JSON
  const handleExportInputs = () => {
    const payload = {
      rawInputs: inputs,
      engineeredFeatures,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `purchase_intent_inputs_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download Latest Prediction Result
  const handleDownloadPrediction = () => {
    if (!predictionResult) return;
    const blob = new Blob([JSON.stringify({ ...predictionResult, inputs }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `purchase_intent_prediction_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Clear log history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear session logs?")) {
      setHistory([]);
    }
  };

  // Export history to CSV
  const handleExportCSV = () => {
    if (history.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Timestamp,Month,Visitor Type,Raw Model Output,Status\n";
    
    history.forEach(item => {
      const statusText = item.prediction === 1 ? "Likely to Purchase" : "Not Likely to Purchase";
      const row = `"${item.timestamp}","${item.month}","${item.visitorType}",${item.prediction},"${statusText}"`;
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `prediction_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('prediction-form-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-container">
      {/* WAVE MESH BACKDROP */}
      <div className="wave-backdrop-container">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purple-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blue-grad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="flowing-wave wave-1" d="M -100 300 C 200 450, 400 150, 700 300 C 1000 450, 1200 150, 1600 300 L 1600 -100 L -100 -100 Z" />
          <path className="flowing-wave wave-2" d="M -100 500 C 300 350, 500 650, 900 500 C 1300 350, 1500 650, 1900 500 L 1900 900 L -100 900 Z" />
          <path className="flowing-wave wave-3" d="M -200 420 C 100 220, 600 620, 1000 420 C 1400 220, 1600 620, 2000 420 L 2000 900 L -200 900 Z" />
        </svg>
      </div>

      {/* FLOATING DECORATIONS */}
      <div className="floating-decorations">
        <ShoppingCart className="float-icon fi-1 w-8 h-8" />
        <MousePointer className="float-icon fi-2 w-6 h-6" />
        <Layers className="float-icon fi-3 w-7 h-7" />
        <BarChart2 className="float-icon fi-4 w-9 h-9" />
        <Brain className="float-icon fi-5 w-8 h-8" />
        <Database className="float-icon fi-6 w-7 h-7" />
        <Sparkles className="float-icon fi-7 w-6 h-6" />
      </div>

      {/* NAVBAR */}
      <header className="app-header glassmorphism">
        <div className="header-container">
          <div className="logo-group">
            <BrainCircuit className="logo-icon w-6 h-6 animate-pulse" />
            <span>Purchase Intent Predictor</span>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="main-content">
        {/* HERO SECTION */}
        <Hero onStartClick={handleScrollToForm} />

        <div className="dashboard-grid" id="prediction-form-root" style={{ scrollMarginTop: '90px' }}>
          
          {/* LEFT: Form Inputs */}
          <div className="left-column">
            <PredictionForm
              inputs={inputs}
              errors={errors}
              onChange={handleInputChange}
              onToggle={handleToggleChange}
              onSelectChange={handleSelectChange}
              onTrySample={handleTrySample}
              onReset={handleReset}
              onPredict={handlePredict}
              onExportInputs={handleExportInputs}
              onDownloadPrediction={handleDownloadPrediction}
              isPredicting={isPredicting}
              hasResult={!!predictionResult}
              shakeForm={shakeForm}
            />
          </div>

          {/* RIGHT: Live engineered updates */}
          <div className="right-column" style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <FeatureSummary features={engineeredFeatures} />
            
            {/* Display Loader when API is pending */}
            {isPredicting && (
              <div className="premium-card">
                <div className="ai-loader-container">
                  <div className="ai-pulse-ring" />
                  <span className="ai-loader-text">Predicting using AI Model...</span>
                  <p className="text-secondary text-center" style={{ fontSize: '0.75rem' }}>
                    Calling Databricks Model Serving Endpoint
                  </p>
                </div>
              </div>
            )}

            {/* Display Prediction result details */}
            {predictionResult && !isPredicting && (
              <PredictionResult result={predictionResult} rawInputs={inputs} />
            )}
          </div>

        </div>

        {/* BOTTOM: Dynamic Metrics Analytics Dashboard & Prediction Logs */}
        <VisualAnalytics rawInputs={inputs} features={engineeredFeatures} />
        
        <PredictionHistory
          history={history}
          onClear={handleClearHistory}
          onDownloadCSV={handleExportCSV}
        />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-badge-row">
            <span className="footer-badge">Built for ML Deployment Learning</span>
            <span className="footer-badge">Powered by Databricks</span>
            <span className="footer-badge">Machine Learning</span>
            <span className="footer-badge">AI Prediction</span>
          </div>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>Designed by Mohit Sharma</span>
            <span style={{ color: 'var(--border-color)', userSelect: 'none' }}>|</span>
            <a 
              href="https://www.linkedin.com/in/mohit-sharma2005" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: 500 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              LinkedIn
            </a>
            <span style={{ color: 'var(--border-color)', userSelect: 'none' }}>|</span>
            <a 
              href="https://github.com/mohitsharmaa21" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)', fontWeight: 500 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
