const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta para obtener noticias desde NewsAPI
app.get('/noticias', async (req, res) => {
    const apiKey = "245d4563e7334d83bcc1d6350c23d801I"; // Reemplaza con tu clave de NewsAPI
    const url = `https://newsapi.org/v2/top-headlines?country=ar&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); // Envía las noticias como respuesta
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar las noticias' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
