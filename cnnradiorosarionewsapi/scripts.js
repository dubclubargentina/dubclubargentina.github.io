
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "245d4563e7334d83bcc1d6350c23d801"; // Reemplaza con tu clave de NewsAPI
 
  const BASE_URL = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything";


  const sections = [
    { id: "noticias", query: "Rosario" },
    { id: "deportes", query: "Deportes Rosario" },
    { id: "politica", query: "Política Argentina" },
    { id: "economia", query: "Economía Argentina" },
    { id: "agro", query: "Agro Argentina" },
    { id: "hidrovia", query: "Hidrovía Paraná" },
    { id: "espectaculos", query: "Espectáculos Argentina" },
  ];

  const fetchNews = async (query) => {
    const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&pageSize=8`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        return data.articles.map((article) => ({
          title: article.title,
          description: article.description || "No hay descripción disponible.",
          image: article.urlToImage || "https://via.placeholder.com/800x400",
          url: article.url,
        }));
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    return [];
  };

  const renderNews = async (sectionId, query) => {
    const container = document.getElementById(`${sectionId}-container`);
    container.innerHTML = "<p>Cargando noticias...</p>";

    const news = await fetchNews(query);
    container.innerHTML = ""; // Clear loading message
    news.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 mb-4";
      col.innerHTML = `
        <div class="card">
          <img src="${article.image}" class="card-img-top" alt="${article.title}">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description}</p>
            <a href="${article.url}" target="_blank" class="btn btn-danger">Leer más</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  };

  sections.forEach((section) => renderNews(section.id, section.query));
});
