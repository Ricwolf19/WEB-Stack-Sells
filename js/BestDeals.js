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
  
      const info = document.createElement('div');
      info.innerHTML = `
        <p class="nombre">${this.nombre}</p>
        <p class="precio">Precio: $${this.precio - (this.precio * this.descuento) / 100}</p>
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
  
  const ofertas = [
    new Oferta('Laptop Asus Rog Boech', getRandomNumber(500, 1500), 20, getRandomNumber(30, 900), 'https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg'),
    new Oferta('Laptop lilin', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/71ug0fSJu5L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),
    new Oferta('Montitor Acer Nitro', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/41AKcL0ca5L._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Router pantera', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/31PvhKmSzyL._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Mac M5', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/31oE0XPYWbL._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Table Kindle', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/41M45Z9zmDS._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Keyboard Boboayach', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/51YO1+k0bIL._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Phone dilux', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/51OFd98nT0L._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Tablet Macromini', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/41uUEuVSMQL._AC_UF226,226_FMjpg_.jpg'),
    new Oferta('Monitor FHD VOID', getRandomNumber(300, 1000), 15, getRandomNumber(30, 600), 'https://m.media-amazon.com/images/I/4182VDM1SrL._AC_UF226,226_FMjpg_.jpg'),
  ];
  
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
  function agregarOferta(nombre, precio, descuento, duracion, imagen) {
    const nuevaOferta = new Oferta(nombre, precio, descuento, duracion, imagen);
    ofertas.push(nuevaOferta);
    mostrarOfertasHTML();
  }
  