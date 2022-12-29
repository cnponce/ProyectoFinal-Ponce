const listadoDePelis = [
  {
    id: 1,
    nombre: "Pinocchio",
    genero: "Fantasía/Infantil",
    anio: 2022,
    descripcion:
      "En Italia, el deseo de un hombre le da vida mágicamente a un muñeco de madera.",
    oferta: true,
    precio: 300,
    imagen: {
      src: "./img pelis/pinocho.jfif",
      alt: "imagen de pinocho con su creador",
    },
  },

  {
    id: 2,
    nombre: "Argentina, 1985",
    genero: "Drama",
    anio: 2022,
    descripcion:
      "Durante la década de 1980, un grupo de abogados investiga y lleva a juicio a los responsables de la dictadura cívico-militar argentina.",
    oferta: false,
    precio: 300,
    imagen: {
      src: "./img pelis/argentina1985.jfif",
      alt: "portada de la pelicula donde se ven a los dos protaginostas debatiendo en la corte",
    },
  },

  {
    id: 3,
    nombre: "Avatar 2",
    genero: "Ciencia ficción",
    anio: 2022,
    descripcion:
      "Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.",
    oferta: false,
    precio: 300,
    imagen: {
      src: "./img pelis/avatar2.jfif",
      alt: "portada de Avatar con sus personajes azules",
    },
  },

  {
    id: 4,
    nombre: "Devotion",
    genero: "Acción",
    anio: 2022,
    descripcion:
      "Devotion es una película biográfica de guerra estadounidense de 2022 basada en el libro de 2015 Devotion: An Epic Story of Heroism, Friendship, and Sacrifice de Adam Makos, que vuelve a contar la camaradería entre los oficiales navales Jesse Brown y Tom Hudner durante la Guerra de Corea.",
    oferta: false,
    precio: 300,
    imagen: {
      src: "./img pelis/devotion.jfif",
      alt: "se ven a los dos protagonistas de amarillo con un avión de guerra ",
    },
  },

  {
    id: 5,
    nombre: "Focus",
    genero: "Romance/Crimen",
    anio: 2015,
    descripcion:
      "Un estafador veterano apoya a una joven y atractiva mujer, pero las cosas se complican cuando ellos se involucran románticamente.",
    oferta: false,
    precio: 150,
    imagen: {
      src: "./img pelis/focus.jfif",
      alt: "en la portada se ven a sus dos protagonistas, Margot Robbie abrazanda a Will Smith",
    },
  },

  {
    id: 6,
    nombre: "My Policeman",
    genero: "Drama",
    anio: 2022,
    descripcion:
      "Tom, un policía en la década de 1950 en Gran Bretaña, se enamora de un maestro de escuela en la costa de Brighton. Sin embargo, pronto comienza una apasionada aventura entre personas del mismo sexo con el curador de un museo.",
    oferta: true,
    precio: 300,
    imagen: {
      src: "./img pelis/mypoliceman.jfif",
      alt: "Se ve al protagonist con el traje de oficial con las manos en los bolsillos del pantalón mirando el piso",
    },
  },

  {
    id: 7,
    nombre: "Smile",
    genero: "Terror",
    anio: 2022,
    descripcion:
      "Tras presencia el dramático incidente sufrido por un paciente, la Dra. Cotter empieza a experimentar hechos aterradores sin explicación aparente. A medida que el horror se adueña de su vida, comprende que la respuesta está en su propio pasado.",
    oferta: true,
    precio: 300,
    imagen: {
      src: "./img pelis/smile.jfif",
      alt: "Se ve un cadaver sonriendo desde dentro de la bolsa funeraria",
    },
  },

  {
    id: 8,
    nombre: "Taxi Driver",
    genero: "Drama",
    anio: 1976,
    descripcion:
      "Un veterano de Vietnam inicia una confrontación violenta con los proxenetas que trabajan en las calles de Nueva York.",
    oferta: false,
    precio: 100,
    imagen: {
      src: "./img pelis/taxidriver.jfif",
      alt: "Se ve al protagonista Robert De Niro en la calle con un taxi amarillo detras de él",
    },
  },

  {
    id: 9,
    nombre: "Troll",
    genero: "Fantasía",
    anio: 2022,
    descripcion:
      "Cuando un antiguo trol se despierta en una montaña noruega, un grupo de héroes debe reunirse para intentar evitar que cause estragos mortales.",
    oferta: true,
    precio: 300,
    imagen: {
      src: "./img pelis/troll.jfif",
      alt: "Portada con la cara del trol enojado",
    },
  },
];

function enOferta() {
  listadoDePelis.forEach((peli) => {
    if (peli.oferta) {
      peli.precio = peli.precio - (peli.precio * 10) / 100;
    }
  });
}
//enOferta();

function orden() {
  const ordenId = prompt("¿Desea ordenar por ID? Elija SI o NO", "NO");
  let criterio = "";
  if (ordenId === "SI") {
    criterio = "id";
  } else {
    criterio = "nombre";
  }

  const arrayOrdenado = [...listadoDePelis].sort((peliA, peliB) => {
    if (peliA[criterio] > peliB[criterio]) {
      return 1;
    }
    if (peliA[criterio] < peliB[criterio]) {
      return -1;
    }
    return 0;
  });
  return arrayOrdenado;
}
//orden();

function filtrarOferta() {
  const filtrar = confirm("¿Quiere ver las películas en oferta?");
  if (filtrar) {
    const pelisEnOferta = listadoDePelis.filter((peli) => peli.oferta);
    console.log(pelisEnOferta);
  }
}
//filtrarOferta();

function buscarPeli() {
  const peliIngresada = prompt("Ingresa una película");

  if (peliIngresada !== null) {
    const peliEncontrada = listadoDePelis.find(
      (peli) => peli.nombre === peliIngresada
    );

    if (peliEncontrada) {
      alert(`TENEMOS ${peliEncontrada.nombre} EN STOCK!`);
      return;
    }
    alert("NO TENEMOS ESA PELÍCULA EN STOCK");
  }
}
//buscarPeli();

function mostrarPelicula(peli, seccion) {
  const card = document.createElement("div");
  const titulo1 = document.createElement("h2");
  const seccionListadoDePeli = document.querySelector(".listaPeli");
  titulo1.innerText = peli.nombre;
  const titulo2 = document.createElement("h3");
  titulo2.innerText = `${peli.anio} ‧ ${peli.genero}`;
  const titulo3 = document.createElement("h4");
  titulo3.innerText = peli.descripcion;
  const imagenPeli = document.createElement("img");
  imagenPeli.setAttribute("src", peli.imagen?.src || "");
  imagenPeli.setAttribute("alt", peli.imagen?.alt || "");
  const valor = document.createElement("h5");
  valor.innerText = `$ ${peli.precio}`;
  const agregarCarrito = document.createElement("button");
  agregarCarrito.innerText = "Agregar al carrito";

  agregarCarrito.addEventListener("click", (event) => {
    const carritoAJson = localStorage.getItem("carrito");
    if (carritoAJson === null) {
      localStorage.setItem("carrito", JSON.stringify([peli]));
      return;
    }
    const carrito = JSON.parse(carritoAJson);
    console.log(peli.nombre, carrito);
    const peliYaEnCarrito = carrito.find(
      (peliEnCarrito) => peli.nombre === peliEnCarrito.nombre
    );
    if (peliYaEnCarrito === undefined) {
      localStorage.setItem("carrito", JSON.stringify([...carrito, peli]));
    }
  });

  card.appendChild(titulo1);
  card.appendChild(titulo2);
  card.appendChild(imagenPeli);
  card.appendChild(valor);
  if (seccion) {
    seccion.appendChild(card);
  } else {
    card.appendChild(titulo3);
    card.appendChild(agregarCarrito);
    seccionListadoDePeli.appendChild(card);
  }
}

const verCarrito = document.querySelector("#shop");
verCarrito.addEventListener("click", (event) => {
  const carritoAJson = localStorage.getItem("carrito");
  const tusPelis = document.querySelector("#tusPelis");
  if (tusPelis) {
    tusPelis.remove();
    return;
  }
  const shop = document.createElement("div");
  shop.id = "tusPelis";
  if (carritoAJson === null) {
    shop.innerText = "El carrito está vacío";
    return;
  }
  shop.innerText = "Tu carrito";
  const carrito = JSON.parse(carritoAJson);
  carrito.forEach((peli) => {
    mostrarPelicula(peli, shop);
  });
  verCarrito.parentNode.appendChild(shop);
});

listadoDePelis.forEach((peli) => {
  mostrarPelicula(peli);
});

const form = document.querySelector("#formulario");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector("#name");
  const inputGenre = document.querySelector("#genre");
  const inputYear = document.querySelector("#year");
  const pelisBuscadas = listadoDePelis.filter(
    (peli) =>
      peli.nombre.toLowerCase().includes(inputName.value.toLowerCase()) &&
      peli.genero
        .toLocaleLowerCase()
        .includes(inputGenre.value.toLowerCase()) &&
      peli.anio.toString().includes(inputYear.value)
  );

  console.log(pelisBuscadas);
  const seccion = document.querySelector(".listaPeli");
  seccion.innerHTML = "";
  if (!pelisBuscadas.length) {
    const card = document.createElement("div");
    const mensaje = document.createElement("h2");
    const reset = document.createElement("button");
    reset.addEventListener("click", (event) => {
      seccion.innerHTML = "";
      listadoDePelis.forEach((peli) => {
        mostrarPelicula(peli);
      });
    });
    mensaje.innerText = "No tenemos esa película";
    reset.innerText = "Mostrar todas las películas";

    card.appendChild(mensaje);
    card.appendChild(reset);
    seccion.appendChild(card);
  } else {
    pelisBuscadas.forEach((peli) => {
      mostrarPelicula(peli);
    });
  }
});
