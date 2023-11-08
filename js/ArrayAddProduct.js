const productos = [
    { nombre: 'Laptop', precio: 1200, inventario: 15 },
    { nombre: 'Teléfono', precio: 800, inventario: 30 },
    { nombre: 'Tableta', precio: 400, inventario: 20 }
  ];
  
  function mostrarProductosHTML() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
  
    productos.forEach(producto => {
      const p = document.createElement('p');
      p.textContent = `Nombre: ${producto.nombre}, Precio: $${producto.precio}, Inventario: ${producto.inventario}`;
      productosDiv.appendChild(p);
    });
  }
  
  function agregarProducto(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const inventario = parseInt(document.getElementById('inventario').value);
  
    if (nombre && !isNaN(precio) && !isNaN(inventario)) {
      const nuevoProducto = {
        nombre,
        precio,
        inventario
      };
  
      productos.push(nuevoProducto);
      mostrarProductosHTML();
      document.getElementById('formProducto').reset();
    } else {
      alert('Ingrese datos válidos para agregar un producto.');
    }
  }
  
  window.addEventListener('load', mostrarProductosHTML);
  document.getElementById('formProducto').addEventListener('submit', agregarProducto);