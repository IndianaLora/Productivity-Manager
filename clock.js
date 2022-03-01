const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById("timer");

var interval;
var time = 1;

var clock = document.createElement("h1");
clock.className = 'center';
timer.appendChild(clock);

function startTimer() {
    interval = setInterval(function () {
        var hours = Math.floor(time/60);
        var minutes = time % 60;
        clock.innerHTML = hours + ":" +minutes
        time++;
        pomodoroTime(time);
    }, 1000)
    start.className='disabled';
}

function stopTimer() {
    clearInterval(interval);
    start.classList.remove("disabled");
    start.className="button";
}
function resetTimer() {
    clearInterval(interval);
    time=1;
    clock.innerHTML=0;

    start.classList.remove("disabled");
    start.className="button";
}
function pomodoroTime(time){
    if(time === 1500){
      clearInterval(interval);
      setInterval(function (){
        //add audio here
      },5000)
      
    }
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

