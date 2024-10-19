// ----------------active tab switching-----------------

document.querySelector('.tab-list').addEventListener('click',(e)=>{

  document.querySelector('.active-tab').classList.remove('active-tab')
  document.querySelector('.active-tab-content').classList.remove('active-tab-content')
  e.target.classList.add('active-tab')
  document.querySelectorAll('.tab-content').forEach(tab=>{
  
    if(tab.dataset.tabnumber==e.target.dataset.tabnumber){
      tab.classList.add('active-tab-content')
    }
  })
})

