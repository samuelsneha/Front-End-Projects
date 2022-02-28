var numButtons = document.getElementsByClassName("numButton");
var numButtonsKey = ["0","1","2","3","4","5","6","7","8","9"];
var oprButtonsKey = ["+","-","%","/","*"];
var equalButtonKey = "=";
//var signedButtonKey = [];
var dotButtonKey = ".";
var clearButtonKey = "Escape" 
var a = document.getElementById("display-box");
//var j=0;
var op1 = null;
var op2 = null;
var operator;
var oprKey;
a.textContent = "";
//The reason you cant put 0 over here is coz 0 + ""+8 gives 08.
//So if you just click on 8, it will show as 08 on the display which you dont want.
//So we replaced 0 by emplty string.
for( let i = 0; i < numButtons.length; i++){
    numButtons[i].addEventListener("click",function(){
       a.textContent = (a.textContent) + ( numButtons[i].innerText);// i can use numButtons[i] also right over here instead of this? use let if numButtons[i] is used. else do this if u are not using let.
      // a.textContent = (a.textContent) + "" + ( this.innerText);// why empty string was given?
     });
}
//console.log("hello"); this was done just for the purpose to let you know that the for loop is not waiting for the event to take place and then print this.
//for loop goes to each button and asks them to wait for their respective events to trigger them.
//buttons will execute the event only when an event will take place and by then all the for the loops gets executed within micoseconds. 
//So you get this in output printed even before any event has taken place.
var oprButtons = document.getElementsByClassName("oprButton");
for( let k = 0; k < oprButtons.length; k++ ){// its wise to put let instead of var.
    oprButtons[k].addEventListener("click",function(){
        operator = oprButtons[k].innerHTML;  
       // console.log(op1, operator, a.textContent); 
        if( ! op1){//this we are doing coz null in js is false. So !false is true. So it will perform only if op1 is null coz we dont want to perform any operation on null. 
            op1 = a.textContent;
        }
        else{// coz op1 is not null which means its not the first perand so we are performing operations on them
            op1 = eval (op1 + operator + (a.textContent));
        }
    a.textContent = "";
    //  console.log(op1);
    //  console.log(operator);
    //j = 0;
    } );
}

var equalButton = document.querySelector(".equalButton");
equalButton.addEventListener("click", func2);
function func2(){

    if( op1 == null && op2 == null && operator == undefined && a.textContent == "" ){ //CC-1 
        a.textContent = 0;
    } 
    else if( a.textContent == ""){ //CC-2
        alert('Enter second operand');
    }
     else if( operator == undefined){ //CC-3
         a.textContent = a.textContent;
     }
    else{
        op2 = parseFloat(a.textContent);

        if(operator == "/" || operator == "%" && op2 == 0  ){ // CC-4
            alert('Invalid operation');
                 op1 = null;
                 op2 = null;
                 a.textContent="";
        }
        else{         
        var result = eval( op1+ operator + op2 );
        a.textContent = parseFloat(result);
        op1 = null;//for the next operation
        op2 = null;
        }
    } 
}

 var signedButton = document.querySelector(".signedButton");
 signedButton.addEventListener("click",function(){
     if( a.textContent == ""){
         alert("First enter an operand");
     }
     else if(parseFloat(a.textContent) > 0){
         a.textContent = "-" + a.textContent;
     }
     else{
         a.textContent = a.textContent.substr(1);
     }
     
 });

 var dotButton = document.querySelector(".dotButton");
 dotButton.addEventListener("click",function(){
     a.textContent = a.textContent + dotButton.innerHTML;
 });

 var clearButton = document.querySelector(".clearButton");
 clearButton.addEventListener("click",function(){
     a.textContent = "";
 }); 


 ///KEYBOARD EVENTS

 document.addEventListener("keydown", function(event){

    var value=event.key;
    if(!numButtonsKey.includes (value) && !oprButtonsKey.includes(value) && !equalButtonKey.includes(value) && !dotButtonKey.includes(value) && !clearButtonKey.includes(value) ){
        alert('Enter valid Key');
    }     
    else if (numButtonsKey.includes (value)) {
    a.textContent = (a.textContent) +  ( value);

    }
    else if (oprButtonsKey.includes(value)){
        oprKey = value;
        if( ! op1){
          op1 = a.textContent;
         }
     
      else{
          op1 = eval (op1 + oprKey + (a.textContent));
      }
       a.textContent = "";
    }
    else if (equalButtonKey == value ) { 
    if( op1 == null && op2 == null && oprKey == undefined && a.textContent == "" ){ //CC-1 
            a.textContent = 0;
    } 
    else if( a.textContent == ""){ //CC-2
        alert('Enter second operand');
    }
    else if( oprKey == undefined){ //CC-3
        a.textContent = a.textContent;
    }
    else{  
        op2 = parseFloat(a.textContent);  
        if(oprKey == "/"  && op2 == 0  ){ // CC-4
            alert('Invalid operation');
                 op1 = null;
                 op2 = null;
                 a.textContent="";
        }
        else{
            var result = eval( op1+ oprKey + op2 );
            a.textContent = parseFloat(result);
            op1 = null;//for the next operation
            op2 = null;
        }
    }
  }
    //else if(signedButtonKey.includes(value)){ }
    else if(dotButtonKey == value){
        a.textContent = a.textContent + "."; 
    }
    else if(clearButtonKey == value){
          a.textContent = "";
    }
        
});


