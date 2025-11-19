import React, { useState } from 'react';
import { ApproximationInput } from '../types';

interface InputPanelProps {
  onEvaluate: (approximations: ApproximationInput[]) => void;
  loading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onEvaluate, loading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  const defaultJson = `[
  {
    "expression": "22/7",
    "target": "3.141592653589793",
    "targetName": "π",
    "description": "Classic rational approximation"
  },
  {
    "expression": "355/113",
    "target": "3.141592653589793",
    "targetName": "π", 
    "description": "Milü's approximation"
  },
  {
    "expression": "(1 + sqrt(5))/2",
    "target": "1.618033988749895",
    "targetName": "φ",
    "description": "Golden ratio exact formula"
  }
]`;

  const handleInputChange = (value: string) => {
    setJsonInput(value);
    setParseError(null);
  };

  const handleEvaluate = () => {
    try {
      const approximations = JSON.parse(jsonInput || defaultJson);
      
      if (!Array.isArray(approximations)) {
        setParseError('Input must be an array of approximations');
        return;
      }

      // Validate each approximation
      for (let i = 0; i < approximations.length; i++) {
        const approx = approximations[i];
        // Support both target and value fields
        const hasTarget = approx.target || approx.value || approx.computed || approx.result;
        
        if (!approx.expression || !hasTarget) {
          setParseError(`Approximation ${i + 1}: Missing required fields 'expression' and 'target' (or 'value')`);
          return;
        }
      }

      onEvaluate(approximations);
      setParseError(null);
    } catch (error) {
      setParseError('Invalid JSON format');
    }
  };

  const handleLoadDefault = () => {
    setJsonInput(defaultJson);
    setParseError(null);
  };

  const handleClear = () => {
    setJsonInput('');
    setParseError(null);
  };

  return (
    <div className="input-panel">
      <div className="panel-header">
        <h2>
          ┌─────────────────────────────────────────┐<br/>
          │  📝 JSON INPUT PANEL                    │<br/>
          └─────────────────────────────────────────┘
        </h2>
      </div>

      <div className="json-input-section">
        <div className="input-controls">
          <button 
            className="btn btn-secondary"
            onClick={handleLoadDefault}
            disabled={loading}
          >
            📋 Load Default
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={loading}
          >
            🗑️ Clear
          </button>
        </div>

        <textarea
          className="json-textarea"
          value={jsonInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={defaultJson}
          rows={15}
          disabled={loading}
        />

        {parseError && (
          <div className="error-message">
            ❌ {parseError}
          </div>
        )}

        <div className="json-format-help">
          <details>
            <summary>📖 JSON Format Help</summary>
            <pre className="format-example">{`
Required fields:
  • expression: Mathematical expression (string)
  • target: Target value to approximate (string)

Optional fields:
  • targetName: Name of the constant (e.g., "π")
  • description: Description of the approximation

Supported functions:
  • sqrt(), log(), ln(), exp()
  • sin(), cos(), tan(), asin(), acos(), atan()
  • Constants: pi, e, phi, gamma, sqrt2, sqrt3, ln2

Example:
{
  "expression": "sqrt(2 + sqrt(2))",
  "target": "1.847759065022574",
  "targetName": "nested radical",
  "description": "Nested square root approximation"
}
            `}</pre>
          </details>
        </div>

        <button 
          className={`btn btn-primary evaluate-btn ${loading ? 'loading' : ''}`}
          onClick={handleEvaluate}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner">⟳</span> Evaluating...
            </>
          ) : (
            <>
              🚀 EVALUATE APPROXIMATIONS
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
