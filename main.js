/* Variables */

// state variables
let lastMole;
let timeUp = false;
// constants
let count;
let timerId;
let startOfTimeGap = 1500;
let endOfTimeGap = 2000;
const gameTime = 15000;
// elements
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

/* Functions */

const setBestResult = () => {
  if (localStorage.getItem("result") === null) {
    result.textContent = "0";
  } else {
    result.textContent = localStorage.getItem("result");
  }
};

const setLevel = () => {
  if (localStorage.getItem("level") === null) {
    level.textContent = "0";
  } else {
    level.textContent = localStorage.getItem("level");
  }
};

const startGame = () => {
  count = 0;
  score.textContent = count;
  timeUp = true;
  showMole();
  setTimeout(() => {
    timeUp = false;
    startBtn.addEventListener("click", startGame, { once: true });
  }, gameTime);
};

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomMole = (moles) => {
  const index = Math.floor(Math.random() * holes.length);
  const mole = moles[index];
  if (mole === lastMole) {
    return randomMole(moles);
  }
  lastMole = mole;
  return mole;
};

const showMole = () => {
  const time = randomTime(startOfTimeGap, endOfTimeGap);
  const mole = randomMole(moles);
  mole.classList.add("up");
  mole.addEventListener("transitionend", () => mole.classList.add("active"), {
    once: true,
  });
  timerId = setTimeout(() => {
    mole.classList.remove("up");
    mole.classList.remove("active");
    if (timeUp) showMole();
  }, time);
};

function changeScore() {
  score.textContent = ++count;
  clearTimeout(timerId);
  this.classList.remove("up");
  this.classList.remove("active");
  if (timeUp) showMole();
  // set best result
  if (count > localStorage.getItem("result")) {
    localStorage.setItem("result", count);
    result.textContent = localStorage.getItem("result");
  }
}

moles.forEach((mole) => mole.addEventListener("click", changeScore));
startBtn.addEventListener("click", startGame, { once: true });

setBestResult();