import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_TESTS, TestData, TestResult } from '../data/allTests';
import Header from './Header';
import Footer from './Footer';

const QuizPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<TestData | null>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    if (testId && ALL_TESTS[testId]) {
      setTest(ALL_TESTS[testId]);
      setCurrentStep('intro');
      setCurrentQuestionIndex(0);
      setScore(0);
      setResult(null);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [testId, navigate]);

  const handleStart = () => {
    setCurrentStep('quiz');
    window.scrollTo(0, 0);
  };

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (test) {
      // Calculate result
      const finalResult = test.results.find(r => newScore >= r.min && newScore <= r.max) || test.results[test.results.length - 1];
      setResult(finalResult);
      setCurrentStep('result');
      window.scrollTo(0, 0);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `نتيجتي في ${test?.title}`,
        text: `حصلت على نتيجة: ${result?.title} في موقع DopaStopp. اختبر نفسك الآن!`,
        url: window.location.href,
      });
    } else {
      alert('تم نسخ الرابط لمشاركته مع أصدقائك!');
    }
  };

  if (!test) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {currentStep === 'intro' && (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {test.title}
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              {test.intro}
            </p>
            <button 
              onClick={handleStart}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black py-5 px-12 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              ابدأ الاختبار الآن
            </button>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-cyan-400 font-bold mb-2">لماذا هذا الاختبار؟</h3>
                <p className="text-gray-400 text-sm">يساعدك على فهم أنماط سلوكك الرقمي وتأثيرها على صحتك العقلية.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-purple-400 font-bold mb-2">كم يستغرق؟</h3>
                <p className="text-gray-400 text-sm">أقل من دقيقتين. أسئلة سريعة ومباشرة تعطيك لمحة عن حالتك.</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'quiz' && (
          <div className="animate-fade-in">
            <div className="mb-8 flex justify-between items-center">
              <span className="text-gray-500 text-sm">سؤال {currentQuestionIndex + 1} من {test.questions.length}</span>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-tight">
              {test.questions[currentQuestionIndex].text}
            </h2>
            
            <div className="space-y-4">
              {test.questions[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-right p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all group"
                >
                  <span className="text-lg group-hover:text-cyan-400 transition-colors">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && result && (
          <div className="text-center animate-fade-in">
            <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-6">
              <span className="text-5xl">🧠</span>
            </div>
            <h2 className="text-gray-400 text-lg mb-2">نتيجتك هي:</h2>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-cyan-400">
              {result.title}
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-xl mx-auto leading-relaxed">
              {result.desc}
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 text-right">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="text-cyan-400">✨</span>
                توصيات مخصصة لك:
              </h3>
              <ul className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-cyan-500 mt-1">●</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={handleShare}
                className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>شارك النتيجة</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
              <Link 
                to="/plan"
                className="bg-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-cyan-500 transition-colors"
              >
                ابدأ خطة التعافي
              </Link>
            </div>

            <div className="border-t border-white/10 pt-12">
              <h3 className="text-xl font-bold mb-8">اختبارات أخرى قد تهمك:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(ALL_TESTS).filter(t => t.id !== testId).map(otherTest => (
                  <Link 
                    key={otherTest.id}
                    to={`/quiz/${otherTest.id}`}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all text-right group"
                  >
                    <h4 className="font-bold group-hover:text-purple-400 transition-colors">{otherTest.title}</h4>
                    <p className="text-xs text-gray-500 mt-2">اختبر نفسك الآن ←</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default QuizPage;
