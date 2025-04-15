// Simple 2D Game with Player, Eggs, Objects, and NPCs
const width = 30;
const height = 20;
const spritePositions = {
    down: [0, 0],
    up: [-32, 0],
    left: [-64, 0],
    right: [-96, 0],
};
const player = { x: 5, y: 15, direction: "down", frame: 0 };
let eggs = [
    [2, 2],
    [6, 4],
    [10, 7],
    [14, 3],
    [18, 9],
    [22, 6],
    [25, 11],
    [27, 16],
    [20, 14],
    [8, 18],
];

const objects = [
    [1, 3],
    [3, 1],
    [5, 5],
    [6, 2],
    [7, 7],
];
const npcs = [
    {
        x: 3,
        y: 8,
        text: "Ich habe ein Ei zuletzt in der Nähe eines Laptops gesehen...",
        tip: "Schau mal bei den Schreibtischen.",
    },
    {
        x: 6,
        y: 6,
        text: "Ich glaube da war eines bei der Kaffeemaschine!",
        tip: "Vielleicht beim Fenster.",
    },
    {
        x: 4,
        y: 4,
        text: "Ein Ei versteckt sich hinter dem Bücherregal.",
        tip: "Unten rechts vielleicht?",
    },
];
const game = document.getElementById("game");
const eggCount = document.getElementById("eggCount");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const dialogChoices = document.getElementById("dialogChoices");
let pendingTip = null;

// Function to initialize the game
function drawMap() {
    game.innerHTML = "";
    game.style.gridTemplateColumns = 'repeat(' + width + ', 32px)';
    game.style.gridTemplateRows = 'repeat(' + width + ', 32px)';

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (y === 0) {
                tile.classList.add("wall_above");
            }
            if (y === 1) {
                tile.classList.add("wall_below");
            }

            const egg = eggs.find((e) => e[0] === x && e[1] === y);
            const obj = objects.find((o) => o[0] === x && o[1] === y);
            const npc = npcs.find((n) => n.x === x && n.y === y);

            if (egg) {
                const e = document.createElement("div");
                e.classList.add("entity", "egg");
                tile.appendChild(e);
            }

            if (obj) {
                const o = document.createElement("div");
                o.classList.add("entity", "object");
                tile.appendChild(o);
            }

            if (npc) {
                const n = document.createElement("div");
                n.classList.add("entity", "npc");
                tile.appendChild(n);
            }

            if (player.x === x && player.y === y) {
                const p = document.createElement("div");
                p.classList.add("entity", "player");
                const [bgX, bgY] = spritePositions[player.direction];
                p.style.backgroundPosition = `${bgX}px ${bgY}px`;
                tile.appendChild(p);
            }

            game.appendChild(tile);
        }
    }
}

function isBlocked(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return true;

    // Block upper walls
    if (y === 0) return true;

    if (eggs.some((e) => e[0] === x && e[1] === y)) return true;
    if (objects.some((o) => o[0] === x && o[1] === y)) return true;
    if (npcs.some((n) => n.x === x && n.y === y)) return true;

    return false;
}


function tryPickup(x, y) {
    for (let i = 0; i < eggs.length; i++) {
        if (Math.abs(eggs[i][0] - x) + Math.abs(eggs[i][1] - y) === 1) {
            eggs.splice(i, 1);
            eggCount.textContent = 10 - eggs.length;
            drawMap();
            return true;
        }
    }
    return false;
}

function checkInteraction() {
    for (let npc of npcs) {
        if (Math.abs(npc.x - player.x) + Math.abs(npc.y - player.y) === 1) {
            dialogBox.style.display = "block";
            dialogText.textContent = npc.text;
            pendingTip = npc.tip;
            dialogChoices.style.display = "flex";
            return;
        }
    }
    tryPickup(player.x, player.y);
}

function handleChoice(choice) {
    if (choice && pendingTip) {
        dialogText.textContent = "🧠 Hinweis: " + pendingTip;
        dialogChoices.style.display = "none";
    } else {
        dialogBox.style.display = "none";
    }
    pendingTip = null;
}

function move(dx, dy, dir) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    player.direction = dir;
    if (!isBlocked(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
    drawMap();
}

// Functions bound directly to the web page
document.addEventListener("keydown", (e) => {
    if (dialogBox.style.display === "block") return;
    if (e.key === "w") move(0, -1, "up");
    if (e.key === "s") move(0, 1, "down");
    if (e.key === "a") move(-1, 0, "left");
    if (e.key === "d") move(1, 0, "right");
    if (e.key === " ") checkInteraction();
});

drawMap();