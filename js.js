const html = document.querySelector('#html')
const character = document.querySelector('#character')
const block = document.querySelector('#block')

html.addEventListener('keydown', addclass)


function addclass(event) {

  if(event.code === 'ArrowUp' || event.code === 'Space') {

    if(character.classList.value !== 'animate') {
        character.classList.remove('animate1')
        character.classList.add('animate')
        setTimeout(function(){
        character.classList.remove('animate')
        character.classList.add('animate1')
        },500)
    }  
  }

  if(event.code === 'ArrowDown') {
    setTimeout(function(){
    character.classList.remove('animate')
    character.classList.add('animate1')
    },150)
}
}

function c() {
        if(character.classList.value !== 'animate') {
            character.classList.remove('animate1')
            character.classList.add('animate')
            setTimeout(function(){
            character.classList.remove('animate')
            character.classList.add('animate1')
            },500)
        }  
}


// let checkdead = setInterval(function(){
//      let charactertop =  parseInt(window.getComputedStyle(character).getPropertyValue('top'))
//      let blockleft =  parseInt(window.getComputedStyle(block).getPropertyValue('left'))
//     //  console.log(charactertop)
//     //  console.log(blockleft)
// }, 100);



