// Clase que representa una solicitud de soporte
class SolicitudSoporte {
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

// Array que almacenará las solicitudes de soporte pendientes con inserciones de ejemplo
const solicitudesPendientes = [
  new SolicitudSoporte('Ana Gómez', 'No puedo acceder a mi cuenta. Recibo un mensaje de error al intentar iniciar sesión.'),
  new SolicitudSoporte('Juan Pérez', 'Problema con la funcionalidad de recuperación de contraseña. No recibo el correo para restablecer mi contraseña.'),
  new SolicitudSoporte('María Rodríguez', 'La página de inicio muestra contenido incorrecto. Se muestran productos que no corresponden a la categoría seleccionada.'),
  new SolicitudSoporte('Luis García', 'El botón de "Agregar al carrito" no funciona en la página de productos.'),
  new SolicitudSoporte('Laura Martínez', 'Problema con el proceso de pago. La transacción falla al intentar realizar la compra.'),
  new SolicitudSoporte('Carlos López', 'No puedo cargar imágenes al intentar actualizar mi perfil.'),
  new SolicitudSoporte('Diana Fernández', 'La aplicación móvil se cierra inesperadamente al iniciar sesión.'),
  new SolicitudSoporte('Alejandro Torres', 'Necesito ayuda para cambiar mi dirección de envío en la plataforma.'),
  new SolicitudSoporte('Sofía Ramírez', 'No se aplican los descuentos correctamente en el carrito de compras.'),
  new SolicitudSoporte('Jorge González', 'No puedo ver el historial de transacciones en mi cuenta.'),
];

// Obtener solicitudes de localStorage (si existen)
const solicitudesLocalStorage = getSuggestionsFromLocalStorage();
// Agregar las solicitudes de localStorage al array
solicitudesPendientes.push(...solicitudesLocalStorage);

// Resto del código ...

function getSuggestionsFromLocalStorage() {
  const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
  return suggestions.map(suggestion => new SolicitudSoporte(suggestion.nombre, suggestion.descripcion));
}

// Función para enviar una nueva solicitud de soporte
function enviarSolicitud(e) {
  e.preventDefault(); // Evita que el formulario se envíe y la página se recargue

  // Obtiene los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;

  // Verifica que ambos campos estén llenos
  if (nombre && descripcion) {
    // Crea una nueva instancia de SolicitudSoporte
    const nuevaSolicitud = new SolicitudSoporte(nombre, descripcion);

    // Agrega la nueva solicitud al array de solicitudes pendientes
    solicitudesPendientes.push(nuevaSolicitud);

    localStorage.setItem('suggestions', JSON.stringify(solicitudesPendientes));

    // Muestra las solicitudes pendientes en la interfaz
    mostrarSolicitudesPendientes();

    // Reinicia el formulario después de enviar la solicitud
    document.getElementById('formSolicitud').reset();
  } else {
    alert('Ingrese todos los campos para enviar la solicitud.');
  }
}

// Función mejorada para mostrar las solicitudes pendientes en la interfaz
function mostrarSolicitudesPendientes() {
  const solicitudesLista = document.getElementById('solicitudes-lista');
  
  // Limpia la lista antes de volver a llenarla
  solicitudesLista.innerHTML = '';

  // Recorre todas las solicitudes pendientes y las agrega a la lista con estilos mejorados
  solicitudesPendientes.forEach(solicitud => {
    const li = document.createElement('li');
    li.classList.add('solicitud-item'); // Agrega la clase 'solicitud-item' para aplicar los estilos
    
    const nombre = document.createElement('h3');
    nombre.classList.add('solicitud-nombre'); // Estilo para el nombre (negritas)
    nombre.textContent = solicitud.nombre;
    nombre.style.marginBottom = '10px'; // Elimina el margen inferior
    li.appendChild(nombre);

    const descripcion = document.createElement('p');
    descripcion.classList.add('solicitud-descripcion'); // Estilo para la descripción (cursiva)
    descripcion.textContent = solicitud.descripcion;
    descripcion.style.fontStyle = 'italic'; // Estilo cursiva para la descripción
    descripcion.style.textAlign = 'justify'; // Alineación justificada para la descripción
    li.appendChild(descripcion);

    solicitudesLista.appendChild(li);
  });
}


// Evento que se ejecuta cuando la ventana se ha cargado completamente
window.addEventListener('load', mostrarSolicitudesPendientes);

// Evento que se ejecuta cuando se envía el formulario de solicitud
document.getElementById('formSolicitud').addEventListener('submit', enviarSolicitud);


/*
Documentacion de Support.js

1. **`SolicitudSoporte` Clase:**
   - Representa una solicitud de soporte.
   - Utiliza una clase para organizar la información relacionada con una solicitud.

2. **`solicitudesPendientes` Array:**
   - Almacena las solicitudes pendientes.
   - Un ejemplo de estructura de datos tipo lista (array) para gestionar las solicitudes.

3. **`enviarSolicitud` Función:**
   - Crea una nueva instancia de `SolicitudSoporte`.
   - Utiliza un array (`solicitudesPendientes`) para almacenar y gestionar las solicitudes.
   - Reinicia el formulario después de enviar la solicitud.

4. **`mostrarSolicitudesPendientes` Función:**
   - Muestra las solicitudes pendientes en la interfaz.
   - Utiliza un bucle para recorrer el array de solicitudes y agregarlas a la lista en el documento HTML.

5. **Event Listeners:**
   - El evento `load` asegura que las solicitudes pendientes se muestren cuando la página se carga.
   - El evento `submit` maneja el envío del formulario de solicitud y llama a la función `enviarSolicitud`.
*/
