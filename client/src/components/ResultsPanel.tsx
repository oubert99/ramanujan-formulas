import React from 'react';
import { ApproximationResult } from '../types';

interface ResultsPanelProps {
  results: ApproximationResult[];
  loading: boolean;
  error: string | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, loading, error }) => {
  const formatNumber = (num: string, maxDigits: number = 15) => {
    const numValue = parseFloat(num);
    if (isNaN(numValue)) return num;
    
    if (Math.abs(numValue) < 1e-10) {
      return numValue.toExponential(3);
    }
    
    const str = numValue.toString();
    return str.length > maxDigits ? numValue.toPrecision(maxDigits) : str;
  };

  const getScoreColor = (score: number) => {
    if (score > 1000) return 'score-excellent';
    if (score > 100) return 'score-good';
    if (score > 10) return 'score-fair';
    return 'score-poor';
  };

  const getAccuracyBar = (accuracy: number) => {
    const maxAccuracy = 50;
    const percentage = Math.min((accuracy / maxAccuracy) * 100, 100);
    const filledChars = Math.floor(percentage / 5);
    const emptyChars = 20 - filledChars;
    
    return '█'.repeat(filledChars) + '░'.repeat(emptyChars);
  };

  if (loading) {
    return (
      <div className="results-panel">
        <div className="panel-header">
          <h2>
            ┌─────────────────────────────────────────┐<br/>
            │  📊 EVALUATION RESULTS                  │<br/>
            └─────────────────────────────────────────┘
          </h2>
        </div>
        <div className="loading-state">
          <div className="ascii-spinner">
            <pre>{`
    ⟳ EVALUATING APPROXIMATIONS...
    
    ┌─────────────────────────────┐
    │ Computing high-precision... │
    │ Calculating elegance...     │
    │ Ranking by quality...       │
    └─────────────────────────────┘
            `}</pre>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-panel">
        <div className="panel-header">
          <h2>
            ┌─────────────────────────────────────────┐<br/>
            │  ❌ ERROR                               │<br/>
            └─────────────────────────────────────────┘
          </h2>
        </div>
        <div className="error-state">
          <pre className="error-box">
{`╔═══════════════════════════════════════╗
║  ERROR OCCURRED                       ║
╠═══════════════════════════════════════╣
║  ${error.padEnd(37)}║
╚═══════════════════════════════════════╝`}
          </pre>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="results-panel">
        <div className="panel-header">
          <h2>
            ┌─────────────────────────────────────────┐<br/>
            │  📊 EVALUATION RESULTS                  │<br/>
            └─────────────────────────────────────────┘
          </h2>
        </div>
        <div className="empty-state">
          <pre className="ascii-art">
{`
    No results yet...
    
    ┌─────────────────────────────┐
    │  Input JSON approximations  │
    │  and click EVALUATE to      │
    │  see ranked results here!   │
    └─────────────────────────────┘
    
         🧮 → 🤖 → 📈
`}
          </pre>
        </div>
      </div>
    );
  }

  const hasNovelty = results.some(r => 
    r.aiEvaluation?.novelty?.toLowerCase().includes('yes') || 
    r.aiEvaluation?.novelty?.toLowerCase().includes('high') ||
    r.aiEvaluation?.novelty?.toLowerCase().includes('novel')
  );

  return (
    <div className="results-panel">
      <div className="panel-header">
        <h2>
          ┌─────────────────────────────────────────┐<br/>
          │  📊 EVALUATION RESULTS ({results.length.toString().padStart(2, '0')})           │<br/>
          └─────────────────────────────────────────┘
        </h2>
      </div>

      <div className="results-summary">
        <div className="summary-stats">
          <span>🏆 Best Score: {formatNumber(results[0]?.quality.score.toString() || '0', 8)}</span>
          <span>🎯 Highest Accuracy: {Math.max(...results.map(r => r.quality.accuracy))} digits</span>
        </div>
      </div>

      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <div className="result-header">
              <div className="rank">#{index + 1}</div>
              <div className="target-info">
                <strong>{result.targetName}</strong>
                {result.description && <span className="description">({result.description})</span>}
              </div>
              <div className={`score ${getScoreColor(result.quality.score)}`}>
                Score: {formatNumber(result.quality.score.toString(), 8)}
              </div>
            </div>

            <div className="expression-display">
              <div className="expression-label">Expression:</div>
              <code className="expression">{result.expression}</code>
            </div>

            <div className="values-comparison">
              <div className="value-row">
                <span className="label">Target:</span>
                <code className="value">{formatNumber(result.target)}</code>
              </div>
              <div className="value-row">
                <span className="label">Computed:</span>
                <code className="value">{formatNumber(result.computed)}</code>
              </div>
            </div>

            <div className="quality-metrics">
              <div className="metric-row">
                <span className="metric-label">Absolute Error:</span>
                <code className="metric-value">{formatNumber(result.quality.absoluteError)}</code>
              </div>
              <div className="metric-row">
                <span className="metric-label">Relative Error:</span>
                <code className="metric-value">{formatNumber(result.quality.relativeError)}</code>
              </div>
              <div className="metric-row">
                <span className="metric-label">Complexity:</span>
                <span className="metric-value">{result.quality.complexity}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Accuracy:</span>
                <span className="metric-value">{result.quality.accuracy} digits</span>
              </div>
            </div>

            <div className="accuracy-bar">
              <div className="bar-label">Accuracy:</div>
              <div className="bar">
                <code>{getAccuracyBar(result.quality.accuracy)}</code>
                <span className="bar-text">{result.quality.accuracy}/50</span>
              </div>
            </div>

            <div className="elegance-score">
              <span className="elegance-label">Elegance Score:</span>
              <code className="elegance-value">{formatNumber(result.quality.eleganceScore)}</code>
            </div>

            {result.aiEvaluation && (
              <div className="ai-evaluation">
                <div className="ai-header">
                  <h4>🤖 AI EVALUATION</h4>
                </div>
                <div className="ai-metrics">
                  <div className="ai-metric">
                    <span className="ai-label">Accuracy:</span>
                    <span className="ai-value">{result.aiEvaluation.accuracy}</span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Efficiency:</span>
                    <span className="ai-value">{result.aiEvaluation.efficiency}</span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Novelty:</span>
                    <span className="ai-value">{result.aiEvaluation.novelty}</span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Stability:</span>
                    <span className="ai-value">{result.aiEvaluation.stability}</span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Generality:</span>
                    <span className="ai-value">{result.aiEvaluation.generality}</span>
                  </div>
                  <div className="ai-recommendation">
                    <span className="ai-label">Recommendation:</span>
                    <span className={`ai-value recommendation-${result.aiEvaluation.recommendation.toLowerCase().replace(/\s+/g, '-')}`}>
                      {result.aiEvaluation.recommendation}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {result.evaluationError && (
              <div className="ai-evaluation-error">
                <div className="ai-error-header">
                  <h4>⚠️ AI EVALUATION ERROR</h4>
                </div>
                <div className="ai-error-message">
                  {result.evaluationError}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {results.some(r => r.aiEvaluation) && (
        <div className="novelty-section">
          <div className="panel-header">
            <h2>
              ┌─────────────────────────────────────────┐<br/>
              │  🧬 NOVELTY DETECTION                   │<br/>
              └─────────────────────────────────────────┘
            </h2>
          </div>
          
          <div className="novelty-result">
            <pre className="ascii-novelty">
              {hasNovelty ? `
    ██╗   ██╗███████╗███████╗
    ╚██╗ ██╔╝██╔════╝██╔════╝
     ╚████╔╝ █████╗  ███████╗
      ╚██╔╝  ██╔══╝  ╚════██║
       ██║   ███████╗███████║
       ╚═╝   ╚══════╝╚══════╝
              ` : `
    ███╗   ██╗ ██████╗ 
    ████╗  ██║██╔═══██╗
    ██╔██╗ ██║██║   ██║
    ██║╚██╗██║██║   ██║
    ██║ ╚████║╚██████╔╝
    ╚═╝  ╚═══╝ ╚═════╝ 
              `}
            </pre>
            <div className="novelty-message">
              {hasNovelty 
                ? "✨ NEW MATHEMATICAL DISCOVERY DETECTED! ✨" 
                : "No novel approximations found in this batch."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
