# 👟 Deportivos Pipe - Catálogo Digital

<a href="https://www.deportivospipe.com" target="_blank"><strong>deportivospipe.com</strong></a>

Deportivos Pipe es un catálogo digital premium de calzado deportivo y streetwear. Diseñado para maximizar la conversión en WhatsApp, ofrece una experiencia ultra-rápida, una interfaz "Kinetic" inmersiva, y está 100% optimizado para SEO y dispositivos móviles.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)

## 🌟 Características Principales

*   **⚡ Velocidad Extrema (Performance 96+):** Renderizado híbrido con Next.js App Router para carga casi instantánea y un LCP optimizado.
*   **🎨 Diseño "Kinetic":** Interfaz de usuario dinámica con marcas de agua masivas, destellos de luz (Glows), tipografía agresiva y animaciones sutiles.
*   **🛒 Integración Nativa con WhatsApp:** Botón de contacto directo por producto. Si una zapatilla está agotada, el botón cambia automáticamente para solicitar *Restock* indicando la talla deseada.
*   **📸 Galería & Storage:** Subida de múltiples imágenes por producto, comprimidas automáticamente a WebP en el navegador, y almacenadas en Supabase Storage.
*   **🎯 SEO de Producción:** Sitemap automático, Robots.txt, y tarjetas de previsualización (OpenGraph) reales para compartir en Facebook, Instagram y WhatsApp.
*   **⭐ Favoritos (Local Storage):** Los usuarios pueden marcar zapatillas como favoritas sin necesidad de registrarse.
*   **⚙️ Panel de Administración Oculto:** Sistema de gestión completo (CRUD) protegido por Supabase Auth + RLS (Seguridad a Nivel de Fila). **Acceso:** *Triple-click al logo principal* o ingresando a la ruta `/admin`.

## 🛠️ Stack Tecnológico

*   **Frontend:** Next.js 15, React 19, Tailwind CSS v4, Framer Motion (Animaciones fluidas).
*   **Backend & Base de Datos:** Supabase (PostgreSQL), Auth y Storage con RLS activado.
*   **UI Components:** Shadcn UI, Radix UI, Lucide Icons, Embla Carousel.
*   **Despliegue & Dominio:** Vercel (CI/CD Automático).

## 🚀 Instalación y Desarrollo Local

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/oserrano12/deportivos-pipe-catalogo.git
    cd deportivos-pipe-catalogo
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto.
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 🔒 Seguridad

El catálogo cumple con estrictas políticas de seguridad HTTP (X-Frame-Options, STS, Referrer-Policy). Este repositorio **no** contiene credenciales, contraseñas, ni llaves privadas. Todas las conexiones sensibles a la base de datos están inyectadas a través de variables de entorno protegidas en el servidor (Vercel) y las políticas RLS en Supabase impiden modificaciones públicas.

---
*Diseñado y desarrollado para Deportivos Pipe.*
