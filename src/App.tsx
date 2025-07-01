import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SalesDashboard from './components/SalesDashboard';
import HealthSupport from './components/HealthSupport';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'sales' | 'health'>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-[#2D4F4A] p-6 rounded-3xl shadow-2xl mb-8 animate-pulse">
            <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg animate-bounce"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#0A0F0D] mb-4">
            SheEmpowers
          </h1>
          <p className="text-[#2D4F4A] text-lg font-medium">Loading your empowerment platform...</p>
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-[#2D4F4A] rounded-full animate-bounce"
                style={{animationDelay: `${i * 0.2}s`}}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3EC] via-[#D2CDB9] to-[#92A378]">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="relative">
          {activeSection === 'home' && (
            <div className="animate-fadeIn">
              <Hero setActiveSection={setActiveSection} />
            </div>
          )}
          
          {activeSection === 'sales' && (
            <div className="animate-slideInRight">
              <SalesDashboard />
            </div>
          )}
          
          {activeSection === 'health' && (
            <div className="animate-slideInLeft">
              <HealthSupport />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;