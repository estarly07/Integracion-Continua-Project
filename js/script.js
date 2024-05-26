document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'views/home/header_home.html');
    loadComponent('main', 'views/home/main_home.html');
    loadComponent('recipe', 'views/home/recipe_home.html');
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