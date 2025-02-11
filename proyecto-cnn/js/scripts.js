// Clave API de NewsAPI (obtén una clave gratuita en https://newsapi.org/)
const apiKey = "TU_API_KEY";

// Función para cargar noticias desde NewsAPI
async function cargarNoticias() {
    const noticiasContainer = document.getElementById('noticias');
    const cargando = document.getElementById('cargando');

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ar&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.articles.length === 0) {
            noticiasContainer.innerHTML = '<p>No hay noticias disponibles.</p>';
            return;
        }

        noticiasContainer.innerHTML = ''; // Limpia el contenedor

        data.articles.forEach(article => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/800x400'}" class="card-img-top" alt="${article.title}" onerror="this.src='https://via.placeholder.com/800x400';">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description || 'Descripción no disponible'}...</p>
                            <a href="noticia.html?titulo=${encodeURIComponent(article.title)}&imagen=${encodeURIComponent(article.urlToImage || 'https://via.placeholder.com/800x400')}&contenido=${encodeURIComponent(article.content || article.description || 'Contenido no disponible')}" class="btn btn-primary">Leer más</a>
                        </div>
                    </div>
                </div>
            `;
            noticiasContainer.innerHTML += card;
        });
    } catch (error) {
        noticiasContainer.innerHTML = '<p>Error al cargar las noticias. Inténtalo de nuevo más tarde.</p>';
        console.error('Error:', error);
    } finally {
        cargando.style.display = 'none'; // Oculta el indicador de carga
    }
}

// Función para cargar noticia completa
function cargarNoticiaCompleta() {
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = urlParams.get('titulo');
    const imagen = urlParams.get('imagen');
    const contenido = urlParams.get('contenido');

    if (titulo && imagen && contenido) {
        document.getElementById('noticiaTitulo').textContent = titulo;
        document.getElementById('noticiaImagen').src = imagen;
        document.getElementById('noticiaContenido').textContent = contenido;
    } else {
        document.getElementById('noticiaTitulo').textContent = 'Noticia no encontrada';
    }
}

// Cargar noticias al iniciar la página
if (window.location.pathname.includes('index.html')) {
    cargarNoticias();
}

// Cargar noticia completa al iniciar la página
if (window.location.pathname.includes('noticia.html')) {
    cargarNoticiaCompleta();
}
