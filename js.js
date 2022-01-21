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
const par = document.querySelector('#par')
const test = document.querySelector('#test')
const portwidth = document.querySelector('#width')


let storer = 0
let maxscore = storer
let speed = 2000
let gamestat = true
let intersectstatus = false
let movmentcounter = 0
let multiply = 0.05
let lvl = 0
let maxlvl = lvl
let stopstop = true
let stopstop2 = true
let delay = 1000
let mobile = true
let changeisland = false
let randomnum = null
let width = portwidth.offsetWidth


setInterval(() => {
  if (mobile) {
   mobile = window.getComputedStyle(test, null).display 
   if(mobile === 'none') {
    speed = 1500
    mobile = false
   }
  }

}, 150);


setInterval(() => {
  function randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 randomnum = randomizer(1, 2)

}, 200);


let exp = () => {
  block.style.animation = `block ${speed}ms infinite linear`
}

setInterval(() => {

let blockleftp = window.getComputedStyle(block).getPropertyValue('left')

  if (movmentcounter % 10 === 0 && stopstop) {
     lvl = lvl + 1
    console.log('ss')
    multiply = multiply + 0.01
     stopstop = false
  }

  if (movmentcounter % 10 !== 0) {
    stopstop = true
 }

 if (parseInt(blockleftp) < -width * 20 / 100 && randomnum === 2) {
  changeisland = true
}

if (parseInt(blockleftp) < -width * 20 / 100 && randomnum !== 2 ) {
  changeisland = false
}

if(gamestat === false) {
  block.style.animation = `block 0ms infinite linear`
}


if (intersectstatus === false) {
  
  if (changeisland && stopstop2) {
    blockimg.src = 'island2.png'
    console.log('newis')
    stopstop2 = false
  }
  
  if (changeisland === false) {
    setTimeout(() => {
      if(intersectstatus === false) {
        blockimg.src = 'cliff.png'
        stopstop2 = true
      }
    }, 100);
  }
}


if (movmentcounter >= 0) {
  speed = speed - multiply

  if(gamestat === true){
  exp()
  }

}


}, 10);


setInterval(() => {
  if(gamestat) {
  storer = storer + 1
  score.textContent = ` LVL ${lvl} score ${storer}`
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


let stoper = true

setInterval(function(){


  let verticalMatch = null
  let horizontalMatch = null
  let verticalMatch2 = null
  let horizontalMatch2 = null
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

  // 

  
  if (horizontalMatch && verticalMatch || horizontalMatch2 && verticalMatch2){
    intersect = true
  } else {
    intersect = false
  }


  if (storer > maxscore) {
    maxscore = storer
  }

  
  if (lvl > maxlvl) {
    maxlvl = lvl
  }

  
  let charactertopp = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
  let blockleftp = window.getComputedStyle(block).getPropertyValue('left')


       if (parseInt(blockleftp) < 0 && stoper) {
         movmentcounter = movmentcounter + 1
         stoper = false
         console.log(movmentcounter)
        }

        if(parseInt(blockleftp) > 0) {
          stoper = true
        }


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
    score1.textContent = ` Current Level, ${lvl} score ${storer}`
    score1.style.display = 'block'
    record.style.display = 'block'
    character.src = 'dest.png'
    console.log('dest')
    blockimg.src = 'destcliff.png'
    score.textContent = `plane destroyed`
    record.textContent = ` Record Level, ${maxlvl} score ${maxscore}`
    gamestat = false
    character.style.top = `${charactertopp + charactertopp * 5 / 100}px`
    character.style.transform = `rotate(${getRotationAngle(character)}deg)`
    character.classList.remove('animate')
    character.classList.remove('animate1')
    character.classList.add('smt')
    block.style.left = blockleftp
    if (changeisland) {
    blockimg.src = 'island2dest.png'
    }
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
  speed = 2000
  score1.style.display = 'none'
  record.style.display = 'none'
  character.classList.remove('smt')
  character.classList.add('animate1')
  movmentcounter = 0
  multiply = 0.1
  lvl = 0
  stopstop = true
  delay = 2500
  mobile = true
  changeisland = false
}

