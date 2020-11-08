var recipeContainerEl = document.getElementById("recipe-container");
var recipeInputEl = document.getElementById("search-term");


// Recipe Search Form Handler
var recipesSubmitHandler = function(event) {
  event.preventDefault();
    
    var searchTerm = document.querySelector('input[name="search-term"]').value.trim();
    
    if (searchTerm) {
        getRecipes(searchTerm);
        
        recipeInputEl.value = "";

    } else {
      console.log("not working")
    }
};

document.querySelector('#recipe-form').addEventListener('submit', recipesSubmitHandler);


// Get Recipes from Edamam API
var getRecipes = function(searchTerm) {

  var apiUrl = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=b00f114c&app_key=00174a765fb378e74adaddd1216c4fa7";
  
  
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
       
        localStorage.setItem("recipes", JSON.stringify(data.hits));
        var resultsTerm = document.querySelector('input[name="search-term"]').value.trim();
        resultsTerm.innerHTML = searchTerm;
        displayRecipes();
      })
    } else {
      console.log(response.statusText)
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Edamam");
  });
};

// Display Recipes 
var displayRecipes = function () {

  recipeContainerEl.textContent = "";

  var recipes = JSON.parse(localStorage.getItem("recipes") );

// loop through returned recipe objects
  for (var i = 0; i < recipes.length; i++) {

    var recipeName = recipes[i].recipe.label;
    var recipeSrc = recipes[i].recipe.url;
    var ingredients = recipes[i].recipe.ingredientLines
    var healthLabels = recipes[i].recipe.healthLabels;
    
    // create recipe card element
    var recipeEl = document.createElement("div");
    recipeEl.classList = "card recipe-card";

    // create recipe title element
    var nameEl= document.createElement("h4");
    nameEl.classList = "recipe-title";
    nameEl.innerHTML = recipeName;

    // create recipe Image element
    var recipeImg = document.createElement("img");
    recipeImg.id = "recipe-image"
    recipeImg.src = recipes[i].recipe.image;

    // create "view full recipe" link
    var linkEl = document.createElement("a");
    linkEl.classList = "recipe-link";
    var link = document.createTextNode("View Full Recipe");

    linkEl.append(link);

    linkEl.title = "View Full Recipe";
    linkEl.href = recipeSrc;
    linkEl.target = "_blank"

    // create Ingredients element
    var ingredientEl = document.createElement("p");
    ingredientEl.classList = "recipe-ingredients";
    ingredientEl.innerHTML = 'Ingredients: ' + '<ul><li>' + ingredients.join("</li><li>"); + '</li></ul>';

    // create Health Labels element
    var healthLabelEl = document.createElement("p");
    healthLabelEl.classList = "recipe-health";
    healthLabelEl.innerHTML = "**" + healthLabels;

    // create save recipe button
    var saveRecipeBtn = document.createElement("button");
    saveRecipeBtn.classList = "save-recipe-btn"
    saveRecipeBtn.innerHTML = "Save Recipe";
    saveRecipeBtn.onclick = "saveRecipeHandler()"
   

    // append all inner elements to recipe card
    recipeEl.append(nameEl, recipeImg, ingredientEl, healthLabelEl, linkEl, saveRecipeBtn);

    // append recipe card to document body
    recipeContainerEl.append(recipeEl);
  }
};

async function saveRecipeHandler(event) {
  event.preventDefault();

  const title = document.querySelector(".recipe-title").value;
  const url =  document.querySelector(".recipe-link").value;

  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify({
      title,
      url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/saved-recipes');
  } else {
    alert(response.statusText);
  }
}



