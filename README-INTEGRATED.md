# Ramajan - Mathematical Approximation Evaluator with AI

A powerful React-based web application for evaluating mathematical approximations with professional AI analysis powered by OpenRouter.

## 🚀 Features

### Mathematical Evaluation
- **High-precision computation** using `mathjs` and `decimal.js`
- **Quality metrics**: Absolute/relative error, complexity, elegance scoring
- **Batch processing** of multiple approximations
- **ASCII terminal aesthetics** for a retro computing experience

### AI-Powered Analysis
- **Professional mathematical critique** using OpenRouter API
- **Multi-criteria evaluation**: Accuracy, efficiency, novelty, stability, generality
- **Structured recommendations** for each approximation
- **Support for multiple AI models** (currently using Gemini 3 Pro Preview)

### User Interface
- **Minimalistic ASCII design** with terminal-inspired styling
- **Real-time evaluation** with loading states and progress indicators
- **Interactive examples** to get started quickly
- **Responsive layout** that works on desktop and mobile

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- OpenRouter API key (get from [openrouter.ai/keys](https://openrouter.ai/keys))

### Quick Start

1. **Clone and setup**:
   ```bash
   cd "/Users/oumark/Downloads/Mobile App/Ramajan"
   ./start-integrated.sh
   ```

2. **Configure API key**:
   - Edit the `.env` file created automatically
   - Add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_actual_api_key_here
     ```

3. **Access the application**:
   - Open http://localhost:5000 in your browser
   - The React frontend and Node.js backend run together

### Manual Installation

If you prefer manual setup:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client && npm install

# Build client
npm run build && cd ..

# Create .env file
cp env-example.txt .env
# Edit .env and add your OPENROUTER_API_KEY

# Start server
node server.js
```

## 📖 Usage

### Basic Mathematical Evaluation

1. **Input approximations** in JSON format:
   ```json
   [
     {
       "expression": "22/7",
       "target": "3.141592653589793",
       "targetName": "π",
       "description": "Classic rational approximation to π"
     }
   ]
   ```

2. **Click "EVALUATE"** to compute quality metrics

3. **View results** with accuracy bars, elegance scores, and rankings

### AI Evaluation

1. **After mathematical evaluation**, click "🚀 Evaluate with AI"
2. **Wait for AI analysis** (may take 30-60 seconds for multiple approximations)
3. **Review AI insights** including:
   - **Accuracy analysis** with error bounds
   - **Efficiency assessment** vs existing methods
   - **Novelty determination** (new vs known)
   - **Stability analysis** for convergence
   - **Generality evaluation** for domain limitations
   - **Professional recommendation** (Use/Improve/Discard)

### Example Approximations

The app includes several built-in examples:
- Classic π approximations (22/7, 355/113)
- Golden ratio formulas
- Ramanujan constants
- Novel exponential/hyperbolic approximations

## 🔧 API Endpoints

### Mathematical Evaluation
- `POST /api/evaluate-batch` - Batch evaluate approximations
- `GET /api/examples` - Get example approximations
- `GET /api/constants` - Get mathematical constants

### AI Evaluation  
- `POST /api/ai-evaluate` - AI analysis of results
- `GET /api/test-ai` - Test OpenRouter connection
- `GET /api/health` - Health check

## 🎨 Architecture

### Frontend (React + TypeScript)
- **Components**: Header, InputPanel, ResultsPanel, ExamplesPanel
- **State management**: React hooks for results, loading, errors
- **Styling**: Custom CSS with ASCII terminal aesthetics
- **Types**: Full TypeScript support for type safety

### Backend (Node.js + Express)
- **Mathematical engine**: High-precision evaluation with quality scoring
- **AI integration**: OpenRouter API client with error handling
- **API design**: RESTful endpoints with proper error responses
- **Static serving**: Serves built React app for production

### AI Integration (OpenRouter)
- **Model**: Google Gemini 3 Pro Preview (configurable)
- **Prompt engineering**: Professional mathematician persona
- **Structured output**: JSON format for consistent parsing
- **Rate limiting**: Sequential processing to respect API limits

## 🔐 Environment Variables

Create a `.env` file with:

```bash
# Required: OpenRouter API key
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: Server configuration
PORT=5000
NODE_ENV=development
```

## 🚨 Troubleshooting

### Common Issues

1. **"AI evaluation failed"**:
   - Check your OpenRouter API key in `.env`
   - Verify internet connection
   - Try "Test Connection" button

2. **"Network error"**:
   - Ensure server is running on port 5000
   - Check for port conflicts
   - Verify client build completed successfully

3. **"No results to evaluate"**:
   - Run mathematical evaluation first
   - Ensure at least one approximation succeeded

### Debug Mode

Enable detailed logging:
```bash
NODE_ENV=development node server.js
```

## 📊 Quality Metrics

The evaluator computes several quality metrics:

- **Absolute Error**: `|computed - target|`
- **Relative Error**: `|computed - target| / |target|`
- **Complexity**: Expression length and operator count
- **Elegance Score**: `Error × (1 + 0.03 × Length)`
- **Accuracy**: Decimal digits of precision
- **Overall Score**: Composite ranking metric

## 🤖 AI Evaluation Criteria

The AI evaluator analyzes approximations on:

1. **Accuracy**: Numerical precision and error analysis
2. **Efficiency**: Computational complexity vs alternatives  
3. **Novelty**: Whether the approach is new or known
4. **Stability**: Convergence properties and reliability
5. **Generality**: Domain limitations and input ranges

## 🎯 Use Cases

- **Mathematical research**: Evaluate novel approximation formulas
- **Educational tools**: Demonstrate approximation quality concepts
- **Algorithm comparison**: Rank different computational approaches
- **Discovery validation**: AI-assisted verification of new mathematical identities

## 📝 License

MIT License - feel free to use and modify for your projects.

## 🤝 Contributing

This is a demonstration project, but contributions are welcome:
- Bug reports and feature requests
- UI/UX improvements
- Additional mathematical constants and examples
- Support for more AI models

---

**Built with ❤️ using React, Node.js, and OpenRouter AI**
