import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="section-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">LC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Life Centre</h1>
              <p className="text-xs text-gray-500">Care & Support</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/connect" 
              className={`nav-link ${isActive('/connect') ? 'nav-link-active' : ''}`}
            >
              Connect
            </Link>
            <a 
              href="tel:+27123456789" 
              className="nav-link hidden lg:flex items-center"
            >
            <span className="ml-1">Call Us</span>
            </a>
          </nav>

          {/* CTA Button Desktop */}
          <Link to="/connect" className="hidden md:block btn-primary text-sm">
            Get Help
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-2 animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/connect" 
              onClick={() => setMobileMenuOpen(false)}
              className={`block nav-link ${isActive('/connect') ? 'nav-link-active' : ''}`}
            >
              Connect With Us
            </Link>
            <a 
              href="tel:+27123456789" 
              className="block nav-link"
            >
              Call Helpline
            </a>
            <Link 
              to="/connect" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center btn-primary mt-4"
            >
              Get Help Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
