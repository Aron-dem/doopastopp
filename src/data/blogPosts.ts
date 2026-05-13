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

الدوبامين هو ناقل عصبي في الدماغ يرتبط بالمتعة والمكافأة. في العصر الطبيعي، كان الدوبامين يُفرز عند تحقيق إنجازات حقيقية، مثل العثور على طعام أو حل مشكلة.

## المشكلة في العصر الرقمي
اليوم، نحن نعيش في عالم مصمم لاستنزاف الدوبامين لدينا. الإشعارات، "اللايكات"، والفيديوهات القصيرة تعطينا جرعات صغيرة وسريعة من الدوبامين دون أي جهد حقيقي.

### أعراض حمل الدوبامين الزائد:
1. **فقدان الاستمتاع بالأنشطة البسيطة:** مثل القراءة أو المشي.
2. **التشتت المستمر:** صعوبة في التركيز على مهمة واحدة لأكثر من دقائق.
3. **الخمول والكسل:** الشعور بالإرهاق رغم عدم القيام بمجهود بدني.

### كيف تعالج ذلك؟
الحل يكمن في ما يسمى بـ "صيام الدوبامين" أو تقليل المثيرات الاصطناعية للسماح لمستقبلات الدوبامين في دماغك بالعودة إلى مستوياتها الطبيعية.
      `,
      en: `
# What is Dopamine Overload? And How Does It Affect Your Life?

Dopamine is a neurotransmitter in the brain associated with pleasure and reward. In the natural era, dopamine was released upon achieving real accomplishments, such as finding food or solving a problem.

## The Problem in the Digital Age
Today, we live in a world designed to drain our dopamine. Notifications, "likes," and short videos give us small, quick hits of dopamine without any real effort.

### Symptoms of Dopamine Overload:
1. **Loss of enjoyment in simple activities:** such as reading or walking.
2. **Constant distraction:** difficulty focusing on a single task for more than a few minutes.
3. **Lethargy and laziness:** feeling exhausted despite no physical effort.

### How to treat it?
The solution lies in what is called "Dopamine Fasting" or reducing artificial stimuli to allow the dopamine receptors in your brain to return to their natural levels.
      `
    }
  },
  {
    id: '2',
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

إدمان الهاتف ليس مجرد قضاء وقت طويل عليه، بل هو حالة نفسية تؤثر على جودة حياتك وعلاقاتك.

## العلامات التحذيرية:
1. **تفقد الهاتف فور الاستيقاظ:** قبل حتى أن تغسل وجهك.
2. **القلق عند انخفاض البطارية:** شعور بالتوتر غير المبرر.
3. **استخدام الهاتف في الحمام:** عدم القدرة على البقاء وحيداً مع أفكارك لدقائق.
4. **إهمال المسؤوليات:** تأجيل العمل أو الدراسة من أجل التصفح.
5. **متلازمة الاهتزاز الوهمي:** الشعور بأن هاتفك يهتز وهو ليس كذلك.
6. **فشل محاولات التقليل:** وعد نفسك بـ 5 دقائق وينتهي الأمر بساعتين.
7. **تدهور العلاقات الاجتماعية:** تفضيل الهاتف على الجلوس مع العائلة والأصدقاء.

إذا كنت تعاني من أكثر من 4 علامات، فقد حان الوقت لإعادة تقييم علاقتك بجهازك.
      `,
      en: `
# 7 Signs You Are Addicted to Your Smartphone

Phone addiction is not just about spending a long time on it; it's a psychological state that affects the quality of your life and relationships.

## Warning Signs:
1. **Checking the phone immediately upon waking up:** even before washing your face.
2. **Anxiety when the battery is low:** a feeling of unjustified tension.
3. **Using the phone in the bathroom:** inability to be alone with your thoughts for minutes.
4. **Neglecting responsibilities:** postponing work or study for browsing.
5. **Phantom vibration syndrome:** feeling your phone vibrate when it isn't.
6. **Failed attempts to reduce usage:** promising yourself 5 minutes and ending up with two hours.
7. **Deterioration of social relationships:** preferring the phone over sitting with family and friends.

If you suffer from more than 4 signs, it's time to re-evaluate your relationship with your device.
      `
    }
  },
  {
    id: '3',
    slug: 'improve-focus-naturally',
    title: {
      ar: 'كيف تحسن تركيزك بشكل طبيعي وبدون أدوية',
      en: 'How to Improve Your Focus Naturally Without Medication'
    },
    summary: {
      ar: 'طرق عملية ومثبتة علمياً لاستعادة "عضلة التركيز" في عالم مليء بالمشتتات.',
      en: 'Practical and scientifically proven ways to reclaim your "focus muscle" in a world full of distractions.'
    },
    date: '2026-05-14',
    author: 'DopaStopp Team',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    content: {
      ar: `
# كيف تحسن تركيزك بشكل طبيعي وبدون أدوية

التركيز ليس موهبة تولد بها، بل هو عضلة يمكن تدريبها وتقويتها.

## استراتيجيات تحسين التركيز:
### 1. تقنية البومودورو (Pomodoro)
العمل لمدة 25 دقيقة ثم أخذ استراحة لـ 5 دقائق. هذا يساعد الدماغ على البقاء منتعشاً.

### 2. العمل العميق (Deep Work)
خصص وقتًا في يومك (ساعة أو ساعتين) يكون فيه الهاتف في غرفة أخرى والإنترنت مقطوعاً إذا أمكن.

### 3. التأمل واليقظة الذهنية
التأمل لـ 10 دقائق يومياً يغير حرفياً بنية الدماغ المرتبطة بالانتباه.

### 4. النوم الكافي
الدماغ المتعب لا يمكنه التركيز. تأكد من الحصول على 7-8 ساعات من النوم العميق.
      `,
      en: `
# How to Improve Your Focus Naturally Without Medication

Focus is not a talent you are born with; it is a muscle that can be trained and strengthened.

## Strategies to Improve Focus:
### 1. Pomodoro Technique
Working for 25 minutes then taking a 5-minute break. This helps the brain stay refreshed.

### 2. Deep Work
Dedicate time in your day (an hour or two) where the phone is in another room and the internet is disconnected if possible.

### 3. Meditation and Mindfulness
Meditating for 10 minutes a day literally changes the brain structure associated with attention.

### 4. Adequate Sleep
A tired brain cannot focus. Make sure to get 7-8 hours of deep sleep.
      `
    }
  },
  {
    id: '4',
    slug: 'social-media-brain-effects',
    title: {
      ar: 'كيف تؤثر وسائل التواصل الاجتماعي على دماغك؟',
      en: 'How Does Social Media Affect Your Brain?'
    },
    summary: {
      ar: 'تحليل علمي لما يحدث خلف الكواليس في جهازك العصبي عند استخدام تطبيقات التواصل.',
      en: 'A scientific analysis of what happens behind the scenes in your nervous system when using social apps.'
    },
    date: '2026-05-15',
    author: 'DopaStopp Team',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    content: {
      ar: `
# كيف تؤثر وسائل التواصل الاجتماعي على دماغك؟

وسائل التواصل الاجتماعي ليست مجرد أدوات للتواصل؛ إنها مختبرات نفسية مصممة للتلاعب بكيميائية الدماغ.

## آليات التأثير:
### 1. حلقة المكافأة الدوبامينية
كل "لايك" أو تعليق يحفز إفراز الدوبامين، مما يخلق حلقة إدمانية تجعلك تعود للمزيد.

### 2. تآكل المادة الرمادية
تشير بعض الدراسات إلى أن الاستخدام المفرط قد يرتبط بتقليل كثافة المادة الرمادية في مناطق الدماغ المسؤولة عن التحكم في الانفعالات.

### 3. المقارنة الاجتماعية والقلق
رؤية حياة الآخرين "المثالية" تؤدي إلى إفراز الكورتيزول (هرمون التوتر)، مما يزيد من القلق وتدني احترام الذات.
      `,
      en: `
# How Does Social Media Affect Your Brain?

Social media are not just communication tools; they are psychological laboratories designed to manipulate brain chemistry.

## Mechanisms of Influence:
### 1. Dopamine Reward Loop
Every "like" or comment triggers dopamine release, creating an addictive loop that keeps you coming back for more.

### 2. Gray Matter Erosion
Some studies suggest that excessive use may be linked to reduced gray matter density in brain regions responsible for impulse control.

### 3. Social Comparison and Anxiety
Seeing others' "perfect" lives leads to cortisol (stress hormone) release, increasing anxiety and lowering self-esteem.
      `
    }
  }
];
