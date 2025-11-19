import React, { useState, useEffect } from 'react';
import { ExampleApproximation, ApproximationInput } from '../types';

interface ExamplesPanelProps {
  onLoadExample: (example: ApproximationInput) => void;
}

const ExamplesPanel: React.FC<ExamplesPanelProps> = ({ onLoadExample }) => {
  const [examples, setExamples] = useState<ExampleApproximation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExamples();
  }, []);

  const fetchExamples = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/examples');
      const data = await response.json();
      setExamples(data.examples || []);
    } catch (error) {
      console.error('Failed to fetch examples:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadExample = (example: ExampleApproximation) => {
    const jsonExample = JSON.stringify([{
      expression: example.expression,
      target: example.target,
      targetName: example.targetName,
      description: example.description
    }], null, 2);

    // Copy to clipboard
    navigator.clipboard.writeText(jsonExample).then(() => {
      console.log('Example copied to clipboard');
    }).catch(() => {
      console.log('Failed to copy to clipboard');
    });
  };

  const generateRandomExamples = () => {
    const randomExamples = [
      {
        expression: "sqrt(2 + sqrt(2 + sqrt(2)))",
        target: "1.847759065022574",
        targetName: "nested radical",
        description: "Infinite nested radical approximation"
      },
      {
        expression: "exp(pi * sqrt(163))",
        target: "262537412640768744",
        targetName: "Ramanujan constant",
        description: "Famous near-integer"
      },
      {
        expression: "pi^2/6",
        target: "1.644934066848226",
        targetName: "ζ(2)",
        description: "Basel problem solution"
      },
      {
        expression: "4 * (1 - 1/3 + 1/5 - 1/7 + 1/9)",
        target: "3.141592653589793",
        targetName: "π",
        description: "Leibniz series partial sum"
      }
    ];

    const shuffled = randomExamples.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    
    const jsonExample = JSON.stringify(selected, null, 2);
    navigator.clipboard.writeText(jsonExample);
  };

  return (
    <div className="examples-panel">
      <div className="panel-header">
        <h3>
          ┌─────────────────────────────────────────┐<br/>
          │  💡 EXAMPLES & INSPIRATION              │<br/>
          └─────────────────────────────────────────┘
        </h3>
      </div>

      <div className="examples-content">
        <div className="examples-controls">
          <button 
            className="btn btn-accent"
            onClick={generateRandomExamples}
          >
            🎲 Random Examples → Clipboard
          </button>
        </div>

        {loading ? (
          <div className="examples-loading">
            <span className="spinner">⟳</span> Loading examples...
          </div>
        ) : (
          <div className="examples-list">
            {examples.map((example, index) => (
              <div key={index} className="example-item">
                <div className="example-header">
                  <strong className="example-target">{example.targetName}</strong>
                  <button 
                    className="btn btn-small"
                    onClick={() => handleLoadExample(example)}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
                
                <div className="example-expression">
                  <code>{example.expression}</code>
                </div>
                
                <div className="example-description">
                  {example.description}
                </div>
                
                <div className="example-target-value">
                  Target: <code>{example.target.substring(0, 20)}...</code>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="ai-model-suggestions">
          <details>
            <summary>🤖 AI Model Prompts</summary>
            <div className="prompt-suggestions">
              <div className="prompt-item">
                <strong>For Claude/GPT:</strong>
                <code className="prompt-text">
                  "Generate 10 creative mathematical approximations for π, e, φ, and other constants. 
                  Return as JSON array with fields: expression, target, targetName, description. 
                  Use functions like sqrt(), log(), exp(), nested radicals, continued fractions."
                </code>
              </div>
              
              <div className="prompt-item">
                <strong>For Specialized Models:</strong>
                <code className="prompt-text">
                  "Create novel mathematical expressions that approximate famous constants. 
                  Focus on elegant, concise formulas similar to Ramanujan's discoveries. 
                  Include nested structures, rational approximations, and creative combinations."
                </code>
              </div>
            </div>
          </details>
        </div>

        <div className="ascii-decoration">
          <pre className="decoration-art">
{`
    ┌─ Use any AI model to generate approximations
    ├─ Copy JSON output to the input panel  
    ├─ Get ranked results by elegance & accuracy
    └─ Discover beautiful mathematical relationships
    
         🧠 → 📝 → 🧮 → 📊
`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPanel;
