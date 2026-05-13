import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import Header from './Header';
import { QUESTIONS, SECTIONS, ResultLevel, RESULT_LEVELS } from '../data/questions';
import { setInitialTestScore, setCurrentLevel } from '../utils/cookieManager';
import { determineLevelFromScore } from '../data/levels';

interface QuizSectionProps {
  onComplete: (score: number, answers: number[], result: ResultLevel, brainRotPcnt: number) => void;
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
  "Great start! 🚀",
  "You're amazing! 💪",
  "Halfway there! 🧠",
  "Almost done! ✨",
  "Last stretch! 🎯",
];

const ENCOURAGEMENT_AR = [
  "!بداية رائعة 🚀",
  "!أنت رائع 💪",
  "!في المنتصف 🧠",
  "!شارفت على الإنتهاء ✨",
  "!اللحظات الأخيرة 🎯",
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
  
  // Load initial state from localStorage
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('dopastopp_quiz_index');
    return saved ? parseInt(saved) : 0;
  });
  const [answers, setAnswers] = useState<number[]>(() => {
    const saved = localStorage.getItem('dopastopp_quiz_answers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState('');
  
  // Ad State
  const [showAd, setShowAd] = useState(false);
  const [adQuestions, setAdQuestions] = useState<number[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex] || QUESTIONS[0];
  const progressPct = (currentIndex / totalQuestions) * 100;
  const currentSection = SECTIONS.find(s => s.id === currentQuestion.section);
  const brainyMood = getBrainyMoodFromProgress(progressPct, answers);

  const sectionProgress = QUESTIONS.filter((_, i) => i < currentIndex && QUESTIONS[i].section === currentQuestion.section).length;
  const totalInSection = QUESTIONS.filter(q => q.section === currentQuestion.section).length;

  // Milestone indices for encouragement
  const milestones = [4, 8, 11, 14, 16];
  
  // Ad indices
  const midIndex = Math.floor(totalQuestions / 2);
  const preLastIndex = totalQuestions - 2;

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dopastopp_quiz_index', currentIndex.toString());
    localStorage.setItem('dopastopp_quiz_answers', JSON.stringify(answers));
  }, [currentIndex, answers]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Pick 2 random questions for ads
    const indices = [];
    while(indices.length < 2) {
      const r = Math.floor(Math.random() * totalQuestions);
      if(!indices.includes(r)) indices.push(r);
    }
    setAdQuestions(indices);
  }, [totalQuestions]);

  const handleAnswer = useCallback((value: number, isAd: boolean = false) => {
    if (animating) return;
    
    if (isAd) {
      const newAnswers = [...answers];
      const finalValue = value === -1 ? 2 : value; 
      newAnswers.push(finalValue);
      
      setShowAd(false);
      setAnswers(newAnswers);
      
      if (currentIndex + 1 >= totalQuestions) {
        completeQuiz(newAnswers);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setAnimating(false);
      }
      return;
    }

    setSelected(value);

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = value;

      // Check milestone
      if (milestones.includes(currentIndex)) {
        const mIdx = milestones.indexOf(currentIndex);
        setEncouragementText(lang === 'ar' ? ENCOURAGEMENT_AR[mIdx] : ENCOURAGEMENT_EN[mIdx]);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 1500);
      }

      // Check if next should be an ad
      const nextIndex = currentIndex + 1;
      if (nextIndex === midIndex || nextIndex === preLastIndex) {
        setAnswers(newAnswers);
        setShowAd(true);
        setCurrentAdIndex(nextIndex === midIndex ? 0 : 1);
        setSelected(null);
        return;
      }

      if (nextIndex >= totalQuestions) {
        completeQuiz(newAnswers);
      } else {
        setAnimating(true);
        setTimeout(() => {
          setAnswers(newAnswers);
          setCurrentIndex(nextIndex);
          setSelected(null);
          setAnimating(false);
        }, 300);
      }
    }, 300);
  }, [animating, answers, currentIndex, totalQuestions, lang, midIndex, preLastIndex]);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelected(answers[currentIndex - 1] ?? null);
    } else {
      onBack();
    }
  };

  const completeQuiz = (finalAnswers: number[]) => {
    let score = 0;
    QUESTIONS.forEach((q, i) => {
      const ans = finalAnswers[i] ?? 0;
      if (q.reversed) {
        score += (4 - ans);
      } else {
        score += ans;
      }
    });

    const MAX_POSSIBLE_SCORE = totalQuestions * 4;
    const brainRotPcnt = Math.round((score / MAX_POSSIBLE_SCORE) * 100);
    const result = RESULT_LEVELS.find((r: any) => score >= r.min && score <= r.max) || RESULT_LEVELS[4];
    
    setInitialTestScore(score, finalAnswers);
    const levelId = determineLevelFromScore(score);
    setCurrentLevel(levelId);
    
    // Clear quiz progress on completion
    localStorage.removeItem('dopastopp_quiz_index');
    localStorage.removeItem('dopastopp_quiz_answers');
    
    setAnimating(true);
    setTimeout(() => {
      onComplete(score, finalAnswers, result, brainRotPcnt);
    }, 600);
  };

  const isReversed = currentQuestion.reversed;
  const labels = lang === 'ar'
    ? (isReversed ? SCALE_LABELS_REVERSED_AR : SCALE_LABELS_AR)
    : (isReversed ? SCALE_LABELS_REVERSED_EN : SCALE_LABELS_EN);
  const colors = isReversed ? SCALE_COLORS_REVERSED : SCALE_COLORS;

  if (showAd) {
    const adQIdx = adQuestions[currentAdIndex];
    const adQuestion = QUESTIONS[adQIdx] || QUESTIONS[0];
    const adIsReversed = adQuestion.reversed;
    const adLabels = lang === 'ar'
      ? (adIsReversed ? SCALE_LABELS_REVERSED_AR : SCALE_LABELS_AR)
      : (adIsReversed ? SCALE_LABELS_REVERSED_EN : SCALE_LABELS_EN);
    const adColors = adIsReversed ? SCALE_COLORS_REVERSED : SCALE_COLORS;

    const companies = ['TikTok', 'Instagram', 'Facebook', 'Snapchat', 'Netflix', 'YouTube'];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black/95 z-50 fixed inset-0 backdrop-blur-md">
        <div className="glass max-w-md w-full p-6 md:p-8 rounded-3xl border-2 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-red-500/30 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {t('تنبيه', 'Warning')}
            </div>
            
            <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">
              {t(`إعلان من ${randomCompany}`, `Ad from ${randomCompany}`)}
            </h2>
            <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed">
              {t('أثبت قوة إرادتك!', 'Prove your willpower!')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-4 md:p-6 mb-6 border border-white/10 relative overflow-hidden group">
            <p className="text-base md:text-lg font-bold text-white text-center leading-relaxed">
              {lang === 'ar' ? adQuestion.text.ar : adQuestion.text.en}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[0, 1, 2, 3, 4].map((v) => (
              <button
                key={v}
                onClick={() => handleAnswer(v, true)}
                className={`flex flex-col items-center justify-center rounded-xl py-2 md:py-3 transition-all hover:scale-105 active:scale-95 bg-gradient-to-br ${adColors[v]} text-white shadow-lg`}
              >
                <span className="font-black text-lg md:text-xl">{v}</span>
                <span className="text-[7px] md:text-[8px] uppercase font-black opacity-80 text-center px-1 leading-tight">{adLabels[v]}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => handleAnswer(-1, true)}
            className="w-full py-2 md:py-3 rounded-xl border border-white/10 text-gray-500 text-xs font-bold hover:bg-white/5 transition-colors"
          >
            {t('تخطي', 'Skip')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0A1E] text-white flex flex-col">
      {/* Header - Compact with Logo */}
      <div className="sticky top-0 z-30 bg-[#0D0A1E]/80 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={handleBack}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors flex-shrink-0"
            >
              <span className="text-xl">←</span>
            </button>
            <div className="text-center flex-1 mx-2">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
                {lang === 'ar' ? currentSection?.nameAr : currentSection?.nameEn}
              </span>
            </div>
            <div className="text-xs font-bold text-gray-500 flex-shrink-0">
              {currentIndex + 1}/{totalQuestions}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">
        {/* Mascot - Compact and sticky-like */}
        <div className="flex justify-center mb-4 flex-shrink-0">
          <div className={`transition-all duration-300 ${animating ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}>
            <BrainyMascot mood={brainyMood} size={100} animate={true} />
          </div>
        </div>

        {/* Encouragement message */}
        {showEncouragement && (
          <div className="text-center mb-3 flex-shrink-0 animate-bounce">
            <span className="text-sm font-black text-purple-300">{encouragementText}</span>
          </div>
        )}

        {/* Question Card - Minimal padding */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ${animating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="glass rounded-2xl p-5 border border-white/10 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-center leading-relaxed">
              {lang === 'ar' ? currentQuestion.text.ar : currentQuestion.text.en}
            </h2>
          </div>

          {/* Answer buttons - Grid optimized for mobile */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((v) => (
              <button
                key={v}
                onClick={() => handleAnswer(v)}
                className={`group relative flex flex-col items-center justify-center rounded-lg p-2 md:p-3 transition-all duration-200 hover:scale-105 active:scale-95 ${
                  selected === v 
                    ? `bg-gradient-to-br ${colors[v]} shadow-[0_0_20px_rgba(255,255,255,0.1)]` 
                    : 'bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <span className={`text-xl md:text-2xl font-black mb-0.5 transition-colors ${selected === v ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {v}
                </span>
                <span className={`text-[8px] md:text-[9px] font-black uppercase text-center leading-tight transition-colors ${selected === v ? 'text-white/90' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {labels[v]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center text-gray-600 text-[9px] font-black uppercase tracking-[0.15em] flex-shrink-0">
          {t('أجب بصدق', 'Answer Honestly')}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
