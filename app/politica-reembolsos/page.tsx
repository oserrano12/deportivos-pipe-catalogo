import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cambios y Garantías | Deportivos Pipe',
  description: 'Condiciones para cambios por talla y garantías por defectos de fábrica.',
}

export default function CambiosGarantiasPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Política de Cambios y Garantías</h1>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}</p>

        <p>En Deportivos Pipe queremos asegurarnos de que recibas exactamente lo que esperas. Para mantener la calidad de nuestro servicio, hemos establecido la siguiente política exclusiva de <strong>cambios</strong>.</p>
        
        <p><strong>Nota importante:</strong> Por las políticas internas de nuestra empresa, <strong>no realizamos devoluciones de dinero ni reembolsos en efectivo bajo ninguna circunstancia</strong>. Todos los casos se manejarán estrictamente mediante el cambio físico del producto.</p>

        <h2>1. Cambios por Talla o Referencia</h2>
        <p>Si el calzado que recibiste no es de la talla adecuada, tienes un plazo máximo de <strong>quince (15) días calendario</strong> a partir de la fecha en que recibes el producto para solicitar el cambio.</p>
        <ul>
          <li>El producto debe estar en condiciones impecables: nuevo, sin uso, sin desgaste en las suelas, con sus etiquetas y en su caja original.</li>
          <li>Los costos de envío (fletes de ida y vuelta) generados por el cambio de talla deben ser asumidos en su totalidad por el cliente.</li>
          <li>El cambio está sujeto a la disponibilidad del inventario al momento de procesar la solicitud.</li>
        </ul>

        <h2>2. Garantía por Defectos de Fábrica</h2>
        <p>Garantizamos la calidad de nuestro calzado. Si el producto presenta un defecto de fabricación evidente (como problemas de costuras sueltas de fábrica o despegue prematuro de la suela en uso normal), tienes hasta <strong>quince (15) días calendario</strong> para hacer efectiva la garantía.</p>
        <p><strong>Lo que NO cubre la garantía:</strong></p>
        <ul>
          <li>Desgaste normal de la suela o los materiales por uso constante.</li>
          <li>Daños causados por un mal uso, tropiezos, raspaduras, o lavado en máquina (lavadora).</li>
          <li>Uso de químicos fuertes o blanqueadores en la limpieza del calzado.</li>
          <li>Modificaciones o alteraciones hechas al producto original.</li>
        </ul>

        <h2>3. Proceso para Solicitar un Cambio o Garantía</h2>
        <p>Para iniciar cualquier proceso, por favor contáctanos directamente a nuestra línea oficial de atención al cliente (WhatsApp) siguiendo estos pasos:</p>
        <ol>
          <li>Escríbenos indicando tu nombre, fecha de compra y el modelo de la zapatilla.</li>
          <li>Explícanos el motivo: especifica si es cambio de talla o un detalle de fábrica.</li>
          <li>En caso de garantía, envíanos fotografías claras y videos donde se evidencie el defecto.</li>
        </ol>
        <p>Una vez recibamos tu solicitud, nuestro equipo de atención revisará tu caso y te indicará los pasos a seguir para el envío de regreso de las zapatillas y el posterior despacho de tu cambio.</p>
      </div>
    </div>
  )
}
