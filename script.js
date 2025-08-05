const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ukuran canvas
canvas.width = 800;
canvas.height = 400;

// Objek player
const player = {
  x: 50,
  y: canvas.height / 2 - 25,
  width: 40,
  height: 30,
  color: 'white',
  speed: 5
};

let bullets = [];
let enemies = [];

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') player.y -= player.speed;
  if (e.key === 'ArrowDown') player.y += player.speed;
  if (e.key === ' ') {
    bullets.push({
      x: player.x + player.width,
      y: player.y + player.height / 2,
      radius: 5,
      speed: 8
    });
  }
});

function spawnEnemy() {
  const enemyY = Math.random() * (canvas.height - 30);
  enemies.push({
    x: canvas.width,
    y: enemyY,
    width: 30,
    height: 30,
    speed: 3,
    color: 'red'
  });
}

function update() {
  // Update peluru
  bullets.forEach((bullet, i) => {
    bullet.x += bullet.speed;
    if (bullet.x > canvas.width) {
      bullets.splice(i, 1);
    }
  });

  // Update musuh
  enemies.forEach((enemy, i) => {
    enemy.x -= enemy.speed;
    if (enemy.x + enemy.width < 0) {
      enemies.splice(i, 1);
    }
  });

  // Deteksi tabrakan
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x > enemy.x &&
        bullet.x < enemy.x + enemy.width &&
        bullet.y > enemy.y &&
        bullet.y < enemy.y + enemy.height
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Gambar peluru
  ctx.fillStyle = 'yellow';
  bullets.forEach((bullet) => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Gambar musuh
  ctx.fillStyle = 'red';
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Jalankan loop
setInterval(spawnEnemy, 1500);
gameLoop();
