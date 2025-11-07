
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold">Image Optimizer Pro</p>
          <p className="mt-2 text-gray-400">
            The simplest way to make your images web-friendly.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
          </div>
          <p className="mt-8 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Image Optimizer Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
