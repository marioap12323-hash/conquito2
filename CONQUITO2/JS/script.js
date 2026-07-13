const formulario = document.getElementById('formTarea');
const lista = document.getElementById('listaTareas');
const mensaje = document.getElementById('mensaje');
let tareas = [];

if (!formulario || !lista || !mensaje) {
    console.error('No se encontraron los elementos necesarios para la app.');
} else {
    formulario.addEventListener('submit', agregarTarea);

    function agregarTarea(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const prioridad = document.getElementById('prioridad').value;
        const fecha = document.getElementById('fecha').value;

        if (nombre === '' || fecha === '') {
            mensaje.textContent = 'Por favor, complete el nombre y la fecha de la tarea.';
            return;
        }

        mensaje.textContent = '';
        tareas.push({
            nombre,
            prioridad,
            fecha,
            estado: false
        });
        formulario.reset();
        mostrarTareas();
    }

    function mostrarTareas() {
        lista.innerHTML = '';

        const total = tareas.length;
        const completadas = tareas.filter((tarea) => tarea.estado).length;
        const pendientes = total - completadas;

        const totalEl = document.getElementById('total');
        const pendientesEl = document.getElementById('pendientes');
        const completadasEl = document.getElementById('completadas');

        if (totalEl) totalEl.textContent = total;
        if (pendientesEl) pendientesEl.textContent = pendientes;
        if (completadasEl) completadasEl.textContent = completadas;

        if (total === 0) {
            lista.innerHTML = '<p>No hay tareas aún.</p>';
            return;
        }

        tareas.forEach((tarea, index) => {
            const tareaElemento = document.createElement('article');
            tareaElemento.className = 'tarea';
            tareaElemento.innerHTML = `
                <h4>${tarea.nombre}</h4>
                <p>Prioridad: ${tarea.prioridad}</p>
                <p>Fecha: ${tarea.fecha}</p>
                <p>Estado: ${tarea.estado ? 'Completada' : 'Pendiente'}</p>
                <button type="button" data-index="${index}" class="boton-estado">
                    ${tarea.estado ? 'Marcar pendiente' : 'Marcar completada'}
                </button>
            `;
            lista.appendChild(tareaElemento);
        });

        lista.querySelectorAll('.boton-estado').forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = Number(e.currentTarget.dataset.index);
                tareas[index].estado = !tareas[index].estado;
                mostrarTareas();
            });
        });
    }

    mostrarTareas();
}
