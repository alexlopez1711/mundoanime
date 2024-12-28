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
