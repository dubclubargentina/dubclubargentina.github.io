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
        categoria: currentCategory,
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
                        <a href="#" class="btn btn-danger">Leer más</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Iniciar
if(window.location.pathname.includes('index.html')) {
    cargarPortada();
}

// Sistema de banners
function subirBanner() {
    const file = document.getElementById('bannerUpload').files[0];
    if(file) {
        const bannerUrl = URL.createObjectURL(file);
        localStorage.setItem('banner', bannerUrl);
        alert('Banner actualizado');
    }
}

// Cargar banner
if(localStorage.getItem('banner')) {
    document.getElementById('bannerContainer').innerHTML = `
        <img src="${localStorage.getItem('banner')}" class="w-100" alt="Banner publicitario">
    `;
}

// Control de acceso
if(window.location.pathname.includes('carga.html') && !localStorage.getItem('auth')) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'login.html';
}
