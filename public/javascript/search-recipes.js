var recipeContainerEl = document.querySelector("#recipe-container");
var recipeInputEl = document.querySelector("#search-term");


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
  var counter = 0;

// loop through returned recipe objects
  for (var i = 0; i < recipes.length; i++) {

    var recipeName = recipes[i].recipe.label;
    var recipeSrc = recipes[i].recipe.url;
    var ingredients = recipes[i].recipe.ingredientLines
    var healthLabels = recipes[i].recipe.healthLabels;
    
    // create recipe card element
    var recipeEl = document.createElement("div");
    recipeEl.className = "recipe-card";
    recipeEl.setAttribute('id', counter);

    // create recipe title element
    var nameEl= document.createElement("h4");
    nameEl.classList = "recipe-title";
    nameEl.innerHTML = recipeName;
    recipeEl.appendChild(nameEl);

    // create recipe Image element
    var recipeImg = document.createElement("img");
    recipeImg.id = "recipe-image"
    recipeImg.src = recipes[i].recipe.image;
    recipeEl.appendChild(recipeImg);

    // create "view full recipe" link
    var linkEl = document.createElement("a");
    linkEl.className = "recipe-url";
    var link = document.createTextNode("View Full Recipe");

    linkEl.append(link);

    linkEl.title = "View Full Recipe";
    linkEl.href = recipeSrc;
    linkEl.target = "_blank"

    recipeEl.appendChild(linkEl);

    // create Ingredients element
    var ingredientEl = document.createElement("p");
    ingredientEl.classList = "recipe-ingredients";
    ingredientEl.innerHTML = 'Ingredients: ' + '<ul><li>' + ingredients.join("</li><li>"); + '</li></ul>';
    recipeEl.appendChild(ingredientEl);

    // create Health Labels element
    var healthLabelEl = document.createElement("p");
    healthLabelEl.classList = "recipe-health";
    healthLabelEl.innerHTML = "**" + healthLabels;
    recipeEl.appendChild(healthLabelEl);


    var saveBtnEl = createSaveBtn(counter);
    recipeEl.appendChild(saveBtnEl);
    
    counter ++;

    recipeContainerEl.append(recipeEl);

  }
};

   // create save recipe button
  var createSaveBtn = function(taskId) {
    var saveRecipeBtn = document.createElement("button");
    saveRecipeBtn.innerHTML = "Save Recipe";
    saveRecipeBtn.className = "btn save-btn";
    saveRecipeBtn.type = "submit";
    saveRecipeBtn.setAttribute("id", taskId);

    return saveRecipeBtn;
};

var saveBtnHandler = function (event) {
  var targetEl = event.target;

  if (targetEl.matches(".save-btn")) {
    var id = targetEl.getAttribute("id");
    saveRecipe(id)
  }
};

async function saveRecipe(id) {
 
  const recipeSelected = document.querySelector(".recipe-card[id='" + id + "']");
  var title = recipeSelected.querySelector("h4.recipe-title").textContent;
  var recipe_url = recipeSelected.querySelector("a.recipe-url").href;

  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify({
      title,
      recipe_url
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
};

recipeContainerEl.addEventListener("click", saveBtnHandler);












