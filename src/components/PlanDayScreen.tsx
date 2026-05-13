import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import Header from './Header';
import { getLevelPlan } from '../data/levels';
import { getProgress, completePlanDay, setCurrentPlanDay } from '../utils/cookieManager';

interface PlanDayScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const PlanDayScreen: React.FC<PlanDayScreenProps> = ({ onComplete, onBack }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getProgress());
  const [currentDay, setCurrentDay] = useState(progress.currentPlanDay);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);
  const [dayCompleted, setDayCompleted] = useState(progress.planCompletedDays[currentDay - 1]);
  const [showCelebration, setShowCelebration] = useState(false);

  const levelPlan = getLevelPlan(progress.currentLevel);
  const dayPlan = levelPlan?.days.find(d => d.day === currentDay);

  const handleCompleteDay = () => {
    completePlanDay(currentDay - 1);
    setDayCompleted(true);
    setShowCelebration(true);

    setTimeout(() => {
      if (currentDay < 5) {
        setCurrentPlanDay(currentDay + 1);
        setCurrentDay(currentDay + 1);
        setDayCompleted(false);
        setShowCelebration(false);
      } else {
        // انتهت جميع الأيام
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 2000);
  };

  const handleNextDay = () => {
    if (currentDay < 5) {
      setCurrentDay(currentDay + 1);
      setDayCompleted(progress.planCompletedDays[currentDay]);
      setExpandedActivity(null);
    }
  };

  const handlePrevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setDayCompleted(progress.planCompletedDays[currentDay - 2]);
      setExpandedActivity(null);
    }
  };

  if (!dayPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{t('لم يتم العثور على الخطة', 'Plan not found')}</p>
          <button onClick={onBack} className="text-purple-400 hover:text-purple-300">
            {t('رجوع', 'Back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 50%, #0f1a2e 100%)' }}>

      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Celebration confetti */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animation: `fall 2s ease-in forwards`,
                animationDelay: `${i * 0.1}s`,
                fontSize: '2rem'
              }}
            >
              {['🎉', '✨', '🌟', '💪', '🚀'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <Header
        showLogo={true}
        showBack={true}
        onBack={onBack}
        rightContent={
          <div className="text-gray-400 text-sm font-bold">
            {t('اليوم', 'Day')} {currentDay}/5
          </div>
        }
      />

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-8 pb-8 max-w-2xl mx-auto w-full" style={{ marginTop: '-1px' }}>

        {/* Day header */}
        <div className="w-full glass rounded-2xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {lang === 'ar' ? dayPlan.title.ar : dayPlan.title.en}
          </h1>
          <p className="text-gray-400">
            {lang === 'ar' ? dayPlan.description.ar : dayPlan.description.en}
          </p>
        </div>

        {/* Mascot */}
        <div className="mb-6">
          <BrainyMascot
            mood={dayCompleted ? 'healthy' : 'thinking'}
            size={140}
            animate={true}
          />
        </div>

        {/* Activities */}
        <div className="w-full space-y-3 mb-6">
          <h2 className="font-bold text-white text-lg mb-3">
            {t('الأنشطة', 'Activities')}
          </h2>
          {dayPlan.activities.map((activity, idx) => (
            <div
              key={idx}
              className="glass rounded-xl overflow-hidden cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => setExpandedActivity(expandedActivity === idx ? null : idx)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">
                      {lang === 'ar' ? activity.title.ar : activity.title.en}
                    </h3>
                    <p className="text-sm text-gray-400">
                      ⏱️ {activity.duration}
                    </p>
                  </div>
                  <span className="text-gray-400 text-xl">
                    {expandedActivity === idx ? '▼' : '▶'}
                  </span>
                </div>
                {expandedActivity === idx && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-gray-300">
                      {lang === 'ar' ? activity.description.ar : activity.description.en}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="w-full glass rounded-xl p-4 mb-6">
          <h2 className="font-bold text-white mb-3">
            {t('نصائح مهمة', 'Important Tips')}
          </h2>
          <ul className="space-y-2">
            {dayPlan.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-purple-400 mt-0.5">💡</span>
                <span>{lang === 'ar' ? tip.ar : tip.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenge */}
        <div className="w-full glass rounded-xl p-4 mb-6 border-l-4 border-purple-500">
          <h2 className="font-bold text-white mb-2">
            {t('التحدي اليومي', 'Daily Challenge')}
          </h2>
          <p className="text-gray-300">
            {lang === 'ar' ? dayPlan.challenge.ar : dayPlan.challenge.en}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">{t('تقدم اليوم', 'Day Progress')}</span>
            <span className="text-sm text-gray-400">{currentDay}/5</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
              style={{ width: `${(currentDay / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex gap-3">
          <button
            onClick={handlePrevDay}
            disabled={currentDay === 1}
            className="flex-1 py-3 px-4 rounded-lg font-bold transition-all glass hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('السابق', 'Previous')}
          </button>

          {!dayCompleted ? (
            <button
              onClick={handleCompleteDay}
              className="flex-1 py-3 px-4 rounded-lg font-bold transition-all text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg"
            >
              {t('أكمل اليوم', 'Complete Day')}
            </button>
          ) : (
            <button
              onClick={handleNextDay}
              disabled={currentDay === 5}
              className="flex-1 py-3 px-4 rounded-lg font-bold transition-all bg-gradient-to-r from-green-600 to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentDay === 5 ? t('انتهيت!', 'Done!') : t('التالي', 'Next')}
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PlanDayScreen;
