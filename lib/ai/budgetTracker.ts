export interface AiUsageRecord {
  id: string;
  timestamp: string;
  userId: string;
  provider: 'openai' | 'nvidia' | 'deterministic_fallback';
  model: string;
  operation: 'coach_reflection' | 'practice_hint' | 'career_exploratory' | 'curriculum_tutor';
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostInr: number;
  latencyMs: number;
  success: boolean;
}

export interface BudgetLimits {
  dailyLimitInr: number;
  monthlyLimitInr: number;
  currentDaySpendInr: number;
  currentMonthSpendInr: number;
  isDailyBudgetExceeded: boolean;
  isMonthlyBudgetExceeded: boolean;
}

// Token pricing rate card (INR per 1K tokens)
const MODEL_RATE_CARD: Record<string, { promptPer1kInr: number; completionPer1kInr: number }> = {
  'gpt-4o-mini': { promptPer1kInr: 0.013, completionPer1kInr: 0.052 },
  'gpt-4o': { promptPer1kInr: 0.21, completionPer1kInr: 0.84 },
  'meta/llama-3.1-70b-instruct': { promptPer1kInr: 0.075, completionPer1kInr: 0.075 },
  'deterministic_fallback': { promptPer1kInr: 0, completionPer1kInr: 0 },
};

// In-memory usage store (persisted in DB in live mode)
const usageLog: AiUsageRecord[] = [];

// Operator-configurable limits
const DAILY_BUDGET_INR = parseFloat(process.env.AI_DAILY_BUDGET_INR || '500');
const MONTHLY_BUDGET_INR = parseFloat(process.env.AI_MONTHLY_BUDGET_INR || '12000');

/**
 * Calculate estimated cost in INR based on model rate card
 */
export function estimateInrCost(model: string, promptTokens: number, completionTokens: number): number {
  const rates = MODEL_RATE_CARD[model] || MODEL_RATE_CARD['gpt-4o-mini'];
  const promptCost = (promptTokens / 1000) * rates.promptPer1kInr;
  const completionCost = (completionTokens / 1000) * rates.completionPer1kInr;
  return Number((promptCost + completionCost).toFixed(4));
}

/**
 * Check if current usage is within daily and monthly spend limits
 */
export function checkAiBudget(): BudgetLimits {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const currentMonth = now.toISOString().substring(0, 7); // YYYY-MM

  let dailySpend = 0;
  let monthlySpend = 0;

  for (const record of usageLog) {
    if (record.timestamp.startsWith(todayStr)) {
      dailySpend += record.estimatedCostInr;
    }
    if (record.timestamp.startsWith(currentMonth)) {
      monthlySpend += record.estimatedCostInr;
    }
  }

  return {
    dailyLimitInr: DAILY_BUDGET_INR,
    monthlyLimitInr: MONTHLY_BUDGET_INR,
    currentDaySpendInr: Number(dailySpend.toFixed(2)),
    currentMonthSpendInr: Number(monthlySpend.toFixed(2)),
    isDailyBudgetExceeded: dailySpend >= DAILY_BUDGET_INR,
    isMonthlyBudgetExceeded: monthlySpend >= MONTHLY_BUDGET_INR,
  };
}

/**
 * Record an AI invocation for telemetry and budget calculation
 */
export function recordAiUsage(params: {
  userId: string;
  provider: 'openai' | 'nvidia' | 'deterministic_fallback';
  model: string;
  operation: 'coach_reflection' | 'practice_hint' | 'career_exploratory' | 'curriculum_tutor';
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  success: boolean;
}): AiUsageRecord {
  const cost = estimateInrCost(params.model, params.promptTokens, params.completionTokens);
  const record: AiUsageRecord = {
    id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    userId: params.userId,
    provider: params.provider,
    model: params.model,
    operation: params.operation,
    promptTokens: params.promptTokens,
    completionTokens: params.completionTokens,
    totalTokens: params.promptTokens + params.completionTokens,
    estimatedCostInr: cost,
    latencyMs: params.latencyMs,
    success: params.success,
  };

  usageLog.push(record);
  return record;
}

/**
 * Retrieve recent telemetry logs for admin console
 */
export function getAiTelemetry(limit: number = 50): { records: AiUsageRecord[]; summary: BudgetLimits } {
  return {
    records: usageLog.slice(-limit).reverse(),
    summary: checkAiBudget(),
  };
}
