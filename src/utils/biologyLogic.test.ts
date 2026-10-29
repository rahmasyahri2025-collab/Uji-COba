import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBinomialNomenclature,
  traceDichotomousKey,
  calculatePostTestScore,
  awardTGTPoints,
  rankTGTTeams,
  DichotomyStep,
} from './biologyLogic';
import { PostTestQuestion, TGTTeam } from '../types/biology';

test('validateBinomialNomenclature validates correct Linnaeus format', () => {
  const result = validateBinomialNomenclature('Homo sapiens');
  assert.equal(result.isValid, true);
  assert.equal(result.genus, 'Homo');
  assert.equal(result.species, 'sapiens');
});

test('validateBinomialNomenclature rejects single word or lowercase genus', () => {
  const single = validateBinomialNomenclature('Panthera');
  assert.equal(single.isValid, false);

  const lowerGenus = validateBinomialNomenclature('felis catus');
  assert.equal(lowerGenus.isValid, false);

  const upperSpecies = validateBinomialNomenclature('Panthera Tigris');
  assert.equal(upperSpecies.isValid, false);
});

test('traceDichotomousKey navigates accurately to animal name', () => {
  const sampleKey: Record<string, DichotomyStep> = {
    '1': {
      id: '1',
      codeA: '1a',
      textA: 'Bertulang belakang (Vertebrata)',
      targetA: '2',
      codeB: '1b',
      textB: 'Tidak bertulang belakang (Avertebrata)',
      targetB: 'Kupu-kupu',
    },
    '2': {
      id: '2',
      codeA: '2a',
      textA: 'Tubuh ditutupi rambut dan menyusui',
      targetA: 'Kucing',
      codeB: '2b',
      textB: 'Tubuh tidak ditutupi rambut',
      targetB: '3',
    },
  };

  const res1 = traceDichotomousKey(['1b'], sampleKey);
  assert.equal(res1.isComplete, true);
  assert.equal(res1.finalOrganism, 'Kupu-kupu');

  const res2 = traceDichotomousKey(['1a', '2a'], sampleKey);
  assert.equal(res2.isComplete, true);
  assert.equal(res2.finalOrganism, 'Kucing');

  const res3 = traceDichotomousKey(['1a'], sampleKey);
  assert.equal(res3.isComplete, false);
  assert.equal(res3.currentStepId, '2');
});

test('calculatePostTestScore computes KKM and session breakdown', () => {
  const sampleQuestions: PostTestQuestion[] = [
    {
      id: 1,
      materi: 'Pertemuan 1',
      topicDetail: 'Ciri Hidup',
      question: 'Q1',
      options: ['A', 'B'],
      correctIndex: 0,
      explanation: 'Exp1',
    },
    {
      id: 2,
      materi: 'Pertemuan 1',
      topicDetail: 'Kunci Determinasi',
      question: 'Q2',
      options: ['A', 'B'],
      correctIndex: 1,
      explanation: 'Exp2',
    },
    {
      id: 3,
      materi: 'Pertemuan 2',
      topicDetail: 'Takson',
      question: 'Q3',
      options: ['A', 'B'],
      correctIndex: 0,
      explanation: 'Exp3',
    },
    {
      id: 4,
      materi: 'Pertemuan 3',
      topicDetail: '6 Kingdom',
      question: 'Q4',
      options: ['A', 'B'],
      correctIndex: 1,
      explanation: 'Exp4',
    },
  ];

  // Answer Q1 correct, Q2 wrong, Q3 correct, Q4 correct (3 out of 4 = 75%)
  const userAnswers = { 1: 0, 2: 0, 3: 0, 4: 1 };
  const res = calculatePostTestScore(userAnswers, sampleQuestions, 75);

  assert.equal(res.totalQuestions, 4);
  assert.equal(res.correctCount, 3);
  assert.equal(res.score, 75);
  assert.equal(res.isPassed, true);
  assert.equal(res.topicBreakdown['Pertemuan 1'].percentage, 50);
  assert.equal(res.topicBreakdown['Pertemuan 2'].percentage, 100);
  assert.equal(res.topicBreakdown['Pertemuan 3'].percentage, 100);
});

test('awardTGTPoints and rankTGTTeams correctly updates streaks and orders', () => {
  const initialTeams: TGTTeam[] = [
    { id: 1, name: 'Tim A', badge: '🦁', score: 100, members: '', streak: 0 },
    { id: 2, name: 'Tim B', badge: '🦅', score: 200, members: '', streak: 2 },
  ];

  // Team 2 answers correctly with streak 2 -> new streak 3 -> +50 bonus!
  const updated = awardTGTPoints(initialTeams, 2, 100, true);
  const team2 = updated.find((t) => t.id === 2);
  assert.equal(team2?.streak, 3);
  assert.equal(team2?.score, 350); // 200 + 100 + 50 streak bonus

  const ranked = rankTGTTeams(updated);
  assert.equal(ranked[0].id, 2);
  assert.equal(ranked[1].id, 1);
});

test('POST_TEST_QUESTIONS contains exactly 30 questions evenly distributed', async () => {
  const { POST_TEST_QUESTIONS, TARGET_ORGANISMS_EXPLORER, DICHOTOMOUS_KEY_DATABASE } = await import('../data/biologyData');
  assert.equal(POST_TEST_QUESTIONS.length, 30);
  
  const p1 = POST_TEST_QUESTIONS.filter((q) => q.materi === 'Pertemuan 1');
  const p2 = POST_TEST_QUESTIONS.filter((q) => q.materi === 'Pertemuan 2');
  const p3 = POST_TEST_QUESTIONS.filter((q) => q.materi === 'Pertemuan 3');
  assert.equal(p1.length, 10);
  assert.equal(p2.length, 10);
  assert.equal(p3.length, 10);

  // Check all options are 4 choices and correctIndex in range [0, 3]
  for (const q of POST_TEST_QUESTIONS) {
    assert.equal(q.options.length, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
  }

  // Check target organisms can be resolved in dichotomous key
  for (const target of TARGET_ORGANISMS_EXPLORER) {
    const res = traceDichotomousKey(target.kunciJawaban, DICHOTOMOUS_KEY_DATABASE);
    assert.equal(res.isComplete, true);
    assert.equal(res.finalOrganism, target.name);
  }
});

