const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const canvas = document.querySelector("canvas");
canvas.height = HEIGHT;
canvas.width = WIDTH;

const ctx = canvas.getContext("2d");

function enemyPath() {
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.fillStyle = "gray";
  ctx.lineWidth = 5;
  ctx.lineTo(WIDTH - 100, 100);
  ctx.lineTo(WIDTH - 100, HEIGHT - 100);
  ctx.lineTo(0, HEIGHT - 100);
  ctx.stroke();
}

const tower = [];

let cash = 250;
let lives = 2;

function showLives() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Lives: " + lives, 10, 50);
}

function showCash() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Cash: " + cash, 10, 20);
}

addEventListener("click", (event) => {
  if (cash >= 100) {
    const x = event.clientX;
    const y = event.clientY;

    const newTower = {
      x: x,
      y: y,
      radius: 20,
      farge: "blue",
      attackCooldown: 0,
      attackSpeed: 1, // Antall angrep per sekund
      range: 75,
    };
    tower.push(newTower);
    cash -= 100; // Reduser cash med 100 når en ny tårn plasseres
  } else {
    return;
  }
});

const fiender = [];
let maksFiender = 10;
let antallFiender = 0;
let x = -20;
let y = 100;
let radius = 0;
let farge = "red";
let hastighetX = 0;
let hastighetY = 0;
let hastighet = 4;

function fiende(x, y) {
  return {
    x: x,
    y: y,
    radius: 20,
    farge: "red",
    hastighet: 4,
    hastighetX: 4,
    hastighetY: 0,
  };
}

for (antallFiender = 0; antallFiender < maksFiender; antallFiender++) {
  fiender.push(fiende(x, y, radius, farge, hastighetX, hastighetY));
  x -= 65;
}

function tegnFiende(fiende) {
  ctx.beginPath();
  ctx.arc(fiende.x, fiende.y, fiende.radius, 0, Math.PI * 2);
  ctx.fillStyle = fiende.farge;
  ctx.fill();
}

function oppdaterTower(tower, fiender) {
  ctx.beginPath();
  ctx.arc(tower.x, tower.y, tower.radius, 0, Math.PI * 2);
  ctx.fillStyle = tower.farge;
  ctx.fill();

  // Skift farge dersom en fiende er i nærheten
  for (const fiende of fiender) {
    const dx = tower.x - fiende.x;
    const dy = tower.y - fiende.y;
    const avstand = Math.sqrt(dx * dx + dy * dy);

    if (avstand < tower.radius + fiende.radius + tower.range) {
      tower.farge = "green"; // Endre farge til grønn
      if (tower.attackCooldown === 0) {
        tower.attackCooldown = 120 / tower.attackSpeed; // Reset cooldown
        fiender.splice(fiender.indexOf(fiende), 1); // Fjern fienden fra listen
        cash += 50;
        break; // Avslutt løkken etter å ha angrepet én fiende
      }
      break;
    } else {
      tower.farge = "blue"; // Tilbakestill fargen til blå
    }
  }

  if (fiender.length === 0) {
    tower.farge = "blue"; // Tilbakestill fargen til blå
  }

  tower.attackCooldown -= 1; // Reduser cooldown

  if (tower.attackCooldown < 0) {
    tower.attackCooldown = 0; // Sørg for at cooldown ikke blir negativ
  }
}

function oppdaterFiende(fiende) {
  if (fiende.x > WIDTH - 100) {
    fiende.hastighetY = hastighet;
    fiende.hastighetX = 0;
  }

  if (fiende.y > HEIGHT - 100) {
    fiende.hastighetY = 0;
    fiende.hastighetX = -hastighet;
  }

  fiende.x += fiende.hastighetX;
  fiende.y += fiende.hastighetY;

  if (fiende.y > HEIGHT + fiende.radius) {
    fiende.hastighetY = 0;
    fiende.hastighetX = 0;
  }
if (fiende.x < 0 + fiende.radius) {
    if (fiende.y >= HEIGHT - 100 - fiende.radius && fiende.y <= HEIGHT - 100 + fiende.radius) {
        lives -= 1;
        fiender.splice(fiender.indexOf(fiende), 1); // Remove the enemy after it reaches the end
        if (lives <= 0) {
            alert("Game Over. Refresh the page to play again.");
            for (let i = 0; i < fiender.length; i++) {
                fiender.splice(i); // Clear all enemies
            }
        }
    }
}
}
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function oppdaterAlt() {
  clearCanvas();
  enemyPath();
  for (fiende of fiender) {
    oppdaterFiende(fiende);
    tegnFiende(fiende);
  }
  for (const t of tower) {
    oppdaterTower(t, fiender);
  }
  showCash();
  showLives();
}

setInterval(oppdaterAlt, 1000 / 120); // 120 FPS
console.log("Game started");
