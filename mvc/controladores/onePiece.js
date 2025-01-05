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
            //audios
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
      tarjeta1Facil.disabled = true;
  } else if (tarjetasDestapadasFacil == 2) {
      tarjeta2Facil = document.getElementById(id);
      segundoResultadoFacil = numeroFacil[id];
      tarjeta2Facil.innerHTML = `<img src="../img/modalimg/luffy/onepieceMemoria/${segundoResultadoFacil}.jpg">`;
      tarjeta2Facil.disabled = true;
      movimientosfaciles++;
      mostrarMovimientosFacil.innerHTML = `Movimientos: ${movimientosfaciles}`;
      



      // Aquí puedes agregar la lógica para verificar coincidencias y otros comportamientos.
  }
}



