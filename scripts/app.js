function init() {
  const grid = document.querySelector(".grid");
  const playPause = document.querySelector("#play-pause");
  const scoreDisplay = document.querySelector("#current-score");
  let gameIsRunning = false;
  let movingRight = true;

  const width = 20;
  const gridCellCount = width * width;
  const cells = [];
  let userCraftIndex = 370;
  let enemyCraftIndex = [
    0, 1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 25, 40, 41, 42, 43, 44, 45,
  ];

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
      cells.push(cell);
      grid.appendChild(cell);
    }
  }

  function addEnemyCraft() {
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      cells[enemyCraftIndex[i]].classList.add("enemyCraft");
    }
  }

  function removeEnemyCraft() {
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      cells[enemyCraftIndex[i]].classList.remove("enemyCraft");
    }
  }

  // Add User Craft
  function addUserCraft() {
    cells[userCraftIndex].classList.add("userCraft");
  }

  function removeUserCraft() {
    cells[userCraftIndex].classList.remove("userCraft");
  }

  function moveUserCraft(event) {
    removeUserCraft();
    switch (event.key) {
      case "ArrowLeft":
        if (userCraftIndex % width !== 0) userCraftIndex--;
        break;
      case "ArrowRight":
        if (userCraftIndex % width < width - 1) userCraftIndex++;
        break;
    }
    addUserCraft();
  }

  function moveEnemyCraft() {
    const leftSide = enemyCraftIndex[0] % width === 0;
    const rightSide =
      enemyCraftIndex[enemyCraftIndex.length - 1] % width === width - 1;
    removeEnemyCraft();
    if (rightSide === true && movingRight === true) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] -= 1;
        movingRight = false;
      }
    } else if (leftSide === true && movingRight === false) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] += 1;
        movingRight = true;
      }
    }
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      enemyCraftIndex[i] += 1;
    }
    addEnemyCraft();
  }

  function startGame() {
    console.log("event");
    gameIsRunning = true;
    setInterval(moveEnemyCraft, 100);
  }

  createGrid();
  addEnemyCraft();
  addUserCraft();

  window.addEventListener("keydown", moveUserCraft);
  playPause.addEventListener("click", startGame);
}

document.addEventListener("DOMContentLoaded", init);
