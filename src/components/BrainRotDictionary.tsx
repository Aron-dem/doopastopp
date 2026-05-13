import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BrainRotDictionary: React.FC = () => {
  const { lang, t } = useLanguage();

  const terms = [
    { term: 'Skibidi', ar: 'سكيبيدي', descEn: 'A nonsense term popularized by Skibidi Toilet memes.', descAr: 'مصطلح لا معنى له اشتهر من خلال ميمات سكيبيدي تويليت.' },
    { term: 'Rizz', ar: 'ريز', descEn: 'Short for charisma, ability to attract a partner.', descAr: 'اختصار للكاريزما، القدرة على جذب الآخرين.' },
    { term: 'Sigma', ar: 'سيجما', descEn: 'Independent, successful, "lone wolf" personality.', descAr: 'شخصية مستقلة وناجحة، "الذئب المنفرد".' },
    { term: 'Gyatt', ar: 'جيات', descEn: 'Exclamation used when seeing someone attractive.', descAr: 'صيغة تعجب تستخدم عند رؤية شخص جذاب.' },
    { term: 'Ohio', ar: 'أوهايو', descEn: 'Used to describe something weird or chaotic.', descAr: 'يستخدم لوصف شيء غريب أو فوضوي.' },
    { term: 'Fanum Tax', ar: 'فانوم تاكس', descEn: 'Stealing a portion of someone\'s food.', descAr: 'سرقة جزء من طعام شخص آخر.' },
    { term: 'Mewing', ar: 'ميونج', descEn: 'Tongue exercise to define the jawline.', descAr: 'تمرين لللسان لتحديد خط الفك.' },
    { term: 'Looksmaxxing', ar: 'لوكس ماكسينج', descEn: 'Maximizing one\'s physical appearance.', descAr: 'محاولة تحسين المظهر الجسدي لأقصى درجة.' },
    { term: 'Mogging', ar: 'موجينج', descEn: 'Being physically superior to someone else.', descAr: 'التفوق الجسدي أو الجمالي على شخص آخر.' },
    { term: 'Aura', ar: 'أورا', descEn: 'The vibe or energy someone radiates.', descAr: 'الهالة أو الطاقة التي يشعها الشخص.' },
    { term: 'Slop', ar: 'سلوب', descEn: 'Low-quality, AI-generated or repetitive digital content.', descAr: 'محتوى رقمي منخفض الجودة، غالباً ما يكون مولداً بالذكاء الاصطناعي أو مكرراً.' },
    { term: 'Brain Fog', ar: 'ضبابية الدماغ', descEn: 'Mental confusion and lack of focus caused by overstimulation.', descAr: 'حالة من التشوش الذهني وضعف التركيز ناتجة عن الإفراط في التحفيز الرقمي.' },
    { term: 'Yapping', ar: 'يابانج', descEn: 'Talking excessively about nothing important.', descAr: 'الثرثرة المستمرة والمطولة في أمور غير هامة.' },
    { term: 'Doomscroll', ar: 'دوم سكرول', descEn: 'Continuously scrolling through bad news or mindless content.', descAr: 'الاستمرار في التصفح اللانهائي للأخبار السيئة أو المحتوى التافه.' },
  ];

  return (
    <section className="mt-16 max-w-4xl mx-auto px-4 fade-in-up" style={{ animationDelay: '1.2s' }}>
      <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
        {t('📖 قاموس مصطلحات تعفن الدماغ (Brain Rot Dictionary)', '📖 Brain Rot Dictionary')}
      </h2>
      <p className="text-gray-400 text-center mb-8 text-sm md:text-base">
        {t(
          'هل تسمع كلمات غريبة ولا تفهمها؟ إليك أشهر مصطلحات جيل ألفا وجيل زد المرتبطة بتعفن الدماغ.',
          'Hearing weird words and don\'t understand them? Here are the most famous Gen Alpha and Gen Z slang terms associated with brain rot.'
        )}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((item, i) => (
          <div key={i} className="glass rounded-2xl p-5 card-hover border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-black text-purple-400">{item.term}</h3>
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white/5 text-gray-500">{item.ar}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {lang === 'ar' ? item.descAr : item.descEn}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 glass rounded-[2rem] p-8 border border-purple-500/20">
        <h3 className="text-xl font-black text-white mb-4">
          {t('❓ هل تعفن الدماغ حقيقي؟ (Is Brain Rot Real?)', '❓ Is Brain Rot Real?')}
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
          {t(
            'نعم، "تعفن الدماغ" هو مصطلح يصف التدهور المعرفي وتشتت الانتباه الناتج عن الاستهلاك المفرط للمحتوى التافه (Trivial Content) والفيديوهات القصيرة مثل تيك توك وريلز. يؤدي هذا إلى "الضبابية الذهنية" (Brain Fog) وإدمان الدوبامين السريع.',
            'Yes, "Brain Rot" is a term describing cognitive decline and attention deficit caused by excessive consumption of trivial content and short-form videos like TikTok and Reels. This leads to "Brain Fog" and quick dopamine addiction.'
          )}
        </p>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {t(
            'يمكن علاج تعفن الدماغ من خلال "الديتوكس الرقمي" (Digital Detox)، ممارسة "العمل العميق" (Deep Work)، وتقليل وقت الشاشة (Screen Time). اختبار Dopastopp يساعدك على تقييم حالتك والبدء في رحلة التعافي.',
            'Brain rot can be treated through "Digital Detox", practicing "Deep Work", and reducing "Screen Time". The Dopastopp test helps you assess your condition and start your recovery journey.'
          )}
        </p>
      </div>

      {/* Hidden SEO Keywords Cloud */}
      <div className="sr-only">
        brainrot, brain rot test, brain rot quiz, skibidi toilet, rizzler, gyat, sigma male, fanum tax, mewing, delulu, no cap, bussin, goofy ahh, blud, gen alpha slang, gen z slang, looksmaxxing, mogging, aura points, grimace shake, baby gronk, livvy dunne, ohio, only in ohio, sussy, among us, diddy, kai cenat, ishowspeed, quanadale dingle, devious lick, L rizz, ratio, goon, edge, slay, fr, simp, uwu, vibe check, yeet, cheugy, cringe, goblin mode, grindset, touch grass, محتوى تافه, trivial content, low quality content, mindless content, short form content, short videos, reels, TikTok videos, YouTube shorts, doomscrolling, endless scrolling, zombie scrolling, digital addiction, screen addiction, social media addiction, attention deficit, focus problem, brain fog, mental fog, cognitive decline, cognitive impairment, passive consumption, binge scrolling, viral memes, meme culture, internet culture, كيف أتخلص من تعفن الدماغ, how to stop brain rot, how to fix brain rot, brain rot cure, brain rot solution, digital detox, screen time limit, reduce social media, regain focus, improve attention span, brain training, mental clarity, mindfulness, deep work, reading books, long form content, quality content, offline activities, brain health, cognitive health, mental wellness, هل تعفن الدماغ حقيقي, is brain rot real, هل يمكن عكس تعفن الدماغ, can brain rot be reversed, كم ساعة تيك توك تسبب تعفن الدماغ, how much tiktok causes brain rot, هل اليوتيوب يسبب تعفن الدماغ, does youtube cause brain rot, تأثير تيك توك على الدماغ, tiktok effect on brain, تأثير السوشيال ميديا على الذاكرة, social media effect on memory, هل الأطفال يعانون من تعفن الدماغ, do kids have brain rot, كلمة العام 2024 أكسفورد, oxford word of the year 2024, slop, AI slop, digital slop, content slop, brainfog, digital dementia, إدمان رقمي, internet addiction, scroll addiction, TikTok addiction, reels addiction, shorts addiction, social media addiction, continuous partial attention, attention fragmentation, micro content addiction, dopamine loop, dopamine hits, dopamine detox, dopamine fasting, instant gratification, attention economy, hijacked attention, predatory algorithms, engagement bait, rage bait, clickbait, viral bait, shock content, outrage content, yapping, yapper, caseoh, crash out, dogs out, big back, sweaty, mid, ate, ate and left no crumbs, down bad, tralalero tralala, bombardiro crocodilo, ballerina cappuccina, tung tung tung sahur, marumaru, limonchelo, italian brain rot, spanish brain rot, french brain rot, german brain rot, brazilian brain rot, cognitive overload, information overload, sensory overload, overstimulation, attention deficit, memory problems, brain fog, mental fog, dissociation, depersonalization, digital dementia, anxiety, depression, insomnia, sleep deprivation, burnout, mental health awareness, كم عدد ساعات التيك توك الآمنة, ما هي مدة التركيز الطبيعية, لماذا لا أستطيع التركيز على الكتب, هل التيك توك يقلل الذكاء, هل يوتيوب شورتس يسبب تشتت, هل ريلز انستقرام مسيئة للدماغ, هل في علاج لإدمان الشاشات, هل إدمان التيك توك حقيقي, كيف أعود لقراءة الكتب بعد التيك توك, ماذا يحدث للدماغ بعد ساعة تيك توك, هل المراهقون أكثر عرضة للبرين روت, متى يجب أن أقلع عن التيك توك, quiz for brain rot, brain rot meter, brain rot score, how rotted is your brain, degree of brain rot, brain rot level, rotted brain test, brain rot index, brain rot severity, brain rot assessment, brain rot evaluation, brain rot diagnosis, brain rot screening, brain rot detection, brain rot calculator, brain rot measurement, brain rot checklist, brain rot questionnaire, brain rot scale, brain rot rating, DaFuq Boom, kai cenat, fanum, ishowspeed, baby gronk, livvy dunne, skibidi toilet creator, #brainrotwords, #brainslang, #internetslang, #viralslang, #genalphaculture, #genzculture, #digitalculture, #onlineculture, #cyberculture, #brainrotrecovery, #digitaldetox, #screenaddiction, #tiktokaddiction, #dopaminereboot, #attentionspan, #mentalwellness, #cognitivehealth, #focusmatters, #reclaimyourmind, slop content, AI-generated slop, digital junk food, mental mcdonalds, cognitive sludge, brain trash, mind rot, cognitive damage, attention span killer, scroll coma, reel stupor, tiktok trance, doom scroll, zombie mode, autopilot scrolling, infinite scroll, self-violence, attention fragmentation, digital resting, binge mentality, snackable content, food for thought, low hanging fruit, quick fix, dopamine state, brain rot recovery, brain rot fix, recovery from brain rot, healing brain rot, brain rot solution, cure for brain rot, break the cycle, reset your brain, brain reboot, mental reset, digital reset, mind cleanse, digital cleanse, attention reset, focus training, mindfulness practice, meditation, deep breathing, sleep hygiene, blue light filter, screen free, phone free, no social media, social media fast, digital fast, offline challenge, 7 day detox, 30 day challenge, 90 day reset, cold turkey, habit breaking, habit formation, neuroplasticity, brain training games, cognitive behavioral therapy, CBT, therapy, mental health support, support group, accountability partner, هل البرين روت يصير للبالغين, ايه kurang البرين روت, فيم يختلف البرين روت عن الإدمان, هل القراءة تشفي البرين روت, المشي ينفع ضد تعفن الدماغ, الرياضة تعالج تعفن الدماغ, التأمل يمنع البرين روت, النوم الكافي يقلل التعفن, ما الفرق بين التيك توك واليوتيوب, ايهما أحسن يوتيوب طويل ولا شورتس, هل البودكاست جيد للبرين روت, هل الكتب الصوتية أفضل من الفيديو
      </div>
    </section>
  );
};

export default BrainRotDictionary;
