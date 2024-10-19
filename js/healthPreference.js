const values = [
    'alcohol-cocktail', 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 
    'DASH', 'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 
    'keto-friendly', 'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 
    'low-sugar', 'lupine-free', 'Mediterranean', 'mollusk-free', 'mustard-free', 
    'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 
    'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 
    'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'
]
values.forEach(e=>{
let preference=document.createElement('div');
preference.className='preference'
preference.innerText=e;
document.querySelector('.pref-container .flex-div').appendChild(preference)
})
// 