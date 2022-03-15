const timezone = document.getElementById("timezone");
const todoContainer = document.getElementById("todo-container");
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addTodo");

const date = document.createElement("div");
const dateTime = document.createElement("h1");
const localTime = document.createElement("h3");

var interval;

var todoArray = [];
var deleteHtlmItem;

function currentDate() {
    var today = new Date();
    const currentDate = new Date(
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours() + " ",
            0,
            0
        )
    );
    const renderDate = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    dateTime.innerHTML = currentDate.toLocaleDateString(undefined, renderDate);

    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    localTime.innerHTML = time;
}
function currentTime() {
    var today = new Date();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    localTime.innerHTML = time;
}
function addTodo() {
    const name = input.value;
    if (name.trim() === "") {
        return;
    }

    const newId =
        todoArray.length === 0 ? 1 : todoArray[todoArray.length - 1].id + 1;
    todoArray.push({
        id: newId,
        name,
    });
    renderTodo(newId, name);
}
function renderTodo(id, name) {
    //todo
    var todo = document.createElement("li");
    todo.innerHTML = name;
    todo.id = id;
    //checkbox
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    //trasg
    var deleteItem = document.createElement("i");
    deleteItem.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteItem.style.cursor = "pointer";
    //buttons
    var clock = document.createElement("h1");
    var start = document.createElement("button");
    var stop = document.createElement("button");
    var reset = document.createElement("button");
    start.innerHTML = "Start";
    stop.innerHTML = "Stop";
    reset.innerHTML = "Reset";
    //timer
    const timer = document.createElement("h4");
    timer.innerHTML = "Pomodoro Timer";
    timer.classList = "tittle";

    //events
    start.addEventListener("click", startTimer(clock));
    stop.addEventListener("click", stopTimer);
    reset.addEventListener("click", resetTimer);

    todo.append(checkBox, deleteItem, timer, clock, start, stop, reset);
    todoContainer.appendChild(todo);

    registerCheckEvent(todo,checkBox);
    registerDeleteEvent(deleteItem, todo);

    input.value = "";
}

function startTimer(clock) {
    interval = setInterval(function () {
        var hours = Math.floor(time / 60);
        var minutes = time % 60;
        clock.innerHTML = hours + ":" + minutes;
        time++;
        pomodoroTime(time);
    }, 1000);
    //start.className = "disabled";
}

function stopTimer() {
    clearInterval(interval);
    //start.classList.remove("disabled");
    // start.className = "button";
}
function resetTimer(clock) {
    clearInterval(interval);
    time = 1;
    clock.innerHTML = 0;

    // start.classList.remove("disabled");
    // start.className = "button";
}
function pomodoroTime(time) {
    if (time === 1500) {
        clearInterval(interval);
        setInterval(function () {
            //add audio here
        }, 5000);
    }
}
function registerCheckEvent(todo,checkBox) {
    var itemChecked = todo;
    //If activity its been checked mark it as check
    checkBox.addEventListener("click", function () {
        if (checkBox.checked == true) {
            itemChecked.style.textDecoration = "line-through";
        } else {
            itemChecked.style.textDecoration = "none";
        }
    });
}
function registerDeleteEvent(itemToDelete, todo) {
    itemToDelete.addEventListener("click", function () {
        var index = todoArray.findIndex((item) => item.id === +todo.id);
        todoArray.splice(index, 1);
        deleteHtlmItem = document.getElementById(String(todo.id)).remove();
    });
}

addButton.addEventListener("click", addTodo);
['click','keyup'].forEach(event=> addButton.addEventListener(event, addTodo(event),false));
timezone.appendChild(dateTime);
timezone.appendChild(localTime);

setInterval(function () {
    currentTime();
}, 1000);
currentDate();
