/* Variables */
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;

/* Functions */
const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHole = (holes) => {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    console.log("the same");
    return randomHole(holes);
  }
  lastHole = hole;
  console.log(hole);
  return hole;
};
