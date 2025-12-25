import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Packages from '@/components/Packages';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <Packages />
        <About />
        <Testimonials />
        <FAQ />
        <ContactForm />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Column 1: Brand */}
              <div>
                <h3 className="text-xl font-bold mb-4">Coaching Emocional</h3>
                <p className="text-gray-400">
                  Transforma tu vida con sesiones personalizadas de coaching emocional.
                  Recupera calma y claridad en 6–8 sesiones.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#paquetes" className="text-gray-400 hover:text-white transition-colors">
                      Paquetes
                    </a>
                  </li>
                  <li>
                    <a href="#testimonios" className="text-gray-400 hover:text-white transition-colors">
                      Testimonios
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#agendar" className="text-gray-400 hover:text-white transition-colors">
                      Agendar Sesión
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: contacto@coaching-emocional.com</li>
                  <li>Lunes a Viernes: 9:00 - 20:00</li>
                  <li>Sábados: 10:00 - 14:00</li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Coaching Emocional. Todos los derechos reservados.</p>
              <p className="mt-2 text-sm">
                Política de Privacidad | Términos y Condiciones
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
