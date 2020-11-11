// // DELETE RECIPE
// async function deleteRecipeHandler(event) {
//   event.preventDefault();

//   const id = document.querySelector(".recipe-line").id;
//   console.log(id);
    
//   const response = await fetch(`/api/recipes/${id}`, {
//       method: 'DELETE'
//   });

//   if (response.ok) {
//       document.location.reload();
//   } else {
//       alert(response.statusText);
//   }
// }

// document.querySelector(".delete-recipe-btn").addEventListener('click', deleteRecipeHandler);

var recipeContainerEl = document.querySelector("#saved-recipe-container");

var deleteBtnHandler = function (event) {
    var targetEl = event.target;
  
    if (targetEl.matches(".delete-recipe-btn")) {
      var id = targetEl.getAttribute("id");
      deleteRecipe(id)
    }
  };

  // DELETE RECIPES
async function deleteRecipe(id) {
  
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE'
      });
  
    if (response.ok) {
      document.location.replace('/saved-recipes');
    } else {
      alert(response.statusText)
    }
  }
  
recipeContainerEl.addEventListener("click", deleteBtnHandler);

