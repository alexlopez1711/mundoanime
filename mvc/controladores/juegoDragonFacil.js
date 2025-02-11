(function() {
    const jsonUrlFacil = '../../modelos/preguntasTDragonFacil.json';

    let preguntasFacil = [];
    let preguntasSeleccionadasFacil = [];
    let preguntaActualFacil = 0;
    let aciertosFacil = 0;
    let tiempoFacil = 100;
    let timerIntervalFacil;
    let timerIniciadoFacil = false;

    async function cargarPreguntasFacil() {
        try {
            const response = await fetch(jsonUrlFacil);
            const data = await response.json();
            preguntasFacil = data.preguntasDragonFacil;

            if (!Array.isArray(preguntasFacil) || preguntasFacil.length === 0) {
                console.error('Error: la clave "preguntasTOneFacil" no es un array o está vacía', preguntasFacil);
                return;
            }

            seleccionarPreguntasAleatoriasFacil();
            mostrarPreguntaFacil();
        } catch (error) {
            console.error('Error al cargar las preguntas:', error);
        }
    }

    function seleccionarPreguntasAleatoriasFacil() {
        const preguntasClonadas = [...preguntasFacil];
        preguntasSeleccionadasFacil = [];
        for (let i = 0; i < 15; i++) {
            if (preguntasClonadas.length === 0) {
                console.error('No hay suficientes preguntas para seleccionar');
                break;
            }
            const indiceAleatorio = Math.floor(Math.random() * preguntasClonadas.length);
            const preguntaSeleccionada = preguntasClonadas.splice(indiceAleatorio, 1)[0];

            if (preguntaSeleccionada) {
                preguntasSeleccionadasFacil.push(preguntaSeleccionada);
            }
        }

        console.log('Preguntas seleccionadas (nivel fácil):', preguntasSeleccionadasFacil);

        if (preguntasSeleccionadasFacil.length === 0) {
            console.error('Error: No se seleccionaron preguntas');
        }
    }

    function iniciarTemporizadorFacil() {
        document.getElementById('tiempoTFacil').innerText = `Tiempo: ${tiempoFacil} Segundos`;
        timerIntervalFacil = setInterval(() => {
            tiempoFacil--;
            document.getElementById('tiempoTFacil').innerText = `Tiempo: ${tiempoFacil} Segundos`;
            if (tiempoFacil <= 0) {
                clearInterval(timerIntervalFacil);
                loseAudio.play();
                Swal.fire({
                imageUrl: "https://www.descargarstickers.com/src_img/2020/08/074967.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: 'Perdiste',
                text: '¡Eres un gerrero de clase BAJA!',
                });
                reiniciarJuegoTfFacil();
            }
        }, 1000);
    }

    function mostrarPreguntaFacil() {
        if (preguntaActualFacil >= preguntasSeleccionadasFacil.length) {
            clearInterval(timerIntervalFacil);
            if (aciertosFacil >= 12) {
                winAudio.play();
                Swal.fire({
                    imageUrl: "https://e1.pngegg.com/pngimages/762/105/png-clipart-dragon-ball-z-chibis-chbi-goku-turns-ssj-by-vejit-d3af02l-icon.png",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    title: '¡Ganaste!',
                    text: '¡Ya sabes qué tan fuertes son los Saiyajin!',
                    draggable: true
                });
            } else {
                loseAudio.play();
                Swal.fire({
                imageUrl: "https://www.descargarstickers.com/src_img/2020/08/074967.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: 'Perdiste',
                text: '¡Eres un gerrero de clase BAJA!',
                });
            }
            reiniciarJuegoTfFacil();
            return;
        }

        const pregunta = preguntasSeleccionadasFacil[preguntaActualFacil];

        if (!pregunta) {
            console.error("La pregunta seleccionada no está definida. Estado del array preguntasSeleccionadasFacil:", preguntasSeleccionadasFacil);
            return;
        }

        if (!pregunta.posiblesRespuestas) {
            console.error("La pregunta no tiene posiblesRespuestas: ", pregunta);
            return;
        }

        const posiblesRespuestas = Object.entries(pregunta.posiblesRespuestas);
        if (posiblesRespuestas.length === 0) {
            console.error("No hay posiblesRespuestas para la pregunta: ", pregunta);
            return;
        }

        document.getElementById('question-imageFacil').src = pregunta.imagen;
        document.getElementById('preguntaTFacil').innerText = pregunta.pregunta;

        const respuestasMezcladas = posiblesRespuestas.sort(() => Math.random() - 0.5);

        const botones = [
            document.getElementById('opcion1'),
            document.getElementById('opcion2'),
            document.getElementById('opcion3'),
            document.getElementById('opcion4')
        ];

        botones.forEach((boton, index) => {
            boton.innerText = respuestasMezcladas[index][1];
            boton.className = 'answer-btn';
            boton.onclick = () => {
                if (!timerIniciadoFacil) {
                    iniciarTemporizadorFacil();
                    timerIniciadoFacil = true;
                }
                verificarRespuestaFacil(respuestasMezcladas[index][0], boton);
            };
        });
    }

    function verificarRespuestaFacil(respuesta, botonSeleccionado) {
        const pregunta = preguntasSeleccionadasFacil[preguntaActualFacil];
        const botones = [
            document.getElementById('opcion1'),
            document.getElementById('opcion2'),
            document.getElementById('opcion3'),
            document.getElementById('opcion4')
        ];

        if (respuesta === pregunta.respuestaCorresta) {
            aciertosFacil++;
            botonSeleccionado.classList.add('correct');
            rightAudio.play();
        } else {
            botonSeleccionado.classList.add('incorrect');
            botones.forEach(boton => {
                if (boton.innerText === pregunta.posiblesRespuestas[pregunta.respuestaCorresta]) {
                    boton.classList.add('correct');
                }
            });
            wrongAudio.play();
        }

        setTimeout(() => {
            preguntaActualFacil++;
            actualizarEstadisticasFacil();
            mostrarPreguntaFacil();
        }, 2000);
    }

    function actualizarEstadisticasFacil() {
        document.getElementById('preguntasTfacil').innerText = `Preguntas: ${preguntaActualFacil}/15`;
        document.getElementById('aciertosTfacil').innerText = `Aciertos: ${aciertosFacil}/15`;
    }

    function reiniciarJuegoTfFacil() {
        clearInterval(timerIntervalFacil);
        preguntaActualFacil = 0;
        aciertosFacil = 0;
        tiempoFacil = 100;
        timerIniciadoFacil = false;
        actualizarEstadisticasFacil();
        seleccionarPreguntasAleatoriasFacil();
        mostrarPreguntaFacil();
        winAudio.play();
    }

    window.nivelFacilCargarPreguntas = cargarPreguntasFacil;
    window.nivelFacilReiniciarJuego = reiniciarJuegoTfFacil;

})();