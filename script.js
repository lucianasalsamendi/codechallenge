document.addEventListener('DOMContentLoaded', () => {  
  // intervalo
  setInterval(() => {
    actualizarLista();
  }, 1500);

  document.getElementById('enviar').addEventListener('click', () => {
    enviarDatos();
  });
});

function enviarDatos() {
  let nom = document.getElementById('nombre').value;
  let ap = document.getElementById('apellido').value;
  let gru = document.getElementById('grupo').value;
  let sub = document.getElementById('subgrupo').value;

  fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo275', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
      name: nom,
      apellido: ap,
      grupo: gru,
      subgrupo: sub
    })
  })
  .then(response => response.json())
  .then(data => { 
    document.getElementById('nombre').value="";
    document.getElementById('apellido').value="";
    document.getElementById('grupo').value=0;
    document.getElementById('subgrupo').value=0;
    alert('Se envió correctamente!');
  });
}

function actualizarLista() {
  // GET xa lista actualizada
  fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo275')
    .then(response => response.json())
    .then(data => {
      let tbody = document.querySelector('#lista tbody');
      tbody.innerHTML = '';

      // Recorremos los datos y los agregamos a la tabla
      data.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.apellido}</td>
          <td>${item.grupo}</td>
          <td>${item.subgrupo}</td>
          <td><button alt="Eliminar" onclick="eliminarRegistro('${item._id}')">x</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}

function eliminarRegistro(id) {
  //eliminar el registro
  fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo275/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    // Actualizamos después de eliminar 
    actualizarLista();
  });
}
