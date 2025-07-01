import React, { useState, useEffect } from 'react';
import { MessageCircle, Shield, Heart, Phone, User, Lock, Trash2, Clock, Star, Mic, Video, FileText, Calendar, Award, CheckCircle, X, Send, RotateCcw, Plus, UserPlus, Save, Edit, Eye, MoreVertical, Filter, Search, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Particles from './Particles';

interface HealthCustomer {
  id: string;
  name: string;
  age: number;
  phone: string;
  email?: string;
  location: string;
  emergencyContact: string;
  healthConcerns: string[];
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  preferredLanguage: 'Hindi' | 'English' | 'Both';
  consultationType: 'AI Chat' | 'Doctor Consultation' | 'Both';
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Emergency';
  registrationDate: string;
  lastConsultation?: string;
  status: 'New' | 'Active' | 'Follow-up Required' | 'Resolved';
  satisfactionRating?: number;
  notes: string;
  consentGiven: boolean;
}

const HealthSupport: React.FC = () => {
  const [activeChat, setActiveChat] = useState<'bot' | 'agent' | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: 'user' | 'bot' | 'agent', message: string, time: string, type?: 'text' | 'suggestion'}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showMobileInterface, setShowMobileInterface] = useState(false);
  const [activeTab, setActiveTab] = useState<'support' | 'customers' | 'register'>('support');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [customers, setCustomers] = useState<HealthCustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<HealthCustomer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'New' | 'Active' | 'Follow-up Required' | 'Resolved'>('All');
  const [registrationData, setRegistrationData] = useState<Partial<HealthCustomer>>({
    name: '',
    age: 0,
    phone: '',
    email: '',
    location: '',
    emergencyContact: '',
    healthConcerns: [],
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    preferredLanguage: 'Hindi',
    consultationType: 'AI Chat',
    urgencyLevel: 'Medium',
    notes: '',
    consentGiven: false
  });

  const { t, isHindi } = useLanguage();

  const healthConcernOptions = [
    isHindi ? 'महिला स्वास्थ्य' : 'Women\'s Health',
    isHindi ? 'मानसिक स्वास्थ्य' : 'Mental Health',
    isHindi ? 'व्यक्तिगत देखभाल' : 'Personal Care',
    isHindi ? 'सामान्य स्वास्थ्य' : 'General Health',
    isHindi ? 'पोषण और आहार' : 'Nutrition & Diet',
    isHindi ? 'गर्भावस्था' : 'Pregnancy',
    isHindi ? 'मासिक धर्म' : 'Menstrual Health',
    isHindi ? 'तनाव प्रबंधन' : 'Stress Management'
  ];

  const healthTopics = [
    { 
      icon: Heart, 
      title: t('health.reproductiveHealth'), 
      description: t('health.reproductiveHealthDesc')
    },
    { 
      icon: Shield, 
      title: t('health.personalHygiene'), 
      description: t('health.personalHygieneDesc')
    },
    { 
      icon: User, 
      title: t('health.generalWellness'), 
      description: t('health.generalWellnessDesc')
    },
    { 
      icon: Star, 
      title: t('health.mentalHealth'), 
      description: t('health.mentalHealthDesc')
    }
  ];

  const testimonials = [
    { 
      name: 'Anonymous User', 
      text: isHindi ? 'महिला एजेंट बहुत समझदार थी और उसने मुझे सही इलाज दिलाने में मदद की।' : 'The female agent was so understanding and helped me get proper medical care.', 
      rating: 5 
    },
    { 
      name: 'Confidential', 
      text: isHindi ? 'मुझे बहुत अच्छी सलाह मिली और डॉक्टर से मिलने में मदद मिली।' : 'I got excellent advice and help connecting with a doctor.', 
      rating: 5 
    },
    { 
      name: 'Private User', 
      text: isHindi ? 'पूरी गोपनीयता और पेशेवर मार्गदर्शन। बहुत सुझाव देती हूं।' : 'Complete privacy and professional guidance. Highly recommended.', 
      rating: 5 
    }
  ];

  // Sample health customers data
  useEffect(() => {
    const sampleHealthCustomers: HealthCustomer[] = [
      {
        id: 'HC001',
        name: 'Anonymous User 1',
        age: 28,
        phone: '+91 98765 43210',
        email: 'user1@private.com',
        location: 'दिल्ली',
        emergencyContact: '+91 98765 43211',
        healthConcerns: ['Women\'s Health', 'Mental Health'],
        medicalHistory: 'No major medical history',
        currentMedications: 'None',
        allergies: 'None known',
        preferredLanguage: 'Hindi',
        consultationType: 'Doctor Consultation',
        urgencyLevel: 'Medium',
        registrationDate: '2024-01-15',
        lastConsultation: '2024-01-20',
        status: 'Active',
        satisfactionRating: 5,
        notes: 'Regular follow-up needed',
        consentGiven: true
      },
      {
        id: 'HC002',
        name: 'Anonymous User 2',
        age: 35,
        phone: '+91 87654 32109',
        location: 'मुंबई',
        emergencyContact: '+91 87654 32110',
        healthConcerns: ['Personal Care', 'Nutrition & Diet'],
        medicalHistory: 'Diabetes Type 2',
        currentMedications: 'Metformin',
        allergies: 'Penicillin',
        preferredLanguage: 'Both',
        consultationType: 'AI Chat',
        urgencyLevel: 'Low',
        registrationDate: '2024-01-10',
        lastConsultation: '2024-01-18',
        status: 'Follow-up Required',
        satisfactionRating: 4,
        notes: 'Dietary consultation needed',
        consentGiven: true
      },
      {
        id: 'HC003',
        name: 'Anonymous User 3',
        age: 24,
        phone: '+91 76543 21098',
        location: 'बैंगलोर',
        emergencyContact: '+91 76543 21099',
        healthConcerns: ['Menstrual Health', 'Stress Management'],
        medicalHistory: 'PCOS',
        currentMedications: 'Birth control pills',
        allergies: 'None',
        preferredLanguage: 'English',
        consultationType: 'Both',
        urgencyLevel: 'High',
        registrationDate: '2024-01-12',
        status: 'New',
        notes: 'First consultation scheduled',
        consentGiven: true
      }
    ];
    setCustomers(sampleHealthCustomers);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeChat) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeChat]);

  const startBotChat = () => {
    setActiveChat('bot');
    setSessionTime(0);
    setShowMobileInterface(true);
    setChatMessages([
      { 
        id: 1, 
        sender: 'bot', 
        message: isHindi 
          ? 'नमस्ते 👋, मैं आपकी AI स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकती हूं? हमारी सभी बातचीत पूरी तरह गोपनीय है।'
          : 'Hi 👋, I\'m your AI health assistant. How can I help you today? Everything we discuss is completely confidential.', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
    ]);
  };

  const connectToAgent = () => {
    setActiveChat('agent');
    setSessionTime(0);
    setShowMobileInterface(true);
    setChatMessages([
      { 
        id: 1, 
        sender: 'agent', 
        message: isHindi
          ? 'नमस्ते, मैं डॉ. प्रिया हूं, एक महिला स्वास्थ्य सलाहकार। मैं यहां सुनने और पूर्ण गोपनीयता में आपको पेशेवर मार्गदर्शन प्रदान करने के लिए हूं। आज आप क्या चर्चा करना चाहेंगी?'
          : 'Hi, I\'m Dr. Priya, a female health advisor. I\'m here to listen and provide you with professional guidance in complete privacy. What would you like to discuss today?', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
    ]);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'user' as const,
        message: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text' as const
      };
      setChatMessages([...chatMessages, newMessage]);
      setInputMessage('');
      setIsTyping(true);

      // Simulate response
      setTimeout(() => {
        setIsTyping(false);
        const responses = activeChat === 'bot' 
          ? (isHindi ? [
              'मैं आपकी चिंता समझती हूं। यह बहुत आम है और आप अकेली नहीं हैं। क्या आप चाहेंगी कि मैं आपको एक महिला डॉक्टर से जोड़ूं?',
              'मुझसे यह साझा करने के लिए धन्यवाद। आपने जो बताया है उसके आधार पर, यहां कुछ सुरक्षित सुझाव हैं...',
              'यह एक बहुत अच्छा सवाल है। मैं आपको कुछ उपयोगी जानकारी देती हूं।'
            ] : [
              'I understand your concern. This is very common and you\'re not alone. Would you like me to connect you with a female doctor?',
              'Thank you for sharing that with me. Based on what you\'ve described, here are some safe recommendations...',
              'That\'s a great question. Let me provide you with some helpful information.'
            ])
          : (isHindi ? [
              'मुझ पर भरोसा करने के लिए धन्यवाद। मेरे चिकित्सा अनुभव के आधार पर, मैं आपको सुरक्षित रूप से इसके माध्यम से मार्गदर्शन कर सकती हूं।',
              'मैं पूरी तरह समझती हूं कि आप कैसा महसूस कर रही हैं। यह आपके विचार से अधिक आम है, और हम निश्चित रूप से आपकी मदद कर सकते हैं।',
              'मैं हमारे विशेषज्ञ के साथ परामर्श की व्यवस्था करती हूं। इस बीच, यहां मेरी सिफारिश है...'
            ] : [
              'Thank you for trusting me with this. Based on my medical experience, I can guide you through this safely.',
              'I completely understand how you\'re feeling. This is more common than you think, and we can definitely help you.',
              'Let me arrange a consultation with our specialist. In the meantime, here\'s what I recommend...'
            ]);
        
        const response = {
          id: chatMessages.length + 2,
          sender: activeChat === 'bot' ? 'bot' as const : 'agent' as const,
          message: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text' as const
        };
        setChatMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const endSession = () => {
    setActiveChat(null);
    setChatMessages([]);
    setInputMessage('');
    setSessionTime(0);
    setShowMobileInterface(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.consentGiven) {
      alert(isHindi ? 'कृपया सहमति दें' : 'Please provide consent');
      return;
    }

    const newCustomer: HealthCustomer = {
      id: `HC${String(customers.length + 1).padStart(3, '0')}`,
      name: registrationData.name || 'Anonymous User',
      age: registrationData.age || 0,
      phone: registrationData.phone || '',
      email: registrationData.email,
      location: registrationData.location || '',
      emergencyContact: registrationData.emergencyContact || '',
      healthConcerns: registrationData.healthConcerns || [],
      medicalHistory: registrationData.medicalHistory || '',
      currentMedications: registrationData.currentMedications || '',
      allergies: registrationData.allergies || '',
      preferredLanguage: registrationData.preferredLanguage || 'Hindi',
      consultationType: registrationData.consultationType || 'AI Chat',
      urgencyLevel: registrationData.urgencyLevel || 'Medium',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: registrationData.notes || '',
      consentGiven: true
    };

    setCustomers([...customers, newCustomer]);
    setShowRegistrationForm(false);
    setRegistrationData({
      name: '',
      age: 0,
      phone: '',
      email: '',
      location: '',
      emergencyContact: '',
      healthConcerns: [],
      medicalHistory: '',
      currentMedications: '',
      allergies: '',
      preferredLanguage: 'Hindi',
      consultationType: 'AI Chat',
      urgencyLevel: 'Medium',
      notes: '',
      consentGiven: false
    });
    
    alert(isHindi ? 'पंजीकरण सफल! आपकी ID: ' + newCustomer.id : 'Registration successful! Your ID: ' + newCustomer.id);
  };

  const handleHealthConcernChange = (concern: string, checked: boolean) => {
    const currentConcerns = registrationData.healthConcerns || [];
    if (checked) {
      setRegistrationData({
        ...registrationData,
        healthConcerns: [...currentConcerns, concern]
      });
    } else {
      setRegistrationData({
        ...registrationData,
        healthConcerns: currentConcerns.filter(c => c !== concern)
      });
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.healthConcerns.some(concern => concern.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Follow-up Required': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'support', label: isHindi ? 'स्वास्थ्य सहायता' : 'Health Support', icon: Heart },
    { id: 'customers', label: isHindi ? 'ग्राहक विवरण' : 'Customer Details', icon: User },
    { id: 'register', label: isHindi ? 'नया पंजीकरण' : 'New Registration', icon: UserPlus }
  ];

  // Mobile Phone Interface
  if (showMobileInterface && activeChat) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background with Particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378]">
          <Particles
            particleColors={['#F5F3EC', '#D2CDB9', '#92A378']}
            particleCount={60}
            particleSpread={25}
            speed={0.01}
            particleBaseSize={30}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
          />
        </div>

        <div className="max-w-md mx-auto relative" style={{ zIndex: 10 }}>
          {/* Mobile Phone Container */}
          <div className="bg-[#0A0F0D] rounded-[3rem] p-2 shadow-2xl">
            <div className="bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378] rounded-[2.5rem] overflow-hidden h-[700px] relative">
              {/* Status Bar */}
              <div className="bg-gradient-to-r from-[#F5F3EC] to-[#D2CDB9] px-6 py-2 flex justify-between items-center text-[#0A0F0D] text-sm font-medium">
                <span>12:30</span>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-[#0A0F0D] rounded"></div>
                    <div className="w-1 h-3 bg-[#0A0F0D] rounded"></div>
                    <div className="w-1 h-3 bg-[#0A0F0D] rounded"></div>
                    <div className="w-1 h-3 bg-[#8DBTA4]/50 rounded"></div>
                  </div>
                  <div className="w-6 h-3 border border-[#0A0F0D] rounded-sm">
                    <div className="w-4 h-2 bg-[#8DBTA4] rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>

              {/* Chat Header */}
              <div className="bg-[#2D4F4A] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8DBTA4]/30 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {activeChat === 'bot' ? 'C' : 'D'}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>
                      {activeChat === 'bot' 
                        ? (isHindi ? 'स्वास्थ्य AI' : 'Health AI')
                        : (isHindi ? 'डॉ. प्रिया' : 'Dr. Priya')
                      }
                    </h3>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-[#8DBTA4] rounded-full"></div>
                      <span>{t('common.online')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-full transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={endSession}
                    className="p-2 hover:bg-[#8DBTA4]/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px] bg-gradient-to-br from-[#F5F3EC]/50 via-[#D2CDB9]/30 to-[#92A378]/20">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#2D4F4A] text-white rounded-br-md'
                          : 'bg-gradient-to-br from-[#F5F3EC]/90 to-[#D2CDB9]/70 text-[#0A0F0D] rounded-bl-md border border-[#8DBTA4]/20'
                      }`}
                    >
                      <p className={`text-sm leading-relaxed ${isHindi ? 'text-xs' : ''}`}>{msg.message}</p>
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'user' ? 'text-[#8DBTA4]/80' : 'text-[#2D4F4A]/60'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-[#F5F3EC]/90 to-[#D2CDB9]/70 text-[#0A0F0D] border border-[#8DBTA4]/20 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-[#2D4F4A]/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#2D4F4A]/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-[#2D4F4A]/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="bg-gradient-to-r from-[#F5F3EC] to-[#D2CDB9] border-t border-[#8DBTA4]/20 p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={isHindi ? "अपना संदेश टाइप करें..." : "Type your message..."}
                    className={`flex-1 px-4 py-3 bg-[#8DBTA4]/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D4F4A] text-sm text-[#0A0F0D] border border-[#8DBTA4]/20 ${isHindi ? 'text-xs' : ''}`}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-[#2D4F4A] text-white p-3 rounded-full hover:bg-[#0A0F0D] transition-colors shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Session Info */}
              <div className="absolute top-20 right-4 bg-[#0A0F0D]/70 text-white px-3 py-1 rounded-full text-xs">
                {formatTime(sessionTime)}
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowMobileInterface(false)}
              className={`bg-[#0A0F0D] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#2D4F4A] transition-colors shadow-lg ${isHindi ? 'text-sm' : ''}`}
            >
              {t('health.switchDesktop')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378]">
        <Particles
          particleColors={['#F5F3EC', '#D2CDB9', '#92A378', '#2D4F4A']}
          particleCount={100}
          particleSpread={18}
          speed={0.025}
          particleBaseSize={50}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          particleHoverFactor={0.4}
        />
      </div>

      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-[#8DBTA4]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#2D4F4A] p-4 rounded-2xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold text-[#0A0F0D] mb-2 ${isHindi ? 'text-2xl font-medium' : ''}`}>{t('health.title')}</h1>
                <p className={`text-[#2D4F4A]/70 font-medium ${isHindi ? 'text-sm' : ''}`}>{t('health.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#8DBTA4]/20 text-[#2D4F4A] px-4 py-2 rounded-xl border border-[#8DBTA4]/30">
                <CheckCircle className="w-5 h-5" />
                <span className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>{t('health.confidential')}</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#8DBTA4]/10 text-[#2D4F4A] px-4 py-2 rounded-xl border border-[#8DBTA4]/20">
                <Award className="w-5 h-5" />
                <span className={`font-semibold ${isHindi ? 'text-sm' : ''}`}>{t('health.certified')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8 border border-[#8DBTA4]/20">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#2D4F4A] text-white shadow-lg'
                    : 'text-[#2D4F4A] hover:bg-[#8DBTA4]/20'
                } ${isHindi ? 'text-sm' : ''}`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'register' && (
          <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#8DBTA4]/20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-[#2D4F4A] p-3 rounded-2xl shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>
                  {isHindi ? 'नया स्वास्थ्य पंजीकरण' : 'New Health Registration'}
                </h2>
                <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                  {isHindi ? 'अपनी स्वास्थ्य जानकारी भरें' : 'Fill in your health information'}
                </p>
              </div>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-[#8DBTA4]/5 p-6 rounded-2xl border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-[#2D4F4A]" />
                  <h3 className={`text-xl font-bold text-[#0A0F0D] ${isHindi ? 'text-lg font-medium' : ''}`}>
                    {isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                      placeholder={isHindi ? "आपका पूरा नाम" : "Your full name"}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'उम्र *' : 'Age *'}
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="100"
                      value={registrationData.age || ''}
                      onChange={(e) => setRegistrationData({...registrationData, age: parseInt(e.target.value)})}
                      placeholder={isHindi ? "आपकी उम्र" : "Your age"}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'फोन नंबर *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'शहर *' : 'City *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={registrationData.location}
                      onChange={(e) => setRegistrationData({...registrationData, location: e.target.value})}
                      placeholder={isHindi ? "आपका शहर" : "Your city"}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'आपातकालीन संपर्क *' : 'Emergency Contact *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={registrationData.emergencyContact}
                      onChange={(e) => setRegistrationData({...registrationData, emergencyContact: e.target.value})}
                      placeholder={isHindi ? "आपातकालीन स्थिति में संपर्क नंबर" : "Emergency contact number"}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="bg-[#8DBTA4]/5 p-6 rounded-2xl border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-6 h-6 text-[#2D4F4A]" />
                  <h3 className={`text-xl font-bold text-[#0A0F0D] ${isHindi ? 'text-lg font-medium' : ''}`}>
                    {isHindi ? 'स्वास्थ्य जानकारी' : 'Health Information'}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-3 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'स्वास्थ्य चिंताएं (एक या अधिक चुनें)' : 'Health Concerns (Select one or more)'}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {healthConcernOptions.map((concern) => (
                        <label key={concern} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={registrationData.healthConcerns?.includes(concern) || false}
                            onChange={(e) => handleHealthConcernChange(concern, e.target.checked)}
                            className="w-4 h-4 text-[#2D4F4A] border-[#8DBTA4]/30 rounded focus:ring-[#2D4F4A]"
                          />
                          <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{concern}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                        {isHindi ? 'चिकित्सा इतिहास' : 'Medical History'}
                      </label>
                      <textarea
                        value={registrationData.medicalHistory}
                        onChange={(e) => setRegistrationData({...registrationData, medicalHistory: e.target.value})}
                        placeholder={isHindi ? "कोई पुरानी बीमारी या सर्जरी" : "Any past illnesses or surgeries"}
                        rows={3}
                        className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                        {isHindi ? 'वर्तमान दवाएं' : 'Current Medications'}
                      </label>
                      <textarea
                        value={registrationData.currentMedications}
                        onChange={(e) => setRegistrationData({...registrationData, currentMedications: e.target.value})}
                        placeholder={isHindi ? "कोई दवा जो आप ले रहे हैं" : "Any medications you are taking"}
                        rows={3}
                        className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'एलर्जी' : 'Allergies'}
                    </label>
                    <input
                      type="text"
                      value={registrationData.allergies}
                      onChange={(e) => setRegistrationData({...registrationData, allergies: e.target.value})}
                      placeholder={isHindi ? "कोई एलर्जी या दवा से रिएक्शन" : "Any allergies or drug reactions"}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-[#8DBTA4]/5 p-6 rounded-2xl border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-[#2D4F4A]" />
                  <h3 className={`text-xl font-bold text-[#0A0F0D] ${isHindi ? 'text-lg font-medium' : ''}`}>
                    {isHindi ? 'प्राथमिकताएं' : 'Preferences'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'पसंदीदा भाषा' : 'Preferred Language'}
                    </label>
                    <select
                      value={registrationData.preferredLanguage}
                      onChange={(e) => setRegistrationData({...registrationData, preferredLanguage: e.target.value as any})}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      <option value="Hindi">{isHindi ? 'हिंदी' : 'Hindi'}</option>
                      <option value="English">{isHindi ? 'अंग्रेजी' : 'English'}</option>
                      <option value="Both">{isHindi ? 'दोनों' : 'Both'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'परामर्श प्रकार' : 'Consultation Type'}
                    </label>
                    <select
                      value={registrationData.consultationType}
                      onChange={(e) => setRegistrationData({...registrationData, consultationType: e.target.value as any})}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      <option value="AI Chat">{isHindi ? 'AI चैट' : 'AI Chat'}</option>
                      <option value="Doctor Consultation">{isHindi ? 'डॉक्टर परामर्श' : 'Doctor Consultation'}</option>
                      <option value="Both">{isHindi ? 'दोनों' : 'Both'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-[#2D4F4A] font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'तात्कालिकता स्तर' : 'Urgency Level'}
                    </label>
                    <select
                      value={registrationData.urgencyLevel}
                      onChange={(e) => setRegistrationData({...registrationData, urgencyLevel: e.target.value as any})}
                      className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                    >
                      <option value="Low">{isHindi ? 'कम' : 'Low'}</option>
                      <option value="Medium">{isHindi ? 'मध्यम' : 'Medium'}</option>
                      <option value="High">{isHindi ? 'उच्च' : 'High'}</option>
                      <option value="Emergency">{isHindi ? 'आपातकाल' : 'Emergency'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-[#8DBTA4]/5 p-6 rounded-2xl border border-[#8DBTA4]/20">
                <label className={`block text-[#2D4F4A] font-medium mb-3 ${isHindi ? 'text-sm' : ''}`}>
                  {isHindi ? 'अतिरिक्त जानकारी' : 'Additional Information'}
                </label>
                <textarea
                  value={registrationData.notes}
                  onChange={(e) => setRegistrationData({...registrationData, notes: e.target.value})}
                  placeholder={isHindi ? "कोई विशेष आवश्यकताएं या टिप्पणियां..." : "Any special requirements or comments..."}
                  rows={4}
                  className={`w-full px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                />
              </div>

              {/* Consent */}
              <div className="bg-[#8DBTA4]/5 p-6 rounded-2xl border border-[#8DBTA4]/20">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={registrationData.consentGiven}
                    onChange={(e) => setRegistrationData({...registrationData, consentGiven: e.target.checked})}
                    className="w-5 h-5 text-[#2D4F4A] border-[#8DBTA4]/30 rounded focus:ring-[#2D4F4A] mt-1"
                  />
                  <div>
                    <span className={`text-[#2D4F4A] font-medium ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'मैं सहमत हूं *' : 'I agree *'}
                    </span>
                    <p className={`text-[#2D4F4A]/70 mt-1 ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi 
                        ? 'मैं समझता/समझती हूं कि मेरी सभी जानकारी गोपनीय रखी जाएगी और केवल चिकित्सा सहायता के लिए उपयोग की जाएगी। मैं स्वास्थ्य परामर्श प्राप्त करने के लिए सहमत हूं।'
                        : 'I understand that all my information will be kept confidential and used only for medical assistance. I consent to receive health consultations.'
                      }
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className={`px-8 py-4 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-2xl font-semibold hover:bg-[#8DBTA4]/30 transition-colors ${isHindi ? 'text-sm' : ''}`}
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className={`px-8 py-4 bg-[#2D4F4A] text-white rounded-2xl font-semibold hover:bg-[#0A0F0D] transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2 ${isHindi ? 'text-sm' : ''}`}
                >
                  <Save className="w-5 h-5" />
                  <span>{isHindi ? 'पंजीकरण करें' : 'Register'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Customer Management Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className={`text-2xl font-bold text-[#0A0F0D] mb-2 ${isHindi ? 'text-xl font-medium' : ''}`}>
                  {isHindi ? 'स्वास्थ्य ग्राहक विवरण' : 'Health Customer Details'}
                </h2>
                <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                  {isHindi ? 'अपने स्वास्थ्य ग्राहकों को प्रबंधित करें (पूर्ण गोपनीयता के साथ)' : 'Manage your health customers (with complete confidentiality)'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex items-center space-x-2 px-6 py-3 bg-[#2D4F4A] text-white rounded-xl hover:bg-[#0A0F0D] transition-colors shadow-lg hover:shadow-xl ${isHindi ? 'text-sm' : ''}`}
              >
                <Plus className="w-5 h-5" />
                <span>{isHindi ? 'नया पंजीकरण' : 'New Registration'}</span>
              </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2D4F4A]/50" />
                  <input
                    type="text"
                    placeholder={isHindi ? 'ग्राहक खोजें...' : 'Search customers...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className={`px-4 py-3 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}
                >
                  <option value="All">{isHindi ? 'सभी' : 'All'}</option>
                  <option value="New">{isHindi ? 'नया' : 'New'}</option>
                  <option value="Active">{isHindi ? 'सक्रिय' : 'Active'}</option>
                  <option value="Follow-up Required">{isHindi ? 'फॉलो-अप आवश्यक' : 'Follow-up Required'}</option>
                  <option value="Resolved">{isHindi ? 'हल हो गया' : 'Resolved'}</option>
                </select>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-8 h-8 text-[#2D4F4A]" />
                  <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
                    {isHindi ? 'कुल ग्राहक' : 'Total Customers'}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-[#2D4F4A]">{customers.length}</p>
              </div>

              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="w-8 h-8 text-[#2D4F4A]" />
                  <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
                    {isHindi ? 'सक्रिय मामले' : 'Active Cases'}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-[#2D4F4A]">
                  {customers.filter(c => c.status === 'Active').length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-8 h-8 text-[#2D4F4A]" />
                  <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
                    {isHindi ? 'फॉलो-अप आवश्यक' : 'Follow-up Required'}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-[#2D4F4A]">
                  {customers.filter(c => c.status === 'Follow-up Required').length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="w-8 h-8 text-[#2D4F4A]" />
                  <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>
                    {isHindi ? 'संतुष्टि दर' : 'Satisfaction Rate'}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-[#2D4F4A]">4.8/5</p>
              </div>
            </div>

            {/* Customer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#8DBTA4]/20 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#2D4F4A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {customer.id.slice(-2)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-[#0A0F0D] ${isHindi ? 'text-sm' : 'text-base'}`}>{customer.id}</h3>
                        <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(customer.urgencyLevel)}`}>
                        {customer.urgencyLevel}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : 'text-sm'}`}>
                        {isHindi ? 'उम्र:' : 'Age:'}
                      </span>
                      <span className={`font-semibold text-[#2D4F4A] ${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.age}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : 'text-sm'}`}>
                        {isHindi ? 'भाषा:' : 'Language:'}
                      </span>
                      <span className={`font-semibold text-[#2D4F4A] ${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.preferredLanguage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : 'text-sm'}`}>
                        {isHindi ? 'परामर्श:' : 'Consultation:'}
                      </span>
                      <span className={`font-semibold text-[#2D4F4A] ${isHindi ? 'text-xs' : 'text-sm'}`}>{customer.consultationType}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className={`text-[#2D4F4A]/70 mb-2 ${isHindi ? 'text-xs' : 'text-sm'}`}>
                      {isHindi ? 'स्वास्थ्य चिंताएं:' : 'Health Concerns:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {customer.healthConcerns.slice(0, 2).map((concern, index) => (
                        <span key={index} className={`px-2 py-1 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-lg text-xs ${isHindi ? 'text-xs' : ''}`}>
                          {concern}
                        </span>
                      ))}
                      {customer.healthConcerns.length > 2 && (
                        <span className={`px-2 py-1 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-lg text-xs ${isHindi ? 'text-xs' : ''}`}>
                          +{customer.healthConcerns.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className={`flex items-center space-x-2 px-4 py-2 bg-[#2D4F4A] text-white rounded-lg hover:bg-[#0A0F0D] transition-colors ${isHindi ? 'text-sm' : ''}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>{isHindi ? 'विवरण देखें' : 'View Details'}</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4 text-[#2D4F4A]" />
                      </button>
                      <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-[#2D4F4A]" />
                      </button>
                      <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-[#2D4F4A]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-[#2D4F4A]/50 mx-auto mb-4" />
                <h3 className={`text-xl font-bold text-[#2D4F4A] mb-2 ${isHindi ? 'text-lg font-medium' : ''}`}>
                  {isHindi ? 'कोई ग्राहक नहीं मिला' : 'No customers found'}
                </h3>
                <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                  {isHindi ? 'अपनी खोज या फ़िल्टर बदलने का प्रयास करें' : 'Try adjusting your search or filters'}
                </p>
              </div>
            )}

            {/* Customer Detail Modal */}
            {selectedCustomer && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-[#2D4F4A] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {selectedCustomer.id.slice(-2)}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>{selectedCustomer.id}</h2>
                        <p className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>
                          {isHindi ? 'पंजीकृत:' : 'Registered:'} {new Date(selectedCustomer.registrationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCustomer(null)}
                      className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-[#2D4F4A]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#8DBTA4]/10 p-4 rounded-xl border border-[#8DBTA4]/30">
                      <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-base font-medium' : ''}`}>
                        {isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>{isHindi ? 'उम्र:' : 'Age:'}</span>
                          <span className={`text-[#2D4F4A] font-semibold ${isHindi ? 'text-sm' : ''}`}>{selectedCustomer.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>{isHindi ? 'स्थान:' : 'Location:'}</span>
                          <span className={`text-[#2D4F4A] font-semibold ${isHindi ? 'text-sm' : ''}`}>{selectedCustomer.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-[#2D4F4A]/70 ${isHindi ? 'text-sm' : ''}`}>{isHindi ? 'भाषा:' : 'Language:'}</span>
                          <span className={`text-[#2D4F4A] font-semibold ${isHindi ? 'text-sm' : ''}`}>{selectedCustomer.preferredLanguage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#8DBTA4]/10 p-4 rounded-xl border border-[#8DBTA4]/30">
                      <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-base font-medium' : ''}`}>
                        {isHindi ? 'स्वास्थ्य चिंताएं' : 'Health Concerns'}
                      </h3>
                      <div className="space-y-2">
                        {selectedCustomer.healthConcerns.map((concern, index) => (
                          <div key={index} className="flex items-center space-x-3 bg-[#8DBTA4]/10 p-2 rounded-lg">
                            <Heart className="w-4 h-4 text-[#2D4F4A]" />
                            <span className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{concern}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#8DBTA4]/5 p-6 rounded-xl border border-[#8DBTA4]/20">
                    <h3 className={`text-lg font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-base font-medium' : ''}`}>
                      {isHindi ? 'चिकित्सा जानकारी' : 'Medical Information'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`text-[#2D4F4A]/70 font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                          {isHindi ? 'चिकित्सा इतिहास:' : 'Medical History:'}
                        </p>
                        <p className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{selectedCustomer.medicalHistory || 'None'}</p>
                      </div>
                      <div>
                        <p className={`text-[#2D4F4A]/70 font-medium mb-2 ${isHindi ? 'text-sm' : ''}`}>
                          {isHindi ? 'वर्तमान दवाएं:' : 'Current Medications:'}
                        </p>
                        <p className={`text-[#2D4F4A] ${isHindi ? 'text-sm' : ''}`}>{selectedCustomer.currentMedications || 'None'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => setSelectedCustomer(null)}
                      className={`px-6 py-3 bg-[#8DBTA4]/20 text-[#2D4F4A] rounded-xl hover:bg-[#8DBTA4]/30 transition-colors ${isHindi ? 'text-sm' : ''}`}
                    >
                      {isHindi ? 'बंद करें' : 'Close'}
                    </button>
                    <button className={`px-6 py-3 bg-[#2D4F4A] text-white rounded-xl hover:bg-[#0A0F0D] transition-colors ${isHindi ? 'text-sm' : ''}`}>
                      {isHindi ? 'परामर्श शुरू करें' : 'Start Consultation'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'support' && (
          <>
            {/* Privacy Notice */}
            <div className="bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-3xl p-8 mb-8 shadow-lg backdrop-blur-sm">
              <div className="flex items-start space-x-6">
                <div className="bg-[#2D4F4A] p-4 rounded-2xl shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold text-[#0A0F0D] mb-4 ${isHindi ? 'text-xl font-medium' : ''}`}>{t('health.privacyTitle')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3 bg-gradient-to-br from-[#F5F3EC]/80 to-[#D2CDB9]/60 p-4 rounded-xl shadow-md border border-[#8DBTA4]/20">
                      <Trash2 className="w-6 h-6 text-[#2D4F4A]" />
                      <div>
                        <p className={`font-semibold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>{t('health.autoDelete')}</p>
                        <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>{t('health.autoDeleteDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gradient-to-br from-[#F5F3EC]/80 to-[#D2CDB9]/60 p-4 rounded-xl shadow-md border border-[#8DBTA4]/20">
                      <Shield className="w-6 h-6 text-[#2D4F4A]" />
                      <div>
                        <p className={`font-semibold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>{t('health.encrypted')}</p>
                        <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>{t('health.encryptedDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gradient-to-br from-[#F5F3EC]/80 to-[#D2CDB9]/60 p-4 rounded-xl shadow-md border border-[#8DBTA4]/20">
                      <User className="w-6 h-6 text-[#2D4F4A]" />
                      <div>
                        <p className={`font-semibold text-[#0A0F0D] ${isHindi ? 'text-sm' : ''}`}>{t('health.femaleAgents')}</p>
                        <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>{t('health.femaleAgentsDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* AI Bot Support */}
              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group hover:scale-105 border border-[#8DBTA4]/20">
                <div className="text-center mb-8">
                  <div className="bg-[#2D4F4A] p-6 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-[#0A0F0D] mb-3 ${isHindi ? 'text-xl font-medium' : ''}`}>{t('health.aiSupportTitle')}</h3>
                  <p className={`text-[#2D4F4A]/70 leading-relaxed ${isHindi ? 'text-sm' : ''}`}>{t('health.aiSupportDesc')}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    isHindi ? '24/7 तत्काल प्रतिक्रिया उपलब्ध' : 'Immediate response available 24/7',
                    isHindi ? 'सहानुभूतिपूर्ण और समझदार AI' : 'Empathetic and understanding AI',
                    isHindi ? 'विशेषज्ञों से जोड़ सकता है' : 'Can connect you to specialists',
                    isHindi ? 'हिंदी और अंग्रेजी समर्थन' : 'Supports Hindi & English'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-[#2D4F4A] group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                      <div className="w-2 h-2 bg-[#2D4F4A] rounded-full animate-pulse"></div>
                      <span className={`font-medium ${isHindi ? 'text-sm' : ''}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startBotChat}
                  className={`w-full bg-[#2D4F4A] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#0A0F0D] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 ${isHindi ? 'text-base' : ''}`}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{t('health.startPrivateChat')}</span>
                </button>
              </div>

              {/* Human Agent Support */}
              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group hover:scale-105 border border-[#8DBTA4]/20">
                <div className="text-center mb-8">
                  <div className="bg-[#0A0F0D] p-6 rounded-2xl w-fit mx-auto mb-6 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-[#0A0F0D] mb-3 ${isHindi ? 'text-xl font-medium' : ''}`}>{t('health.doctorTitle')}</h3>
                  <p className={`text-[#2D4F4A]/70 leading-relaxed ${isHindi ? 'text-sm' : ''}`}>{t('health.doctorDesc')}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    isHindi ? 'प्रमाणित महिला स्वास्थ्य सलाहकार' : 'Certified female health advisors',
                    isHindi ? 'पेशेवर चिकित्सा मार्गदर्शन' : 'Professional medical guidance',
                    isHindi ? 'डॉक्टर परामर्श की व्यवस्था कर सकते हैं' : 'Can arrange doctor consultations',
                    isHindi ? 'महिलाओं के स्वास्थ्य में विशेषज्ञ' : 'Specialized in women\'s health'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-[#2D4F4A] group-hover:translate-x-2 transition-transform duration-300" style={{transitionDelay: `${index * 100}ms`}}>
                      <div className="w-2 h-2 bg-[#2D4F4A] rounded-full animate-pulse"></div>
                      <span className={`font-medium ${isHindi ? 'text-sm' : ''}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={connectToAgent}
                  className={`w-full bg-[#0A0F0D] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#2D4F4A] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 ${isHindi ? 'text-base' : ''}`}
                >
                  <User className="w-6 h-6" />
                  <span>{t('health.connectDoctor')}</span>
                </button>
              </div>
            </div>

            {/* Health Topics */}
            <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-[#8DBTA4]/20">
              <h2 className={`text-3xl font-bold text-[#0A0F0D] mb-8 text-center ${isHindi ? 'text-2xl font-medium' : ''}`}>{t('health.healthTopics')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 bg-[#8DBTA4]/5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-[#8DBTA4]/20"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2D4F4A] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                      <topic.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-bold text-[#0A0F0D] mb-2 text-lg ${isHindi ? 'text-base font-medium' : ''}`}>{topic.title}</h3>
                    <p className={`text-sm text-[#2D4F4A]/70 leading-relaxed ${isHindi ? 'text-xs' : ''}`}>{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#8DBTA4]/20">
              <h2 className={`text-3xl font-bold text-[#0A0F0D] mb-8 text-center ${isHindi ? 'text-2xl font-medium' : ''}`}>{t('health.testimonials')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-[#8DBTA4]/5 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-[#8DBTA4]/20">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#8DBTA4] fill-current" />
                      ))}
                    </div>
                    <p className={`text-[#2D4F4A] mb-4 italic leading-relaxed ${isHindi ? 'text-sm' : ''}`}>"{testimonial.text}"</p>
                    <p className={`font-semibold text-[#2D4F4A] text-center ${isHindi ? 'text-sm' : ''}`}>- {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HealthSupport;