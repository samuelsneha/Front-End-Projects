// this has only toggle functionality
var itemsList = document.getElementById('menulist');
var addItems = document.getElementById('formBtn');
const items = JSON.parse(localStorage.getItem('items')) || []; //everytime on page reload, we get the content from local storage and if nothing is there then we take an empty array.
// items is an array of objects

//here we are doing toggle using target.dataset.index and done key.
function toggleDone(event){
    if(! event.target.matches('input')) //just to make sure we dont get other elements like li.  We want only input elements to come in the target 
        return;
//Thats event delegation where we listen for click on something higher and then inside of it we check  if its the actual thing that we want because it could trigger on few different things.        
    console.log(event.target);
    var target = event.target;
    var index = target.dataset.index;
    console.log(target.dataset.index);
    items[index].done = !items[index].done;
    localStorage.setItem( 'items', JSON.stringify(items)); 
    populateList(items, itemsList); //D8 - Why are we doing this ?
}

function populateList(items1 = [], itemsList1){ //D2 -a) No need to define them? b) how items1 = [] works when we pass aan array which has things and doent have inside it?
    var itemsArr =  items1.map((element,i) => { //D3 - Why i and where was it and element declared. 
             return `<li> <input type = 'checkbox' data-index = ${i} id='items${i}' ${element.done ? 'checked':''} /> <label for = "" > ${element.text} </label> </li>`; //D4 - Why data index , how does ${i} work , and why the } is after checked for ternary opr
         });
    itemsList1.innerHTML  =  itemsArr.join('');//D5 - Why join? Coz of join all the items will be in 1 sentence but we need diff sentences right
}
function createObj(event){
    event.preventDefault();//by default a form reloads the page. So to prevent the reloading we are doing this
    console.log(event);
    var item = { //D1 - why are we creating an object instead of just putting it in a list
        text:(this.querySelector('[name=item]')).value,
        done:false
    };
    console.log(item);
    items.push(item);
    console.log(items);
    localStorage.setItem( 'items', JSON.stringify(items)); //Updating the local storage every time add an item. We are doing this so that on page reload the content stays and does not disappear. But remember the checkboxes wont be there.  localStorage is a key-value store and you may only use strings on it. JSON.stringify(items) converts it into a JSON String equivalent 
    populateList(items, itemsList) // parameters should be the entire arraylist and where you want to put it
    this.reset(); //.reset() is a method for form elements
}
addItems.addEventListener('submit',createObj)// we are using submit coz it covers others cases also apart from user just clicking on submit button like pressing enter and so on. Also submit event can be added on forms only
itemsList.addEventListener('click', toggleDone);
populateList(items,itemsList); // D6 - Why are we doing this populateList() here ?
//D7 - Why at 23:00?
//<input type = 'checkbox' data-index = ${i} id='items${i}' checked = '' > whatever you put inside this checked attribute, it will be checked coz thats how it works. I mean  just the presences of checked attribute checks the input irrespective of what value it has inside it.