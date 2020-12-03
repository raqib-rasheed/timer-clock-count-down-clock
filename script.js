let countDown;
const displayTimer = document.querySelector(".display__time-left");
const endtime = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll("[data-time]");
 

function timer(seconds){
  //if there is an existing countdown , clear it before actually runs the new timer//
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(()=>{
    const secondsLeft =Math.round((then - Date.now())/1000);
  if(secondsLeft < 0){
    clearInterval(countDown);
    return;
  }
  displayTimeLeft(secondsLeft);
  },1000);
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60);
  const secondsRemaining = seconds%60;
  const display = `${minutes}:${secondsRemaining<10?'0':''}${secondsRemaining}`;
  document.title = display;
  displayTimer.textContent = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endtime.textContent = `Be back at ${hour > 12? hour - 12 :hour}:${minutes<10? 0 : ''}${minutes}`;
}

function startTimer(){ 
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => 
  button.addEventListener('click',startTimer));

  document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
  });