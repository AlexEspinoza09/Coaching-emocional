'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ScrollReveal from './ScrollReveal';

interface FormData {
  nombre: string;
  email: string;
  motivo: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await axios.post('/api/contact', {
        name: data.nombre,
        email: data.email,
        message: data.motivo,
      });

      if (response.data.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 8000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agendar" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Agenda tu Sesión</h2>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Comienza tu transformación hoy
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Primera sesión gratuita de 30 minutos. Sin compromiso.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="zoom-in" delay={200}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Info Column */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary-600 to-primary-800 p-8 lg:p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">¿Qué incluye la sesión gratuita?</h3>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Evaluación personalizada de tu situación actual</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Definición clara de objetivos y expectativas</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Propuesta de plan de trabajo personalizado</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-200 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Primera herramienta práctica que puedes usar de inmediato</span>
                </li>
              </ul>

              <div className="border-t border-primary-400 pt-6">
                <h4 className="font-semibold mb-3">Horarios disponibles:</h4>
                <p className="text-primary-100 text-sm mb-2">Lunes a Viernes: 9:00 - 20:00</p>
                <p className="text-primary-100 text-sm">Sábados: 10:00 - 14:00</p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-green-800 font-semibold">¡Solicitud enviada correctamente!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Te contactaremos en menos de 24 horas para coordinar tu sesión gratuita.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-red-800 font-semibold">Error al enviar</p>
                      <p className="text-red-700 text-sm mt-1">Por favor, intenta de nuevo o contáctanos directamente.</p>
                    </div>
                  </div>
                </div>
              )}

              <form id="form-agendar" onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Formulario de reserva">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    {...register('nombre', {
                      required: 'El nombre es obligatorio',
                      minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: María González"
                    aria-required="true"
                    aria-invalid={errors.nombre ? 'true' : 'false'}
                    aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                  />
                  {errors.nombre && (
                    <p id="nombre-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido',
                      },
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="motivo" className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Qué te preocupa? (1–2 líneas) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="motivo"
                    rows={3}
                    maxLength={250}
                    {...register('motivo', {
                      required: 'Por favor, cuéntanos brevemente tu situación',
                      minLength: { value: 10, message: 'Por favor, describe tu situación con más detalle' },
                      maxLength: { value: 250, message: 'Máximo 250 caracteres' },
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                      errors.motivo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Tengo mucho estrés laboral y me cuesta desconectar del trabajo..."
                    aria-required="true"
                    aria-invalid={errors.motivo ? 'true' : 'false'}
                    aria-describedby={errors.motivo ? 'motivo-error motivo-hint' : 'motivo-hint'}
                  />
                  {errors.motivo && (
                    <p id="motivo-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.motivo.message}
                    </p>
                  )}
                  <p id="motivo-hint" className="mt-1 text-xs text-gray-500">
                    Máximo 250 caracteres
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full px-8 py-4 text-lg font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Solicitar sesión gratuita'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas que procesemos tus datos para contactarte y programar tu sesión. Tus datos están protegidos y no serán compartidos con terceros.
                </p>
              </form>

              {/* Alternative: Calendly integration placeholder */}
              {/* Uncomment this section and comment out the form above to use Calendly */}
              {/*
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">
                  O agenda directamente en nuestro calendario:
                </p>
              </div>
              <iframe
                src="https://calendly.com/tu-usuario/30min"
                width="100%"
                height="700"
                frameBorder="0"
                loading="lazy"
                title="Agendar sesión con Calendly"
              ></iframe>
              */}
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
