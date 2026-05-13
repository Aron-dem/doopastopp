import React from 'react';

type Mood = 'healthy' | 'mild' | 'moderate' | 'severe' | 'critical' | 'idle' | 'thinking';

interface BrainyProps {
  mood: Mood;
  size?: number;
  animate?: boolean;
  className?: string;
}

const BrainyMascot: React.FC<BrainyProps> = ({ mood, size = 120, animate = true, className = '' }) => {
  const getMoodColors = () => {
    switch (mood) {
      case 'healthy': return { left: '#10B981', right: '#6EE7B7', eye: '#065F46', glow: '#10B981' };
      case 'mild': return { left: '#84CC16', right: '#A3E635', eye: '#365314', glow: '#84CC16' };
      case 'moderate': return { left: '#F59E0B', right: '#FCD34D', eye: '#78350F', glow: '#F59E0B' };
      case 'severe': return { left: '#F97316', right: '#FB923C', eye: '#7C2D12', glow: '#F97316' };
      case 'critical': return { left: '#EF4444', right: '#F87171', eye: '#7F1D1D', glow: '#EF4444' };
      case 'thinking': return { left: '#8B5CF6', right: '#A78BFA', eye: '#2E1065', glow: '#8B5CF6' };
      case 'idle': return { left: '#818CF8', right: '#C7D2FE', eye: '#1E1B4B', glow: '#818CF8' };
      default: return { left: '#818CF8', right: '#C7D2FE', eye: '#1E1B4B', glow: '#818CF8' };
    }
  };

  const colors = getMoodColors();
  const isBad = mood === 'severe' || mood === 'critical';
  const isGood = mood === 'healthy' || mood === 'mild';
  const animClass = animate ? (isBad ? 'brain-shake' : isGood ? 'brain-bounce' : 'brain-float') : '';

  return (
    <div
      className={`inline-block relative ${animClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`glowGrad-${mood}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`leftGrad-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.left} />
            <stop offset="100%" stopColor={colors.right} />
          </linearGradient>
          <filter id={`shadow-${mood}`}>
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={colors.glow} floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Glow circle */}
        <circle cx="100" cy="100" r="90" fill={`url(#glowGrad-${mood})`} />

        {/* Main brain body */}
        <g filter={`url(#shadow-${mood})`}>
          {/* Left brain half */}
          <path
            d="M100 60 C75 55 50 65 45 80 C38 95 40 115 50 128 C58 138 75 145 90 148 L100 150 L100 60Z"
            fill={`url(#leftGrad-${mood})`}
            stroke="#1a0533"
            strokeWidth="3"
          />
          {/* Left wrinkles */}
          <path d="M65 80 Q70 90 65 100" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M55 95 Q62 105 55 115" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M70 110 Q78 118 72 126" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Right brain half */}
          <path
            d="M100 60 C125 55 150 65 155 80 C162 95 160 115 150 128 C142 138 125 145 110 148 L100 150 L100 60Z"
            fill={isGood ? '#93C5FD' : mood === 'moderate' ? '#FDE68A' : '#FDA4AF'}
            stroke="#1a0533"
            strokeWidth="3"
          />
          {/* Right wrinkles */}
          <path d="M135 80 Q130 90 135 100" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M145 95 Q138 105 145 115" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M130 110 Q122 118 128 126" stroke="#1a0533" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Center divider */}
          <line x1="100" y1="58" x2="100" y2="152" stroke="#1a0533" strokeWidth="2.5" strokeDasharray="5,3" />

          {/* Top bumps */}
          <ellipse cx="80" cy="62" rx="22" ry="15" fill={`url(#leftGrad-${mood})`} stroke="#1a0533" strokeWidth="2.5" />
          <ellipse cx="120" cy="62" rx="22" ry="15" fill={isGood ? '#BFDBFE' : mood === 'moderate' ? '#FEF3C7' : '#FFC0CB'} stroke="#1a0533" strokeWidth="2.5" />
        </g>

        {/* Eyes */}
        {/* Left eye */}
        <ellipse cx="78" cy="100" rx="12" ry={isBad ? 8 : 10} fill="white" stroke="#1a0533" strokeWidth="2" />
        <circle cx={isBad ? 76 : 78} cy={isBad ? 102 : 100} r="6" fill={colors.eye} />
        <circle cx={isBad ? 75 : 77} cy={isBad ? 101 : 99} r="2" fill="white" />
        {/* Tired eyelid for bad moods */}
        {isBad && <path d="M66 97 Q78 93 90 97" stroke="#1a0533" strokeWidth="2.5" fill="none" strokeLinecap="round" />}

        {/* Right eye */}
        <ellipse cx="122" cy="100" rx="12" ry={isBad ? 8 : 10} fill="white" stroke="#1a0533" strokeWidth="2" />
        <circle cx={isBad ? 124 : 122} cy={isBad ? 102 : 100} r="6" fill={colors.eye} />
        <circle cx={isBad ? 123 : 121} cy={isBad ? 101 : 99} r="2" fill="white" />
        {isBad && <path d="M110 97 Q122 93 134 97" stroke="#1a0533" strokeWidth="2.5" fill="none" strokeLinecap="round" />}

        {/* Mouth */}
        {isGood ? (
          <path d="M88 120 Q100 132 112 120" stroke="#1a0533" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : isBad ? (
          <path d="M88 128 Q100 118 112 128" stroke="#1a0533" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M90 124 Q100 126 110 124" stroke="#1a0533" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* Mood-specific decorations */}
        {isGood && (
          <>
            {/* Leaf on top */}
            <path d="M100 45 C95 30 85 25 80 30 C85 35 95 40 100 45Z" fill="#4ADE80" stroke="#166534" strokeWidth="1.5" />
            {/* Sparkles */}
            <text x="155" y="75" fontSize="14" fill="#FDE68A">✨</text>
            <text x="25" y="90" fontSize="12" fill="#FDE68A">⭐</text>
          </>
        )}
        {mood === 'critical' && (
          <>
            {/* Glitch pixels */}
            <rect x="40" y="70" width="8" height="6" fill="#00FF41" opacity="0.8" />
            <rect x="150" y="85" width="6" height="8" fill="#FF00FF" opacity="0.7" />
            <rect x="35" y="110" width="10" height="4" fill="#00FFFF" opacity="0.6" />
            <rect x="155" y="105" width="8" height="6" fill="#FF4444" opacity="0.8" />
            {/* App icons floating */}
            <text x="20" y="68" fontSize="16" opacity="0.8">📱</text>
            <text x="155" y="130" fontSize="14" opacity="0.7">🔔</text>
            {/* Dark circles */}
            <ellipse cx="78" cy="108" rx="13" ry="4" fill="#7F1D1D" opacity="0.35" />
            <ellipse cx="122" cy="108" rx="13" ry="4" fill="#7F1D1D" opacity="0.35" />
          </>
        )}
        {mood === 'severe' && (
          <>
            <text x="25" y="68" fontSize="14" opacity="0.7">📱</text>
            <text x="158" y="125" fontSize="12" opacity="0.6">🔔</text>
            <ellipse cx="78" cy="107" rx="12" ry="3.5" fill="#7C2D12" opacity="0.3" />
            <ellipse cx="122" cy="107" rx="12" ry="3.5" fill="#7C2D12" opacity="0.3" />
          </>
        )}
        {mood === 'thinking' && (
          <>
            <text x="155" y="65" fontSize="18">💭</text>
          </>
        )}
      </svg>
    </div>
  );
};

export default BrainyMascot;
