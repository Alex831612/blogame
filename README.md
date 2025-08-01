# BloGame - Blog de Videojuegos

Un blog moderno y minimalista sobre videojuegos, construido con Next.js 15 y diseñado para ofrecer la mejor experiencia tanto a lectores como desarrolladores.

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black?style=for-the-badge&logo=vercel)](https://bloggame.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌐 Demo

**Sitio web:** [https://bloggame.vercel.app](https://bloggame.vercel.app)

## ✨ Características

### 🎯 Funcionalidades Principales

- **Blog completo** con sistema de posts y categorías
- **Páginas estáticas** optimizadas (About, Contact)
- **Formulario de contacto** funcional con Formspree
- **Búsqueda** integrada de contenido
- **Modo oscuro/claro** con persistencia
- **Diseño responsive** mobile-first

### 🚀 Rendimiento y SEO

- **Core Web Vitals optimizados**
- **SEO completo** con Open Graph y Twitter Cards
- **JSON-LD** structured data
- **Sitemap** automático
- **Robots.txt** configurado
- **Google Analytics** integrado

### ♿ Accesibilidad

- **WCAG 2.1 AA** compliant
- **Skip links** para navegación por teclado
- **Alt text** en todas las imágenes
- **Contraste** optimizado
- **Screen reader** friendly

### 🛠️ Tecnología

- **Next.js 15** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para styling
- **Markdown** para contenido
- **Vercel** para deployment

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Alex831612/blogame
cd blogame
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
FORMSPREE_ID=tu-formspree-id
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**

```
http://localhost:3000
```

## 📝 Gestión de Contenido

### Crear un nuevo post

1. Crea un archivo `.md` en `posts/`:

```bash
/posts/mi-nuevo-post.md
```

2. Agrega el frontmatter:

```md
---
title: "Mi Nuevo Post"
description: "Descripción del post"
date: "2024-01-15"
category: "Curiosidades"
image: "/images/posts/mi-post.jpg"
tags: ["gaming", "review"]
---

# Mi Nuevo Post

Contenido del post en Markdown...
```

### Categorías disponibles

- `curiosidades` - Datos de juegos
- `noticias` - Noticias gaming
- `guias` - Guías y tutoriales
- `analisis` - Análisis en profundidad
- `tecnogia` - Análisis en consolas

## 🎨 Personalización

### Configuración del sitio

Edita `app/layout.tsx` para modificar:

- Metadata del sitio
- Open Graph tags
- Información de contacto

## 📊 Analytics y SEO

### Google Analytics

1. Crea una propiedad GA4
2. Agrega el ID en `.env.local`
3. Los eventos se trackean automáticamente:
   - Page views
   - Cambios de tema
   - Envíos de formulario

### SEO

- **Sitemap automático**: `/sitemap.xml`
- **Robots.txt**: `/robots.txt`
- **JSON-LD**: Structured data en cada página
- **Open Graph**: Imágenes y metadatos optimizados

## 🚀 Deployment

### Vercel

1. Conecta tu repositorio GitHub
2. Configura las variables de entorno
3. Deploy automático en cada push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Alex831612/blogame)

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos
npm run analyze      # Análisis del bundle
```

## 🧪 Testing

```bash
npm run test         # Tests unitarios
npm run test:e2e     # Tests end-to-end
npm run test:coverage # Coverage report
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push al branch (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Guías de contribución

- Usa TypeScript para nuevos componentes
- Sigue las convenciones de naming existentes
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Alex**

- Website: [https://bloggame.vercel.app](https://bloggame.vercel.app)
- Email: andresalex983@gmail.com
- GitHub: [@Alex831612](https://github.com/Alex831612)

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub** ⭐

## 📋 Roadmap

### Ideas futuras

- [ ] Newsletter subscription
- [ ] Comentarios con sistema propio
- [ ] PWA completa
- [ ] Modo offline
- [ ] Dashboard de administración
