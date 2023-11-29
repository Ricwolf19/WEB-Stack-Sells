// Clase que representa una oferta
class Oferta {
  constructor(nombre, precio, duracion, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.descuento = getRandomNumber(10, 30); // Descuento aleatorio entre 10% y 30%
    this.duracion = duracion; // en segundos
    this.imagen = imagen;
  }

  // Método que devuelve el HTML para mostrar la oferta
  obtenerHTML(onComprar) {
    const card = document.createElement('div');
    card.classList.add('oferta-card');

    const imgContenedor = document.createElement('div');
    imgContenedor.className = 'card-img-container';
    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = `Imagen de la oferta: ${this.nombre}`;
    img.classList.add('oferta-imagen');

    imgContenedor.appendChild(img);

    const precioConDescuento = this.precio - (this.precio * this.descuento) / 100;
    const precioRedondeado = redondearPrecio(precioConDescuento);

    const info = document.createElement('div');
    info.classList.add('oferta-info');
    info.innerHTML = `
      <h5 class="nombre">${this.nombre}</h5>
      <p class="precio">Precio: $${precioRedondeado.toFixed(2)}</p>
      <p class="descuento">Descuento: ${this.descuento}%</p>
      <p class="duracion">Tiempo restante: <span class="contador">${this.duracion}</span> segundos</p>
    `;

    const comprarButton = document.createElement('button');
    comprarButton.textContent = 'Comprar';
    comprarButton.className = "btn comprar-button";
    comprarButton.addEventListener('click', () => {
      window.location.href = '/pages/Products.html';
    });

    const contador = info.querySelector('.contador');

    card.appendChild(imgContenedor);
    card.appendChild(info);
    card.appendChild(comprarButton);

    this.iniciarTemporizador(contador, onComprar);

    return card;
  }

  // Método que inicia el temporizador para la duración de la oferta
  iniciarTemporizador(contador, onComprar) {
    let tiempoRestante = this.duracion;

    const temporizador = setInterval(() => {
      if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        const index = ofertas.indexOf(this);
        if (index !== -1) {
          ofertas.splice(index, 1);
          mostrarOfertasHTML(onComprar);
        }
      } else {
        contador.textContent = tiempoRestante;
        tiempoRestante--;
      }
    }, 1000);
  }
}

// Función que redondea el precio a dos decimales
function redondearPrecio(precio) {
  return Math.round((precio + Number.EPSILON) * 100) / 100;
}

// Array que contiene información fija de productos
const productosFijos = [
  { nombre: 'Product 1', duracion: 100 },
  { nombre: 'Product 2', duracion: 250 },
  { nombre: 'Product 3', duracion: 320 },
  { nombre: 'Product 4', duracion: 400 },
  { nombre: 'Product 5', duracion: 540 },
  { nombre: 'Product 6', duracion: 180 },
  { nombre: 'Product 7', duracion: 260 },
  { nombre: 'Product 8', duracion: 300 },
  { nombre: 'Product 9', duracion: 400 },
  { nombre: 'Product 10', duracion: 500 }
];

// Lista de URLs de imágenes para las ofertas
const imageLists = [
'https://m.media-amazon.com/images/I/819gjFWWnPL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
'https://m.media-amazon.com/images/I/51bia84JhhL._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/71vEXQierYL._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/711+0tgn+6L._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/61INtCQzv2L._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/71c3toK4COS._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/611LbnyTYNL._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/41QQBA01KxL._AC._SR180,230.jpg',
'https://m.media-amazon.com/images/I/71fFUd8uf3L._AC_UL320_.jpg',
'https://m.media-amazon.com/images/I/710B-MnAc9L._AC_UY218_.jpg'
];

// Array que almacena las ofertas generadas
const ofertas = productosFijos.map(producto => {
  const randomImageIndex = Math.floor(Math.random() * imageLists.length);
  const imagen = imageLists.splice(randomImageIndex, 1)[0];

  return new Oferta(producto.nombre, getRandomNumber(500, 1500), producto.duracion, imagen);
});

// Función que genera un número aleatorio en un rango dado
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función que muestra las ofertas en la interfaz
function mostrarOfertasHTML(onComprar) {
  const ofertasDiv = document.getElementById('ofertas-container');
  ofertasDiv.innerHTML = '';

  // Recorre todas las ofertas y las agrega a la interfaz
  ofertas.forEach(oferta => {
    const card = oferta.obtenerHTML(onComprar);
    ofertasDiv.appendChild(card);
  });
}

// Evento que se ejecuta cuando la ventana se ha cargado completamente
window.addEventListener('load', () => {
  mostrarOfertasHTML();
});

// Función para agregar una nueva oferta
function agregarOferta() {
  const nombre = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
  const duracion = getRandomNumber(30, 900);
  let imagen;

  do {
    imagen = getRandomImageUrl();
  } while (ofertas.some(oferta => oferta.imagen === imagen));

  // Crea una nueva oferta y la agrega al array de ofertas
  const nuevaOferta = new Oferta(nombre, getRandomNumber(500, 1500), duracion, imagen);
  ofertas.push(nuevaOferta);
  mostrarOfertasHTML();
}

/* 
Documentacion de BestDeals.js

1. **`Oferta` Clase:**
   - Representa una oferta con descuento que tiene un temporizador.
   - Utiliza una clase para organizar la información relacionada con una oferta.

2. **`ofertas` Array:**
   - Almacena las ofertas generadas.
   - Un ejemplo de estructura de datos tipo lista (array) para gestionar las ofertas.

3. **Métodos y Funciones:**
   - `obtenerHTML`: Devuelve el HTML necesario para mostrar la información de una oferta en la interfaz.
   - `iniciarTemporizador`: Inicia un temporizador para la duración de la oferta y actualiza la interfaz cuando el tiempo se agota.
   - `redondearPrecio`: Función que redondea el precio a dos decimales.
   - `getRandomNumber`: Función que genera un número aleatorio en un rango dado.
   - `mostrarOfertasHTML`: Función que muestra las ofertas existentes en la interfaz.
   - `agregarOferta`: Función que agrega una nueva oferta al array y actualiza la interfaz.

*/
