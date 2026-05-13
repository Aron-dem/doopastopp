import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

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
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "خطة التعافي واستعادة التركيز | DopaStopp";
  }, []);

  const habits = [
    {
      icon: "🚶",
      title: "المشي الواعي",
      desc: "امشِ لمدة 20 دقيقة يومياً بدون هاتف أو سماعات. ركز على خطواتك ومحيطك لاستعادة الاتصال بالواقع.",
      color: "bg-emerald-500/20 text-emerald-400"
    },
    {
      icon: "📚",
      title: "القراءة العميقة",
      desc: "اقرأ كتاباً ورقياً لمدة 15 دقيقة قبل النوم. هذا يساعد في تدريب عضلة الانتباه وتقليل إجهاد العين.",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      icon: "😴",
      title: "تحسين النوم",
      desc: "اترك هاتفك خارج غرفة النوم قبل ساعة من موعد نومك. النوم الجيد هو حجر الزاوية في توازن الدوبامين.",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: "📵",
      title: "تقليل وقت الشاشة",
      desc: "استخدم تطبيقات تتبع الوقت وحدد سقفاً زمنياً لتطبيقات التواصل الاجتماعي. ابدأ بتقليل 30 دقيقة يومياً.",
      color: "bg-red-500/20 text-red-400"
    },
    {
      icon: "🧘",
      title: "اليقظة الذهنية",
      desc: "مارس تمارين التنفس أو التأمل لمدة 5 دقائق يومياً لتقليل الضجيج الذهني والتوتر الرقمي.",
      color: "bg-cyan-500/20 text-cyan-400"
    },
    {
      icon: "💧",
      title: "الترطيب المستمر",
      desc: "شرب الماء بانتظام يحسن الأداء الإدراكي والتركيز. اجعل زجاجة الماء رفيقك الدائم بدلاً من الهاتف.",
      color: "bg-blue-400/20 text-blue-300"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            خطة التعافي الرقمي
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            استعادة السيطرة على كيميائية دماغك لا تتطلب معجزات، بل خطوات صغيرة ومستمرة. إليك أهم العادات التي ستغير حياتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {habits.map((habit, index) => (
            <HabitCard key={index} {...habit} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-3xl font-black mb-6 relative z-10">جاهز للتحدي الحقيقي؟</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
            لقد صممنا تحدياً لمدة 5 أيام لمساعدتك على كسر العادات القديمة وبناء مسارات عصبية جديدة وأكثر صحة.
          </p>
          <Link 
            to="/challenge" 
            className="inline-block bg-white text-black font-black py-5 px-12 rounded-2xl text-xl hover:bg-cyan-400 transition-all transform hover:scale-105 relative z-10"
          >
            ابدأ تحدي الـ 5 أيام
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecoveryPlanPage;
