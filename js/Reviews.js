// Clase que representa una reseña
class Reseña {
  constructor(usuario, puntuacion, comentario) {
    this.usuario = usuario;
    this.puntuacion = puntuacion;
    this.comentario = comentario;
  }

  // Método que devuelve el HTML para mostrar la reseña
  obtenerHTML() {
    const card = document.createElement('div');
    card.classList.add('reseña-card');

    const usuarioIcono = document.createElement('span');
    usuarioIcono.classList.add('usuario-icon');
    usuarioIcono.textContent = '👤';

    const info = document.createElement('div');
    info.innerHTML = `
      <p>Usuario: ${this.usuario}</p>
      <p>Puntuación: ${this.puntuacion} ⭐</p>
      <p>Comentario: ${this.comentario}</p>
    `;

    card.appendChild(usuarioIcono);
    card.appendChild(info);

    return card;
  }
}

// Array que almacena las reseñas existentes
const reseñas = [
  new Reseña('Usuario1', 4, 'Gran experiencia de compra en Stack Sells. ¡Recomiendo totalmente!'),
  new Reseña('Usuario2', 5, 'Productos de alta calidad y entrega rápida. ¡Volveré a comprar!'),
  new Reseña('Usuario3', 3, 'Buen servicio al cliente, pero el envío fue un poco lento.'),
  new Reseña('Usuario4', 4, 'Variedad de productos y precios justos. Buena experiencia.'),
  new Reseña('Usuario5', 2, 'Producto defectuoso recibido. La devolución fue complicada.'),
  new Reseña('Usuario6', 5, 'Increíble selección de productos. Rápido y eficiente.'),
  new Reseña('Usuario7', 3, 'El producto no cumplió completamente con mis expectativas.'),
  new Reseña('Usuario8', 4, 'Gran calidad y atención al cliente. Envío rápido.'),
  new Reseña('Usuario9', 5, '¡Me encanta comprar aquí! Todo siempre llega perfecto.'),
  new Reseña('Usuario10', 2, 'Problemas con la facturación. El servicio al cliente fue útil.'),
  new Reseña('Usuario11', 4, 'Buenos precios y entrega rápida. Sin quejas.'),
  new Reseña('Usuario12', 5, 'Productos únicos y de alta calidad. Muy satisfecho.'),
  new Reseña('Usuario13', 3, 'La interfaz del sitio web podría mejorar. Buena variedad.'),
  new Reseña('Usuario14', 4, 'Fácil proceso de compra. Productos bien embalados.'),
  new Reseña('Usuario15', 5, '¡Maravilloso! Gran atención al cliente y productos exclusivos.'),
  new Reseña('Usuario16', 3, 'Algunos productos estaban agotados. Buena experiencia en general.'),
  new Reseña('Usuario17', 4, 'Precios competitivos. Envío dentro del plazo estimado.'),
  new Reseña('Usuario18', 5, 'Nunca decepciona. Siempre encuentro lo que necesito.'),
  new Reseña('Usuario19', 3, 'Atención al cliente receptiva. La calidad del producto podría mejorar.'),
  new Reseña('Usuario20', 4, 'Sitio confiable. Buenos precios y servicio rápido.'),
];

reseñas.push(...getReviewsFromLocalStorage());

function getReviewsFromLocalStorage() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  return reviews.map(review => new Reseña(review.usuario, review.puntuacion, review.comentario));
}

// Función para mostrar las reseñas existentes en la interfaz
function mostrarReseñasHTML() {
  const reseñasDiv = document.getElementById('reseñas-container');
  reseñasDiv.innerHTML = '';

  // Recorre todas las reseñas y las agrega a la interfaz
  reseñas.forEach(reseña => {
    const card = reseña.obtenerHTML();
    reseñasDiv.appendChild(card);
  });
}

// Evento que se ejecuta cuando la ventana se ha cargado completamente
window.addEventListener('load', () => {
  mostrarReseñasHTML();
});

// Función para permitir a los usuarios dejar una nueva reseña
function dejarReseña() {
  const nombre = prompt('Ingresa tu nombre:');
  const puntuacion = prompt('Califica del 1 al 5:');
  const comentario = prompt('Deja tu comentario:');

  // Verifica que se hayan ingresado todos los campos necesarios
  if (nombre && puntuacion && comentario) {
    // Crea una nueva instancia de Reseña y la agrega al array de reseñas
    const nuevaReseña = new Reseña(nombre, parseInt(puntuacion), comentario);
    reseñas.push(nuevaReseña);
    
    localStorage.setItem('reviews', JSON.stringify(reseñas));

    // Muestra las reseñas actualizadas en la interfaz
    mostrarReseñasHTML();
  } else {
    alert('Ingresa todos los campos para dejar una reseña válida.');
  }
}

/*
Documentacion de Reviews.js

1. **`Reseña` Clase:**
   - Representa una reseña.
   - Utiliza una clase para organizar la información relacionada con una reseña.

2. **`reseñas` Array:**
   - Almacena las reseñas existentes.
   - Un ejemplo de estructura de datos tipo lista (array) para gestionar las reseñas.

3. **`obtenerHTML` Método:**
   - Devuelve el HTML necesario para mostrar la información de una reseña en la interfaz.
   - Encapsula la lógica de presentación dentro de la propia clase.

4. **`mostrarReseñasHTML` Función:**
   - Muestra las reseñas existentes en la interfaz.
   - Utiliza un bucle para recorrer el array de reseñas y agregarlas a la lista en el documento HTML.

5. **Event Listeners:**
   - El evento `load` asegura que las reseñas se muestren cuando la página se carga.
   - La función `dejarReseña` permite a los usuarios dejar una nueva reseña y actualiza la interfaz.

*/
