import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'side';
  delay?: number;
  dismissible?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ position = 'bottom', delay = 3000, dismissible = true }) => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, isDismissed]);

  if (!isVisible || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Ads configuration using environment variables for links
  const ads = [
    {
      title: lang === 'ar' ? 'دليل الديتوكس الشامل (E-Book)' : 'Complete Detox Guide (E-Book)',
      description: lang === 'ar' ? 'احصل على النسخة الكاملة من خطة الـ 30 يوماً لاستعادة عقلك' : 'Get the full 30-day plan to reclaim your mind in one PDF',
      cta: lang === 'ar' ? 'احصل عليه الآن' : 'Get it Now',
      color: 'from-purple-600 to-blue-600',
      link: import.meta.env.VITE_AD_LINK_1 || 'https://buymeacoffee.com/dopastopp'
    },
    {
      title: lang === 'ar' ? 'مكملات التركيز الطبيعية' : 'Natural Focus Supplements',
      description: lang === 'ar' ? 'أفضل المكملات الغذائية الموصى بها لزيادة الانتباه والذاكرة' : 'Top recommended supplements to boost attention and memory',
      cta: lang === 'ar' ? 'تسوق الآن' : 'Shop Now',
      color: 'from-orange-500 to-red-600',
      link: import.meta.env.VITE_AD_LINK_2 || 'https://amazon.com/focus-supplements'
    },
    {
      title: lang === 'ar' ? 'استشارة خاصة مع خبير' : 'Private Expert Consultation',
      description: lang === 'ar' ? 'جلسة زووم خاصة لتصميم خطة علاجية مخصصة لحالتك' : 'Private Zoom session to design a customized treatment plan',
      cta: lang === 'ar' ? 'احجز موعدك' : 'Book Appointment',
      color: 'from-green-600 to-emerald-600',
      link: import.meta.env.VITE_AD_LINK_3 || 'https://calendly.com/dopastopp'
    }
  ];

  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  const positionClasses = {
    top: 'top-4 left-1/2 -translate-x-1/2 max-w-md',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2 max-w-md',
    side: 'right-4 top-1/2 -translate-y-1/2 w-72'
  };

  const handleAdClick = () => {
    if (randomAd.link !== '#') {
      window.open(randomAd.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-40 animate-slideIn`}
      style={{
        animation: 'slideIn 0.5s ease-out'
      }}
    >
      <div className={`bg-gradient-to-r ${randomAd.color} rounded-xl p-4 shadow-lg backdrop-blur-sm border border-white/20`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1 text-sm md:text-base">
              {randomAd.title}
            </h3>
            <p className="text-white/90 text-xs md:text-sm mb-3">
              {randomAd.description}
            </p>
            <button 
              onClick={handleAdClick}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              {randomAd.cta}
            </button>
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="text-white/60 hover:text-white transition-colors flex-shrink-0 text-lg"
              aria-label="Close ad"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: ${position === 'top' ? 'translateY(-20px)' : position === 'bottom' ? 'translateY(20px)' : 'translateX(20px)'};
          }
          to {
            opacity: 1;
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdBanner;
