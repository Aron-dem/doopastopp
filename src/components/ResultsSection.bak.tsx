import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import { ResultLevel, QUESTIONS, SECTIONS, CHALLENGE_DAYS } from '../data/questions';

interface ResultsSectionProps {
  score: number;
  answers: number[];
  result: ResultLevel;
  onRetake: () => void;
  onStartChallenge: () => void;
}

const MAX_SCORE = 132;

// Section analysis
function getSectionScores(answers: number[]) {
  return SECTIONS.map(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.section === section.id);
    const sectionAnswers = sectionQuestions.map((q) => {
      const idx = QUESTIONS.indexOf(q);
      const ans = answers[idx] ?? 0;
      return q.reversed ? (4 - ans) : ans;
    });
    const max = sectionAnswers.length * 4;
    const total = sectionAnswers.reduce((a, b) => a + b, 0);
    return {
      ...section,
      score: total,
      max,
      percent: Math.round((total / max) * 100),
    };
  });
}

const TIPS_EN: Record<string, string[]> = {
  healthy: ['Continue your excellent habits and inspire others!', 'Explore advanced mindfulness techniques.', 'Share your digital wellness journey.'],
  mild: ['Set app usage time limits using built-in tools.', 'Practice 10-min daily phone-free periods.', 'Replace 1 daily scroll session with a walk.'],
  moderate: ['Delete the most addictive app for 7 days.', 'Enable grayscale mode on your phone.', 'Start the 5-Day Dopastopp Challenge NOW.', 'Try the Pomodoro technique for work sessions.'],
  severe: ['Immediately turn off all non-essential notifications.', 'Place your phone in another room at night.', 'Replace first 30 mins of morning scrolling with reading.', 'Use website blockers during work hours.', 'Start the 5-Day Challenge — this is urgent!'],
  critical: ['URGENT: Phone-free zones in your home starting today.', 'Delete 3 most addictive apps right now.', 'Seek a digital detox accountability partner.', 'Read "Digital Minimalism" by Cal Newport.', 'The 5-Day Challenge could be life-changing for you!'],
};

const TIPS_AR: Record<string, string[]> = {
  healthy: ['!واصل عاداتك الرائعة وكن مصدر إلهام للآخرين', 'استكشف تقنيات اليقظة الذهنية المتقدمة.', 'شارك رحلتك في الصحة الرقمية.'],
  mild: ['حدد وقت استخدام التطبيقات باستخدام الأدوات المدمجة.', 'مارس فترات 10 دقائق يومياً بدون هاتف.', 'استبدل جلسة تصفح واحدة يومياً بنزهة.'],
  moderate: ['احذف التطبيق الأكثر إدماناً لمدة 7 أيام.', 'فعّل وضع الألوان الرمادية على هاتفك.', 'ابدأ تحدي الـ5 أيام دوباستوب الآن.', 'جرب تقنية بومودورو لجلسات العمل.'],
  severe: ['أوقف جميع الإشعارات غير الضرورية فوراً.', 'ضع هاتفك في غرفة أخرى ليلاً.', 'استبدل أول 30 دقيقة صباحية من التصفح بالقراءة.', 'استخدم حاجبات المواقع أثناء ساعات العمل.', '!ابدأ التحدي الـ5 أيام — هذا أمر عاجل'],
  critical: ['عاجل: مناطق خالية من الهاتف في منزلك اعتباراً من اليوم.', 'احذف 3 تطبيقات الأكثر إدماناً الآن.', 'ابحث عن شريك مساءلة للتخلص من الإدمان الرقمي.', 'اقرأ "الحد الأدنى الرقمي" لكال نيوبورت.', '!تحدي الـ5 أيام قد يغير حياتك'],
};

// Confetti component
const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'][Math.floor(Math.random() * 5)],
    size: `${6 + Math.random() * 8}px`,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  score, answers, result, onRetake, onStartChallenge
}) => {
  const { lang, t } = useLanguage();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'results' | 'breakdown' | 'challenge'>('results');

  const sectionScores = getSectionScores(answers);
  const percentage = Math.round((score / MAX_SCORE) * 100);
  const tips = lang === 'ar' ? TIPS_AR[result.level] : TIPS_EN[result.level];
  const isHealthy = result.level === 'healthy' || result.level === 'mild';

  useEffect(() => {
    if (isHealthy) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    // Animate score counter
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, score);
      setAnimateScore(Math.round(current));
      if (current >= score) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score, isHealthy]);

  const shareText = lang === 'ar'
    ? `اختبرت مستوى تعفن دماغي على Dopastopp وحصلت على ${score}/${MAX_SCORE}. اكتشف مستواك على dopastopp.com`
    : `I tested my Brain Rot score on Dopastopp and got ${score}/${MAX_SCORE}. Find your score at dopastopp.com`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My Dopastopp Brain Rot Score', text: shareText, url: 'https://dopastopp.com' });
    } else {
      navigator.clipboard.writeText(shareText);
      alert(t('تم نسخ النص!', 'Copied to clipboard!'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 50%, #0f1a2e 100%)' }}>
      
      {showConfetti && <Confetti />}

      {/* Animated BG glow based on result */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              result.level === 'healthy' ? '#10B981' :
              result.level === 'mild' ? '#84CC16' :
              result.level === 'moderate' ? '#F59E0B' :
              result.level === 'severe' ? '#F97316' : '#EF4444'
            } 0%, transparent 70%)`,
            filter: 'blur(50px)'
          }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between">
        <span className="text-white font-black text-xl">Dopastopp</span>
        <button onClick={onRetake} className="text-sm text-gray-400 hover:text-white transition-colors">
          {t('أعد الاختبار', 'Retake Quiz')}
        </button>
      </header>

      {/* Tabs */}
      <div className="relative z-10 px-4 mb-6">
        <div className="flex glass rounded-xl p-1 max-w-lg mx-auto gap-1">
          {[
            { key: 'results', labelEn: '🏆 Results', labelAr: '🏆 النتيجة' },
            { key: 'breakdown', labelEn: '📊 Analysis', labelAr: '📊 التحليل' },
            { key: 'challenge', labelEn: '🎯 Challenge', labelAr: '🎯 التحدي' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              style={activeTab === tab.key ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-4 md:px-8 max-w-2xl mx-auto w-full pb-12">

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <div className="fade-in-up space-y-6">
            {/* Score card */}
            <div className={`glass rounded-3xl p-6 md:p-8 text-center bg-gradient-to-br ${result.bgClass}`}>
              <BrainyMascot mood={result.brainyMood} size={140} animate={true} className="mx-auto mb-4" />
              
              <div className="text-6xl md:text-7xl font-black mb-2" style={{ color: result.level === 'healthy' || result.level === 'mild' ? '#4ADE80' : result.level === 'moderate' ? '#FBBF24' : '#F87171' }}>
                {animateScore}
                <span className="text-2xl text-gray-400">/{MAX_SCORE}</span>
              </div>

              <div className="text-4xl mb-2">{result.emoji}</div>
              <h2 className={`text-2xl md:text-3xl font-black mb-3 ${result.colorClass}`}>
                {lang === 'ar' ? result.titleAr : result.titleEn}
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {lang === 'ar' ? result.descAr : result.descEn}
              </p>

              {/* Score bar */}
              <div className="mt-6 h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1500"
                  style={{
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, #10B981, #F59E0B, #EF4444)`,
                    backgroundSize: '200% 100%',
                    backgroundPosition: `${100 - percentage}% 0%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{t('صحي', 'Healthy')}</span>
                <span>{percentage}% {t('مؤثر', 'Affected')}</span>
                <span>{t('حرج', 'Critical')}</span>
              </div>
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-black text-white text-lg mb-4">
                💡 {t('نصائح مخصصة لك', 'Personalized Tips')}
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onStartChallenge}
                className="flex-1 py-4 rounded-xl text-white font-black text-base transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
              >
                🎯 {t('ابدأ تحدي الـ5 أيام', 'Start 5-Day Challenge')}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-4 rounded-xl text-white font-bold text-base glass transition-all hover:scale-105 active:scale-95"
              >
                📤 {t('شارك نتيجتك', 'Share Result')}
              </button>
            </div>

            <button
              onClick={onRetake}
              className="w-full py-3 rounded-xl text-gray-400 hover:text-white font-bold text-sm transition-colors"
            >
              🔄 {t('أعد الاختبار', 'Retake the Quiz')}
            </button>
          </div>
        )}

        {/* BREAKDOWN TAB */}
        {activeTab === 'breakdown' && (
          <div className="fade-in-up space-y-4">
            <h2 className="text-xl font-black text-white text-center mb-6">
              📊 {t('تحليل تفصيلي', 'Detailed Analysis')}
            </h2>
            {sectionScores.map((s, i) => {
              const isBad = s.percent >= 60;
              const isGood = s.percent < 30;
              return (
                <div key={s.id} className="glass rounded-2xl p-5 fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <div className="font-black text-white text-sm">
                          {lang === 'ar' ? s.nameAr : s.nameEn}
                        </div>
                        <div className="text-xs text-gray-500">
                          {s.score}/{s.max} {t('نقطة', 'points')}
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-black ${
                      isGood ? 'text-emerald-400' : isBad ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {s.percent}%
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${s.percent}%`,
                        background: isGood
                          ? 'linear-gradient(90deg, #10B981, #34D399)'
                          : isBad
                            ? 'linear-gradient(90deg, #F97316, #EF4444)'
                            : 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {isGood
                      ? t('✅ ممتاز! هذا المجال قوي لديك', '✅ Excellent! This area is a strength.')
                      : isBad
                        ? t('⚠️ يحتاج عمل عاجل في هذا المجال', '⚠️ Needs urgent attention in this area.')
                        : t('🔶 مجال للتحسين', '🔶 Room for improvement.')}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CHALLENGE TAB */}
        {activeTab === 'challenge' && (
          <div className="fade-in-up space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white mb-2">
                🎯 {t('تحدي الـ5 أيام', '5-Day Dopastopp Challenge')}
              </h2>
              <p className="text-gray-400 text-sm">
                {t(
                  'خمسة أيام لإعادة برمجة دماغك وبدء رحلة التعافي الرقمي.',
                  'Five days to rewire your brain and start your digital recovery journey.'
                )}
              </p>
            </div>
            {CHALLENGE_DAYS.map((day, i) => (
              <div key={day.day} className="glass rounded-2xl p-5 card-hover fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                    {day.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA' }}>
                        {t(`اليوم ${day.day}`, `Day ${day.day}`)}
                      </span>
                    </div>
                    <h3 className="font-black text-white mb-1">
                      {lang === 'ar' ? day.titleAr : day.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {lang === 'ar' ? day.descAr : day.descEn}
                    </p>
                    <p className="text-purple-300 text-xs italic">
                      {lang === 'ar' ? day.tipAr : day.tipEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={onStartChallenge}
              className="w-full py-4 rounded-xl text-white font-black text-lg mt-4 transition-all hover:scale-105 active:scale-95 animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            >
              🚀 {t('ابدأ التحدي اليوم!', "Let's Start the Challenge!")}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultsSection;
