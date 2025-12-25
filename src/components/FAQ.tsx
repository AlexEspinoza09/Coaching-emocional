'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Qué es el coaching emocional?',
      answer: 'El coaching emocional es un proceso de acompañamiento personalizado que te ayuda a identificar, comprender y gestionar tus emociones de manera efectiva. A través de técnicas específicas, trabajamos juntos para mejorar tu bienestar emocional, desarrollar habilidades de inteligencia emocional y alcanzar tus objetivos personales.',
    },
    {
      question: '¿Cuánto dura una sesión de coaching?',
      answer: 'Cada sesión tiene una duración de 60 minutos. Este tiempo es ideal para trabajar en profundidad los temas que te preocupan mientras mantenemos la sesión dinámica y productiva. Las sesiones se programan según tu disponibilidad, generalmente con una frecuencia semanal o quincenal.',
    },
    {
      question: '¿Cuántas sesiones necesito?',
      answer: 'El número de sesiones varía según tus objetivos y necesidades personales. Algunos clientes ven resultados significativos en 6-8 sesiones, mientras que otros prefieren un acompañamiento más prolongado. Durante la primera sesión, evaluaremos juntos tu situación y diseñaremos un plan personalizado.',
    },
    {
      question: '¿Cómo se realizan las sesiones?',
      answer: 'Las sesiones se realizan 100% online a través de videollamada, lo que te permite conectarte desde cualquier lugar con conexión a internet. Esta modalidad ofrece flexibilidad, comodidad y los mismos resultados efectivos que las sesiones presenciales.',
    },
    {
      question: '¿Cuál es la diferencia entre coaching y terapia psicológica?',
      answer: 'El coaching se enfoca en el presente y el futuro, ayudándote a alcanzar metas específicas y desarrollar habilidades. La terapia psicológica se centra más en sanar traumas pasados y tratar trastornos mentales. El coaching emocional es ideal si buscas mejorar tu bienestar, gestionar emociones y lograr objetivos concretos.',
    },
    {
      question: '¿Es confidencial la información que comparto?',
      answer: 'Absolutamente sí. Toda la información compartida durante las sesiones es completamente confidencial. Como coach profesional, estoy comprometido con los más altos estándares éticos y tu privacidad es una prioridad fundamental.',
    },
    {
      question: '¿Qué pasa si necesito cancelar o reprogramar una sesión?',
      answer: 'Entiendo que pueden surgir imprevistos. Puedes cancelar o reprogramar tu sesión con al menos 24 horas de anticipación sin cargo adicional. Si la cancelación es con menos tiempo, podría aplicar un cargo, excepto en emergencias justificadas.',
    },
    {
      question: '¿Ofrecen alguna garantía?',
      answer: 'Si bien cada persona es única y los resultados pueden variar, estoy comprometido con tu progreso. Si después de la primera sesión sientes que el coaching no es para ti, te reembolsaré el 100% del pago. Mi objetivo es que cada sesión sea valiosa y transformadora para ti.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Resuelve tus dudas
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Encuentra respuestas a las preguntas más comunes sobre el coaching emocional
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 80}
            >
              <div
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors duration-200"
              >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={700}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">¿No encuentras la respuesta que buscas?</p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
            >
              Contáctame directamente
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
