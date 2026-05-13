import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import HeroSection from './components/HeroSection';
import QuizSection from './components/QuizSection';
import ResultsSection from './components/ResultsSection';
import ChallengeSection from './components/ChallengeSection';
import IntroScreen from './components/IntroScreen';
import LevelProgressScreen from './components/LevelProgressScreen';
import PlanDayScreen from './components/PlanDayScreen';
import AdBanner from './components/AdBanner';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import QuizPage from './components/QuizPage';
import RecoveryPlanPage from './components/RecoveryPlanPage';
import { 
  AboutPage, 
  PrivacyPolicyPage, 
  TermsPage, 
  DisclaimerPage, 
  FAQPage, 
  ContactPage 
} from './components/InfoPages';
import { ResultLevel } from './data/questions';
import { getProgress } from './utils/cookieManager';

interface QuizResult {
  score: number;
  answers: number[];
  result: ResultLevel;
  brainRotPcnt: number;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<'intro' | 'main'>('intro');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    const saved = localStorage.getItem('dopastopp_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });
  const [progress, setProgress] = useState(getProgress());
  const [hasRedirected, setHasRedirected] = useState(() => {
    return sessionStorage.getItem('dopastopp_level_redirected') === 'true';
  });

  useEffect(() => {
    const updatedProgress = getProgress();
    setProgress(updatedProgress);
    
    if (updatedProgress.hasCompletedInitialTest && location.pathname === '/' && !hasRedirected) {
      const timer = setTimeout(() => {
        setHasRedirected(true);
        sessionStorage.setItem('dopastopp_level_redirected', 'true');
        navigate('/level');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate, hasRedirected]);

  const handleQuizComplete = (score: number, answers: number[], result: ResultLevel, brainRotPcnt: number) => {
    const res = { score, answers, result, brainRotPcnt };
    setQuizResult(res);
    localStorage.setItem('dopastopp_quiz_result', JSON.stringify(res));
    window.scrollTo(0, 0);
    navigate('/results');
  };

  const handleIntroComplete = () => {
    setView('main');
  };

  // Determine if we should show the footer (usually everywhere except intro and quiz)
  const showFooter = !(['/quiz', '/intro'].some(path => location.pathname.startsWith(path)) || (view === 'intro' && location.pathname === '/'));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {view === 'intro' && location.pathname === '/' ? (
          <IntroScreen onComplete={handleIntroComplete} />
        ) : (
          <Routes>
<Route path="/" element={<HeroSection onStartQuiz={() => navigate('/quiz/brain-rot')} />} />
	            <Route path="/quiz" element={<Navigate to="/quiz/brain-rot" replace />} />
            <Route path="/quiz/:testId" element={<QuizPage />} />
            <Route path="/results" element={
              quizResult ? (
                <ResultsSection
                  score={quizResult.score}
                  answers={quizResult.answers}
                  result={quizResult.result}
                  brainRotPcnt={quizResult.brainRotPcnt}
                  onRetake={() => navigate('/quiz/brain-rot')}
                  onStartChallenge={() => navigate('/challenge')}
                />
              ) : (
                <HeroSection onStartQuiz={() => navigate('/quiz/brain-rot')} />
              )
            } />
            <Route path="/challenge" element={
              <ChallengeSection
                onBack={() => navigate(quizResult ? '/results' : '/')}
                userScore={quizResult?.score}
              />
            } />
            <Route path="/level" element={
              <>
                <LevelProgressScreen
                  onStartTest={() => navigate('/quiz/brain-rot')}
                  onStartPlan={() => navigate('/plan')}
                  onBack={() => navigate('/')}
                />
                <AdBanner position="bottom" delay={3000} dismissible={true} />
              </>
            } />
            <Route path="/plan" element={<RecoveryPlanPage />} />
            <Route path="/daily-plan" element={
              <>
                <PlanDayScreen
                  onComplete={() => navigate('/level')}
                  onBack={() => navigate('/level')}
                />
                <AdBanner position="side" delay={5000} dismissible={true} />
              </>
            } />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Info Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        )}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
