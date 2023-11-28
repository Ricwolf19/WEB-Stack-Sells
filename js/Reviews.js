// Clase que representa una reseña
class Reseña {
  constructor(usuario, puntuacion, comentario) {
    this.usuario = usuario;
    this.puntuacion = puntuacion;
    this.comentario = comentario;
  }

  obtenerHTML() {
    // Crear el contenedor principal de la tarjeta de reseña
    const card = document.createElement('div');
    card.classList.add('review-card');
    
    // Crear el borde de la tarjeta de reseña
    const border = document.createElement('div');
    border.classList.add('review-border');
    card.appendChild(border);
    
    // Crear el ícono del usuario
    const usuarioIcono = document.createElement('span');
    usuarioIcono.classList.add('user-icon');
    usuarioIcono.textContent = '👤';
    usuarioIcono.style.fontSize = '50px'; // Ajustar el tamaño del ícono según sea necesario
    
    // Crear el contenedor de las estrellas para la puntuación
    const stars = document.createElement('div');
    stars.classList.add('stars');
    
    // Generar las estrellas según la puntuación recibida
    const rating = parseInt(this.puntuacion);
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.textContent = i < rating ? '⭐' : ' '; // Mostrar estrella llena o vacía según la puntuación
      star.style.color = '#FFD700'; // Establecer el color amarillo para las estrellas
      stars.appendChild(star);
    }
    
    // Crear el contenedor de la información de la reseña
    const info = document.createElement('div');
    info.classList.add('review-info');
    info.innerHTML = `
      <p><strong>Usuario:</strong> <em>${this.usuario}</em></p>
      <p><strong>Puntuación:</strong> <em>${this.puntuacion}</em></p>
      <p><strong>Comentario:</strong> <em>${this.comentario}</em></p>
    `;
    info.style.marginLeft = '10px'; // Ajustar el margen izquierdo según sea necesario
    
    // Agregar los elementos creados al contenedor principal de la tarjeta
    card.appendChild(usuarioIcono);
    card.appendChild(stars); // Agregar las estrellas al elemento de la tarjeta
    card.appendChild(info);
    
    // Establecer estilos para la tarjeta de reseña
    card.style.padding = '15px'; // Espaciado interno
    card.style.marginBottom = '15px'; // Espaciado inferior
    card.style.backgroundColor = '#f9f9f9'; // Color de fondo
    card.style.display = 'inline-block'; // Mostrar las tarjetas una al lado de la otra
    card.style.width = 'calc(25% - 20px)'; // Definir el ancho para que quepan 4 tarjetas en una fila

    // Función para generar un color aleatorio excluyendo el blanco (#FFFFFF)
    function getRandomColor() {
      const purpleBlueColors = ['#0000FF', '#9370DB', '#8A2BE2', '#4B0082', '#483D8B', '#6A5ACD', '#8A2BE2', '#483D8B', '#00008B', '#0000CD', '#4169E1', '#6495ED', '#1E90FF', '#4682B4', '#87CEEB', '#87CEFA', '#00BFFF', '#ADD8E6', '#B0C4DE', '#5F9EA0'];
      const randomIndex = Math.floor(Math.random() * purpleBlueColors.length);
      return purpleBlueColors[randomIndex];
    }    

    // Generar un color aleatorio para el borde excluyendo el blanco
    let randomColor = getRandomColor();
    while (randomColor === '#FFFFFF') {
      randomColor = getRandomColor(); // Si el color generado es blanco, generar uno nuevo
    }
    border.style.border = `2px solid ${randomColor}`; // Aplicar borde con el color aleatorio
    
    return card; // Devolver la tarjeta de reseña completa
  }  
}

// Array que almacena las reseñas existentes
const reseñas = [
  new Reseña('Messi', 4, 'Gran experiencia de compra en Stack Sells. ¡Recomiendo totalmente!'),
  new Reseña('Ronaldo', 5, 'Productos de alta calidad y entrega rápida. ¡Volveré a comprar!'),
  new Reseña('Neymar', 3, 'Buen servicio al cliente, pero el envío fue un poco lento.'),
  new Reseña('Mbappé', 4, 'Variedad de productos y precios justos. Buena experiencia.'),
  new Reseña('Haaland', 2, 'Producto defectuoso recibido. La devolución fue complicada.'),
  new Reseña('Lewandowski', 5, 'Increíble selección de productos. Rápido y eficiente.'),
  new Reseña('Salah', 3, 'El producto no cumplió completamente con mis expectativas.'),
  new Reseña('Kane', 4, 'Gran calidad y atención al cliente. Envío rápido.'),
  new Reseña('De Bruyne', 5, '¡Me encanta comprar aquí! Todo siempre llega perfecto.'),
  new Reseña('Sterling', 2, 'Problemas con la facturación. El servicio al cliente fue útil.'),
  new Reseña('Suárez', 4, 'Buenos precios y entrega rápida. Sin quejas.'),
  new Reseña('Griezmann', 5, 'Productos únicos y de alta calidad. Muy satisfecho.'),
  new Reseña('Kroos', 3, 'La interfaz del sitio web podría mejorar. Buena variedad.'),
  new Reseña('Modric', 4, 'Fácil proceso de compra. Productos bien embalados.'),
  new Reseña('Pogba', 5, '¡Maravilloso! Gran atención al cliente y productos exclusivos.'),
  new Reseña('Kante', 3, 'Algunos productos estaban agotados. Buena experiencia en general.'),
  new Reseña('Ramos', 4, 'Precios competitivos. Envío dentro del plazo estimado.'),
  new Reseña('Neuer', 5, 'Nunca decepciona. Siempre encuentro lo que necesito.'),
  new Reseña('Hazard', 3, 'Atención al cliente receptiva. La calidad del producto podría mejorar.'),
  new Reseña('Lloris', 4, 'Sitio confiable. Buenos precios y servicio rápido.'),  
];

// Agregar las reseñas existentes al array de reseñas
reseñas.push(...getReviewsFromLocalStorage());

// Función para obtener las reseñas existentes desde el almacenamiento local
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
