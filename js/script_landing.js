// Función para abrir/cerrar el menú
function toggleMenu() {
    var menu = document.getElementById('menuHamburguesa');
    if (menu.style.left === '0px') {
        menu.style.left = '-250px'; // Cerrar el menú
    } else {
        menu.style.left = '0px'; // Abrir el menú
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Función para cambiar de contenido al hacer clic en el menú
    document.getElementById('menuInicio').addEventListener('click', function() {
        showSection('inicio');
    });

    document.getElementById('menuTareas').addEventListener('click', function() {
        showSection('tareas');
    });

    document.getElementById('menuUsuarios').addEventListener('click', function() {
        showSection('usuarios');
    });
});

// Función para mostrar la sección correspondiente
function showSection(sectionId) {
    // Ocultar todas las secciones y limpiar el contenido
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(section) {
        section.classList.remove('active'); // Remover la clase active de todas las secciones
    });

    // Limpiar el contenedor de contenido antes de cargar la nueva sección
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = '';

    // Mostrar la sección seleccionada
    var sectionElement = document.createElement('div');
    sectionElement.id = sectionId;
    sectionElement.classList.add('content-section', 'active'); // Añadir la clase active
    contenido.appendChild(sectionElement);

    // Lógica para cargar el contenido según la sección
    if (sectionId === 'usuarios') {
        loadSection('usuarios', sectionElement); // Cargar los datos de usuarios en la sección
    } else {
        sectionElement.innerHTML = `<h2>${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}</h2><p>Este es el contenido de la sección de ${sectionId}.</p>`;
    }
}

// Función para cargar los datos de usuarios
function loadSection(section, sectionElement) {
    fetch('secciones_landing/' + section + '.php')
        .then(response => response.text())
        .then(data => {
            sectionElement.innerHTML = data; // Insertar el contenido de la respuesta en la sección
        })
        .catch(error => {
            console.error('Error al cargar la sección:', error);
        });
}