import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Deportivos Pipe',
  description: 'Términos y condiciones de uso y compra en Deportivos Pipe.',
}

export default function TerminosPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-8">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Términos y Condiciones</h1>
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-CO')}</p>
        
        <h2>1. Información General</h2>
        <p>Bienvenido a Deportivos Pipe. Al acceder y realizar compras en nuestro sitio web, aceptas estar sujeto a los siguientes términos y condiciones. Te rogamos leerlos cuidadosamente antes de usar nuestros servicios.</p>

        <h2>2. Identidad del Negocio</h2>
        <p>Este sitio web es operado por Deportivos Pipe. (Pendiente agregar NIT comercial/RUT exacto del operador). Para cualquier consulta, puedes contactarnos a través de nuestros canales oficiales (WhatsApp o correo electrónico especificados en el pie de página).</p>

        <h2>3. Productos y Precios</h2>
        <p>Hacemos todo lo posible por mostrar con precisión los colores y las imágenes de nuestros productos. Sin embargo, no garantizamos que la visualización en el monitor de tu computadora o celular sea exacta. Todos los precios están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido) en cualquier momento.</p>

        <h2>4. Proceso de Compra (Pago Contra Entrega)</h2>
        <p>Nuestro modelo de negocio actual permite el proceso de pago contra entrega y la coordinación de envíos a través de WhatsApp. Al realizar un pedido mediante nuestro sitio web, te comprometes a proveer información de envío veraz y actualizada. Nos reservamos el derecho a rechazar o cancelar pedidos si detectamos indicios de fraude o incumplimiento de nuestros términos.</p>

        <h2>5. Propiedad Intelectual</h2>
        <p>Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes e isotipos propios (como la marca "Deportivos Pipe"), es de nuestra propiedad y está protegido por las leyes de derechos de autor colombianas e internacionales. Las marcas registradas de terceros (Nike, Adidas, etc.) pertenecen a sus respectivos dueños y solo se utilizan con fines descriptivos de catálogo.</p>

        <h2>6. Ley Aplicable</h2>
        <p>Estos Términos de Servicio se rigen e interpretan de acuerdo con las leyes de la República de Colombia, especialmente el Estatuto del Consumidor (Ley 1480 de 2011).</p>
      </div>
    </div>
  )
}
