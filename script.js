const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const difficultyList = document.querySelector("#difficulty-list");
const timeEl = document.querySelector("#time");
const hitsEl = document.querySelector("#hits");
const accuracyEl = document.querySelector("#accuracy");
const board = document.querySelector("#board");
const restartBtn = document.querySelectorAll(".restart");
const hitsOver = document.querySelector("#hits-over");
const accuracyOver = document.querySelector("#accuracy-over");
const pauseBtn = document.querySelector("#pause");
const fullScreenBtn = document.querySelector("#fullscreen");
const minimizeBtn = document.querySelector("#minimize");

let time = 0;
let difficulty = 0;
let hits = 0;
let missed = 0;
let accuracy = 0;
let interval;
let playing = false;
let unlimited = false;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
  time = parseInt(event.target.getAttribute("data-time"));
  unlimited = event.target.getAttribute("data-unlimited");
  screens[1].classList.add("up");
} if (event.target.classList.contains("back-btn")) {
   screens[0].classList.remove("up"); 
  }});

difficultyList.addEventListener("click", (event) => {
  if (event.target.classList.contains("difficulty-btn")) {
    difficulty = parseInt(event.target.getAttribute("data-difficulty"));
    screens[2].classList.add("up");
  
  } if (event.target.classList.contains("back-btn2")) {
    screens[1].classList.remove("up");
   }});

thisthing.addEventListener("click", (event) => {
  if (event.target.classList.contains("begin")&&
      playing === false) {
    startGame();
      }});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    hits++;
    event.target.remove();
    createRandomCircle();
  } else {
    missed++;
  }
  hitsEl.innerHTML = hits;
  calculateAccuracy();
});

function calculateAccuracy() {
  accuracy = (hits / (hits + missed)) * 100;
  if (isNaN(accuracy)) {
    accuracy = 0;
  }
  accuracy = accuracy.toFixed(2);
  accuracyEl.innerHTML = `${accuracy}%`;
}

function startGame() {
  playing = true;
  interval = setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (unlimited) {
    setTime("Unlimited");
    return;
  }
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;

    miliseconds = time * 1000;
    var minutes = Math.floor(miliseconds / (1000 * 60));
    var seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(`${minutes}:${seconds}`);
  }
}

function setTime(value) {
  timeEl.innerHTML = value;
}

function finishGame() {
  playing = false;
  clearInterval(interval);
  board.innerHTML = "";
  screens[3].classList.add("up");
  hitsEl.innerHTML = 0;
  timeEl.innerHTML = "00:00";
  accuracyEl.innerHTML = "0%";
  hitsOver.innerHTML = hits;
  accuracyOver.innerHTML = `${accuracy}%`;
}

function createRandomCircle() {
  if (!playing) {
    return;
  }
  const circle = document.createElement("div");
  const size = getRandomNumber(30, 100);
  const colors = ["#ffffff"];
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  let color = Math.floor(Math.random() * 5);
  circle.style.background = `${colors[color]}`;
  board.append(circle);

  if (difficulty === 1) {
    circle.style.animationDuration = "3s";
  } else if (difficulty === 2) {
    circle.style.animationDuration = "2s";
  } else if (difficulty === 3) {
    circle.style.animationDuration = "1s";
  } 
  else {
    circle.style.animationDuration = "0.5s";
  }

  circle.addEventListener("animationend", () => {
    circle.remove();
    missedit();
    createRandomCircle();
    calculateAccuracy();


  });
}

function missedit() {
  missed++;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

restartBtn.forEach((btn) => {
  btn.addEventListener("click", restartGame);
});

function restartGame() {
  finishGame();
  screens[0].classList.remove("up");
  screens[1].classList.remove("up");
  screens[2].classList.remove("up");
  screens[3].classList.remove("up");
  time = 0;
  difficulty = 0;
  hits = 0;
  missed = 0;
  accuracy = 0;
  interval;
  playing = false;
  unlimited = false;
}

const elem = document.documentElement;

function fullScreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }

  fullScreenBtn.style.display = "none";
  minimizeBtn.style.display = "block";
}

function minimize() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }

  fullScreenBtn.style.display = "block";
  minimizeBtn.style.display = "none";
}

fullScreenBtn.addEventListener("click", fullScreen);
minimizeBtn.addEventListener("click", minimize);
