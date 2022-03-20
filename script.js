const timezone = document.getElementById("timezone");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

const todoContainer = document.getElementById("todo-container");
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addTodo");

const clock = document.createElement("h1");
clock.className = "center";
const date = document.createElement("div");
const dateTime = document.createElement("h1");
const localTime = document.createElement("h3");
const todo = document.createElement("h3");

var interval;
var time = 0;

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

  var todos = JSON.parse(localStorage.getItem("todos"));
  const newId =
    todoArray.length === 0 ? 1 : todoArray[todoArray.length - 1].id + 1;
  todos !== null
    ? console.log("hey")
    : todoArray.push({
        id: newId,
        name,
      });
      
  input.value = "";
  localStorage.setItem("todos", JSON.stringify(todoArray));
  console.log(todos);
  renderTodo();
}

function renderTodo() {
  var todos = JSON.parse(localStorage.getItem("todos"));
  if (todos !== null) {
    var element = todos[todos.length - 1];
    var listItem = document.createElement("li");
    listItem.innerHTML = element.name;
    listItem.id = element.id;
    listItem.className = "todo-element";

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList = "check";

    var deleteItem = document.createElement("i");
    deleteItem.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteItem.style.cursor = "pointer";

    todoContainer.appendChild(listItem);
    listItem.appendChild(checkBox);
    listItem.appendChild(deleteItem);

    registerCheckEvent(checkBox);
    registerDeleteEvent(deleteItem, listItem);
  }
}

function registerCheckEvent(checkBox) {
  var itemChecked = checkBox.parentElement;
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
function startTimer() {
  interval = setInterval(function () {
    var hours = Math.floor(time / 60);
    var minutes = time % 60;
    clock.innerHTML = hours + ":" + minutes;
    time++;
    pomodoroTime(time);
  }, 1000);
  start.className = "disabled";
}

function stopTimer() {
  clearInterval(interval);
  start.classList.remove("disabled");
  start.className = "buttons";
}
function resetTimer() {
  clearInterval(interval);
  time = 1;
  clock.innerHTML = 0;

  start.classList.remove("disabled");
  start.className = "buttons";
}
function pomodoroTime(time) {
  if (time === 1500) {
    clearInterval(interval);
    setInterval(function () {
      //add audio here
    }, 5000);
  }
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

addButton.addEventListener("click", addTodo);

timer.appendChild(clock);
timezone.appendChild(dateTime);
timezone.appendChild(localTime);

setInterval(function () {
  currentTime();
}, 1000);
currentDate();
