// HTML elements
const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector("#score");

// GLOBAL VARIABLES
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

// FUNCTIONS

// Enable clicking on circles
const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

// Start game function
const startGame = () => {
  // If you don't touch anything after 3 highlights, game will stop
  if (rounds >= 3) {
    return endGame();
  }

  // So we can click the circles
  enableEvents();

  // Get a new active number
  const newActive = pickNew(active);

  // Add active class to new active num
  // Remove active class with the previous num
  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  // Set current num to new active num
  active = newActive;

  // Activate setTimeout
  // Pace will get faster every time startGame is called
  timer = setTimeout(startGame, pace);

  // Increase pace by subtracting
  pace -= 10;

  // Increase rounds
  rounds++;

  // Returns new active num
  // Makes sure that current and new active nums are not the same
  function pickNew(active) {
    const newActive = getRndInteger(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
};

// End game function
const endGame = () => {
  clearTimeout(timer);
  resetGame();
};

const resetGame = () => {
  window.location.reload();
};

// Click circle function
const clickCircle = (i) => {
  if (i !== active) {
    return endGame();
  }
  rounds = 0;
  score += 10;
  scoreDisplay.textContent = score;
};

// Random num generator
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// EVENT LISTENERS

// Start game button
startButton.addEventListener("click", startGame);

// End game button
endButton.addEventListener("click", endGame);

// Every circle
circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});
