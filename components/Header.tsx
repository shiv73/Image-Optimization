
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              <span className="text-2xl font-bold text-gray-800">Image Optimizer Pro</span>
            </a>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors duration-300">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors duration-300">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors duration-300">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
