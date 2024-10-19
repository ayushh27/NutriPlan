let resultHTML=``
let i=0

function loadImages(){
    let lowlimit=i;
    let upperlimit=i+20;
    i=i+20

    for (j=lowlimit ; j < upperlimit; j++) {
        let card= document.createElement('div')
        card.className='card' 
        card.style.animationDelay = `${100 * (j%20)}ms`
        card.innerHTML=`
        <div class="food-img-div">
        <img
        src="images/burger-with-melted-cheese.webp"
        alt=""
        />
        </div>
        <div class="food-details">
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
        `
        let recipeDiv=document.createElement('div')
        recipeDiv.className='recipe-div'
        recipeDiv.innerHTML=`<div class="recipe-div">
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
        document.querySelector('.result-cards').appendChild(card)
        document.querySelector('.result-cards').appendChild(recipeDiv)
     
        
    }
}
loadImages()
// -------------------Infinity loading-_------------------
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        loadImages()
    }
})
