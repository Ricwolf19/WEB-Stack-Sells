class Producto {
  constructor(nombre, precio, inventario, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.inventario = inventario;
    this.imagen = imagen;
  }

  obtenerHTML(onComprar) {
    const card = document.createElement('div');
    card.classList.add('producto-card');

    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = `Imagen de ${this.nombre}`;

    const info = document.createElement('div');
    info.innerHTML = `
      <p>Nombre: ${this.nombre}</p>
      <p>Precio: $${this.precio}</p>
      <p>Inventario: ${this.inventario}</p>
    `;

    const comprarButton = document.createElement('button');
    comprarButton.textContent = 'Comprar';
    comprarButton.addEventListener('click', () => onComprar(this));

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(comprarButton);

    return card;
  }
}

const productos = [
  new Producto(getRandomName(), getRandomNumber(500, 1500), getRandomNumber(10, 50), 'https://m.media-amazon.com/images/I/61WQ0mBtBYL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(20, 60), 'https://m.media-amazon.com/images/I/41+1Csr1pSL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/71+ou1adXXL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/717Wz1EAR5L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/51kdpRWABzL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/61Q-xaqufQL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/61E+6my831L._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/81DeRseorML._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/71EsQS+UUxL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/71eVdRiG+eL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/61Ra0-2X8TL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/71STBdY63cL._AC_UY218_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/6125OlgSCyL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/712gr0p2VTL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/71gIJl1OJ1L._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/71oRQ2nTOqL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/71jfKwFR1rL.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(15, 40), 'https://m.media-amazon.com/images/I/71ggm-13clL._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(10, 30), 'https://m.media-amazon.com/images/I/4161BoDqu3L._AC_UL320_.jpg'),
  new Producto(getRandomName(), getRandomNumber(300, 1000), getRandomNumber(5, 25), 'https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_UL320_.jpg'),
];

function getRandomName() {
  const adjectives = ['Powerful', 'Sleek', 'Innovative', 'Futuristic', 'Elite', 'Advanced', 'Premium'];
  const nouns = ['Device', 'Gadget', 'Machine', 'Appliance', 'Contraption', 'Instrument', 'Tool'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const carrito = [];

function mostrarProductosHTML(productosArray, onComprar) {
  const productosDiv = document.getElementById('productos-container');
  productosDiv.innerHTML = '';

  productosArray.forEach(producto => {
    const card = producto.obtenerHTML(onComprar);
    productosDiv.appendChild(card);
  });
}

function agregarProductoAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarritoHTML();
}

function mostrarCarritoHTML() {
  const carritoDiv = document.getElementById('carrito-container');
  carritoDiv.innerHTML = '';

  carrito.forEach(producto => {
    const card = producto.obtenerHTML(() => {}); 
    carritoDiv.appendChild(card);
  });
}

function agregarProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const inventario = parseInt(document.getElementById('inventario').value);
  const imagen = document.getElementById('imagen').value;

  if (nombre && !isNaN(precio) && !isNaN(inventario) && imagen) {
    const nuevoProducto = new Producto(nombre, precio, inventario, imagen);

    productos.push(nuevoProducto);
    mostrarProductosHTML(productos, agregarProductoAlCarrito);
    document.getElementById('formProducto').reset();
  } else {
    alert('Ingrese datos válidos para agregar un producto.');
  }
}

window.addEventListener('load', () => {
  mostrarProductosHTML(productos, agregarProductoAlCarrito);
  mostrarCarritoHTML();
});

document.getElementById('formProducto').addEventListener('submit', agregarProducto);

function agregarProductoAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarritoHTML();
}


function agregarProductoAlCarrito(producto) {
  const cantidadSeleccionada = prompt(`¿Cuántos ${producto.nombre} desea comprar?`, 1);

  if (cantidadSeleccionada !== null) {
    const cantidad = parseInt(cantidadSeleccionada, 10) || 1;

    // Verificar si hay suficientes productos en inventario
    if (cantidad > 0 && cantidad <= producto.inventario) {
      // Actualizar el inventario del producto
      producto.inventario -= cantidad;

      // Buscar si el producto ya está en el carrito
      const productoEnCarrito = carrito.find(item => item.producto === producto);

      // Si ya está en el carrito, actualizar la cantidad
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
      } else {
        // Si no está en el carrito, agregarlo
        carrito.push({ producto, cantidad });
      }

      mostrarCarritoHTML();
      mostrarProductosHTML(productos, agregarProductoAlCarrito);
    } else {
      alert('La cantidad seleccionada no es válida o supera el inventario disponible.');
    }
  }
}

function mostrarCarritoHTML() {
  const carritoDiv = document.getElementById('carrito-container');
  carritoDiv.innerHTML = '';

  carrito.forEach(item => {
    const card = item.producto.obtenerHTML(() => {}); 
    const cantidadDiv = document.createElement('div');
    cantidadDiv.classList.add('cantidad');
    cantidadDiv.textContent = `Cantidad: ${item.cantidad}`;
    card.appendChild(cantidadDiv);
    carritoDiv.appendChild(card.cloneNode(true)); // Clonamos la tarjeta para evitar problemas con eventos
  });
}