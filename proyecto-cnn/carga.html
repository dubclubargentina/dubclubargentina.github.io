document.getElementById('formNoticia').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const imagenes = document.getElementById('imagenes').files;

    const nuevaNoticia = {
        id: Date.now(),
        titulo: titulo,
        contenido: contenido,
        imagenes: Array.from(imagenes).map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file) // Guarda la URL temporal de la imagen
            };
        }),
        fecha: new Date().toLocaleString()
    };

    // Guardar en localStorage
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.push(nuevaNoticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));

    alert('Noticia publicada con éxito');
    window.location.href = 'index.html'; // Redirigir al inicio
});
