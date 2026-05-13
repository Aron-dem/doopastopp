import React, { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import { QUESTIONS, SECTIONS, RESULT_LEVELS, ResultLevel } from '../data/questions';
import { setInitialTestScore, getProgress, setCurrentLevel } from '../utils/cookieManager';
import { determineLevelFromScore } from '../data/levels';

interface QuizSectionProps {
  onComplete: (score: number, answers: number[], result: ResultLevel) => void;
  onBack: () => void;
}

const SCALE_LABELS_EN = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
const SCALE_LABELS_AR = ['أبدًا', 'نادرًا', 'أحيانًا', 'غالبًا', 'دائمًا'];
const SCALE_LABELS_REVERSED_EN = ['Excellent', 'Good', 'Sometimes', 'Rarely', 'Never'];
const SCALE_LABELS_REVERSED_AR = ['ممتاز', 'جيد', 'أحيانًا', 'نادرًا', 'أبدًا'];

const SCALE_COLORS = [
  'from-emerald-600 to-emerald-500',   // 0
  'from-lime-600 to-lime-500',          // 1
  'from-yellow-600 to-yellow-500',      // 2
  'from-orange-600 to-orange-500',      // 3
  'from-red-600 to-red-500',            // 4
];

const SCALE_COLORS_REVERSED = [
  'from-red-600 to-red-500',            // 0 (Never = bad)
  'from-orange-600 to-orange-500',      // 1
  'from-yellow-600 to-yellow-500',      // 2
  'from-lime-600 to-lime-500',          // 3
  'from-emerald-600 to-emerald-500',    // 4 (Always = good)
];

const ENCOURAGEMENT_EN = [
  "Great start! Keep going! 🚀",
  "You're doing amazing! 💪",
  "Halfway there! Your brain thanks you! 🧠",
  "Almost done! Clarity awaits! ✨",
  "Last stretch! You've got this! 🎯",
];

const ENCOURAGEMENT_AR = [
  "!بداية رائعة! واصل 🚀",
  "!أنت تبلي بلاءً حسناً 💪",
  "!في المنتصف! دماغك يشكرك 🧠",
  "!شارفت على الإنتهاء! الوضوح ينتظرك ✨",
  "!اللحظات الأخيرة! أنت قادر 🎯",
];

function getBrainyMoodFromProgress(_progress: number, answers: number[]): 'critical' | 'severe' | 'moderate' | 'mild' | 'healthy' | 'thinking' {
  if (answers.length === 0) return 'thinking';
  const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
  if (avg >= 3.5) return 'critical';
  if (avg >= 2.5) return 'severe';
  if (avg >= 1.8) return 'moderate';
  if (avg >= 1) return 'mild';
  return 'healthy';
}

const QuizSection: React.FC<QuizSectionProps> = ({ onComplete, onBack }) => {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState('');
  const [brainyReaction, setBrainyReaction] = useState<string>('');

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const progressPct = (currentIndex / totalQuestions) * 100;
  const currentSection = SECTIONS.find(s => s.id === currentQuestion.section);
  const brainyMood = getBrainyMoodFromProgress(progressPct, answers);

  const sectionProgress = QUESTIONS.filter((_, i) => i < currentIndex && QUESTIONS[i].section === currentQuestion.section).length;
  const totalInSection = QUESTIONS.filter(q => q.section === currentQuestion.section).length;

  // Milestone indices for encouragement
  const milestones = [8, 15, 21, 27, 32];

  const handleAnswer = useCallback((value: number) => {
    if (animating) return;
    setSelected(value);
    setBrainyReaction(value >= 3 ? 'bad' : value === 0 ? 'good' : 'neutral');

    setTimeout(() => {
      const newAnswers = [...answers, value];

      // Check milestone
      if (milestones.includes(currentIndex)) {
        const mIdx = milestones.indexOf(currentIndex);
        setEncouragementText(lang === 'ar' ? ENCOURAGEMENT_AR[mIdx] : ENCOURAGEMENT_EN[mIdx]);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 2000);
      }

      if (currentIndex + 1 >= totalQuestions) {
        // Calculate score
        let score = 0;
        QUESTIONS.forEach((q, i) => {
          const ans = newAnswers[i];
          if (q.reversed) {
            score += (4 - ans); // reverse: 4=excellent => 0 points
          } else {
            score += ans;
          }
        });

        const result = RESULT_LEVELS.find(r => score >= r.min && score <= r.max) || RESULT_LEVELS[4];
        
        // حفظ النتائج في Cookies
        const progress = getProgress();
        if (!progress.hasCompletedInitialTest) {
          // هذا هو الاختبار الأولي
          setInitialTestScore(score, newAnswers);
          const levelId = determineLevelFromScore(score);
          setCurrentLevel(levelId);
        } else {
          // هذا اختبار مستوى
          const levelId = determineLevelFromScore(score);
          setCurrentLevel(levelId);
        }
        
        setAnimating(true);
        setTimeout(() => {
          onComplete(score, newAnswers, result);
        }, 600);
      } else {
        setAnimating(true);
        setTimeout(() => {
          setAnswers(newAnswers);
          setCurrentIndex(prev => prev + 1);
          setSelected(null);
          setAnimating(false);
          setBrainyReaction('');
        }, 450);
      }
    }, 400);
  }, [animating, answers, currentIndex, totalQuestions, lang, onComplete]);

  const isReversed = currentQuestion.reversed;
  const labels = lang === 'ar'
    ? (isReversed ? SCALE_LABELS_REVERSED_AR : SCALE_LABELS_AR)
    : (isReversed ? SCALE_LABELS_REVERSED_EN : SCALE_LABELS_EN);
  const colors = isReversed ? SCALE_COLORS_REVERSED : SCALE_COLORS;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 50%, #0f1a2e 100%)' }}>

      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${currentSection?.color || '#8B5CF6'} 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <span>←</span> {t('رجوع', 'Back')}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-lg">Dopastopp</span>
        </div>
        <div className="text-gray-400 text-sm font-bold">
          {currentIndex + 1} / {totalQuestions}
        </div>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 px-4 md:px-8 pb-4">
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar-fill rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* Section indicators */}
        <div className="flex justify-between mt-2">
          {SECTIONS.map((s) => {
            const sectionStart = QUESTIONS.findIndex(q => q.section === s.id);
            const isDone = currentIndex > sectionStart + (QUESTIONS.filter(q => q.section === s.id).length - 1);
            const isCurrent = currentQuestion.section === s.id;
            return (
              <div key={s.id} className={`text-xs font-bold transition-all duration-300 ${
                isCurrent ? 'text-white scale-110' : isDone ? 'text-purple-400' : 'text-gray-600'
              }`}>
                {s.icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-8 pb-8 max-w-2xl mx-auto w-full">

        {/* Section badge */}
        <div className="w-full mb-4 fade-in-up">
          <div className="section-badge glass"
            style={{ color: currentSection?.color, borderColor: `${currentSection?.color}40` }}>
            <span>{currentSection?.icon}</span>
            <span>{lang === 'ar' ? currentSection?.nameAr : currentSection?.nameEn}</span>
            <span className="text-gray-500">• {sectionProgress + 1}/{totalInSection}</span>
          </div>
        </div>

        {/* Brainy mascot with reaction */}
        <div className="relative mb-6 flex items-center justify-center">
          <BrainyMascot
            mood={brainyMood}
            size={120}
            animate={true}
          />
          {brainyReaction && (
            <div className="absolute -top-2 -right-4 pop-in text-2xl">
              {brainyReaction === 'bad' ? '😵' : brainyReaction === 'good' ? '🌟' : '🤔'}
            </div>
          )}
          {showEncouragement && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap glass rounded-full px-4 py-1.5 text-sm font-bold text-purple-300 pop-in">
              {encouragementText}
            </div>
          )}
        </div>

        {/* Question card */}
        <div
          key={currentIndex}
          className={`w-full glass rounded-2xl p-6 md:p-8 mb-6 ${animating ? 'opacity-0 -translate-x-8' : 'question-enter'}`}
          style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
        >
          {/* Question number badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ background: `linear-gradient(135deg, ${currentSection?.color}, ${currentSection?.color}88)` }}>
              {currentIndex + 1}
            </div>
            {isReversed && (
              <span className="text-xs glass px-2 py-0.5 rounded-full text-emerald-400 font-bold">
                {t('سؤال إيجابي ✓', 'Positive ✓')}
              </span>
            )}
          </div>

          <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">
            {lang === 'ar' ? currentQuestion.text.ar : currentQuestion.text.en}
          </p>
        </div>

        {/* Answer buttons */}
        <div className="w-full grid grid-cols-5 gap-2 md:gap-3">
          {[0, 1, 2, 3, 4].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              disabled={animating || selected !== null}
              className={`answer-btn flex flex-col items-center justify-center rounded-xl py-3 md:py-4 px-2 transition-all duration-200 relative overflow-hidden ${
                selected === value
                  ? `bg-gradient-to-br ${colors[value]} text-white scale-105 shadow-lg`
                  : 'glass text-gray-300 hover:text-white hover:scale-105'
              }`}
              style={selected === value ? { boxShadow: `0 0 20px ${currentSection?.color}60` } : {}}
            >
              <span className="text-xl md:text-2xl font-black mb-1">{value}</span>
              <span className="text-[10px] md:text-xs text-center leading-tight font-medium opacity-80">
                {labels[value]}
              </span>
              {selected === value && (
                <span className="absolute inset-0 flex items-center justify-center text-2xl pop-in opacity-30">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Scale hint */}
        <div className="mt-4 flex justify-between w-full px-1 text-xs text-gray-600">
          <span>
            {isReversed
              ? t('← أبدًا', '← Never')
              : t('← أبدًا', '← Never')
            }
          </span>
          <span>
            {isReversed
              ? t('ممتاز →', 'Excellent →')
              : t('دائمًا →', 'Always →')
            }
          </span>
        </div>

        {/* Skip question (optional) */}
        <button
          onClick={() => handleAnswer(0)}
          className="mt-4 text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          {t('تخطي السؤال', 'Skip question')}
        </button>
      </main>
    </div>
  );
};

export default QuizSection;
