'use client';

import { useState } from 'react';
// Uncomment when you have real images
// import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'María González',
      role: 'Directora de Marketing, 38 años',
      image: '/images/maria-testimonial.jpg',
      problem: 'Estrés laboral severo',
      intervention: 'Plan de 8 sesiones con técnicas de respiración consciente y establecimiento de límites',
      result: 'Reducción de 70% en niveles de ansiedad y mejora significativa del sueño en 6 semanas',
      rating: 5,
      quote: 'Recuperé el control de mi vida. Ahora puedo gestionar mi trabajo sin que afecte mi salud.',
      metrics: '70% menos ansiedad',
    },
    {
      name: 'Carlos Ramírez',
      role: 'Ingeniero de Software, 32 años',
      image: '/images/carlos-testimonial.jpg',
      problem: 'Síndrome del impostor y falta de claridad profesional',
      intervention: '10 sesiones enfocadas en autoestima, valores y reestructuración cognitiva',
      result: 'Aumento de confianza, aceptó promoción y mejoró relaciones en equipo en 8 semanas',
      rating: 5,
      quote: 'Finalmente entiendo mi valor y tomo decisiones alineadas con mis objetivos.',
      metrics: 'Promoción lograda',
    },
    {
      name: 'Laura Martínez',
      role: 'Emprendedora, 41 años',
      image: '/images/laura-testimonial.jpg',
      problem: 'Burnout y dificultad para delegar',
      intervention: '12 sesiones con mindfulness, gestión del tiempo y liderazgo emocional',
      result: 'Delegó 60% de tareas, recuperó energía y aumentó facturación 40% en 3 meses',
      rating: 5,
      quote: 'Aprendí a liderar mi equipo y mi vida con equilibrio. Mi negocio creció cuando solté el control.',
      metrics: '+40% facturación',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonios" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Casos de Éxito</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Resultados reales de personas como tú
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Historias verificadas de transformación y crecimiento personal
          </p>
        </div>

        {/* Featured testimonial - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="testimonial bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary-400 to-secondary-600">
                {/* Placeholder - Replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Uncomment when you have real images */}
                {/* <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                /> */}

                {/* Metrics badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="text-primary-700 font-bold text-sm">{testimonial.metrics}</span>
                </div>
              </div>

              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Name and role */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{testimonial.role}</p>

                {/* Quote */}
                <blockquote className="mb-4">
                  <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>

                {/* Case details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 font-semibold text-xs mr-2 flex-shrink-0">P</span>
                    <p className="text-gray-700"><span className="font-semibold">Problema:</span> {testimonial.problem}</p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs mr-2 flex-shrink-0">I</span>
                    <p className="text-gray-700"><span className="font-semibold">Intervención:</span> {testimonial.intervention}</p>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-semibold text-xs mr-2 flex-shrink-0">R</span>
                    <p className="text-gray-700"><span className="font-semibold">Resultado:</span> {testimonial.result}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile view - Carousel */}
        <div className="md:hidden mb-12">
          <article className="testimonial bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image */}
            <div className="relative h-64 bg-gradient-to-br from-primary-400 to-secondary-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Metrics badge */}
              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                <span className="text-primary-700 font-bold text-sm">{testimonials[currentIndex].metrics}</span>
              </div>
            </div>

            <div className="p-6">
              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-gray-600 mb-4">{testimonials[currentIndex].role}</p>

              <blockquote className="mb-4">
                <p className="text-gray-700 italic">&ldquo;{testimonials[currentIndex].quote}&rdquo;</p>
              </blockquote>

              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 font-semibold text-xs mr-2 flex-shrink-0">P</span>
                  <p className="text-gray-700"><span className="font-semibold">Problema:</span> {testimonials[currentIndex].problem}</p>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs mr-2 flex-shrink-0">I</span>
                  <p className="text-gray-700"><span className="font-semibold">Intervención:</span> {testimonials[currentIndex].intervention}</p>
                </div>
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-semibold text-xs mr-2 flex-shrink-0">R</span>
                  <p className="text-gray-700"><span className="font-semibold">Resultado:</span> {testimonials[currentIndex].result}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-primary-600 hover:text-primary-700"
            aria-label="Testimonio anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-primary-600 hover:text-primary-700"
            aria-label="Siguiente testimonio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
