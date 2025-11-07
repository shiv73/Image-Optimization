
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageProcessor from './components/ImageProcessor';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { UserPlan } from './types';

const App: React.FC = () => {
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [imageCount, setImageCount] = useState<number>(0);
  
  const handlePlanChange = (plan: UserPlan) => {
    setUserPlan(plan);
    // Reset image count when plan changes, except for free plan continuation
    if (plan !== 'free') {
      setImageCount(0);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <Header />
      <main>
        <Hero />
        <ImageProcessor 
          userPlan={userPlan} 
          imageCount={imageCount} 
          setImageCount={setImageCount} 
        />
        <Pricing onPlanSelect={handlePlanChange} currentPlan={userPlan} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
