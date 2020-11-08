// async function saveRecipeHandler(event) {
//   event.preventDefault();

//   const title = document.querySelector(".recipe-title").value;
//   const url =  document.querySelector(".recipe-link").value;

//   const response = await fetch('/api/recipes', {
//     method: 'POST',
//     body: JSON.stringify({
//       title,
//       url
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     document.location.replace('/saved-recipes');
//   } else {
//     alert(response.statusText);
//   }
// }

// document.querySelector('.save-recipe-btn').addEventListener('click', saveRecipeHandler);