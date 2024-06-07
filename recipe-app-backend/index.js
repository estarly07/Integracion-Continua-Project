const express    = require('express');
const fs         = require('fs').promises;
const path       = require('path');
const app        = express();
const PORT       = process.env.PORT || 3000;
const recipesDir = path.join(__dirname, 'recipes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , 'http://127.0.0.1:5500'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/recipes', async (req, res) => {
    try {
        const recipeFiles = await fs.readdir(recipesDir);
        const recipes = await Promise.all(
            recipeFiles.map(async (filename) => {
                const filePath = path.join(recipesDir, filename);
                const content = await fs.readFile(filePath, 'utf-8');
                return JSON.parse(content);
            })
        );
        res.json(recipes);
    } catch (error) {
        console.error('Error al obtener las recetas:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener las recetas.' });
    }
});


app.listen(PORT, () => { console.log(`Servidor backend iniciado en http://localhost:${PORT}`);});



