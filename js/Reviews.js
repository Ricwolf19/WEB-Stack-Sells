class Reseña {
    constructor(usuario, puntuacion, comentario) {
      this.usuario = usuario;
      this.puntuacion = puntuacion;
      this.comentario = comentario;
    }
  
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

function mostrarReseñasHTML() {
    const reseñasDiv = document.getElementById('reseñas-container');
    reseñasDiv.innerHTML = '';
  
    reseñas.forEach(reseña => {
      const card = reseña.obtenerHTML();
      reseñasDiv.appendChild(card);
    });
  }
  
  window.addEventListener('load', () => {
    mostrarReseñasHTML();
  });

function dejarReseña() {
  const nombre = prompt('Ingresa tu nombre:');
  const puntuacion = prompt('Califica del 1 al 5:');
  const comentario = prompt('Deja tu comentario:');

  if (nombre && puntuacion && comentario) {
    const nuevaReseña = new Reseña(nombre, parseInt(puntuacion), comentario);
    reseñas.push(nuevaReseña);
    mostrarReseñasHTML();
  } else {
    alert('Ingresa todos los campos para dejar una reseña válida.');
  }
}
