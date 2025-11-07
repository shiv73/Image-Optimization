
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Optimize Your Images in Seconds
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-gray-600">
          Effortlessly compress and resize your images in bulk without compromising quality. Fast, reliable, and incredibly simple to use.
        </p>
        <div className="mt-10">
          <a
            href="#image-processor"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-hover transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started for Free
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
