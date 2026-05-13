import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HabitCard: React.FC<{ icon: string; title: string; desc: string; color: string }> = ({ icon, title, desc, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const RecoveryPlanPage: React.FC = () => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = t("خطة التعافي واستعادة التركيز | DopaStopp", "Recovery Plan & Focus Restoration | DopaStopp");
  }, [t]);

  const habits = [
    {
      icon: "🚶",
      title: t("المشي الواعي", "Mindful Walking"),
      desc: t("امشِ لمدة 20 دقيقة يومياً بدون هاتف أو سماعات. ركز على خطواتك ومحيطك لاستعادة الاتصال بالواقع.", "Walk for 20 minutes daily without a phone or headphones. Focus on your steps and surroundings to reconnect with reality."),
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "📚",
      title: t("القراءة العميقة", "Deep Reading"),
      desc: t("اقرأ كتاباً ورقياً لمدة 15 دقيقة قبل النوم. هذا يساعد في تدريب عضلة الانتباه وتقليل إجهاد العين.", "Read a physical book for 15 minutes before bed. This helps train your attention muscle and reduces eye strain."),
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "😴",
      title: t("تحسين النوم", "Sleep Improvement"),
      desc: t("اترك هاتفك خارج غرفة النوم قبل ساعة من موعد نومك. النوم الجيد هو حجر الزاوية في توازن الدوبامين.", "Leave your phone outside the bedroom an hour before sleep. Good sleep is the cornerstone of dopamine balance."),
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "📵",
      title: t("تقليل وقت الشاشة", "Reduce Screen Time"),
      desc: t("استخدم تطبيقات تتبع الوقت وحدد سقفاً زمنياً لتطبيقات التواصل الاجتماعي. ابدأ بتقليل 30 دقيقة يومياً.", "Use time-tracking apps and set limits for social media. Start by reducing usage by 30 minutes daily."),
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "🧘",
      title: t("اليقظة الذهنية", "Mindfulness"),
      desc: t("مارس تمارين التنفس أو التأمل لمدة 5 دقائق يومياً لتقليل الضجيج الذهني والتوتر الرقمي.", "Practice breathing exercises or meditation for 5 minutes daily to reduce mental noise and digital stress."),
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "💧",
      title: t("الترطيب المستمر", "Hydration"),
      desc: t("شرب الماء بانتظام يحسن الأداء الإدراكي والتركيز. اجعل زجاجة الماء رفيقك الدائم بدلاً من الهاتف.", "Drinking water regularly improves cognitive performance and focus. Make a water bottle your constant companion instead of your phone."),
      color: "bg-purple-500/20 text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            {t("خطة التعافي الرقمي", "Digital Recovery Plan")}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("استعادة السيطرة على كيميائية دماغك لا تتطلب معجزات، بل خطوات صغيرة ومستمرة. إليك أهم العادات التي ستغير حياتك.", "Regaining control over your brain chemistry doesn't require miracles, but small, consistent steps. Here are the key habits that will change your life.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {habits.map((habit, index) => (
            <HabitCard key={index} {...habit} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-3xl font-black mb-6 relative z-10">
            {t("جاهز للتحدي الحقيقي؟", "Ready for the Real Challenge?")}
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
            {t("لقد صممنا تحدياً لمدة 5 أيام لمساعدتك على كسر العادات القديمة وبناء مسارات عصبية جديدة وأكثر صحة.", "We've designed a 5-day challenge to help you break old habits and build new, healthier neural pathways.")}
          </p>
          <Link 
            to="/challenge" 
            className="inline-block bg-white text-black font-black py-5 px-12 rounded-2xl text-xl hover:bg-purple-400 transition-all transform hover:scale-105 relative z-10"
          >
            {t("ابدأ تحدي الـ 5 أيام", "Start 5-Day Challenge")}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecoveryPlanPage;
