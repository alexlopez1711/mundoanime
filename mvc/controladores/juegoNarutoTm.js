(function() {
    const jsonUrlMedio = '../../modelos/preguntasTNarutoMedio.json';

    let preguntasMedio = [];
    let preguntasSeleccionadasMedio = [];
    let preguntaActualMedio = 0;
    let aciertosMedio = 0;
    let tiempoMedio = 140;
    let timerIntervalMedio;
    let timerIniciadoMedio = false;

    async function cargarPreguntasMedio() {
        try {
            const response = await fetch(jsonUrlMedio);
            const data = await response.json();
            preguntasMedio = data.preguntasTNarutoMedio;

            if (!Array.isArray(preguntasMedio) || preguntasMedio.length === 0) {
                console.error('Error: la clave "preguntasTOneMedio" no es un array o está vacía', preguntasMedio);
                return;
            }

            seleccionarPreguntasAleatoriasMedio();
            mostrarPreguntaMedio();
        } catch (error) {
            console.error('Error al cargar las preguntas:', error);
        }
    }

    function seleccionarPreguntasAleatoriasMedio() {
        const preguntasClonadas = [...preguntasMedio];
        preguntasSeleccionadasMedio = [];
        for (let i = 0; i < 20; i++) {
            if (preguntasClonadas.length === 0) {
                console.error('No hay suficientes preguntas para seleccionar');
                break;
            }
            const indiceAleatorio = Math.floor(Math.random() * preguntasClonadas.length);
            const preguntaSeleccionada = preguntasClonadas.splice(indiceAleatorio, 1)[0];

            if (preguntaSeleccionada) {
                preguntasSeleccionadasMedio.push(preguntaSeleccionada);
            }
        }

        console.log('Preguntas seleccionadas (nivel medio):', preguntasSeleccionadasMedio);

        if (preguntasSeleccionadasMedio.length === 0) {
            console.error('Error: No se seleccionaron preguntas');
        }
    }

    function iniciarTemporizadorMedio() {
        document.getElementById('tiempoTMedio').innerText = `Tiempo: ${tiempoMedio} Segundos`;
        timerIntervalMedio = setInterval(() => {
            tiempoMedio--;
            document.getElementById('tiempoTMedio').innerText = `Tiempo: ${tiempoMedio} Segundos`;
            if (tiempoMedio <= 0) {
                clearInterval(timerIntervalMedio);
                loseAudio.play();
                Swal.fire({
                imageUrl: "https://www.fotosdememes.com/wp-content/uploads/2021/07/te-falta-odio.jpg",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: 'Perdiste',
                text: '¡Nunca seras Hokage!',
                });
                reiniciarJuegoTfMedio();
            }
        }, 1000);
    }

    function mostrarPreguntaMedio() {
        if (preguntaActualMedio >= preguntasSeleccionadasMedio.length) {
            clearInterval(timerIntervalMedio);
            if (aciertosMedio >= 16) {
                winAudio.play();
                Swal.fire({
                  imageUrl: "https://i.pinimg.com/originals/02/07/2a/02072a87d479f3b0da5ae73160107b18.png",
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: '¡Ganaste!',
                  text: 'Eres un Jōnin. Un paso mas cerca de ser Hokage',
                  draggable: true
                });
            } else {
                loseAudio.play();
                Swal.fire({
                imageUrl: "https://www.fotosdememes.com/wp-content/uploads/2021/07/te-falta-odio.jpg",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: 'Perdiste',
                text: '¡Nunca seras Hokage!',
                });
            }
            reiniciarJuegoTfMedio();
            return;
        }

        const pregunta = preguntasSeleccionadasMedio[preguntaActualMedio];

        if (!pregunta) {
            console.error("La pregunta seleccionada no está definida. Estado del array preguntasSeleccionadasMedio:", preguntasSeleccionadasMedio);
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

        document.getElementById('question-imageMedio').src = pregunta.imagen;
        document.getElementById('preguntaTMedio').innerText = pregunta.pregunta;

        const respuestasMezcladas = posiblesRespuestas.sort(() => Math.random() - 0.5);

        const botones = [
            document.getElementById('opcionMedio1'),
            document.getElementById('opcionMedio2'),
            document.getElementById('opcionMedio3'),
            document.getElementById('opcionMedio4')
        ];

        botones.forEach((boton, index) => {
            boton.innerText = respuestasMezcladas[index][1];
            boton.className = 'answer-btn';
            boton.onclick = () => {
                if (!timerIniciadoMedio) {
                    iniciarTemporizadorMedio();
                    timerIniciadoMedio = true;
                }
                verificarRespuestaMedio(respuestasMezcladas[index][0], boton);
            };
        });
    }

    function verificarRespuestaMedio(respuesta, botonSeleccionado) {
        const pregunta = preguntasSeleccionadasMedio[preguntaActualMedio];
        const botones = [
            document.getElementById('opcionMedio1'),
            document.getElementById('opcionMedio2'),
            document.getElementById('opcionMedio3'),
            document.getElementById('opcionMedio4')
        ];

        if (respuesta === pregunta.respuestaCorresta) {
            aciertosMedio++;
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
            preguntaActualMedio++;
            actualizarEstadisticasMedio();
            mostrarPreguntaMedio();
        }, 2000);
    }

    function actualizarEstadisticasMedio() {
        document.getElementById('preguntasTMedio').innerText = `Preguntas: ${preguntaActualMedio}/20`;
        document.getElementById('aciertosTMedio').innerText = `Aciertos: ${aciertosMedio}/20`;
    }

    function reiniciarJuegoTfMedio() {
        clearInterval(timerIntervalMedio);
        preguntaActualMedio = 0;
        aciertosMedio = 0;
        tiempoMedio = 140;
        timerIniciadoMedio = false;
        actualizarEstadisticasMedio();
        seleccionarPreguntasAleatoriasMedio();
        mostrarPreguntaMedio();
        winAudio.play();
    }

    window.nivelMedioCargarPreguntas = cargarPreguntasMedio;
    window.nivelMedioReiniciarJuego = reiniciarJuegoTfMedio;

})();