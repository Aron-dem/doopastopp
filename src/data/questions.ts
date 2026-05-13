export type Region = 'ar' | 'en';

export interface Question {
  id: number;
  section: number;
  sectionName: { ar: string; en: string };
  text: { ar: string; en: string };
  reversed: boolean;
}

export const SECTIONS = [
  { id: 1, nameAr: 'التركيز والانتباه', nameEn: 'Focus & Attention', icon: '🎯', color: '#8B5CF6' },
  { id: 2, nameAr: 'التحفيز والدوبامين', nameEn: 'Motivation & Dopamine', icon: '⚡', color: '#EC4899' },
  { id: 3, nameAr: 'التحكم والاندفاع', nameEn: 'Control & Impulsivity', icon: '🔥', color: '#F59E0B' },
  { id: 4, nameAr: 'الإرهاق الذهني', nameEn: 'Mental Fatigue', icon: '🧠', color: '#EF4444' },
  { id: 5, nameAr: 'العمل العميق', nameEn: 'Deep Work', icon: '✨', color: '#10B981' },
];

const DEFAULT_QUESTIONS: Question[] = [
  // Section 1: Focus & Attention (4 questions)
  { id: 1, section: 1, sectionName: { ar: 'التركيز والانتباه', en: 'Focus & Attention' }, text: { ar: 'تبدأ مهمة (مثل المذاكرة أو العمل) ثم تجد نفسك تتصفح السوشيال ميديا خلال دقائق.', en: 'You start a task (e.g., work, study) and find yourself switching to check social media within minutes.' }, reversed: false },
  { id: 2, section: 1, sectionName: { ar: 'التركيز والانتباه', en: 'Focus & Attention' }, text: { ar: 'تجد صعوبة في قراءة مقال طويل أو كتاب دون الشعور برغبة في تفقد هاتفك.', en: 'You find it difficult to read a long article or book without feeling the urge to check your phone.' }, reversed: false },
  { id: 3, section: 1, sectionName: { ar: 'التركيز والانتباه', en: 'Focus & Attention' }, text: { ar: 'تستطيع التركيز في عمل واحد لمدة ساعة كاملة دون أي مقاطعة رقمية.', en: 'You can focus on a single task for a full hour without any digital interruptions.' }, reversed: true },
  { id: 4, section: 1, sectionName: { ar: 'التركيز والانتباه', en: 'Focus & Attention' }, text: { ar: 'تجد نفسك تفتح الهاتف بشكل تلقائي دون وجود سبب محدد.', en: 'You find yourself opening your phone automatically without a specific reason.' }, reversed: false },

  // Section 2: Motivation & Dopamine (3 questions)
  { id: 5, section: 2, sectionName: { ar: 'التحفيز والدوبامين', en: 'Motivation & Dopamine' }, text: { ar: 'تشعر بالملل بسرعة من أي نشاط لا يعطيك مكافأة فورية.', en: 'You get bored quickly with any activity that doesn\'t give you an immediate reward.' }, reversed: false },
  { id: 6, section: 2, sectionName: { ar: 'التحفيز والدوبامين', en: 'Motivation & Dopamine' }, text: { ar: 'تفضل مشاهدة الفيديوهات القصيرة (Reels/TikTok) على مشاهدة فيلم أو فيديو طويل.', en: 'You prefer watching short videos (Reels/TikTok) over watching a movie or a long video.' }, reversed: false },
  { id: 7, section: 2, sectionName: { ar: 'التحفيز والدوبامين', en: 'Motivation & Dopamine' }, text: { ar: 'تجد متعة في الأنشطة البسيطة مثل المشي أو الطبخ دون استهلاك محتوى رقمي.', en: 'You find pleasure in simple activities like walking or cooking without consuming digital content.' }, reversed: true },

  // Section 3: Control & Impulsivity (3 questions)
  { id: 8, section: 3, sectionName: { ar: 'التحكم والاندفاع', en: 'Control & Impulsivity' }, text: { ar: 'تعد نفسك بفتح الهاتف لـ 5 دقائق فقط، ثم تكتشف مرور ساعة كاملة.', en: 'You promise yourself to open the phone for only 5 minutes, then discover a full hour has passed.' }, reversed: false },
  { id: 9, section: 3, sectionName: { ar: 'التحكم والاندفاع', en: 'Control & Impulsivity' }, text: { ar: 'تتفقد هاتفك فور استيقاظك من النوم وقبل مغادرة السرير.', en: 'You check your phone as soon as you wake up and before leaving bed.' }, reversed: false },
  { id: 10, section: 3, sectionName: { ar: 'التحكم والاندفاع', en: 'Control & Impulsivity' }, text: { ar: 'لديك القدرة على تجاهل الإشعارات غير الهامة حتى تنهي ما بيدك.', en: 'You have the ability to ignore unimportant notifications until you finish what you\'re doing.' }, reversed: true },

  // Section 4: Mental Fatigue (3 questions)
  { id: 11, section: 4, sectionName: { ar: 'الإرهاق الذهني', en: 'Mental Fatigue' }, text: { ar: 'تشعر بإرهاق ذهني وضبابية في التفكير بعد قضاء وقت طويل على الشاشة.', en: 'You feel mental fatigue and brain fog after spending a long time on the screen.' }, reversed: false },
  { id: 12, section: 4, sectionName: { ar: 'الإرهاق الذهني', en: 'Mental Fatigue' }, text: { ar: 'تستيقظ وأنت تشعر بالنشاط والوضوح الذهني أغلب أيام الأسبوع.', en: 'You wake up feeling energetic and mentally clear most days of the week.' }, reversed: true },
  { id: 13, section: 4, sectionName: { ar: 'الإرهاق الذهني', en: 'Mental Fatigue' }, text: { ar: 'تشعر أن ذاكرتك أصبحت أضعف في الفترة الأخيرة.', en: 'You feel your memory has become weaker recently.' }, reversed: false },

  // Section 5: Deep Work (4 questions)
  { id: 14, section: 5, sectionName: { ar: 'العمل العميق', en: 'Deep Work' }, text: { ar: 'تستطيع الدخول في حالة "التدفق" (Flow) والاندماج التام في عملك.', en: 'You can enter a state of "Flow" and total immersion in your work.' }, reversed: true },
  { id: 15, section: 5, sectionName: { ar: 'العمل العميق', en: 'Deep Work' }, text: { ar: 'تخصص أوقاتاً محددة في يومك للعمل العميق دون أي اتصالات.', en: 'You dedicate specific times in your day for deep work without any communications.' }, reversed: true },
  { id: 16, section: 5, sectionName: { ar: 'العمل العميق', en: 'Deep Work' }, text: { ar: 'تشعر بالحاجة لتفقد البريد الإلكتروني أو الرسائل كل بضع دقائق أثناء العمل.', en: 'You feel the need to check email or messages every few minutes while working.' }, reversed: false },
  { id: 17, section: 5, sectionName: { ar: 'العمل العميق', en: 'Deep Work' }, text: { ar: 'تجد صعوبة في البدء بأي مهمة تتطلب مجهوداً ذهنياً كبيراً.', en: 'You find it difficult to start any task that requires significant mental effort.' }, reversed: false },
];

// Function to load questions from environment variable
const loadQuestions = (): Question[] => {
  const envData = import.meta.env.VITE_QUESTIONS_DATA;
  if (envData) {
    try {
      const decoded = atob(envData);
      const parsed = JSON.parse(decoded);
      return parsed.map((q: any) => ({
        id: q.id,
        section: q.section,
        reversed: q.reversed,
        sectionName: { ar: q['section.ar'] || q.sectionName?.ar, en: q['section.en'] || q.sectionName?.en },
        text: { ar: q['text.ar'] || q.text?.ar, en: q['text.en'] || q.text?.en }
      }));
    } catch (e) {
      console.error("Failed to parse VITE_QUESTIONS_DATA", e);
    }
  }
  // Return default questions if no env data provided
  return DEFAULT_QUESTIONS;
};

export const QUESTIONS = loadQuestions();

export interface ResultLevel {
  min: number;
  max: number;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  color: string;
  level: 'healthy' | 'mild' | 'moderate' | 'severe' | 'critical';
  colorClass: string;
  brainyMood: 'healthy' | 'mild' | 'moderate' | 'severe' | 'critical';
}

export const RESULT_LEVELS: ResultLevel[] = [
  {
    min: 0, max: 13,
    level: 'healthy',
    colorClass: 'text-emerald-400',
    brainyMood: 'healthy',
    title: { ar: 'دماغ حديدي 🛡️', en: 'Iron Brain 🛡️' },
    desc: { ar: 'أنت في حالة ممتازة! تركيزك عالٍ وقدرتك على التحكم في الدوبامين مبهرة.', en: 'You are in excellent shape! Your focus is high and your dopamine control is impressive.' },
    color: 'text-emerald-400'
  },
  {
    min: 14, max: 28,
    level: 'mild',
    colorClass: 'text-lime-400',
    brainyMood: 'mild',
    title: { ar: 'دماغ صحي ✅', en: 'Healthy Brain ✅' },
    desc: { ar: 'وضعك جيد جداً، لديك بعض التشتت البسيط ولكنك مسيطر على حياتك الرقمية.', en: 'You are doing well. You have some minor distractions but you are in control of your digital life.' },
    color: 'text-lime-400'
  },
  {
    min: 29, max: 43,
    level: 'moderate',
    colorClass: 'text-yellow-400',
    brainyMood: 'moderate',
    title: { ar: 'بداية تعفن ⚠️', en: 'Early Rot ⚠️' },
    desc: { ar: 'انتبه! السوشيال ميديا بدأت تؤثر على تركيزك وطاقتك الذهنية.', en: 'Watch out! Social media is starting to affect your focus and mental energy.' },
    color: 'text-yellow-400'
  },
  {
    min: 44, max: 56,
    level: 'severe',
    colorClass: 'text-orange-500',
    brainyMood: 'severe',
    title: { ar: 'تعفن متقدم 🍄', en: 'Advanced Rot 🍄' },
    desc: { ar: 'دماغك يعاني. التشتت أصبح جزءاً من يومك وتحتاج لتدخل سريع لاستعادة تركيزك.', en: 'Your brain is struggling. Distraction has become part of your day and you need quick intervention.' },
    color: 'text-orange-500'
  },
  {
    min: 57, max: 68,
    level: 'critical',
    colorClass: 'text-red-500',
    brainyMood: 'critical',
    title: { ar: 'تعفن كامل 💀', en: 'Total Brain Rot 💀' },
    desc: { ar: 'حالة طوارئ! دماغك غارق في الدوبامين السريع. تحتاج لـ "ديتوكس" رقمي فوراً.', en: 'Emergency! Your brain is drowning in cheap dopamine. You need a digital detox immediately.' },
    color: 'text-red-500'
  }
];

export const CHALLENGE_DAYS = [
  {
    day: 1,
    icon: '📵',
    titleAr: 'صيام السوشيال ميديا',
    titleEn: 'Social Media Fast',
    descAr: 'احذف تطبيقات السوشيال ميديا لمدة 24 ساعة. لا تقلق، لن يفوتك شيء مهم.',
    descEn: 'Delete social media apps for 24 hours. Don\'t worry, you won\'t miss anything important.',
    tipAr: 'نصيحة: ضع هاتفك في غرفة أخرى قبل النوم.',
    tipEn: 'Tip: Put your phone in another room before sleep.'
  },
  {
    day: 2,
    icon: '🧘',
    titleAr: 'استعادة الهدوء الذهني',
    titleEn: 'Mental Calmness',
    descAr: 'مارس التأمل أو الجلوس في صمت لمدة 15 دقيقة بدون أي مشتتات.',
    descEn: 'Practice meditation or sit in silence for 15 minutes without any distractions.',
    tipAr: 'نصيحة: ركز على تنفسك فقط.',
    tipEn: 'Tip: Just focus on your breathing.'
  },
  {
    day: 3,
    icon: '📖',
    titleAr: 'القراءة العميقة',
    titleEn: 'Deep Reading',
    descAr: 'اقرأ 10 صفحات من كتاب ورقي. لا تستخدم الكتب الإلكترونية اليوم.',
    descEn: 'Read 10 pages of a physical book. Don\'t use e-books today.',
    tipAr: 'نصيحة: اختر كتاباً كنت ترغب في قراءته منذ فترة.',
    tipEn: 'Tip: Pick a book you\'ve wanted to read for a while.'
  },
  {
    day: 4,
    icon: '🚶',
    titleAr: 'المشي بدون هاتف',
    titleEn: 'Phone-free Walk',
    descAr: 'اخرج للمشي لمدة 20 دقيقة بدون سماعات أو هاتف. استمتع بمحيطك.',
    descEn: 'Go for a 20-minute walk without headphones or a phone. Enjoy your surroundings.',
    tipAr: 'نصيحة: لاحظ التفاصيل الصغيرة في طريقك.',
    tipEn: 'Tip: Notice the small details on your path.'
  },
  {
    day: 5,
    icon: '✨',
    titleAr: 'يوم الإبداع',
    titleEn: 'Creativity Day',
    descAr: 'قم بممارسة هواية يدوية أو كتابة يومياتك لمدة 30 دقيقة.',
    descEn: 'Practice a manual hobby or write in your journal for 30 minutes.',
    tipAr: 'نصيحة: الإبداع يزدهر في غياب المشتتات الرقمية.',
    tipEn: 'Tip: Creativity flourishes in the absence of digital distractions.'
  }
];
