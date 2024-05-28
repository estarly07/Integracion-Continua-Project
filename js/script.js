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
//Adicionar redireccionamientos a las recetas de acuerdo a como se vaya llenando el contenido
let data = [
    "Pizza napolitana",
    "Hamburguesa al carbon"
]

function search() {
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