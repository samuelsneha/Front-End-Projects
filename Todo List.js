//this has delete as well as toggle functionality
//(
    var first = function (){
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    async function fetchTodos(){
        
        
        
        //here we are just fetching the api's
        //function fetchTodos(){
        // //GET Request
        // fetch('https://jsonplaceholder.typicode.com/todos')//calling the fetch method which returns a promise
        //     .then(function (response){// This is promise one.This whatever is inside .then() ie.function (response)  is the callback function which is equivalent to promise resolve and it responsible for making the function async and response is resolve
        //         console.log(response);//this what we will get is the response object. So this response Object needs to be converted to JSON first
        //         return response.json();//calling the json function on the response and this will give me the todo items.
        //         //response.json will give me another promise.So i can do .then() on it.
        //     }).then(function (data){// this is the 2nd promise which is responsoble for processing tha data from  return response.json()
        //         console.log(data);
        //         tasks = data.slice(0,10);
        //         renderList();
        //     }).catch(function(error){
        //         console.log('error',error);
        //     })
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            console.log('reponse.json is :' , data);
            tasks = data.slice(0,10);// array function is slice 
            renderList();
        } catch (error){
            console.log(error);
        }
    }

    function addTaskToDOM (task){//4 it's here the api is actually getting appended
        let li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked': ''} class="custom-checkbox">
            <div> ${task.title} </div>
            <a><i class="delete fas fa-trash" id="delete-${task.id}"></i></a>`;
            // creating a new element and then appending it <img src="bin.svg" class="delete" data-id="12"
            //       <label for="${task.id}" class="custom-checkbox">${task.title}</label>
        taskList.append(li);
    }

    function renderList () {// 3 - after some updation like add/delete, how does the Todo list looks now
        taskList.innerHTML = '';//not necessary
        for( let i = 0; i < tasks.length; i++){//the only funcion of this list is the for loop
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;//to display the number of todo lista
    }

    //here we are doing toggle using id, filter and completed key
    function toggleTask (taskId) {// like a check box, in this function we wor on individual elements
      //  console.log(taskId);  this is a string coz taskId is an object and objects are stored as string by default.
        let task = tasks.filter( function (task){//whichever task is completed, that goes into the task array
            return task.id ===Number( taskId )//coz its a filter, task is an array
        });
        if(task.length > 0 ){
            let currentTask = task[0];

            currentTask.completed =! currentTask.completed;// like !true, !false
            renderList();
            showNotification('Task toggled successfully');
            return;    
        }
        showNotification('Could not toggle the task');
    }
// here we have used id and filter function to delete a task
    function deleteTask (taskId) {
        console.log(tasks);
        let newTasks = tasks.filter( function (task){
            return task.id !== Number(taskId)//gives T or F. If false then nothing happens, ie. that task is not added in newTask  If TRUE THEN goes inside new array

        })
        //task.id is a number, not string
        tasks = newTasks;//all the tasks which i dont want to delete
        console.log(tasks);
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask (task) { //2
        if(task){
    // POST REQUEST        
    //     fetch('https://jsonplaceholder.typicode.com/todos',{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(task),
    //     })
    //    // calling the fetch method which returns a promise
    //         .then(function (response){
    //             console.log(response);//this what we will get is the response object. So this response Object needs to be converted to JSON first
    //             return response.json();//calling the json function on the response and this will give me the todo items.
    //             //response.jason will give me another promise.So i can do .then() on it.
    //         }).then(function (data){
    //             console.log(data);
    //           //  tasks = data.slice(0,10);
    //           //  renderList();
    //           tasks.push(task);// push is an array property is js
    //           renderList();
    //           showNotification('Task added successfully');
    //         }).catch(function(error){
    //             console.log('error',error);
    //         })

    //GET REQUEST
            tasks.push(task);// push is an array property is js
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task cannot be added');// just for extra check. In backend u will learn more
    }

    function showNotification(text) {
        alert(text);
    }

    function handleKeyInputPress (e) { //1
      //  console.log(e);
        if(e.key === 'Enter'){//e is js object, .key is the property of the object and 'Enter' is the values of it
            let text = e.target.value;// text is any type of content, whatever user has entered

            if( !text ){
                showNotification('Task text cannot be empty');
                return;
            }
            let task = {
                title:text,
                id:Date.now(),
                completed: false
            }
            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickListener(e){// either deletes or checkbox ie.toggle
        let target = e.target;
        console.log(target);

        if(target.className == 'delete'){
            let taskId = target.id.slice(7);
            console.log(taskId);
            deleteTask(taskId);
            return;
        }else if(target.className == 'custom-checkbox'){
            console.log('checkbox');
            let taskId = target.id;
            toggleTask(taskId);
            return;
        }
        else{
            console.log('hello');
        }
    }

    function initializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleKeyInputPress);
        document.addEventListener('click', handleClickListener);
    }
     initializeApp();
    // let task123 = {
    //     a:'hello',
    //     b:'hi'
    // }
    // return task123;

}
 //var second = first();
 first();
//)()

