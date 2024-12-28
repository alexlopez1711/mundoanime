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

/////
// Rutas de las imágenes que se usarán en el juego
const imagenes = [
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/1.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/2.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/3.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/3.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/4.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/5.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/6.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/7.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/8.png",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/9.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/10.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/11.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/12.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/13.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/14.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/15.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/16.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/17.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/18.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/19.gif",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/20.jpg.",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/21.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/22.png",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/23.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/24.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/25.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/26.png",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/27.png.",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/28.webp",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/29.jpg.",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/30.jpg.",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/31.jpg",
  "http://127.0.0.1:5500/mvc/vistas/img/modalimg/naruto/32.webp",
  
  
];



let intentos = 0;
let aciertos = 0;
let tiempo = 0;
let timer;
let cartaSeleccionada = [];
let cartaIdSeleccionada = [];
let cartasVolteadas = 0; // Nuevo contador para el estado de las cartas

// Manejadores de los botones de dificultad
document.querySelectorAll('.btn-dificultad').forEach(button => {
  button.addEventListener('click', function() {
      const dificultad = this.getAttribute('data-dificultad');
      iniciarJuego(dificultad);
  });
});

// Función para iniciar el juego dependiendo del nivel de dificultad
function iniciarJuego(dificultad) {
  // Resetear los contadores
  intentos = 0;
  aciertos = 0;
  tiempo = 0;
  document.getElementById('intentos-count').textContent = intentos;
  document.getElementById('aciertos-count').textContent = aciertos;
  document.getElementById('tiempo-count').textContent = tiempo;

  // Detener cualquier temporizador previo
  if (timer) {
      clearInterval(timer);
  }

  // Iniciar el temporizador
  timer = setInterval(() => {
      tiempo++;
      document.getElementById('tiempo-count').textContent = tiempo;
  }, 1000);

  // Determinar el tamaño del tablero y las imágenes que se van a usar
  let filas, columnas, numImagenes;
  switch (dificultad) {
      case 'genin':
          filas = 4;
          columnas = 4;
          numImagenes = 8; // 4x4 = 16 cartas (8 imágenes duplicadas)
          break;
      case 'chunin':
          filas = 5;
          columnas = 4;
          numImagenes = 10; // 5x4 = 20 cartas (9 imágenes duplicadas)
          break;
      case 'jonin':
          filas = 6;
          columnas = 5;
          numImagenes = 15; // 6x5 = 30 cartas (15 imágenes duplicadas)
          break;
      case 'kage':
          filas = 7;
          columnas = 5;
          numImagenes = 20; // 6x6 = 36 cartas (18 imágenes duplicadas)
          break;
  }

  // Crear el tablero vacío
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';

  // Crear el arreglo de cartas a partir de las imágenes
  const cartas = crearCartas(numImagenes);

  // Llenar el tablero con las cartas
  cartas.forEach(carta => {
      const cartaElemento = document.createElement('div');
      cartaElemento.classList.add('carta');
      cartaElemento.setAttribute('data-id', carta.id);

      const imagen = document.createElement('img');
      imagen.src = carta.imagen;
      imagen.style.display = 'none';  // Las imágenes deben estar ocultas al principio
      cartaElemento.appendChild(imagen);

      cartaElemento.addEventListener('click', voltearCarta);

      tablero.appendChild(cartaElemento);
  });

  // Establecer el tamaño del tablero según el número de filas y columnas
  tablero.style.gridTemplateColumns = `repeat(${columnas}, 80px)`;
  tablero.style.gridTemplateRows = `repeat(${filas}, 80px)`;
}

// Función para crear las cartas con las imágenes duplicadas y mezcladas
function crearCartas(numImagenes) {
  let cartas = [];
  const imagenesSeleccionadas = imagenes.slice(0, numImagenes);

  imagenesSeleccionadas.forEach((imagen, index) => {
      // Crear dos cartas por cada imagen
      cartas.push({ id: index, imagen: imagen });
      cartas.push({ id: index, imagen: imagen });
  });

  // Mezclar las cartas aleatoriamente
  return mezclar(cartas);
}

// Función para mezclar las cartas aleatoriamente
function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambiar los elementos
  }
  return arr;
}

// Función para voltear las cartas
function voltearCarta(event) {
  const carta = event.target;

  // Si ya está volteada o ya hay dos cartas seleccionadas, no hacer nada
  if (carta.classList.contains('flipped') || cartaSeleccionada.length === 2) {
      return;
  }

  // Mostrar la imagen de la carta seleccionada
  carta.classList.add('flipped');
  const imagen = carta.querySelector('img');
  imagen.style.display = 'block';

  // Añadir la carta a la selección
  cartaSeleccionada.push(imagen.src);
  cartaIdSeleccionada.push(carta.getAttribute('data-id'));

  // Si hay 2 cartas seleccionadas, verificar la coincidencia
  if (cartaSeleccionada.length === 2) {
      setTimeout(verificarCoincidencia, 1000); // Se comparan las cartas después de 1 segundo
  }
}

// Función para verificar si las cartas coinciden
function verificarCoincidencia() {
  const cartas = document.querySelectorAll('.carta');
  const carta1 = cartas[cartaIdSeleccionada[0]];
  const carta2 = cartas[cartaIdSeleccionada[1]];

  // Si las cartas coinciden
  if (cartaSeleccionada[0] === cartaSeleccionada[1]) {
      aciertos++;
      document.getElementById('aciertos-count').textContent = aciertos;
  } else {
      // Si no coinciden, ocultarlas después de 1 segundo
      carta1.classList.remove('flipped');
      carta2.classList.remove('flipped');
      carta1.querySelector('img').style.display = 'none';
      carta2.querySelector('img').style.display = 'none';
  }

  // Incrementar el contador de intentos
  intentos++;
  document.getElementById('intentos-count').textContent = intentos;

  // Reiniciar la selección para el siguiente turno
  cartaSeleccionada = [];
  cartaIdSeleccionada = [];
}