export interface TestQuestion {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

export interface TestResult {
  min: number;
  max: number;
  title: string;
  desc: string;
  recommendations: string[];
}

export interface TestData {
  id: string;
  title: string;
  intro: string;
  questions: TestQuestion[];
  results: TestResult[];
}

import { QUESTIONS, RESULT_LEVELS } from './questions';

export const ALL_TESTS: Record<string, TestData> = {
  'brain-rot': {
    id: 'brain-rot',
    title: 'اختبار تعفن الدماغ (Brain Rot Test)',
    intro: 'الاختبار الشامل لقياس مدى تأثير العالم الرقمي على صحتك العقلية وتركيزك.',
    questions: QUESTIONS.map(q => ({
      id: q.id,
      text: q.text.ar,
      options: [
        { text: 'أبداً', score: 0 },
        { text: 'نادراً', score: 1 },
        { text: 'أحياناً', score: 2 },
        { text: 'غالبًا', score: 3 },
        { text: 'دائمًا', score: 4 }
      ]
    })),
    results: RESULT_LEVELS.map(r => ({
      min: r.min,
      max: r.max,
      title: r.title.ar,
      desc: r.desc.ar,
      recommendations: [] // Recommendations are usually handled in results component or can be added here
    }))
  }
};
