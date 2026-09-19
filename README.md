# 👟 Deportivos Pipe - Catálogo Digital

Deportivos Pipe es un catálogo digital de calzado deportivo y streetwear diseñado para maximizar la conversión en WhatsApp. Construido con tecnología de punta para ofrecer una experiencia ultra-rápida, estética y 100% optimizada para dispositivos móviles.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)

## 🌟 Características Principales

*   **⚡ Velocidad Extrema:** Renderizado híbrido con Next.js App Router para carga casi instantánea.
*   **📱 Mobile-First:** Interfaz diseñada pensando en el uso en celulares (donde ocurren el 90% de las ventas).
*   **🛒 Integración con WhatsApp:** Flujo de compra directo a WhatsApp. Si un producto está agotado, permite solicitar *Restock* con la talla exacta deseada.
*   **📸 Galería Avanzada:** Múltiples imágenes por producto con miniaturas y compresión automática a WebP desde el navegador.
*   **🎯 SEO y OpenGraph:** Tarjetas enriquecidas al compartir links en redes sociales o WhatsApp (Muestra foto, título y precio real).
*   **⚙️ Panel de Administrador Privado:** Sistema seguro con Supabase Auth para crear, editar, eliminar y gestionar stock de zapatillas desde cualquier dispositivo.

## 🛠️ Stack Tecnológico

*   **Frontend:** Next.js 15, React 19, Tailwind CSS v4, Framer Motion (Animaciones).
*   **Backend & Base de Datos:** Supabase (PostgreSQL), Supabase Auth, Supabase Storage.
*   **UI Components:** Shadcn UI, Radix UI, Lucide Icons.

## 🚀 Instalación y Desarrollo Local

Si deseas correr este proyecto en tu propia máquina:

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
    Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El catálogo estará disponible en `http://localhost:3000`.

## 🔒 Seguridad

Este repositorio **no** contiene credenciales, contraseñas, ni llaves privadas. Todas las conexiones sensibles a la base de datos están inyectadas a través de variables de entorno protegidas en el servidor (Vercel) y el archivo `.env.local` está explícitamente ignorado en `.gitignore`.

---
*Desarrollado para Deportivos Pipe.*
