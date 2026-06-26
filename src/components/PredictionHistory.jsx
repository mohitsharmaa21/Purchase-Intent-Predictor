import React from 'react';
import { History, Trash2, Download, Check, X } from 'lucide-react';

export default function PredictionHistory({ history, onClear, onDownloadCSV }) {
  return (
    <div className="premium-card history-section animate-fade-in-up" id="prediction-history">
      <div className="history-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="card-icon-box">
            <History className="w-5 h-5" />
          </div>
          <h3 className="card-title">Prediction Log History</h3>
        </div>

        {history.length > 0 && (
          <div className="history-actions">
            <button
              onClick={onDownloadCSV}
              className="btn btn-secondary btn-sm"
              title="Download full history log as CSV file"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
            <button
              onClick={onClear}
              className="btn btn-secondary btn-sm text-rose-500"
              title="Clear all session history"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        )}
      </div>

      <div className="table-responsive">
        <table className="history-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Month</th>
              <th>Visitor Type</th>
              <th>Raw Output</th>
              <th>Result Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-history-row">
                  No predictions recorded in this session yet. Run a prediction to see logs here.
                </td>
              </tr>
            ) : (
              history.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.timestamp}</td>
                  <td>{item.month}</td>
                  <td>{item.visitorType}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.prediction}</td>
                  <td>
                    {item.prediction === 1 ? (
                      <span className="badge-status badge-status-purchase">
                        <Check className="w-3.5 h-3.5" />
                        Likely to Purchase
                      </span>
                    ) : (
                      <span className="badge-status badge-status-no-purchase">
                        <X className="w-3.5 h-3.5" />
                        Not Likely
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
