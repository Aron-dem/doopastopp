export interface TestQuestion {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

export interface TestResult {
  min: number;
  max: number;
  title: string;
  desc: string;
  recommendations: string[];
}

export interface TestData {
  id: string;
  title: string;
  intro: string;
  questions: TestQuestion[];
  results: TestResult[];
}

export const ALL_TESTS: Record<string, TestData> = {
  'brain-rot': {
    id: 'brain-rot',
    title: 'اختبار تعفن الدماغ (Brain Rot Test)',
    intro: 'هل تشعر أن انتباهك يتلاشى؟ اكتشف مدى تأثير المحتوى الرقمي السريع على قدراتك الذهنية.',
    questions: [
      {
        id: 1,
        text: 'كم مرة تجد نفسك تستخدم مصطلحات الإنترنت في حياتك الواقعية؟',
        options: [
          { text: 'نادراً أو أبداً', score: 0 },
          { text: 'أحياناً', score: 2 },
          { text: 'كثيراً جداً', score: 5 }
        ]
      },
      {
        id: 2,
        text: 'هل تجد صعوبة في مشاهدة فيديو أطول من 3 دقائق دون تسريعه؟',
        options: [
          { text: 'لا، أستمتع بالمحتوى الطويل', score: 0 },
          { text: 'أحياناً أشعر بالملل', score: 3 },
          { text: 'نعم، لا أستطيع التركيز أبداً', score: 5 }
        ]
      },
      {
        id: 3,
        text: 'ما هو أول شيء تفعله عند الاستيقاظ؟',
        options: [
          { text: 'شرب الماء أو التأمل', score: 0 },
          { text: 'تفقد الرسائل المهمة', score: 2 },
          { text: 'فتح تيك توك أو ريلز فوراً', score: 5 }
        ]
      }
    ],
    results: [
      {
        min: 0, max: 5,
        title: 'دماغ نقي ✨',
        desc: 'أنت في مأمن من تعفن الدماغ. حافظ على وعيك الرقمي.',
        recommendations: ['استمر في القراءة العميقة', 'قلل من استهلاك الفيديوهات القصيرة']
      },
      {
        min: 6, max: 15,
        title: 'بداية تعفن 🍄',
        desc: 'دماغك بدأ يتأثر بالمحتوى السريع. حان الوقت لأخذ استراحة.',
        recommendations: ['قم بإلغاء متابعة الحسابات غير المفيدة', 'مارس هواية يدوية']
      }
    ]
  },
  'phone-addiction': {
    id: 'phone-addiction',
    title: 'اختبار إدمان الهاتف (Phone Addiction Test)',
    intro: 'هل هاتفك هو من يقود حياتك؟ لنعرف مدى تعلقك بجهازك المحمول.',
    questions: [
      {
        id: 1,
        text: 'كم ساعة تقضيها على هاتفك يومياً؟',
        options: [
          { text: 'أقل من ساعتين', score: 0 },
          { text: 'من 2 إلى 5 ساعات', score: 3 },
          { text: 'أكثر من 6 ساعات', score: 5 }
        ]
      },
      {
        id: 2,
        text: 'هل تشعر بالقلق إذا نسيت هاتفك في المنزل؟',
        options: [
          { text: 'لا، أشعر بالحرية', score: 0 },
          { text: 'قليلاً', score: 3 },
          { text: 'نعم، أشعر بالضياع التام', score: 5 }
        ]
      }
    ],
    results: [
      {
        min: 0, max: 4,
        title: 'مستقل رقمياً 📱',
        desc: 'أنت تستخدم الهاتف كأداة وليس كقيد.',
        recommendations: ['حافظ على حدودك الرقمية']
      },
      {
        min: 5, max: 10,
        title: 'مدمن محتمل ⚠️',
        desc: 'علاقتك بالهاتف بدأت تصبح غير صحية.',
        recommendations: ['فعل خاصية "وقت الشاشة"', 'خصص أوقاتاً بدون هاتف']
      }
    ]
  },
  'brain-age': {
    id: 'brain-age',
    title: 'اختبار عمر الدماغ (Brain Age Test)',
    intro: 'هل دماغك أصغر أم أكبر من عمرك الحقيقي؟ اختبر سرعة معالجتك الذهنية.',
    questions: [
      {
        id: 1,
        text: 'كم مرة تنسى أين وضعت مفاتيحك أو هاتفك؟',
        options: [
          { text: 'نادراً', score: 0 },
          { text: 'أحياناً', score: 3 },
          { text: 'يومياً', score: 5 }
        ]
      },
      {
        id: 2,
        text: 'هل يمكنك حل العمليات الحسابية البسيطة بسرعة؟',
        options: [
          { text: 'نعم، بسهولة', score: 0 },
          { text: 'أحتاج لبعض الوقت', score: 3 },
          { text: 'أستخدم الآلة الحاسبة دائماً', score: 5 }
        ]
      }
    ],
    results: [
      {
        min: 0, max: 4,
        title: 'دماغ شاب وحيوي 🧠',
        desc: 'قدراتك الذهنية في قمتها.',
        recommendations: ['مارس ألعاب الذاكرة', 'تعلم لغة جديدة']
      },
      {
        min: 5, max: 10,
        title: 'دماغ يحتاج لتنشيط 🔋',
        desc: 'دماغك يظهر علامات إرهاق أو تقدم في العمر الذهني.',
        recommendations: ['حسن جودة نومك', 'تناول أطعمة غنية بالأوميغا 3']
      }
    ]
  },
  'attention-span': {
    id: 'attention-span',
    title: 'اختبار مدى الانتباه (Attention Span Test)',
    intro: 'في عالم المشتتات، كم يمكنك الصمود؟ اختبر قدرتك على التركيز المستمر.',
    questions: [
      {
        id: 1,
        text: 'عندما يتحدث إليك شخص ما، هل تشعر برغبة في تفقد هاتفك؟',
        options: [
          { text: 'أبداً، أنصت باهتمام', score: 0 },
          { text: 'أحياناً إذا طال الحديث', score: 3 },
          { text: 'نعم، دائماً', score: 5 }
        ]
      },
      {
        id: 2,
        text: 'هل يمكنك القراءة لمدة 20 دقيقة متواصلة؟',
        options: [
          { text: 'نعم، وبكل سهولة', score: 0 },
          { text: 'أحاول ولكن أتشتت', score: 3 },
          { text: 'مستحيل تقريباً', score: 5 }
        ]
      }
    ],
    results: [
      {
        min: 0, max: 4,
        title: 'تركيز ليزري 🎯',
        desc: 'لديك قدرة رائعة على الانتباه العميق.',
        recommendations: ['مارس العمل العميق بانتظام']
      },
      {
        min: 5, max: 10,
        title: 'انتباه مشتت 🌪️',
        desc: 'قدرتك على التركيز ضعيفة بسبب المشتتات.',
        recommendations: ['ابدأ بتمارين التأمل', 'قلل المهام المتعددة (Multitasking)']
      }
    ]
  }
};
