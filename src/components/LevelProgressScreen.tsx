import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import Header from './Header';
import { LEVELS, getLevelInfo, getLevelPlan, LevelInfo } from '../data/levels';
import { getProgress, canAdvanceToNextLevel, isPlanCompleted, completePlanDay, getPlanCompletionPercentage, getCurrentPlanDay, resetCurrentPlan } from '../utils/cookieManager';

interface LevelProgressScreenProps {
  onStartTest: () => void;
  onStartPlan: () => void;
  onBack: () => void;
}

const LevelProgressScreen: React.FC<LevelProgressScreenProps> = ({ onStartTest, onStartPlan, onBack }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getProgress());
  const [currentLevelInfo, setCurrentLevelInfo] = useState<LevelInfo | undefined>();
  const [planCompletion, setPlanCompletion] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'analysis'>('overview');

  useEffect(() => {
    const info = getLevelInfo(progress.currentLevel);
    setCurrentLevelInfo(info);
    setPlanCompletion(getPlanCompletionPercentage());
  }, [progress]);

  const canAdvance = canAdvanceToNextLevel();
  const planDone = isPlanCompleted();
  const levelPlan = getLevelPlan(progress.currentLevel);

  const getMoodFromLevel = (levelId: number): 'critical' | 'severe' | 'moderate' | 'mild' | 'healthy' => {
    if (levelId === 1) return 'critical';
    if (levelId === 2) return 'severe';
    if (levelId === 3) return 'moderate';
    if (levelId === 4) return 'mild';
    return 'healthy';
  };

  const handleRetakeTest = () => {
    resetCurrentPlan();
    onStartTest();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 50%, #0f1a2e 100%)' }}>

      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${currentLevelInfo?.color || '#8B5CF6'} 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>

      {/* Header */}
      <Header
        showLogo={true}
        showBack={true}
        onBack={onBack}
        rightContent={
          <div className="text-gray-400 text-sm font-bold">
            {t('المستوى', 'Level')} {progress.currentLevel}/5
          </div>
        }
      />

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-8 pb-8 max-w-2xl mx-auto w-full" style={{ marginTop: '-1px' }}>

        {/* Level card */}
        {currentLevelInfo && (
          <div className="w-full glass rounded-2xl p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                  {lang === 'ar' ? currentLevelInfo.name.ar : currentLevelInfo.name.en}
                </h1>
                <p className="text-gray-400">
                  {lang === 'ar' ? currentLevelInfo.description.ar : currentLevelInfo.description.en}
                </p>
              </div>
              <div className="text-6xl">{currentLevelInfo.emoji}</div>
            </div>

            {/* Previous score */}
            {progress.initialTestScore > 0 && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300 mb-1">
                  {t('النتيجة السابقة', 'Previous Score')}
                </p>
                <p className="text-lg font-bold text-blue-400">
                  {progress.initialTestScore} {t('نقطة', 'points')}
                </p>
              </div>
            )}

            {/* Score range */}
            <div className="mt-3 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">
                {t('نطاق الدرجات', 'Score Range')}
              </p>
              <p className="text-lg font-bold text-white">
                {currentLevelInfo.scoreRange.min} - {currentLevelInfo.scoreRange.max}
              </p>
            </div>
          </div>
        )}

        {/* Mascot */}
        <div className="mb-6">
          <BrainyMascot
            mood={getMoodFromLevel(progress.currentLevel)}
            size={140}
            animate={true}
          />
        </div>

        {/* Tabs */}
        <div className="w-full flex gap-2 mb-6">
          {['overview', 'plan', 'analysis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'overview' && t('نظرة عامة', 'Overview')}
              {tab === 'plan' && t('الخطة', 'Plan')}
              {tab === 'analysis' && t('التحليل', 'Analysis')}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="w-full space-y-4">
            {/* Motivation message */}
            <div className="glass rounded-xl p-4 border-l-4" style={{ borderColor: currentLevelInfo?.color }}>
              <p className="text-white leading-relaxed">
                {lang === 'ar' ? currentLevelInfo?.motivation.ar : currentLevelInfo?.motivation.en}
              </p>
            </div>

            {/* Progress stats */}
            <div className="grid grid-cols-2 gap-3">
              {/* Plan progress */}
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">
                  {t('تقدم الخطة', 'Plan Progress')}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-white">
                    {planCompletion}%
                  </span>
                  <span className="text-xs text-gray-500 mb-1">
                    ({progress.planCompletedDays.filter(d => d).length}/5)
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${planCompletion}%`,
                      background: `linear-gradient(90deg, ${currentLevelInfo?.color}, ${currentLevelInfo?.color}88)`
                    }}
                  />
                </div>
              </div>

              {/* Current day */}
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">
                  {t('اليوم الحالي', 'Current Day')}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-white">
                    {progress.currentPlanDay}
                  </span>
                  <span className="text-xs text-gray-500 mb-1">
                    /5
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {planCompletion === 100 
                    ? t('مكتمل ✓', 'Completed ✓')
                    : t('قيد التقدم', 'In Progress')
                  }
                </div>
              </div>
            </div>

            {/* Days completed details */}
            <div className="glass rounded-xl p-4">
              <p className="text-sm font-bold text-white mb-3">
                {t('أيام مكتملة', 'Completed Days')}
              </p>
              <div className="flex gap-2">
                {progress.planCompletedDays.map((completed, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 py-2 px-2 rounded-lg text-center text-sm font-bold transition-all ${
                      completed
                        ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 gap-3 mt-6">
              {!planDone ? (
                <button
                  onClick={onStartPlan}
                  className="py-3 px-4 rounded-lg font-bold transition-all glass hover:bg-white/10 text-white"
                >
                  {t('متابعة الخطة', 'Continue Plan')}
                </button>
              ) : (
                <button
                  onClick={handleRetakeTest}
                  className="py-3 px-4 rounded-lg font-bold transition-all text-white"
                  style={{ background: `linear-gradient(135deg, ${currentLevelInfo?.color}, ${currentLevelInfo?.color}88)` }}
                >
                  {t('إعادة الاختبار', 'Retake Test')}
                </button>
              )}
              {canAdvance && (
                <button
                  onClick={onStartTest}
                  className="py-3 px-4 rounded-lg font-bold transition-all bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                >
                  {t('المستوى التالي', 'Next Level')}
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'plan' && levelPlan && (
          <div className="w-full space-y-3">
            {levelPlan.days.map((day, idx) => (
              <div
                key={day.day}
                className="glass rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">
                      {t('اليوم', 'Day')} {day.day}: {lang === 'ar' ? day.title.ar : day.title.en}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {lang === 'ar' ? day.description.ar : day.description.en}
                    </p>
                  </div>
                  <div className="ml-4">
                    {progress.planCompletedDays[idx] ? (
                      <span className="text-2xl">✅</span>
                    ) : (
                      <span className="text-2xl">⭕</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="w-full space-y-4">
            {/* Personality analysis */}
            <div className="glass rounded-xl p-4">
              <h3 className="font-bold text-white mb-3">
                {t('تحليل الشخصية', 'Personality Analysis')}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {lang === 'ar' ? currentLevelInfo?.personalityAnalysis.ar : currentLevelInfo?.personalityAnalysis.en}
              </p>
            </div>

            {/* Improvements */}
            <div className="glass rounded-xl p-4">
              <h3 className="font-bold text-white mb-3">
                {t('نقاط التحسين', 'Areas for Improvement')}
              </h3>
              <ul className="space-y-2">
                {currentLevelInfo?.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>{lang === 'ar' ? improvement.ar : improvement.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LevelProgressScreen;
