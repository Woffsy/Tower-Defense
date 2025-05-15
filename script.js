const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const canvas = document.querySelector("canvas");
canvas.height = HEIGHT;
canvas.width = WIDTH;

const baneWIDTH = WIDTH - 350;

const frameRate = 60;
const fpsInterval = 1000 / frameRate;

const ctx = canvas.getContext("2d");

function enemyPath() {
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.fillStyle = "gray";
  ctx.lineWidth = 20;
  ctx.lineTo(baneWIDTH - 500, 100);
  ctx.lineTo(baneWIDTH - 500, HEIGHT - 500);
  ctx.lineTo(baneWIDTH - 50, HEIGHT - 500);
  ctx.lineTo(baneWIDTH - 50, HEIGHT - 100);
  ctx.lineTo(baneWIDTH - 800, HEIGHT - 100);
  ctx.lineTo(baneWIDTH - 800, HEIGHT);
  ctx.stroke();
}

function towerView() {
  ctx.beginPath();
  ctx.moveTo(baneWIDTH, 0);
  ctx.rect(baneWIDTH, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "lightgray";
  ctx.fill();
  towerViewTower1();
  towerViewTower2();
  towerViewTower3();
}

function towerViewTower1() {
  ctx.beginPath();
  ctx.moveTo(baneWIDTH + 25, 0);
  ctx.rect(baneWIDTH + 25, 25, 300, 200);
  if (placingTower1 === true) {
    ctx.fillStyle = "lightblue";
  } else if (cash >= 100) {
    ctx.fillStyle = "#eeeeee";
  } else {
    ctx.fillStyle = "#cccccc";
  }
  ctx.fill();
  ctx.save();
  ctx.translate(baneWIDTH + 25, 25);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Basic Shooter", 10, 25);
  ctx.fillText("Damage: 2", 10, 50);
  ctx.fillText("Attack Speed: 1", 10, 75);
  ctx.fillText("Range: 150", 10, 100);
  ctx.fillText("Cost: 100", 10, 125);
  ctx.restore();
}
function towerViewTower2() {
  ctx.beginPath();
  ctx.moveTo(baneWIDTH + 25, 0);
  ctx.rect(baneWIDTH + 25, 275, 300, 200);
  if (placingTower2 === true) {
    ctx.fillStyle = "red";
  } else if (cash >= 200) {
    ctx.fillStyle = "#eeeeee";
  } else {
    ctx.fillStyle = "#cccccc";
  }
  ctx.fill();
  ctx.save();
  ctx.translate(baneWIDTH + 25, 275);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Sniper", 10, 25);
  ctx.fillText("Damage: 4", 10, 50);
  ctx.fillText("Attack Speed: 0.75", 10, 75);
  ctx.fillText("Range: 350", 10, 100);
  ctx.fillText("Cost: 200", 10, 125);
  ctx.restore();
}
function towerViewTower3() {
  ctx.beginPath();
  ctx.moveTo(baneWIDTH + 25, 0);
  ctx.rect(baneWIDTH + 25, 525, 300, 200);
  if (placingTower3 === true) {
    ctx.fillStyle = "lightgreen";
  } else if (cash >= 150) {
    ctx.fillStyle = "#eeeeee";
  } else {
    ctx.fillStyle = "#cccccc";
  }
  ctx.fill();
  ctx.save();
  ctx.translate(baneWIDTH + 25, 525);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Stunner", 10, 25);
  ctx.fillText("Damage: 1", 10, 50);
  ctx.fillText("Attack Speed: 0.25", 10, 75);
  ctx.fillText("Range: 150", 10, 100);
  ctx.fillText("Stun: 1", 10, 125);
  ctx.fillText("Cost: 150", 10, 150);
  ctx.restore();
}

function towerPreview() {
  canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  if (placingTower1 === true) {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX, mouseY - 20);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
    console.log("Placing tower 1");
  }
  if (placingTower2 === true) {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX, mouseY - 30);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
    console.log("Placing tower 2");
  }
  if (placingTower3 === true) {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX, mouseY - 15);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();
    console.log("Placing tower 3");
  }
}

const tower = [];

let cash = 200;
let lives = 2;
let wave = 0;

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

function showWave() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Wave: " + wave, 10, 80);
}

let placingTower1 = false;
let placingTower2 = false;
let placingTower3 = false;

addEventListener("keypress", (event) => {
  if (event.key === "1")
    if (placingTower1 === true) {
      placingTower1 = false;
    } else {
      placingTower1 = true;
      placingTower2 = false;
      placingTower3 = false;
    }
  if (event.key === "2")
    if (placingTower2 === true) {
      placingTower2 = false;
    } else {
      placingTower2 = true;
      placingTower1 = false;
      placingTower3 = false;
    }
  if (event.key === "3")
    if (placingTower3 === true) {
      placingTower3 = false;
    } else {
      placingTower3 = true;
      placingTower1 = false;
      placingTower2 = false;
    }
});

const TOWER_TYPES = {
  BasicShooter: {
    cost: 100,
    radius: 20,
    farge: "lightblue",
    attackSpeed: 1,
    attackDamage: 2,
    range: 150,
    cashGen: 25,
    angrepsTid: 0,
    angrepsTidMax: 15,
  },
  BasicSniper: {
    cost: 200,
    radius: 30,
    farge: "red",
    attackSpeed: 0.75,
    attackDamage: 4,
    range: 350,
    cashGen: 50,
    angrepsTid: 0,
    angrepsTidMax: 15,
  },
  BasicStunner: {
    cost: 150,
    radius: 15,
    farge: "lightgreen",
    attackSpeed: 0.25,
    attackDamage: 1,
    stun: 2, 
    stunDuration: 60,
    range: 150,
    cashGen: 25,
    angrepsTid: 0,
    angrepsTidMax: 15,
  },
};

addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  let selectedTowerType = null;

  if (placingTower1) {
    selectedTowerType = TOWER_TYPES.BasicShooter;
  } else if (placingTower2) {
    selectedTowerType = TOWER_TYPES.BasicSniper;
  } else if (placingTower3) {
    selectedTowerType = TOWER_TYPES.BasicStunner;
  } else {
    return;
  }

  if (x >= baneWIDTH) { 
    console.log("Cannot place tower outside game area.");
    return;
  }

  if (cash < selectedTowerType.cost) {
    console.log("Not enough cash for this tower.");
    return;
  }

  const newTowerRadius = selectedTowerType.radius;

  for (const existingTower of tower) {
    const dx = existingTower.x - x;
    const dy = existingTower.y - y;
    const distanceBetweenCenters = Math.sqrt(dx * dx + dy * dy);

    if (distanceBetweenCenters < existingTower.radius + newTowerRadius) {
      console.log("Tower placement overlaps with an existing tower.");
      return; 
    }
  }

  const newTower = {
    x: x,
    y: y,
    radius: newTowerRadius,
    farge: selectedTowerType.farge,
    rotation: 0,

    attackCooldown: 0,
    attackSpeed: selectedTowerType.attackSpeed,
    attackDamage: selectedTowerType.attackDamage,
    range: selectedTowerType.range,

    angriper: false,
    fiendeCor: null,
    angrepsTid: selectedTowerType.angrepsTid,     //For startverdien til angreps animasjon
    angrepsTidMax: selectedTowerType.angrepsTidMax, //For tiden til angreps animasjon

    cashGen: selectedTowerType.cashGen,
  };

  if (selectedTowerType.stun) {
    newTower.stun = selectedTowerType.stun;
    newTower.stunDuration = selectedTowerType.stunDuration;
  }

  tower.push(newTower);
  cash -= selectedTowerType.cost;


  // placingTower1 = false;
  // placingTower2 = false;
  // placingTower3 = false;

  console.log("Tower placed successfully!");
});

addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  if (x > baneWIDTH)
    if (y > 0 && y < 200) {
      placingTower1 = true;
      placingTower2 = false;
      placingTower3 = false;
    } else if (y > 275 && y < 475) {
      placingTower2 = true;
      placingTower1 = false;
      placingTower3 = false;
    } else if (y > 525 && y < 725) {
      placingTower3 = true;
      placingTower1 = false;
      placingTower2 = false;
    }
});

const fiender = [];
let maksFiender = 5;
let x = -20;
let y = 100;
let radius = 20;
let farge = "red";
let hastighet = 1;
let health = 4;

function lagFiende(x, y, radius, farge, hastighet, health) {
  return {
    x: x,
    y: y,
    distance: x,
    radius: radius,
    farge: farge,
    hastighet: hastighet,
    hastighetX: hastighet,
    hastighetY: 0,
    health: health,

    stunned: false,
    stunDuration: 0,
  };
}
function genererWave() {
  console.log("Generer ny Wave 1");
  x = -20;
  y = 100;
  maksFiender += 5;
  hastighet += 0.5;
  wave++;
  health += 2;
  for (i = 0; i < maksFiender; i++) {
    fiender.push(lagFiende(x, y, radius, farge, hastighet, health));
    x -= 65;
  }
}

function tegnFiende(fiende) {
  ctx.beginPath();
  ctx.arc(fiende.x, fiende.y, fiende.radius, 0, Math.PI * 2);
  ctx.fillStyle = fiende.farge;
  ctx.fill();
}

function tegnTower(tower) {
  ctx.save();

  ctx.translate(tower.x, tower.y);
  ctx.rotate(tower.rotation);
  ctx.beginPath();
  ctx.arc(0, 0, tower.radius, 0, Math.PI * 2);
  ctx.fillStyle = tower.farge;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(tower.radius, 0);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.restore();
}

function AttackAngle(tower, fiende) {
  return Math.atan2(fiende.y - tower.y, fiende.x - tower.x);
}

function angrep(tower, fiender) {
  for (const fiende of fiender) {
    const dx = tower.x - fiende.x;
    const dy = tower.y - fiende.y;
    const avstand = Math.sqrt(dx * dx + dy * dy);

    if (avstand < tower.radius + fiende.radius + tower.range) {
      fiendeFunnet = true;
      tower.rotation = AttackAngle(tower, fiende);

      if (tower.attackCooldown <= 0) {
        if (tower.stun) {
          fiende.stunned = true;
          fiende.stunDuration = tower.stunDuration;
        }
        tower.attackCooldown = frameRate / tower.attackSpeed;
        angrepAnimasjon(tower, fiende);
        fiende.health -= tower.attackDamage;

        if (fiende.health == 4) {
          fiende.farge = "purple";
        } else if (fiende.health == 2) {
          fiende.farge = "black";
        }

        tower.angriper = true;
        tower.fiendeCor = { x: fiende.x, y: fiende.y };
        tower.angrepsTid = tower.angrepsTidMax;

        if (fiende.health <= 0) {
          fiender.splice(fiender.indexOf(fiende), 1);
        }
        cash += tower.cashGen;
        break;
      }
      break;
    }
  }
}

function angrepAnimasjon(tower, fiende) {
  const angle = AttackAngle(tower, fiende);
  ctx.lineColor = "red";
  ctx.beginPath();
  ctx.moveTo(tower.x, tower.y);
  ctx.lineTo(fiende.x, fiende.y);
  ctx.stroke();
}

function oppdaterTower(tower, fiender) {
  tegnTower(tower);

  angrep(tower, fiender);

  if (tower.angriper && tower.fiendeCor) {
    ctx.beginPath();
    ctx.moveTo(tower.x, tower.y);
    ctx.lineTo(tower.fiendeCor.x, tower.fiendeCor.y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    tower.angrepsTid--;

    if (tower.angrepsTid <= 0) {
      tower.angriper = false;
      tower.fiendeCor = null;
    }
  }

  tower.attackCooldown -= 1;
}

function oppdaterFiende(fiende) {
  if (fiende.x > baneWIDTH - 500) {
    fiende.hastighetY = hastighet;
    fiende.hastighetX = 0;
  }

  if (fiende.y > HEIGHT - 500) {
    fiende.hastighetY = 0;
    fiende.hastighetX = hastighet;
  }
  if (fiende.x > baneWIDTH - 50) {
    fiende.hastighetY = hastighet;
    fiende.hastighetX = 0;
  }
  if (fiende.y > HEIGHT - 100) {
    fiende.hastighetY = 0;
    fiende.hastighetX = -hastighet;
  }
  if (fiende.x < baneWIDTH - 800 && fiende.y > HEIGHT - 100) {
    fiende.hastighetY = hastighet;
    fiende.hastighetX = 0;
  }

  if (fiende.stunned === false) {
    fiende.x += fiende.hastighetX;
    fiende.y += fiende.hastighetY;
    fiende.distance += fiende.hastighet;
  } else {
    fiende.stunDuration--;
    if (fiende.stunDuration <= 0) {
      fiende.stunned = false;
    }
  }

  if (fiende.y > HEIGHT + fiende.radius) {
    fiende.hastighetY = 0;
    fiende.hastighetX = 0;
  }
  if (fiende.y > HEIGHT + fiende.radius) {
    lives -= 1;
    fiender.splice(fiender.indexOf(fiende), 1);
    if (lives <= 0) {
      alert("Game Over. Refresh the page to play again.");
      for (let i = 0; i < fiender.length; i++) {
        fiender.splice(i);
      }
    }
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function sorterFiendeList(fiender) {
  fiender.sort((a, b) => {
    return b.distance - a.distance;
  });
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

  sorterFiendeList(fiender);

  console.log("Antall fiender: " + fiender.length);

  towerPreview();
  showCash();
  showLives();
  showWave();
  towerView();
  if (fiender.length === 0 && lives > 0) {
    console.log("Wave cleared");
    genererWave();
  }
}

setInterval(oppdaterAlt, fpsInterval); // 60 FPS
console.log("Game started");
