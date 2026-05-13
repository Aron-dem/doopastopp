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

};
