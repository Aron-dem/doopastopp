import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showLogo?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  showBack = false,
  onBack,
  rightContent,
  centerContent,
  title,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="relative z-10 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Left side - Logo or Back button */}
      <div className="flex items-center gap-4">
        {showLogo && (
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="العودة للصفحة الرئيسية / Go to Home"
          >
            <img
              src="/logo.png"
              alt="Dopastopp Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-lg"
            />
            <span className="hidden sm:inline text-white font-black text-lg">Dopastopp</span>
          </button>
        )}
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <span>←</span>
          </button>
        )}
      </div>

      {/* Center content */}
      {centerContent ? (
        <div className="flex-1 flex justify-center">{centerContent}</div>
      ) : title ? (
        <div className="flex-1 text-center">
          <span className="text-white font-black text-lg">{title}</span>
        </div>
      ) : null}

      {/* Right side */}
      {rightContent && <div>{rightContent}</div>}
    </header>
  );
};

export default Header;
