
import React from 'react';
import { UserPlan } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface PricingProps {
  onPlanSelect: (plan: UserPlan) => void;
  currentPlan: UserPlan;
}

const PricingCard: React.FC<{
  plan: UserPlan;
  title: string;
  price: string;
  priceDetails: string;
  features: string[];
  isFeatured?: boolean;
  onSelect: () => void;
  isSelected: boolean;
}> = ({ plan, title, price, priceDetails, features, isFeatured = false, onSelect, isSelected }) => {
  
  const cardClasses = `border rounded-2xl p-8 flex flex-col h-full ${isFeatured ? 'border-primary-hover shadow-2xl scale-105' : 'border-gray-200 bg-white shadow-lg'}`;
  const buttonClasses = `w-full py-3 mt-auto font-semibold rounded-lg transition-all duration-300 ${
    isSelected 
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
      : isFeatured 
        ? 'bg-primary text-white hover:bg-primary-hover' 
        : 'bg-white text-primary border border-primary hover:bg-indigo-50'
  }`;

  return (
    <div className={cardClasses}>
      {isFeatured && <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">BEST VALUE</span>}
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-gray-500">{priceDetails}</p>
      <div className="mt-4">
        <span className="text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500">/month</span>
      </div>
      <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span className="ml-3">{feature}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSelect} disabled={isSelected} className={buttonClasses}>
        {isSelected ? 'Current Plan' : 'Choose Plan'}
      </button>
    </div>
  );
}

const Pricing: React.FC<PricingProps> = ({ onPlanSelect, currentPlan }) => {
  return (
    <section id="pricing" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900">Flexible Plans for Everyone</h2>
          <p className="mt-4 text-lg text-gray-600">
            Whether you're a casual user or a power user, we have a plan that fits your needs. Start for free and upgrade anytime.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          <PricingCard 
            plan="free"
            title="Free Trial"
            price="₹0"
            priceDetails="Get started for free"
            features={[
              "Up to 10 images total",
              "Standard compression",
              "Basic resize options",
              "Community support"
            ]}
            onSelect={() => onPlanSelect('free')}
            isSelected={currentPlan === 'free'}
          />
          <PricingCard 
            plan="unlimited"
            title="Unlimited"
            price="₹300"
            priceDetails="Billed as ₹3600 yearly"
            features={[
              "Unlimited images",
              "Highest quality compression",
              "All resize options",
              "Batch processing",
              "Priority support"
            ]}
            isFeatured={true}
            onSelect={() => onPlanSelect('unlimited')}
            isSelected={currentPlan === 'unlimited'}
          />
          <PricingCard 
            plan="payg"
            title="Pay As You Go"
            price="₹100"
            priceDetails="For 10 images, then ₹10/image"
            features={[
              "Pay only for what you use",
              "High quality compression",
              "Advanced resize options",
              "Email support"
            ]}
            onSelect={() => onPlanSelect('payg')}
            isSelected={currentPlan === 'payg'}
          />
        </div>
        <p className="text-center mt-8 text-gray-500">The monthly plan for 'Unlimited' is ₹500/month.</p>
      </div>
    </section>
  );
};

export default Pricing;
