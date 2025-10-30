import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { trackActivity } from '../utils/analytics';

const About = () => {
  useEffect(() => {
    trackActivity('page_view', { pageViewed: 'about' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Header />
      
      <main className="section-container py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <span className="text-4xl">💙</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Life Centre
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your journey to healing, growth, and wholeness starts here
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
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
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 mb-8 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base sm:text-lg">
                Life Centre is a compassionate Christian ministry dedicated to providing 
                professional counselling, therapy services, support groups, and healing courses 
                to individuals, couples, and families in our community.
              </p>
              <p className="text-base sm:text-lg">
                Whether you're facing mental health challenges, relationship difficulties, grief, 
                addiction, trauma, or simply seeking personal growth and spiritual development, 
                we're here to walk alongside you with Christ-centered care and expert professional support.
              </p>
              <p className="text-base sm:text-lg">
                Our team includes qualified psychologists, psychiatrists, counsellors, therapists, 
                and life coaches who are passionate about helping people find healing, hope, and 
                transformation through faith-integrated professional care.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Services</h3>
              <p className="text-gray-600 text-sm">
                Access qualified mental health professionals, therapists, and coaches
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support Groups</h3>
              <p className="text-gray-600 text-sm">
                Join caring communities for recovery, grief, and healing journeys
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Healing Courses</h3>
              <p className="text-gray-600 text-sm">
                Participate in structured programs for growth and transformation
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We're here to support you. Explore our services, connect with our team, 
              or reach out for immediate help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Explore Services
              </Link>
              <Link to="/connect" className="bg-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Get in Touch
              </Link>
              <a href="tel:+27123456789" className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="section-container text-center text-gray-600 text-sm">
          <p>© 2025 Life Centre. All rights reserved.</p>
          <p className="mt-2">Providing Christ-centered care and professional support</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
