const seccionDePelis = document.querySelector(".listaPeli");
const verCarritoBoton = document.querySelector("#shop");
const form = document.querySelector("#formulario");
let listadoDePelis = [];
let toggleCarritoMenu = true;

obtenerPeliculas();

verCarritoBoton.addEventListener("click", (event) => verCarrito(event, true));
form.addEventListener("submit", searchPelis);

function obtenerPeliculas() {
  fetch("pelis.json", { mode: "no-cors" })
    .then((response) => response.json())
    .then((pelis) => {
      listadoDePelis = pelis;
      mostrarPeliculas(pelis);
    })
    .catch((error) => console.log(`Ocurrió un error: ${error}`));
}

function mostrarPeliculas(pelis, seccion) {
  if (seccion) {
    seccion.innerHTML = "";

    const totalText = document.createElement("p");
    const total = calcularTotal();
    totalText.innerText = `Monto total: ${total}`;

    const botonComprar = document.createElement("button");
    botonComprar.innerText = "Comprar";

    botonComprar.addEventListener("click", comprar);

    const seccionCompra = document.createElement("div");

    seccionCompra.appendChild(totalText);
    seccionCompra.appendChild(botonComprar);
    seccion.appendChild(seccionCompra);
  }

  pelis.forEach((peli) => {
    if (seccion) {
      mostrarPelicula(peli, seccion);
    } else {
      mostrarPelicula(peli);
    }
  });
}

function mostrarPelicula(peli, seccion) {
  const { nombre, anio, genero, descripcion, precio, imagen, id } = peli;

  const titulo1 = document.createElement("h2");
  titulo1.innerText = nombre;

  const titulo2 = document.createElement("h3");
  titulo2.innerText = `${anio} ‧ ${genero}`;

  const titulo3 = document.createElement("h4");
  titulo3.innerText = descripcion;

  const imagenPeli = document.createElement("img");
  imagenPeli.setAttribute("src", imagen?.src || "");
  imagenPeli.setAttribute("alt", imagen?.alt || "");

  const valor = document.createElement("h5");
  valor.innerText = `$ ${precio}`;

  const card = document.createElement("div");
  card.setAttribute("class", "card");

  if (seccion) {
    const info = document.createElement("div");
    const quitarPeliBoton = document.createElement("button");
    quitarPeliBoton.innerText = "Quitar película";

    quitarPeliBoton.addEventListener("click", (event) =>
      quitarPeliDelCarrito(event, id)
    );

    info.appendChild(titulo1);
    info.appendChild(titulo2);
    info.appendChild(valor);
    info.appendChild(quitarPeliBoton);

    card.appendChild(imagenPeli);
    card.appendChild(info);

    seccion.appendChild(card);
  } else {
    const agregarCarrito = document.createElement("button");
    agregarCarrito.innerText = "Agregar al carrito";

    agregarCarrito.addEventListener("click", (event) =>
      agregarAlCarrito(event, peli)
    );

    card.appendChild(titulo1);
    card.appendChild(titulo2);
    card.appendChild(imagenPeli);
    card.appendChild(valor);

    card.appendChild(titulo3);
    card.appendChild(agregarCarrito);
    seccionDePelis.appendChild(card);
  }
}

function agregarAlCarrito(event, peli) {
  const carritoAJson = localStorage.getItem("carrito");

  if (carritoAJson === null) {
    localStorage.setItem("carrito", JSON.stringify([peli]));
    return;
  }

  const carrito = JSON.parse(carritoAJson);

  const peliYaEnCarrito = carrito.find(
    (peliEnCarrito) => peli.nombre === peliEnCarrito.nombre
  );

  if (peliYaEnCarrito === undefined) {
    localStorage.setItem("carrito", JSON.stringify([...carrito, peli]));
  } else {
    swal({
      title: "Ya agregaste esa película al carrito",
      icon: "error",
    });
  }

  verCarrito(null, false);
}

function verCarrito(event, conToggle = true) {
  const carritoAJson = localStorage.getItem("carrito");

  if (carritoAJson === null) {
    swal({
      title: "El carrito está vacío",
      icon: "error",
    });
    return;
  }

  const tusPelis = document.querySelector("#tusPelis");

  if (conToggle) {
    toggleCarritoMenu = !toggleCarritoMenu;
    if (toggleCarritoMenu) {
      tusPelis.remove();
      return;
    }
  }

  const shop = document.createElement("div");
  shop.id = "tusPelis";
  let seccion = tusPelis || shop;

  const carrito = JSON.parse(carritoAJson);

  mostrarPeliculas(carrito, seccion);

  verCarritoBoton.parentNode.appendChild(seccion);
}

function quitarPeliDelCarrito(event, peliId) {
  const tusPelisSeccion = document.querySelector("#tusPelis");

  const carritoAJson = localStorage.getItem("carrito");
  const carrito = JSON.parse(carritoAJson);

  const pelisFiltradas = carrito.filter(
    (peliEnCarrito) => peliEnCarrito.id !== peliId
  );

  if (!pelisFiltradas.length) {
    localStorage.removeItem("carrito");
    tusPelisSeccion.remove();

    swal({
      title: "Vaciaste tu carrito",
      icon: "success",
    });

    return;
  }

  localStorage.setItem("carrito", JSON.stringify(pelisFiltradas));

  mostrarPeliculas(pelisFiltradas, tusPelisSeccion);

  swal({
    title: "Quitaste exitosamente la peli del carrito",
    icon: "success",
  });
}

function calcularTotal() {
  const carritoAJson = localStorage.getItem("carrito");
  const carrito = JSON.parse(carritoAJson);
  let totalCompra = 0;

  carrito.forEach((peli) => {
    totalCompra += peli.precio;
  });

  return totalCompra;
}

function comprar() {
  const total = calcularTotal();

  swal({
    title: "Compra exitosa!",
    text: `Monto: $${total}. Disfrutá de tus películas`,
    icon: "success",
  });

  localStorage.removeItem("carrito");
  const tusPelisSeccion = document.querySelector("#tusPelis");
  tusPelisSeccion?.remove();
}

function searchPelis({ preventDefault }) {
  preventDefault();
  seccionDePelis.innerHTML = "";

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

  if (!pelisBuscadas.length) {
    swal({
      title: "No tenemos esa película",
      icon: "warning",
      button: false,
    });

    setTimeout(() => {
      swal.close();
      mostrarPeliculas(listadoDePelis);
    }, 2000);
  } else {
    mostrarPeliculas(pelisBuscadas);
  }
}

// function enOferta() {
//   listadoDePelis.forEach((peli) => {
//     if (peli.oferta) {
//       peli.precio = peli.precio - (peli.precio * 10) / 100;
//     }
//   });
// }
//enOferta();

// function orden() {
//   const ordenId = prompt("¿Desea ordenar por ID? Elija SI o NO", "NO");
//   let criterio = "";
//   if (ordenId === "SI") {
//     criterio = "id";
//   } else {
//     criterio = "nombre";
//   }

//   const arrayOrdenado = [...listadoDePelis].sort((peliA, peliB) => {
//     if (peliA[criterio] > peliB[criterio]) {
//       return 1;
//     }
//     if (peliA[criterio] < peliB[criterio]) {
//       return -1;
//     }
//     return 0;
//   });
//   return arrayOrdenado;
// }
//orden();

// function filtrarOferta() {
//   const filtrar = confirm("¿Quiere ver las películas en oferta?");
//   if (filtrar) {
//     const pelisEnOferta = listadoDePelis.filter((peli) => peli.oferta);
//     console.log(pelisEnOferta);
//   }
// }
//filtrarOferta();

// function buscarPeli() {
//   const peliIngresada = prompt("Ingresa una película");

//   if (peliIngresada !== null) {
//     const peliEncontrada = listadoDePelis.find(
//       (peli) => peli.nombre === peliIngresada
//     );

//     if (peliEncontrada) {
//       alert(`TENEMOS ${peliEncontrada.nombre} EN STOCK!`);
//       return;
//     }
//     alert("NO TENEMOS ESA PELÍCULA EN STOCK");
//   }
// }
//buscarPeli();
