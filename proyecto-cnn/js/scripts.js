document.addEventListener("DOMContentLoaded", function() {
  // Simulación de un array de noticias
  var noticias = [
    { titulo: "Noticia 1", contenido: "Contenido detallado de la noticia 1." },
    { titulo: "Noticia 2", contenido: "Contenido detallado de la noticia 2." },
    { titulo: "Noticia 3", contenido: "Contenido detallado de la noticia 3." }
  ];

  var contenedorNoticias = document.getElementById("noticias");

  // Función para mostrar las noticias
  function mostrarNoticias() {
    // Limpia el contenedor (solo al cargar inicialmente; si no quieres limpiar, omite esta línea)
    contenedorNoticias.innerHTML = "";
    
    // Recorre cada noticia y crea sus elementos
    noticias.forEach(function(noticia) {
      var noticiaDiv = document.createElement("div");
      noticiaDiv.classList.add("noticia");
      
      var titulo = document.createElement("h2");
      titulo.textContent = noticia.titulo;
      
      var contenido = document.createElement("p");
      contenido.textContent = noticia.contenido;
      
      noticiaDiv.appendChild(titulo);
      noticiaDiv.appendChild(contenido);
      contenedorNoticias.appendChild(noticiaDiv);
    });
  }

  // Llamada inicial para mostrar las noticias sin eliminarse después
  mostrarNoticias();

  // Si deseas actualizar la lista de noticias cada cierto tiempo, puedes usar setInterval.
  // Por ejemplo, para refrescar cada 60 segundos (60000 milisegundos):
  // setInterval(mostrarNoticias, 60000);
});



// Datos de usuarios permitidos
const usuarios = [
    { usuario: "nachoirazoqui", password: "surfdubbing" },
    { usuario: "admin", password: "admin" }
];

// Función para cargar noticias desde Google News RSS
async function cargarNoticiasGoogleNews() {
    const rssUrl = "https://news.google.com/rss?hl=es-419&gl=AR&ceid=AR:es-419";
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();

    const noticiasContainer = document.getElementById('noticias');
    noticiasContainer.innerHTML = ''; // Limpia el contenedor

    data.items.forEach(item => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${item.enclosure.link}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description.substring(0, 100)}...</p>
                        <a href="${item.link}" class="btn btn-primary" target="_blank">Leer más</a>
                    </div>
                </div>
            </div>
        `;
        noticiasContainer.innerHTML += card;
    });
}

// Función para cargar noticias desde Firebase
async function cargarNoticiasFirebase() {
    const response = await fetch('https://tu-proyecto.firebaseio.com/noticias.json');
    const data = await response.json();

    const noticiasContainer = document.getElementById('noticias');
    noticiasContainer.innerHTML = ''; // Limpia el contenedor

    Object.values(data).forEach(noticia => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${noticia.titulo}</h5>
                        <p class="card-text">${noticia.contenido.substring(0, 100)}...</p>
                        <a href="noticia.html?id=${noticia.id}" class="btn btn-primary">Leer más</a>
                    </div>
                </div>
            </div>
        `;
        noticiasContainer.innerHTML += card;
    });
}

// Función para cargar noticias al iniciar la página
if (window.location.pathname.includes('index.html')) {
    cargarNoticiasGoogleNews();
    cargarNoticiasFirebase();
}
