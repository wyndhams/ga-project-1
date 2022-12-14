
// insert in user function shoot
if (cells[userProjectileIndex].classList.contains("enemy-projectile")) {
  cells[userProjectileIndex].classList.remove("enemy-projectile");
  cells[userProjectileIndex].classList.remove("projectile");
  // cells[userProjectileIndex].classList.add("explosion");
  score += 50;
  currentScore.innerHTML = score;
  clearInterval(enemyProjectile);
  clearInterval(userProjectile);
}

if (cells[enemyProjectileIndex].classList.contains("enemyCraft"))
  if (cells[enemyProjectileIndex] !== cells[enemiesDestroyed]) {
  }


  function init() {
    const grid = document.querySelector(".grid");
    const playPause = document.querySelector("#play-pause");
    const stop = document.querySelector(".stop");
    const results = document.querySelector(".results");
    const currentScore = document.querySelector("#current-score");
    const lives = document.querySelector("#lives");
    let gameIsRunning = false;
    let movingRight = true;
    let movement = 1;
    let livesRemaining = 3;
    const width = 22;
    const gridCellCount = width * 19;
    const cells = [];
    let userCraftIndex = 385;
    let enemyCraftIndex = [
      0, 1, 2, 3, 4, 5, 22, 23, 24, 25, 26, 27, 44, 45, 46, 47, 48, 49, 66, 67,
      68, 69, 70, 71,
    ];
    let shieldIndex = [
      310, 311, 314, 315, 318, 319, 322, 323, 326, 327, 332, 333, 336, 337, 340,
      341, 344, 345, 348, 349,
    ];
    const enemiesDestroyed = [];
    const shieldsDestroyed = [];
    let score = 0;

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
        if (!enemiesDestroyed.includes(i)) {
          cells[enemyCraftIndex[i]].classList.add("enemyCraft");
        }
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
      const landing = enemyCraftIndex[enemyCraftIndex.length - 6] === 374;
      removeEnemyCraft();
      if (rightSide === true && movingRight === true && landing === false) {
        for (let i = 0; i < enemyCraftIndex.length; i++) {
          enemyCraftIndex[i] += width + 1;
          movement = -1;
          movingRight = false;
        }
      } else if (
        leftSide === true &&
        movingRight === false &&
        landing === false
      ) {
        for (let i = 0; i < enemyCraftIndex.length; i++) {
          enemyCraftIndex[i] += width - 1;
          movement = 1;
          movingRight = true;
        }
      } else if (landing === true) {
        for (let i = 0; i < enemyCraftIndex.length; i++) {
          enemyCraftIndex[i];
          movement = 0;
        }
      }
      for (let i = 0; i < enemyCraftIndex.length; i++) {
        enemyCraftIndex[i] += movement;
      }
      addEnemyCraft();
      if (
        landing === true ||
        cells[enemyCraftIndex[12]].classList.contains("userCraft")
      ) {
        results.innerHTML = "GAME OVER";
        endGame();
      }
      if (enemyCraftIndex.length === enemiesDestroyed.length) {
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

    setInterval(() => {
      console.log("fire interval");
      // remove all projectile classes
      userProjectiles.forEach((userProjectileIndex) => {
        cells[userProjectileIndex].classList.remove("projectile");
      });

      // get new array of valid projectile positions
      userProjectiles = userProjectiles
        .map((userProjectileIndex) => (userProjectileIndex -= width))
        .filter((userProjectileIndex) => userProjectileIndex >= 0);

      console.log(userProjectiles);
      userProjectiles.forEach((userProjectileIndex) => {
        // if a projectile hits an enemy
        if (cells[userProjectileIndex].classList.contains("enemyCraft")) {
          cells[userProjectileIndex].classList.remove("enemyCraft");
          enemiesDestroyed.push(userProjectileIndex);
          userProjectiles = userProjectiles.filter(
            (i) => i !== userProjectileIndex
          );
          cells[userProjectileIndex].classList.remove("projectile");
        } else {
          cells[userProjectileIndex].classList.add("projectile");
        }
      });
    }, 100);

    function enemyShoot() {
      let enemyProjectileIndex =
        enemyCraftIndex[Math.floor(Math.random() * 18)];
      function moveEnemyProjectile() {
        if (enemyProjectileIndex < cells.length - 1) {
          cells[enemyProjectileIndex].classList.remove("enemy-projectile");
          enemyProjectileIndex += width;
          if (enemyProjectileIndex < cells.length - 1) {
            cells[enemyProjectileIndex].classList.add("enemy-projectile");
            if (cells[enemyProjectileIndex].classList.contains("shield")) {
              cells[enemyProjectileIndex].classList.remove("enemy-projectile");
              cells[enemyProjectileIndex].classList.remove("shield");
              clearInterval(enemyProjectile);
              let shieldDestroyed = shieldIndex.indexOf(enemyProjectileIndex);
              shieldsDestroyed.push(shieldDestroyed);
            }
            if (cells[enemyProjectileIndex].classList.contains("projectile")) {
              cells[enemyProjectileIndex].classList.remove("enemy-projectile");
              clearInterval(enemyProjectile);
            }
            if (enemyProjectileIndex > 395) {
              cells[enemyProjectileIndex].classList.remove("enemy-projectile");
            }
            if (cells[enemyProjectileIndex].classList.contains("userCraft")) {
              livesRemaining -= 1;
              lives.innerHTML = livesRemaining;
              clearInterval(enemyProjectile);
              if (livesRemaining === 0) {
                cells[userCraftIndex].classList.remove("userCraft");
                results.innerHTML = "GAME OVER";
                gameIsRunning = false;
                endGame();
              }
            }
          }
        }
      }
      let enemyProjectile = setInterval(moveEnemyProjectile, 80);
      // console.log(enemyProjectileIndex);
    }

    function startGame() {
      gameIsRunning = true;
      enemyShoot();
      const enemyMoveStart = setInterval(moveEnemyCraft, 500);
      const enemyShootStart = setInterval(enemyShoot, 2000);
    }

    function endGame() {
      clearInterval(enemyMoveStart);
      clearInterval(enemyShootStart);
      return (gameIsRunning = false);
    }

    createGrid();
    addEnemyCraft();
    addUserCraft();
    addShield();

    window.addEventListener("keydown", moveUserCraft);
    window.addEventListener("keydown", handleKeyDown);
    playPause.addEventListener("click", startGame);
    stop.addEventListener("click", endGame);
  }

  document.addEventListener("DOMContentLoaded", init);




  else if (
        cells[userProjectileIndex].classList.contains("enemy-projectile")
      ) {
        cells[userProjectileIndex].classList.remove("projectile");
        clearInterval();
        // cells[userProjectileIndex].classList.add("explosion");
      } else {
        cells[userProjectileIndex].classList.add("projectile");
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
        console.log("hit a projectile");
        cells[userProjectileIndex].classList.remove(
          "enemy-projectile",
          "projectile"
        );
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        clearInterval(enemyProjectile);
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
        cells[userProjectileIndex].classList.remove("projectile");
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