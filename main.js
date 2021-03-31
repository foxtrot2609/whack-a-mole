/* Variables */

// state variables
let lastMole;
let timeUp = false;
let bestResult = localStorage.getItem("result");
let currentLevel = localStorage.getItem("level");
let playedGames = localStorage.getItem("played");
// constants
let count;
let timerId;
let startOfTimeGap = 1500;
let endOfTimeGap = 2000;
const gameTime = 10000;
const timeStep = 100;
// elements
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

/* Functions */

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

const getBestResult = () => {
  if (bestResult === null) {
    result.textContent = "0";
  } else {
    result.textContent = bestResult;
  }
};

const setBestResult = () => {
  if (count > bestResult) {
    localStorage.setItem("result", count);
    result.textContent = bestResult;
  }
};

const getPlayed = () => {
  if (playedGames === null) {
    played.textContent = "0";
  } else {
    played.textContent = playedGames;
  }
};

const setPlayed = () => {
  +playedGames++;
  played.textContent = playedGames;
  localStorage.setItem("played", playedGames);
};

const getLevel = () => {
  if (currentLevel === null) {
    level.textContent = "0";
  } else {
    level.textContent = currentLevel;
    startOfTimeGap -= +currentLevel * timeStep;
    endOfTimeGap -= +currentLevel * timeStep;
  }
};

const setLevel = () => {
  +currentLevel++;
  localStorage.setItem("level", currentLevel);
  level.textContent = currentLevel;
  startOfTimeGap -= timeStep;
  endOfTimeGap -= timeStep;
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

const showMole = () => {
  const time = randomTime(startOfTimeGap, endOfTimeGap);
  const mole = randomMole(moles);
  mole.classList.add("up");
  mole.addEventListener("transitionend", 
    () => mole.classList.add("active"), 
    {
      once: true,
    }
  );
  timerId = setTimeout(() => {
    mole.classList.remove("up");
    mole.classList.remove("active");
    setCounters();
  }, time);
};

function clickMole() {
  score.textContent = ++count;
  clearTimeout(timerId);
  this.classList.remove("up");
  this.classList.remove("active");
  setCounters();
  setBestResult();
}

function setCounters() {
  if (timeUp) {
    showMole();
  } else {
    this.addEventListener("transitionend",
      () => {
        setPlayed();
        if (count >= gameTime / 1000) setLevel();     
      },
      {
        once: true,
      }
    );
  }
}

moles.forEach(mole => mole.addEventListener("click", clickMole));
startBtn.addEventListener("click", startGame, { once: true });

getBestResult();
getLevel();
getPlayed();
