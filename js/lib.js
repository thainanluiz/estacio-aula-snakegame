const rows = Math.floor(window.innerHeight / 25);
const cols = Math.floor(window.innerWidth / 25);

document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.querySelector(".grid-container");

  for (let i = 0; i < rows * cols; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  }

  execute();
});

const execute = () => {
  let animations_local_storage = localStorage.getItem("animations");
  if (!animations_local_storage) {
    localStorage.setItem("animations", "1");
    animations_local_storage = "1";
  }

  if (animations_local_storage === "0") {
    return;
  }

  anime({
    targets: ".grid-item",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 500 },
      { value: 1, easing: "easeInOutQuad", duration: 1200 },
    ],
    delay: anime.stagger(100, { grid: [cols, rows], from: "center" }),
  });
};

window.execute_anime_js_grid = execute;
