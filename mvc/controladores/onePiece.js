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

// JavaScript
function elegirDificultad() {
  // Seleccionamos el primer (y único) elemento con la clase "MemoriaGames"
  var memoriaGames = document.getElementsByClassName("MemoriaGames")[0];
  
  // Comprobamos si el elemento está oculto y cambiamos la visibilidad
  if (memoriaGames.style.visibility === "visible") {
    memoriaGames.style.visibility = "hidden";
  } else {
    memoriaGames.style.visibility = "visible";
  }
}

function nivelFacil() {
  // Seleccionamos el primer (y único) elemento con la clase "MemoriaGames"
  var nivelFacilMemoria = document.getElementsByClassName("NivelFacilMemoria")[0];
  
  // Comprobamos si el elemento está oculto y cambiamos la visibilidad
  if (nivelFacilMemoria.style.visibility === "visible") {
    nivelFacilMemoria.style.visibility = "hidden";
  } else {
    nivelFacilMemoria.style.visibility = "visible";
  }
}

function nivelDificil() {
  // Seleccionamos el primer (y único) elemento con la clase "MemoriaGames"
  var NivelDificilMemoria = document.getElementsByClassName("NivelDificilMemoria")[0];
  
  // Comprobamos si el elemento está oculto y cambiamos la visibilidad
  if (NivelDificilMemoria.style.visibility === "visible") {
    NivelDificilMemoria.style.visibility = "hidden";
  } else {
    NivelDificilMemoria.style.visibility = "visible";
  }
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
      tarjetaBloqueadaFacil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${numeroFacil[i]}.jpg">`;
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
      tarjeta1Facil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${primerResultadoFacil}.jpg">`;
      clickAudio.play();
      tarjeta1Facil.disabled = true;
  } else if (tarjetasDestapadasFacil == 2) {
      tarjeta2Facil = document.getElementById(id);
      segundoResultadoFacil = numeroFacil[id];
      tarjeta2Facil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${segundoResultadoFacil}.jpg">`;
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

function destaparDificil(id) {
  if (tiempodificiles == false) {
      contarTiempoDificil();
      tiempodificiles = true;
  }
  tarjetasDestapadasDificil++;
  if (tarjetasDestapadasDificil == 1) {
      tarjeta1Dificil = document.getElementById(id);
      primerResultadoDificil = numeroDificil[id - 16];
      tarjeta1Dificil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${primerResultadoDificil}.jpg">`;
      clickAudio.play();
      tarjeta1Dificil.disabled = true;
  } else if (tarjetasDestapadasDificil == 2) {
      tarjeta2Dificil = document.getElementById(id);
      segundoResultadoDificil = numeroDificil[id - 16];
      tarjeta2Dificil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${segundoResultadoDificil}.jpg">`;
      clickAudio.play();
      tarjeta2Dificil.disabled = true;
      movimientosdificiles++;
      mostrarMovimientosDificil.innerHTML = `Movimientos: ${movimientosdificiles}`;
      
      if(primerResultadoDificil == segundoResultadoDificil){
        tarjetasDestapadasDificil = 0;
        aciertosdificiles++;
        rightAudio.play();
        mostrarAciertosDificil.innerHTML = `Aciertos: ${aciertosdificiles}`;

        if (aciertosdificiles == 12){
          clearInterval(tiempoRegresivoDificilId);
          mostrarAciertosDificil.innerHTML= `Aciertos: ${aciertosdificiles}`;
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

  mostrarMovimientosDificil.innerHTML = `Movimientos: 0`;
  mostrarAciertosDificil.innerHTML = `Aciertos: 0`;
  mostrarTiempoDificil.innerHTML = `Tiempo: ${timerinicialDificil} Segundos`;

  // Asegúrate de que el arreglo incluye todas las parejas de imágenes (1 a 12)
  numeroDificil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
  numeroDificil = numeroDificil.sort(() => Math.random() - 0.5);

  // Restablecer todas las tarjetas del 16 al 35
  for (let i = 16; i <= 35; i++) {
      let tarjeta = document.getElementById(i);
      tarjeta.innerHTML = "";
      tarjeta.disabled = false;
  }

  // Detener cualquier temporizador en curso
  if (tiempoRegresivoDificilId !== null) {
      clearInterval(tiempoRegresivoDificilId);
  }
}



