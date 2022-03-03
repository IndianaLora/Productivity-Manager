const timezone = document.getElementById("timezone");
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById("timer");

const todoContainer = document.getElementById("todo-container");
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addTodo")

const clock = document.createElement("h1");
const date = document.createElement("div");
const dateTime = document.createElement("h1");
const localTime = document.createElement("h3");

const todo=document.createElement("h3");

clock.className = 'center';

var interval;
var time = 1;
var todoArray =[];

setInterval(function () {       
    currentDate();
},1000)

function currentDate() {
    const today = new Date();
    const currentDate = new Date(Date.UTC(today.getFullYear(), today.getDate(), today.getMonth(), today.getHours() + " ", 0, 0));
    const renderDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateTime.innerHTML = currentDate.toLocaleDateString(undefined, renderDate);
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" +today.getSeconds();
        localTime.innerHTML = time;
}

function todoList(){
   todoArray.push(input.value)
   todoArray.forEach(element =>{
       var list = document.createElement("li");
       list.innerHTML=element;
       todoContainer.appendChild(list);
   })
   input.value = " ";
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

addButton.addEventListener("click",todoList);


timer.appendChild(clock);
timezone.appendChild(dateTime);
timezone.appendChild(localTime);
