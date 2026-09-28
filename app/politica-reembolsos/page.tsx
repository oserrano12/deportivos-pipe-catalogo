import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Reembolsos y Devoluciones | Deportivos Pipe',
  description: 'Derechos del consumidor, cambios, garantías y derecho de retracto (Ley 1480 de 2011).',
}

export default function ReembolsosPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Política de Reembolsos y Devoluciones</h1>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}</p>

        <p>En Deportivos Pipe velamos por tu satisfacción y nos apegamos estrictamente al <strong>Estatuto del Consumidor (Ley 1480 de 2011)</strong> de la República de Colombia.</p>

        <h2>1. Derecho de Retracto</h2>
        <p>De acuerdo con el artículo 47 de la Ley 1480 de 2011, tienes derecho a retractarte de tu compra dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la entrega del producto.</p>
        <ul>
          <li>El producto debe ser devuelto en las mismas condiciones en que lo recibiste: sin uso, con sus etiquetas originales, accesorios y en su empaque original.</li>
          <li>Los costos de transporte y los demás que conlleve la devolución del bien serán cubiertos por el consumidor.</li>
          <li>Una vez recibido y verificado el estado del producto, procederemos con la devolución del dinero en un plazo no mayor a treinta (30) días calendario.</li>
        </ul>

        <h2>2. Garantía Legal por Defectos de Fábrica</h2>
        <p>Todos nuestros productos cuentan con una garantía legal de <strong>sesenta (60) días</strong> a partir de la fecha de entrega, cubriendo exclusivamente defectos de fabricación (como despegues de suela o defectos evidentes en los materiales de fábrica).</p>
        <p>La garantía no cubre daños causados por mal uso, desgaste natural, raspaduras, uso de químicos o lavadoras, u otras alteraciones hechas por el usuario.</p>

        <h2>3. Cambios por Talla</h2>
        <p>Si el producto que compraste no es de tu talla, te ofrecemos la opción de cambio sujeto a disponibilidad de inventario. Tienes un plazo de hasta quince (15) días calendario tras la recepción para solicitar un cambio. Los costos de los fletes para cambios por talla son asumidos por el cliente.</p>

        <h2>4. Proceso para Solicitar un Cambio o Garantía</h2>
        <p>Para iniciar cualquier proceso de devolución o garantía, por favor escríbenos directamente a nuestra línea oficial de atención al cliente (WhatsApp) indicando: tu nombre, descripción del problema, y fotografías legibles evidenciando el defecto (en caso de garantía) o el estado del producto.</p>
      </div>
    </div>
  )
}
