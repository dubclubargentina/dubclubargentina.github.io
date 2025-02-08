// Función para cargar y mostrar las noticias en la página de inicio
function cargarNoticias() {
    const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    const noticiasContainer = document.getElementById('noticias');

    // Limpiar el contenedor de noticias antes de cargar nuevas
    noticiasContainer.innerHTML = '';

    // Recorrer las noticias y mostrarlas
    noticias.forEach((noticia, index) => {
        const noticiaHTML = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    ${noticia.imagenes.length > 0 ? `<img src="${noticia.imagenes[0]}" class="card-img-top" alt="${noticia.titulo}">` : ''}
                    <div class="card-body">
                        <h5 class="card-title">${noticia.titulo}</h5>
                        <p class="card-text">${noticia.contenido}</p>
                        ${noticia.videos.length > 0 ? `<p><strong>Videos:</strong> ${noticia.videos.join(', ')}</p>` : ''}
                        <button class="btn btn-danger btn-sm" onclick="eliminarNoticia(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        noticiasContainer.innerHTML += noticiaHTML;
    });
}

// Función para eliminar una noticia
function eliminarNoticia(index) {
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.splice(index, 1); // Eliminar la noticia en la posición `index`
    localStorage.setItem('noticias', JSON.stringify(noticias));
    cargarNoticias(); // Recargar las noticias
}

// Cargar las noticias al abrir la página de inicio
window.onload = function () {
    if (window.location.pathname.endsWith('index.html')) {
        cargarNoticias();
    }
};

// Función para manejar el login (simulación)
document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Simulación de autenticación
    if (usuario === 'admin' && password === 'admin') {
        window.location.href = 'carga.html';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Función para guardar una noticia en localStorage
document.getElementById('formCarga').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const imagenes = document.getElementById('imagenes').files;
    const videos = document.getElementById('videos').value.split(',');

    // Validar el número de imágenes y videos
    if (imagenes.length > 10) {
        alert('Máximo 10 imágenes permitidas.');
        return;
    }

    if (videos.length > 10) {
        alert('Máximo 10 enlaces de video permitidos.');
        return;
    }

    // Convertir las imágenes a URLs (simulación de subida)
    const imagenesURLs = [];
    for (let i = 0; i < imagenes.length; i++) {
        imagenesURLs.push(URL.createObjectURL(imagenes[i]));
    }

    // Crear el objeto de la noticia
    const noticia = {
        titulo,
        contenido,
        imagenes: imagenesURLs,
        videos: videos.filter(url => url.trim() !== ""), // Eliminar URLs vacíos
    };

    // Guardar la noticia en localStorage
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.push(noticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));

    alert('Noticia cargada exitosamente.');
    window.location.href = 'index.html'; // Redirigir a la página de inicio
});