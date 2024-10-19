export function PopUp(){
    document.querySelectorAll('.recipe-div').forEach(page=>{
        page.addEventListener('click',(e)=>{
            if(e.target.classList.contains('close-tab')){
    let parentDiv=e.target.parentNode.parentNode.parentNode;
    parentDiv.style.display='none'
            }
        })
    })

    document.querySelectorAll('.card img, .card .food-name').forEach(card=>{
        card.addEventListener('click',()=>{
            // let foodDetails=card.querySelector('.food-details')
            let foodDetails
            if(card.classList.contains('.food-name'))
          foodDetails=card.parentNode
        else{
            foodDetails=card.parentNode.parentNode.querySelector('.food-details')
        }
            let foodId=foodDetails.dataset.recipeId
            
            document.getElementById(`${foodId}`).style.display='grid'
            
        })
    })
}
