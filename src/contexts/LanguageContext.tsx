import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translation data with more contextual and culturally relevant content
const translations = {
  en: {
    // Header
    'header.title': 'Mahila Maitri',
    'header.tagline': 'Dignity • Growth • Care',
    'header.home': 'Home',
    'header.sales': 'Sales Dashboard',
    'header.health': 'Health Support',
    'header.voiceHelp': 'Voice Help',
    'header.listening': 'Listening...',
    'header.switchToHindi': 'Switch to Hindi',
    'header.switchToEnglish': 'Switch to English',

    // Hero Section
    'hero.trustBadge': 'Trusted by 500+ Women Entrepreneurs Across India',
    'hero.title1': 'Empowering Women Through',
    'hero.title2': 'Smart Business Solutions',
    'hero.subtitle': 'Your trusted partner for business growth and health support',
    'hero.description': 'Join hundreds of women entrepreneurs who have transformed their businesses with our AI-powered sales insights and confidential health guidance. Every woman deserves the tools to succeed.',
    'hero.startSelling': 'Start Smart Selling',
    'hero.getHealth': 'Get Private Health Support',
    'hero.salesTitle': 'Smart Business Analytics',
    'hero.salesDesc': 'Get real-time market insights, pricing recommendations, and direct connections to buyers. Our AI understands local markets and helps you maximize profits.',
    'hero.healthTitle': 'Confidential Health Guidance',
    'hero.healthDesc': 'Access private health consultations with female doctors and AI support. Complete confidentiality guaranteed with auto-delete conversations.',
    'hero.exploreSales': 'Explore Business Tools →',
    'hero.getPrivateSupport': 'Get Confidential Support →',
    'hero.realStories': 'Real Success Stories from Women Like You',

    // Sales Dashboard
    'sales.title': 'Business Dashboard',
    'sales.subtitle': 'Smart insights to grow your business',
    'sales.voiceHelp': 'Voice Assistant',
    'sales.listening': 'Listening...',
    'sales.callExpert': 'Call Business Expert',
    'sales.voiceActive': 'Voice Assistant Ready',
    'sales.voiceDesc': 'Speak in Hindi or English - I understand both languages perfectly',
    'sales.voiceTry': 'Try: "What are my best selling products?" or "मेरे सबसे अच्छे उत्पाद कौन से हैं?"',
    'sales.totalSales': 'Total Revenue',
    'sales.productsSold': 'Items Sold',
    'sales.activeCustomers': 'Regular Customers',
    'sales.bestSeason': 'Peak Season',
    'sales.productPerformance': 'Product Performance Analysis',
    'sales.smartRecommendations': 'AI Business Recommendations',
    'sales.salesTrends': 'Sales Patterns & Market Trends',
    'sales.getMoreInsights': 'Get Advanced Analytics',
    'sales.peakAlert': 'Peak Demand Alert',
    'sales.priceOptimization': 'Smart Pricing',
    'sales.b2bOpportunity': 'New Business Opportunity',
    'sales.topPerformer': 'Success Recognition',

    // Health Support
    'health.title': 'Private Health Support',
    'health.subtitle': 'Confidential guidance from female health experts',
    'health.confidential': '100% Confidential',
    'health.certified': 'Certified Female Doctors',
    'health.privacyTitle': 'Your Privacy is Our Sacred Promise',
    'health.autoDelete': 'Auto-Delete',
    'health.autoDeleteDesc': 'All conversations deleted after session',
    'health.encrypted': 'Encrypted',
    'health.encryptedDesc': 'Military-grade encryption',
    'health.femaleAgents': 'Female Doctors',
    'health.femaleAgentsDesc': 'Only female healthcare professionals',
    'health.aiSupportTitle': 'Start with AI Health Assistant',
    'health.aiSupportDesc': 'Begin with our empathetic AI for immediate guidance and health information in complete privacy',
    'health.doctorTitle': 'Connect with Female Doctor',
    'health.doctorDesc': 'Speak directly with certified female doctors who understand women\'s health concerns',
    'health.startPrivateChat': 'Start Confidential Chat',
    'health.connectDoctor': 'Connect with Doctor',
    'health.healthTopics': 'Health Topics We Support',
    'health.testimonials': 'What Women Say About Our Support',
    'health.switchDesktop': 'Switch to Desktop View',
    'health.reproductiveHealth': 'Women\'s Health',
    'health.reproductiveHealthDesc': 'Menstrual health, pregnancy, fertility guidance',
    'health.personalHygiene': 'Personal Care',
    'health.personalHygieneDesc': 'Intimate hygiene and personal care tips',
    'health.generalWellness': 'General Health',
    'health.generalWellnessDesc': 'Nutrition, fitness, and overall wellness',
    'health.mentalHealth': 'Mental Wellness',
    'health.mentalHealthDesc': 'Emotional support and stress management',

    // Footer
    'footer.womenEmpowered': 'Women Entrepreneurs Supported',
    'footer.salesGenerated': 'Business Revenue Generated',
    'footer.healthConsultations': 'Private Health Consultations',
    'footer.supportAvailable': 'Support Available',
    'footer.description': 'Empowering women entrepreneurs with intelligent business tools and confidential health support. Every woman deserves dignity, opportunity, and care in her journey to success.',
    'footer.womenServed': 'Women Helped Daily',
    'footer.trustRating': 'Trust Rating',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Us',
    'footer.emergencySupport': 'Emergency Support',
    'footer.callNow': 'Call Now',
    'footer.copyright': '© 2025 Mahila Maitri. Empowering women with dignity and care.',
    'footer.privacyProtected': 'Privacy Protected',
    'footer.builtWithCare': 'Built with Care',
    'footer.trustedPlatform': 'Trusted Platform',
    'footer.smartAnalytics': 'Smart Business Analytics',
    'footer.privateHealth': 'Private Health Support',
    'footer.voiceAssistance': '24/7 Voice Assistance',
    'footer.confidentialConsultations': 'Confidential Consultations',
    'footer.bilingualSupport': 'Hindi & English Support',

    // Common
    'common.liveData': 'Live Data',
    'common.thisWeek': 'This Week',
    'common.thisMonth': 'This Month',
    'common.thisQuarter': 'This Quarter',
    'common.online': 'Online',
    'common.peak': 'Peak',
    'common.high': 'High',
    'common.medium': 'Medium',
    'common.low': 'Low',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.success': 'Success',
  },
  hi: {
    // Header
    'header.title': 'महिला मैत्री',
    'header.tagline': 'गरिमा • विकास • देखभाल',
    'header.home': 'होम',
    'header.sales': 'बिजनेस डैशबोर्ड',
    'header.health': 'स्वास्थ्य सहायता',
    'header.voiceHelp': 'आवाज़ सहायता',
    'header.listening': 'सुन रहे हैं...',
    'header.switchToHindi': 'हिंदी में बदलें',
    'header.switchToEnglish': 'अंग्रेजी में बदलें',

    // Hero Section
    'hero.trustBadge': 'भारत भर में 500+ महिला उद्यमियों का भरोसा',
    'hero.title1': 'महिलाओं को सशक्त बनाना',
    'hero.title2': 'स्मार्ट बिजनेस समाधान से',
    'hero.subtitle': 'आपके व्यापार की वृद्धि और स्वास्थ्य सहायता का विश्वसनीय साथी',
    'hero.description': 'सैकड़ों महिला उद्यमियों के साथ जुड़ें जिन्होंने हमारे AI-संचालित बिक्री अंतर्दृष्टि और गोपनीय स्वास्थ्य मार्गदर्शन से अपना व्यापार बदला है। हर महिला सफल होने के उपकरणों की हकदार है।',
    'hero.startSelling': 'स्मार्ट बिक्री शुरू करें',
    'hero.getHealth': 'निजी स्वास्थ्य सहायता पाएं',
    'hero.salesTitle': 'स्मार्ट बिजनेस एनालिटिक्स',
    'hero.salesDesc': 'रियल-टाइम बाजार की जानकारी, मूल्य निर्धारण सुझाव, और खरीदारों से सीधा संपर्क पाएं। हमारा AI स्थानीय बाजारों को समझता है और आपके मुनाफे को बढ़ाने में मदद करता है।',
    'hero.healthTitle': 'गोपनीय स्वास्थ्य मार्गदर्शन',
    'hero.healthDesc': 'महिला डॉक्टरों और AI सहायता के साथ निजी स्वास्थ्य परामर्श प्राप्त करें। ऑटो-डिलीट बातचीत के साथ पूर्ण गोपनीयता की गारंटी।',
    'hero.exploreSales': 'बिजनेस टूल्स देखें →',
    'hero.getPrivateSupport': 'गोपनीय सहायता पाएं →',
    'hero.realStories': 'आपके जैसी महिलाओं की सच्ची सफलता की कहानियां',

    // Sales Dashboard
    'sales.title': 'बिजनेस डैशबोर्ड',
    'sales.subtitle': 'आपके व्यापार को बढ़ाने के लिए स्मार्ट जानकारी',
    'sales.voiceHelp': 'आवाज़ सहायक',
    'sales.listening': 'सुन रहे हैं...',
    'sales.callExpert': 'बिजनेस एक्सपर्ट को कॉल करें',
    'sales.voiceActive': 'आवाज़ सहायक तैयार है',
    'sales.voiceDesc': 'हिंदी या अंग्रेजी में बोलें - मैं दोनों भाषाएं पूरी तरह समझता हूं',
    'sales.voiceTry': 'कोशिश करें: "मेरे सबसे अच्छे उत्पाद कौन से हैं?" या "What are my best selling products?"',
    'sales.totalSales': 'कुल आमदनी',
    'sales.productsSold': 'बेचे गए सामान',
    'sales.activeCustomers': 'नियमित ग्राहक',
    'sales.bestSeason': 'सबसे अच्छा मौसम',
    'sales.productPerformance': 'उत्पाद प्रदर्शन विश्लेषण',
    'sales.smartRecommendations': 'AI बिजनेस सुझाव',
    'sales.salesTrends': 'बिक्री पैटर्न और बाजार के रुझान',
    'sales.getMoreInsights': 'उन्नत एनालिटिक्स पाएं',
    'sales.peakAlert': 'उच्च मांग अलर्ट',
    'sales.priceOptimization': 'स्मार्ट मूल्य निर्धारण',
    'sales.b2bOpportunity': 'नया बिजनेस अवसर',
    'sales.topPerformer': 'सफलता की पहचान',

    // Health Support
    'health.title': 'निजी स्वास्थ्य सहायता',
    'health.subtitle': 'महिला स्वास्थ्य विशेषज्ञों से गोपनीय मार्गदर्शन',
    'health.confidential': '100% गोपनीय',
    'health.certified': 'प्रमाणित महिला डॉक्टर',
    'health.privacyTitle': 'आपकी गोपनीयता हमारा पवित्र वादा है',
    'health.autoDelete': 'ऑटो-डिलीट',
    'health.autoDeleteDesc': 'सत्र के बाद सभी बातचीत हटा दी जाती है',
    'health.encrypted': 'एन्क्रिप्टेड',
    'health.encryptedDesc': 'मिलिट्री-ग्रेड एन्क्रिप्शन',
    'health.femaleAgents': 'महिला डॉक्टर',
    'health.femaleAgentsDesc': 'केवल महिला स्वास्थ्य पेशेवर',
    'health.aiSupportTitle': 'AI स्वास्थ्य सहायक से शुरुआत करें',
    'health.aiSupportDesc': 'पूर्ण गोपनीयता में तत्काल मार्गदर्शन और स्वास्थ्य जानकारी के लिए हमारे सहानुभूतिपूर्ण AI से शुरुआत करें',
    'health.doctorTitle': 'महिला डॉक्टर से जुड़ें',
    'health.doctorDesc': 'प्रमाणित महिला डॉक्टरों से सीधे बात करें जो महिलाओं की स्वास्थ्य चिंताओं को समझती हैं',
    'health.startPrivateChat': 'गोपनीय चैट शुरू करें',
    'health.connectDoctor': 'डॉक्टर से जुड़ें',
    'health.healthTopics': 'स्वास्थ्य विषय जिनका हम समर्थन करते हैं',
    'health.testimonials': 'महिलाएं हमारी सहायता के बारे में क्या कहती हैं',
    'health.switchDesktop': 'डेस्कटॉप व्यू पर स्विच करें',
    'health.reproductiveHealth': 'महिला स्वास्थ्य',
    'health.reproductiveHealthDesc': 'मासिक धर्म स्वास्थ्य, गर्भावस्था, प्रजनन मार्गदर्शन',
    'health.personalHygiene': 'व्यक्तिगत देखभाल',
    'health.personalHygieneDesc': 'अंतरंग स्वच्छता और व्यक्तिगत देखभाल के टिप्स',
    'health.generalWellness': 'सामान्य स्वास्थ्य',
    'health.generalWellnessDesc': 'पोषण, फिटनेस, और समग्र कल्याण',
    'health.mentalHealth': 'मानसिक स्वास्थ्य',
    'health.mentalHealthDesc': 'भावनात्मक सहायता और तनाव प्रबंधन',

    // Footer
    'footer.womenEmpowered': 'महिला उद्यमियों को सहायता',
    'footer.salesGenerated': 'बिजनेस आमदनी उत्पन्न',
    'footer.healthConsultations': 'निजी स्वास्थ्य परामर्श',
    'footer.supportAvailable': 'सहायता उपलब्ध',
    'footer.description': 'महिला उद्यमियों को बुद्धिमान बिजनेस टूल्स और गोपनीय स्वास्थ्य सहायता के साथ सशक्त बनाना। हर महिला सफलता की यात्रा में गरिमा, अवसर और देखभाल की हकदार है।',
    'footer.womenServed': 'दैनिक सहायता प्राप्त महिलाएं',
    'footer.trustRating': 'विश्वास रेटिंग',
    'footer.services': 'हमारी सेवाएं',
    'footer.contact': 'संपर्क करें',
    'footer.emergencySupport': 'आपातकालीन सहायता',
    'footer.callNow': 'अभी कॉल करें',
    'footer.copyright': '© 2025 महिला मैत्री। गरिमा और देखभाल के साथ महिलाओं को सशक्त बनाना।',
    'footer.privacyProtected': 'गोपनीयता सुरक्षित',
    'footer.builtWithCare': 'देखभाल के साथ निर्मित',
    'footer.trustedPlatform': 'विश्वसनीय प्लेटफॉर्म',
    'footer.smartAnalytics': 'स्मार्ट बिजनेस एनालिटिक्स',
    'footer.privateHealth': 'निजी स्वास्थ्य सहायता',
    'footer.voiceAssistance': '24/7 आवाज़ सहायता',
    'footer.confidentialConsultations': 'गोपनीय परामर्श',
    'footer.bilingualSupport': 'हिंदी और अंग्रेजी सहायता',

    // Common
    'common.liveData': 'लाइव डेटा',
    'common.thisWeek': 'इस सप्ताह',
    'common.thisMonth': 'इस महीने',
    'common.thisQuarter': 'इस तिमाही',
    'common.online': 'ऑनलाइन',
    'common.peak': 'चरम',
    'common.high': 'उच्च',
    'common.medium': 'मध्यम',
    'common.low': 'कम',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ',
    'common.retry': 'फिर कोशिश करें',
    'common.success': 'सफल',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('mahilamaitri-language');
    return (saved as Language) || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('mahilamaitri-language', language);
    // Set document language attribute for accessibility
    document.documentElement.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'hi' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  const isHindi = language === 'hi';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      setLanguage, 
      t, 
      isHindi 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};