import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Deportivos Pipe',
  description: 'Cómo protegemos y manejamos tus datos personales según la Ley 1581 de 2012.',
}

export default function PrivacidadPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Política de Privacidad</h1>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}</p>
        
        <h2>1. Compromiso de Privacidad</h2>
        <p>En Deportivos Pipe respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales, en estricto cumplimiento de la <strong>Ley 1581 de 2012 (Ley de Protección de Datos Personales o Habeas Data en Colombia)</strong> y sus decretos reglamentarios.</p>

        <h2>2. Datos que Recopilamos (Principio de Necesidad)</h2>
        <p>Aplicamos el principio de <em>Privacidad por Diseño</em>. Solo recopilamos los datos estrictamente necesarios para procesar tus pedidos o mejorar tu experiencia en la web:</p>
        <ul>
          <li><strong>Datos de navegación:</strong> Métricas anónimas de comportamiento en el sitio (páginas visitadas, clics) para entender qué productos prefieres.</li>
          <li><strong>Datos de contacto:</strong> Al comunicarte por WhatsApp, recibimos tu número de teléfono y la información que decidas enviarnos voluntariamente para concretar tu compra.</li>
          <li><strong>Información de envío:</strong> Nombres, dirección y ciudad, solicitados únicamente con el fin de despachar tu producto mediante transportadoras.</li>
        </ul>

        <h2>3. Uso de la Información</h2>
        <p>La información recolectada se utiliza exclusivamente para: procesar envíos, emitir facturas (si aplica), brindar atención al cliente, y fines de analítica interna para mejorar nuestro catálogo. <strong>No vendemos ni alquilamos tu información personal a terceros bajo ninguna circunstancia.</strong></p>

        <h2>4. Analítica y Terceros</h2>
        <p>Utilizamos herramientas de terceros como Google Analytics, Meta Pixel y Vercel Analytics para entender el tráfico de nuestra web. Estas herramientas pueden recopilar tu dirección IP y comportamiento de navegación. Puedes gestionar el uso de cookies y rastreadores a través de nuestro Banner de Consentimiento o configurando tu navegador.</p>

        <h2>5. Derechos del Titular (Habeas Data)</h2>
        <p>De acuerdo con la ley colombiana, tienes derecho a: conocer, actualizar, rectificar y suprimir tus datos personales de nuestras bases de datos en cualquier momento. Para ejercer estos derechos, contáctanos a través de nuestros canales de atención oficiales.</p>
      </div>
    </div>
  )
}
