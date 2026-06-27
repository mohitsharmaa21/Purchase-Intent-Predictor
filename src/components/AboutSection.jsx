import React, { useState, useEffect } from 'react';
import { Target, ShieldAlert } from 'lucide-react';

const SHUFFLE_CHARS = "01$#@%&?_X*+";

function ShuffleText({ text, speed = 30, delay = 200 }) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timer;
    let iteration = 0;
    const targetLength = text.length;
    
    const run = () => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= targetLength) {
        clearInterval(timer);
      }
      
      iteration += 0.5; // Speed of letter resolution
    };

    const startTimeout = setTimeout(() => {
      timer = setInterval(run, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, [text, speed, delay]);

  return <span>{displayText}</span>;
}

export default function AboutSection() {
  return (
    <div className="premium-card about-section-card animate-fade-in-up" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
      <div className="card-header-group">
        <div className="card-icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', color: 'var(--error)' }}>
          <Target className="w-5 h-5" />
        </div>
        <h3 className="card-title">Our Goal & Model Capabilities</h3>
      </div>
      
      <div className="about-content">
        <h4 className="about-headline">
          <ShuffleText text="Predicting Shopper Actions via Machine Learning Neurons" />
        </h4>
        <p className="about-body" style={{ marginTop: '1rem', fontSize: '0.975rem', lineHeight: '1.75' }}>
          Our predictive intelligence system utilizes machine learning to analyze visitor behavior and estimate whether a customer is likely to complete a purchase. By processing <strong>34 session indicators</strong>—specifically <strong>Page Values, Exit Rates, session durations, and page category sequences</strong>—our deployed classifier evaluates user actions in real-time. This allows digital stores to dynamically launch targeted incentives, personalize journeys, and proactively reduce cart abandonment.
        </p>
      </div>
    </div>
  );
}
