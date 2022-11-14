
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