(function () {
    const jsonUrlDificil = '../../modelos/preguntasTOnpieceDificil.json';

    let preguntasDificil = [];
    let preguntasSeleccionadasDificil = [];
    let preguntaActualDificil = 0;
    let aciertosDificil = 0;
    let tiempoDificil = 200;
    let timerIntervalDificil;
    let timerIniciadoDificil = false;

    async function cargarPreguntasDificil() {
        try {
            const response = await fetch(jsonUrlDificil);
            const data = await response.json();
            preguntasDificil = data.preguntasTOneDificil;

            if (!Array.isArray(preguntasDificil) || preguntasDificil.length === 0) {
                console.error('Error: la clave "preguntasTOneDificil" no es un array o está vacía', preguntasDificil);
                return;
            }

            seleccionarPreguntasAleatoriasDificil();
            mostrarPreguntaDificil();
        } catch (error) {
            console.error('Error al cargar las preguntas:', error);
        }
    }

    function seleccionarPreguntasAleatoriasDificil() {
        const preguntasClonadas = [...preguntasDificil];
        preguntasSeleccionadasDificil = [];
        for (let i = 0; i < 30; i++) { 
            if (preguntasClonadas.length === 0) {
                console.error('No hay suficientes preguntas para seleccionar');
                break;
            }
            const indiceAleatorio = Math.floor(Math.random() * preguntasClonadas.length);
            const preguntaSeleccionada = preguntasClonadas.splice(indiceAleatorio, 1)[0];

            if (preguntaSeleccionada) {
                preguntasSeleccionadasDificil.push(preguntaSeleccionada);
            }
        }

        console.log('Preguntas seleccionadas (nivel difícil):', preguntasSeleccionadasDificil);

        if (preguntasSeleccionadasDificil.length === 0) {
            console.error('Error: No se seleccionaron preguntas');
        }
    }

    function iniciarTemporizadorDificil() {
        document.getElementById('tiempoTDificil').innerText = `Tiempo: ${tiempoDificil} Segundos`;
        timerIntervalDificil = setInterval(() => {
            tiempoDificil--;
            document.getElementById('tiempoTDificil').innerText = `Tiempo: ${tiempoDificil} Segundos`;
            if (tiempoDificil <= 0) {
                clearInterval(timerIntervalDificil);
                loseAudio.play();
                Swal.fire({
                    imageUrl: "https://wallpaperaccess.com/full/4251321.jpg",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    title: 'Perdiste',
                    text: '¡Eres una basura Pirata!',
                });
                reiniciarJuegoTfDificil();
            }
        }, 1000);
    }

    function mostrarPreguntaDificil() {
        if (preguntaActualDificil >= preguntasSeleccionadasDificil.length) {
            clearInterval(timerIntervalDificil);
            if (aciertosDificil >= 24) { 
                winAudio.play();
                Swal.fire({
                    imageUrl: "https://i.pinimg.com/originals/79/f5/a4/79f5a49e85cbf1302d08555ef2a488fa.png",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    title: '¡Ganaste!',
                    text: '¡Otra conquista para los  Mugiwara!',
                    draggable: true
                });
            } else {
                loseAudio.play();
                Swal.fire({
                    imageUrl: "https://wallpaperaccess.com/full/4251321.jpg",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    title: 'Perdiste',
                    text: '¡Eres una basura Pirata!',
                });
            }
            reiniciarJuegoTfDificil();
            return;
        }

        const pregunta = preguntasSeleccionadasDificil[preguntaActualDificil];

        if (!pregunta) {
            console.error("La pregunta seleccionada no está definida. Estado del array preguntasSeleccionadasDificil:", preguntasSeleccionadasDificil);
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

        document.getElementById('question-imageDificil').src = pregunta.imagen;
        document.getElementById('preguntaTDificil').innerText = pregunta.pregunta;

        const respuestasMezcladas = posiblesRespuestas.sort(() => Math.random() - 0.5);

        const botones = [
            document.getElementById('opcionDificil1'),
            document.getElementById('opcionDificil2'),
            document.getElementById('opcionDificil3'),
            document.getElementById('opcionDificil4')
        ];

        botones.forEach((boton, index) => {
            boton.innerText = respuestasMezcladas[index][1];
            boton.className = 'answer-btn';
            boton.onclick = () => {
                if (!timerIniciadoDificil) {
                    iniciarTemporizadorDificil();
                    timerIniciadoDificil = true;
                }
                verificarRespuestaDificil(respuestasMezcladas[index][0], boton);
            };
        });
    }

    function verificarRespuestaDificil(respuesta, botonSeleccionado) {
        const pregunta = preguntasSeleccionadasDificil[preguntaActualDificil];
        const botones = [
            document.getElementById('opcionDificil1'),
            document.getElementById('opcionDificil2'),
            document.getElementById('opcionDificil3'),
            document.getElementById('opcionDificil4')
        ];

        if (respuesta === pregunta.respuestaCorresta) {
            aciertosDificil++;
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
            preguntaActualDificil++;
            actualizarEstadisticasDificil();
            mostrarPreguntaDificil();
        }, 2000);
    }

    function actualizarEstadisticasDificil() {
        document.getElementById('preguntasTDificil').innerText = `Preguntas: ${preguntaActualDificil}/30`;
        document.getElementById('aciertosTDificil').innerText = `Aciertos: ${aciertosDificil}/30`;
    }

    function reiniciarJuegoTfDificil() {
        clearInterval(timerIntervalDificil);
        preguntaActualDificil = 0;
        aciertosDificil = 0;
        tiempoDificil = 200;
        timerIniciadoDificil = false;
        actualizarEstadisticasDificil();
        seleccionarPreguntasAleatoriasDificil();
        mostrarPreguntaDificil();
        winAudio.play();
    }

    window.nivelDificilCargarPreguntas = cargarPreguntasDificil;
    window.nivelDificilReiniciarJuego = reiniciarJuegoTfDificil;

})();