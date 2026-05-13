// نظام المستويات الخمسة مع خطط التحسين

export interface LevelInfo {
  id: number;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  scoreRange: { min: number; max: number };
  color: string;
  emoji: string;
  personalityAnalysis: { ar: string; en: string };
  improvements: { ar: string; en: string }[];
  motivation: { ar: string; en: string };
}

export interface DayPlan {
  day: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  activities: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    duration: string;
  }[];
  tips: { ar: string; en: string }[];
  challenge: { ar: string; en: string };
}

export interface LevelPlan {
  levelId: number;
  days: DayPlan[];
}

// تعريف المستويات الخمسة
export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    name: { ar: 'المبتدئ', en: 'Beginner' },
    description: { ar: 'تعفن دماغ حاد جداً', en: 'Severe Brain Rot' },
    scoreRange: { min: 0, max: 13 },
    color: '#EF4444',
    emoji: '🔴',
    personalityAnalysis: {
      ar: 'أنت تعاني من تعفن دماغ حاد جداً. التركيز شبه مستحيل، والاندفاع هو الحاكم، والإرهاق الذهني مستمر. تحتاج إلى تدخل فوري وجدي.',
      en: 'You are experiencing severe brain rot. Focus is nearly impossible, impulsivity is dominant, and mental fatigue is constant. You need immediate and serious intervention.'
    },
    improvements: [
      { ar: 'ابدأ بفترات تركيز قصيرة جداً (5 دقائق فقط)', en: 'Start with very short focus sessions (5 minutes only)' },
      { ar: 'ضع هاتفك في غرفة أخرى أثناء العمل', en: 'Put your phone in another room while working' },
      { ar: 'قلل استخدام وسائل التواصل الاجتماعي بشكل جذري', en: 'Drastically reduce social media usage' },
      { ar: 'نم 8 ساعات على الأقل كل ليلة', en: 'Sleep at least 8 hours every night' }
    ],
    motivation: {
      ar: 'أنت في أسوأ حالة، لكن هذا يعني أن أي تحسن سيكون ملحوظاً جداً. ابدأ الآن!',
      en: 'You are at the worst point, but that means any improvement will be dramatic. Start now!'
    }
  },
  {
    id: 2,
    name: { ar: 'المتوسط', en: 'Intermediate' },
    description: { ar: 'تعفن دماغ متوسط إلى حاد', en: 'Moderate to Severe Brain Rot' },
    scoreRange: { min: 14, max: 28 },
    color: '#F97316',
    emoji: '🟠',
    personalityAnalysis: {
      ar: 'أنت تعاني من تعفن دماغ متوسط إلى حاد. لديك بعض القدرة على التركيز، لكن الاندفاع والإرهاق يؤثران عليك بشكل كبير.',
      en: 'You are experiencing moderate to severe brain rot. You have some focus ability, but impulsivity and fatigue significantly impact you.'
    },
    improvements: [
      { ar: 'زيادة فترات التركيز تدريجياً (10-15 دقيقة)', en: 'Gradually increase focus sessions (10-15 minutes)' },
      { ar: 'استخدم تقنية بومودورو (25 دقيقة عمل + 5 دقائق راحة)', en: 'Use the Pomodoro technique (25 min work + 5 min break)' },
      { ar: 'قلل وقت وسائل التواصل الاجتماعي إلى ساعة واحدة يومياً', en: 'Limit social media to 1 hour per day' },
      { ar: 'مارس تمارين التنفس والتأمل', en: 'Practice breathing exercises and meditation' }
    ],
    motivation: {
      ar: 'أنت في منتصف الطريق. مع الالتزام والمثابرة، ستصل إلى المستوى التالي بسهولة.',
      en: 'You are halfway there. With commitment and persistence, you will reach the next level easily.'
    }
  },
  {
    id: 3,
    name: { ar: 'المتقدم', en: 'Advanced' },
    description: { ar: 'تعفن دماغ متوسط', en: 'Moderate Brain Rot' },
    scoreRange: { min: 29, max: 43 },
    color: '#FBBF24',
    emoji: '🟡',
    personalityAnalysis: {
      ar: 'أنت تعاني من تعفن دماغ متوسط. لديك قدرة معقولة على التركيز، لكن هناك مجالات تحتاج إلى تحسين.',
      en: 'You are experiencing moderate brain rot. You have reasonable focus ability, but there are areas that need improvement.'
    },
    improvements: [
      { ar: 'استهدف جلسات تركيز مدتها 45 دقيقة', en: 'Target 45-minute focus sessions' },
      { ar: 'اقرأ كتاباً لمدة 30 دقيقة يومياً', en: 'Read a book for 30 minutes daily' },
      { ar: 'قلل وقت الشاشة قبل النوم بساعة واحدة', en: 'Reduce screen time 1 hour before bed' },
      { ar: 'مارس الرياضة 30 دقيقة يومياً', en: 'Exercise for 30 minutes daily' }
    ],
    motivation: {
      ar: 'أنت في الطريق الصحيح! استمر في الجهد وستصل إلى دماغ سليم قريباً.',
      en: 'You are on the right track! Keep up the effort and you will reach a healthy brain soon.'
    }
  },
  {
    id: 4,
    name: { ar: 'الخبير', en: 'Expert' },
    description: { ar: 'تعفن دماغ خفيف', en: 'Mild Brain Rot' },
    scoreRange: { min: 44, max: 56 },
    color: '#A3E635',
    emoji: '🟢',
    personalityAnalysis: {
      ar: 'أنت تعاني من تعفن دماغ خفيف جداً. قدرتك على التركيز جيدة، والاندفاع تحت السيطرة، والإرهاق قليل.',
      en: 'You are experiencing mild brain rot. Your focus ability is good, impulsivity is under control, and fatigue is minimal.'
    },
    improvements: [
      { ar: 'حافظ على جلسات التركيز العميق (60 دقيقة)', en: 'Maintain deep focus sessions (60 minutes)' },
      { ar: 'اقرأ 1-2 ساعة يومياً', en: 'Read 1-2 hours daily' },
      { ar: 'تعلم مهارة جديدة', en: 'Learn a new skill' },
      { ar: 'ساعد الآخرين على التحسن', en: 'Help others improve' }
    ],
    motivation: {
      ar: 'أنت قريب جداً من النهاية! استمر في الجهد وستصل إلى دماغ سليم تماماً.',
      en: 'You are very close to the end! Keep up the effort and you will reach a completely healthy brain.'
    }
  },
  {
    id: 5,
    name: { ar: 'الماهر', en: 'Master' },
    description: { ar: 'دماغ سليم', en: 'Healthy Brain' },
    scoreRange: { min: 57, max: 68 },
    color: '#22C55E',
    emoji: '🟢✨',
    personalityAnalysis: {
      ar: 'مبروك! أنت وصلت إلى دماغ سليم تماماً. التركيز ممتاز، الاندفاع تحت السيطرة الكاملة، والإرهاق الذهني شبه معدوم.',
      en: 'Congratulations! You have reached a completely healthy brain. Focus is excellent, impulsivity is fully under control, and mental fatigue is almost non-existent.'
    },
    improvements: [
      { ar: 'حافظ على عاداتك الجيدة', en: 'Maintain your good habits' },
      { ar: 'ساعد الآخرين على التحسن', en: 'Help others improve' },
      { ar: 'استمر في التعلم والنمو', en: 'Continue learning and growing' },
      { ar: 'كن قدوة للآخرين', en: 'Be a role model for others' }
    ],
    motivation: {
      ar: 'أنت نجحت! الآن ساعد الآخرين على الوصول إلى حيث أنت.',
      en: 'You succeeded! Now help others reach where you are.'
    }
  }
];

// خطط التحسين لكل مستوى
export const LEVEL_PLANS: LevelPlan[] = [
  // المستوى الأول
  {
    levelId: 1,
    days: [
      {
        day: 1,
        title: { ar: 'فهم الحالة', en: 'Understanding Your Condition' },
        description: { ar: 'اليوم الأول: تقييم وفهم حالتك الحالية', en: 'Day 1: Assessment and understanding your current state' },
        activities: [
          {
            title: { ar: 'قياس الاستخدام الحالي', en: 'Measure Current Usage' },
            description: { ar: 'تتبع كم ساعة تقضيها على الهاتف والإنترنت', en: 'Track how many hours you spend on phone and internet' },
            duration: '30 دقيقة'
          },
          {
            title: { ar: 'تحديد المحفزات', en: 'Identify Triggers' },
            description: { ar: 'اكتب ما الذي يجعلك تفتح الهاتف بشكل لا إرادي', en: 'Write down what makes you pick up your phone unconsciously' },
            duration: '20 دقيقة'
          },
          {
            title: { ar: 'التعهد بالالتزام', en: 'Commitment Pledge' },
            description: { ar: 'اكتب تعهداً لنفسك بالالتزام بالخطة', en: 'Write a commitment pledge to yourself' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'كن صادقاً مع نفسك في التقييم', en: 'Be honest with yourself in the assessment' },
          { ar: 'لا تحكم على نفسك، فقط لاحظ', en: 'Do not judge yourself, just observe' },
          { ar: 'احفظ هذا التقييم للمقارنة لاحقاً', en: 'Save this assessment for later comparison' }
        ],
        challenge: { ar: 'لا تستخدم الهاتف لمدة 30 دقيقة', en: 'Do not use your phone for 30 minutes' }
      },
      {
        day: 2,
        title: { ar: 'بناء العادات الأساسية', en: 'Building Basic Habits' },
        description: { ar: 'اليوم الثاني: ابدأ بعادات بسيطة وسهلة', en: 'Day 2: Start with simple and easy habits' },
        activities: [
          {
            title: { ar: 'وضع الهاتف بعيداً', en: 'Put Phone Away' },
            description: { ar: 'ضع هاتفك في غرفة أخرى لمدة 1 ساعة', en: 'Put your phone in another room for 1 hour' },
            duration: '1 ساعة'
          },
          {
            title: { ar: 'تمرين التركيز', en: 'Focus Exercise' },
            description: { ar: 'اقضِ 5 دقائق في التركيز على شيء واحد فقط', en: 'Spend 5 minutes focusing on one thing only' },
            duration: '5 دقائق'
          },
          {
            title: { ar: 'المشي والتأمل', en: 'Walk and Meditate' },
            description: { ar: 'خذ نزهة هادئة لمدة 15 دقيقة بدون هاتف', en: 'Take a quiet walk for 15 minutes without your phone' },
            duration: '15 دقيقة'
          }
        ],
        tips: [
          { ar: 'ابدأ بفترات قصيرة جداً', en: 'Start with very short periods' },
          { ar: 'كن لطيفاً مع نفسك إذا فشلت', en: 'Be gentle with yourself if you fail' },
          { ar: 'احتفل بكل نجاح صغير', en: 'Celebrate every small success' }
        ],
        challenge: { ar: 'لا تفتح وسائل التواصل الاجتماعي لمدة 24 ساعة', en: 'Do not open social media for 24 hours' }
      },
      {
        day: 3,
        title: { ar: 'التعمق والتطبيق', en: 'Going Deeper' },
        description: { ar: 'اليوم الثالث: زيادة المدة والتحدي', en: 'Day 3: Increase duration and challenge' },
        activities: [
          {
            title: { ar: 'جلسة تركيز 10 دقائق', en: '10-Minute Focus Session' },
            description: { ar: 'اقضِ 10 دقائق متواصلة في عمل واحد', en: 'Spend 10 continuous minutes on one task' },
            duration: '10 دقائق'
          },
          {
            title: { ar: 'قراءة بدون هاتف', en: 'Reading Without Phone' },
            description: { ar: 'اقرأ كتاباً أو مقالة لمدة 15 دقيقة', en: 'Read a book or article for 15 minutes' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'تمرين التنفس', en: 'Breathing Exercise' },
            description: { ar: 'مارس تمرين التنفس العميق لمدة 5 دقائق', en: 'Practice deep breathing for 5 minutes' },
            duration: '5 دقائق'
          }
        ],
        tips: [
          { ar: 'اختر مكاناً هادئاً للتركيز', en: 'Choose a quiet place to focus' },
          { ar: 'أغلق جميع الإشعارات', en: 'Close all notifications' },
          { ar: 'اشرب الماء بانتظام', en: 'Drink water regularly' }
        ],
        challenge: { ar: 'لا تستخدم الهاتف قبل الساعة 10 صباحاً', en: 'Do not use phone before 10 AM' }
      },
      {
        day: 4,
        title: { ar: 'التثبيت والاستقرار', en: 'Consolidation' },
        description: { ar: 'اليوم الرابع: ثبت ما تعلمته', en: 'Day 4: Consolidate what you learned' },
        activities: [
          {
            title: { ar: 'جلسة تركيز 15 دقيقة', en: '15-Minute Focus Session' },
            description: { ar: 'اقضِ 15 دقيقة متواصلة في عمل واحد', en: 'Spend 15 continuous minutes on one task' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'تقييم التقدم', en: 'Progress Review' },
            description: { ar: 'اكتب ملاحظات عن التحسن الذي لاحظته', en: 'Write notes about improvements you noticed' },
            duration: '10 دقائق'
          },
          {
            title: { ar: 'تمرين بدني', en: 'Physical Exercise' },
            description: { ar: 'مارس رياضة خفيفة لمدة 20 دقيقة', en: 'Do light exercise for 20 minutes' },
            duration: '20 دقيقة'
          }
        ],
        tips: [
          { ar: 'لاحظ الفروقات الصغيرة', en: 'Notice small differences' },
          { ar: 'كن فخوراً بنفسك', en: 'Be proud of yourself' },
          { ar: 'شارك تقدمك مع شخص تثق به', en: 'Share your progress with someone you trust' }
        ],
        challenge: { ar: 'لا تستخدم الهاتف لمدة ساعة واحدة بعد الاستيقاظ', en: 'Do not use phone for 1 hour after waking up' }
      },
      {
        day: 5,
        title: { ar: 'التقييم والانتقال', en: 'Assessment and Transition' },
        description: { ar: 'اليوم الخامس: قيّم تقدمك واستعد للمستوى التالي', en: 'Day 5: Assess your progress and prepare for the next level' },
        activities: [
          {
            title: { ar: 'جلسة تركيز 20 دقيقة', en: '20-Minute Focus Session' },
            description: { ar: 'اقضِ 20 دقيقة متواصلة في عمل واحد', en: 'Spend 20 continuous minutes on one task' },
            duration: '20 دقيقة'
          },
          {
            title: { ar: 'تقييم شامل', en: 'Comprehensive Review' },
            description: { ar: 'قارن حالتك اليوم بحالتك في اليوم الأول', en: 'Compare your condition today with day 1' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'الاستعداد للاختبار', en: 'Prepare for Test' },
            description: { ar: 'استعد نفسياً للاختبار في المستوى التالي', en: 'Mentally prepare for the test in the next level' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'تذكر أنك أنجزت الكثير في 5 أيام', en: 'Remember you accomplished a lot in 5 days' },
          { ar: 'كن متفائلاً بشأن المستقبل', en: 'Be optimistic about the future' },
          { ar: 'استمر في تطبيق ما تعلمته', en: 'Continue applying what you learned' }
        ],
        challenge: { ar: 'اختبر نفسك الآن وشوف تقدمك!', en: 'Test yourself now and see your progress!' }
      }
    ]
  },
  // المستوى الثاني
  {
    levelId: 2,
    days: [
      {
        day: 1,
        title: { ar: 'تنظيم الفوضى الرقمية', en: 'Organizing Digital Chaos' },
        description: { ar: 'اليوم الأول: تقليل المشتتات التقنية', en: 'Day 1: Reducing tech distractions' },
        activities: [
          {
            title: { ar: 'تنظيف الإشعارات', en: 'Notification Cleanup' },
            description: { ar: 'إلغاء تفعيل كافة الإشعارات غير الضرورية', en: 'Disable all non-essential notifications' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'تحديد تطبيقات الإدمان', en: 'Identify Addictive Apps' },
            description: { ar: 'حذف أو إخفاء التطبيقات التي تستهلك وقتك بلا فائدة', en: 'Delete or hide apps that waste your time' },
            duration: '20 دقيقة'
          }
        ],
        tips: [
          { ar: 'الهاتف أداة، لا تدعه يملكك', en: 'The phone is a tool, don\'t let it own you' },
          { ar: 'الهدوء الرقمي يبدأ من الشاشة الرئيسية', en: 'Digital calm starts from the home screen' }
        ],
        challenge: { ar: 'اجعل شاشة هاتفك باللون الرمادي طوال اليوم', en: 'Set your phone screen to grayscale for the whole day' }
      },
      {
        day: 2,
        title: { ar: 'استعادة السيطرة الصباحية', en: 'Reclaiming Morning Control' },
        description: { ar: 'اليوم الثاني: بناء روتين صباحي بدون شاشات', en: 'Day 2: Building a screen-free morning routine' },
        activities: [
          {
            title: { ar: 'صباح بدون هاتف', en: 'No-Phone Morning' },
            description: { ar: 'عدم لمس الهاتف لأول 30 دقيقة بعد الاستيقاظ', en: 'No phone for the first 30 minutes after waking' },
            duration: '30 دقيقة'
          },
          {
            title: { ar: 'كتابة اليوميات', en: 'Journaling' },
            description: { ar: 'اكتب 3 أهداف لليوم على ورقة حقيقية', en: 'Write 3 goals for the day on real paper' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'بداية يومك تحدد مساره بالكامل', en: 'The start of your day defines its entire course' }
        ],
        challenge: { ar: 'لا تفتح السوشيال ميديا حتى وقت الغداء', en: 'No social media until lunchtime' }
      },
      {
        day: 3,
        title: { ar: 'تقنية العمل العميق', en: 'Deep Work Technique' },
        description: { ar: 'اليوم الثالث: تجربة التركيز المركز', en: 'Day 3: Experience focused concentration' },
        activities: [
          {
            title: { ar: 'جلسة بومودورو', en: 'Pomodoro Session' },
            description: { ar: '25 دقيقة عمل مركز ثم 5 دقائق راحة بعيداً عن الشاشات', en: '25 min focused work then 5 min break away from screens' },
            duration: '30 دقيقة'
          },
          {
            title: { ar: 'تمرين الملاحظة', en: 'Observation Exercise' },
            description: { ar: 'اجلس بهدوء وراقب محيطك دون فعل أي شيء', en: 'Sit quietly and observe your surroundings doing nothing' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'التركيز عضلة تقوى بالتدريب', en: 'Focus is a muscle that strengthens with training' }
        ],
        challenge: { ar: 'اقرأ 5 صفحات من كتاب مطبوع', en: 'Read 5 pages of a printed book' }
      },
      {
        day: 4,
        title: { ar: 'الوعي بالاستهلاك', en: 'Consumption Awareness' },
        description: { ar: 'اليوم الرابع: راقب ما يدخل عقلك', en: 'Day 4: Watch what enters your mind' },
        activities: [
          {
            title: { ar: 'فلترة المحتوى', en: 'Content Filtering' },
            description: { ar: 'إلغاء متابعة 10 حسابات تسبب لك القلق أو تضيع وقتك', en: 'Unfollow 10 accounts that cause anxiety or waste time' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'تأمل الدوبامين', en: 'Dopamine Meditation' },
            description: { ar: 'تأمل في شعورك عند التوقف عن التمرير اللانهائي', en: 'Reflect on how you feel when stopping endless scrolling' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'أنت ما تستهلكه رقمياً', en: 'You are what you consume digitally' }
        ],
        challenge: { ar: 'امنع نفسك من مشاهدة أي "Shorts" أو "Reels" اليوم', en: 'Avoid watching any Shorts or Reels today' }
      },
      {
        day: 5,
        title: { ar: 'تثبيت الإنجاز', en: 'Solidifying Achievement' },
        description: { ar: 'اليوم الخامس: مراجعة الخطة وتوسيعها', en: 'Day 5: Reviewing and expanding the plan' },
        activities: [
          {
            title: { ar: 'مراجعة الأسبوع', en: 'Weekly Review' },
            description: { ar: 'ما هو أصعب تحدي واجهته؟ وكيف تغلبت عليه؟', en: 'What was your hardest challenge? How did you overcome it?' },
            duration: '15 دقيقة'
          },
          {
            title: { ar: 'خطة الاستمرار', en: 'Sustainability Plan' },
            description: { ar: 'ضع جدولاً زمنياً لاستخدام الهاتف للأسبوع القادم', en: 'Set a phone usage schedule for next week' },
            duration: '10 دقائق'
          }
        ],
        tips: [
          { ar: 'الاستمرارية أهم من الكمال', en: 'Consistency is more important than perfection' }
        ],
        challenge: { ar: 'قم بإعادة الاختبار لترى تحسنك', en: 'Retake the test to see your improvement' }
      }
    ]
  },
  // المستوى الثالث
  {
    levelId: 3,
    days: [
      {
        day: 1,
        title: { ar: 'قاعدة الساعة الذهبية', en: 'The Golden Hour Rule' },
        description: { ar: 'اليوم الأول: حماية أثمن أوقاتك', en: 'Day 1: Protecting your most precious time' },
        activities: [
          {
            title: { ar: 'ساعة بدون تقنية', en: 'Tech-Free Hour' },
            description: { ar: 'أول ساعة بعد الاستيقاظ وآخر ساعة قبل النوم بدون أجهزة', en: 'First hour after waking and last hour before bed without devices' },
            duration: '2 ساعة'
          }
        ],
        tips: [
          { ar: 'نومك يبدأ من الساعة التي تسبقه', en: 'Your sleep starts from the hour before it' }
        ],
        challenge: { ar: 'اترك هاتفك في غرفة أخرى عند النوم', en: 'Leave your phone in another room while sleeping' }
      },
      {
        day: 2,
        title: { ar: 'التركيز المتواصل', en: 'Sustained Focus' },
        description: { ar: 'اليوم الثاني: زيادة مدة العمل العميق', en: 'Day 2: Increasing deep work duration' },
        activities: [
          {
            title: { ar: 'جلسة تركيز مضاعفة', en: 'Double Focus Session' },
            description: { ar: 'جلسة عمل عميق لمدة 50 دقيقة متواصلة', en: '50-minute continuous deep work session' },
            duration: '50 دقيقة'
          }
        ],
        tips: [
          { ar: 'تجاوز حاجز الـ 20 دقيقة الأولى هو الأصعب', en: 'Breaking the first 20-minute barrier is the hardest' }
        ],
        challenge: { ar: 'اقرأ 15 صفحة من كتاب', en: 'Read 15 pages of a book' }
      },
      {
        day: 3,
        title: { ar: 'هواية غير رقمية', en: 'Non-Digital Hobby' },
        description: { ar: 'اليوم الثالث: إعادة اكتشاف العالم الحقيقي', en: 'Day 3: Rediscovering the real world' },
        activities: [
          {
            title: { ar: 'نشاط يدوي', en: 'Manual Activity' },
            description: { ar: 'رسم، طبخ، رياضة، أو أي نشاط لا يتطلب شاشة', en: 'Drawing, cooking, sports, or any screen-free activity' },
            duration: '1 ساعة'
          }
        ],
        tips: [
          { ar: 'يديك خُلقتا لتفعلا أكثر من مجرد التمرير', en: 'Your hands were made for more than just scrolling' }
        ],
        challenge: { ar: 'امشِ في الطبيعة لمدة 30 دقيقة بدون سماعات', en: 'Walk in nature for 30 minutes without headphones' }
      },
      {
        day: 4,
        title: { ar: 'صيام الدوبامين المصغر', en: 'Mini Dopamine Fast' },
        description: { ar: 'اليوم الرابع: تجويع الرغبة في التنبيه المستمر', en: 'Day 4: Starving the urge for constant stimulation' },
        activities: [
          {
            title: { ar: 'يوم الصمت الرقمي', en: 'Digital Silence Day' },
            description: { ar: 'استخدام الهاتف للضرورة القصوى فقط (اتصالات مهمة)', en: 'Use phone for emergencies only (important calls)' },
            duration: 'طوال اليوم'
          }
        ],
        tips: [
          { ar: 'الملل هو بداية الإبداع', en: 'Boredom is the beginning of creativity' }
        ],
        challenge: { ar: 'لا تستخدم الإنترنت للترفيه اليوم', en: 'No internet for entertainment today' }
      },
      {
        day: 5,
        title: { ar: 'التوازن المستدام', en: 'Sustainable Balance' },
        description: { ar: 'اليوم الخامس: دمج العادات في أسلوب حياتك', en: 'Day 5: Integrating habits into your lifestyle' },
        activities: [
          {
            title: { ar: 'تصميم جدولك الجديد', en: 'Design Your New Schedule' },
            description: { ar: 'تحديد أوقات ثابتة للسوشيال ميديا وأوقات للتركيز', en: 'Set fixed times for social media and focus' },
            duration: '30 دقيقة'
          }
        ],
        tips: [
          { ar: 'أنت الآن تقود التكنولوجيا، لا تقودك هي', en: 'You are now driving technology, not the other way around' }
        ],
        challenge: { ar: 'شارك تجربتك مع صديق لتشجيعه', en: 'Share your experience with a friend to encourage them' }
      }
    ]
  },
  // المستوى الرابع
  {
    levelId: 4,
    days: [
      {
        day: 1,
        title: { ar: 'الإتقان الذهني', en: 'Mental Mastery' },
        description: { ar: 'اليوم الأول: تصفية الذهن تماماً', en: 'Day 1: Completely clearing the mind' },
        activities: [
          {
            title: { ar: 'تأمل عميق', en: 'Deep Meditation' },
            description: { ar: '20 دقيقة من التأمل الصامت', en: '20 minutes of silent meditation' },
            duration: '20 دقيقة'
          }
        ],
        tips: [
          { ar: 'الوضوح يأتي من الداخل', en: 'Clarity comes from within' }
        ],
        challenge: { ar: 'اقضِ اليوم بدون موسيقى أو بودكاست', en: 'Spend the day without music or podcasts' }
      },
      {
        day: 2,
        title: { ar: 'الإنتاجية القصوى', en: 'Peak Productivity' },
        description: { ar: 'اليوم الثاني: العمل في "منطقة التدفق"', en: 'Day 2: Working in the "Flow Zone"' },
        activities: [
          {
            title: { ar: 'كتلة عمل عميق', en: 'Deep Work Block' },
            description: { ar: '90 دقيقة من العمل المركز على أهم مهمة لديك', en: '90 minutes of focused work on your most important task' },
            duration: '90 دقيقة'
          }
        ],
        tips: [
          { ar: 'مهمة واحدة في الوقت الواحد هي سر الإنجاز', en: 'One task at a time is the secret to achievement' }
        ],
        challenge: { ar: 'أنهِ عملاً كنت تؤجله منذ أسابيع', en: 'Finish a task you\'ve been delaying for weeks' }
      },
      {
        day: 3,
        title: { ar: 'التعلم العميق', en: 'Deep Learning' },
        description: { ar: 'اليوم الثالث: تغذية العقل بمحتوى عالي الجودة', en: 'Day 3: Feeding the mind with high-quality content' },
        activities: [
          {
            title: { ar: 'قراءة بحثية', en: 'Research Reading' },
            description: { ar: 'قراءة مقال طويل أو فصل من كتاب تعليمي وتلخيصه', en: 'Read a long article or textbook chapter and summarize it' },
            duration: '1 ساعة'
          }
        ],
        tips: [
          { ar: 'المعرفة الحقيقية تتطلب وقتاً وجهداً', en: 'Real knowledge requires time and effort' }
        ],
        challenge: { ar: 'اشرح ما تعلمته اليوم لشخص آخر', en: 'Explain what you learned today to someone else' }
      },
      {
        day: 4,
        title: { ar: 'الديتوكس الاجتماعي', en: 'Social Detox' },
        description: { ar: 'اليوم الرابع: التواصل الحقيقي بدلاً من الرقمي', en: 'Day 4: Real connection instead of digital' },
        activities: [
          {
            title: { ar: 'لقاء واقعي', en: 'Real-Life Meeting' },
            description: { ar: 'قابل صديقاً أو قريباً وتحدث معه دون إخراج الهاتف', en: 'Meet a friend or relative and talk without taking out your phone' },
            duration: '2 ساعة'
          }
        ],
        tips: [
          { ar: 'الروابط الإنسانية هي الدوبامين الطبيعي الأفضل', en: 'Human bonds are the best natural dopamine' }
        ],
        challenge: { ar: 'لا تستخدم أي تطبيق مراسلة لمدة 4 ساعات متواصلة', en: 'No messaging apps for 4 continuous hours' }
      },
      {
        day: 5,
        title: { ar: 'التحول إلى مرشد', en: 'Becoming a Mentor' },
        description: { ar: 'اليوم الخامس: مساعدة الآخرين على الوعي', en: 'Day 5: Helping others gain awareness' },
        activities: [
          {
            title: { ar: 'نشر الوعي', en: 'Spread Awareness' },
            description: { ar: 'اكتب نصيحة أو شارك معلومة عن مخاطر تعفن الدماغ', en: 'Write a tip or share info about brain rot risks' },
            duration: '20 دقيقة'
          }
        ],
        tips: [
          { ar: 'أفضل طريقة للتعلم هي التعليم', en: 'The best way to learn is to teach' }
        ],
        challenge: { ar: 'ساعد شخصاً واحداً على تقليل وقت شاشته اليوم', en: 'Help one person reduce their screen time today' }
      }
    ]
  },
  // المستوى الخامس
  {
    levelId: 5,
    days: [
      {
        day: 1,
        title: { ar: 'الحفاظ على القمة', en: 'Staying at the Top' },
        description: { ar: 'اليوم الأول: تعزيز المناعة الرقمية', en: 'Day 1: Strengthening digital immunity' },
        activities: [
          {
            title: { ar: 'مراجعة الأنظمة', en: 'Systems Review' },
            description: { ar: 'تأكد من أن جميع فلاتر المحتوى وحدود الوقت لا تزال تعمل', en: 'Ensure all content filters and time limits are still active' },
            duration: '15 دقيقة'
          }
        ],
        tips: [
          { ar: 'اليقظة الدائمة تحميك من الانزلاق مرة أخرى', en: 'Constant vigilance protects you from sliding back' }
        ],
        challenge: { ar: 'احذف تطبيقاً ترفيهياً واحداً لا يزال يغريك', en: 'Delete one entertainment app that still tempts you' }
      },
      {
        day: 2,
        title: { ar: 'الإبداع الخالص', en: 'Pure Creativity' },
        description: { ar: 'اليوم الثاني: استخدام عقلك السليم للإنتاج', en: 'Day 2: Using your healthy brain to produce' },
        activities: [
          {
            title: { ar: 'مشروع إبداعي', en: 'Creative Project' },
            description: { ar: 'ابدأ في كتابة، برمجة، أو صنع شيء من صفر', en: 'Start writing, coding, or making something from scratch' },
            duration: '2 ساعة'
          }
        ],
        tips: [
          { ar: 'أنت الآن صانع، لست مجرد مستهلك', en: 'You are now a creator, not just a consumer' }
        ],
        challenge: { ar: 'اقضِ 3 ساعات متواصلة في عمل إبداعي بدون تشتت', en: 'Spend 3 continuous hours on creative work without distraction' }
      },
      {
        day: 3,
        title: { ar: 'الارتقاء البدني الذهني', en: 'Physical-Mental Elevation' },
        description: { ar: 'اليوم الثالث: ربط صحة الجسد بحدة العقل', en: 'Day 3: Linking physical health to mental sharpness' },
        activities: [
          {
            title: { ar: 'تمرين مكثف', en: 'Intense Exercise' },
            description: { ar: 'ساعة من الرياضة التي تتطلب تركيزاً عالياً', en: 'An hour of exercise requiring high focus' },
            duration: '1 ساعة'
          }
        ],
        tips: [
          { ar: 'العقل السليم في الجسم السليم', en: 'A sound mind in a sound body' }
        ],
        challenge: { ar: 'جرب صياماً متقطعاً اليوم لتحسين الوضوح الذهني', en: 'Try intermittent fasting today to improve mental clarity' }
      },
      {
        day: 4,
        title: { ar: 'التواصل الفلسفي', en: 'Philosophical Connection' },
        description: { ar: 'اليوم الرابع: التعمق في معنى الحياة بعيداً عن "الميمز"', en: 'Day 4: Deepening life meaning away from memes' },
        activities: [
          {
            title: { ar: 'تأمل وجودي', en: 'Existential Reflection' },
            description: { ar: 'قراءة في الفلسفة أو تطوير الذات العميق', en: 'Reading philosophy or deep self-development' },
            duration: '1 ساعة'
          }
        ],
        tips: [
          { ar: 'الحياة أعمق بكثير مما تعرضه الشاشات', en: 'Life is much deeper than what screens show' }
        ],
        challenge: { ar: 'اكتب رسالة لنفسك في المستقبل عن أهمية عقلك', en: 'Write a letter to your future self about your mind\'s importance' }
      },
      {
        day: 5,
        title: { ar: 'نمط الحياة الجديد', en: 'The New Lifestyle' },
        description: { ar: 'اليوم الخامس: الاحتفال بالحرية الذهنية', en: 'Day 5: Celebrating mental freedom' },
        activities: [
          {
            title: { ar: 'الاحتفال بالإنجاز', en: 'Celebrate Achievement' },
            description: { ar: 'كافئ نفسك بنشاط ممتع غير رقمي', en: 'Reward yourself with a fun non-digital activity' },
            duration: 'طوال اليوم'
          }
        ],
        tips: [
          { ar: 'لقد استعدت عقلك، حافظ عليه ككنز', en: 'You\'ve reclaimed your mind, guard it like a treasure' }
        ],
        challenge: { ar: 'كن سفيراً لـ DopaStop وساعد 3 أشخاص على البدء', en: 'Be a DopaStop ambassador and help 3 people start' }
      }
    ]
  }
];

// دالة للحصول على معلومات المستوى
export function getLevelInfo(levelId: number): LevelInfo | undefined {
  return LEVELS.find(level => level.id === levelId);
}

// دالة للحصول على خطة المستوى
export function getLevelPlan(levelId: number): LevelPlan | undefined {
  return LEVEL_PLANS.find(plan => plan.levelId === levelId);
}

// دالة لتحديد المستوى بناءً على الدرجة
export function determineLevelFromScore(score: number): number {
  for (const level of LEVELS) {
    if (score >= level.scoreRange.min && score <= level.scoreRange.max) {
      return level.id;
    }
  }
  return 1; // القيمة الافتراضية
}
