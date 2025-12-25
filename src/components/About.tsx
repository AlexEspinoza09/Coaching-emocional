'use client';

import Image from 'next/image';
import { useCountUp } from '@/hooks/useCountUp';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const { count: yearsCount, ref: yearsRef } = useCountUp({ end: 10, duration: 2000 });
  const { count: clientsCount, ref: clientsRef } = useCountUp({ end: 500, duration: 2500 });
  const { count: satisfactionCount, ref: satisfactionRef } = useCountUp({ end: 98, duration: 2000 });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <ScrollReveal animation="fade-right">
            <div className="relative">
              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Funciones-de-un-psicologo-clinico-y-su-formacion.png"
                  alt="Funciones de un psicólogo clínico y su formación"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-200 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary-200 rounded-full -z-10"></div>
            </div>
          </ScrollReveal>

          {/* Content Section */}
          <div>
            <ScrollReveal animation="fade-left" delay={100}>
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Sobre mí</h2>
              <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                Tu aliado en el camino hacia el bienestar emocional
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="mt-6 text-lg text-gray-600 space-y-4">
                <p>
                  Soy un coach emocional certificado con más de 10 años de experiencia ayudando a personas
                  como tú a superar obstáculos emocionales y alcanzar una vida más plena y satisfactoria.
                </p>

                <p>
                  Mi enfoque combina técnicas de coaching profesional, inteligencia emocional y psicología
                  positiva para crear un espacio seguro donde puedas explorar tus emociones, identificar
                  patrones limitantes y desarrollar estrategias efectivas de cambio.
                </p>

                <p>
                  Creo firmemente que cada persona tiene el potencial para transformar su vida, y mi misión
                  es acompañarte en ese proceso de autodescubrimiento y crecimiento personal.
                </p>
              </div>
            </ScrollReveal>

            {/* Credentials */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Certificaciones y Formación</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Certificación Internacional en Coaching Emocional (ICF)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Máster en Inteligencia Emocional</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Especialización en Psicología Positiva</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Formación en Mindfulness y Gestión del Estrés</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Stats with animated counters */}
            <ScrollReveal animation="zoom-in" delay={400}>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="text-center" ref={yearsRef}>
                  <div className="text-4xl font-bold text-primary-600">{yearsCount}+</div>
                  <div className="text-sm text-gray-600 mt-1">Años de Experiencia</div>
                </div>
                <div className="text-center" ref={clientsRef}>
                  <div className="text-4xl font-bold text-primary-600">{clientsCount}+</div>
                  <div className="text-sm text-gray-600 mt-1">Clientes Atendidos</div>
                </div>
                <div className="text-center" ref={satisfactionRef}>
                  <div className="text-4xl font-bold text-primary-600">{satisfactionCount}%</div>
                  <div className="text-sm text-gray-600 mt-1">Satisfacción</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
