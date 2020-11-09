// DELETE RECIPE
async function deleteRecipeHandler(event) {
  event.preventDefault();

  const id = document.querySelector(".recipe-title").href.toString().split('/') [
    document.querySelector(".recipe-title").href.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
  });

  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

document.querySelector("#delete-recipe-btn").addEventListener('click', deleteRecipeHandler);