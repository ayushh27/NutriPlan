let mealTypeHTML=``
for (let index = 0; index < 8; index++) {
    mealTypeHTML+=`
    <div class="card">
    <div class="food-img-div">
      <img
        src="images/burger-with-melted-cheese.webp"
        alt=""
      />
    </div>
    <div class="food-details" data-recipe-id='1234'>
      <h5 class="food-name">Spelt Everything Crackers</h5>
      <div class="bottom-div">
        <div class="time-div">
          <span class="material-symbols-outlined"> timer </span>
          <p>5 minutes</p>
        </div>
        <span class="material-symbols-outlined view-btn">
          bookmark
        </span>
      </div>
    </div>
  </div>
  <div class="recipe-div" id='1234'>
        <div class="left-div">

          <div class="img-div">
            <img src="images/burger-with-melted-cheese.webp" alt="" />
          </div>
        </div>
        <div class="recipe-details-div">
          <div class="name-div">
            <h2>Spelt everything Crackers</h2>
            <span class="material-symbols-outlined close-tab"> close </span>
          </div>
          <p class="author">by Smitten kitchen</p>
          <div class="recipe-extra-info">
            <div class="extra-div">
              <h1>4</h1>
              <p>Ingredients</p>
            </div>
            <div class="extra-div">
              <h1>4</h1>
              <p>Ingredients</p>
            </div>
            <div class="extra-div">
              <h1>4</h1>
              <p>Calories</p>
            </div>
          </div>
          <div class="serving-div">
            <h1>Ingredients</h1>
            <p>8 servings</p>
          </div>
          <div class="list-ingredients">
            <ul>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
              <li>1/4 tea</li>
            </ul>
          </div>
        </div>
      </div>`
     
 }
 ['breakfast','lunch','dinner','snack','teatime'].forEach(meal=>{
     document.querySelector(`#${meal}`).innerHTML=mealTypeHTML

 })
 
 

 // --------------------resizing cards-------------------------
 function adjustCardHeightSlider() {
  const cards = document.querySelectorAll('.swiper-slide .card .food-details .food-name');
  let maxHeight = 0;

  cards.forEach((card) => {
    card.style.height = ''; // Reset card height to auto
    maxHeight = Math.max(maxHeight, card.offsetHeight);
    console.log();
  });

  cards.forEach((card) => {
    card.style.height = maxHeight + 'px';
  });
}

function adjustCardHeight() {
  const cards = document.querySelectorAll('.tab-content .card .food-details .food-name');
  let maxHeight = 0;

  cards.forEach((card) => {
    card.style.height = ''; // Reset card height to auto
    maxHeight = Math.max(maxHeight, card.offsetHeight);
    console.log();
  });

  cards.forEach((card) => {
    card.style.height = maxHeight + 'px';
  });
}
window.addEventListener('resize', adjustCardHeightSlider);
window.addEventListener('resize', adjustCardHeight);
adjustCardHeightSlider()
adjustCardHeight()
