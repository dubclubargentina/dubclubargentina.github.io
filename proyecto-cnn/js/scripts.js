// Datos de usuarios permitidos
const usuarios = [
    { usuario: "nachoirazoqui", password: "surfdubbing" },
    { usuario: "admin", password: "admin" }
];

// Datos de noticias (simulando una base de datos)
let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

// Función para cargar noticias
function cargarNoticias() {
    const noticiasContainer = document.getElementById('noticias');
    noticiasContainer.innerHTML = ''; // Limpia el contenedor

    noticias.forEach(noticia => {
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

// Función para guardar noticias
document.getElementById('formNoticia')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const imagen = document.getElementById('imagen').value;

    const nuevaNoticia = {
        id: Date.now(),
        titulo: titulo,
        contenido: contenido,
        imagen: imagen,
        fecha: new Date().toLocaleString()
    };

    // Guardar en LocalStorage
    noticias.push(nuevaNoticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));

    alert('Noticia publicada con éxito');
    window.location.href = 'index.html'; // Redirigir al inicio
});

// Función para autenticar usuarios
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (usuarioValido) {
        localStorage.setItem('auth', 'true');
        window.location.href = 'carga.html'; // Redirigir al panel de carga
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('auth');
    window.location.href = 'login.html';
}

// Cargar noticias al iniciar la página
if (window.location.pathname.includes('index.html')) {
    cargarNoticias();
}

// Cargar noticia completa
if (window.location.pathname.includes('noticia.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const noticia = noticias.find(n => n.id == id);

    if (noticia) {
        document.getElementById('noticiaTitulo').textContent = noticia.titulo;
        document.getElementById('noticiaImagen').src = noticia.imagen;
        document.getElementById('noticiaContenido').textContent = noticia.contenido;
    } else {
        document.getElementById('noticiaTitulo').textContent = 'Noticia no encontrada';
    }
}
