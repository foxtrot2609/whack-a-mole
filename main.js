/* Variables */

// state variables
let lastMole;
let timeUp = false;
let currentLevel = localStorage.getItem("level");
// constants
let count;
let timerId;
let startOfTimeGap = 2000;
let endOfTimeGap = 3000;
const gameTime = 5000;
// elements
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

/* Functions */

const getBestResult = () => {
  if (localStorage.getItem("result") === null) {
    result.textContent = "0";
  } else {
    result.textContent = localStorage.getItem("result");
  }
};

const getLevel = () => {
  if (currentLevel === null) {
    level.textContent = "0";
  } else {
    level.textContent = currentLevel;
    startOfTimeGap -= +currentLevel * 100;
    endOfTimeGap -= +currentLevel * 100;
  }
};

const setLevel = () => {
  +currentLevel++;
  localStorage.setItem("level", currentLevel);
  level.textContent = currentLevel;
  startOfTimeGap -= 100;
  endOfTimeGap -= 100;
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

function checkLevel() {
  if (timeUp) {
    showMole();
  } else {
    this.addEventListener(
      "transitionend",
      () => {
        if (count >= gameTime / 1000) setLevel();
      },
      {
        once: true,
      }
    );
  }
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
    checkLevel();
  }, time);
};

function changeScore() {
  score.textContent = ++count;
  clearTimeout(timerId);
  this.classList.remove("up");
  this.classList.remove("active");
  checkLevel();

  // set best result
  if (count > localStorage.getItem("result")) {
    localStorage.setItem("result", count);
    result.textContent = localStorage.getItem("result");
  }
};

moles.forEach((mole) => mole.addEventListener("click", changeScore));
startBtn.addEventListener("click", startGame, { once: true });

getBestResult();
getLevel();
