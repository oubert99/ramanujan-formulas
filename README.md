# 🧮 RAMAJAN

**Minimalistic ASCII Mathematical Approximation Evaluator**

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ██████╗  █████╗ ███╗   ███╗ █████╗      ██╗ █████╗ ███╗   ██╗           ║
║    ██╔══██╗██╔══██╗████╗ ████║██╔══██╗     ██║██╔══██╗████╗  ██║           ║
║    ██████╔╝███████║██╔████╔██║███████║     ██║███████║██╔██╗ ██║           ║
║    ██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║██   ██║██╔══██║██║╚██╗██║           ║
║    ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║╚█████╔╝██║  ██║██║ ╚████║           ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝           ║
║                                                                              ║
║    Input JSON → AI Model → Best Approximations                              ║
║    ASCII vibes activated ⚡                                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

A minimalistic web interface that takes JSON mathematical approximations as input and evaluates them using high-precision mathematics, ranking by elegance and accuracy.

## 🚀 Features

- **JSON Input Interface** - Paste mathematical approximations in JSON format
- **High-Precision Evaluation** - 50+ decimal place accuracy using Decimal.js
- **Elegance Scoring** - Balances accuracy with expression complexity
- **ASCII Aesthetics** - Retro terminal vibes with green-on-black styling
- **Real-time Results** - Instant evaluation and ranking
- **AI Model Integration** - Use any AI model to generate approximations
- **Mathematical Constants** - Built-in support for π, e, φ, γ, √2, √3, ln(2)

## 🛠 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Launch

```bash
# Install all dependencies
npm run install-all

# Start development server (both backend and frontend)
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Production Build

```bash
# Build React app
npm run build

# Start production server
npm start
```

## 📝 Usage

### 1. Input JSON Format

```json
[
  {
    "expression": "22/7",
    "target": "3.141592653589793",
    "targetName": "π",
    "description": "Classic rational approximation"
  },
  {
    "expression": "(1 + sqrt(5))/2",
    "target": "1.618033988749895",
    "targetName": "φ",
    "description": "Golden ratio exact formula"
  }
]
```

**Required Fields:**
- `expression`: Mathematical expression (string)
- `target`: Target value to approximate (string)

**Optional Fields:**
- `targetName`: Name of the constant (e.g., "π", "e", "φ")
- `description`: Description of the approximation

### 2. Supported Mathematical Functions

- **Basic Operations**: `+`, `-`, `*`, `/`, `^`
- **Functions**: `sqrt()`, `log()`, `ln()`, `exp()`
- **Trigonometry**: `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`
- **Constants**: `pi`, `e`, `phi`, `gamma`, `sqrt2`, `sqrt3`, `ln2`

### 3. AI Model Integration

Use any AI model (Claude, GPT, etc.) to generate approximations:

**Example Prompt:**
```
Generate 10 creative mathematical approximations for π, e, φ, and other constants. 
Return as JSON array with fields: expression, target, targetName, description. 
Use functions like sqrt(), log(), exp(), nested radicals, continued fractions.
```

Copy the AI's JSON output directly into Ramajan's input panel!

## 🧮 Evaluation Metrics

### Quality Scoring System

Each approximation is evaluated on multiple criteria:

1. **Absolute Error**: `|computed - target|`
2. **Relative Error**: `absolute_error / |target|`
3. **Complexity**: Based on expression length, operators, functions
4. **Elegance Score**: `error × (1 + 0.01 × complexity)` (lower is better)
5. **Accuracy**: Number of correct decimal places
6. **Overall Score**: Weighted combination favoring accuracy and simplicity

### Ranking Algorithm

Results are ranked by **Overall Score** (higher is better), which balances:
- **High accuracy** (low error)
- **Low complexity** (simple expressions)
- **Mathematical elegance**

## 🎯 Example Approximations

### Classic Approximations
```json
[
  {
    "expression": "355/113",
    "target": "3.141592653589793",
    "targetName": "π",
    "description": "Milü's approximation (accurate to 6 digits)"
  },
  {
    "expression": "sqrt(2 + sqrt(2 + sqrt(2)))",
    "target": "1.847759065022574",
    "targetName": "nested radical",
    "description": "Infinite nested radical"
  }
]
```

### Ramanujan-Style Discoveries
```json
[
  {
    "expression": "exp(pi * sqrt(163))",
    "target": "262537412640768744",
    "targetName": "Ramanujan constant",
    "description": "Famous near-integer"
  },
  {
    "expression": "pi^2/6",
    "target": "1.644934066848226",
    "targetName": "ζ(2)",
    "description": "Basel problem solution"
  }
]
```

## 🔧 API Endpoints

### `POST /api/evaluate-batch`
Evaluate multiple approximations

**Request:**
```json
{
  "approximations": [
    {
      "expression": "22/7",
      "target": "3.141592653589793",
      "targetName": "π",
      "description": "Classic approximation"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [...],
  "errors": [...],
  "summary": {
    "total": 1,
    "successful": 1,
    "failed": 0,
    "bestScore": 123.45
  }
}
```

### `GET /api/examples`
Get example approximations

### `GET /api/constants`
Get available mathematical constants

### `GET /api/health`
Health check endpoint

## 🎨 ASCII Design Philosophy

Ramajan embraces minimalistic ASCII aesthetics:

- **Monospace fonts** for precise alignment
- **Green-on-black terminal** color scheme
- **Box-drawing characters** for UI elements
- **ASCII art** for branding and decoration
- **Retro computing vibes** throughout

## 🧠 AI Model Workflow

```
┌─ Use any AI model to generate approximations
├─ Copy JSON output to Ramajan input panel  
├─ Get ranked results by elegance & accuracy
└─ Discover beautiful mathematical relationships

     🧠 → 📝 → 🧮 → 📊
```

### Recommended AI Prompts

**For Creative Approximations:**
```
Create novel mathematical expressions that approximate famous constants. 
Focus on elegant, concise formulas similar to Ramanujan's discoveries. 
Include nested structures, rational approximations, and creative combinations.
```

**For Systematic Generation:**
```
Generate mathematical approximations using:
- Continued fractions
- Nested radicals  
- Exponential forms
- Trigonometric identities
- Series expansions
Return as JSON with expression, target, targetName, description fields.
```

## 🔬 Technical Details

### Backend (Node.js + Express)
- **High-precision math** using Decimal.js (50+ decimal places)
- **Expression evaluation** using mathjs
- **RESTful API** with comprehensive error handling
- **Mathematical constants** with extended precision

### Frontend (React + TypeScript)
- **Minimalistic ASCII design** with CSS animations
- **Real-time evaluation** with loading states
- **Responsive layout** for desktop and mobile
- **Clipboard integration** for easy example loading

### Mathematical Engine
- **Complexity scoring** based on expression structure
- **Elegance calculation** balancing accuracy and simplicity
- **Multi-metric evaluation** for comprehensive ranking
- **Error handling** for invalid expressions

## 📊 Performance

- **Evaluation speed**: ~1ms per expression
- **Precision**: 50+ decimal places
- **Batch processing**: Unlimited approximations
- **Memory efficient**: Optimized for large datasets

## 🤝 Contributing

Contributions welcome! Areas for enhancement:

- Additional mathematical functions
- More sophisticated complexity scoring
- Export functionality (CSV, PDF)
- Historical approximation database
- Advanced visualization options

## 📜 License

MIT License - Feel free to use, modify, and distribute!

---

**Built with ❤️ for mathematical discovery and ASCII aesthetics**

```
    ┌─ Input mathematical approximations
    ├─ Evaluate with high precision
    ├─ Rank by elegance and accuracy  
    └─ Discover beautiful relationships
    
         🧮 → 🤖 → 📈 → ✨
```