// إدارة Cookies وتخزين بيانات المستخدم

export interface UserProgress {
  userId: string;
  currentLevel: number;
  initialTestScore: number;
  levelTestScores: Record<number, number>;
  currentPlanDay: number;
  planCompletedDays: boolean[];
  planStartDate: number;
  personalityAnalysis: {
    focusScore: number;
    dopamineScore: number;
    controlScore: number;
    fatigueScore: number;
    deepWorkScore: number;
  };
  lastUpdated: number;
  hasCompletedInitialTest: boolean;
}

const STORAGE_KEY = 'dopastopp-user-progress';
const COOKIE_EXPIRY_DAYS = 180; // 6 أشهر

// إنشاء معرف فريد للمستخدم
function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// إنشاء كائن التقدم الافتراضي
function createDefaultProgress(): UserProgress {
  return {
    userId: generateUserId(),
    currentLevel: 0,
    initialTestScore: 0,
    levelTestScores: {},
    currentPlanDay: 0,
    planCompletedDays: [false, false, false, false, false],
    planStartDate: 0,
    personalityAnalysis: {
      focusScore: 0,
      dopamineScore: 0,
      controlScore: 0,
      fatigueScore: 0,
      deepWorkScore: 0
    },
    lastUpdated: Date.now(),
    hasCompletedInitialTest: false
  };
}

// حفظ التقدم في localStorage
export function saveProgress(progress: UserProgress): void {
  try {
    const dataToSave = {
      ...progress,
      lastUpdated: Date.now(),
      expiryDate: Date.now() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

// استرجاع التقدم من localStorage
export function getProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const newProgress = createDefaultProgress();
      saveProgress(newProgress);
      return newProgress;
    }

    const parsed = JSON.parse(stored);
    
    // التحقق من انتهاء صلاحية البيانات
    if (parsed.expiryDate && parsed.expiryDate < Date.now()) {
      clearProgress();
      const newProgress = createDefaultProgress();
      saveProgress(newProgress);
      return newProgress;
    }

    return parsed;
  } catch (error) {
    console.error('Error retrieving progress:', error);
    return createDefaultProgress();
  }
}

// تحديث درجة الاختبار الأولي
export function setInitialTestScore(score: number, answers: number[]): void {
  const progress = getProgress();
  progress.initialTestScore = score;
  progress.hasCompletedInitialTest = true;
  progress.lastUpdated = Date.now();
  
  // حساب تحليل الشخصية
  progress.personalityAnalysis = calculatePersonalityAnalysis(answers);
  
  saveProgress(progress);
}

// تحديث درجة اختبار المستوى
export function setLevelTestScore(levelId: number, score: number): void {
  const progress = getProgress();
  progress.levelTestScores[levelId] = score;
  progress.lastUpdated = Date.now();
  saveProgress(progress);
}

// تحديث المستوى الحالي
export function setCurrentLevel(levelId: number): void {
  const progress = getProgress();
  progress.currentLevel = levelId;
  progress.currentPlanDay = 1;
  progress.planCompletedDays = [false, false, false, false, false];
  progress.planStartDate = Date.now();
  progress.lastUpdated = Date.now();
  saveProgress(progress);
}

// تحديث يوم الخطة الحالي
export function setCurrentPlanDay(day: number): void {
  const progress = getProgress();
  progress.currentPlanDay = day;
  progress.lastUpdated = Date.now();
  saveProgress(progress);
}

// تحديث حالة إكمال يوم
export function completePlanDay(dayIndex: number): void {
  const progress = getProgress();
  if (dayIndex >= 0 && dayIndex < 5) {
    progress.planCompletedDays[dayIndex] = true;
    progress.lastUpdated = Date.now();
    saveProgress(progress);
  }
}

// التحقق من إكمال جميع أيام الخطة
export function isPlanCompleted(): boolean {
  const progress = getProgress();
  return progress.planCompletedDays.every(day => day === true);
}

// حساب تحليل الشخصية بناءً على الإجابات
function calculatePersonalityAnalysis(answers: number[]): UserProgress['personalityAnalysis'] {
  // الأسئلة مقسمة حسب القسم (17 سؤالاً)
  // ملاحظة: بعض الأسئلة داخل الأقسام معكوسة، لذا سنقوم بحسابها بشكل فردي
  const calculateSectionScore = (indices: number[], reversedIndices: number[] = []): number => {
    let sum = 0;
    for (const idx of indices) {
      if (answers[idx] !== undefined) {
        const isReversed = reversedIndices.includes(idx);
        sum += isReversed ? (4 - answers[idx]) : answers[idx];
      }
    }
    const maxScore = indices.length * 4;
    return maxScore > 0 ? Math.round((sum / maxScore) * 100) : 0;
  };

  return {
    focusScore: calculateSectionScore([0, 1, 2, 3], [2]), // السؤال 3 (index 2) معكوس
    dopamineScore: calculateSectionScore([4, 5, 6], [6]), // السؤال 7 (index 6) معكوس
    controlScore: calculateSectionScore([7, 8, 9], [9]), // السؤال 10 (index 9) معكوس
    fatigueScore: calculateSectionScore([10, 11, 12], [11]), // السؤال 12 (index 11) معكوس
    deepWorkScore: calculateSectionScore([13, 14, 15, 16], [13, 14]) // الأسئلة 14، 15 (indices 13, 14) معكوسة
  };
}

// حذف جميع البيانات
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}

// الحصول على نسبة إكمال الخطة
export function getPlanCompletionPercentage(): number {
  const progress = getProgress();
  const completed = progress.planCompletedDays.filter(day => day).length;
  return Math.round((completed / 5) * 100);
}

// التحقق من ما إذا كان يمكن الانتقال للمستوى التالي
export function canAdvanceToNextLevel(): boolean {
  const progress = getProgress();
  return isPlanCompleted() && progress.currentLevel < 5;
}

// إعادة تعيين خطة المستوى الحالي
export function resetCurrentPlan(): void {
  const progress = getProgress();
  progress.currentPlanDay = 1;
  progress.planCompletedDays = [false, false, false, false, false];
  progress.planStartDate = Date.now();
  progress.lastUpdated = Date.now();
  saveProgress(progress);
}

// الحصول على عدد الأيام المتبقية في الخطة
export function getRemainingPlanDays(): number {
  const progress = getProgress();
  const completed = progress.planCompletedDays.filter(day => day).length;
  return 5 - completed;
}

// التحقق من ما إذا كان المستخدم قد أكمل خطة معينة
export function hasCompletedLevelPlan(levelId: number): boolean {
  const progress = getProgress();
  // إذا كان المستخدم قد اختبر المستوى التالي بنجاح
  return progress.levelTestScores[levelId + 1] !== undefined;
}

// الحصول على يوم الخطة الحالي
export function getCurrentPlanDay(): number {
  const progress = getProgress();
  return progress.currentPlanDay;
}

// حفظ بيانات الجلسة
export function saveSessionData(data: any): void {
  try {
    sessionStorage.setItem('dopastopp-session', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving session data:', error);
  }
}

// استرجاع بيانات الجلسة
export function getSessionData(): any {
  try {
    const data = sessionStorage.getItem('dopastopp-session');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving session data:', error);
    return null;
  }
}

// حذف بيانات الجلسة
export function clearSessionData(): void {
  try {
    sessionStorage.removeItem('dopastopp-session');
  } catch (error) {
    console.error('Error clearing session data:', error);
  }
}
