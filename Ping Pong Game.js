// var canvas = document.getElementById("ping-pong");
// var context = canvas.getContext("2d");
// var lRodH = 120;
// var heightOfPage = 635;
// var widthOfPage = 1350;
// //screen
// context.fillRect( 0, 0, widthOfPage, heightOfPage);
// context.fillStyle = "black";
// //left rod
// context.fillRect( 30, heightOfPage/2, 30, 120 );
// context.fillStyle = "white";
// //right rod
// context.fillRect( widthOfPage - 35, heightOfPage/2, 30, 120 );
// context.fillStyle = "white";
// //ball
// context.beginPath();
// context.arc(widthOfPage/2, heightOfPage/2, 25, 0, 360, false);
// context.closePath();
// context.fill();
// context.fillStyle = "white";
// //text of scores
// context.f
var lrod = document.getElementById('lrod');
var lrodPos = 26; // 18 + 8
var lrodC;
var rrod = document.getElementById('rrod');
var rrodPos = 26; // 18 + 8
var rrodC;
var ball = document.getElementById('ball');
rodSpeed = 5;
var pointA =  document.getElementById('p1-t');
var pointB =  document.getElementById('p2-t');

//PLAYER - 1 (RIGHT ROD)
document.addEventListener("keydown", function(event){
    rrodC = rrod.getBoundingClientRect();
    // Up
    if(event.keyCode == 38  && rrodC.top > 0){
        // this rrrodC.top is wrt where window.innerHeight starts
        rrodPos =  rrodPos - rodSpeed;
        rrod.style.top = rrodPos + 'px';  
    }
    // Down
    if(event.keyCode == 40 && (rrodC.bottom <= window.innerHeight - 5) ){
        rrodPos =  rrodPos + rodSpeed;
        rrod.style.top = rrodPos + 'px';   
    }
    // ((window.innerHeight - rrodC.bottom) > 0 ) && (rrodC.bottom <= window.innerHeight) - first i wrote
    // ((window.innerHeight - rrodC.top ) > rrodC.height + 20) - second i wrote which is workin
});

//PLAYER - 2 (LEFT ROD)
document.addEventListener("keydown", function(event){
    lrodC =  lrod.getBoundingClientRect();
    // W - Up
    if((event.keyCode == 119 || event.keyCode == 87) && lrodC.top > 0 ){
        lrodPos =  lrodPos - rodSpeed;
        lrod.style.top = lrodPos + 'px';   
    }
    // S - Down
    if((event.keyCode == 115 || event.keyCode == 83) && (lrodC.bottom <= window.innerHeight - 5) ){
        lrodPos =  lrodPos + rodSpeed;
        lrod.style.top = lrodPos + 'px';   
    }
});


// MOVEMENT OF THE BALL
document.addEventListener('keypress', function(event){
    var ballC = ball.getBoundingClientRect();
    if(event.keyCode == 13)
    {
        if( localStorage.getItem('score') ){
            alert( localStorage.getItem('keyName') + 'has maximum score of ' + localStorage.getItem('score') );
        }
        else{
            alert('Hey! This is your first time');
        }
        var ballSpeed = 5;
        var angle = 8;
        // if(localStorage.getItem('lastServeWinner') == 'Rod 2'){
        //     ballSpeed = -5;
        // }
// this is the main logic of the code            
            var anyDirection = setInterval( function(){// this setIntervval is like a for loop which will keep excuting
                ballC = ball.getBoundingClientRect();// its necessary to put a getBoundingClientRect over here coz, even when its moving, we need its updated top and left values. So its necessary to put them inside the setInterval function. 
                var ballPosT = ballC.top;
                var ballPosL = ballC.left;
                // console.log(ballPosT, ballPosL);
                ballPosT = ballPosT + ballSpeed;
                ballPosL = ballPosL + ballSpeed + angle;
                ball.style.top = ballPosT + 'px';
                ball.style.left = ballPosL + 'px';
//Now we will be writing the conditions, and we are writing the conditions inside setInterval because these conditions will be met when the animation of the ball is happening. So inside the setInterval.                 
//condition when ball does not collides with the rod                
                if( ballC.right >= window.innerWidth ){
                    // a) the opposite layer gets a point
                    pointA.innerText = parseInt(pointA.innerText) + 1;//whatever we get in js is in strings, so its necessary to convert them into integers.
                    //for eg if initially it was 0, then you would need 0 + 1 which is 1. But js would take it as 01. And then next time it would be 01 + 1 = 011 in strings. So to remove this issue we first convert it into integer and then add 1.
                    //Like it would be 0 (string 0 converted to integer 0) + 1 = 1. Then next time 1 + 1 = 2 instead of 1 + 1 = 11.
                    // b) You need to stop the animation of ball for the current surve and restart the game.
                    clearInterval(anyDirection);
                    ball.style.top = 18 + 'rem';//going back to there original positions.
                    ball.style.left = 41 + 'rem';
                    localStorage.setItem('lastServeWinner', 'Rod 1' );
                }
//condition when the ball collides with the rod               
                else if( window.innerWidth - ballC.right - 15 <= rrodC.width ){ //some doubts
                      if( rrodC.top <= ballC.top && ballC.bottom <=rrodC.bottom){
                          ballSpeed = -5;
                          angle = -10;
                          ballPosT = ballPosT + ballSpeed; 
                          ballPosL = ballPosL + ballSpeed + angle;
                          ball.style.top = ballPosT + 'px';
                          ball.style.left = ballPosL + 'px';
                      }
                }

//condition when ball does not collides with the Left Rod
                    if( ballC.left - 10 <= 0 ){
                     // a) the opposite player gets the point
                        // console.log('collision from left rod', ballC);
                        pointB.innerText = parseInt(pointB.innerText) + 1;
                        localStorage.setItem('lastServeWinner', 'Rod 2');
                     // b) clear the interval
                        clearInterval(anyDirection);   
                        ball.style.top = 18 + 'rem';//undrstand why its necessary to write this
                        ball.style.left = 41 + 'rem';
                     }
//conditon when the ball collides with the left rod                   
                     else if( ballC.left <= lrodC.width ){//here the lroC which we are using is of the lroC above which we mentioned above during the rods movement since here also we need lrodC for the movement of the rod only.
                         if( lrodC.top <= ballC.top && ballC.bottom <= lrodC.bottom){   
                            ballSpeed = 5;
                            angle = 3;
                            // console.log(ballSpeed, angle);
                            ballPosT = ballPosT + ballSpeed; 
                            ballPosL = ballPosL + ballSpeed + angle;
                            ball.style.top = ballPosT + 'px';
                            ball.style.left = ballPosL + 'px';
                         } 
                     }
// condition when the ball collides up/down
                    else if( ballC.top <= 0 || ballC.bottom >= window.innerHeight){
                        console.log('up down executed');
                        ballSpeed = -5;
                        angle = -10;
                        ballPosL = ballPosL + ballSpeed;
                        ballPosT = ballPosT + ballSpeed + angle;
                        ball.style.top = ballPosT + 'px';
                        ball.style.left = ballPosL + 'px';  
                     }                                   

            },50);
            
            // if( ((window.innerWidth - ballC.right) == rrodC.width) && ( rrodC.top <= ballC.top && ballC.bottom <=rrodC.bottom ) ){
               
            // }
           
        

    }
});

//COLLISION OF THE BALL WITH THE RODS
//Left Rod
//var lrodC =  lrod.getBoundingClientRect();
//var rrodC = rrod.getBoundingClientRect();
//if( (ballC.left == lrodC.width) && ( lrodC.top <= ballC.top && ballC.bottom <= lrodC.bottom ) ){
     
//}
//Right Rod


//COLLISION OF THE BALL ON LEFT/RIGHT
//Left Rod
//if( ballC.left == 0 ){

//}
//Right Rod


//COLLISION OF THE BALL ON TOP OR BOTTOM 
//if( ballC.top == 0 || ballC.bottom == window.innerHeight ){
    
//}

        // if(Math.random() > 0.5){
        // ballPosT = ballPosT + ballSpeed;
        // ballPosL = ballPosL + ballSpeed;
        // document.getElementById('ball').style.top = ballPosT + 'px';
        // document.getElementById('ball').style.left = ballPosL + 'px';
        // }
        // else{
        // ballPosT = ballPosT + ballSpeed;
        // ballPosL = ballPosL - ballSpeed;
        // document.getElementById('ball').style.top = ballPosT + 'px';
        // document.getElementById('ball').style.left = ballPosL + 'px';
        // }