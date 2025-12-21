'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="#hero" className={`text-xl md:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-primary-700' : 'text-white'
            }`}>
              Coaching Emocional
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Servicios
            </a>
            <a
              href="#paquetes"
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Paquetes
            </a>
            <a
              href="#testimonios"
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Testimonios
            </a>
            <a
              href="#faq"
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="#agendar"
            id="cta-header"
            className="btn-primary px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Sesión Gratuita
          </a>
        </div>
      </div>
    </header>
  );
}
