import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, IndianRupee, Users, Calendar, BarChart3, Mic, Phone, Target, Award, Zap, ArrowUp, ArrowDown, Eye, MessageSquare, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CustomerDetails from './CustomerDetails';
import Particles from './Particles';

const SalesDashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('vegetables');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'products' | 'analytics'>('overview');
  const [animatedValues, setAnimatedValues] = useState({
    totalSales: 0,
    productsSold: 0,
    customers: 0,
    growth: 0
  });
  const { t, isHindi } = useLanguage();

  const products = [
    { 
      id: 'vegetables', 
      name: isHindi ? 'ताज़ी सब्जियां' : 'Fresh Vegetables', 
      sales: 'Rs 15,000', 
      growth: '+12%', 
      trend: 'up',
      volume: 245,
      profit: 'Rs 3,200'
    },
    { 
      id: 'crafts', 
      name: isHindi ? 'हस्तशिल्प' : 'Handicrafts', 
      sales: 'Rs 8,500', 
      growth: '+18%', 
      trend: 'up',
      volume: 89,
      profit: 'Rs 2,100'
    },
    { 
      id: 'textiles', 
      name: isHindi ? 'घरेलू वस्त्र' : 'Home Textiles', 
      sales: 'Rs 12,200', 
      growth: '+8%', 
      trend: 'up',
      volume: 156,
      profit: 'Rs 2,800'
    },
    { 
      id: 'spices', 
      name: isHindi ? 'मसाले और जड़ी-बूटियां' : 'Spices & Herbs', 
      sales: 'Rs 6,800', 
      growth: '+22%', 
      trend: 'up',
      volume: 78,
      profit: 'Rs 1,900'
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 8000, season: t('common.low'), customers: 45, orders: 120 },
    { month: 'Feb', sales: 12000, season: t('common.medium'), customers: 68, orders: 180 },
    { month: 'Mar', sales: 15000, season: t('common.high'), customers: 89, orders: 220 },
    { month: 'Apr', sales: 18000, season: t('common.peak'), customers: 112, orders: 280 },
    { month: 'May', sales: 22000, season: t('common.peak'), customers: 134, orders: 320 },
    { month: 'Jun', sales: 16000, season: t('common.medium'), customers: 98, orders: 240 }
  ];

  const recommendations = [
    {
      type: 'urgent',
      icon: Zap,
      title: isHindi ? 'पीक सीज़न अलर्ट' : 'Peak Season Alert',
      description: isHindi ? 'अगले 2 सप्ताह में सब्जियों की मांग चरम पर होगी। अभी टमाटर और प्याज का स्टॉक करें!' : 'Vegetable demand peaks in next 2 weeks. Stock up tomatoes & onions now!',
      action: isHindi ? 'सप्लायर देखें' : 'View Suppliers'
    },
    {
      type: 'pricing',
      icon: TrendingUp,
      title: isHindi ? 'मूल्य अनुकूलन' : 'Price Optimization',
      description: isHindi ? 'टमाटर की कीमत 8% बढ़ाएं - बाजार की मांग सामान्य से 40% अधिक है।' : 'Increase tomato prices by 8% - market demand is 40% above normal.',
      action: isHindi ? 'कीमत अपडेट करें' : 'Update Prices'
    },
    {
      type: 'opportunity',
      icon: Target,
      title: isHindi ? 'B2B अवसर' : 'B2B Opportunity',
      description: isHindi ? 'आपके पास 3 रेस्टोरेंट ताज़ी सब्जियां चाहते हैं। अभी जुड़ें!' : '3 restaurants near you want fresh vegetables. Connect now!',
      action: isHindi ? 'अभी जुड़ें' : 'Connect Now'
    },
    {
      type: 'insight',
      icon: Award,
      title: isHindi ? 'टॉप परफॉर्मर' : 'Top Performer',
      description: isHindi ? 'आपके हस्तशिल्प स्थानीय क्षेत्र में #1 हैं। विविधता बढ़ाने पर विचार करें।' : 'Your handicrafts are #1 in local area. Consider expanding variety.',
      action: isHindi ? 'विकल्प देखें' : 'Explore Options'
    }
  ];

  useEffect(() => {
    // Animate counter values
    const targets = { totalSales: 42500, productsSold: 324, customers: 156, growth: 15 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedValues({
        totalSales: Math.floor(targets.totalSales * progress),
        productsSold: Math.floor(targets.productsSold * progress),
        customers: Math.floor(targets.customers * progress),
        growth: Math.floor(targets.growth * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const toggleVoiceHelp = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setTimeout(() => setIsVoiceActive(false), 5000);
    }
  };

  const tabs = [
    { id: 'overview', label: isHindi ? 'अवलोकन' : 'Overview', icon: BarChart3 },
    { id: 'customers', label: isHindi ? 'ग्राहक' : 'Customers', icon: UserCheck },
    { id: 'products', label: isHindi ? 'उत्पाद' : 'Products', icon: Package },
    { id: 'analytics', label: isHindi ? 'एनालिटिक्स' : 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378]">
        <Particles
          particleColors={['#F5F3EC', '#D2CDB9', '#92A378', '#2D4F4A']}
          particleCount={80}
          particleSpread={20}
          speed={0.02}
          particleBaseSize={40}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          particleHoverFactor={0.2}
        />
      </div>

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-[#8DBTA4]/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#2D4F4A] p-3 rounded-2xl shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold text-[#0A0F0D] ${isHindi ? 'text-2xl font-medium' : ''}`}>{t('sales.title')}</h1>
                  <p className={`text-[#2D4F4A]/70 font-medium ${isHindi ? 'text-sm' : ''}`}>{t('sales.subtitle')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className={`px-4 py-2 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent font-medium text-[#0A0F0D] backdrop-blur-sm ${isHindi ? 'text-sm' : ''}`}
                >
                  <option value="week">{t('common.thisWeek')}</option>
                  <option value="month">{t('common.thisMonth')}</option>
                  <option value="quarter">{t('common.thisQuarter')}</option>
                </select>
                
                <div className="flex items-center space-x-2 bg-[#8DBTA4]/20 text-[#2D4F4A] px-3 py-2 rounded-lg border border-[#8DBTA4]/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[#8DBTA4] rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${isHindi ? 'text-xs' : ''}`}>{t('common.liveData')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleVoiceHelp}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm ${
                  isVoiceActive 
                    ? 'bg-[#0A0F0D] text-white animate-pulse scale-105' 
                    : 'bg-[#2D4F4A] text-white hover:bg-[#0A0F0D] hover:scale-105'
                } ${isHindi ? 'text-sm' : ''}`}
              >
                <Mic className={`w-5 h-5 ${isVoiceActive ? 'animate-bounce' : ''}`} />
                <span>{isVoiceActive ? t('sales.listening') : t('sales.voiceHelp')}</span>
                {isVoiceActive && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
                    <div className="w-1 h-6 bg-white rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                )}
              </button>
              
              <button className={`flex items-center space-x-2 px-6 py-3 bg-[#0A0F0D] text-white rounded-2xl hover:bg-[#2D4F4A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm ${isHindi ? 'text-sm' : ''}`}>
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{t('sales.callExpert')}</span>
              </button>
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

        {/* Voice Assistant Active */}
        {isVoiceActive && (
          <div className="bg-[#2D4F4A] text-white rounded-3xl p-8 mb-8 animate-slideInDown shadow-xl border border-[#8DBTA4]/30 backdrop-blur-sm">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Mic className="w-8 h-8 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold mb-2 ${isHindi ? 'text-xl font-medium' : ''}`}>{t('sales.voiceActive')}</h3>
                <p className={`text-white/90 text-lg ${isHindi ? 'text-base' : ''}`}>
                  {t('sales.voiceDesc')}
                </p>
                <p className={`text-white/70 mt-2 ${isHindi ? 'text-sm' : ''}`}>
                  {t('sales.voiceTry')}
                </p>
              </div>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-3 bg-white/60 rounded animate-bounce"
                    style={{
                      height: `${20 + Math.random() * 30}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'customers' ? (
          <CustomerDetails />
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: t('sales.totalSales'),
                  value: `₹${animatedValues.totalSales.toLocaleString()}`,
                  change: `+${animatedValues.growth}% this month`,
                  icon: IndianRupee,
                  trend: 'up'
                },
                {
                  title: t('sales.productsSold'),
                  value: animatedValues.productsSold.toString(),
                  change: '+8% this week',
                  icon: Package,
                  trend: 'up'
                },
                {
                  title: t('sales.activeCustomers'),
                  value: animatedValues.customers.toString(),
                  change: '+12% this month',
                  icon: Users,
                  trend: 'up'
                },
                {
                  title: t('sales.bestSeason'),
                  value: t('common.peak'),
                  change: 'Apr-May period',
                  icon: Calendar,
                  trend: 'up'
                }
              ].map((metric, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 group border border-[#8DBTA4]/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#2D4F4A] p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                      metric.trend === 'up' ? 'bg-[#8DBTA4]/20 text-[#2D4F4A]' : 'bg-[#0A0F0D]/20 text-[#0A0F0D]'
                    }`}>
                      {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className={`text-sm font-medium ${isHindi ? 'text-xs' : ''}`}>{metric.change.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm text-[#2D4F4A]/70 mb-1 font-medium ${isHindi ? 'text-xs' : ''}`}>{metric.title}</p>
                    <p className="text-2xl font-bold text-[#0A0F0D] mb-1">{metric.value}</p>
                    <p className={`text-sm text-[#2D4F4A]/60 ${isHindi ? 'text-xs' : ''}`}>{metric.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Products Performance */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#8DBTA4]/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#2D4F4A] p-2 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>{t('sales.productPerformance')}</h2>
                  </div>
                  <select 
                    className={`px-4 py-2 bg-[#8DBTA4]/10 border border-[#8DBTA4]/30 rounded-xl focus:ring-2 focus:ring-[#2D4F4A] focus:border-transparent font-medium text-[#0A0F0D] backdrop-blur-sm ${isHindi ? 'text-sm' : ''}`}
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  {products.map((product, index) => (
                    <div 
                      key={product.id}
                      className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer border-2 hover:scale-102 ${
                        selectedProduct === product.id 
                          ? 'bg-[#8DBTA4]/10 border-[#8DBTA4]/30 shadow-lg' 
                          : 'bg-[#8DBTA4]/5 border-[#8DBTA4]/20 hover:bg-[#F5F3EC]/60 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedProduct(product.id)}
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 rounded-full bg-[#2D4F4A] shadow-lg"></div>
                          <div>
                            <h3 className={`font-bold text-[#0A0F0D] text-lg ${isHindi ? 'text-base font-medium' : ''}`}>{product.name}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                                {isHindi ? 'बिक्री:' : 'Sales:'} <span className="font-semibold">{product.sales}</span>
                              </p>
                              <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                                {isHindi ? 'मात्रा:' : 'Volume:'} <span className="font-semibold">{product.volume}</span>
                              </p>
                              <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                                {isHindi ? 'मुनाफा:' : 'Profit:'} <span className="font-semibold text-[#8DBTA4]">{product.profit}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="px-4 py-2 rounded-xl text-sm font-bold bg-[#8DBTA4]/20 text-[#2D4F4A] flex items-center space-x-1">
                            <ArrowUp className="w-4 h-4" />
                            <span>{product.growth}</span>
                          </div>
                          <button className="p-2 hover:bg-[#8DBTA4]/20 rounded-lg transition-colors">
                            <Eye className="w-5 h-5 text-[#2D4F4A]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations */}
              <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#8DBTA4]/20">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-[#2D4F4A] p-2 rounded-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>{t('sales.smartRecommendations')}</h2>
                </div>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className="group bg-[#8DBTA4]/5 rounded-2xl p-5 hover:bg-[#F5F3EC]/60 hover:shadow-lg transition-all duration-300 hover:scale-102 border border-[#8DBTA4]/20"
                      style={{animationDelay: `${index * 150}ms`}}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-[#2D4F4A] p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <rec.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-[#0A0F0D] mb-2 ${isHindi ? 'text-sm font-medium' : ''}`}>{rec.title}</h4>
                          <p className={`text-sm text-[#2D4F4A]/70 mb-3 leading-relaxed ${isHindi ? 'text-xs' : ''}`}>{rec.description}</p>
                          <button className={`text-sm font-semibold text-[#2D4F4A] hover:text-[#0A0F0D] hover:scale-105 transition-transform duration-200 ${isHindi ? 'text-xs' : ''}`}>
                            {rec.action} →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className={`w-full mt-6 bg-[#2D4F4A] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#0A0F0D] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${isHindi ? 'text-base' : ''}`}>
                  <MessageSquare className="w-5 h-5" />
                  <span>{t('sales.getMoreInsights')}</span>
                </button>
              </div>
            </div>

            {/* Enhanced Sales Chart */}
            <div className="bg-gradient-to-br from-[#F5F3EC]/80 via-[#D2CDB9]/60 to-[#92A378]/40 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[#8DBTA4]/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#2D4F4A] p-2 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold text-[#0A0F0D] ${isHindi ? 'text-xl font-medium' : ''}`}>{t('sales.salesTrends')}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-[#2D4F4A] rounded"></div>
                    <span className={`text-[#2D4F4A] ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'बिक्री' : 'Sales'}
                    </span>
                    <div className="w-3 h-3 bg-[#0A0F0D] rounded ml-4"></div>
                    <span className={`text-[#0A0F0D] ${isHindi ? 'text-xs' : ''}`}>
                      {isHindi ? 'ग्राहक' : 'Customers'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-6 h-80">
                {salesData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center group">
                    <div className="flex-1 flex items-end mb-4 space-x-2">
                      {/* Sales Bar */}
                      <div className="relative">
                        <div 
                          className={`w-8 bg-[#2D4F4A] rounded-t-xl transition-all duration-1000 ease-out shadow-lg group-hover:shadow-xl ${
                            data.season === t('common.peak') ? 'shadow-2xl ring-2 ring-[#8DBTA4]/50' : ''
                          }`}
                          style={{ 
                            height: `${(data.sales / 25000) * 100}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0A0F0D] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{data.sales.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Customers Bar */}
                      <div className="relative">
                        <div 
                          className="w-6 bg-[#0A0F0D] rounded-t-lg transition-all duration-1000 ease-out"
                          style={{ 
                            height: `${(data.customers / 150) * 100}%`,
                            animationDelay: `${index * 200 + 100}ms`
                          }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0A0F0D] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.customers} {isHindi ? 'ग्राहक' : 'customers'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className={`text-sm font-bold text-[#0A0F0D] mb-1 ${isHindi ? 'text-xs' : ''}`}>{data.month}</p>
                      <p className={`text-xs text-[#2D4F4A]/70 mb-2 ${isHindi ? 'text-xs' : ''}`}>₹{data.sales.toLocaleString()}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        data.season === t('common.peak') ? 'bg-[#2D4F4A] text-white shadow-lg' :
                        data.season === t('common.high') ? 'bg-[#8DBTA4]/30 text-[#2D4F4A]' :
                        data.season === t('common.medium') ? 'bg-[#8DBTA4]/20 text-[#2D4F4A]' :
                        'bg-[#8DBTA4]/10 text-[#2D4F4A]'
                      }`}>
                        {data.season}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#8DBTA4]/10 p-4 rounded-xl border border-[#8DBTA4]/30 backdrop-blur-sm">
                  <h4 className={`font-bold text-[#2D4F4A] mb-2 ${isHindi ? 'text-sm font-medium' : ''}`}>
                    {isHindi ? 'सर्वोत्तम प्रदर्शन महीना' : 'Best Performing Month'}
                  </h4>
                  <p className="text-2xl font-bold text-[#0A0F0D]">May 2024</p>
                  <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                    ₹22,000 {isHindi ? 'बिक्री • 134 ग्राहक' : 'sales • 134 customers'}
                  </p>
                </div>
                <div className="bg-[#8DBTA4]/10 p-4 rounded-xl border border-[#8DBTA4]/30 backdrop-blur-sm">
                  <h4 className={`font-bold text-[#2D4F4A] mb-2 ${isHindi ? 'text-sm font-medium' : ''}`}>
                    {isHindi ? 'वृद्धि दर' : 'Growth Rate'}
                  </h4>
                  <p className="text-2xl font-bold text-[#0A0F0D]">+175%</p>
                  <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'पिछले साल की तुलना में' : 'Compared to last year'}
                  </p>
                </div>
                <div className="bg-[#8DBTA4]/10 p-4 rounded-xl border border-[#8DBTA4]/30 backdrop-blur-sm">
                  <h4 className={`font-bold text-[#2D4F4A] mb-2 ${isHindi ? 'text-sm font-medium' : ''}`}>
                    {isHindi ? 'अगला चरम' : 'Next Peak'}
                  </h4>
                  <p className="text-2xl font-bold text-[#0A0F0D]">Oct 2024</p>
                  <p className={`text-sm text-[#2D4F4A]/70 ${isHindi ? 'text-xs' : ''}`}>
                    {isHindi ? 'त्योहारी सीज़न की तैयारी करें' : 'Prepare for festival season'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;