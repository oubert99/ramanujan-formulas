import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import ExamplesPanel from './components/ExamplesPanel';
import TorusBackground from './components/TorusBackground';
import { ApproximationResult, ApproximationInput } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<ApproximationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiEvaluating, setAiEvaluating] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3.5-sonnet');

  const handleEvaluate = async (approximations: ApproximationInput[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/evaluate-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approximations }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        if (data.errors.length > 0) {
          console.warn('Some approximations failed:', data.errors);
        }
      } else {
        setError(data.error || 'Evaluation failed');
      }
    } catch (err) {
      setError('Network error: Could not connect to server');
      console.error('Evaluation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadExample = (example: ApproximationInput) => {
    // This will be handled by the InputPanel component
  };

  const handleAiEvaluate = async () => {
    if (results.length === 0) {
      setError('No results to evaluate. Please run mathematical evaluation first.');
      return;
    }

    setAiEvaluating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results, model: selectedModel }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        console.log('AI evaluation completed:', data.metadata);
      } else {
        setError(data.error || 'AI evaluation failed');
        if (!data.aiEnabled) {
          setAiEnabled(false);
        }
      }
    } catch (err) {
      setError('Network error: Could not connect to AI evaluation service');
      console.error('AI evaluation error:', err);
    } finally {
      setAiEvaluating(false);
    }
  };

  const testAiConnection = async () => {
    try {
      const response = await fetch('/api/test-ai');
      const data = await response.json();
      
      if (data.success) {
        setAiEnabled(true);
        console.log('AI connection successful:', data.message);
      } else {
        setAiEnabled(false);
        setError(data.error || 'AI connection failed');
      }
    } catch (err) {
      setAiEnabled(false);
      console.error('AI connection test failed:', err);
    }
  };

  // Test AI connection on component mount
  useEffect(() => {
    testAiConnection();
  }, []);

  return (
    <div className="app">
    
      <Header />
      
      <div className="main-content">
        <div className="left-panel">
          <InputPanel 
            onEvaluate={handleEvaluate}
            loading={loading}
          />
          <ExamplesPanel 
            onLoadExample={handleLoadExample}
          />
        </div>
        
        <div className="right-panel">
          <ResultsPanel 
            results={results}
            loading={loading || aiEvaluating}
            error={error}
          />
          
          {results.length > 0 && (
            <div className="ai-controls">
              <div className="ai-panel">
                <div className="ai-panel-header">
                  <h3>🤖 AI EVALUATION</h3>
                  <div className="ai-status">
                    Status: {aiEnabled ? '✅ Connected' : '❌ Disconnected'}
                  </div>
                </div>
                
                <div className="model-selector">
                  <label htmlFor="model-select">Select AI Model:</label>
                  <select 
                    id="model-select"
                    value={selectedModel} 
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="model-dropdown"
                  >
                    <option value="openai/gpt-4o">GPT-4o</option>
                    <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
                    <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
                    <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="meta-llama/llama-3.1-8b-instruct">Llama 3.1 8B</option>
                    <option value="google/gemini-2.5-flash-preview">Gemini 2.5 Flash</option>
                    <option value="google/gemini-2.5-pro-preview">Gemini 2.5 Pro</option>
                    <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="minimax/minimax-m2">Minimax M2</option>
                    <option value="deepseek/deepseek-chat-v3.1">DeepSeek v3.1</option>
                  </select>
                </div>
                
                <div className="ai-actions">
                  <button 
                    className="ai-evaluate-btn"
                    onClick={handleAiEvaluate}
                    disabled={aiEvaluating || !aiEnabled}
                  >
                    {aiEvaluating ? '🔄 AI Evaluating...' : '🚀 Evaluate with AI'}
                  </button>
                  
                  <button 
                    className="ai-test-btn"
                    onClick={testAiConnection}
                    disabled={aiEvaluating}
                  >
                    🔗 Test Connection
                  </button>
                </div>
                
                <div className="ai-info">
                  <small>
                    AI evaluation provides professional mathematical analysis using OpenRouter API.
                    {!aiEnabled && ' Configure OPENROUTER_API_KEY in .env file.'}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;