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

var deleteHtlmItem;

var todoArray = JSON.parse(localStorage.getItem("todos"));
if (todoArray === null) {
  todoArray = [];
}
todoArray.forEach((element) => {
  renderTodo(element.id, element.name);
});
todoArray.forEach((element) => {
  if (element.checked === true) {
    var elementchecked = document.getElementById(String(element.id));
    //keep this checkbox check
    console.log(elementchecked.parentElement.firstChild.firstChild.nextSibling);
    elementchecked.style.textDecoration = "line-through";
  } else if (element.checked === false) {
    elementchecked.style.textDecoration = "none";
  }
});

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
input.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    addTodo();
  }
});
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
    checked: ''
  });
  localStorage.setItem("todos", JSON.stringify(todoArray));
  renderTodo(newId, name);
}

function renderTodo(id, name) {
  var pTodo = document.createElement("p");
  pTodo.innerText = name;

  var listItem = document.createElement("li");
  listItem.id = id;
  listItem.className = "todo-element";

  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList = "check";

  var deleteItem = document.createElement("i");
  deleteItem.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  deleteItem.style.cursor = "pointer";

  todoContainer.appendChild(listItem);
  listItem.appendChild(pTodo);
  listItem.appendChild(checkBox);
  listItem.appendChild(deleteItem);

  registerCheckEvent(checkBox, listItem);
  registerDeleteEvent(deleteItem, listItem);

  input.value = "";
}
function registerCheckEvent(checkBox, todo) {
  var itemChecked = checkBox.parentElement;

  checkBox.addEventListener("click", function () {
    if (checkBox.checked == true) {
      itemChecked.style.textDecoration = "line-through";
      var index = todoArray.findIndex((item) => item.id === +todo.id);
      todoArray[index].checked = true;
      console.log(todoArray);
      localStorage.setItem("todos", JSON.stringify(todoArray));
    }
    else {
      itemChecked.style.textDecoration = "none";
      var index = todoArray.findIndex((item) => item.id === +todo.id);
      todoArray[index].checked = false;
      console.log(todoArray);
      localStorage.setItem("todos", JSON.stringify(todoArray));
    }
  });
}
function registerDeleteEvent(itemToDelete, todo) {
  itemToDelete.addEventListener("click", function () {
    var index = todoArray.findIndex((item) => item.id === +todo.id);
    todoArray.splice(index, 1);
    deleteHtlmItem = document.getElementById(String(todo.id)).remove();

    localStorage.setItem("todos", JSON.stringify(todoArray));
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
