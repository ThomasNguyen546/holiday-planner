// DELETE RECIPE
async function deleteRecipeHandler(event) {
  event.preventDefault();

  const id = document.querySelector(".recipe-line").id;
  console.log(id);
    
  const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
  });

  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

document.querySelector(".delete-recipe-btn").addEventListener('click', deleteRecipeHandler);