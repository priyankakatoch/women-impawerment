import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Heart, Shield, Users, Globe, Star, Sparkles, Award, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Particles from './Particles';

interface HeroProps {
  setActiveSection: (section: 'home' | 'sales' | 'health') => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { t, isHindi } = useLanguage();

  const testimonials = [
    { 
      name: "प्रिया शर्मा", 
      location: "दिल्ली", 
      text: isHindi ? "मेरी सब्जी की बिक्री 40% बढ़ गई है! अब मैं सीधे रेस्टोरेंट को बेचती हूं।" : "My vegetable sales increased by 40%! Now I sell directly to restaurants.", 
      rating: 5 
    },
    { 
      name: "अनीता देवी", 
      location: "मुंबई", 
      text: isHindi ? "निजी स्वास्थ्य सहायता ने मेरी जिंदगी पूरी तरह बदल दी है।" : "Private health support completely changed my life.", 
      rating: 5 
    },
    { 
      name: "सुनीता कुमारी", 
      location: "बैंगलोर", 
      text: isHindi ? "अब मैं सीधे रेस्टोरेंट से जुड़ती हूं! मेरी आमदनी दोगुनी हो गई।" : "Now I connect directly with restaurants! My income doubled.", 
      rating: 5 
    }
  ];

  const achievements = [
    { icon: Users, number: "500+", label: t('footer.womenEmpowered') },
    { icon: TrendingUp, number: "₹2.5M+", label: t('footer.salesGenerated') },
    { icon: Heart, number: "400+", label: t('footer.healthConsultations') },
    { icon: Globe, number: "24/7", label: t('footer.supportAvailable') }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add('animate-fadeInUp');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-32">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378]">
        <Particles
          particleColors={['#F5F3EC', '#D2CDB9', '#92A378', '#2D4F4A', '#8DBTA4']}
          particleCount={120}
          particleSpread={15}
          speed={0.03}
          particleBaseSize={60}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          particleHoverFactor={0.3}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
        {/* Trust Badge */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-[#8DBTA4]/20 text-[#2D4F4A] px-6 py-3 rounded-full text-sm font-semibold border border-[#8DBTA4]/30 hover:scale-105 transition-transform duration-300 cursor-pointer group backdrop-blur-sm">
            <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className={isHindi ? 'text-xs' : ''}>{t('hero.trustBadge')}</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className={`text-center mb-16 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0A0F0D] mb-6 leading-tight ${isHindi ? 'text-3xl sm:text-5xl lg:text-6xl font-medium' : ''}`}>
            <span className="block">{t('hero.title1')}</span>
            <span className="block text-[#2D4F4A] animate-gradient-x">
              {t('hero.title2')}
            </span>
            <span className={`block text-2xl sm:text-3xl lg:text-4xl mt-4 text-[#2D4F4A]/80 font-medium ${isHindi ? 'text-xl sm:text-2xl lg:text-3xl' : ''}`}>
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <p className={`text-xl sm:text-2xl text-[#2D4F4A]/70 mb-8 max-w-4xl mx-auto leading-relaxed ${isHindi ? 'text-lg sm:text-xl' : ''}`}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={() => setActiveSection('sales')}
              className="group relative flex items-center space-x-3 bg-[#2D4F4A] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[#0A0F0D] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <TrendingUp className="w-6 h-6 group-hover:animate-bounce relative z-10" />
              <span className={`relative z-10 ${isHindi ? 'text-base' : ''}`}>{t('hero.startSelling')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
            
            <button
              onClick={() => setActiveSection('health')}
              className="group relative flex items-center space-x-3 bg-[#0A0F0D] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-[#2D4F4A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Heart className="w-6 h-6 group-hover:animate-pulse relative z-10" />
              <span className={`relative z-10 ${isHindi ? 'text-base' : ''}`}>{t('hero.getHealth')}</span>
              <Shield className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Sales Empowerment Card */}
          <div 
            className={`group bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-700 cursor-pointer border border-[#8DBTA4]/20 hover:border-[#2D4F4A]/30 animate-on-scroll ${isVisible ? 'animate-slideInLeft' : ''}`}
            onClick={() => setActiveSection('sales')}
          >
            <div className="relative mb-6">
              <div className="bg-[#2D4F4A] p-4 rounded-2xl w-fit group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#8DBTA4] rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-[#0A0F0D] mb-4 group-hover:text-[#2D4F4A] transition-colors ${isHindi ? 'text-xl font-medium' : ''}`}>
              {t('hero.salesTitle')}
            </h3>
            <p className={`text-[#2D4F4A]/70 mb-6 leading-relaxed ${isHindi ? 'text-sm' : ''}`}>
              {t('hero.salesDesc')}
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                isHindi ? "रियल-टाइम बिक्री पैटर्न विश्लेषण" : "Real-time sales pattern analysis",
                isHindi ? "डायनामिक मूल्य निर्धारण सुझाव" : "Dynamic pricing recommendations",
                isHindi ? "रेस्टोरेंट और दुकानों से सीधा कनेक्शन" : "Direct restaurant & shop connections",
                isHindi ? "आवाज़-गाइडेड बिजनेस इनसाइट्स" : "Voice-guided business insights"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-[#2D4F4A] group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                  <div className="w-2 h-2 bg-[#2D4F4A] rounded-full animate-pulse"></div>
                  <span className={`font-medium ${isHindi ? 'text-sm' : ''}`}>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-[#2D4F4A] font-bold text-lg group-hover:text-[#0A0F0D] transition-colors ${isHindi ? 'text-base' : ''}`}>
                {t('hero.exploreSales')}
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 bg-[#8DBTA4] rounded-full border-2 border-white opacity-${70 + i * 10}`}></div>
                  ))}
                  <div className="w-8 h-8 bg-[#2D4F4A] rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                    500+
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Support Card */}
          <div 
            className={`group bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-700 cursor-pointer border border-[#8DBTA4]/20 hover:border-[#2D4F4A]/30 animate-on-scroll ${isVisible ? 'animate-slideInRight' : ''}`}
            onClick={() => setActiveSection('health')}
          >
            <div className="relative mb-6">
              <div className="bg-[#0A0F0D] p-4 rounded-2xl w-fit group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#8DBTA4] rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-[#0A0F0D] mb-4 group-hover:text-[#2D4F4A] transition-colors ${isHindi ? 'text-xl font-medium' : ''}`}>
              {t('hero.healthTitle')}
            </h3>
            <p className={`text-[#2D4F4A]/70 mb-6 leading-relaxed ${isHindi ? 'text-sm' : ''}`}>
              {t('hero.healthDesc')}
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                isHindi ? "सहानुभूति के साथ निजी AI चैट" : "Private AI chat with empathy",
                isHindi ? "महिला स्वास्थ्य सलाहकार सहायता" : "Female health advisor support",
                isHindi ? "मुफ्त डॉक्टर परामर्श" : "Free doctor consultations",
                isHindi ? "पूर्ण डेटा गोपनीयता सुरक्षा" : "Complete data privacy protection"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-[#2D4F4A] group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                  <div className="w-2 h-2 bg-[#2D4F4A] rounded-full animate-pulse"></div>
                  <span className={`font-medium ${isHindi ? 'text-sm' : ''}`}>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-[#2D4F4A] font-bold text-lg group-hover:text-[#0A0F0D] transition-colors ${isHindi ? 'text-base' : ''}`}>
                {t('hero.getPrivateSupport')}
              </span>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#2D4F4A]" />
                <span className={`text-sm text-[#2D4F4A] font-bold ${isHindi ? 'text-xs' : ''}`}>
                  {isHindi ? '100% निजी' : '100% Private'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-2xl border border-[#8DBTA4]/20 animate-on-scroll ${isVisible ? 'animate-fadeInUp' : ''}`}>
          <h2 className={`text-3xl font-bold text-center text-[#0A0F0D] mb-8 ${isHindi ? 'text-2xl font-medium' : ''}`}>
            {t('hero.realStories')}
          </h2>
          <div className="relative overflow-hidden h-32">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === currentTestimonial 
                    ? 'translate-x-0 opacity-100' 
                    : index < currentTestimonial 
                      ? '-translate-x-full opacity-0' 
                      : 'translate-x-full opacity-0'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#8DBTA4] fill-current" />
                    ))}
                  </div>
                  <p className={`text-xl text-[#2D4F4A] mb-4 italic ${isHindi ? 'text-lg' : ''}`}>"{testimonial.text}"</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-10 h-10 bg-[#2D4F4A] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-semibold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>{testimonial.name}</p>
                      <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-[#2D4F4A] scale-125' 
                    : 'bg-[#8DBTA4]/50 hover:bg-[#2D4F4A]/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`animate-on-scroll transform transition-all duration-700 hover:scale-110 ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#8DBTA4]/20 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2D4F4A] flex items-center justify-center shadow-lg">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#2D4F4A] mb-2 counter" data-target={achievement.number}>
                  {achievement.number}
                </div>
                <div className={`text-[#2D4F4A]/70 font-medium ${isHindi ? 'text-sm' : ''}`}>{achievement.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;