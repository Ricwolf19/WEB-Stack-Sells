class SolicitudSoporte {
    constructor(nombre, descripcion) {
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  }
  
  const solicitudesPendientes = [];
  
  function enviarSolicitud(e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
  
    if (nombre && descripcion) {
      const nuevaSolicitud = new SolicitudSoporte(nombre, descripcion);
      solicitudesPendientes.push(nuevaSolicitud);
  
      mostrarSolicitudesPendientes();
      document.getElementById('formSolicitud').reset();
    } else {
      alert('Ingrese todos los campos para enviar la solicitud.');
    }
  }
  
  function mostrarSolicitudesPendientes() {
    const solicitudesLista = document.getElementById('solicitudes-lista');
    solicitudesLista.innerHTML = '';
  
    solicitudesPendientes.forEach(solicitud => {
      const li = document.createElement('li');
      li.textContent = `${solicitud.nombre}: ${solicitud.descripcion}`;
      solicitudesLista.appendChild(li);
    });
  }
  
  window.addEventListener('load', mostrarSolicitudesPendientes);
  document.getElementById('formSolicitud').addEventListener('submit', enviarSolicitud);
  