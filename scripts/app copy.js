function init() {
  const grid = document.querySelector(".grid");
  const playBtn = document.querySelector("#play");
  const stopBtn = document.querySelector(".stop");
  const restartBtn = document.querySelector("#restart");
  const restartMessage = document.querySelector(".restart-message");
  const results = document.querySelector(".results");
  const currentScore = document.querySelector("#current-score");
  const lives = document.querySelector("#lives");
  const level = document.querySelector("#level");
  const currentLevelElement = document.querySelector(".current-level");
  const countdownElement = document.querySelector(".countdown");
  const hiddenIntro = document.querySelector("#hidden-intro");
  const hiddenLevelUp = document.querySelector("#hidden-level-up");
  const hiddenGameOver = document.querySelector("#hidden-game-over");
  const orbOne = document.querySelector(".orb1");
  const orbTwo = document.querySelector(".orb2");
  const muteBtn = document.querySelector("#toggle-mute");
  const userHitSound = document.querySelector("#user-hit");
  const pads = document.querySelector("#pads");
  const userShootSound = document.querySelector("#user-shoot");
  const enemyShootSound = document.querySelector("#enemy-shoot");
  const enemyMoveSound = document.querySelector("#enemy-move");
  const startSound = document.querySelector("#start-sound");
  const restartSound = document.querySelector("#restart-sound");
  const levelUpSound = document.querySelector("#level-up-sound");
  const gameOverSound = document.querySelector("#game-over-sound");
  const boomSound = document.querySelector("#boom");
  countdownElement.innerHTML = " ";
  let enemyProjectile;
  let gameIsRunning = false;
  let movingRight = true;
  let movement = 1;
  let livesRemaining = 3;
  const width = 22;
  const gridCellCount = width * 19;
  const cells = [];
  let userCraftIndex = 385;
  let score = 0;
  let currentLevel = 1;
  let enemyCraftIndex = [];
  let mute = false;

  window.onload = function () {
    if (!mute) {
      pads.src = "../audio/intro-f-sharp.wav";
      pads.play();
    }
  };

  function enemySpawnArrangementCheck() {
    if (currentLevel === 1 || currentLevel === 5) {
      enemyCraftIndex = [
        0, 1, 2, 3, 4, 5, 6, 22, 23, 24, 25, 26, 27, 28, 44, 45, 46, 47, 48, 49,
        50, 66, 67, 68, 69, 70, 71, 72, 88, 89, 90, 91, 92, 93, 94,
      ];
      if (!mute && currentLevel === 5) {
        pads.src = "../audio/pad-Dm.wav";
        pads.play();
      } else if (mute) {
        pads.pause();
      }
    } else if (currentLevel === 2 || currentLevel === 6) {
      enemyCraftIndex = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        46, 47, 48, 49, 50, 51, 52, 69, 70, 71, 72, 73, 92, 93, 94, 115,
      ];
      if (!mute) {
        pads.src = "../audio/pad-A.wav";
        pads.play();
      } else if (mute) {
        pads.pause();
      }
    } else if (currentLevel === 3 || currentLevel === 7) {
      enemyCraftIndex = [
        4, 10, 25, 26, 27, 31, 32, 33, 46, 47, 48, 49, 50, 52, 53, 54, 55, 56,
        69, 70, 71, 75, 76, 77, 92, 98, 110, 112, 116, 118, 122, 124, 133, 139,
        145, 154, 156, 160, 162, 166, 168,
      ];
      if (!mute) {
        pads.src = "../audio/pad-C.wav";
        pads.play();
      } else if (mute) {
        pads.pause();
      }
    } else if (currentLevel === 4 || currentLevel >= 8) {
      enemyCraftIndex = [
        0, 2, 4, 6, 8, 10, 23, 25, 27, 29, 31, 44, 46, 48, 50, 52, 54, 67, 69,
        71, 73, 75, 88, 90, 92, 94, 96, 98, 111, 113, 115, 117, 119, 158, 160,
        178, 184, 203, 223, 227, 246, 247, 248,
      ];
      if (!mute) {
        pads.src = "../audio/pad-Gm.wav";
        pads.play();
      } else if (mute) {
        pads.pause();
      }
    }
  }

  enemySpawnArrangementCheck();

  let specialEnemyCraftIndex = [22];
  let shieldIndex = [
    310, 311, 314, 315, 318, 319, 322, 323, 326, 327, 332, 333, 336, 337, 340,
    341, 344, 345, 348, 349,
  ];
  let shieldRespawn = [
    310, 311, 314, 315, 318, 319, 322, 323, 326, 327, 332, 333, 336, 337, 340,
    341, 344, 345, 348, 349,
  ];

  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
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

  function addSpecialEnemyCraft() {
    cells[specialEnemyCraftIndex].classList.add("specialEnemyCraft");
  }

  function removeSpecialEnemyCraft() {
    cells[specialEnemyCraftIndex].classList.remove("specialEnemyCraft");
  }

  function moveSpecialEnemyCraft() {
    setTimeout(() => {
      if (specialEnemyCraftIndex < 43) {
        cells[specialEnemyCraftIndex].classList.remove("specialEnemyCraft");
        specialEnemyCraftIndex++;
        addSpecialEnemyCraft();
      } else {
        removeSpecialEnemyCraft();
      }
    }, specialCraftDelay);
  }

  function moveEnemyCraft() {
    if (!mute) {
      enemyMoveSound.src = "../audio/shoot-1.wav";
      enemyMoveSound.play();
    }
    const leftSide = enemyCraftIndex.some((e) => e % width === 0);
    const rightSide = enemyCraftIndex.some((e) => e % width === width - 1);
    const landing = enemyCraftIndex.some((e) => e >= 374);
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
    // || enemyCraftIndex.some((e) => e.contains("userCraft")))
    if (landing) {
      endGame();
    }
    if (!enemyCraftIndex.length) {
      levelUp();
    }
    // enemySpeedCheck();
  }

  let userProjectiles = [];
  // used to minimise the amount a user can shoot
  let userFireRate;

  function handleKeyDown(event) {
    if (event.keyCode === 90) {
      fireUserProjectile();
      controlUserFire();
    }
  }

  function controlUserFire() {}

  function fireUserProjectile() {
    userProjectiles.push(userCraftIndex);
    if (!mute) {
      userShootSound.src = "../audio/shoot-2.wav";
      userShootSound.play();
    } else if (mute) {
      userShootSound.pause();
    }
  }

  let enemyProjectiles = [];
  let enemySpeed = 1000;
  let enemyProjectileSpeed = 100;
  let enemyShotFrequency = 2000;

  function fireEnemyProjectile() {
    enemyProjectiles.push(
      enemyCraftIndex[Math.floor(Math.random() * enemyCraftIndex.length)]
    );
    orbOne.style.animation = "shake 2s infinite";
    orbTwo.style.animation = "shake 2s infinite";
    if (!mute) {
      enemyShootSound.src = "../audio/enemy-shoot.wav";
      enemyShootSound.play();
    } else if (mute) {
      enemyShootSound.pause();
    }
  }

  function userHitPlaySound() {
    if (!mute) {
      userHitSound.src = "../audio/user-hit.wav";
      userHitSound.play();
    } else if (mute) {
      userHitSound.pause();
    }
  }

  let projectileInterval = setInterval(() => {
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
        userHitPlaySound();
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
        livesRemaining -= 1;
        lives.innerHTML = livesRemaining;
        cells[enemyProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[enemyProjectileIndex].classList.remove("explosion"),
          200
        );
        if (livesRemaining === 0) {
          cells[userCraftIndex].classList.remove("userCraft");
          gameIsRunning = false;
          endGame();
        }
      } else if (cells[enemyProjectileIndex].classList.contains("shield")) {
        if (!mute) {
          boomSound.src = "../audio/shield-hit.wav";
          boomSound.play();
        } else if (mute) {
          boomSound.pause();
        }
        cells[enemyProjectileIndex].classList.remove("shield");
        enemyProjectiles = enemyProjectiles.filter(
          (i) => i !== enemyProjectileIndex
        );
        cells[enemyProjectileIndex].classList.remove("enemy-projectile");
        cells[enemyProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[enemyProjectileIndex].classList.remove("explosion"),
          200
        );
      } else {
        cells[enemyProjectileIndex].classList.add("enemy-projectile");
      }
    });

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
        cells[userProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[userProjectileIndex].classList.remove("explosion"),
          200
        );
        score += 100;
        currentScore.innerHTML = score;
      } else if (
        cells[userProjectileIndex].classList.contains("specialEnemyCraft")
      ) {
        cells[userProjectileIndex].classList.remove("projectile");
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.remove(
          "projectile",
          "specialEnemyCraft"
        );
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[userProjectileIndex].classList.remove("explosion"),
          200
        );
        score += 1000;
        currentScore.innerHTML = score;
      } else if (
        cells[userProjectileIndex].classList.contains("enemy-projectile")
      ) {
        cells[userProjectileIndex].classList.remove("projectile");
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.remove(
          "projectile",
          "enemy-projectile"
        );
        enemyProjectiles = enemyProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[userProjectileIndex].classList.remove("explosion"),
          200
        );
        cells[userProjectileIndex].splice(enemyProjectiles);
      } else if (cells[userProjectileIndex].classList.contains("shield")) {
        if (!mute) {
          boomSound.src = "../audio/shield-hit.wav";
          boomSound.play();
        } else if (mute) {
          boomSound.pause();
        }
        cells[userProjectileIndex].classList.remove("shield");
        userProjectiles = userProjectiles.filter(
          (i) => i !== userProjectileIndex
        );
        cells[userProjectileIndex].classList.remove("projectile");
        cells[userProjectileIndex].classList.add("explosion");
        setTimeout(
          () => cells[userProjectileIndex].classList.remove("explosion"),
          200
        );
      } else {
        cells[userProjectileIndex].classList.add("projectile");
      }
    });
  }, enemyProjectileSpeed);

  let enemyMoveStart;
  let enemyShotInterval;
  let specialEnemyCraftTimeout;
  let specialEnemyCraftMovementInterval;
  let specialCraftDelay = 40000;

  function toggleMute() {
    if (mute === false) {
      mute = true;
      muteBtn.innerHTML = "Unmute";
      pads.pause();
      userShootSound.pause();
      enemyShootSound.pause();
      enemyMoveSound.pause();
      startSound.pause();
      restartSound.pause();
      levelUpSound.pause();
      gameOverSound.pause();
      boomSound.pause();
    } else {
      mute = false;
      muteBtn.innerHTML = "Mute";
      pads.play();
    }
  }

  function startGame() {
    if (!mute) {
      pads.src = "../audio/pad-Dm.wav";
      pads.play();
      startSound.src = "../audio/start.wav";
      startSound.play();
    } else if (mute) {
      startSound.pause();
      pads.pause();
    }
    gameIsRunning = true;
    fireEnemyProjectile();
    hiddenIntro.style.display = "none";
    specialEnemyCraftTimeout = setTimeout(
      addSpecialEnemyCraft,
      specialCraftDelay
    );
    specialEnemyCraftMovementInterval = setInterval(moveSpecialEnemyCraft, 400);
    enemyMoveStart = setInterval(moveEnemyCraft, enemySpeed);
    enemyShotInterval = setInterval(fireEnemyProjectile, enemyShotFrequency);
  }

  // function pauseGame() {}

  function levelUp() {
    if (!mute) {
      levelUpSound.src = "../audio/level-up.wav";
      levelUpSound.play();
    } else if (mute) {
      levelUpSound.pause();
    }
    orbOne.style.animation = "none";
    orbTwo.style.animation = "none";
    currentLevel++;
    level.innerHTML = currentLevel;
    livesRemaining++;
    lives.innerHTML = livesRemaining;
    clearInterval(enemyMoveStart);
    clearInterval(enemyShotInterval);
    clearInterval(specialEnemyCraftMovementInterval);
    removeEnemyCraft();
    removeSpecialEnemyCraft();
    hiddenLevelUp.style.display = "block";
    currentLevelElement.innerHTML = currentLevel;
    let countDown = 3;
    const newCountdown = setInterval(() => {
      if (countDown <= 0) {
        clearInterval(newCountdown);
        enemySpawnArrangementCheck();
        addEnemyCraft();
        fireEnemyProjectile();
        specialEnemyCraftIndex = [22];
        enemySpeed = enemySpeed - 80;
        enemyShotFrequency = enemyShotFrequency - 100;
        // enemyProjectileSpeed = enemyProjectileSpeed - 2;
        movement = 1;
        movingRight = true;
        enemyMoveStart = setInterval(moveEnemyCraft, enemySpeed);
        enemyShotInterval = setInterval(
          fireEnemyProjectile,
          enemyShotFrequency
        );
        specialEnemyCraftTimeout = setTimeout(
          addSpecialEnemyCraft,
          specialCraftDelay
        );
        specialEnemyCraftMovementInterval = setInterval(
          moveSpecialEnemyCraft,
          400
        );
        countdownElement.innerHTML = " ";
        hiddenLevelUp.style.display = "none";
      }
      countdownElement.innerHTML = countDown;
      countDown -= 1;
    }, 1000);
  }

  function endGame() {
    if (!mute) {
      gameOverSound.src = "../audio/game-over.wav";
      gameOverSound.play();
      boomSound.src = "../audio/boom.wav";
    } else if (mute) {
      gameOverSound.pause();
      boomSound.pause();
    }
    clearInterval(enemyMoveStart);
    clearInterval(projectileInterval);
    clearInterval(specialEnemyCraftMovementInterval);
    hiddenGameOver.style.display = "block";
    return (gameIsRunning = false);
    // leaderboard();
  }

  function restartGame() {
    if (!mute) {
      restartSound.src = "../audio/restart.wav";
      restartSound.play();
    } else if (mute) {
      restartSound.pause();
    }
    clearInterval(enemyMoveStart);
    clearInterval(enemyShotInterval);
    clearInterval(specialEnemyCraftMovementInterval);
    removeEnemyCraft();
    removeSpecialEnemyCraft();
    let countDown = 3;
    const newCountdown = setInterval(() => {
      if (countDown <= 0) {
        clearInterval(newCountdown);
        enemySpawnArrangementCheck();
        addEnemyCraft();
        fireEnemyProjectile();
        specialEnemyCraftIndex = [22];
        movement = 1;
        movingRight = true;
        enemyMoveStart = setInterval(moveEnemyCraft, enemySpeed);
        enemyShotInterval = setInterval(
          fireEnemyProjectile,
          enemyShotFrequency
        );
        specialEnemyCraftTimeout = setTimeout(
          addSpecialEnemyCraft,
          specialCraftDelay
        );
        specialEnemyCraftMovementInterval = setInterval(
          moveSpecialEnemyCraft,
          400
        );
        results.innerHTML = " ";
        countdownElement.innerHTML = countDown;
        countDown -= 1;
        movement = 1;
        movingRight = true;
        currentLevel = 1;
        livesRemaining = 3;
        score = 0;
      }
    }, 3000);
  }

  addEnemyCraft();
  addUserCraft();
  addShield();

  // const highScores = [];

  // function storeHighScores() {
  //   const playerName = prompt(
  //     "They always get you in the end... Please input your name."
  //   );
  //   const newScore = { score, playerName };
  //   const scores = localStorage.getItem("highscores");
  //   if (scores === null) {
  //     localStorage.setItem("highscores", JSON.stringify([newScore]));
  //   } else {
  //     const scoresStorage = JSON.parse(scores);
  //     scoresStorage.push(newScore);
  //     localStorage.setItem("highscore", JSON.stringify(scoresStorage));
  //   }
  // }

  // function leaderboard() {
  //   setTimeout(() => {
  //     alert(`Woweee, what a ride, congratulations on your final score: ${score}`)
  //     storeHighScores();
  //   })
  // }

  window.addEventListener("keydown", moveUserCraft);
  window.addEventListener("keydown", handleKeyDown);
  playBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", restartGame);
  muteBtn.addEventListener("click", toggleMute);
  // stopBtn.addEventListener("click", endGame);
}

document.addEventListener("DOMContentLoaded", init);
