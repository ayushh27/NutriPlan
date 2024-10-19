let isOpen = false;
document.querySelector(".filter-icon").addEventListener("click", () => {
  if (!isOpen) {
    document.querySelector(".filter-container").style.left = 0;
  } else {
    document.querySelector(".filter-container").style.left = `-100%`;
  }
  isOpen = !isOpen;
});
document.querySelector(".close-filter").addEventListener("click", () => {
  document.querySelector(".filter-container").style.left = `-100%`;
  isOpen = false;
});

const cookingTime = [
  "<5 minutes",
  "5-10 minutes",
  "10-20 minutes",
  "20-30 minutes",
  "30-40 minutes",
  "40-50 minutes",
  "50-60 minutes",
  "> 1 hour",
];
const ingredients = [
  "<5 ingredients",
  "5-10 ingredients",
  "10-20 ingredients",
  "20-30 ingredients",
  "30-40 ingredients",
];
const diet = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];
const health = [
  "alcohol-cocktail",
  "alcohol-free",
  "celery-free",
  "crustacean-free",
  "dairy-free",
  "DASH",
  "egg-free",
  "fish-free",
  "fodmap-free",
  "gluten-free",
  "immuno-supportive",
  "keto-friendly",
  "kidney-friendly",
  "kosher",
  "low-fat-abs",
  "low-potassium",
  "low-sugar",
  "lupine-free",
  "Mediterranean",
  "mollusk-free",
  "mustard-free",
  "no-oil-added",
  "paleo",
  "peanut-free",
  "pescatarian",
  "pork-free",
  "red-meat-free",
  "sesame-free",
  "shellfish-free",
  "soy-free",
  "sugar-conscious",
  "sulfite-free",
  "tree-nut-free",
  "vegan",
  "vegetarian",
  "wheat-free",
];

const cusine = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian",
];
const dish = [
  "Biscuits and cookies",
  "Bread",
  "Cereals",
  "Condiments and sauces",
  "Desserts",
  "Drinks",
  "Main course",
  "Pancake",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Side dish",
  "Soup",
  "Starter",
  "Sweets",
];
const meal = ["breakfast", "dinner", "lunch", "snack", "teatime"];
filterValues(cookingTime, "cooking-time");
filterValues(ingredients, "ingredients");
filterValues(cusine, "cusine");
filterValues(meal, "meal");
filterValues(dish, "dish");
filterValues(diet, "diet");
filterValues(health, "health");

function filterValues(variable, id) {
  document.querySelector(`#${id}`).innerHTML = ``;
  variable.forEach((e) => {
    let option = document.createElement("div");
    option.className = "option";
    option.innerHTML = `${e}`;
    document.querySelector(`#${id}`).appendChild(option);
  });
}

document.querySelectorAll('.filter-list').forEach(e=>{
    e.querySelectorAll('span')[1].style.transform = "rotate(0deg)"
})

document.querySelectorAll(".filter-list").forEach((e) => {
  e.addEventListener("click", (target) => {
    let id = e.dataset.id;

    if (e.querySelectorAll("span")[1].style.transform == "rotate(0deg)") {
      e.querySelectorAll("span")[1].style.transform = "rotate(180deg)";
      document.querySelector(`#${id}`).style.padding = "5px 5px";
      document.querySelector(`#${id}`).style.height = `auto`;
      document.querySelector(`#${id}`).style.opacity=1 
    }
    else{
        e.querySelectorAll("span")[1].style.transform = "rotate(0deg)";
        document.querySelector(`#${id}`).style.padding = "0";
      document.querySelector(`#${id}`).style.height = 0;
      document.querySelector(`#${id}`).style.opacity=0 

    }
  });
});
