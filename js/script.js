const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const initialMenu = document.querySelector(".init-menu-screen");
const settingsScreen = document.querySelector(".settings-screen");
const buttonStart = document.querySelector(".btn-start");
const buttonPlay = document.querySelector(".btn-play");
const initialButtonSettings = document.querySelector(".btn-settings_0");
const buttonSettings = document.querySelector(".btn-settings_1");
const buttonBack = document.querySelector(".btn-back");

const eat_audio = new Audio("../assets/eat_sounds/audio.mp3");
const score_10_audio = new Audio("../assets/general/a.mp3");

const score_10_audio_0 = new Audio("../assets/general/a_0.mp3");
const score_10_audio_1 = new Audio("../assets/general/a_1.mp3");
const score_10_audio_2 = new Audio("../assets/general/a_2.mp3");
const score_10_audio_3 = new Audio("../assets/general/a_3.mp3");
const score_10_audio_4 = new Audio("../assets/general/a_4.mp3");

const size = 30;
const initialPosition = { x: 240, y: 240 };
const earn = 1;
const glow = 10;

let hasGameOver = false;

let snake = [initialPosition];

const incrementScore = () => {
  let currentScore = +score.innerText;
  currentScore += earn;
  score.innerText = currentScore;
  localStorage.setItem("current_score", currentScore);

  if (currentScore % 10 === 0) {
    //score_10_audio.play();

    /* const audio = randomNumber(0, 4);
    if (audio === 0) {
      score_10_audio_0.play();
    } else if (audio === 1) {
      score_10_audio_1.play();
    } else if (audio === 2) {
      score_10_audio_2.play();
    } else if (audio === 3) {
      score_10_audio_3.play();
    } else {
      score_10_audio_4.play();
    } */

    window.execute_anime_js_grid();
  }
};

const randomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomPosition = () => {
  const number = randomNumber(0, canvas.width - size);
  return Math.round(number / 30) * 30;
};

const randomColor = () => {
  let color = localStorage.getItem("food_color");

  if (!color) {
    localStorage.setItem("food_color", "2");
    color = "2";
  }

  if (color == "1") {
    let random = randomNumber(0, 255);
    return `rgb(${random}, ${random}, ${random})`;
  }

  if (color == "2") {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
  }

  if (color == "3") {
    let color = localStorage.getItem("custom_food_color");

    if (!color) {
      localStorage.setItem("custom_food_color", "#ECF0F1");
      color = "#ECF0F1";
    }

    return color;
  }
};

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: randomColor(),
};

let direction,
  loopId,
  baseSpeed = localStorage.getItem("speed") || "300",
  acceleration = false;

const drawFood = () => {
  const { x, y, color } = food;

  ctx.shadowColor = color;
  ctx.shadowBlur = glow;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;
};

const interpolateColor = (color1, color2, factor) => {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

const hexToRgb = (hex) => {
  let bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHex = (rgb) => {
  return (
    "#" +
    rgb
      .map((val) => {
        let hex = val.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const drawSnake = () => {
  const headColor = localStorage.getItem("snake_head_color") || "#ECF0F1";
  const bodyStartColor =
    localStorage.getItem("snake_initial_body_color") || "#229954";
  const bodyEndColor =
    localStorage.getItem("snake_final_body_color") || "#F9E79F";
  const snakeLength = snake.length;

  snake.forEach((position, index) => {
    let color;

    if (index == snakeLength - 1) {
      color = headColor;
    } else {
      const factor = index / (snakeLength - 1);
      color = interpolateColor(
        hexToRgb(bodyStartColor),
        hexToRgb(bodyEndColor),
        factor
      );
      color = rgbToHex(color);
    }

    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size, size);
  });
};

const moveSnake = () => {
  if (!direction) return;

  const head = snake[snake.length - 1];

  if (direction == "right") {
    snake.push({ x: head.x + size, y: head.y });
  }

  if (direction == "left") {
    snake.push({ x: head.x - size, y: head.y });
  }

  if (direction == "down") {
    snake.push({ x: head.x, y: head.y + size });
  }

  if (direction == "up") {
    snake.push({ x: head.x, y: head.y - size });
  }

  snake.shift();
};

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#191919";

  for (let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 510);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(510, i);
    ctx.stroke();
  }
};

const eat = () => {
  const head = snake[snake.length - 1];

  if (head.x == food.x && head.y == food.y) {
    incrementScore();
    snake.push(head);
    eat_audio.play();

    let x = randomPosition();
    let y = randomPosition();

    while (snake.find((position) => position.x == x && position.y == y)) {
      x = randomPosition();
      y = randomPosition();
    }

    food.x = x;
    food.y = y;
    food.color = randomColor();
  }
};

const checkCollision = () => {
  const head = snake[snake.length - 1];
  const canvasLimit = canvas.width - size;
  const neckIndex = snake.length - 2;

  const wallCollision =
    head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

  const selfCollision = snake.find((position, index) => {
    return index < neckIndex && position.x == head.x && position.y == head.y;
  });

  if (
    wallCollision ||
    (selfCollision && localStorage.getItem("god_mode") === "0")
  ) {
    gameOver();
  }
};

const initMenu = () => {
  document.querySelector(".init-menu-screen").style.display = "flex";
};

initMenu();

const gameOver = () => {
  direction = undefined;
  hasGameOver = true;

  if (settingsScreen.style.display != "flex") {
    menu.style.display = "flex";
  }

  finalScore.innerText = score.innerText;
  canvas.style.filter = "blur(2px)";
};

const gameLoop = () => {
  clearInterval(loopId);

  ctx.clearRect(0, 0, 510, 510);
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  eat();
  checkCollision();

  let speed = baseSpeed;
  if (acceleration) {
    speed = baseSpeed / 2;
  }

  loopId = setTimeout(() => {
    gameLoop();
  }, speed);
};

gameLoop();

document.addEventListener("keydown", ({ key }) => {
  if (key == "ArrowRight" && direction != "left" && !hasGameOver) {
    direction = "right";
  }

  if (key == "ArrowLeft" && direction != "right" && !hasGameOver) {
    direction = "left";
  }

  if (key == "ArrowDown" && direction != "up" && !hasGameOver) {
    direction = "down";
  }

  if (key == "ArrowUp" && direction != "down" && !hasGameOver) {
    direction = "up";
  }

  if (
    key === "e" &&
    localStorage.getItem("acceleration") === "1" &&
    !hasGameOver
  ) {
    acceleration = true;
  }
});

document.addEventListener("keyup", ({ key }) => {
  if (
    key === "e" &&
    localStorage.getItem("acceleration") === "1" &&
    !hasGameOver
  ) {
    acceleration = false;
  }
});

buttonStart.addEventListener("click", () => {
  initialMenu.style.display = "none";
  menu.style.display = "none";
  canvas.style.filter = "none";
  hasGameOver = false;
});

buttonPlay.addEventListener("click", () => {
  score.innerText = "00";
  menu.style.display = "none";
  menu.style.display = "none";
  canvas.style.filter = "none";
  hasGameOver = false;

  snake = [initialPosition];
});

initialButtonSettings.addEventListener("click", () => {
  localStorage.setItem("settings_by", "initialMenu");
  initialMenu.style.display = "none";
  settingsScreen.style.display = "flex";
});

buttonSettings.addEventListener("click", () => {
  localStorage.setItem("settings_by", "menu");
  menu.style.display = "none";
  settingsScreen.style.display = "flex";
});

buttonBack.addEventListener("click", () => {
  settingsScreen.style.display = "none";
  if (localStorage.getItem("settings_by") === "initialMenu") {
    initialMenu.style.display = "flex";
  } else {
    menu.style.display = "flex";
  }

  location.reload();
});
