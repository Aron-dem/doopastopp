import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const PageWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | DopaStopp`;
  }, [title]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {title}
        </h1>
        <div className="prose prose-invert prose-cyan max-w-none">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const AboutPage = () => (
  <PageWrapper title="عن DopaStopp">
    <p className="text-xl text-gray-300 leading-relaxed mb-8">
      DopaStopp هي منصة رائدة تهدف إلى مساعدة الأفراد في العصر الرقمي على استعادة السيطرة على انتباههم وصحتهم العقلية. نحن نركز على ظواهر مثل "Dopamine Overload" و "Brain Rot" وتأثيرات الإدمان الرقمي على الدماغ البشري.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">رؤيتنا</h2>
    <p className="text-gray-400">
      نسعى لخلق عالم يكون فيه التفاعل مع التكنولوجيا واعياً ومتوازناً، حيث يمتلك كل شخص الأدوات اللازمة لحماية كيميائية دماغه من الاستنزاف الرقمي المستمر.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">ماذا نقدم؟</h2>
    <ul className="list-disc list-inside space-y-4 text-gray-400">
      <li>اختبارات علمية مبسطة لتقييم الحالة الذهنية.</li>
      <li>خطط تعافي مخصصة تعتمد على عادات صحية مثبتة.</li>
      <li>مقالات تعليمية تشرح آليات عمل الدماغ والدوامين.</li>
      <li>أدوات عملية لتقليل وقت الشاشة وزيادة التركيز.</li>
    </ul>
  </PageWrapper>
);

export const PrivacyPolicyPage = () => (
  <PageWrapper title="سياسة الخصوصية">
    <p className="text-gray-400">آخر تحديث: مايو 2026</p>
    <h2 className="text-2xl font-bold mt-12 mb-6">1. المعلومات التي نجمعها</h2>
    <p className="text-gray-400">
      نحن في DopaStopp نحترم خصوصيتك. نقوم بجمع معلومات محدودة مثل نتائج الاختبارات (بشكل مجهول) لتحسين تجربة المستخدم. إذا قمت بالاشتراك في نشرتنا البريدية، فإننا نحتفظ ببريدك الإلكتروني فقط لهذا الغرض.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">2. كيف نستخدم معلوماتك</h2>
    <p className="text-gray-400">
      تُستخدم البيانات لتحليل الاتجاهات العامة وتقديم توصيات مخصصة لك أثناء تصفح الموقع. نحن لا نبيع بياناتك لأطراف ثالثة.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">3. ملفات تعريف الارتباط (Cookies)</h2>
    <p className="text-gray-400">
      نستخدم ملفات تعريف الارتباط الأساسية لضمان عمل الموقع بشكل صحيح ولتذكر تفضيلات اللغة ونتائج الاختبارات الخاصة بك محلياً على جهازك.
    </p>
  </PageWrapper>
);

export const TermsPage = () => (
  <PageWrapper title="الشروط والأحكام">
    <h2 className="text-2xl font-bold mt-12 mb-6">1. قبول الشروط</h2>
    <p className="text-gray-400">
      باستخدامك لموقع DopaStopp، فإنك توافق على الالتزام بهذه الشروط. الموقع مخصص للاستخدام الشخصي وغير التجاري فقط.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">2. حقوق الملكية الفكرية</h2>
    <p className="text-gray-400">
      جميع المحتويات، بما في ذلك الاختبارات والمقالات والتصميم، هي ملك لـ DopaStopp ومحمية بموجب قوانين الملكية الفكرية.
    </p>
    <h2 className="text-2xl font-bold mt-12 mb-6">3. السلوك المحظور</h2>
    <p className="text-gray-400">
      يُحظر استخدام الموقع لأي غرض غير قانوني أو محاولة تعطيل خدماته أو الوصول غير المصرح به إلى أنظمته.
    </p>
  </PageWrapper>
);

export const DisclaimerPage = () => (
  <PageWrapper title="إخلاء المسؤولية">
    <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl mb-12">
      <p className="text-xl font-bold text-red-400 mb-4">تنبيه هام:</p>
      <p className="text-gray-300 leading-relaxed">
        المحتوى المقدم في DopaStopp، بما في ذلك الاختبارات والنتائج وخطط التعافي، هو <strong>لأغراض تعليمية وترفيهية فقط</strong>.
      </p>
    </div>
    <p className="text-gray-400 mb-6">
      المعلومات الواردة هنا <strong>ليست نصيحة طبية</strong> ولا ينبغي استخدامها لتشخيص أو علاج أي حالة صحية أو عقلية.
    </p>
    <p className="text-gray-400 mb-6">
      إذا كنت تعاني من أعراض شديدة للاكتئاب أو القلق أو الإدمان، فنحن نشجعك بشدة على استشارة مختص رعاية صحية مؤهل.
    </p>
    <p className="text-gray-400">
      نحن نبذل قصارى جهدنا لتقديم معلومات دقيقة، ولكننا لا نتحمل المسؤولية عن أي قرارات تُتخذ بناءً على محتوى الموقع.
    </p>
  </PageWrapper>
);

export const FAQPage = () => (
  <PageWrapper title="الأسئلة الشائعة">
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">ما هو "Brain Rot"؟</h3>
        <p className="text-gray-400">هو مصطلح مجازي يشير إلى تدهور القدرة على التركيز والانتباه نتيجة الاستهلاك المفرط للمحتوى الرقمي سريع الوتيرة وغير المفيد.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">هل الاختبارات دقيقة علمياً؟</h3>
        <p className="text-gray-400">الاختبارات مصممة بناءً على مؤشرات سلوكية شائعة، وهي تهدف للتوعية والتقييم الذاتي الأولي وليست أدوات تشخيص طبية.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">كيف أبدأ رحلة التعافي؟</h3>
        <p className="text-gray-400">يمكنك البدء بإجراء "اختبار تعفن الدماغ" ثم اتباع خطة التعافي المقترحة التي تشمل عادات بسيطة مثل تقليل وقت الشاشة وزيادة القراءة.</p>
      </div>
    </div>
  </PageWrapper>
);

export const ContactPage = () => (
  <PageWrapper title="اتصل بنا">
    <p className="text-gray-400 mb-12">لديك سؤال أو اقتراح؟ يسعدنا دائماً سماع رأيك.</p>
    <form className="space-y-6 max-w-lg" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">الاسم</label>
        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">البريد الإلكتروني</label>
        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">الرسالة</label>
        <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
      </div>
      <button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02]">
        إرسال الرسالة
      </button>
    </form>
  </PageWrapper>
);
