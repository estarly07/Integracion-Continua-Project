const endpoint = 'http://localhost:3000/recipes';


document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'views/home/header_home.html');
    loadComponent('main', 'views/home/main_home.html');
    fetchRecipes();
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error cargando el componente:', error));
}
function showRecipeModal() {
    document.getElementById('recipeModal').style.display = 'block';
}

function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}


async function fetchRecipes() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) { throw new Error('Error al obtener las recetas.'); }
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

let categories = ["Desayuno", "Almuerzo", "Cena", "Postre"]

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
        fetch('views/home/recipe_home.html')
            .then(response => response.text())
            .then(html => {
                // Crear un elemento DOM a partir del HTML obtenido
                const recipeElement = document.createElement('div');
                recipeElement.innerHTML = html.trim();

                recipeElement.querySelector('.recipe-image').src  = recipe.image;
                recipeElement.querySelector('.recipe-name').textContent  = recipe.name;

                //Adiciona nombres de categoria segun la receta
                const categoryList = recipeElement.querySelector('.recipe-categories');
                categoryList.innerHTML = '';
                recipe.category.forEach(cat => {
                    let cat_name = categories.at(cat);
                    const listItem = document.createElement('li');
                    listItem.textContent = cat_name;
                    categoryList.appendChild(listItem);
                });

                const ingredientsList = recipeElement.querySelector('.recipe-ingredients');
                ingredientsList.innerHTML = ''; // Limpiar la lista de ingredientes antes de agregar nuevos

                recipe.ingredients.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ingredient;
                    ingredientsList.appendChild(listItem);
                });


                recipesContainer.appendChild(recipeElement);
            })
            .catch(error => {
                console.error('Error loading recipe_home.html:', error);
            });
    });
}

//Listado de recetas
let data = []

function listrecipes() {
    const path = require('path');
    const fs = require('fs');
    //Obtener listado de recetas actualizado
    fs.readdir(endpoint, (err, items) => {
        if (err) {
          console.error('Error al leer la carpeta:', err);
          return;
        }
        items.forEach((item) => {
          const itemPath = path.join(endpoint, item);
          fs.stat(itemPath, (statErr, stats) => {
            if (statErr) {
              console.error(`Error al leer ${item}:`, statErr);
              return;
            }
      
            if (stats.isFile()) {
                data.push(item);
                //console.log('File:', item);
            }
          });
        });
      });
}

function search() {
    //llamada
    listrecipes();    

    let query = document.getElementById("search-input").value;
    console.log(query);
    if (query.trim() === "") {
        return;
    }
    let results = [];
    for(let i = 0; i < data.length; i++){
        if (data[i].toLowerCase().includes(query.toLowerCase())){
            results.push(data[i]);
            }
        }
    document.getElementById("results").innerHTML = "";
    if(results.length > 0){
        for(let i = 0; i<results.length; i++){
            let li = document.createElement("li");
            li.textContent = results[i];
            document.getElementById("results").appendChild(li);
        }
    }
    else{
        let li = document.createElement("li");
        li.textContent = "No se encoontraron recetas para: " + query,
        document.getElementById("results").appendChild(li);
    }        
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.recipe button').forEach(button => {
        button.addEventListener('click', function() {
            alert('Más recetas próximamente!');
        });
    });
});