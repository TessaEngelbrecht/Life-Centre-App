import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Life Centre
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Your journey to healing, growth, and wholeness starts here
          </p>
          <p className="text-lg text-primary-50 leading-relaxed mb-8">
            Life Centre is a compassionate ministry offering professional counselling, therapy services, 
            support groups, and healing courses. Whether you're facing mental health challenges, 
            relationship difficulties, grief, addiction, or simply seeking personal growth, 
            we're here to walk alongside you with Christ-centered care and expert support.
          </p>
          
          <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Life Centre Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+27123456789" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 shadow-lg">
              📞 Call Helpline
            </a>
            <a href="#search" className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors duration-200 shadow-lg">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
