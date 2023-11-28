// Clase que representa un producto
class Producto {
  constructor(nombre, precio, inventario, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.inventario = inventario;
    this.imagen = imagen;
  }

  // Método que devuelve el HTML para mostrar la información del producto
  obtenerHTML(onComprar) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = this.imagen;
    img.alt = `Image of ${this.nombre}`;

    const info = document.createElement('div');
    info.innerHTML = `
      <p><span>Name:</span> ${this.nombre}</p>
      <p><span>Price:</span> $${this.precio}</p>
      <p><span>Inventory:</span> ${this.inventario}</p>
    `;

    const comprarButton = document.createElement('button');
    comprarButton.className = "btn";
    comprarButton.textContent = 'Buy';
    comprarButton.addEventListener('click', () => onComprar(this));

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(comprarButton);

    return card;
  }
}

// Array que contiene productos predefinidos
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

// Función que obtiene el carrito de compras desde el almacenamiento local
function getCartFromLocalStorage() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.map(item => ({ producto: new Producto(item.producto.nombre, item.producto.precio, item.producto.inventario, item.producto.imagen), cantidad: item.cantidad }));
}

// Función que genera un nombre aleatorio
function getRandomName() {
  const adjectives = ['Powerful', 'Sleek', 'Innovative', 'Futuristic', 'Elite', 'Advanced', 'Premium'];
  const nouns = ['Device', 'Gadget', 'Machine', 'Appliance', 'Contraption', 'Instrument', 'Tool'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

// Función que genera un número aleatorio en un rango dado
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array que representa el carrito de compras
const carrito = getCartFromLocalStorage(); 

// Función que muestra los productos en la interfaz
function mostrarProductosHTML(productosArray, onComprar) {
  const productosDiv = document.getElementById('product-list');
  productosDiv.innerHTML = '';

  productosArray.forEach(producto => {
    const card = producto.obtenerHTML(onComprar);
    productosDiv.appendChild(card);
  });
}

// Función que muestra los productos en el carrito
function mostrarCarritoHTML() {
  const carritoDiv = document.getElementById('carrito-container');
  carritoDiv.innerHTML = '';

  carrito.forEach(producto => {
    const card = producto.obtenerHTML(() => {}); 
    carritoDiv.appendChild(card);
  });
}

// Función que agrega un producto
function agregarProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById('name').value;
  const precio = parseFloat(document.getElementById('price').value);
  const inventario = parseInt(document.getElementById('inventory').value);
  const imagen = document.getElementById('image').value;

  if (nombre && !isNaN(precio) && !isNaN(inventario) && imagen) {
    const nuevoProducto = new Producto(nombre, precio, inventario, imagen);

     // Agrega el nuevo producto al array de productos
    productos.push(nuevoProducto);
    mostrarProductosHTML(productos, agregarProductoAlCarrito);
    document.getElementById('formProduct').reset();
  } else {
    alert('Please enter valid data to add a product.');
  }
}

// Evento que se ejecuta cuando la ventana se ha cargado completamente
window.addEventListener('load', () => {
  mostrarProductosHTML(productos, agregarProductoAlCarrito);
  mostrarCarritoHTML();
});

// Evento que escucha el envío del formulario para agregar un producto
document.getElementById('formProduct').addEventListener('submit', agregarProducto);

// Función que agrega un producto al carrito y actualiza la interfaz del carrito
function agregarProductoAlCarrito(producto) {
  const cantidadSeleccionada = prompt(`How many ${producto.name} do you want to buy?`, 1);

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
        localStorage.setItem('cart', JSON.stringify(carrito));
      }

      mostrarCarritoHTML();
      mostrarProductosHTML(productos, agregarProductoAlCarrito);
    } else {
      alert('The selected quantity is invalid or exceeds available inventory.');
    }
  }
}

// Función que muestra los productos en el carrito
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

/*

Documentacion de AddProducts.js

1. **`Producto` Clase:**
   - Representa un producto con información como nombre, precio, inventario y una imagen.
   - Utiliza una clase para organizar la información relacionada con un producto.

2. **`productos` Array:**
   - Almacena los productos predefinidos.
   - Un ejemplo de estructura de datos tipo lista (array) para gestionar productos.

3. **Métodos y Funciones:**
   - `obtenerHTML`: Devuelve el HTML necesario para mostrar la información de un producto en la interfaz.
   - `getRandomName`: Función que genera un nombre aleatorio para un producto.
   - `getRandomNumber`: Función que genera un número aleatorio en un rango dado.
   - `mostrarProductosHTML`: Función que muestra los productos en la interfaz.
   - `agregarProductoAlCarrito`: Función que agrega un producto al carrito y actualiza la interfaz del carrito.
   - `mostrarCarritoHTML`: Función que muestra los productos en el carrito.
   - `agregarProducto`: Función que se ejecuta al intentar agregar un nuevo producto al array y actualizar la interfaz.

*/
