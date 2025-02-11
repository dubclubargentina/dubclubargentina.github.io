document.addEventListener("DOMContentLoaded", function() {
  // Array de noticias (simulación)
  const noticias = [
    { titulo: "Noticia 1", contenido: "Esta es la descripción detallada de la noticia 1." },
    { titulo: "Noticia 2", contenido: "Esta es la descripción detallada de la noticia 2." },
    { titulo: "Noticia 3", contenido: "Esta es la descripción detallada de la noticia 3." }
  ];

  const contenedorNoticias = document.getElementById("noticias");

  function mostrarNoticias() {
    // No limpiamos el contenedor si no es necesario para evitar que desaparezcan
    // Si queremos actualizar, podemos limpiar solo al inicio de carga:
    contenedorNoticias.innerHTML = "";
    noticias.forEach(noticia => {
      const divNoticia = document.createElement("div");
      divNoticia.classList.add("noticia");
      
      const titulo = document.createElement("h2");
      titulo.textContent = noticia.titulo;
      
      const contenido = document.createElement("p");
      contenido.textContent = noticia.contenido;
      
      divNoticia.appendChild(titulo);
      divNoticia.appendChild(contenido);
      contenedorNoticias.appendChild(divNoticia);
    });
  }

  // Llamada inicial para mostrar las noticias
  mostrarNoticias();

  // Importante: Asegúrate de no tener ningún setTimeout que borre el contenido.
  // Por ejemplo, si tenías algo como:
  // setTimeout(function() { contenedorNoticias.innerHTML = ""; }, 1000);
  // Debes eliminarlo.
});
