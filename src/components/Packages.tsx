import ScrollReveal from './ScrollReveal';

export default function Packages() {
  const packages = [
    {
      name: 'Sesión Única',
      duration: '1 sesión de 60 min',
      result: 'Orientación puntual y plan de acción',
      price: '$75',
      features: [
        'Evaluación inicial de tu situación',
        'Identificación de problema principal',
        'Plan de acción personalizado',
        'Herramientas básicas',
      ],
      cta: 'Seleccionar',
      featured: false,
    },
    {
      name: 'Paquete Inicial',
      duration: '6 sesiones · 6 semanas',
      result: 'Gestión efectiva del estrés laboral',
      price: '$390',
      priceNote: '$65/sesión',
      features: [
        'Evaluación completa inicial',
        'Plan personalizado de 6 semanas',
        'Técnicas de respiración y mindfulness',
        'Establecimiento de límites saludables',
        'Seguimiento semanal de progreso',
        'Mejora medible del sueño y energía',
      ],
      cta: 'Más Popular',
      featured: true,
    },
    {
      name: 'Profundización',
      duration: '12 sesiones · 3 meses',
      result: 'Cambio sostenido y herramientas avanzadas',
      price: '$720',
      priceNote: '$60/sesión',
      features: [
        'Todo lo del Paquete Inicial',
        'Trabajo profundo en patrones emocionales',
        'Técnicas avanzadas de gestión emocional',
        'Desarrollo de resiliencia',
        'Plan de mantenimiento a largo plazo',
        'Soporte entre sesiones por email',
        'Resultados sostenibles y duraderos',
      ],
      cta: 'Seleccionar',
      featured: false,
    },
  ];

  return (
    <section id="paquetes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Paquetes</h2>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Elige el plan que mejor se adapte a ti
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Planes diseñados para diferentes necesidades y objetivos
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <ScrollReveal
              key={index}
              animation="zoom-in"
              delay={index * 150}
            >
              <div
                className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full ${
                  pkg.featured
                    ? 'ring-4 ring-primary-500 transform md:scale-105 bg-gradient-to-br from-primary-50 to-white'
                    : 'bg-white'
                }`}
              >
              {pkg.featured && (
                <div className="bg-primary-600 text-white text-center py-2 px-4 text-sm font-semibold">
                  {pkg.cta}
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{pkg.duration}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">{pkg.price}</span>
                    {pkg.priceNote && <span className="ml-2 text-sm text-gray-500">{pkg.priceNote}</span>}
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-primary-900 mb-1">Resultado esperado:</p>
                  <p className="text-primary-800">{pkg.result}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#agendar"
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.featured
                      ? 'btn-primary bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                      : 'btn-secondary bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                  }`}
                  aria-label={`Seleccionar paquete ${pkg.name}`}
                >
                  {pkg.featured ? 'Comenzar Ahora' : pkg.cta}
                </a>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={500}>
          <p className="note mt-12 text-center text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold">Nota:</span> Los precios son orientativos. El plan final se personaliza tras
            la evaluación inicial gratuita, adaptándose a tus necesidades específicas y objetivos. Planes de pago
            disponibles.
          </p>

          <div className="mt-8 text-center">
            <a
              href="#agendar"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg"
            >
              ¿No estás seguro? Agenda una consulta gratuita
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
