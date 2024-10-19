import { PopUp } from "./detail.js";
import { RoundOff, adjustCardHeightRecipes, getTime } from "./module.js";

const APP_ID = "0a5e1290";
const APP_KEY = "b060e94dcae3a95f66b401d2140fc22a";

function mapCookingTime(cookingTimeRange) {
  const cookingTimeMap = {
    "<5 minutes": "0-5",
    "5-10 minutes": "5-10",
    "10-20 minutes": "10-20",
    "20-30 minutes": "20-30",
    "30-40 minutes": "30-40",
    "40-50 minutes": "40-50",
    "50-60 minutes": "50-60",
    "> 1 hour": "60-",
  };
  return cookingTimeMap[cookingTimeRange];
}

function mapIngredients(ingredientsRange) {
  const ingredientsMap = {
    "<5 ingredients": "0-5",
    "5-10 ingredients": "5-10",
    "10-20 ingredients": "10-20",
    "20-30 ingredients": "20-30",
    "30-40 ingredients": "30-40",
  };
  return ingredientsMap[ingredientsRange];
}

function constructRecipeSearchQuery(params) {
  const queryParams = [];

  // Add the mandatory parameters
  queryParams.push(`app_id=${APP_ID}`, `app_key=${APP_KEY}`);

  // Add optional parameters if provided
  if (params.query) queryParams.push(`q=${encodeURIComponent(params.query)}`);
  if (params.from) queryParams.push(`from=${params.from}`);
  if (params.to) queryParams.push(`to=${params.to}`);
  if (params.healthLabels) {
    params.healthLabels.forEach((label) => {
      queryParams.push(`health=${encodeURIComponent(label)}`);
    });
  }
  if (params.dietLabels) {
    params.dietLabels.forEach((label) => {
      queryParams.push(`diet=${encodeURIComponent(label)}`);
    });
  }
  if (params.cuisineType)
    queryParams.push(`cuisineType=${encodeURIComponent(params.cuisineType)}`);
  if (params.mealType)
    queryParams.push(`mealType=${encodeURIComponent(params.mealType)}`);
  if (params.calories) queryParams.push(`calories=${params.calories}`);
  if (params.cookingTime) {
    const mappedCookingTime = mapCookingTime(params.cookingTime);
    if (mappedCookingTime) {
      queryParams.push(`time=${mappedCookingTime}`);
    }
  }
  if (params.ingredients) {
    const mappedIngredients = mapIngredients(params.ingredients);
    if (mappedIngredients) {
      queryParams.push(`ingr=${mappedIngredients}`);
    }
  }
  if (params.dishType)
    queryParams.push(`dishType=${encodeURIComponent(params.dishType)}`);

  // Construct the full query string
  const queryString = queryParams.join("&");
  return `https://api.edamam.com/search?${queryString}`;
}
let apiUrl = "";
let allRecipes = "";
let cardsRendered = 0;

let queryParams = localStorage.getItem("queryParams")
  ? JSON.parse(localStorage.getItem("queryParams"))
  : {
      query: "egg",
      from: 0,
      to: 100,
      healthLabels: [],
      dietLabels: [],
      cuisineType: "",
      mealType: "dinner",
      cookingTime: "",
      ingredients: "",
      dishType: "",
    };

Search(queryParams);
document.getElementById("apply").addEventListener("click", Apply);
document
  .querySelector(".filter-search input")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      Apply();
    }
  });
function Apply() {
  if (document.querySelector(".filter-search input").value != "") {
    queryParams.query = document.querySelector(".filter-search input").value;
    document.querySelector(".filter-search input").value = "";
  } else {
    queryParams.query =
      queryParams.healthLabels.length > 0
        ? queryParams.healthLabels[0]
        : queryParams.dietLabels.length > 0
        ? queryParams.dietLabels[0]
        : queryParams.cuisineType ||
          queryParams.cookingTime ||
          queryParams.ingredients ||
          queryParams.dishType ||
          queryParams.mealType ||
          "cake";
  }
  if (window.innerWidth <= 900) {
    document.querySelector(".filter-container").style.left = "-100%";
  }
  Search(queryParams);
}

document.getElementById("clear").addEventListener("click", () => {
  queryParams.healthLabels = [];
  queryParams.dietLabels = [];
  queryParams.cuisineType = "";
  queryParams.mealType = "";
  queryParams.cookingTime = "";
  queryParams.dishType = "";
  document.querySelectorAll(".option-selected").forEach((opt) => {
    opt.classList.remove("option-selected");
  });
});

export async function Search(params) {
  document.querySelector(".result-cards").innerHTML = ``;
  cardsRendered = 0;

  apiUrl = constructRecipeSearchQuery(params);
  console.log(apiUrl);
  await fetchData(apiUrl);
  renderCards(allRecipes.length);
}
const singleTag = {
  "cooking-time": "cookingTime",
  ingredients: "ingredients",
  cusine: "cuisineType",
  meal: "mealType",
  dish: "dishType",
};
const multiTag = {
  health: "healthLabels",
  diet: "dietLabels",
};
document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", (e) => {
    if (option.parentNode.id != "health" && option.parentNode.id != "diet") {
      document.querySelectorAll(`#${option.parentNode.id} *`).forEach((k) => {
        if (k.classList.contains("option-selected") && k != option)
          k.classList.remove("option-selected");
      });
      if (option.classList.contains("option-selected")) {
        console.log(true);
        option.classList.remove("option-selected");
        queryParams[singleTag[option.parentNode.id]] = "";
      } else {
        queryParams[singleTag[option.parentNode.id]] = option.textContent;
        console.log(false);

        option.classList.add("option-selected");
      }
    } else {
      if (
        queryParams[multiTag[option.parentNode.id]].indexOf(
          option.textContent
        ) === -1
      ) {
        queryParams[multiTag[option.parentNode.id]].push(option.textContent);
        option.classList.add("option-selected");
      } else {
        queryParams[multiTag[option.parentNode.id]] = queryParams[
          multiTag[option.parentNode.id]
        ].filter((item) => item !== option.textContent);
        option.classList.remove("option-selected");
      }
      // console.log(queryParams);
    }
  });
});

async function fetchData(q) {
  const url = q;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits.length == 0) {
      document.querySelector(".results-div h4").innerHTML =
        "No results for your preference";
      document.querySelector(".result-cards").innerHTML = "";
    }
    allRecipes = data.hits;
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching data:", error);
    document.querySelector(".results-div h4").innerHTML = "";
    document.querySelector(".error-block").innerHTML = error;
    document.querySelector(".result-cards").innerHTML = "";
    throw error;
  }
}

async function renderCards(upperlimit = 101) {
  try {
    if (cardsRendered + 20 < upperlimit) {
      for (let i = cardsRendered; i < cardsRendered + 20; i++) {
        let food = allRecipes[i];
        let recipeId = food.recipe.uri.slice(
          food.recipe.uri.lastIndexOf("_") + 1
        );
        let calctime = getTime(food.recipe.totalTime);
        let card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${100 * (i % 20)}ms`;
        card.innerHTML = `
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
            serving: food.recipe.yield,
          };
          const bookmarks = localStorage.getItem("bookmarks")
            ? JSON.parse(localStorage.getItem("bookmarks"))
            : [];
          const existingRecipeIndex = bookmarks.findIndex(
            (item) => item.id === recipeData.id
          );

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
        document.querySelector(".result-cards").appendChild(card);
        document.querySelector(".result-cards").appendChild(recipeDiv);
      }
      cardsRendered += 20;
    }
    PopUp();
    adjustCardHeightRecipes();
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching meal data:", error);
  }
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (cardsRendered < queryParams.to) {
      renderCards();
    }
  }
});
