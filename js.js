const html = document.querySelector('#html')
const character = document.querySelector('#character')
const block = document.querySelector('#block')
const collider = document.querySelector('#collider')
const blockimg = document.querySelector('#blockimg')
const score = document.querySelector('#score')
const body = document.querySelector('#body')
const score1 = document.querySelector('#score1')
const record = document.querySelector('#record')



let storer = 0
let maxscore = storer
let speed = 1700


body.addEventListener('touchstart', function() {
  c()
})

setInterval(() => {

if (speed > 900) {
  speed = speed - 0.2
  // console.log(speed)
  block.style.animation = `block ${speed}ms infinite linear`
}
}, 10);






setInterval(() => {
  storer = storer + 1
  score.textContent = ` score ${storer}`
}, 100);



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}




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



setInterval(function(){


  let verticalMatch = null
  let horizontalMatch = null
  let intersect = null

  let div1 = character.getBoundingClientRect();
  let div1Top = div1.top;
  let div1Left = div1.left;
  let div1Right = div1.right
  let div1Bottom = div1.bottom
  
  let div2 = collider.getBoundingClientRect();
  let div2Top = div2.top;
  let div2Left = div2.left;
  let div2Right = div2.right
  let div2Bottom = div2.bottom
  
  if (div1Top > div2Top) {
     verticalMatch = true
  } else{
     verticalMatch = false
  }
  
  if ((div2Right > div1Left && div2Right < div1Right)||(div2Left < div1Right && div2Left > div1Left)) {
    horizontalMatch = true
  } else {
    horizontalMatch = false
  }
  
  if (horizontalMatch && verticalMatch){
    intersect = true
  } else {
    intersect = false
  }


  if (storer > maxscore) {
    maxscore = storer
  }


  if(intersect) {
    score1.textContent = `score ${storer}`
    score1.style.display = 'block'
    record.style.display = 'block'
    character.src = 'dest.png'
    blockimg.src = 'cliff2.png'
    score.textContent = `plane destroyed`
    record.textContent = `record ${maxscore}`
    setTimeout(() => {
      score1.style.display = 'none'
      record.style.display = 'none'
    // alert(`Score ${storer} \nRecord ${maxscore}`) 
    sleep(2000)
    storer = 0
    speed = 1700
    character.src = 'plane.png'  
    blockimg.src = 'cliff.png'
    block.style.display = 'none'
    }, 20);
  }



}, 30);



setInterval(() => {
  block.style.display = 'none'
  block.classList.remove('blockpar')
  block.classList.add('blockpar')
  block.style.display = 'inline-block'
}, 50);



