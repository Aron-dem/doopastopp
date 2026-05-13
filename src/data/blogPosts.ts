export interface BlogPost {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  content: { ar: string; en: string };
  image: string;
  date: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'brain-rot-oxford-word-of-the-year-2024',
    title: {
      ar: 'تعفن الدماغ (Brain Rot): كلمة العام 2024 من أكسفورد — ما هو وكيف تعالجه؟',
      en: 'Brain Rot: Oxford Word of the Year 2024 — What is it and how to fix it?'
    },
    summary: {
      ar: 'اكتشف لماذا تم اختيار "Brain Rot" ككلمة العام، وما هي أعراضها، وكيف يمكنك حماية عقلك من تأثيرات تيك توك والسوشيال ميديا.',
      en: 'Discover why "Brain Rot" was chosen as the word of the year, its symptoms, and how to protect your mind from the effects of TikTok and social media.'
    },
    date: '2024-12-10',
    author: 'Dopastopp Team',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop',
    content: {
      ar: `
# تعفن الدماغ (Brain Rot): كلمة العام 2024 من أكسفورد

في خطوة مفاجئة ولكنها تعكس واقعنا الرقمي، أعلنت **قواميس أكسفورد** أن مصطلح **"Brain Rot"** (تعفن الدماغ) هو "كلمة العام لعام 2024". هذا المصطلح ليس مجرد "ميم" (Meme) عابر، بل هو توصيف دقيق لحالة ذهنية يعاني منها الملايين بسبب الاستهلاك المفرط للمحتوى التافه.

## ما هو "تعفن الدماغ"؟

يُعرف تعفن الدماغ بأنه التدهور المفترض للحالة الذهنية أو الفكرية للشخص، والذي يُعزى غالباً إلى الاستهلاك المفرط للمحتوى الرقمي الذي يُعتبر منخفض الجودة أو غير هام، وخاصة الفيديوهات القصيرة والمحتوى المولد بالذكاء الاصطناعي.

### تأثيره الصحي الخطير
أظهرت دراسات حديثة أن الإفراط في استهلاك المحتوى القصير (TikTok, Reels, Shorts) يؤدي إلى:
- **انخفاض في مدة التركيز**: من 12 ثانية في عام 2000 إلى 8 ثوانٍ فقط اليوم.
- **ضعف الذاكرة قصيرة المدى**.
- **زيادة القلق والاكتئاب**.

---

## أعراض "تعفن الدماغ" — هل أنت مصاب؟

إذا لاحظت 3 من هذه الأعراض، فأنت على الأرجح تعاني من درجة من درجات تعفن الدماغ:
1. **عدم القدرة على التركيز**: لا تستطيع قراءة كتاب لأكثر من 5 دقائق.
2. **الرغبة المستمرة في التمرير**: لا تتوقف عن الـ Scroll حتى بعد ساعات.
3. **استخدام مصطلحات غريبة**: تقول "rizz" و "sigma" دون وعي.

---

## علاج تعفن الدماغ: كيفية استعادة دماغك

### ✅ 1. الصيام الرقمي (Digital Detox)
أسبوع بدون تيك توك، وحد يومي 30 دقيقة لكل منصات السوشيال ميديا.

### ✅ 2. العودة للقراءة العميقة
ابدأ بقراءة 10 صفحات يومياً من كتاب ورقي. هذا يعيد تدريب الدماغ على **التركيز العميق** (Deep Focus).
      `,
      en: `
# Brain Rot: Oxford Word of the Year 2024

In a surprising move that reflects our digital reality, **Oxford Languages** announced that the term **"Brain Rot"** is the "Word of the Year for 2024".

## What is "Brain Rot"?
Brain rot is defined as the supposed deterioration of a person's mental or intellectual state, often attributed to the excessive consumption of digital content considered low-quality or unimportant.

### Serious Health Impact
- **Decreased Attention Span**: From 12 seconds in 2000 to just 8 seconds today.
- **Weakened Short-term Memory**.
- **Increased Anxiety and Depression**.

---

## Treating Brain Rot: How to Reclaim Your Brain
1. **Digital Detox**: A week without TikTok.
2. **Return to Deep Reading**: Start by reading 10 pages a day of a physical book.
      `
    }
  },
  {
    id: '2',
    slug: 'digital-detox-guide-2025',
    title: {
      ar: 'دليل الديتوكس الرقمي 2025: كيف تستعيد تركيزك في 7 أيام؟',
      en: 'Digital Detox Guide 2025: How to Regain Your Focus in 7 Days?'
    },
    summary: {
      ar: 'خطة عملية ومجربة للتخلص من إدمان الشاشات واستعادة صفاء ذهنك بعيداً عن ضجيج الإشعارات.',
      en: 'A practical and proven plan to break screen addiction and reclaim your mental clarity away from notification noise.'
    },
    date: '2025-01-15',
    author: 'Dopastopp Team',
    image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?q=80&w=2070&auto=format&fit=crop',
    content: {
      ar: `
# دليل الديتوكس الرقمي 2025: استعد عقلك

هل تشعر أن هاتفك يملكك بدلاً من أن تملكه؟ إليك الدليل الشامل للديتوكس الرقمي.

## خطة الـ 7 أيام للتحول الرقمي

### اليوم 1-2: تنظيف البيئة الرقمية
- احذف التطبيقات التي لا تستخدمها.
- أوقف كافة الإشعارات غير الضرورية.

### اليوم 3-4: وضع الحدود
- لا هاتف في غرفة النوم.
- لا هاتف على طاولة الطعام.

### اليوم 5-7: إعادة الاتصال بالواقع
- اخرج للمشي بدون سماعات.
- اقرأ كتاباً ورقياً لمدة ساعة.
      `,
      en: `
# Digital Detox Guide 2025: Reclaim Your Mind

Do you feel like your phone owns you instead of the other way around?

## The 7-Day Digital Transformation Plan
1. **Cleanup**: Delete unused apps and turn off notifications.
2. **Boundaries**: No phone in the bedroom or at the dining table.
3. **Reconnect**: Walk without headphones and read physical books.
      `
    }
  },
  {
    id: '3',
    slug: 'what-is-dopamine-overload',
    title: {
      ar: 'ما هو حمل الدوبامين الزائد؟ وكيف يؤثر على حياتك؟',
      en: 'What is Dopamine Overload? And How Does It Affect Your Life?'
    },
    summary: {
      ar: 'تعرف على المفهوم العلمي وراء إجهاد الدماغ بسبب المحفزات الرقمية المستمرة.',
      en: 'Learn the scientific concept behind brain fatigue caused by constant digital stimuli.'
    },
    date: '2026-05-10',
    author: 'DopaStopp Team',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    content: {
      ar: `
# ما هو حمل الدوبامين الزائد؟ وكيف يؤثر على حياتك؟

الدوبامين هو ناقل عصبي في الدماغ يرتبط بالمتعة والمكافأة.

## المشكلة في العصر الرقمي
اليوم، نحن نعيش في عالم مصمم لاستنزاف الدوبامين لدينا. الإشعارات، "اللايكات"، والفيديوهات القصيرة تعطينا جرعات صغيرة وسريعة من الدوبامين دون أي جهد حقيقي.

### أعراض حمل الدوبامين الزائد:
1. **فقدان الاستمتاع بالأنشطة البسيطة.**
2. **التشتت المستمر.**
3. **الخمول والكسل.**
      `,
      en: `
# What is Dopamine Overload? And How Does It Affect Your Life?

Dopamine is a neurotransmitter in the brain associated with pleasure and reward.

## The Problem in the Digital Age
Notifications, "likes," and short videos give us small, quick hits of dopamine without any real effort.

### Symptoms:
1. **Loss of enjoyment in simple activities.**
2. **Constant distraction.**
3. **Lethargy and laziness.**
      `
    }
  },
  {
    id: '4',
    slug: 'signs-of-phone-addiction',
    title: {
      ar: '7 علامات تدل على أنك مدمن لهاتفك الذكي',
      en: '7 Signs You Are Addicted to Your Smartphone'
    },
    summary: {
      ar: 'هل تسيطر على هاتفك أم يسيطر هو عليك؟ اكتشف العلامات التحذيرية للإدمان الرقمي.',
      en: 'Do you control your phone or does it control you? Discover the warning signs of digital addiction.'
    },
    date: '2026-05-12',
    author: 'DopaStopp Team',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    content: {
      ar: `
# 7 علامات تدل على أنك مدمن لهاتفك الذكي

1. تفقد الهاتف فور الاستيقاظ.
2. القلق عند انخفاض البطارية.
3. استخدام الهاتف في الحمام.
4. إهمال المسؤوليات.
5. متلازمة الاهتزاز الوهمي.
6. فشل محاولات التقليل.
7. تدهور العلاقات الاجتماعية.
      `,
      en: `
# 7 Signs You Are Addicted to Your Smartphone

1. Checking the phone immediately upon waking up.
2. Anxiety when the battery is low.
3. Using the phone in the bathroom.
4. Neglecting responsibilities.
5. Phantom vibration syndrome.
6. Failed attempts to reduce usage.
7. Deterioration of social relationships.
      `
    }
  }
];
