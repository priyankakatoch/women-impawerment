import React from 'react';
import { Heart, Shield, Globe, Phone, Mail, MapPin, Award, Users, TrendingUp, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, isHindi } = useLanguage();

  const achievements = [
    { icon: Users, number: "500+", label: t('footer.womenEmpowered') },
    { icon: TrendingUp, number: "₹2.5M+", label: t('footer.salesGenerated') },
    { icon: Heart, number: "400+", label: t('footer.healthConsultations') },
    { icon: Award, number: "24/7", label: t('footer.supportAvailable') }
  ];

  const services = [
    { icon: TrendingUp, text: t('footer.smartAnalytics') },
    { icon: Heart, text: t('footer.privateHealth') },
    { icon: Phone, text: t('footer.voiceAssistance') },
    { icon: Shield, text: t('footer.confidentialConsultations') },
    { icon: Globe, text: t('footer.bilingualSupport') }
  ];

  return (
    <footer className="bg-[#0A0F0D] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Achievements Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="bg-[#2D4F4A] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:rotate-12 transition-all duration-300">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-[#8DBTA4] mb-2">
                {achievement.number}
              </div>
              <div className={`text-[#8DBTA4]/80 font-medium ${isHindi ? 'text-sm' : ''}`}>{achievement.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-[#2D4F4A] p-4 rounded-2xl shadow-xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className={`text-3xl font-bold text-white ${isHindi ? 'text-2xl font-medium' : ''}`}>
                  {t('header.title')}
                </h3>
                <p className={`text-[#8DBTA4] font-semibold text-lg ${isHindi ? 'text-base' : ''}`}>{t('header.tagline')}</p>
              </div>
            </div>
            
            <p className={`text-[#8DBTA4]/80 mb-8 max-w-md leading-relaxed text-lg ${isHindi ? 'text-base' : ''}`}>
              {t('footer.description')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-[#2D4F4A]/30 px-6 py-4 rounded-2xl border border-[#2D4F4A]/50">
                <div className="w-4 h-4 bg-[#8DBTA4] rounded-full animate-pulse"></div>
                <span className={`text-white font-semibold text-lg ${isHindi ? 'text-base' : ''}`}>
                  {t('footer.womenServed')}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 bg-[#0A0F0D]/50 px-6 py-4 rounded-2xl border border-[#2D4F4A]/30">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#8DBTA4] fill-current" />
                  ))}
                </div>
                <span className={`text-white font-semibold ${isHindi ? 'text-sm' : ''}`}>
                  4.9/5 {t('footer.trustRating')}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-xl font-bold mb-6 text-white ${isHindi ? 'text-lg font-medium' : ''}`}>{t('footer.services')}</h4>
            <ul className="space-y-4">
              {services.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center space-x-3 text-[#8DBTA4]/80 hover:text-white transition-colors duration-300 group cursor-pointer">
                    <item.icon className="w-5 h-5 text-[#2D4F4A] group-hover:text-[#8DBTA4] group-hover:scale-110 transition-all duration-300" />
                    <span className={`group-hover:translate-x-1 transition-transform duration-300 ${isHindi ? 'text-sm' : ''}`}>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-xl font-bold mb-6 text-white ${isHindi ? 'text-lg font-medium' : ''}`}>{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center space-x-3 text-[#8DBTA4]/80 hover:text-white transition-colors duration-300 group">
                  <Mail className="w-5 h-5 text-[#2D4F4A] group-hover:scale-110 transition-transform duration-300" />
                  <span className={isHindi ? 'text-sm' : ''}>support@mahilamaitri.in</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-[#8DBTA4]/80 hover:text-white transition-colors duration-300 group">
                  <Phone className="w-5 h-5 text-[#2D4F4A] group-hover:scale-110 transition-transform duration-300" />
                  <span className={isHindi ? 'text-sm' : ''}>+91-800-WOMEN-1</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-[#8DBTA4]/80 hover:text-white transition-colors duration-300 group">
                  <MapPin className="w-5 h-5 text-[#2D4F4A] group-hover:scale-110 transition-transform duration-300" />
                  <span className={isHindi ? 'text-sm' : ''}>
                    {isHindi ? 'पैन-इंडिया सेवा' : 'Pan-India Service'}
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className={`font-semibold text-white mb-4 ${isHindi ? 'text-sm' : ''}`}>{t('footer.emergencySupport')}</h5>
              <button className={`bg-[#2D4F4A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8DBTA4] hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 ${isHindi ? 'text-sm' : ''}`}>
                <Phone className="w-5 h-5" />
                <span>{t('footer.callNow')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#2D4F4A]/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-[#8DBTA4]/70 text-lg mb-4 md:mb-0 ${isHindi ? 'text-base' : ''}`}>
              {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-[#8DBTA4]">
                <Shield className="w-5 h-5" />
                <span className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>{t('footer.privacyProtected')}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#8DBTA4]">
                <Heart className="w-5 h-5" />
                <span className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>{t('footer.builtWithCare')}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#2D4F4A]">
                <Award className="w-5 h-5" />
                <span className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>{t('footer.trustedPlatform')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;