const html = document.querySelector('#html')
const character = document.querySelector('#character')
const block = document.querySelector('#block')
const collider = document.querySelector('#collider')
const blockimg = document.querySelector('#blockimg')
const score = document.querySelector('#score')
const body = document.querySelector('#body')
const score1 = document.querySelector('#score1')
const record = document.querySelector('#record')
const reset = document.querySelector('#reset')
const restartpar = document.querySelector('#restartpar')



let storer = 0
let maxscore = storer
let speed = 1700
let gamestat = true
let intersectstatus = false





let exp = () => {
  block.style.animation = `block ${speed}ms infinite linear`

}

setInterval(() => {

if (speed > 900) {
  speed = speed - 0.2
  // console.log(speed)
  if(gamestat === true){
  exp()
  }
}
if(gamestat === false) {
  block.style.animation = `block 0ms infinite linear`
}

}, 10);



setInterval(() => {
  if(gamestat) {
  storer = storer + 1
  score.textContent = ` score ${storer}`
  }
}, 100);



setInterval(() => {

  html.addEventListener('keydown', addclass)

  function addclass(event) {

    if(intersectstatus) {
      if(event.code === 'Space') {
        restart()
      }
    }

    if(intersectstatus === false) {

      if(event.code === 'ArrowUp' || event.code === 'Space') {
  
        if(character.classList.value !== 'animate') {
            character.classList.remove('animate1')
            character.classList.add('animate')
            setTimeout(function(){
            character.classList.remove('animate')
            if(character.classList.value !== 'smt') {
              character.classList.add('animate1')
            }
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

   }

}, 100);


setInterval(() => {
  html.addEventListener('click', function() {
    c()
  })

  body.addEventListener('touchstart', function() {
    c()
  })
  
  function c() {

    if(intersectstatus === false) {
      if(character.classList.value !== 'animate') {
        character.classList.remove('animate1')
        character.classList.add('animate')
        setTimeout(function(){
        character.classList.remove('animate')
        if(character.classList.value !== 'smt') {
          character.classList.add('animate1')
        }
        },500)
    } 
    }
 
}
}, 100);




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

  
  let charactertopp = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
  let blockleftp = window.getComputedStyle(block).getPropertyValue('left')

  
function getRotationAngle(target) 
{
  const obj = window.getComputedStyle(target, null);
  const matrix = obj.getPropertyValue('-webkit-transform') || 
    obj.getPropertyValue('-moz-transform') ||
    obj.getPropertyValue('-ms-transform') ||
    obj.getPropertyValue('-o-transform') ||
    obj.getPropertyValue('transform');

  let angle = 0; 

  if (matrix !== 'none') 
  {
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  } 

  return (angle < 0) ? angle +=360 : angle;
}



  if(intersect && intersectstatus === false) {
    intersectstatus = true
    restartpar.style.display = 'flex'
    score1.textContent = `score ${storer}`
    score1.style.display = 'block'
    record.style.display = 'block'
    character.src = 'dest.png'
    blockimg.src = 'destcliff.png'
    score.textContent = `plane destroyed`
    record.textContent = `record ${maxscore}`
    gamestat = false
    character.style.top = `${charactertopp + charactertopp * 5 / 100}px`
    character.style.transform = `rotate(${getRotationAngle(character)}deg)`
    character.classList.remove('animate')
    character.classList.remove('animate1')
    character.classList.add('smt')
    block.style.left = blockleftp
  }

}, 10);


function restart() {
  restartpar.style.display = 'none'
  block.style.display = 'none'
  block.classList.remove('blockpar')
  storer = 0
  character.src = 'plane.png'  
  blockimg.src = 'cliff.png'
  character.style.top = 'unset'
  character.style.transform = `rotate(0deg)`
  block.style.left = 'unset'
  intersectstatus = false
  gamestat = true
  setTimeout(() => {
    block.style.display = 'inline-block'
    block.classList.add('blockpar')
  }, 40);
  speed = 1700
  score1.style.display = 'none'
  record.style.display = 'none'
  character.classList.remove('smt')
  character.classList.add('animate1')
}





