//Defining UI Element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('#task_list');
let clearTask = document.querySelector('#clear_task');
let taskFilter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//Setting event for function 
//
form.addEventListener('submit',addTask);
taskList.addEventListener('click', removeTask);
clearTask.addEventListener('click',clearTasks);
taskFilter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);

//Adding task in list
function addTask(e){
    if(taskInput.value === ''){
        alert('Please add a task!');
    }
    else{
        let li = document.createElement('li');
        li.className = "task";
        li.appendChild(document.createTextNode(taskInput.value + " "));
        
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}
//Removing task from list
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure?")){
            let element = e.target.parentElement;
            //console.log(element);
            element.remove();
            removeFromLS(element);
        }
    }
}

//Clearing all task
function clearTasks(){
    //taskList.innerHTML = ""; //easy way

    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

//Filtering tasks
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });

}

//Store in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach ( task => {
        let li = document.createElement('li');
        li.className = "task";
        li.appendChild(document.createTextNode(task + " "));
        
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);
    });
}

function removeFromLS(tasksItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = tasksItem;
    li.removeChild(li.lastChild);

    tasks.forEach ((task,index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}