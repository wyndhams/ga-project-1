function init() {
  const grid = document.querySelector(".grid");
  const playPause = document.querySelector("#play-pause");
  const stop = document.querySelector("#stop");
  const gameOver = document.querySelector(".game-over");
  const scoreDisplay = document.querySelector("#current-score");
  let gameIsRunning = false;
  let movingRight = true;
  let movement = 1;
  let projectile;
  const width = 22;
  const gridCellCount = width * 19;
  const cells = [];
  let userCraftIndex = 385;
  let enemyCraftIndex = [
    0, 1, 2, 3, 4, 5, 22, 23, 24, 25, 26, 27, 44, 45, 46, 47, 48, 49,
  ];
  let shieldIndex = [
    310, 311, 314, 315, 318, 319, 322, 323, 326, 327, 332, 333, 336, 337, 340,
    341, 344, 345, 348, 349,
  ];

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
      cell.textContent = i;
      cells.push(cell);
      grid.appendChild(cell);
    }
  }

  function addEnemyCraft() {
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      cells[enemyCraftIndex[i]].classList.add("enemyCraft");
    }
  }

  function addShield() {
    for (let i = 0; i < shieldIndex.length; i++) {
      cells[shieldIndex[i]].classList.add("shield");
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
        enemyCraftIndex[i] += width + 1;
        movement = -1;
        movingRight = false;
      }
    } else if (leftSide === true && movingRight === false) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] += width - 1;
        movement = 1;
        movingRight = true;
      }
    }
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      enemyCraftIndex[i] += movement;
    }
    addEnemyCraft();
  }

  function userShoot(event) {
    let userProjectileIndex = userCraftIndex;
    function moveProjectile() {
      cells[userProjectileIndex].classList.remove("projectile");
      userProjectileIndex -= width;
      cells[userProjectileIndex].classList.add("projectile");
    }
    switch (event.key) {
      case "z":
        projectile = setInterval(moveProjectile, 100);
    }
  }

  function enemyShoot() {
    let enemyProjectileIndex = enemyCraftIndex[Math.floor(Math.random() * 18)];
    function moveEnemyProjectile() {
      cells[enemyProjectileIndex].classList.remove("enemy-projectile");
      enemyProjectileIndex += width;
      cells[enemyProjectileIndex].classList.add("enemy-projectile");
    }
    projectile = setInterval(moveEnemyProjectile, 50);
  }

  function startGame() {
    gameIsRunning = true;
    setInterval(moveEnemyCraft, 50);
    setInterval(enemyShoot, 2000);
  }

  function stopGame() {
    gameIsRunning = false;
    clearInterval(moveEnemyCraft);
  }

  function lostGame() {
    if (userCraftIndex === enemyCraftIndex) {
      gameOver.innerHTML.push("GAME OVER");
    }
  }

  createGrid();
  addEnemyCraft();
  addUserCraft();
  addShield();
  enemyShoot();

  window.addEventListener("keydown", moveUserCraft);
  window.addEventListener("keydown", userShoot);
  playPause.addEventListener("click", startGame);
  stop.addEventListener("click", stopGame);
}

document.addEventListener("DOMContentLoaded", init);
