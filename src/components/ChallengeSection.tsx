import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import { CHALLENGE_DAYS } from '../data/questions';

interface ChallengeSectionProps {
  onBack: () => void;
  userScore?: number;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onBack, userScore }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [completedDays, setCompletedDays] = useState<boolean[]>(() => {
    try {
      const stored = localStorage.getItem('dopastopp-challenge');
      return stored ? JSON.parse(stored) : [false, false, false, false, false];
    } catch { return [false, false, false, false, false]; }
  });
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  useEffect(() => {
    localStorage.setItem('dopastopp-challenge', JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (index: number) => {
    const newCompleted = [...completedDays];
    newCompleted[index] = !newCompleted[index];
    setCompletedDays(newCompleted);
  };

  const completedCount = completedDays.filter(Boolean).length;
  const allComplete = completedCount === 5;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 50%, #0f1a2e 100%)' }}>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Header */}
      <Header
        showLogo={true}
        showBack={true}
        onBack={onBack}
        rightContent={
          <div className="text-purple-400 font-bold text-sm">
            {completedCount}/5 {t('أيام', 'Days')}
          </div>
        }
      />

      <main className="relative z-10 flex-1 px-4 md:px-8 max-w-2xl mx-auto w-full pb-12" style={{ marginTop: '-1px' }}>
        {/* Title */}
        <div className="text-center mb-8 fade-in-up">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-3xl font-black text-white mb-2">
            {t('تحدي الـ5 أيام', '5-Day Detox Challenge')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('خمسة أيام لإعادة برمجة دماغك الرقمي', 'Five days to rewire your digital brain')}
          </p>
          {userScore !== undefined && (
            <div className="mt-3 inline-block glass px-4 py-1.5 rounded-full text-sm text-purple-300">
              {t(`نتيجتك: ${userScore}/68`, `Your score: ${userScore}/68`)}
            </div>
          )}
        </div>

        {/* Progress ring */}
        <div className="flex items-center justify-center mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="url(#prog-grad)" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - completedCount / 5)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{completedCount}</span>
              <span className="text-xs text-gray-400">{t('من 5', 'of 5')}</span>
            </div>
          </div>
        </div>

        {allComplete && (
          <div className="glass rounded-2xl p-6 mb-6 text-center pop-in"
            style={{ borderColor: 'rgba(16, 185, 129, 0.5)', background: 'rgba(16, 185, 129, 0.1)' }}>
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-xl font-black text-emerald-400 mb-1">
              {t('!أحسنت! أكملت التحدي', "Congratulations! Challenge Complete!")}
            </h2>
            <p className="text-gray-300 text-sm">
              {t(
                'دماغك الآن في طريقه للتعافي. استمر في هذه العادات الرائعة!',
                "Your brain is on the path to recovery. Keep up these amazing habits!"
              )}
            </p>
          </div>
        )}

        {/* Challenge days */}
        <div className="space-y-3">
          {CHALLENGE_DAYS.map((day, i) => {
            const isComplete = completedDays[i];
            const isExpanded = expandedDay === i;
            const isLocked = i > 0 && !completedDays[i - 1];

            return (
              <div
                key={day.day}
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 fade-in-up ${
                  isComplete ? 'border-emerald-500/40' : isLocked ? 'opacity-50' : ''
                }`}
                style={{ animationDelay: `${i * 0.1 + 0.3}s`, borderWidth: '1px', borderColor: isComplete ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.1)' }}
              >
                {/* Day header */}
                <div
                  className={`flex items-center gap-4 p-4 ${!isLocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={() => !isLocked && setExpandedDay(isExpanded ? null : i)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 ${
                    isComplete
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                      : isLocked
                        ? 'bg-white/5'
                        : 'bg-gradient-to-br from-purple-600 to-purple-800'
                  }`}>
                    {isComplete ? '✅' : isLocked ? '🔒' : day.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA' }}>
                        {t(`اليوم ${day.day}`, `Day ${day.day}`)}
                      </span>
                      {isLocked && <span className="text-xs text-gray-600">{t('أكمل اليوم السابق أولاً', 'Complete previous day first')}</span>}
                    </div>
                    <h3 className="font-black text-white mt-0.5">
                      {lang === 'ar' ? day.titleAr : day.titleEn}
                    </h3>
                  </div>
                  <span className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </div>

                {/* Expanded content */}
                {isExpanded && !isLocked && (
                  <div className="px-4 pb-5 border-t border-white/10 pt-4 fade-in-up">
                    <p className="text-gray-300 text-sm mb-3">
                      {lang === 'ar' ? day.descAr : day.descEn}
                    </p>
                    <div className="glass rounded-xl p-3 mb-4">
                      <p className="text-purple-300 text-xs italic">
                        {lang === 'ar' ? day.tipAr : day.tipEn}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleDay(i)}
                      className={`w-full py-3 rounded-xl text-sm font-black transition-all hover:scale-105 active:scale-95 ${
                        isComplete
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                          : 'text-white'
                      }`}
                      style={!isComplete ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
                    >
                      {isComplete
                        ? `✅ ${t('تم! اضغط للتراجع', 'Done! Click to undo')}`
                        : `✓ ${t('أنجزت هذا اليوم!', 'Mark as Complete!')}`
                      }
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Blog-like tips section */}
        <div className="mt-10">
          <h2 className="text-xl font-black text-white mb-4">
            📚 {t('موارد مفيدة', 'Helpful Resources')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: '🧠', titleEn: 'How to Fix Brain Rot in 30 Days', titleAr: 'كيف تعالج تعفن الدماغ في 30 يوماً', descEn: 'Science-backed steps to restore attention and fix brain fog.', descAr: 'خطوات علمية لاستعادة الانتباه وعلاج الضبابية الذهنية.' },
              { icon: '📵', titleEn: 'Digital Detox Benefits', titleAr: 'فوائد التخلص من الإدمان الرقمي', descEn: 'What happens to your brain when you unplug from TikTok and Reels.', descAr: 'ما يحدث لدماغك عندما تفصل الإنترنت وتتوقف عن تصفح تيك توك وريلز.' },
              { icon: '⚡', titleEn: 'Dopamine Detox Guide', titleAr: 'دليل ديتوكس الدوبامين', descEn: 'Reset your reward system naturally and stop mindless scrolling.', descAr: 'أعد ضبط نظام المكافأة بشكل طبيعي وتوقف عن التصفح اللاواعي.' },
              { icon: '🎯', titleEn: 'Improve Focus & Concentration', titleAr: 'تحسين التركيز والانتباه', descEn: 'Proven techniques for deep work and avoiding digital addiction.', descAr: 'تقنيات مثبتة للعمل العميق وتجنب الإدمان الرقمي.' },
            ].map((resource, i) => (
              <div key={i} className="glass rounded-xl p-4 card-hover">
                <div className="text-2xl mb-2">{resource.icon}</div>
                <div className="font-bold text-white text-sm mb-1">
                  {lang === 'ar' ? resource.titleAr : resource.titleEn}
                </div>
                <div className="text-gray-500 text-xs">
                  {lang === 'ar' ? resource.descAr : resource.descEn}
                </div>
                <div className="mt-2 text-xs text-purple-400 font-bold">
                  {t('قريباً →', 'Coming Soon →')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChallengeSection;
