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
