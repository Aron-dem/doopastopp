import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BrainyMascot from './BrainyMascot';
import Header from './Header';
import { ResultLevel, QUESTIONS, SECTIONS } from '../data/questions';

interface ResultsSectionProps {
  score: number;
  answers: number[];
  result: ResultLevel;
  brainRotPcnt: number;
  onRetake: () => void;
  onStartChallenge: () => void;
}

const MAX_SCORE = 68;

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
  score, answers, result, brainRotPcnt, onRetake, onStartChallenge
}) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'results' | 'breakdown' | 'challenge'>('results');
  const cardRef = useRef<HTMLDivElement>(null);

  const sectionScores = getSectionScores(answers);
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
    ? `اختبرت مستوى تعفن دماغي (Brain Rot) على Dopastopp حصلت على ${brainRotPcnt}%. هل تعاني من إدمان تيك توك؟ اكتشف مستواك الآن على dopastopp.com #تعفن_الدماغ #brainrot`
    : `I tested my Brain Rot score on Dopastopp and got ${brainRotPcnt}%. Are you addicted to TikTok? Find your score at dopastopp.com #brainrot #skibidi`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My Dopastopp Brain Rot Score', text: shareText, url: window.location.href });
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
      <Header
        showLogo={true}
        rightContent={
          <button onClick={onRetake} className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
            {t('أعد', 'Retake')}
          </button>
        }
      />

      {/* Tabs */}
      <div className="relative z-10 px-4 mb-4" style={{ marginTop: '-1px' }}>
        <div className="flex glass rounded-xl p-1 w-full gap-1 overflow-x-auto">
          {[
            { key: 'results', labelEn: '🏆 Results', labelAr: '🏆 النتيجة' },
            { key: 'breakdown', labelEn: '📊 Analysis', labelAr: '📊 التحليل' },
            { key: 'challenge', labelEn: '🎯 Challenge', labelAr: '🎯 التحدي' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-1.5 px-2 md:px-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              style={activeTab === tab.key ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
            >
              {lang === 'ar' ? tab.labelAr.split(' ')[0] : tab.labelEn.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-3 md:px-8 max-w-2xl mx-auto w-full pb-8 md:pb-12" style={{ marginTop: '-1px' }}>

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <div className="fade-in-up space-y-6">
            
            {/* Brain Rot Card (Screenshot-friendly) - Redesigned to match image */}
            <div 
              ref={cardRef}
              className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-center border-2 border-white/10 backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(26, 5, 51, 0.8) 50%, rgba(15, 26, 46, 0.8) 100%)',
                boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Mascot */}
                <div className="mb-6">
                  <BrainyMascot mood={result.brainyMood} size={140} animate={true} className="mx-auto" />
                </div>
                
                {/* Title */}
                <div className="mb-4">
                  <span className="text-gray-400 uppercase tracking-[0.3em] text-xs font-black block">
                    {t('مستوى تعفن الدماغ', 'Brain Rot Level')}
                  </span>
                </div>
                
                {/* Percentage Score - Large and Bold */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl font-black" style={{
                    background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {brainRotPcnt}
                  </div>
                  <span className="text-3xl md:text-4xl text-gray-500 font-black ml-2">%</span>
                </div>

                {/* Status Badge */}
                <div className="inline-block px-8 py-3 rounded-full border-2 border-yellow-500/50 mb-6" style={{
                  background: 'rgba(234, 179, 8, 0.1)'
                }}>
                  <h2 className={`text-lg md:text-2xl font-black ${result.colorClass}`}>
                    ⚠️ {lang === 'ar' ? result.titleAr : result.titleEn}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-lg mx-auto mb-6 md:mb-8">
                  {lang === 'ar' ? result.descAr : result.descEn}
                </p>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold text-gray-400 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" /> {t('صحي', 'Healthy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" /> {t('متوسط', 'Moderate')}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" /> {t('حرج', 'Critical')}
                  </div>
                </div>
               
                {/* Branding for screenshot */}
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center opacity-60">
                  <span className="text-xs font-black text-gray-400">dopastopp.com</span>
                  <span className="text-xs font-black text-white">DOPASTOP</span>
                </div>
              </div>
            </div>

            {/* Share & Save hint */}
            <div className="text-center">
              <p className="text-gray-500 text-[10px] md:text-xs mb-3">
                {t('📸 خد سكرين شوت وشارك نتيجتك مع أصحابك!', '📸 Take a screenshot and share your result!')}
              </p>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl glass text-white font-bold text-xs md:text-sm transition-all hover:bg-white/10 flex items-center justify-center gap-1 md:gap-2"
                >
                  <span>🔗</span> <span className="hidden sm:inline">{t('نسخ', 'Copy')}</span>
                </button>
                <button
                  onClick={onStartChallenge}
                  className="flex-[1.5] py-3 md:py-4 rounded-xl md:rounded-2xl text-white font-black text-xs md:text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1 md:gap-2"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)' }}
                >
                  <span>🎯</span> <span className="hidden sm:inline">{t('ابدأ التحدي', 'Start Challenge')}</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/5">
              <h3 className="font-black text-white text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2">
                <span>💡</span> {t('نصائح مخصصة لك', 'Personalized Tips')}
              </h3>
              <ul className="space-y-2 md:space-y-4">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3 text-gray-300 text-xs md:text-sm fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-lg flex items-center justify-center text-[9px] md:text-[10px] font-black flex-shrink-0 mt-0.5 bg-white/5 text-purple-400 border border-purple-500/20">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ANALYSIS TAB */}
        {activeTab === 'breakdown' && (
          <div className="fade-in-up space-y-4">
            <h3 className="text-lg md:text-xl font-black text-white mb-4 md:mb-6 px-2">
              {t('تحليل عميق لدماغك', 'Deep Brain Analysis')}
            </h3>
            {sectionScores.map((s, i) => (
              <div key={s.id} className="glass rounded-xl md:rounded-2xl p-3 md:p-5 border border-white/5 fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">{s.icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-xs md:text-sm">{lang === 'ar' ? s.nameAr : s.nameEn}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-500">{s.score}/{s.max}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base md:text-lg font-black" style={{ color: s.color }}>{s.percent}%</span>
                  </div>
                </div>
                <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
            
            <div className="p-4 md:p-6 glass rounded-xl md:rounded-2xl mt-6 md:mt-8 border border-purple-500/20 bg-purple-500/5">
              <p className="text-xs md:text-sm text-purple-200 leading-relaxed italic text-center">
                "{t('هذا التحليل مبني على إجاباتك الصريحة. تذكر أن الوعي هو أول خطوة في طريق العلاج.', 'This analysis is based on your honest answers. Remember, awareness is the first step toward recovery.')}"
              </p>
            </div>
          </div>
        )}

        {/* CHALLENGE TAB */}
        {activeTab === 'challenge' && (
          <div className="fade-in-up text-center py-6 md:py-8">
             <div className="w-16 md:w-20 h-16 md:h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-purple-500/30">
                <span className="text-3xl md:text-4xl">🎯</span>
             </div>
             <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">
               {t('هل أنت مستعد؟', 'Ready?')}
             </h3>
             <p className="text-gray-400 mb-6 md:mb-8 max-w-sm mx-auto leading-relaxed text-xs md:text-base">
               {t('خطة 5 أيام لاستعادة تركيزك.', 'A 5-day plan to regain your focus.')}
             </p>
             <button
                onClick={onStartChallenge}
                className="w-full max-w-xs py-3 md:py-4 rounded-xl md:rounded-2xl text-white font-black text-base md:text-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)' }}
              >
                {t('ابدأ الآن', 'Start Now')}
              </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default ResultsSection;
