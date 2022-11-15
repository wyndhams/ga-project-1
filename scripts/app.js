function init() {
  const grid = document.querySelector(".grid");
  const playPause = document.querySelector("#play-pause");
  const stop = document.querySelector(".stop");
  const results = document.querySelector(".results");
  const currentScore = document.querySelector("#current-score");
  const lives = document.querySelector("#lives");
  const level = document.querySelector("#level");
  let enemyProjectile;

  let gameIsRunning = false;
  let movingRight = true;
  let movement = 1;
  let livesRemaining = 3;
  const width = 22;
  const gridCellCount = width * 19;
  const cells = [];
  let userCraftIndex = 385;
  let enemyCraftIndex = [
    0, 1, 2, 3, 4, 5, 6, 22, 23, 24, 25, 26, 27, 28, 44, 45, 46, 47, 48, 49, 50,
    66, 67, 68, 69, 70, 71, 72, 88, 89, 90, 91, 92, 93, 94,
  ];
  let shieldIndex = [
    310, 311, 314, 315, 318, 319, 322, 323, 326, 327, 332, 333, 336, 337, 340,
    341, 344, 345, 348, 349,
  ];
  const shieldsDestroyed = [];
  let score = 0;
  let currentLevel = 1;
  // used to minimise the amount a user can shoot
  let fireRate;

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
      cell.textContent = i;
      cells.push(cell);
      grid.appendChild(cell);
    }
  }

  createGrid();

  function addEnemyCraft() {
    enemyCraftIndex.forEach((i) => cells[i].classList.add("enemyCraft"));
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
    const leftSide = enemyCraftIndex.some((e) => e % width === 0);
    const rightSide = enemyCraftIndex.some((e) => e % width === width - 1);
    const landing = enemyCraftIndex.some((e) => e === 374);
    removeEnemyCraft();
    if (rightSide && movingRight && !landing) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] += width + 1;
        movement = -1;
        movingRight = false;
      }
    } else if (leftSide && !movingRight && !landing) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] += width - 1;
        movement = 1;
        movingRight = true;
      }
    } else if (landing) {
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i];
        movement = 0;
      }
    }
    for (let i = 0; i < enemyCraftIndex.length; i++) {
      enemyCraftIndex[i] += movement;
    }
    addEnemyCraft();
    if (landing || enemyCraftIndex.some((e) => e.contains("userCraft"))) {
      results.innerHTML = "GAME OVER";
      endGame();
    }
    if (!enemyCraftIndex.length) {
      currentLevel++;
      level.innerHTML = currentLevel;
      results.innerHTML =
        "CONGRATULATIONS YOU WIN<br>PROGRESS TO THE NEXT LEVEL";
      endGame();
    }
  }

  let userProjectiles = [];

  function handleKeyDown(event) {
    switch (event.key) {
      case "z":
        fireUserProjectile();
    }
  }

  function fireUserProjectile() {
    userProjectiles.push(userCraftIndex);
  }

  let userProjectileInterval = setInterval(() => {
    // remove all projectile classes
    userProjectiles.forEach((userProjectileIndex) => {
      cells[userProjectileIndex].classList.remove("projectile");
    });

    // get new array of valid projectile positions
    userProjectiles = userProjectiles
      .map((userProjectileIndex) => (userProjectileIndex -= width))
      .filter((userProjectileIndex) => userProjectileIndex >= 0);

    userProjectiles.forEach((userProjectileIndex) => {
      // if a projectile hits an enemy
      if (cells[userProjectileIndex].classList.contains("enemyCraft")) {
        cells[userProjectileIndex].classList.remove("enemyCraft");
        const positionInArray = enemyCraftIndex.indexOf(userProjectileIndex);
        enemyCraftIndex.splice(positionInArray, 1);
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.remove("projectile");
        score += 100;
        currentScore.innerHTML = score;
      } else if (
        cells[userProjectileIndex].classList.contains("enemy-projectile")
      ) {
        cells[userProjectileIndex].classList.remove("projectile");
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        // clearInterval(enemyProjectileInterval);
        cells[userProjectileIndex].classList.remove(
          "projectile",
          "enemy-projectile"
        );
      } else if (cells[userProjectileIndex].classList.contains("shield")) {
        cells[userProjectileIndex].classList.remove("shield");
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.remove("projectile");
      } else {
        cells[userProjectileIndex].classList.add("projectile");
      }
    });
  }, 100);

  let enemyProjectiles = [];

  function fireEnemyProjectile() {
    enemyProjectiles.push(
      enemyCraftIndex[Math.floor(Math.random() * enemyCraftIndex.length)]
    );
  }
  let enemyProjectileInterval = setInterval(() => {
    // remove all projectile classes
    enemyProjectiles.forEach((enemyProjectileIndex) => {
      cells[enemyProjectileIndex].classList.remove("enemy-projectile");
    });

    // get new array of valid projectile positions
    enemyProjectiles = enemyProjectiles
      .map((enemyProjectileIndex) => (enemyProjectileIndex += width))
      .filter((enemyProjectileIndex) => enemyProjectileIndex <= 395);

    enemyProjectiles.forEach((enemyProjectileIndex) => {
      // if a projectile hits an enemy
      if (cells[enemyProjectileIndex].classList.contains("userCraft")) {
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
        livesRemaining -= 1;
        lives.innerHTML = livesRemaining;
        if (livesRemaining === 0) {
          cells[userCraftIndex].classList.remove("userCraft");
          results.innerHTML = "GAME OVER";
          gameIsRunning = false;
          endGame();
        }
      } else if (cells[enemyProjectileIndex].classList.contains("projectile")) {
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
        enemyProjectiles = enemyProjectiles.filter(
          (i) => i !== enemyProjectileIndex
        );
        cells[enemyProjectileIndex].classList.remove(
          "enemy-projectile",
          "projectile"
        );
        // cells[enemyProjectileIndex].classList.add("explosion");

        // clearInterval(userProjectileInterval);
        // handleKeyDown();
      } else if (cells[enemyProjectileIndex].classList.contains("shield")) {
        cells[enemyProjectileIndex].classList.remove("shield");
        enemyProjectiles = enemyProjectiles.filter(
          (i) => i !== enemyProjectileIndex
        );
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
      } else {
        cells[enemyProjectileIndex].classList.add("enemy-projectile");
      }
    });
  }, 100);

  let enemyMoveStart;
  let enemyShotInterval;
  function startGame() {
    gameIsRunning = true;
    fireEnemyProjectile();
    enemyMoveStart = setInterval(moveEnemyCraft, 500);
    enemyShotInterval = setInterval(fireEnemyProjectile, 2000);
  }

  function endGame() {
    clearInterval(enemyMoveStart);
    clearInterval(enemyProjectileInterval);
    clearInterval(userProjectileInterval);
    return (gameIsRunning = false);
  }

  addEnemyCraft();
  addUserCraft();
  addShield();

  window.addEventListener("keydown", moveUserCraft);
  window.addEventListener("keydown", handleKeyDown);
  playPause.addEventListener("click", startGame);
  stop.addEventListener("click", endGame);
}

document.addEventListener("DOMContentLoaded", init);
