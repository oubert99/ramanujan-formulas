export interface ApproximationInput {
  expression: string;
  target?: string;
  value?: string; // Alternative to target
  targetName?: string;
  description?: string;
}

export interface QualityMetrics {
  absoluteError: string;
  relativeError: string;
  complexity: number;
  eleganceScore: string;
  accuracy: number;
  score: number;
}

export interface AIEvaluation {
  accuracy: string;
  efficiency: string;
  novelty: string;
  stability: string;
  generality: string;
  recommendation: string;
}

export interface ApproximationResult {
  index: number;
  expression: string;
  target: string;
  targetName: string;
  description: string;
  computed: string;
  quality: QualityMetrics;
  timestamp: string;
  aiEvaluation?: AIEvaluation;
  evaluationIndex?: number;
  evaluationError?: string;
}

export interface EvaluationError {
  index: number;
  expression: string;
  error: string;
}

export interface BatchEvaluationResponse {
  success: boolean;
  results: ApproximationResult[];
  errors: EvaluationError[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    bestScore: number;
  };
}

export interface ExampleApproximation {
  expression: string;
  target: string;
  targetName: string;
  description: string;
}
