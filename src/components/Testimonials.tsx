'use client';

import { useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'María González',
      role: 'Empresaria',
      content: 'El coaching emocional cambió mi vida completamente. Aprendí a gestionar mi estrés laboral y ahora tengo una mejor relación con mi familia. Las sesiones fueron transformadoras.',
      rating: 5,
    },
    {
      name: 'Carlos Ramírez',
      role: 'Ingeniero',
      content: 'Después de años sintiéndome perdido, finalmente encontré claridad sobre mi propósito. Las técnicas que aprendí me ayudan día a día a tomar mejores decisiones.',
      rating: 5,
    },
    {
      name: 'Laura Martínez',
      role: 'Psicóloga',
      content: 'Como profesional de la salud mental, puedo decir que el enfoque es excepcional. Me ayudó a trabajar mis propias emociones y ser mejor profesional para mis pacientes.',
      rating: 5,
    },
    {
      name: 'Jorge Silva',
      role: 'Estudiante',
      content: 'Estaba muy ansioso por mi futuro. Las sesiones me dieron herramientas para manejar la ansiedad y aumentar mi confianza. Ahora me siento preparado para cualquier desafío.',
      rating: 5,
    },
    {
      name: 'Ana Rodríguez',
      role: 'Directora de Marketing',
      content: 'El proceso de coaching me ayudó a superar mis miedos y limitaciones. Hoy soy una líder más segura y empática. Totalmente recomendado.',
      rating: 5,
    },
    {
      name: 'Roberto Fernández',
      role: 'Emprendedor',
      content: 'Las sesiones fueron un punto de inflexión en mi vida personal y profesional. Aprendí a equilibrar mis emociones y eso se reflejó en el éxito de mi negocio.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev + testimonialsPerPage >= testimonials.length ? 0 : prev + testimonialsPerPage
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - testimonialsPerPage : prev - testimonialsPerPage
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonios</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Lo que dicen mis clientes
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Historias reales de transformación y crecimiento personal
          </p>
        </div>

        {/* Desktop view - 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(currentIndex, currentIndex + testimonialsPerPage).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view - 1 column */}
        <div className="md:hidden mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">&ldquo;{testimonials[currentIndex].content}&rdquo;</p>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4">
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
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * testimonialsPerPage)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                Math.floor(currentIndex / testimonialsPerPage) === index
                  ? 'bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a grupo de testimonios ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
