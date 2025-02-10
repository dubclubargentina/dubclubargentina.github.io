// Autenticación
const usuarios = [
    { user: 'nachoirazoqui', pass: 'surfdubbing', rol: 'editor' },
    { user: 'admin', pass: 'admin', rol: 'admin' }
];

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('password').value;
    
    const usuario = usuarios.find(u => u.user === user && u.pass === pass);
    
    if(usuario) {
        localStorage.setItem('auth', JSON.stringify(usuario));
        window.location.href = 'carga.html';
    } else {
        alert('Credenciales incorrectas');
    }
});

// Sistema de Noticias
let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

document.getElementById('formNoticia')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevaNoticia = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        contenido: document.getElementById('contenido').value,
        imagenes: Array.from(document.getElementById('imagenes').files).map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            }
        }),
        fecha: new Date().toISOString()
    };
    
    noticias.unshift(nuevaNoticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));
    alert('Noticia publicada con éxito');
    e.target.reset();
});

// Cargar noticias en portada
function cargarPortada() {
    const destacadas = noticias.slice(0, 3);
    const listado = noticias.slice(3);
    
    // Generar HTML
    destacadas.forEach(noticia => {
        document.getElementById('destacadas').innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4">
                    ${noticia.imagenes.length ? 
                        `<img src="${noticia.imagenes[0].url}" class="card-img-top" alt="${noticia.titulo}">` : ''}
                    <div class="card-body">
                        <h5 class="card-title">${noticia.titulo}</h5>
                        <p class="card-text">${noticia.contenido.substring(0, 100)}...</p>
                        <a href="noticia.html?id=${noticia.id}" class="btn btn-danger">Leer más</a>
                    </div>
                </div>
            </div>
        `;
    });

    listado.forEach(noticia => {
        document.getElementById('noticias').innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    ${noticia.imagenes.length ? 
                        `<img src="${noticia.imagenes[0].url}" class="card-img-top" alt="${noticia.titulo}">` : ''}
                    <div class="card-body">
                        <h5 class="card-title">${noticia.titulo}</h5>
                        <p class="card-text">${noticia.contenido.substring(0, 100)}...</p>
                        <a href="noticia.html?id=${noticia.id}" class="btn btn-danger">Leer más</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Cargar noticia completa
function cargarNoticiaCompleta() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const noticia = noticias.find(n => n.id == id);

    if(noticia) {
        document.getElementById('noticiaTitulo').textContent = noticia.titulo;
        document.getElementById('noticiaImagen').src = noticia.imagenes[0].url;
        document.getElementById('noticiaContenido').textContent = noticia.contenido;
    } else {
        document.getElementById('noticiaTitulo').textContent = 'Noticia no encontrada';
    }
}

// Iniciar
if(window.location.pathname.includes('index.html')) {
    cargarPortada();
} else if(window.location.pathname.includes('noticia.html')) {
    cargarNoticiaCompleta();
}

// Control de acceso
if(window.location.pathname.includes('carga.html') && !localStorage.getItem('auth')) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'login.html';
}
