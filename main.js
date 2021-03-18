/* Variables */

const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastMole;
let timeUp = false;
const gameTime = 10000;
let count;
let timerId;

/* Functions */

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
  const time = randomTime(1000, 1500);
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
};

startBtn.addEventListener("click", startGame, { once: true });
moles.forEach((mole) => mole.addEventListener("click", changeScore));
