import { PostTestQuestion, TGTTeam } from '../types/biology';

export interface BinomialValidationResult {
  isValid: boolean;
  genus: string;
  species: string;
  messages: string[];
}

/**
 * Validates scientific binomial nomenclature syntax according to Carolus Linnaeus rules.
 * Rule: exactly 2 words (Genus and specific epithet).
 * Genus starts with Uppercase, remaining lowercase.
 * Species epithet is all lowercase.
 */
export function validateBinomialNomenclature(input: string): BinomialValidationResult {
  const trimmed = input.trim();
  const words = trimmed.split(/\s+/);
  const messages: string[] = [];

  if (words.length !== 2) {
    messages.push(`Nama binomial harus terdiri dari tepat 2 kata (Genus dan penunjuk spesies). Terdeteksi ${words.length} kata.`);
    return {
      isValid: false,
      genus: words[0] || '',
      species: words.slice(1).join(' ') || '',
      messages,
    };
  }

  const [genus, species] = words;

  // Check Genus format: First uppercase, rest letters
  const genusFirstUpper = /^[A-Z][a-z]*$/.test(genus);
  if (!genusFirstUpper) {
    messages.push(`Genus "${genus}" harus diawali huruf KAPITAL dan diikuti huruf kecil.`);
  }

  // Check Species format: All lowercase letters
  const speciesAllLower = /^[a-z]+$/.test(species);
  if (!speciesAllLower) {
    messages.push(`Penunjuk spesies "${species}" harus ditulis seluruhnya dalam huruf KECIL.`);
  }

  const isValid = messages.length === 0;
  if (isValid) {
    messages.push(`Format penulisan benar! Dalam teks cetak harus dicetak miring (${genus} ${species}) atau digarisbawahi secara terpisah.`);
  }

  return {
    isValid,
    genus,
    species,
    messages,
  };
}

/**
 * Traverses a dichotomous key based on an array of selected step codes (e.g. ['1a', '2b'])
 */
export interface DichotomyStep {
  id: string; // e.g. "1"
  codeA: string; // "1a"
  textA: string;
  targetA: string; // "2" or organism name
  codeB: string; // "1b"
  textB: string;
  targetB: string; // "3" or organism name
}

export function traceDichotomousKey(
  choices: string[],
  keyMap: Record<string, DichotomyStep>
): {
  finalOrganism: string | null;
  path: { stepId: string; choiceCode: string; text: string }[];
  currentStepId: string | null;
  isComplete: boolean;
} {
  let currentStepId: string | null = '1';
  const path: { stepId: string; choiceCode: string; text: string }[] = [];

  for (const choice of choices) {
    if (!currentStepId || !keyMap[currentStepId]) break;
    const step: DichotomyStep = keyMap[currentStepId];

    if (choice === step.codeA) {
      path.push({ stepId: currentStepId, choiceCode: step.codeA, text: step.textA });
      if (isNaN(Number(step.targetA))) {
        // reached an organism!
        return {
          finalOrganism: step.targetA,
          path,
          currentStepId: null,
          isComplete: true,
        };
      } else {
        currentStepId = step.targetA;
      }
    } else if (choice === step.codeB) {
      path.push({ stepId: currentStepId, choiceCode: step.codeB, text: step.textB });
      if (isNaN(Number(step.targetB))) {
        // reached an organism!
        return {
          finalOrganism: step.targetB,
          path,
          currentStepId: null,
          isComplete: true,
        };
      } else {
        currentStepId = step.targetB;
      }
    }
  }

  return {
    finalOrganism: null,
    path,
    currentStepId,
    isComplete: false,
  };
}

/**
 * Calculates post-test results with KKM score and breakdown per session
 */
export interface PostTestAnalysis {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  score: number; // 0 - 100
  isPassed: boolean; // KKM 75
  topicBreakdown: {
    'Pertemuan 1': { total: number; correct: number; percentage: number };
    'Pertemuan 2': { total: number; correct: number; percentage: number };
    'Pertemuan 3': { total: number; correct: number; percentage: number };
  };
}

export function calculatePostTestScore(
  userAnswers: Record<number, number>,
  questions: PostTestQuestion[],
  passingGrade = 75
): PostTestAnalysis {
  let correctCount = 0;
  let answeredCount = 0;

  const topicBreakdown = {
    'Pertemuan 1': { total: 0, correct: 0, percentage: 0 },
    'Pertemuan 2': { total: 0, correct: 0, percentage: 0 },
    'Pertemuan 3': { total: 0, correct: 0, percentage: 0 },
  };

  for (const q of questions) {
    topicBreakdown[q.materi].total += 1;
    if (userAnswers[q.id] !== undefined) {
      answeredCount++;
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
        topicBreakdown[q.materi].correct += 1;
      }
    }
  }

  // Calculate percentages
  for (const key of Object.keys(topicBreakdown) as Array<keyof typeof topicBreakdown>) {
    const topic = topicBreakdown[key];
    topic.percentage = topic.total > 0 ? Math.round((topic.correct / topic.total) * 100) : 0;
  }

  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassed = score >= passingGrade;

  return {
    totalQuestions: questions.length,
    answeredCount,
    correctCount,
    wrongCount: questions.length - correctCount,
    score,
    isPassed,
    topicBreakdown,
  };
}

/**
 * TGT Team tournament score updates and ranking
 */
export function awardTGTPoints(
  teams: TGTTeam[],
  targetTeamId: number,
  points: number,
  isCorrect: boolean
): TGTTeam[] {
  return teams.map((team) => {
    if (team.id !== targetTeamId) return team;
    if (isCorrect) {
      const newStreak = team.streak + 1;
      // Bonus 50 points if streak >= 3
      const bonus = newStreak >= 3 ? 50 : 0;
      return {
        ...team,
        score: Math.max(0, team.score + points + bonus),
        streak: newStreak,
      };
    } else {
      return {
        ...team,
        score: Math.max(0, team.score - Math.floor(points / 2)),
        streak: 0,
      };
    }
  });
}

export function rankTGTTeams(teams: TGTTeam[]): TGTTeam[] {
  return [...teams].sort((a, b) => b.score - a.score || a.id - b.id);
}
