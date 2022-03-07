const timezone = document.getElementById("timezone");
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById("timer");

const todoContainer = document.getElementById("todo-container");
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addTodo")

const clock = document.createElement("h1");
clock.className = 'center';
const date = document.createElement("div");
const dateTime = document.createElement("h1");
const localTime = document.createElement("h3");
const todo = document.createElement("h3");


var interval;
var time = 1;
var todoArray = [{
    id:0,
    name:""
}];


function currentDate() {
    var today = new Date();
    const currentDate = new Date(Date.UTC(today.getFullYear(), today.getDate() - 5, today.getMonth() + 5, today.getHours() + " ", 0, 0));
    const renderDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateTime.innerHTML = currentDate.toLocaleDateString(undefined, renderDate);

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    localTime.innerHTML = time;
}
function currentTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    localTime.innerHTML = time;
}
function todoList() {
    //add the todo to an object
    todoArray.push({"id":todoArray[todoArray.length - 1].id+1,"name":input.value})
    var lastElememnt = todoArray[todoArray.length - 1].name;
    createTodo(lastElememnt);

}
function createTodo(todoElement){
  //create the list item
  var list = document.createElement("li");
  var checkBox = document.createElement("input");
  checkBox.setAttribute("type","checkbox");
  
  list.innerHTML = todoElement;
  todoContainer.appendChild(list);
  todoContainer.appendChild(checkBox);
  var itemChecked=checkBox.previousSibling;
  //reate check functionality
  checkBox.addEventListener("click",function(){
   if (checkBox.checked == true ){
    itemChecked.style.textDecoration = "line-through";
      } else {
        itemChecked.style.textDecoration = "none";
      }
  })
  //clear the input
  input.value = " ";
}
function deleteTodo(checkBoxItem){
    var itemChecked=checkBoxItem.previousSibling;
    
}
function startTimer() {
    interval = setInterval(function () {
        var hours = Math.floor(time / 60);
        var minutes = time % 60;
        clock.innerHTML = hours + ":" + minutes
        time++;
        pomodoroTime(time);
    }, 1000)
    start.className = 'disabled';
}

function stopTimer() {
    clearInterval(interval);
    start.classList.remove("disabled");
    start.className = "button";
}
function resetTimer() {
    clearInterval(interval);
    time = 1;
    clock.innerHTML = 0;

    start.classList.remove("disabled");
    start.className = "button";
}
function pomodoroTime(time) {
    if (time === 1500) {
        clearInterval(interval);
        setInterval(function () {
            //add audio here
        }, 5000)
    }
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

addButton.addEventListener("click", todoList);


timer.appendChild(clock);
timezone.appendChild(dateTime);
timezone.appendChild(localTime);


setInterval(function () {
    currentTime();
}, 1000);
currentDate();
