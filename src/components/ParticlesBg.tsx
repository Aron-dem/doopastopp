import React, { useMemo } from 'react';

const ParticlesBg: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 12}s`,
      color: ['rgba(139,92,246,0.4)', 'rgba(236,72,153,0.3)', 'rgba(245,158,11,0.3)', 'rgba(16,185,129,0.3)'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            bottom: '-20px',
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBg;
