import React, { useState } from 'react';
import { Terminal, X, Copy, Check, ExternalLink } from 'lucide-react';

const PYTHON_CODE = `import pandas as pd
import numpy as np
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score

# 1. Load Online Shoppers Purchase Intention Dataset
df = pd.read_csv('online_shoppers_intention.csv')

# 2. Preprocess Categorical & Feature Engineering
df['Month'] = df['Month'].map({'Feb':2, 'Mar':3, 'May':5, 'June':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12})
df['VisitorType'] = df['VisitorType'].map({'New_Visitor': 0, 'Returning_Visitor': 1, 'Other': 2})
df['Weekend'] = df['Weekend'].astype(int)

# Target variable: Revenue (True/False)
X = df.drop('Revenue', axis=1)
y = df['Revenue'].astype(int)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 3. Train Deployed LightGBM Classifier
model = lgb.LGBMClassifier(
    n_estimators=150,
    learning_rate=0.05,
    num_leaves=31,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=[lgb.early_stopping(15)]
)

# 4. Evaluate Model
predictions = model.predict(X_test)
probs = model.predict_proba(X_test)[:, 1]

print(f"ROC AUC Score: {roc_auc_score(y_test, probs):.4f}")
print(classification_report(y_test, predictions))`;

export default function ModelSourcePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {/* Code Modal */}
      {isOpen && (
        <div className="modal-overlay active" onClick={() => setIsOpen(false)}>
          <div className="modal-container active" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <div className="modal-header-title">
                <Terminal className="w-5 h-5 text-primary" style={{ color: 'var(--error)' }} />
                <div>
                  <h3 className="modal-title">LightGBM Model Script</h3>
                  <span className="text-secondary" style={{ fontSize: '0.75rem' }}>online-shoppers-intention-lightgbm.py</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '0' }}>
              <div className="code-header">
                <span className="code-lang">Python (LightGBM)</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-icon" onClick={handleCopy} title="Copy Code">
                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a 
                    href="https://www.kaggle.com/code/mohitsharma7231/online-shoppers-intention-lightgbm-model" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-icon" 
                    title="Open on Kaggle"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <pre className="code-pre">
                <code>{PYTHON_CODE}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
