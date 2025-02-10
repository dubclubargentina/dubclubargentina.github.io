document.getElementById('formCarga').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtén los datos del formulario
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const imagenes = document.getElementById('imagenes').files;
    const videos = document.getElementById('videos').value.split(',').filter(url => url.trim() !== ''); // Filtra URLs vacías

    // Crea un objeto con los datos
    const noticia = {
        titulo: titulo,
        contenido: contenido,
        imagenes: Array.from(imagenes).map(file => file.name), // Solo nombres de archivos
        videos: videos
    };

    // Guarda la noticia en localStorage
    guardarNoticia(noticia);

    alert('Noticia cargada con éxito');
    window.location.href = 'index.html'; // Redirige al inicio
});

// Función para guardar la noticia en localStorage
function guardarNoticia(noticia) {
    // Obtén las noticias existentes (si las hay)
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

    // Agrega la nueva noticia
    noticias.push(noticia);

    // Guarda las noticias actualizadas en localStorage
    localStorage.setItem('noticias', JSON.stringify(noticias));
}
