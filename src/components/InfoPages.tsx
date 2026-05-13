import React, { useEffect } from 'react';
import Header from './Header';
import { useLanguage } from '../context/LanguageContext';

const PageWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { lang } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | DopaStopp`;
  }, [title]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0A1E] via-[#1a0533] to-[#0f1a2e] text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {title}
        </h1>
        <div className="prose prose-invert prose-cyan max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
};

export const AboutPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("عن DopaStopp", "About DopaStopp")}>
      <p className="text-xl text-gray-300 leading-relaxed mb-8">
        {t("DopaStopp هي منصة رائدة تهدف إلى مساعدة الأفراد في العصر الرقمي على استعادة السيطرة على انتباههم وصحتهم العقلية. نحن نركز على ظواهر مثل Dopamine Overload و Brain Rot وتأثيرات الإدمان الرقمي على الدماغ البشري.", "DopaStopp is a leading platform designed to help individuals in the digital age reclaim control over their attention and mental health. We focus on phenomena like Dopamine Overload and Brain Rot, and the effects of digital addiction on the human brain.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        {t("رؤيتنا", "Our Vision")}
      </h2>
      <p className="text-gray-400">
        {t("نسعى لخلق عالم يكون فيه التفاعل مع التكنولوجيا واعياً ومتوازناً، حيث يمتلك كل شخص الأدوات اللازمة لحماية كيميائية دماغه من الاستنزاف الرقمي المستمر.", "We strive to create a world where interaction with technology is conscious and balanced, where everyone has the tools to protect their brain chemistry from continuous digital depletion.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        {t("ماذا نقدم؟", "What Do We Offer?")}
      </h2>
      <ul className="list-disc list-inside space-y-4 text-gray-400">
        <li>{t("اختبارات علمية مبسطة لتقييم الحالة الذهنية.", "Simplified scientific tests to assess mental state.")}</li>
        <li>{t("خطط تعافي مخصصة تعتمد على عادات صحية مثبتة.", "Customized recovery plans based on proven healthy habits.")}</li>
        <li>{t("مقالات تعليمية تشرح آليات عمل الدماغ والدوامين.", "Educational articles explaining brain mechanisms and dopamine.")}</li>
        <li>{t("أدوات عملية لتقليل وقت الشاشة وزيادة التركيز.", "Practical tools to reduce screen time and increase focus.")}</li>
      </ul>
    </PageWrapper>
  );
};

export const PrivacyPolicyPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("سياسة الخصوصية", "Privacy Policy")}>
      <p className="text-gray-400">{t("آخر تحديث: مايو 2026", "Last updated: May 2026")}</p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">1. {t("المعلومات التي نجمعها", "Information We Collect")}</h2>
      <p className="text-gray-400">
        {t("نحن في DopaStopp نحترم خصوصيتك. نقوم بجمع معلومات محدودة مثل نتائج الاختبارات (بشكل مجهول) لتحسين تجربة المستخدم. إذا قمت بالاشتراك في نشرتنا البريدية، فإننا نحتفظ ببريدك الإلكتروني فقط لهذا الغرض.", "At DopaStopp, we respect your privacy. We collect limited information such as test results (anonymously) to improve user experience. If you subscribe to our newsletter, we only keep your email for that purpose.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">2. {t("كيف نستخدم معلوماتك", "How We Use Your Information")}</h2>
      <p className="text-gray-400">
        {t("تُستخدم البيانات لتحليل الاتجاهات العامة وتقديم توصيات مخصصة لك أثناء تصفح الموقع. نحن لا نبيع بياناتك لأطراف ثالثة.", "Data is used to analyze general trends and provide personalized recommendations while you browse the site. We do not sell your data to third parties.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">3. {t("ملفات تعريف الارتباط", "Cookies")}</h2>
      <p className="text-gray-400">
        {t("نستخدم ملفات تعريف الارتباط الأساسية لضمان عمل الموقع بشكل صحيح ولتذكر تفضيلات اللغة ونتائج الاختبارات الخاصة بك محلياً على جهازك.", "We use essential cookies to ensure the website works properly and to remember your language preferences and test results locally on your device.")}
      </p>
    </PageWrapper>
  );
};

export const TermsPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("الشروط والأحكام", "Terms & Conditions")}>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">1. {t("قبول الشروط", "Acceptance of Terms")}</h2>
      <p className="text-gray-400">
        {t("باستخدامك لموقع DopaStopp، فإنك توافق على الالتزام بهذه الشروط. الموقع مخصص للاستخدام الشخصي وغير التجاري فقط.", "By using the DopaStopp website, you agree to comply with these terms. The website is intended for personal, non-commercial use only.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">2. {t("حقوق الملكية الفكرية", "Intellectual Property Rights")}</h2>
      <p className="text-gray-400">
        {t("جميع المحتويات، بما في ذلك الاختبارات والمقالات والتصميم، هي ملك لـ DopaStopp ومحمية بموجب قوانين الملكية الفكرية.", "All content, including tests, articles, and design, is owned by DopaStopp and protected under intellectual property laws.")}
      </p>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">3. {t("السلوك المحظور", "Prohibited Conduct")}</h2>
      <p className="text-gray-400">
        {t("يُحظر استخدام الموقع لأي غرض غير قانوني أو محاولة تعطيل خدماته أو الوصول غير المصرح به إلى أنظمته.", "It is prohibited to use the website for any unlawful purpose or attempt to disrupt its services or unauthorized access to its systems.")}
      </p>
    </PageWrapper>
  );
};

export const DisclaimerPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("إخلاء المسؤولية", "Disclaimer")}>
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl mb-12">
        <p className="text-xl font-bold text-red-400 mb-4">{t("تنبيه هام:", "Important Notice:")}</p>
        <p className="text-gray-300 leading-relaxed">
          {t("المحتوى المقدم في DopaStopp، بما في ذلك الاختبارات والنتائج وخطط التعافي، هو لأغراض تعليمية وترفيهية فقط.", "The content provided on DopaStopp, including tests, results, and recovery plans, is for educational and entertainment purposes only.")}
        </p>
      </div>
      <p className="text-gray-400 mb-6">
        {t("المعلومات الواردة هنا ليست نصيحة طبية ولا ينبغي استخدامها لتشخيص أو علاج أي حالة صحية أو عقلية.", "The information provided here is not medical advice and should not be used to diagnose or treat any health or mental condition.")}
      </p>
      <p className="text-gray-400 mb-6">
        {t("إذا كنت تعاني من أعراض شديدة للاكتئاب أو القلق أو الإدمان، فنحن نشجعك بشدة على استشارة مختص رعاية صحية مؤهل.", "If you are experiencing severe symptoms of depression, anxiety, or addiction, we strongly encourage you to consult a qualified healthcare professional.")}
      </p>
      <p className="text-gray-400">
        {t("نحن نبذل قصارى جهدنا لتقديم معلومات دقيقة، ولكننا لا نتحمل المسؤولية عن أي قرارات تُتخذ بناءً على محتوى الموقع.", "We make every effort to provide accurate information, but we are not responsible for any decisions made based on the website's content.")}
      </p>
    </PageWrapper>
  );
};

export const FAQPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("الأسئلة الشائعة", "Frequently Asked Questions")}>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">{t("ما هو Brain Rot؟", "What is Brain Rot?")}</h3>
          <p className="text-gray-400">{t("هو مصطلح مجازي يشير إلى تدهور القدرة على التركيز والانتباه نتيجة الاستهلاك المفرط للمحتوى الرقمي سريع الوتيرة وغير المفيد.", "It is a metaphorical term referring to the deterioration of the ability to focus and pay attention due to excessive consumption of fast-paced and unhelpful digital content.")}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">{t("هل الاختبارات دقيقة علمياً؟", "Are the tests scientifically accurate?")}</h3>
          <p className="text-gray-400">{t("الاختبارات مصممة بناءً على مؤشرات سلوكية شائعة، وهي تهدف للتوعية والتقييم الذاتي الأولي وليست أدوات تشخيص طبية.", "The tests are designed based on common behavioral indicators and are intended for awareness and initial self-assessment, not as medical diagnostic tools.")}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">{t("كيف أبدأ رحلة التعافي؟", "How do I start my recovery journey?")}</h3>
          <p className="text-gray-400">{t("يمكنك البدء بإجراء اختبار تعفن الدماغ ثم اتباع خطة التعافي المقترحة التي تشمل عادات بسيطة مثل تقليل وقت الشاشة وزيادة القراءة.", "You can start by taking the Brain Rot test and then follow the suggested recovery plan which includes simple habits like reducing screen time and increasing reading.")}</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <PageWrapper title={t("اتصل بنا", "Contact Us")}>
      <p className="text-gray-400 mb-12">{t("لديك سؤال أو اقتراح؟ يسعدنا دائماً سماع رأيك.", "Do you have a question or suggestion? We always love to hear from you.")}</p>
      <form className="space-y-6 max-w-lg" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t("الاسم", "Name")}</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t("البريد الإلكتروني", "Email")}</label>
          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t("الرسالة", "Message")}</label>
          <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
        </div>
        <button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02]">
          {t("إرسال الرسالة", "Send Message")}
        </button>
      </form>
    </PageWrapper>
  );
};
