# 🧮 Mathematical Approximation Evaluator

**AI-Powered Mathematical Analysis using OpenRouter & Claude 3.5 Sonnet**

```
╔══════════════════════════════════════════════════════════════════════════════╗
║    ███████╗██╗   ██╗ █████╗ ██╗     ██╗   ██╗ █████╗ ████████╗ ██████╗ ██████╗║
║    ██╔════╝██║   ██║██╔══██╗██║     ██║   ██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗║
║    █████╗  ██║   ██║███████║██║     ██║   ██║███████║   ██║   ██║   ██║██████╔╝║
║    ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══██║   ██║   ██║   ██║██╔══██╗║
║    ███████╗ ╚████╔╝ ██║  ██║███████╗╚██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║║
║    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝║
║                                                                              ║
║    Professional Mathematical Analysis & Validation                          ║
║    Powered by OpenRouter AI & Claude 3.5 Sonnet                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

A professional web-based tool that evaluates mathematical approximations using AI-powered analysis through [OpenRouter](https://openrouter.ai/docs/api-reference/overview) and Claude 3.5 Sonnet.

## 🚀 Features

### **🤖 AI-Powered Evaluation**
- **Professional Mathematical Analysis** using Claude 3.5 Sonnet
- **OpenRouter API Integration** for reliable AI access
- **Structured JSON Responses** for consistent evaluation format
- **Batch Processing** with rate limiting and error handling

### **📊 Comprehensive Analysis Criteria**
- **Accuracy**: Error analysis and precision assessment
- **Efficiency**: Computational complexity evaluation
- **Novelty**: Mathematical originality assessment
- **Stability**: Convergence and reliability analysis
- **Generality**: Domain limitations and applicability

### **🎨 Professional Interface**
- **ASCII Terminal Aesthetics** with green-on-black styling
- **Real-time Validation** and error handling
- **Connection Testing** for API verification
- **Responsive Design** for desktop and mobile

## 🛠 Installation & Setup

### **Prerequisites**
- Node.js 16+ 
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### **Quick Start**

1. **Get your OpenRouter API key:**
   ```bash
   # Visit https://openrouter.ai/keys
   # Sign up and create an API key
   ```

2. **Setup the evaluator:**
   ```bash
   # Make startup script executable (if needed)
   chmod +x start_evaluator.sh
   
   # Run the startup script
   ./start_evaluator.sh
   ```

3. **Configure API key:**
   ```bash
   # The script will create a .env file
   # Edit it and add your OpenRouter API key:
   OPENROUTER_API_KEY=your_key_here
   ```

4. **Launch the evaluator:**
   ```bash
   # The script will install dependencies and start the server
   # Access at: http://localhost:3001
   ```

### **Manual Setup**

```bash
# 1. Copy package.json
cp evaluator_package.json package.json

# 2. Install dependencies
npm install

# 3. Create .env file
cp env_example.txt .env
# Edit .env and add your OPENROUTER_API_KEY

# 4. Start the server
node evaluator_backend.js
```

## 📝 Usage

### **Input Format**

The evaluator expects JSON arrays of mathematical approximations:

```json
[
  {
    "expression": "mp.exp(mp.pi * mp.sqrt(522)) / (mp.sinh(mp.pi * mp.sqrt(522)) / 32)",
    "value": "64.000000000000000000000000000000000000000000000000000000000000289397998242896671259361635333225519137512354795290965495819234757973776223252645023028179314378013094795610564233390776147464537129009527336578321078928927792897119872167772819761467536980161285156101039695924499304568768360412554309046437971142599441246541624151359772829713097161325419085629734071097024747038578630582245234329568918722774238485132867093924306525170602828204598881922253955301385127224637809119763784330598738277680675709720955462109961307346988560056042973694169448154438019778714859670269611974151691007394151625051487438405456274601925673569345417146979546601957227615052706522343546730320780327037071215596638780809071531481722849232563728183072164413220018438998950218321001615416738266610279756138384791551079664301901177400804166363118616672245917011231443180498380589788685889297057705568592719198798101372318931511057513593973934989010941031141386993031267390882812095749671438774093831031030103860692266211461729491698362312985175940678988627102236112240354302837888087095990701401337144822183769687363895356725600116940243312170328850173794090300274157172864160588034379484752897902903923731612430241176108573904189121144354620414840606497389009034456210547896501410860410316586157993498287175351729082825157979822267710856308869476348081100417672238669162999975555544398620306643191297087191130454177771110201472172930764660073639324741510320492922156223298904299611214414853387014737911260326130536277368",
    "error": 2.8939799824289668e-61,
    "iteration": 15,
    "verified": true,
    "oeis_status": "NOVEL",
    "timestamp": "2025-11-19T18:43:04.760122"
  }
]
```

**Required Fields:**
- `expression`: Mathematical expression (string)
- `value`: Computed value (string/number)
- `error`: Approximation error (number)

**Optional Fields:**
- `iteration`: Discovery iteration
- `verified`: Verification status
- `oeis_status`: OEIS database status
- `timestamp`: Discovery timestamp

### **AI Evaluation Output**

The AI returns structured analysis for each approximation:

```json
{
  "accuracy": "High - Error magnitude of 10^-61 indicates exceptional precision with 61 significant digits of accuracy",
  "efficiency": "Medium - Hyperbolic sinh function requires careful numerical computation, but exponential operations are standard",
  "novelty": "Yes - Novel approximation not found in standard mathematical literature or OEIS database",
  "stability": "Stable - Expression converges reliably for positive real arguments in the specified domain",
  "generality": "Restricted - Valid for positive real arguments, requires careful handling near domain boundaries",
  "recommendation": "Use"
}
```

## 🔧 API Endpoints

### **POST /api/evaluate**
Evaluate mathematical approximations using AI

**Request:**
```json
{
  "approximations": [
    {
      "expression": "mathematical_expression",
      "value": "computed_value",
      "error": numerical_error
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "expression": "mathematical_expression",
      "value": "computed_value", 
      "error": numerical_error,
      "evaluation": {
        "accuracy": "AI analysis of accuracy",
        "efficiency": "AI analysis of efficiency",
        "novelty": "AI analysis of novelty",
        "stability": "AI analysis of stability",
        "generality": "AI analysis of generality",
        "recommendation": "Use/Needs improvement/Discard"
      }
    }
  ],
  "metadata": {
    "totalApproximations": 1,
    "evaluationTimeMs": 3500,
    "model": "anthropic/claude-3.5-sonnet",
    "provider": "OpenRouter"
  }
}
```

### **GET /api/test-openrouter**
Test OpenRouter API connection

### **GET /api/health**
Health check endpoint

## 🧠 AI Model Configuration

The evaluator uses **Claude 3.5 Sonnet** via OpenRouter for mathematical analysis:

- **Model**: `anthropic/claude-3.5-sonnet`
- **Temperature**: 0.1 (low for consistent analytical responses)
- **Max Tokens**: 1000
- **Response Format**: JSON object
- **Rate Limiting**: 1 second delay between requests

### **Professional System Prompt**

The AI is configured as a professional mathematician with this system prompt:

> "You are a professional mathematician and numerical analyst. Your task is to rigorously evaluate mathematical approximations provided by an AI discovery system. You must analyze each approximation based on accuracy, efficiency, novelty, stability, and generality criteria..."

## 🎯 Use Cases

### **Mathematical Research**
- Validate AI-discovered approximations
- Assess computational efficiency of new methods
- Evaluate mathematical novelty and significance
- Analyze convergence properties and stability

### **Educational Applications**
- Demonstrate professional mathematical evaluation
- Show AI-powered analysis techniques
- Compare different approximation methods
- Understand mathematical assessment criteria

### **Quality Assurance**
- Verify mathematical discoveries before publication
- Assess reliability of computational methods
- Evaluate domain limitations and applicability
- Provide professional recommendations

## 🔬 Technical Architecture

### **Backend (Node.js + Express)**
- **OpenRouter API Integration** with proper authentication
- **Rate Limiting** to respect API limits
- **Error Handling** with fallback responses
- **Batch Processing** for multiple approximations
- **JSON Validation** for input data

### **Frontend (HTML + JavaScript)**
- **ASCII Terminal Aesthetics** with CSS animations
- **Real-time Validation** and error feedback
- **Connection Testing** for API verification
- **Responsive Design** for all devices
- **Professional UI/UX** for mathematical analysis

### **AI Integration**
- **OpenRouter API** for reliable AI access
- **Claude 3.5 Sonnet** for mathematical expertise
- **Structured Prompts** for consistent analysis
- **JSON Response Format** for parseable output
- **Professional Evaluation Criteria** implementation

## 📊 Performance

- **Evaluation Speed**: ~3-5 seconds per approximation
- **Batch Processing**: Sequential with 1s delays
- **API Reliability**: OpenRouter's multi-provider redundancy
- **Error Handling**: Graceful fallbacks for API issues
- **Rate Limiting**: Respects OpenRouter API limits

## 🔐 Security & Privacy

- **API Key Security**: Environment variable storage
- **No Data Storage**: Evaluations are not persisted
- **Request Validation**: Input sanitization and validation
- **Error Sanitization**: No sensitive data in error messages
- **HTTPS**: Secure communication with OpenRouter

## 🤝 Contributing

Contributions welcome! Areas for enhancement:

- Additional AI models and providers
- Enhanced mathematical analysis criteria
- Export functionality for evaluations
- Historical evaluation database
- Advanced visualization options

## 📜 License

MIT License - Feel free to use, modify, and distribute!

---

## 🚀 Getting Started

1. **Get OpenRouter API key**: https://openrouter.ai/keys
2. **Run setup script**: `./start_evaluator.sh`
3. **Add API key to .env file**
4. **Open browser**: http://localhost:3001
5. **Load example data** and click "EVALUATE WITH AI"
6. **Get professional mathematical analysis!**

**Built with ❤️ for mathematical discovery and AI-powered analysis**

```
    ┌─ Input mathematical approximations
    ├─ AI analyzes with professional criteria
    ├─ Get structured evaluation results
    └─ Make informed mathematical decisions
    
         📝 → 🤖 → 📊 → ✅
```
