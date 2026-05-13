import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import BrainRotDictionary from './BrainRotDictionary';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuiz }) => {
  const { lang, setLang, t } = useLanguage();
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = {
    en: ["Test Your Brain Rot. Reclaim Your Focus.", "Stop the Scroll, Start the Soul."],
    ar: ["اختبر مدى تعفن دماغك. استعد تركيزك.", "أوقف التصفح، ابدأ الحياة."],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % 2);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = lang === 'ar' 
      ? 'Dopastopp | منصة التعافي الرقمي واستعادة التركيز' 
      : 'Dopastopp | Digital Detox & Focus Recovery Platform';
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/logo.png";
    }
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden stars-bg"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 40%, #0f1a2e 100%)' }}>
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-20 animate-bg-pan"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-15 animate-bg-pan"
          style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img src="/logo.png" alt="Dopastopp Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-lg" />
            <div className="hidden sm:block">
              <span className="text-xl font-black text-white tracking-tight">Dopastopp</span>
              <div className="text-xs text-purple-300 font-medium -mt-0.5">
                {t('العافية الرقمية', 'Digital Wellness')}
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/blog" className="text-gray-300 hover:text-white font-bold text-sm transition-colors">
              {t('المدونة', 'Blog')}
            </Link>
            <Link to="/plan" className="text-gray-300 hover:text-white font-bold text-sm transition-colors">
              {t('خطة التعافي', 'Recovery Plan')}
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white font-bold text-sm transition-colors">
              {t('عن المنصة', 'About')}
            </Link>
          </nav>
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              lang === 'en'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
            style={lang === 'en' ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
          >
            EN
          </button>
          <span className="text-gray-600">|</span>
          <button
            onClick={() => setLang('ar')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              lang === 'ar'
                ? 'text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
            style={lang === 'ar' ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
          >
            عربي
          </button>
        </div>
      </header>

      {/* Main hero content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 md:px-6 py-6 md:py-16 text-center">
        <h1 className="sr-only">
          {lang === 'ar' 
            ? 'Dopastopp - منصة التعافي الرقمي واختبارات الإدمان على الهاتف وتشتت الانتباه.' 
            : 'Dopastopp - Digital Recovery Platform, Phone Addiction Tests, and Attention Span.'}
        </h1>
        
        <div className="fade-in-scale mb-4 md:mb-8 relative max-w-xs md:max-w-md w-full">
          <img src="/logo.png" alt="Dopastopp Hero" className="w-full h-auto drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
          <div className="absolute top-0 -right-3 md:-right-8 glass rounded-xl md:rounded-2xl px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-bold pop-in"
            style={{ animationDelay: '1s', borderColor: 'rgba(139,92,246,0.5)' }}>
            <span className="text-purple-300">
              {t('استعد تركيزك! 🚀', 'Reclaim your focus! 🚀')}
            </span>
          </div>
        </div>

        <div className="h-12 md:h-16 flex items-center justify-center mb-4 md:mb-6 fade-in-up"
          style={{ animationDelay: '0.4s' }}>
          <p
            key={`${lang}-${taglineIndex}`}
            className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 max-w-2xl fade-in-up px-2"
          >
            {taglines[lang][taglineIndex]}
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-xs text-gray-300">+10,000 مستخدم</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-emerald-400">✓</span>
            <span className="text-xs text-gray-300">أسس علمية</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-cyan-400">🔒</span>
            <span className="text-xs text-gray-300">خصوصية تامة</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up mb-16" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={onStartQuiz}
            className="relative group px-8 py-4 rounded-2xl text-white text-lg font-black transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              🧠 {t('ابدأ التقييم الشامل', 'Start Full Assessment')}
            </span>
          </button>
          
          <Link
            to="/plan"
            className="px-8 py-4 rounded-2xl text-white text-lg font-bold bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            ✨ {t('خطة التعافي', 'Recovery Plan')}
          </Link>
        </div>

        {/* Tools Section */}
        <div className="w-full max-w-5xl mx-auto mb-20 fade-in-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
            {t('أدوات واختبارات متخصصة', 'Specialized Tools & Tests')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/quiz/brain-rot" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all text-right group">
              <div className="text-3xl mb-4">🍄</div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-400">اختبار تعفن الدماغ</h3>
              <p className="text-xs text-gray-400">قس مدى تأثير المحتوى السريع على عقلك.</p>
            </Link>
            <Link to="/quiz/phone-addiction" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 transition-all text-right group">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-400">إدمان الهاتف</h3>
              <p className="text-xs text-gray-400">هل تسيطر على هاتفك أم يسيطر عليك؟</p>
            </Link>
            <Link to="/quiz/attention-span" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-emerald-500/50 transition-all text-right group">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-400">مدى الانتباه</h3>
              <p className="text-xs text-gray-400">اختبر قدرتك على التركيز العميق.</p>
            </Link>
            <Link to="/quiz/brain-age" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 transition-all text-right group">
              <div className="text-3xl mb-4">🔋</div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-pink-400">عمر الدماغ</h3>
              <p className="text-xs text-gray-400">اكتشف العمر الحقيقي لقدراتك الذهنية.</p>
            </Link>
          </div>
        </div>

        {/* Testimonials Placeholder */}
        <div className="w-full max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8">{t('قصص نجاح', 'Success Stories')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-right">
              <p className="text-gray-300 italic mb-4">"بعد استخدام خطة التعافي، تمكنت من قراءة كتاب كامل لأول مرة منذ سنوات. تركيزي تحسن بشكل ملحوظ!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sm text-white">أحمد م.</h4>
                  <p className="text-xs text-gray-500">طالب جامعي</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-right">
              <p className="text-gray-300 italic mb-4">"اختبار إدمان الهاتف كان جرس إنذار لي. التطبيق ساعدني في تقليل وقت الشاشة بـ 3 ساعات يومياً."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sm text-white">سارة ك.</h4>
                  <p className="text-xs text-gray-500">مصممة جرافيك</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-white/10 p-8 md:p-12 rounded-[2rem] mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-4">انضم إلى مجتمعنا</h2>
          <p className="text-gray-300 mb-8">احصل على نصائح أسبوعية مجانية حول تحسين التركيز والإنتاجية مباشرة في بريدك الإلكتروني.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="أدخل بريدك الإلكتروني..." 
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-xl transition-colors whitespace-nowrap">
              اشترك الآن
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">نحترم خصوصيتك. لن نرسل لك رسائل مزعجة.</p>
        </div>

        {/* Brain Rot Dictionary for SEO */}
        <BrainRotDictionary />
      </main>
    </div>
  );
};

export default HeroSection;
