document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Usuarios permitidos
    const usuarios = [
        { usuario: 'nachoirazoqui', password: 'surfdubbing' },
        { usuario: 'admin', password: 'admin' }
    ];

    // Verificar credenciales
    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (usuarioValido) {
        localStorage.setItem('usuarioAutenticado', 'true');
        window.location.href = 'carga.html'; // Redirigir a la página de carga
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
