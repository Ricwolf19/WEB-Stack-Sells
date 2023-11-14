class Oferta {
  constructor(nombre, precio, descuento, duracion, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.descuento = descuento;
    this.duracion = duracion; // en segundos
    this.imagen = imagen;
  }

  obtenerHTML(onComprar) {
    const card = document.createElement('div');
    card.classList.add('oferta-card');

    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = `Imagen de la oferta: ${this.nombre}`;
    img.classList.add('oferta-imagen'); // Nueva clase para las imágenes

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
      // Redirige a products.html al hacer clic en 'Comprar'
      window.location.href = 'Products.html';
    });

    const contador = info.querySelector('.contador');

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(comprarButton);

    // Inicia el temporizador
    this.iniciarTemporizador(contador, onComprar);

    return card;
  }

  iniciarTemporizador(contador, onComprar) {
    let tiempoRestante = this.duracion;

    const temporizador = setInterval(() => {
      if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        // Elimina la oferta cuando el temporizador llega a cero
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

const nombresAleatorios = [
  'Powerful Device', 'Sleek Gadget', 'Innovative Machine', 'Futuristic Appliance', 'Elite Contraption', 'Advanced Instrument', 'Premium Tool'
];

const ofertas = generarOfertasAleatorias(10);

function generarOfertasAleatorias(cantidad) {
  const ofertasAleatorias = [];
  for (let i = 0; i < cantidad; i++) {
    const nombre = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
    const precio = getRandomNumber(500, 1500);
    const descuento = getRandomNumber(10, 30);
    const duracion = getRandomNumber(30, 900);
    const imagen = getRandomImageUrl();

    const oferta = new Oferta(nombre, precio, descuento, duracion, imagen);
    ofertasAleatorias.push(oferta);
  }

  return ofertasAleatorias;
}

function getRandomImageUrl() {
  const imageLists = [
    ['https://m.media-amazon.com/images/I/819gjFWWnPL.__AC_SX300_SY300_QL70_FMwebp_.jpg', 'https://m.media-amazon.com/images/I/51bia84JhhL._AC_UL320_.jpg', 'https://m.media-amazon.com/images/I/71vEXQierYL._AC_UL320_.jpg'],
    ['https://m.media-amazon.com/images/I/711+0tgn+6L._AC_UL320_.jpg', 'https://m.media-amazon.com/images/I/61INtCQzv2L._AC_UL320_.jpg', 'https://m.media-amazon.com/images/I/71c3toK4COS._AC_UL320_.jpg'],
    ['https://m.media-amazon.com/images/I/611LbnyTYNL._AC_UL320_.jpg', 'https://www.amazon.com/-/es/SanDisk-Ultra-Flair-SDCZ73-128G-G46-capacidad/dp/B015CH1PJU/ref=sr_1_9?qid=1699999153&s=computers-intl-ship&sr=1-9', 'https://m.media-amazon.com/images/I/71fFUd8uf3L._AC_UL320_.jpg'],
    ['https://m.media-amazon.com/images/I/710B-MnAc9L._AC_UY218_.jpg', 'https://m.media-amazon.com/images/I/71zmZbiUeAL._AC_UY218_.jpg', 'https://m.media-amazon.com/images/I/41ixF0BlglL._AC_UF226,226_FMjpg_.jpg', 'https://m.media-amazon.com/images/I/71tn6U2YNyL._AC_UF226,226_FMjpg_.png']
    // Agrega más listas según sea necesario
  ];

  const randomList = imageLists[Math.floor(Math.random() * imageLists.length)];
  return randomList[Math.floor(Math.random() * randomList.length)];
}

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

// Se inicia el temporizador para las ofertas existentes
window.addEventListener('load', () => {
  mostrarOfertasHTML();
});

// Función para agregar una nueva oferta
function agregarOferta() {
  const nombre = nombresAleatorios[Math.floor(Math.random() * nombresAleatorios.length)];
  const precio = getRandomNumber(500, 1500);
  const descuento = getRandomNumber(10, 30);
  const duracion = getRandomNumber(30, 900);
  let imagen;

  do {
    imagen = getRandomImageUrl();
  } while (ofertas.some(oferta => oferta.imagen === imagen));

  const nuevaOferta = new Oferta(nombre, precio, descuento, duracion, imagen);
  ofertas.push(nuevaOferta);
  mostrarOfertasHTML();
}
