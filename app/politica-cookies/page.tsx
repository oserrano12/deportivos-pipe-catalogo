import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Deportivos Pipe',
  description: 'Información sobre cómo y por qué utilizamos cookies.',
}

export default function CookiesPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Política de Cookies</h1>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}</p>
        
        <h2>1. ¿Qué son las Cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (computadora o celular) mientras navegas. Sirven para recordar tus preferencias, mantener tu sesión activa y proporcionarnos métricas sobre cómo interactúas con nuestra tienda.</p>

        <h2>2. Tipos de Cookies que Utilizamos</h2>
        <ul>
          <li><strong>Cookies Estrictamente Necesarias:</strong> Requeridas para que el sitio funcione. Por ejemplo, recordar los productos que agregas al Carrito de Compras o a la lista de "Favoritos". No se pueden desactivar en nuestros sistemas.</li>
          <li><strong>Cookies de Rendimiento y Analítica:</strong> Nos permiten contar las visitas y fuentes de tráfico (Google Tag Manager, Meta Pixel) para poder medir y mejorar el rendimiento de nuestro sitio. Toda la información que recogen estas cookies es agregada y, por lo tanto, anónima.</li>
          <li><strong>Cookies de Publicidad:</strong> Pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios (como Meta/Facebook) para construir un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios web.</li>
        </ul>

        <h2>3. Gestión y Consentimiento de Cookies</h2>
        <p>Al ingresar a nuestro sitio por primera vez, se te presenta un aviso de cookies donde puedes aceptar o rechazar el uso de cookies no esenciales (analíticas y publicitarias). Si has rechazado las cookies, las herramientas de terceros como Meta Pixel y Google Analytics se mantendrán bloqueadas. Puedes cambiar tu decisión borrando el caché de tu navegador y recargando la página.</p>
        
        <h2>4. Gestión a través del Navegador</h2>
        <p>También puedes restringir, bloquear o borrar las cookies de Deportivos Pipe configurando las opciones de tu navegador de Internet (Chrome, Safari, Firefox, Edge). En la función de 'Ayuda' de tu navegador podrás informarte sobre cómo hacerlo.</p>
      </div>
    </div>
  )
}
