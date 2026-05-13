import React, { useEffect, useState } from 'react';
// BrainyMascot replaced by Logo image

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => onComplete(), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0D0A1E 0%, #1a0533 100%)' }}
    >
      <div className="text-center">
        <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 scale-110 rotate-0' : 'opacity-0 scale-50 rotate-12'}`}>
          <img 
            src="/logo.png" 
            alt="Dopastopp Logo" 
            className="mx-auto w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_25px_rgba(167,139,250,0.6)]"
          />
        </div>
        <div className={`mt-4 transition-all duration-500 delay-200 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-4xl font-black"
            style={{
              background: 'linear-gradient(135deg, #A78BFA, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            Dopastopp
          </div>
        </div>
        <div className={`mt-3 transition-all duration-500 delay-300 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
