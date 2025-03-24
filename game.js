const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas size
canvas.width = 800;
canvas.height = 400;

// Player properties
let player = {
  x: 50,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  gravity: 0.5,
  jumpStrength: -12,
  grounded: false
};

// Key press tracking
let keys = {
  right: false,
  left: false,
  up: false
};

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Update player position and physics
function update() {
  if (keys.right) player.dx = player.speed;
  else if (keys.left) player.dx = -player.speed;
  else player.dx = 0;

  // Jumping
  if (keys.up && player.grounded) {
    player.dy = player.jumpStrength;
    player.grounded = false;
  }

  // Gravity
  player.dy += player.gravity;

  // Update position
  player.x += player.dx;
  player.y += player.dy;

  // Prevent the player from going off the canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

  // Simple floor collision
  if (player.y + player.height > canvas.height - 50) {
    player.y = canvas.height - 50 - player.height;
    player.dy = 0;
    player.grounded = true;
  }
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillStyle = '#FF6347'; // Red color for player
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw the floor
  ctx.fillStyle = '#2E8B57'; // Green for floor
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

// Handle key events
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowUp') keys.up = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowUp') keys.up = false;
});

// Start the game
gameLoop();
