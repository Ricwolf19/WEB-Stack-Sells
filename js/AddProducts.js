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
  new Producto('Laptop', 1200, 15, 'https://m.media-amazon.com/images/I/819gjFWWnPL._AC_UF894,1000_QL80_.jpg'),
  new Producto('Teléfono', 800, 30, 'https://m.media-amazon.com/images/I/71jfKwFR1rL.jpg'),
  new Producto('Tableta', 400, 20, 'https://i.blogs.es/0f6446/apple-ipad-pro-2021/1366_2000.jpg'),
];

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