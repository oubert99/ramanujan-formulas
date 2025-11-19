const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY not found in environment variables');
    console.log('Please add OPENROUTER_API_KEY=your_key_here to your .env file');
}

// AI Evaluator using OpenRouter
class MathematicalEvaluator {
    constructor() {
        this.systemPrompt = `You are a professional mathematician and numerical analyst. Your task is to rigorously evaluate mathematical approximations provided by an AI discovery system.

You must analyze each approximation based on these criteria:
1. ACCURACY: How close is the approximation to the true value? Include error analysis.
2. EFFICIENCY: How computationally efficient is the expression compared to alternatives?
3. NOVELTY: Is this approach new or known? Consider mathematical literature.
4. STABILITY: Does it converge reliably for intended inputs?
5. GENERALITY: What are the domain limitations and input ranges?

For each approximation, you must respond with ONLY a valid JSON object in this exact format:
{
  "accuracy": "High/Medium/Low + detailed error analysis",
  "efficiency": "High/Medium/Low + computational complexity notes",
  "novelty": "Yes/No + explanation of novelty or known status",
  "stability": "Stable/Unstable + convergence analysis",
  "generality": "General/Restricted + domain limitations",
  "recommendation": "Use/Needs improvement/Discard"
}

Be precise, technical, and provide specific mathematical insights. Focus on practical applicability and mathematical rigor.`;
    }

    async evaluateApproximation(approximation) {
        const userPrompt = `Evaluate this mathematical approximation:

Expression: ${approximation.expression}
Computed Value: ${approximation.value}
Error: ${approximation.error}
${approximation.iteration ? `Discovery Iteration: ${approximation.iteration}` : ''}
${approximation.verified ? `Verification Status: ${approximation.verified}` : ''}
${approximation.oeis_status ? `OEIS Status: ${approximation.oeis_status}` : ''}

Provide a rigorous mathematical evaluation focusing on accuracy, efficiency, novelty, stability, and generality. Respond with only the JSON evaluation object.`;

        try {
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://ramajan-evaluator.local',
                    'X-Title': 'Ramajan Mathematical Evaluator'
                },
                body: JSON.stringify({
                    model: 'google/gemini-3-pro-preview', // Using Claude 3.5 Sonnet for mathematical analysis
                    messages: [
                        {
                            role: 'system',
                            content: this.systemPrompt
                        },
                        {
                            role: 'user',
                            content: userPrompt
                        }
                    ],
                    temperature: 0.1, // Low temperature for consistent, analytical responses
                    max_tokens: 1000,
                    response_format: { type: 'json_object' } // Ensure JSON response
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const content = data.choices[0]?.message?.content;

            if (!content) {
                throw new Error('No content received from OpenRouter API');
            }

            // Parse the JSON response
            try {
                const evaluation = JSON.parse(content);
                return evaluation;
            } catch (parseError) {
                console.error('Failed to parse AI response as JSON:', content);
                // Fallback evaluation if JSON parsing fails
                return {
                    accuracy: "Unable to analyze - AI response parsing failed",
                    efficiency: "Unable to analyze - AI response parsing failed", 
                    novelty: "Unable to analyze - AI response parsing failed",
                    stability: "Unable to analyze - AI response parsing failed",
                    generality: "Unable to analyze - AI response parsing failed",
                    recommendation: "Needs improvement"
                };
            }

        } catch (error) {
            console.error('Error evaluating approximation:', error);
            
            // Fallback evaluation for API errors
            return {
                accuracy: `Error during evaluation: ${error.message}`,
                efficiency: "Unable to analyze due to API error",
                novelty: "Unable to analyze due to API error", 
                stability: "Unable to analyze due to API error",
                generality: "Unable to analyze due to API error",
                recommendation: "Needs improvement"
            };
        }
    }

    async evaluateBatch(approximations) {
        const results = [];
        
        // Process approximations sequentially to avoid rate limiting
        for (let i = 0; i < approximations.length; i++) {
            const approximation = approximations[i];
            console.log(`Evaluating approximation ${i + 1}/${approximations.length}...`);
            
            try {
                const evaluation = await this.evaluateApproximation(approximation);
                results.push({
                    ...approximation,
                    evaluation: evaluation,
                    evaluationIndex: i
                });
                
                // Add delay between requests to respect rate limits
                if (i < approximations.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                
            } catch (error) {
                console.error(`Error evaluating approximation ${i + 1}:`, error);
                results.push({
                    ...approximation,
                    evaluation: {
                        accuracy: `Evaluation failed: ${error.message}`,
                        efficiency: "Unable to analyze",
                        novelty: "Unable to analyze",
                        stability: "Unable to analyze", 
                        generality: "Unable to analyze",
                        recommendation: "Needs improvement"
                    },
                    evaluationIndex: i,
                    evaluationError: error.message
                });
            }
        }
        
        return results;
    }
}

const evaluator = new MathematicalEvaluator();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Mathematical Evaluator API is running',
        openRouterConfigured: !!OPENROUTER_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Evaluate approximations endpoint
app.post('/api/evaluate', async (req, res) => {
    try {
        const { approximations } = req.body;
        
        if (!approximations || !Array.isArray(approximations)) {
            return res.status(400).json({ 
                error: 'Invalid request: approximations array is required' 
            });
        }

        if (approximations.length === 0) {
            return res.status(400).json({ 
                error: 'Invalid request: approximations array cannot be empty' 
            });
        }

        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenRouter API key not configured. Please set OPENROUTER_API_KEY in environment variables.' 
            });
        }

        // Validate approximation format
        for (let i = 0; i < approximations.length; i++) {
            const approx = approximations[i];
            if (!approx.expression || approx.value === undefined || approx.error === undefined) {
                return res.status(400).json({ 
                    error: `Invalid approximation at index ${i}: missing required fields (expression, value, error)` 
                });
            }
        }

        console.log(`Starting evaluation of ${approximations.length} approximations...`);
        
        const startTime = Date.now();
        const results = await evaluator.evaluateBatch(approximations);
        const endTime = Date.now();
        
        console.log(`Evaluation completed in ${(endTime - startTime) / 1000}s`);

        res.json({
            success: true,
            results: results,
            metadata: {
                totalApproximations: approximations.length,
                evaluationTimeMs: endTime - startTime,
                timestamp: new Date().toISOString(),
                model: 'anthropic/claude-3.5-sonnet',
                provider: 'OpenRouter'
            }
        });

    } catch (error) {
        console.error('Evaluation endpoint error:', error);
        res.status(500).json({ 
            error: 'Internal server error during evaluation',
            details: error.message 
        });
    }
});

// Test OpenRouter connection
app.get('/api/test-openrouter', async (req, res) => {
    if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ 
            error: 'OpenRouter API key not configured' 
        });
    }

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ramajan-evaluator.local',
                'X-Title': 'Ramajan Mathematical Evaluator'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3.5-sonnet',
                messages: [
                    {
                        role: 'user',
                        content: 'Respond with "OpenRouter connection successful" if you can read this.'
                    }
                ],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        
        res.json({
            success: true,
            message: 'OpenRouter API connection successful',
            response: data.choices[0]?.message?.content,
            model: data.model,
            usage: data.usage
        });

    } catch (error) {
        console.error('OpenRouter test error:', error);
        res.status(500).json({ 
            error: 'Failed to connect to OpenRouter API',
            details: error.message 
        });
    }
});

// Get example approximations (for React app compatibility)
app.get('/api/examples', (req, res) => {
    const examples = [
        {
            expression: "mp.exp(mp.pi * mp.sqrt(522)) / (mp.sinh(mp.pi * mp.sqrt(522)) / 32)",
            target: "64.000000000000000000000000000000000000000000000000000000000000289397998242896671259361635333225519137512354795290965495819234757973776223252645023028179314378013094795610564233390776147464537129009527336578321078928927792897119872167772819761467536980161285156101039695924499304568768360412554309046437971142599441246541624151359772829713097161325419085629734071097024747038578630582245234329568918722774238485132867093924306525170602828204598881922253955301385127224637809119763784330598738277680675709720955462109961307346988560056042973694169448154438019778714859670269611974151691007394151625051487438405456274601925673569345417146979546601957227615052706522343546730320780327037071215596638780809071531481722849232563728183072164413220018438998950218321001615416738266610279756138384791551079664301901177400804166363118616672245917011231443180498380589788685889297057705568592719198798101372318931511057513593973934989010941031141386993031267390882812095749671438774093831031030103860692266211461729491698362312985175940678988627102236112240354302837888087095990701401337144822183769687363895356725600116940243312170328850173794090300274157172864160588034379484752897902903923731612430241176108573904189121144354620414840606497389009034456210547896501410860410316586157993498287175351729082825157979822267710856308869476348081100417672238669162999975555544398620306643191297087191130454177771110201472172930764660073639324741510320492922156223298904299611214414853387014737911260326130536277368",
            targetName: "64",
            description: "Novel approximation to 64 using exponential and hyperbolic functions"
        },
        {
            expression: "mp.exp(mp.pi * mp.sqrt(652)) / (mp.sinh(mp.pi * mp.sqrt(652)) / 48)",
            target: "96.0000000000000000000000000000000000000000000000000000000000000000000202072134778892254458568482925518083982993393990212057171728444381638029943253422230442911401756040677249113345942914631322321900994994969360671136236742944572822112542834602520624965316943331288606576642424971172194009830959664893511426209907800729950952575615896672655526292630989953999441956734774390490569514147163129721946459770691717833171796006241839728070581730116241480556014874403332046150291584314055588484788651552792700933678402902459672114313549366891085081553575759566498629440662753299759181849366776974170523120142275274491335431570025750451935651468578660006203959677394932751866923414921213846979992146639250263912447989222269939725528708682387806965548647264031807237384470242917761778591501532113539257408866499315730311598151653074469361273962122583117412312093983906572151184583325124013319244335571057827747874429974894163769762669325450758689469059958444945957733311834370894895023448907282919672600943877372093216874520239768267429352301865345853039912760285984361822229848904423745021382653397411614564882106915972417166705231346304719737370865762662257709104894260014893560743493139270694440663697607019822061231101820071809875914493519460826567831173957260380818552977187575244040158666574397508847450378132622804958118021542987265593538792887364528324640051757351486819241342381440362966191772872263034184081590363769212434439006984571286292256182020812827662463037688540219761193422966161236078866663",
            targetName: "96",
            description: "Novel approximation to 96 using exponential and hyperbolic functions"
        },
        {
            expression: "22/7",
            target: "3.141592653589793",
            targetName: "π",
            description: "Classic rational approximation to π"
        },
        {
            expression: "355/113",
            target: "3.141592653589793",
            targetName: "π",
            description: "Milü's approximation to π (accurate to 6 digits)"
        },
        {
            expression: "(1 + sqrt(5))/2",
            target: "1.618033988749895",
            targetName: "φ",
            description: "Golden ratio exact formula"
        }
    ];
    
    res.json({ examples });
});

// Serve the evaluator HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'evaluator.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ███████╗██╗   ██╗ █████╗ ██╗     ██╗   ██╗ █████╗ ████████╗ ██████╗ ██████╗║
║    ██╔════╝██║   ██║██╔══██╗██║     ██║   ██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗║
║    █████╗  ██║   ██║███████║██║     ██║   ██║███████║   ██║   ██║   ██║██████╔╝║
║    ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══██║   ██║   ██║   ██║██╔══██╗║
║    ███████╗ ╚████╔╝ ██║  ██║███████╗╚██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║║
║    ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝║
║                                                                              ║
║    Mathematical Approximation Evaluator API                                 ║
║    Server running on port ${PORT}                                               ║
║    OpenRouter API: ${OPENROUTER_API_KEY ? '✅ Configured' : '❌ Not configured'}                                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
    `);
    
    if (!OPENROUTER_API_KEY) {
        console.log('\n⚠️  WARNING: OPENROUTER_API_KEY not found in environment variables');
        console.log('Please create a .env file with: OPENROUTER_API_KEY=your_key_here');
        console.log('Get your API key from: https://openrouter.ai/keys\n');
    }
});

module.exports = app;
