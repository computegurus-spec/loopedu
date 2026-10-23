// ==============================================================================
// Availability-Aware Weekly Planner & Spaced Repetition Mistake Notebook
// ==============================================================================

export interface MistakeEntry {
  questionId: string;
  trackCode: string;
  topic: string;
  questionText: string;
  correctAnswer: string;
  explanation: string;
  firstFailedAt: string;
  lastReviewedAt: string;
  nextRevisionDueDate: string;
  reviewStage: number; // 1 (1d), 2 (3d), 3 (7d), 4 (14d)
  consecutiveCorrect: number;
  isMastered: boolean;
}

export interface DayPlan {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  dateString: string;
  allocatedMinutes: number;
  isRestDay: boolean;
  tasks: {
    id: string;
    type: 'DIAGNOSTIC_DRILL' | 'NEW_CONCEPT_PRACTICE' | 'MISTAKE_VAULT_RETRY' | 'REST_REFLECTION';
    title: string;
    estimatedMinutes: number;
    isCompleted: boolean;
  }[];
}

export function getMistakeNotebook(): MistakeEntry[] {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('loopedu_mistake_notebook');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
  }
  return [];
}

export function recordQuestionMistake(question: {
  id: string;
  trackCode: string;
  topic: string;
  question: string;
  correctOption: string;
  detailedExplanation: string;
}) {
  if (typeof window === 'undefined') return;

  const existing = getMistakeNotebook();
  const index = existing.findIndex((m) => m.questionId === question.id);
  const now = new Date();
  // Next review due tomorrow (1 day)
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (index >= 0) {
    existing[index].lastReviewedAt = now.toISOString();
    existing[index].nextRevisionDueDate = tomorrow;
    existing[index].consecutiveCorrect = 0; // Reset consecutive correct streak on failure
    existing[index].isMastered = false;
  } else {
    existing.push({
      questionId: question.id,
      trackCode: question.trackCode,
      topic: question.topic,
      questionText: question.question,
      correctAnswer: question.correctOption,
      explanation: question.detailedExplanation,
      firstFailedAt: now.toISOString(),
      lastReviewedAt: now.toISOString(),
      nextRevisionDueDate: tomorrow,
      reviewStage: 1,
      consecutiveCorrect: 0,
      isMastered: false,
    });
  }

  localStorage.setItem('loopedu_mistake_notebook', JSON.stringify(existing));
}

export function recordMistakeReviewSuccess(questionId: string) {
  if (typeof window === 'undefined') return;

  const existing = getMistakeNotebook();
  const index = existing.findIndex((m) => m.questionId === questionId);
  if (index >= 0) {
    const entry = existing[index];
    const now = new Date();
    entry.lastReviewedAt = now.toISOString();
    entry.consecutiveCorrect += 1;

    // Advance spaced repetition interval (1d -> 3d -> 7d -> Mastered)
    if (entry.consecutiveCorrect >= 2) {
      entry.isMastered = true;
      entry.nextRevisionDueDate = 'MASTERED';
    } else {
      const daysToAdd = entry.reviewStage === 1 ? 3 : 7;
      entry.reviewStage += 1;
      entry.nextRevisionDueDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    }

    localStorage.setItem('loopedu_mistake_notebook', JSON.stringify(existing));
  }
}

export function generateWeeklyPlan(dailyMinutes: number = 30, restDay: string = 'Sunday'): DayPlan[] {
  const days: DayPlan['dayName'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date();

  return days.map((dayName, index) => {
    const dayDate = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
    const dateString = dayDate.toISOString().split('T')[0];
    const isRest = dayName.toLowerCase() === restDay.toLowerCase();

    if (isRest) {
      return {
        dayName,
        dateString,
        allocatedMinutes: 0,
        isRestDay: true,
        tasks: [
          {
            id: `task-rest-${dayName}`,
            type: 'REST_REFLECTION',
            title: 'Scheduled Recovery Day (Zero Guilt • Mind Coach Reflection)',
            estimatedMinutes: 0,
            isCompleted: false,
          },
        ],
      };
    }

    return {
      dayName,
      dateString,
      allocatedMinutes: dailyMinutes,
      isRestDay: false,
      tasks: [
        {
          id: `task-${dayName}-1`,
          type: 'DIAGNOSTIC_DRILL',
          title: 'Daily Diagnostic Micro-Set (5 Questions)',
          estimatedMinutes: Math.round(dailyMinutes * 0.6),
          isCompleted: false,
        },
        {
          id: `task-${dayName}-2`,
          type: 'MISTAKE_VAULT_RETRY',
          title: 'Spaced Recall Error Review',
          estimatedMinutes: Math.round(dailyMinutes * 0.4),
          isCompleted: false,
        },
      ],
    };
  });
}
