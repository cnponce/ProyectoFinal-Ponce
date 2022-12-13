const listadoDePelis = [
  {
    id: 1,
    nombre: "Pinocchio",
    genero: "Fantasía/Infantil",
    año: 2022,
    descripcion:
      "En Italia, el deseo de un hombre le da vida mágicamente a un muñeco de madera.",
    oferta: true,
    precio: 300,
  },

  {
    id: 2,
    nombre: "Argentina, 1985",
    genero: "Drama",
    año: 2022,
    descripcion:
      "Durante la década de 1980, un grupo de abogados investiga y lleva a juicio a los responsables de la dictadura cívico-militar argentina.",
    oferta: false,
    precio: 300,
  },

  {
    id: 3,
    nombre: "Avatar 2",
    genero: "Ciencia ficción",
    año: 2022,
    descripcion:
      "Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.",
    oferta: false,
    precio: 300,
  },

  {
    id: 4,
    nombre: "Devotion",
    genero: "Acción",
    año: 2022,
    descripcion:
      "Devotion es una película biográfica de guerra estadounidense de 2022 basada en el libro de 2015 Devotion: An Epic Story of Heroism, Friendship, and Sacrifice de Adam Makos, que vuelve a contar la camaradería entre los oficiales navales Jesse Brown y Tom Hudner durante la Guerra de Corea.",
    oferta: false,
    precio: 300,
  },

  {
    id: 5,
    nombre: "Focus",
    genero: "Romance/Crimen",
    año: 2015,
    descripcion:
      "Un estafador veterano apoya a una joven y atractiva mujer, pero las cosas se complican cuando ellos se involucran románticamente.",
    oferta: false,
    precio: 150,
  },

  {
    id: 6,
    nombre: "My Policeman",
    genero: "Drama",
    año: 2022,
    descripcion:
      "Tom, un policía en la década de 1950 en Gran Bretaña, se enamora de un maestro de escuela en la costa de Brighton. Sin embargo, pronto comienza una apasionada aventura entre personas del mismo sexo con el curador de un museo.",
    oferta: true,
    precio: 300,
  },

  {
    id: 7,
    nombre: "Smile",
    genero: "Terror",
    año: 2022,
    descripcion:
      "Tras presencia el dramático incidente sufrido por un paciente, la Dra. Cotter empieza a experimentar hechos aterradores sin explicación aparente. A medida que el horror se adueña de su vida, comprende que la respuesta está en su propio pasado.",
    oferta: true,
    precio: 300,
  },

  {
    id: 8,
    nombre: "Taxi Driver",
    genero: "Drama",
    año: 1976,
    descripcion:
      "Un veterano de Vietnam inicia una confrontación violenta con los proxenetas que trabajan en las calles de Nueva York.",
    oferta: false,
    precio: 100,
  },

  {
    id: 9,
    nombre: "Troll",
    genero: "Fantasía",
    año: 2022,
    descripcion:
      "Cuando un antiguo trol se despierta en una montaña noruega, un grupo de héroes debe reunirse para intentar evitar que cause estragos mortales.",
    oferta: true,
    precio: 300,
  },
];

function enOferta() {
  listadoDePelis.forEach((peli) => {
    if (peli.oferta) {
      peli.precio = peli.precio - (peli.precio * 10) / 100;
    }
  });
}
enOferta();

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
orden();

function filtrarOferta() {
  const filtrar = confirm("¿Quiere ver las películas en oferta?");
  if (filtrar) {
    const pelisEnOferta = listadoDePelis.filter((peli) => peli.oferta);
    console.log(pelisEnOferta);
  }
}
filtrarOferta();

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

buscarPeli();
