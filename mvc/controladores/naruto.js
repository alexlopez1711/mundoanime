let selectedImage = '';

// const imageInput = document.getElementById("image-input");
const nameInput = document.getElementById("name-input");
const submitButton = document.getElementById("submit-button");
const cardImage = document.getElementById("card-image");
const cardName = document.getElementById("card-name");
const modal = document.getElementById("modal");
const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const closeButton = document.querySelector(".close-button");
const myForm = document.getElementById("my-form");
const showImagesButton = document.getElementById("show-images");
const showImages = document.querySelector("#show-images");

overlay.style.display = "block";
modal.style.display = "block";

submitButton.classList.add("hidden");
showImages.addEventListener("click", (event) => {
  submitButton.classList.remove("hidden");
});

const images = document.querySelectorAll(".img1");
images.forEach((image) => {
  image.addEventListener("click", (event) => {
    images.forEach((image) => {
      image.classList.remove("selected-image");
    });
    event.target.classList.add("selected-image");
    selectedImage = event.target.src;
  });
});


submitButton.addEventListener("click", () => {
  cardImage.src = selectedImage;
  cardName.innerHTML = nameInput.value;
  modal.style.display = "none";
  card.style.display = "block";
});



closeButton.addEventListener("click", () => {
  overlay.style.display = "none";
  modal.style.display = "none";
});



showImagesButton.addEventListener("click", function() {
  images.forEach(function(image) {
    image.classList.remove("hidden");
  });
}); 

let memoriaVisible = false;
let triviaVisible = false;

function elegirDificultadMemoria() {
    const memoriaGames = document.querySelector('.MemoriaGames');
    const triviaGames = document.querySelector('.TriviaGames');

    if (memoriaVisible) {
        memoriaGames.style.display = 'none';
        memoriaVisible = false;
    } else {
        memoriaGames.style.display = 'block';
        triviaGames.style.display = 'none';
        memoriaVisible = true;
        triviaVisible = false;
        ocultarSeccionesTrivia(); // Oculta secciones de trivia
    }
}

function elegirDificultadTrivia() {
    const memoriaGames = document.querySelector('.MemoriaGames');
    const triviaGames = document.querySelector('.TriviaGames');

    if (triviaVisible) {
        triviaGames.style.display = 'none';
        triviaVisible = false;
    } else {
        triviaGames.style.display = 'block';
        memoriaGames.style.display = 'none';
        triviaVisible = true;
        memoriaVisible = false;
        ocultarSeccionesMemoria(); // Oculta secciones de memoria
    }
}

function nivelFacilMemoria() {
    ocultarSeccionesMemoria();
    document.querySelector('.NivelFacilMemoria').style.display = 'block';
}

function nivelDificilMemoria() {
    ocultarSeccionesMemoria();
    document.querySelector('.NivelDificilMemoria').style.display = 'block';
}

function nivelExpertoMemoria() {
    ocultarSeccionesMemoria();
    document.querySelector('.nivelExpertoMemoria').style.display = 'block';
}

function nivelFacilTrivia() {
    ocultarSeccionesTrivia();
    document.querySelector('.NivelFacilTrivia').style.display = 'block';
}

function nivelDificilTrivia() {
    ocultarSeccionesTrivia();
    document.querySelector('.NivelDificilTrivia').style.display = 'block';
}

function nivelExpertoTrivia() {
    ocultarSeccionesTrivia();
    document.querySelector('.nivelExpertoTrivia').style.display = 'block';
}

function ocultarSeccionesMemoria() {
    document.querySelector('.NivelFacilMemoria').style.display = 'none';
    document.querySelector('.NivelDificilMemoria').style.display = 'none';
    document.querySelector('.nivelExpertoMemoria').style.display = 'none';
}

function ocultarSeccionesTrivia() {
    document.querySelector('.NivelFacilTrivia').style.display = 'none';
    document.querySelector('.NivelDificilTrivia').style.display = 'none';
    document.querySelector('.nivelExpertoTrivia').style.display = 'none';
}

function nivelFacilTrivia() {
    ocultarSeccionesTrivia();
    const nivelFacil = document.querySelector('.NivelFacilTrivia');
    if (nivelFacil) {
        nivelFacil.style.display = 'block';
    }
}

function nivelDificilTrivia() {
    ocultarSeccionesTrivia();
    const nivelDificil = document.querySelector('.NivelDificilTrivia');
    if (nivelDificil) {
        nivelDificil.style.display = 'block';
    }
}

function nivelExpertoTrivia() {
    ocultarSeccionesTrivia();
    const nivelExperto = document.querySelector('.NivelExpertoTrivia');
    if (nivelExperto) {
        nivelExperto.style.display = 'block';
    }
}

function ocultarSeccionesTrivia() {
    const niveles = document.querySelectorAll('.NivelFacilTrivia, .NivelDificilTrivia, .NivelExpertoTrivia');
    niveles.forEach(nivel => {
        nivel.style.display = 'none';
    });
}


let voltearCartaFacil = 0;
let tarjeta1Facil = null;
let tarjeta2Facil = null;
let primerResultadoFacil = null;
let segundoResultadoFacil = null;
let tarjetasDestapadasFacil = 0; // Define la variable aquí
let movimientosfaciles = 0;
let aciertosfaciles = 0;
let tiempofaciles = false;
let timerFacil = 50;
let timerinicial = 50;
let tiempoRegresivoFacilId = null;
let winAudio = new Audio ('../sonidos/win.wav')
let loseAudio = new Audio ('../sonidos/lose.wav')
let clickAudio = new Audio ('../sonidos/click.wav')
let rightAudio = new Audio ('../sonidos/right.wav')
let wrongAudio = new Audio ('../sonidos/wrong.wav')




let mostrarMovimientosFacil = document.getElementById("movimientosfaciles");
let mostrarAciertosFaciles = document.getElementById("aciertosfaciles");
let mostrarTiempoFacil = document.getElementById("tiempofaciles");

let numeroFacil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeroFacil = numeroFacil.sort(() => {
    return Math.random() - 0.5;
});

function contarTiempoFacil() {
    tiempoRegresivoFacilId = setInterval(() => {
        timerFacil--;
        mostrarTiempoFacil.innerHTML = `Tiempo: ${timerFacil} Segundos`;
        if (timerFacil == 0) {
            clearInterval(tiempoRegresivoFacilId);
            bloquearTarjetasFacil();
            loseAudio.play();

        }
    }, 1000);
}

function bloquearTarjetasFacil() {
  for (let i = 0; i <= 15; i++) {
      let tarjetaBloqueadaFacil = document.getElementById(i);
      tarjetaBloqueadaFacil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${numeroFacil[i]}.jpg">`;
      tarjetaBloqueadaFacil.disabled = true;
  }
}

function destaparFacil(id) {
  if (tiempofaciles == false) {
      contarTiempoFacil();
      tiempofaciles = true;
  }
  tarjetasDestapadasFacil++;
  if (tarjetasDestapadasFacil == 1) {
      tarjeta1Facil = document.getElementById(id);
      primerResultadoFacil = numeroFacil[id];
      tarjeta1Facil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${primerResultadoFacil}.jpg">`;
      clickAudio.play();
      tarjeta1Facil.disabled = true;
  } else if (tarjetasDestapadasFacil == 2) {
      tarjeta2Facil = document.getElementById(id);
      segundoResultadoFacil = numeroFacil[id];
      tarjeta2Facil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${segundoResultadoFacil}.jpg">`;
      clickAudio.play();
      tarjeta2Facil.disabled = true;
      movimientosfaciles++;
      mostrarMovimientosFacil.innerHTML = `Movimientos: ${movimientosfaciles}`;
      
      if(primerResultadoFacil == segundoResultadoFacil){
        tarjetasDestapadasFacil = 0;
        aciertosfaciles++;
        rightAudio.play();
        mostrarAciertosFaciles.innerHTML =  `Aciertos: ${aciertosfaciles} `;

        if (aciertosfaciles == 8){
          clearInterval(tiempoRegresivoFacilId);
          mostrarAciertosFaciles.innerHTML=  `Aciertos: ${aciertosfaciles} `;
          mostrarMovimientosFacil.innerHTML = `Usaste:  ${movimientosfaciles} Movimientos`;
          mostrarTiempoFacil.innerHTML = `Te Tardaste  ${timerinicial - timerFacil} Segundos`;
          winAudio.play();
        }

      }else {
         setTimeout(() => {
          tarjeta1Facil.innerHTML = "";
          tarjeta2Facil.innerHTML = "";
          tarjeta1Facil.disabled = false;
          tarjeta2Facil.disabled = false;
          tarjetasDestapadasFacil = 0;
          wrongAudio.play();
         },700)
      }



      // Aquí puedes agregar la lógica para verificar coincidencias y otros comportamientos.
  }
}
function reiniciarJuegoFacil() {
  // Restablecer todas las variables
  voltearCartaFacil = 0;
  tarjeta1Facil = null;
  tarjeta2Facil = null;
  primerResultadoFacil = null;
  segundoResultadoFacil = null;
  tarjetasDestapadasFacil = 0;
  movimientosfaciles = 0;
  aciertosfaciles = 0;
  tiempofaciles = false;
  timerFacil = timerinicial;
  winAudio.play();

  // Actualizar las estadísticas en pantalla
  mostrarMovimientosFacil.innerHTML = `Movimientos: 0`;
  mostrarAciertosFaciles.innerHTML = `Aciertos: 0`;
  mostrarTiempoFacil.innerHTML = `Tiempo: ${timerinicial} Segundos`;

  // Barajar nuevamente las tarjetas
  numeroFacil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  numeroFacil = numeroFacil.sort(() => Math.random() - 0.5);

  // Restablecer el contenido de todas las tarjetas
  for (let i = 0; i <= 15; i++) {
      let tarjeta = document.getElementById(i);
      tarjeta.innerHTML = "";
      tarjeta.disabled = false;
  }

  // Detener cualquier temporizador en curso
  if (tiempoRegresivoFacilId !== null) {
      clearInterval(tiempoRegresivoFacilId);
  }
}




let voltearCartaDificil = 0;
let tarjeta1Dificil = null;
let tarjeta2Dificil = null;
let primerResultadoDificil = null;
let segundoResultadoDificil = null;
let tarjetasDestapadasDificil = 0;
let movimientosdificiles = 0;
let aciertosdificiles = 0;
let tiempodificiles = false;
let timerDificil = 50;
let timerinicialDificil = 50;
let tiempoRegresivoDificilId = null;

let mostrarMovimientosDificil = document.getElementById("movimientosdificiles");
let mostrarAciertosDificil = document.getElementById("aciertosdificiles");
let mostrarTiempoDificil = document.getElementById("tiempodificiles");

let numeroDificil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
numeroDificil = numeroDificil.sort(() => Math.random() - 0.5);

function contarTiempoDificil() {
    tiempoRegresivoDificilId = setInterval(() => {
        timerDificil--;
        mostrarTiempoDificil.innerHTML = `Tiempo: ${timerDificil} Segundos`;
        if (timerDificil == 0) {
            clearInterval(tiempoRegresivoDificilId);
            bloquearTarjetasDificil();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetasDificil() {
    for (let i = 16; i <= 35; i++) {
        let tarjetaBloqueadaDificil = document.getElementById(i);
        tarjetaBloqueadaDificil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${numeroDificil[i - 16]}.jpg">`;
        tarjetaBloqueadaDificil.disabled = true;
    }
}

function destaparDificil(id) {
    if (tiempodificiles == false) {
        contarTiempoDificil();
        tiempodificiles = true;
    }
    tarjetasDestapadasDificil++;
    if (tarjetasDestapadasDificil == 1) {
        tarjeta1Dificil = document.getElementById(id);
        primerResultadoDificil = numeroDificil[id - 16];
        tarjeta1Dificil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${primerResultadoDificil}.jpg">`;
        clickAudio.play();
        tarjeta1Dificil.disabled = true;
    } else if (tarjetasDestapadasDificil == 2) {
        tarjeta2Dificil = document.getElementById(id);
        segundoResultadoDificil = numeroDificil[id - 16];
        tarjeta2Dificil.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${segundoResultadoDificil}.jpg">`;
        clickAudio.play();
        tarjeta2Dificil.disabled = true;
        movimientosdificiles++;
        mostrarMovimientosDificil.innerHTML = `Movimientos: ${movimientosdificiles}`;
        
        if(primerResultadoDificil == segundoResultadoDificil) {
            tarjetasDestapadasDificil = 0;
            aciertosdificiles++;
            rightAudio.play();
            mostrarAciertosDificil.innerHTML = `Aciertos: ${aciertosdificiles}`;

            if (aciertosdificiles == 10) {
                clearInterval(tiempoRegresivoDificilId);
                mostrarAciertosDificil.innerHTML = `Aciertos: ${aciertosdificiles}`;
                mostrarMovimientosDificil.innerHTML = `Usaste: ${movimientosdificiles} Movimientos`;
                mostrarTiempoDificil.innerHTML = `Te Tardaste ${timerinicialDificil - timerDificil} Segundos`;
                winAudio.play();
            }
        } else {
            setTimeout(() => {
                tarjeta1Dificil.innerHTML = "";
                tarjeta2Dificil.innerHTML = "";
                tarjeta1Dificil.disabled = false;
                tarjeta2Dificil.disabled = false;
                tarjetasDestapadasDificil = 0;
                wrongAudio.play();
            }, 700);
        }
    }
}

function reiniciarJuegoDificil() {
    voltearCartaDificil = 0;
    tarjeta1Dificil = null;
    tarjeta2Dificil = null;
    primerResultadoDificil = null;
    segundoResultadoDificil = null;
    tarjetasDestapadasDificil = 0;
    movimientosdificiles = 0;
    aciertosdificiles = 0;
    tiempodificiles = false;
    timerDificil = timerinicialDificil;
    winAudio.play();

    mostrarMovimientosDificil.innerHTML = `Movimientos: 0`;
    mostrarAciertosDificil.innerHTML = `Aciertos: 0`;
    mostrarTiempoDificil.innerHTML = `Tiempo: ${timerinicialDificil} Segundos`;

    numeroDificil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
    numeroDificil = numeroDificil.sort(() => Math.random() - 0.5);

    for (let i = 16; i <= 35; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = "";
        tarjeta.disabled = false;
    }

    if (tiempoRegresivoDificilId !== null) {
        clearInterval(tiempoRegresivoDificilId);
    }
}




let voltearCartaExperto = 0;
let tarjeta1Experto = null;
let tarjeta2Experto = null;
let primerResultadoExperto = null;
let segundoResultadoExperto = null;
let tarjetasDestapadasExperto = 0;
let movimientoSexpertos = 0;
let aciertoSexpertos = 0;
let tiempoExpertos = false;
let timerExperto = 70;
let timerInicialExperto = 70;
let tiempoRegresivoExpertoId = null;

let mostrarMovimientosExperto = document.getElementById("movimientosexpertos");
let mostrarAciertosExperto = document.getElementById("aciertosexpertos");
let mostrarTiempoExperto = document.getElementById("tiempoexpertos");

let numeroExperto = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
    6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 14, 14, 15, 15
];
numeroExperto = numeroExperto.sort(() => Math.random() - 0.5);

function contarTiempoExperto() {
    tiempoRegresivoExpertoId = setInterval(() => {
        timerExperto--;
        mostrarTiempoExperto.innerHTML = `Tiempo: ${timerExperto} Segundos`;
        if (timerExperto == 0) {
            clearInterval(tiempoRegresivoExpertoId);
            bloquearTarjetasExperto();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetasExperto() {
    for (let i = 36; i <= 65; i++) {
        let tarjetaBloqueadaExperto = document.getElementById(i);
        tarjetaBloqueadaExperto.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${numeroExperto[i - 36]}.jpg">`;
        tarjetaBloqueadaExperto.disabled = true;
    }
}

function destaparExperto(id) {
    if (tiempoExpertos == false) {
        contarTiempoExperto();
        tiempoExpertos = true;
    }
    tarjetasDestapadasExperto++;
    if (tarjetasDestapadasExperto == 1) {
        tarjeta1Experto = document.getElementById(id);
        primerResultadoExperto = numeroExperto[id - 36];
        tarjeta1Experto.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${primerResultadoExperto}.jpg">`;
        clickAudio.play();
        tarjeta1Experto.disabled = true;
    } else if (tarjetasDestapadasExperto == 2) {
        tarjeta2Experto = document.getElementById(id);
        segundoResultadoExperto = numeroExperto[id - 36];
        tarjeta2Experto.innerHTML = `<img src="../img/modalimg/naruto/narutoMemoria/${segundoResultadoExperto}.jpg">`;
        clickAudio.play();
        tarjeta2Experto.disabled = true;
        movimientoSexpertos++;
        mostrarMovimientosExperto.innerHTML = `Movimientos: ${movimientoSexpertos}`;
        
        if (primerResultadoExperto == segundoResultadoExperto) {
            tarjetasDestapadasExperto = 0;
            aciertoSexpertos++;
            rightAudio.play();
            mostrarAciertosExperto.innerHTML = `Aciertos: ${aciertoSexpertos}`;

            if (aciertoSexpertos == 15) {
                clearInterval(tiempoRegresivoExpertoId);
                mostrarAciertosExperto.innerHTML = `Aciertos: ${aciertoSexpertos}`;
                mostrarMovimientosExperto.innerHTML = `Usaste: ${movimientoSexpertos} Movimientos`;
                mostrarTiempoExperto.innerHTML = `Te Tardaste ${timerInicialExperto - timerExperto} Segundos`;
                winAudio.play();
            }
        } else {
            setTimeout(() => {
                tarjeta1Experto.innerHTML = "";
                tarjeta2Experto.innerHTML = "";
                tarjeta1Experto.disabled = false;
                tarjeta2Experto.disabled = false;
                tarjetasDestapadasExperto = 0;
                wrongAudio.play();
            }, 700);
        }
    }
}

function reiniciarJuegoExperto() {
    voltearCartaExperto = 0;
    tarjeta1Experto = null;
    tarjeta2Experto = null;
    primerResultadoExperto = null;
    segundoResultadoExperto = null;
    tarjetasDestapadasExperto = 0;
    movimientoSexpertos = 0;
    aciertoSexpertos = 0;
    tiempoExpertos = false;
    timerExperto = timerInicialExperto;
    winAudio.play();

    mostrarMovimientosExperto.innerHTML = `Movimientos: 0`;
    mostrarAciertosExperto.innerHTML = `Aciertos: 0`;
    mostrarTiempoExperto.innerHTML = `Tiempo: ${timerInicialExperto} Segundos`;

    numeroExperto = [
        1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
        6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
        11, 11, 12, 12, 13, 13, 14, 14, 15, 15
    ];
    numeroExperto = numeroExperto.sort(() => Math.random() - 0.5);

    for (let i = 36; i <= 65; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = "";
        tarjeta.disabled = false;
    }

    if (tiempoRegresivoExpertoId !== null) {
        clearInterval(tiempoRegresivoExpertoId);
    }
}
