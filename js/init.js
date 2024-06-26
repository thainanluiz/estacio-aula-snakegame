document.addEventListener("DOMContentLoaded", () => {
  // Velocidade
  let speed_local_storage = localStorage.getItem("speed");
  if (!speed_local_storage) {
    localStorage.setItem("speed", "300");
    speed_local_storage = "300";
  }

  const speedButtons = document.querySelectorAll(".btn-speed");
  const speedMap = {
    100: "1",
    300: "2",
    500: "3",
  };

  if (speed_local_storage && speedMap[speed_local_storage]) {
    const selectedSpeedButton = document.querySelector(
      `.btn-speed[data-speed="${speedMap[speed_local_storage]}"]`
    );
    if (selectedSpeedButton) {
      selectedSpeedButton.classList.add("btn-selected");
    }
  }

  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      speedButtons.forEach((btn) => btn.classList.remove("btn-selected"));
      button.classList.add("btn-selected");
      const newSpeed = Object.keys(speedMap).find(
        (key) => speedMap[key] === button.getAttribute("data-speed")
      );
      localStorage.setItem("speed", newSpeed);
    });
  });

  // Cor da comida
  let food_color_local_storage = localStorage.getItem("food_color");
  if (!food_color_local_storage) {
    localStorage.setItem("food_color", "1");
    food_color_local_storage = "1";
  }

  const colorButtons = document.querySelectorAll(".btn-color");
  const colorInput = document.querySelector(".custom-food-color-input");
  const colorMap = {
    1: "1",
    2: "2",
    3: "3",
  };

  if (food_color_local_storage && colorMap[food_color_local_storage]) {
    const selectedColorButton = document.querySelector(
      `.btn-color[data-color="${colorMap[food_color_local_storage]}"]`
    );
    if (selectedColorButton) {
      selectedColorButton.classList.add("btn-selected");
      if (colorMap[food_color_local_storage] === "3") {
        colorInput.style.display = "block";
        const customColor = localStorage.getItem("custom_food_color");
        if (customColor) {
          colorInput.value = customColor;
        }
      }
    }
  }

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      colorButtons.forEach((btn) => btn.classList.remove("btn-selected"));
      button.classList.add("btn-selected");

      if (button.getAttribute("data-color") === "3") {
        colorInput.style.display = "block";
      } else {
        colorInput.style.display = "none";
      }

      const newColor = button.getAttribute("data-color");
      localStorage.setItem("food_color", newColor);
    });
  });

  colorInput.addEventListener("input", () => {
    const customColor = colorInput.value;

    if (customColor[0] !== "#") {
      colorInput.value = "#";
      return;
    }

    localStorage.setItem("custom_food_color", customColor);
  });

  // Aceleração
  let acceleration_local_storage = localStorage.getItem("acceleration");
  if (!acceleration_local_storage) {
    localStorage.setItem("acceleration", "0");
    acceleration_local_storage = "0";
  }

  const accelerationButtons = document.querySelectorAll(".btn-accelerate");
  const accelerationMap = {
    0: "0",
    1: "1",
  };

  if (
    acceleration_local_storage &&
    accelerationMap[acceleration_local_storage]
  ) {
    const selectedAccelerationButton = document.querySelector(
      `.btn-accelerate[data-accelerate="${accelerationMap[acceleration_local_storage]}"]`
    );
    if (selectedAccelerationButton) {
      selectedAccelerationButton.classList.add("btn-selected");
    }
  }

  accelerationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      accelerationButtons.forEach((btn) =>
        btn.classList.remove("btn-selected")
      );
      button.classList.add("btn-selected");
      const newAcceleration = Object.keys(accelerationMap).find(
        (key) => accelerationMap[key] === button.getAttribute("data-accelerate")
      );
      localStorage.setItem("acceleration", newAcceleration);
    });
  });

  // God mode
  let god_mode_local_storage = localStorage.getItem("god_mode");
  if (!god_mode_local_storage) {
    localStorage.setItem("god_mode", "0");
    god_mode_local_storage = "0";
  }

  const godModeButtons = document.querySelectorAll(".btn-god-mode");
  const godModeMap = {
    0: "0",
    1: "1",
  };

  if (god_mode_local_storage && godModeMap[god_mode_local_storage]) {
    const selectedGodModeButton = document.querySelector(
      `.btn-god-mode[data-god-mode="${godModeMap[god_mode_local_storage]}"]`
    );
    if (selectedGodModeButton) {
      selectedGodModeButton.classList.add("btn-selected");
    }
  }

  godModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      godModeButtons.forEach((btn) => btn.classList.remove("btn-selected"));
      button.classList.add("btn-selected");
      const newGodMode = Object.keys(godModeMap).find(
        (key) => godModeMap[key] === button.getAttribute("data-god-mode")
      );
      localStorage.setItem("god_mode", newGodMode);
    });
  });

  // Animações
  let animations_local_storage = localStorage.getItem("animations");
  if (!animations_local_storage) {
    localStorage.setItem("animations", "1");
    animations_local_storage = "1";
  }

  const animationButtons = document.querySelectorAll(".btn-animation");
  const animationMap = {
    0: "0",
    1: "1",
  };

  if (animations_local_storage && animationMap[animations_local_storage]) {
    const selectedAnimationButton = document.querySelector(
      `.btn-animation[data-animations="${animationMap[animations_local_storage]}"]`
    );
    if (selectedAnimationButton) {
      selectedAnimationButton.classList.add("btn-selected");
    }
  }

  animationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      animationButtons.forEach((btn) => btn.classList.remove("btn-selected"));
      button.classList.add("btn-selected");
      const newAnimation = Object.keys(animationMap).find(
        (key) => animationMap[key] === button.getAttribute("data-animations")
      );
      localStorage.setItem("animations", newAnimation);
    });
  });

  // Cor da cabeça da cobra
  let snake_head_color_local_storage = localStorage.getItem("snake_head_color");
  if (!snake_head_color_local_storage) {
    localStorage.setItem("snake_head_color", "#ECF0F1");
    snake_head_color_local_storage = "#ECF0F1";
  }

  const snakeHeadColorInput = document.querySelector(
    ".custom-snake-head-color-input"
  );
  snakeHeadColorInput.value = snake_head_color_local_storage;

  snakeHeadColorInput.addEventListener("input", () => {
    const customColor = snakeHeadColorInput.value;

    if (customColor[0] !== "#") {
      snakeHeadColorInput.value = "#";
      return;
    }

    localStorage.setItem("snake_head_color", customColor);
  });

  // Cor inicial do corpo da cobra
  let snake_initial_body_color_local_storage = localStorage.getItem(
    "snake_initial_body_color"
  );
  if (!snake_initial_body_color_local_storage) {
    localStorage.setItem("snake_initial_body_color", "#229954");
    snake_initial_body_color_local_storage = "#229954";
  }

  const snakeInitialBodyColorInput = document.querySelector(
    ".custom-snake-initial-body-color-input"
  );
  snakeInitialBodyColorInput.value = snake_initial_body_color_local_storage;

  snakeInitialBodyColorInput.addEventListener("input", () => {
    const customColor = snakeInitialBodyColorInput.value;

    if (customColor[0] !== "#") {
      snakeInitialBodyColorInput.value = "#";
      return;
    }

    localStorage.setItem("snake_initial_body_color", customColor);
  });

  // Cor final do corpo da cobra
  let snake_final_body_color_local_storage = localStorage.getItem(
    "snake_final_body_color"
  );
  if (!snake_final_body_color_local_storage) {
    localStorage.setItem("snake_final_body_color", "#F9E79F");
    snake_final_body_color_local_storage = "#F9E79F";
  }

  const snakeFinalBodyColorInput = document.querySelector(
    ".custom-snake-final-body-color-input"
  );
  snakeFinalBodyColorInput.value = snake_final_body_color_local_storage;

  snakeFinalBodyColorInput.addEventListener("input", () => {
    const customColor = snakeFinalBodyColorInput.value;

    if (customColor[0] !== "#") {
      snakeFinalBodyColorInput.value = "#";
      return;
    }

    localStorage.setItem("snake_final_body_color", customColor);
  });
});
