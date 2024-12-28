document.querySelectorAll('.divini a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Previene la redirección inmediata
        var href = this.getAttribute('href'); // Guarda la URL de redirección

        // Oculta la imagen de fondo
        var backgroundImage = this.querySelector('img:not([id^="loading"])');
        backgroundImage.style.display = 'none';

        // Muestra el GIF de carga
        var loadingGif = this.querySelector('img[id^="loading"]');
        loadingGif.style.display = 'block';

        // Elimina el borde del div
        this.parentElement.style.border = 'none';

        setTimeout(function() {
            window.location.href = href; // Redirige a la otra página después de 3 segundos
        }, 4200); // 3000 milisegundos equivalen a 3 segundos
    });
});



// Función para abrir el modal
let posicionPersonaje = 0;
let data = {}; // Inicializa data como un objeto vacío

function abrirModal1() {
    fetch('mvc/modelos/modalNarutoPersonajes.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; // Asigna los datos cargados a la variable data

            // Obtener el personaje actual
            const personaje = data.personajes[posicionPersonaje];

            // Mostrar información en el modal
            document.getElementById('personajeNombreNaruto').textContent = `${personaje.nombre} ${personaje.apellido}`;
            document.getElementById('personajeImagenNaruto').src = personaje.imagen;
            document.getElementById('personajeAldeaNaruto').textContent = personaje.Aldea;
            document.getElementById('personajeClasificacionNaruto').textContent = personaje.Clasificación;
            document.getElementById('personajeAfiliacionesNaruto').textContent = personaje.Afiliaciones;
            document.getElementById('personajeTipoChakraNaruto').textContent = personaje["Tipo de chacra"];
            document.getElementById('personajeHabilidadesNaruto').textContent = personaje.Habilidades;
            
            // Mostrar el modal
            document.getElementById('myModalNaruto').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al cargar datos desde el archivo JSON:', error);
        });
}

function siguientePersonajeNaruto() {
    if (data.personajes) {
        // Avanzar al siguiente personaje (circular)
        posicionPersonaje = (posicionPersonaje + 1) % data.personajes.length;
        abrirModal1();
    } else {
        console.error('No se encontraron datos de personajes en el archivo JSON.');
    }
}

// Configura el evento de clic para el botón "Siguiente"
document.getElementById('siguienteBtnNaruto').addEventListener('click', siguientePersonajeNaruto);

function volverPersonajeNaruto() {
    // Resta 1 a la posición actual para mostrar el personaje anterior
    posicionPersonaje = (posicionPersonaje - 1 + data.personajes.length) % data.personajes.length;
    abrirModal1();
}
document.getElementById('volverBtnNaruto').addEventListener('click', volverPersonajeNaruto);


function abrirModal2() {
    fetch('mvc/modelos/modalDragonPersonajes.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; // Asigna los datos cargados a la variable data

            // Obtener el personaje actual
            const personaje = data.personajes[posicionPersonaje];

            // Mostrar información en el modal
            document.getElementById('personajeNombreGoku').textContent = `${personaje.nombre} ${personaje.apellidos}`;
            document.getElementById('personajeImagenGoku').src = personaje.imagen;
            document.getElementById('personajeEspecieGoku').textContent = personaje.Especie;
            document.getElementById('personajeHabilidadGoku').textContent = personaje.Habilidad;
            document.getElementById('personajeTransformacionGoku').textContent = personaje.Transformacion;
            document.getElementById('personajeNiveldePoderGoku').textContent = personaje["Nivel de Poder"];
            document.getElementById('personajePoderesGoku').textContent = personaje.Poderes;

            // Mostrar el modal
            document.getElementById('myModalGoku').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al cargar datos desde el archivo JSON:', error);
        });
}

function siguientePersonajeGoku() {
    if (data.personajes) {
        // Avanzar al siguiente personaje (circular)
        posicionPersonaje = (posicionPersonaje + 1) % data.personajes.length;
        abrirModal2();
    } else {
        console.error('No se encontraron datos de personajes en el archivo JSON.');
    }
}

// Configura el evento de clic para el botón "Siguiente"
document.getElementById('siguienteBtnGoku').addEventListener('click', siguientePersonajeGoku);

function volverPersonajeGoku() {
    // Resta 1 a la posición actual para mostrar el personaje anterior
    posicionPersonaje = (posicionPersonaje - 1 + data.personajes.length) % data.personajes.length;
    abrirModal2();
}
document.getElementById('volverBtnGoku').addEventListener('click', volverPersonajeGoku);


function abrirModal3() {
    fetch('mvc/modelos/modalOnePiecePersonajes.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;

            const personaje = data.personajes[posicionPersonaje];

            document.getElementById('personajeNombreLuffy').textContent = `${personaje.nombre} ${personaje.apellidos}`;
            document.getElementById('personajeImagenLuffy').src = personaje.imagen;
            document.getElementById('personajeSobreNombreLuffy').textContent = personaje.SobreNombre;
            document.getElementById('personajeRazaLuffy').textContent = personaje.Raza;
            document.getElementById('personajeAkumanomiLuffy').textContent = personaje["Akuma no mi"];
            document.getElementById('personajeHabilidadLuffy').textContent = personaje.Habilidad;
            document.getElementById('personajeHakiLuffy').textContent = personaje.Haki;
            document.getElementById('personajeTripulacionLuffy').textContent = personaje.Tripulacion;
            document.getElementById('personajeRecompensaLuffy').textContent = personaje.Recompensa;

            document.getElementById('myModalLuffy').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al cargar datos desde el archivo JSON:', error);
        });
}

document.getElementById('siguienteBtnLuffy').addEventListener('click', siguientePersonajeLuffy);

function volverPersonajeLuffy() {
    // Resta 1 a la posición actual para mostrar el personaje anterior
    posicionPersonaje = (posicionPersonaje - 1 + data.personajes.length) % data.personajes.length;
    abrirModal3();
}
document.getElementById('volverBtnLuffy').addEventListener('click', volverPersonajeLuffy);

function siguientePersonajeLuffy() {
    if (data.personajes) {
        // Avanzar al siguiente personaje (circular)
        posicionPersonaje = (posicionPersonaje + 1) % data.personajes.length;
        abrirModal3();
    } else {
        console.error('No se encontraron datos de personajes en el archivo JSON.');
    }
}


let currentVideoIndex = 0;
const videos = {
    modalNarutoVideos: [
        'https://www.youtube.com/embed/4t__wczfpRI',
        'https://www.youtube.com/embed/wzoIZO8WbI8',
        'https://www.youtube.com/embed/RiQrbSuLrsU',
        'https://www.youtube.com/embed/3mBwE41AXEk',
        'https://www.youtube.com/embed/XwJEFzsqNoY',
        'https://www.youtube.com/embed/pZaRs2bvy4U',
        'https://www.youtube.com/embed/V1XnVIgz_G4',
        'https://www.youtube.com/embed/kGGgOb61LP0',
        'https://www.youtube.com/embed/lilv4MvBY6E',
        'https://www.youtube.com/embed/ZKd5C6w7UvA',
        'https://www.youtube.com/embed/lilv4MvBY6E',
        'https://www.youtube.com/embed/_aIqW2DYlZA',
        'https://www.youtube.com/embed/pWyoHrMzAZQ',
        'https://www.youtube.com/embed/_kjd_3viXu0',
        'https://www.youtube.com/embed/pY15k20Hqq0',
        'https://www.youtube.com/embed/s2rCblHEYZs',
        'https://www.youtube.com/embed/yB2g22359Fg',
        'https://www.youtube.com/embed/TPYBJUT3XNw',
        'https://www.youtube.com/embed/QFgNsLrlds0',
        'https://www.youtube.com/embed/A7pi4-Et5lY',
        'https://www.youtube.com/embed/b5DOukHM3WE',
        'https://www.youtube.com/embed/xfI6B1Auh-k',
        'https://www.youtube.com/embed/xPNyvbkrFbY',
        'https://www.youtube.com/embed/2i0a9nPQLW8',
        'https://www.youtube.com/embed/j65Koam6avI',
        'https://www.youtube.com/embed/d36VwpOHpik',
        'https://www.youtube.com/embed/qAm4I-6LkYA',
        'https://www.youtube.com/embed/VMkg2F4QfIA',
        'https://www.youtube.com/embed/ocBWoIJul5M',
        'https://www.youtube.com/embed/_I1N2JFDBwU',
        'https://www.youtube.com/embed/c_UbPcln5ac',
        'https://www.youtube.com/embed/_I1N2JFDBwU',
        'https://www.youtube.com/embed/W5xxX4swaA4',
        'https://www.youtube.com/embed/BylkQHFemTw',
        'https://www.youtube.com/embed/rHB2vlTFEiA',
        'https://www.youtube.com/embed/3c95DbA3cjU',
        'https://www.youtube.com/embed/HuHun17X7uo',
        'https://www.youtube.com/embed/zVgKnfN9i34'
    ],
    modalDragonVideos: [
        'https://www.youtube.com/embed/bcg8Bt9b-fk',
        'https://www.youtube.com/embed/9ycqSTiCFns',
        'https://www.youtube.com/embed/cie7scVUdQE',
        'https://www.youtube.com/embed/-7VE3UoafmE',
        'https://www.youtube.com/embed/eaGh5e5Y4C4',
        'https://www.youtube.com/embed/yxNwwFISv3c',
        'https://www.youtube.com/embed/dhmdv2Qn9Ws',
        'https://www.youtube.com/embed/tKk1sodeBkc',
        'https://www.youtube.com/embed/YCb76CFuN9M',
        'https://www.youtube.com/embed/o3uhbXmmmW8'
    ],
    modalOnePieceVideos: [
        'https://www.youtube.com/embed/9tm-F6G-Q6c',
        'https://www.youtube.com/embed/QT9OawmZ_FY',
        'https://www.youtube.com/embed/D3g0khCibvo',
        'https://www.youtube.com/embed/47E41qseGtE',
        'https://www.youtube.com/embed/7JERctGBNYk',
        'https://www.youtube.com/embed/aectW46-Ph0?',
        'https://www.youtube.com/embed/AYhIPAs8JTU',
        'https://www.youtube.com/embed/R05QUl1ntuE',
        'https://www.youtube.com/embed/ToGv-rTBG0U',
        'https://www.youtube.com/embed/vcwFlUP9JI8',
        'https://www.youtube.com/embed/jGUPiVqWYms',
        'https://www.youtube.com/embed/zJl8Sb6IFHI',
        'https://www.youtube.com/embed/z300gb4eYMI',
        'https://www.youtube.com/embed/4uK2LYyk9vs',
        'https://www.youtube.com/embed/3XhEFTdFZls',
        'https://www.youtube.com/embed/stXbvYGvrxA',
        'https://www.youtube.com/embed/1yRn2N9BwRY',
        'https://www.youtube.com/embed/ru4bd6YyZY4',
        'https://www.youtube.com/embed/YFbno_aPm0w',
        'https://www.youtube.com/embed/vlUgEUk7yec',
        'https://www.youtube.com/embed/Tnk2zVXm_dc'
    ]
};

function abrirModalVideo(modalId) {
    const modal = document.getElementById(modalId);
    currentVideoIndex = 0; // Reiniciar el índice al abrir
    modal.style.display = "block"; // Mostrar el modal
    cargarVideo(modalId, currentVideoIndex);
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none"; // Ocultar el modal
}

function cargarVideo(modalId, index) {
    const iframe = document.getElementById(`${modalId}-iframe`);
    iframe.src = videos[modalId][index];
}

function siguienteVideo(modalId) {
    const totalVideos = videos[modalId].length;
    currentVideoIndex = (currentVideoIndex + 1) % totalVideos; // Avanzar al siguiente video
    cargarVideo(modalId, currentVideoIndex);
}

function videoAnterior(modalId) {
    const totalVideos = videos[modalId].length;
    currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos; // Retroceder al video anterior
    cargarVideo(modalId, currentVideoIndex);
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        cerrarModal(event.target.id);
    }
};
