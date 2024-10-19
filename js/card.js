// import { bookmarks } from "./bookmarks.js";
import { PopUp } from "./detail.js";
import { RoundOff, getTime } from "./module.js";
import { adjustCardHeight, adjustCardHeightSlider } from "./module.js";

const apiKey = "b060e94dcae3a95f66b401d2140fc22a";
const appId = "0a5e1290";

let breakfastHTML = ``;
let lunchHTML = ``;
let dinnerHTML = ``;
let snackHTML = ``;
let teatimeHTML = ``;
let asianHTML = ``;
let frenchHTML = ``;

let mealVariable;

async function fetchData(q) {
  const url = `https://api.edamam.com/search?q=${q}&app_id=${appId}&app_key=${apiKey}&from=13&to=23`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Handle the response data here
    mealVariable = data.hits; // Assign data to the global variable
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to propagate it
  }
}

async function fetchMealData(meal, mealHTML) {
  try {
    await fetchData(meal);
    document.querySelector(`#${meal}`).innerHTML = ``;
    mealVariable.forEach((food) => {
      let recipeId = food.recipe.uri.slice(
        food.recipe.uri.lastIndexOf("_") + 1
      );
      let calctime = getTime(food.recipe.totalTime);
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div class="food-img-div">
      <img
        src="${food.recipe.image}"
        alt=""
      />
    </div>
    <div class="food-details" data-recipe-id='${recipeId}'>
      <h5 class="food-name">${food.recipe.label}</h5>
      <div class="bottom-div">
        <div class="time-div">
          <span class="material-symbols-outlined"> timer </span>
          <p>${calctime.time || "<1"} ${calctime.timeUnit}</p>
        </div>
        <span class="material-symbols-outlined bookmrk-btn">
            bookmark
            </span>
      </div>
    </div>`;
      card.querySelector(".bookmrk-btn").addEventListener("click", (e) => {
        e.target.classList.toggle("bookmarked");
        let recipeData = {
          id: recipeId,
          img: food.recipe.image,
          label: food.recipe.label,
          time: [calctime.time || "<1", calctime.timeUnit],
          source: food.recipe.source,
          ingredientLength: food.recipe.ingredientLines.length,
          calories: RoundOff(food.recipe.calories),
          ingredientList: food.recipe.ingredientLines,
          serving:food.recipe.yield
        };
        const bookmarks = localStorage.getItem("bookmarks")?JSON.parse(localStorage.getItem("bookmarks")):[];
        const existingRecipeIndex = bookmarks.findIndex(
          (item) => item.id === recipeData.id);

        if (existingRecipeIndex !== -1) {
          // If already present, remove the existing recipe from bookmarks
          bookmarks.splice(existingRecipeIndex, 1);
        } else {
          // If not already present, add recipeData to bookmarks
          bookmarks.push(recipeData);
        }
        // console.log(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      });
      let recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe-div";
      recipeDiv.id = recipeId;
      recipeDiv.innerHTML = `
    <div class="left-div">

              <div class="img-div">
                <img src="${food.recipe.image}" alt="" />
              </div>
            </div>
            <div class="recipe-details-div">
              <div class="name-div">
                <h2>${food.recipe.label}</h2>
                <span class="material-symbols-outlined close-tab"> close </span>
              </div>
              <p class="author">by ${food.recipe.source}</p>
              <div class="recipe-extra-info">
                <div class="extra-div">
                  <h1>${food.recipe.ingredientLines.length}</h1>
                  <p>Ingredients</p>
                </div>
                <div class="extra-div">
                  <h1>${calctime.time || "<1"}</h1>
                  <p>${calctime.timeUnit}</p>
                </div>
                <div class="extra-div">
                  <h1>${RoundOff(food.recipe.calories)}</h1>
                  <p>Calories</p>
                </div>
              </div>
              <div class="serving-div">
                <h1>Ingredients</h1>
                <p>${food.recipe.yield} servings</p>
              </div>
              <div class="list-ingredients">
              <ul>
              ${food.recipe.ingredientLines
                .map((ingredient) => {
                  return `<li>${ingredient}</li>`;
                })
                .join("")}
              </ul>
              </div>
            </div>`;
      document.querySelector(`#${meal}`).appendChild(card);
      document.querySelector(`#${meal}`).appendChild(recipeDiv);
    });

    adjustCardHeight();
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching meal data:", error);
  }
}

async function fetchSwiperMealData(meal, mealHTML, container) {
  try {
    await fetchData(meal);
    document.querySelector(`#${meal}`).innerHTML = ``;
    mealVariable.forEach((food) => {
      let recipeId = food.recipe.uri.slice(
        food.recipe.uri.lastIndexOf("_") + 1
      );
      let calctime = getTime(food.recipe.totalTime);
      let recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe-div";
      recipeDiv.id = recipeId;
      recipeDiv.innerHTML = `
      
      <div class="left-div">

        <div class="img-div">
          <img src="${food.recipe.image}" alt="" />
        </div>
      </div>
      <div class="recipe-details-div">
        <div class="name-div">
          <h2>${food.recipe.label}</h2>
          <span class="material-symbols-outlined close-tab"> close </span>
        </div>
        <p class="author">by ${food.recipe.source}</p>
        <div class="recipe-extra-info">
          <div class="extra-div">
            <h1>${food.recipe.ingredientLines.length}</h1>
            <p>Ingredients</p>
          </div>
          <div class="extra-div">
            <h1>${calctime.time || "<1"}</h1>
            <p>${calctime.timeUnit}</p>
          </div>
          <div class="extra-div">
            <h1>${RoundOff(food.recipe.calories)}</h1>
            <p>Calories</p>
          </div>
        </div>
        <div class="serving-div">
          <h1>Ingredients</h1>
          <p>${food.recipe.yield} servings</p>
        </div>
        <div class="list-ingredients">
        <ul>
      ${food.recipe.ingredientLines
        .map((ingredient) => {
          return `<li>${ingredient}</li>`;
        })
        .join("")}
      </ul>
        </div>
      </div>
    `;

      document.querySelector(`.${container}`).appendChild(recipeDiv);

      let swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide";
      swiperSlide.innerHTML = `
    <div class="card">
            <div class="food-img-div">
              <img
                src="${food.recipe.image}"
                alt=""
              />
            </div>
            <div class="food-details" data-recipe-id='${recipeId}'>
              <h5 class="food-name">${food.recipe.label}</h5>
              <div class="bottom-div">
                <div class="time-div">
                  <span class="material-symbols-outlined"> timer </span>
                  <p>${
                    food.recipe.totalTime == 0 ? "<1" : food.recipe.totalTime
                  } minutes</p>
                </div>
                <span class="material-symbols-outlined bookmrk-btn">
                    bookmark
                    </span>
              </div>
          </div>
          </div>`;

      swiperSlide
        .querySelector(".bookmrk-btn")
        .addEventListener("click", (e) => {
          e.target.classList.toggle("bookmarked");
          let recipeData = {
            id: recipeId,
            img: food.recipe.image,
            label: food.recipe.label,
            time: [calctime.time || "<1", calctime.timeUnit],
            source: food.recipe.source,
            ingredientLength: food.recipe.ingredientLines.length,
            calories: RoundOff(food.recipe.calories),
            ingredientList: food.recipe.ingredientLines,
            serving:food.recipe.yield
          };
          const bookmarks = localStorage.getItem("bookmarks")?JSON.parse(localStorage.getItem("bookmarks")):[];

          const existingRecipeIndex =bookmarks.findIndex(
            (item) => item.id === recipeData.id);

          if (existingRecipeIndex !== -1) {
            // If already present, remove the existing recipe from bookmarks
            bookmarks.splice(existingRecipeIndex, 1);
          } else {
            // If not already present, add recipeData to bookmarks
            bookmarks.push(recipeData);
          }
          // console.log(bookmarks);
          localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        });

      document.querySelector(`#${meal}`).appendChild(swiperSlide);
    });
    adjustCardHeightSlider();
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching meal data:", error);
  }
}

window.addEventListener("resize", adjustCardHeightSlider);
window.addEventListener("resize", adjustCardHeight);

// -----------------adding event listner as well as calling the api data---------------------
async function addingEventListner() {
  await fetchMealData("breakfast", breakfastHTML);
  await fetchMealData("lunch", lunchHTML);
  await fetchMealData("dinner", dinnerHTML);
  await fetchMealData("snack", snackHTML);
  await fetchMealData("teatime", teatimeHTML);
  await fetchSwiperMealData("asian", asianHTML, "asian-container");
  await fetchSwiperMealData("french", frenchHTML, "french-container");
  PopUp();
}
addingEventListner();
