import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Menu, X, Mic, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  activeSection: 'home' | 'sales' | 'health';
  setActiveSection: (section: 'home' | 'sales' | 'health') => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const { language, toggleLanguage, t, isHindi } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleVoiceHelp = () => {
    setIsVoiceListening(!isVoiceListening);
    // Simulate voice recognition
    if (!isVoiceListening) {
      setTimeout(() => setIsVoiceListening(false), 3000);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-[#F5F3EC]/95 via-[#D2CDB9]/95 to-[#92A378]/95 backdrop-blur-xl shadow-2xl border-b border-[#8DBTA4]/20' 
        : 'bg-gradient-to-r from-[#F5F3EC]/90 via-[#D2CDB9]/90 to-[#92A378]/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveSection('home')}
          >
            <div className="relative">
              <div className="bg-[#2D4F4A] p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Heart className="w-8 h-8 text-white group-hover:animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8DBTA4] rounded-full animate-pulse"></div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'font-medium' : ''}`}>
                {t('header.title')}
              </h1>
              <p className={`text-sm text-[#2D4F4A] hidden sm:block font-medium ${isHindi ? 'text-xs' : ''}`}>
                {t('header.tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { key: 'home', label: t('header.home'), icon: null },
              { key: 'sales', label: t('header.sales'), icon: TrendingUp },
              { key: 'health', label: t('header.health'), icon: Heart }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key as any)}
                className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  activeSection === item.key
                    ? 'bg-[#8DBTA4]/20 text-[#2D4F4A] shadow-lg'
                    : 'text-[#2D4F4A] hover:text-[#0A0F0D] hover:bg-[#8DBTA4]/10'
                } ${isHindi ? 'text-sm' : ''}`}
              >
                {item.icon && <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                <span>{item.label}</span>
                {activeSection === item.key && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#2D4F4A] rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-lg hover:bg-[#8DBTA4]/30 transition-all duration-300 group hover:scale-105 border border-[#8DBTA4]/30"
              title={isHindi ? t('header.switchToEnglish') : t('header.switchToHindi')}
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">
                {isHindi ? 'EN' : 'हिं'}
              </span>
            </button>

            {/* Voice Help */}
            <button 
              onClick={toggleVoiceHelp}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                isVoiceListening 
                  ? 'bg-[#0A0F0D] text-white shadow-lg animate-pulse' 
                  : 'bg-[#2D4F4A] text-white hover:bg-[#0A0F0D] hover:scale-105'
              }`}
            >
              <Mic className={`w-4 h-4 ${isVoiceListening ? 'animate-bounce' : 'group-hover:scale-110'} transition-transform`} />
              <span className={`hidden sm:block ${isHindi ? 'text-sm' : ''}`}>
                {isVoiceListening ? t('header.listening') : t('header.voiceHelp')}
              </span>
              {isVoiceListening && (
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
                  <div className="w-1 h-6 bg-white rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#2D4F4A] hover:text-[#0A0F0D] hover:bg-[#8DBTA4]/20 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#F5F3EC]/95 via-[#D2CDB9]/95 to-[#92A378]/95 backdrop-blur-xl border-t border-[#8DBTA4]/20 shadow-2xl animate-slideInDown">
            <div className="px-4 py-6 space-y-4">
              {/* Language Toggle for Mobile */}
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-[#2D4F4A] hover:text-[#0A0F0D] hover:bg-[#8DBTA4]/10 border border-[#8DBTA4]/20 ${isHindi ? 'text-sm' : ''}`}
              >
                <Globe className="w-5 h-5" />
                <span>
                  {isHindi ? t('header.switchToEnglish') : t('header.switchToHindi')}
                </span>
              </button>

              {[
                { key: 'home', label: t('header.home'), icon: Heart },
                { key: 'sales', label: t('header.sales'), icon: TrendingUp },
                { key: 'health', label: t('header.health'), icon: Shield }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.key
                      ? 'bg-[#8DBTA4]/20 text-[#2D4F4A]'
                      : 'text-[#2D4F4A] hover:text-[#0A0F0D] hover:bg-[#8DBTA4]/10'
                  } ${isHindi ? 'text-sm' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;