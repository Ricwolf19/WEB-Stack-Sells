class Oferta {
  constructor(nombre, precio, duracion, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.descuento = getRandomNumber(10, 30); // Descuento aleatorio entre 10% y 30%
    this.duracion = duracion; // en segundos
    this.imagen = imagen;
  }

  obtenerHTML(onComprar) {
    const card = document.createElement('div');
    card.classList.add('oferta-card');

    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = `Imagen de la oferta: ${this.nombre}`;
    img.classList.add('oferta-imagen');

    const precioConDescuento = this.precio - (this.precio * this.descuento) / 100;
    const precioRedondeado = redondearPrecio(precioConDescuento);

    const info = document.createElement('div');
    info.innerHTML = `
      <p class="nombre">${this.nombre}</p>
      <p class="precio">Precio: $${precioRedondeado.toFixed(2)}</p>
      <p class="descuento">Descuento: ${this.descuento}%</p>
      <p class="duracion">Tiempo restante: <span class="contador">${this.duracion}</span> segundos</p>
    `;

    const comprarButton = document.createElement('button');
    comprarButton.textContent = 'Comprar';
    comprarButton.classList.add('comprar-button');
    comprarButton.addEventListener('click', () => {
      window.location.href = 'Products.html';
    });

    const contador = info.querySelector('.contador');

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(comprarButton);

    this.iniciarTemporizador(contador, onComprar);

    return card;
  }

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

function redondearPrecio(precio) {
  return Math.round((precio + Number.EPSILON) * 100) / 100;
}

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

const ofertas = productosFijos.map(producto => {
  const randomImageIndex = Math.floor(Math.random() * imageLists.length);
  const imagen = imageLists.splice(randomImageIndex, 1)[0];

  return new Oferta(producto.nombre, getRandomNumber(500, 1500), producto.duracion, imagen);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mostrarOfertasHTML(onComprar) {
  const ofertasDiv = document.getElementById('ofertas-container');
  ofertasDiv.innerHTML = '';

  ofertas.forEach(oferta => {
    const card = oferta.obtenerHTML(onComprar);
    ofertasDiv.appendChild(card);
  });
}

window.addEventListener('load', () => {
  mostrarOfertasHTML();
});

function agregarOferta() {
  const nombre = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
  const duracion = getRandomNumber(30, 900);
  let imagen;

  do {
    imagen = getRandomImageUrl();
  } while (ofertas.some(oferta => oferta.imagen === imagen));

  const nuevaOferta = new Oferta(nombre, getRandomNumber(500, 1500), duracion, imagen);
  ofertas.push(nuevaOferta);
  mostrarOfertasHTML();
}
