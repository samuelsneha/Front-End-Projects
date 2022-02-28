
var startGame = true;
var lastHole;
var scoreValue;
var score = document.getElementById('score');
var holes = document.querySelectorAll('.hole');
var moles = document.querySelectorAll('.mole');

function randomHole(holes){
    var number = Math.floor(Math.random() * holes.length);
    var hole = holes[number];//hole is the DOM Element
    if( hole === lastHole )
    return randomHole(holes); //D2 - Why return and like this return ?
    lastHole = hole; //D4- Why cant we make the number equal rather than the element equal
    return hole; //D3 - Why return here
    console.log(holes[number]);
    console.log(hole);
}

function randomTime( max, min ){ //D1 - Why this function is made, what is this method and why return ?
    var time =  Math.floor(Math.random() * ( max - min ) + min);
    console.log(time);
    return time;
}
function popUp(){
    var hole = randomHole(holes);
    var time = randomTime(200,1000);//D5 - If we are passing a constant value to this function then why are we using a function and whats the purpose og this function when we have setTimeout?
    hole.classList.add('up');
    setTimeout( function(){
    hole.classList.remove('up');
    if( startGame ) popUp(); // D7 - Why is this put here in this timeout with this time ? And we can call a function inside the same function?
    }, time );
}
function startGameNow(){
    score.textContent = 0;
    scoreValue = 0;
    startGame = true;
    popUp();
    setTimeout( function(){  startGame = false }, 10000);
}
function hitTheMole(event){
    console.log(event);
    if(!event.isTrusted) return; //it means you are a cheater //D8 - How does fake click happens 
    scoreValue++;
    this.classList.remove('up') //D9 - this is for what here? //because if you hit it, it should go down instantly even if you still have a milli second time left for it to go down
    score.textContent = scoreValue;
}
moles.forEach(  mole => mole.addEventListener('click', hitTheMole));

// function startGameNow(){
//     if ( startGame)
//     popUp();
//     setTimeout( function(){ 
//         startGame = false;
//     }, 1000);
// }
