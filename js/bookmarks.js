import { PopUp } from "./detail.js";
import { adjustCardHeightRecipes } from "./module.js";

// Function to get bookmarks from local storage
function getBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    return JSON.parse(bookmarks);
  } else {
    return null; // No bookmarks present in local storage
  }
}

// Function to initialize bookmarks
function initializeBookmarks() {
  const bookmarks = getBookmarks();
  if (bookmarks === null) {
    // Initialize bookmarks if not present in local storage
    const initialBookmarks = []; // You can initialize with any default bookmarks
    localStorage.setItem("bookmarks", JSON.stringify(initialBookmarks));
    return initialBookmarks;
  } else {
    return bookmarks;
  }
}

// Initialize bookmarks
export let bookmarks = localStorage.getItem("bookmarks")?JSON.parse(localStorage.getItem("bookmarks")):[];
console.log(bookmarks);
bookmarks.forEach((food) => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<div class="food-img-div">
      <img
        src="${food.img}"
        alt=""
      />
    </div>
    <div class="food-details" data-recipe-id='${food.id}'>
      <h5 class="food-name">${food.label}</h5>
      <div class="bottom-div">
        <div class="time-div">
          <span class="material-symbols-outlined"> timer </span>
          <p>${food.time[0]} ${food.time[1]}</p>
        </div>
        <span class="material-symbols-outlined bookmrk-btn bookmarked">
            bookmark
            </span>
      </div>
    </div>`;
  card.querySelector(".bookmrk-btn").addEventListener("click", (e) => {
    e.target.classList.toggle("bookmarked");
    const existingRecipeIndex = bookmarks.findIndex(
      (item) => item.id === food.id
    );
    if (existingRecipeIndex !== -1) {
      // If already present, remove the existing recipe from bookmarks
      bookmarks.splice(existingRecipeIndex, 1);
      document.querySelector(".bookmarked-recipes").removeChild(card);
      
      document.querySelector(".bookmarked-recipes").removeChild(document.getElementById(`${food.id}`));

      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  });
  let recipeDiv = document.createElement("div");
  recipeDiv.className = "recipe-div";
  recipeDiv.id = food.id;
  recipeDiv.innerHTML = `
    <div class="left-div">

              <div class="img-div">
                <img src="${food.img}" alt="" />
              </div>
            </div>
            <div class="recipe-details-div">
              <div class="name-div">
                <h2>${food.label}</h2>
                <span class="material-symbols-outlined close-tab"> close </span>
              </div>
              <p class="author">by ${food.source}</p>
              <div class="recipe-extra-info">
                <div class="extra-div">
                  <h1>${food.ingredientLength}</h1>
                  <p>Ingredients</p>
                </div>
                <div class="extra-div">
                  <h1>${food.time[0]}</h1>
                  <p>${food.time[1]}</p>
                </div>
                <div class="extra-div">
                  <h1>${food.calories}</h1>
                  <p>Calories</p>
                </div>
              </div>
              <div class="serving-div">
                <h1>Ingredients</h1>
                <p>${food.serving} servings</p>
              </div>
              <div class="list-ingredients">
              <ul>
              ${food.ingredientList
                .map((ingredient) => {
                  return `<li>${ingredient}</li>`;
                })
                .join("")}
              </ul>
              </div>
            </div>`;
  document.querySelector(".bookmarked-recipes").appendChild(card);
  document.querySelector(".bookmarked-recipes").appendChild(recipeDiv);
  PopUp();
  adjustCardHeightRecipes();
});
