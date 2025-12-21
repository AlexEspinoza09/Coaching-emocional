# Landing Page - Coaching Emocional

Landing page profesional para servicios de coaching emocional, desarrollada con Next.js 15, TypeScript, TailwindCSS y Docker.

## Características

- **Framework moderno**: Next.js 15 con App Router y TypeScript
- **Diseño responsive**: Optimizado para móviles y desktop
- **SEO optimizado**: Meta tags, Open Graph, Twitter Cards, sitemap.xml y robots.txt
- **Formulario de contacto**: Validación con react-hook-form y API endpoint
- **Componentes interactivos**: Carrusel de testimonios, FAQ accordion, animaciones suaves
- **Performance**: Optimización de imágenes con next/image, lazy loading
- **Accesibilidad**: Navegación por teclado, atributos ARIA, contraste adecuado
- **Contenerización**: Docker multi-stage para desarrollo y producción
- **Seguridad**: Rate limiting, sanitización de inputs, validación de datos

## Secciones de la Landing

1. **Hero**: Encabezado principal con CTA destacado
2. **Servicios**: 6 servicios de coaching con iconos y descripciones
3. **Sobre mí**: Biografía, certificaciones y estadísticas
4. **Testimonios**: Carrusel de testimonios de clientes
5. **FAQ**: Preguntas frecuentes con accordion
6. **Contacto**: Formulario con validación y información de contacto

## Stack Tecnológico

- **Next.js**: ^15.1.0
- **React**: ^19.0.0
- **TypeScript**: ^5.7.2
- **TailwindCSS**: ^3.4.17
- **React Hook Form**: ^7.54.2
- **Axios**: ^1.7.9
- **Node.js**: 18+
- **Docker**: Para contenerización

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Docker y Docker Compose (opcional, para contenerización)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd coaching-landing
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_TITLE="Coaching Emocional Profesional"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CONTACT_EMAIL=tu@correo.com
```

## Desarrollo

### Modo desarrollo local

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Compilar para producción

```bash
npm run build
```

### Iniciar en modo producción

```bash
npm start
```

### Linter

```bash
npm run lint
```

## Docker

### Construcción de la imagen

```bash
docker build -t coaching-landing .
```

### Ejecutar contenedor

```bash
docker run -p 3000:3000 --env-file .env coaching-landing
```

### Usar Docker Compose

Para **producción**:

```bash
docker-compose up web
```

Para **desarrollo** (con hot reload):

```bash
docker-compose up dev
```

Accede a:
- Producción: [http://localhost:3000](http://localhost:3000)
- Desarrollo: [http://localhost:3001](http://localhost:3001)

Para detener los contenedores:

```bash
docker-compose down
```

## Estructura del Proyecto

```
coaching-landing/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # API endpoint para formulario
│   │   ├── layout.tsx                # Layout principal con SEO
│   │   ├── page.tsx                  # Página principal
│   │   ├── robots.ts                 # Configuración robots.txt
│   │   └── sitemap.ts                # Generación de sitemap
│   ├── components/
│   │   ├── Hero.tsx                  # Sección hero
│   │   ├── Services.tsx              # Servicios
│   │   ├── About.tsx                 # Sobre mí
│   │   ├── Testimonials.tsx          # Testimonios
│   │   ├── FAQ.tsx                   # Preguntas frecuentes
│   │   └── ContactForm.tsx           # Formulario de contacto
│   └── styles/
│       └── globals.css               # Estilos globales
├── public/
│   └── images/                       # Imágenes del sitio
├── Dockerfile                        # Dockerfile multi-stage
├── docker-compose.yml                # Configuración Docker Compose
├── .dockerignore                     # Archivos ignorados por Docker
├── next.config.ts                    # Configuración de Next.js
├── tailwind.config.ts                # Configuración de Tailwind
├── tsconfig.json                     # Configuración de TypeScript
├── .env.example                      # Variables de entorno de ejemplo
└── README.md                         # Este archivo
```

## API Endpoint

### POST /api/contact

Endpoint para procesar el formulario de contacto.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34 600 000 000",
  "message": "Estoy interesado en una sesión de coaching"
}
```

**Response (Success):**
```json
{
  "ok": true,
  "message": "Contact form submitted successfully"
}
```

**Características de seguridad:**
- Rate limiting: Máximo 5 requests por IP cada 15 minutos
- Sanitización de inputs para prevenir XSS
- Validación de formato de email
- Límites de longitud para todos los campos

**Nota**: En producción, configura un servicio de email (SendGrid, AWS SES, Resend, etc.) para enviar notificaciones. Ver comentarios en `src/app/api/contact/route.ts`.

## SEO

### Meta Tags Configurados

- Title y Description personalizables
- Viewport para responsive
- Robots para indexación
- Open Graph para redes sociales
- Twitter Cards

### Sitemap y Robots

- **sitemap.xml**: Generado dinámicamente en `/sitemap.xml`
- **robots.txt**: Configurado en `/robots.txt`

### Mejores Prácticas SEO

1. **Contenido real**: Reemplaza el contenido de ejemplo con información real del coach
2. **Keywords**: Incluye palabras clave relevantes en headings y párrafos
3. **Imágenes**: Agrega imágenes reales con atributos alt descriptivos
4. **Performance**: El sitio está optimizado, mantén esta optimización
5. **URL amigables**: Las URLs con anchors (#services, #contact) son SEO-friendly

## Performance y Accesibilidad

### Optimizaciones Implementadas

- **next/image**: Optimización automática de imágenes
- **Lazy loading**: Carga diferida de componentes
- **Minificación**: CSS y JS minificados en producción
- **Code splitting**: Carga solo el código necesario
- **Smooth scrolling**: Navegación suave entre secciones

### Accesibilidad

- Contraste de colores WCAG AA compliant
- Navegación por teclado funcional
- Atributos ARIA en componentes interactivos
- Labels asociados a inputs del formulario
- Estructura semántica HTML5

### Lighthouse Score

Ejecuta Lighthouse en Chrome DevTools para verificar:
```bash
npm run build
npm start
# Luego abre Chrome DevTools > Lighthouse
```

Objetivos mínimos:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

## Personalización

### Cambiar Colores

Edita `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores aquí
      },
    },
  },
},
```

### Agregar Imágenes

1. Coloca las imágenes en `public/images/`
2. Úsalas en componentes con next/image:

```tsx
import Image from 'next/image';

<Image
  src="/images/coach-photo.jpg"
  alt="Coach profesional"
  width={600}
  height={800}
  priority
/>
```

### Modificar Contenido

Edita los archivos en `src/components/` para cambiar textos, servicios, testimonios, etc.

## Integración con Servicios de Email

Para enviar emails en producción, configura uno de estos servicios:

### SendGrid

```bash
npm install @sendgrid/mail
```

Agrega a `.env`:
```env
SENDGRID_API_KEY=your_api_key_here
```

### AWS SES

```bash
npm install @aws-sdk/client-ses
```

### Resend

```bash
npm install resend
```

Ver ejemplos comentados en `src/app/api/contact/route.ts`.

## Despliegue

### Variables de Entorno en Producción

Asegúrate de configurar:
- `NEXT_PUBLIC_BASE_URL`: URL de producción
- `CONTACT_EMAIL`: Email para recibir contactos
- `NODE_ENV=production`
- Claves API de servicios de email (si aplica)

### Notas de Seguridad

1. **NUNCA** subas `.env` al repositorio
2. Usa HTTPS en producción
3. Configura CORS si usas dominios externos
4. Revisa los logs del API endpoint regularmente
5. Considera agregar reCAPTCHA para prevenir spam

### Instrucciones AWS

Ver archivo `AWS_DEPLOYMENT.md` para instrucciones detalladas de despliegue en AWS.

## Testing Local

### Probar el Build de Producción

```bash
# Build
npm run build

# Start
npm start
```

### Probar Docker Localmente

```bash
docker-compose up web
```

## Solución de Problemas

### El sitio no carga en Docker

Verifica que el puerto 3000 no esté en uso:
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Errores de TypeScript

```bash
npm run lint
```

### Hot reload no funciona en Docker

Asegúrate de usar el servicio `dev` en docker-compose y que los volúmenes estén correctamente montados.

### Formulario no envía

Verifica que:
1. El endpoint `/api/contact` responde correctamente
2. No hay errores en la consola del navegador
3. El rate limiting no está bloqueando tus requests

## Mejoras Futuras

Funcionalidades opcionales a considerar:

- [ ] Integración con reCAPTCHA v3
- [ ] Google Analytics / GA4
- [ ] Animaciones con Framer Motion
- [ ] Blog con MDX
- [ ] Sistema de reservas/calendario
- [ ] Tests unitarios con Jest
- [ ] Tests E2E con Playwright
- [ ] Multi-idioma con i18n
- [ ] Chat en vivo
- [ ] Integración con CRM

## Licencia

Este proyecto es privado y confidencial.

## Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

---

Desarrollado con Next.js y TailwindCSS
