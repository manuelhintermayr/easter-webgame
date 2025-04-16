// Simple 2D Game with Player, Eggs, Objects, and NPCs
const gameWidth = 30;
const gameHeight = 20;

const player = { x: 14, y: 18, direction: "up", frame: 0 };
const playerSpritePositions = {
    down: [0, 0],
    up: [-32, 0],
    left: [-64, 0],
    right: [-96, 0],
};
const eggs = [
    // Left:
    [10, 16],
    [2, 2],
    [6, 4],
    [3, 11],
    [8, 18],

    // Middle:
    [11, 7],
    [14, 3],

    // Right:
    [18, 9],
    [22, 10],
    [25, 11],
];
const flowers = [
    // Left:
    [1, 3],
    [10, 16],
    [5, 5],
    [6, 2],

    // Center:
    [16, 6],

    // Right:
];
const upperWallsRange = [
    // Left:
    [[0, 9], [10, 9]],
    [[0, 15], [10, 15]],

    // Right:
    [[0, 0], [30, 0]],
    [[17, 8], [30, 8]],
];
const lowerWallsRange = [
    // Left:
    [[0, 10], [10, 10]],
    [[0, 16], [10, 16]],

    // Right:
    [[0, 1], [30, 1]],
    [[17, 9], [30, 9]],
];
const voidRanges = [
    // Left:
    [[0, 6], [10, 6]],
    [[0, 7], [10, 7]],
    [[0, 8], [10, 8]],
    [[0, 13], [10, 13]],
    [[0, 14], [10, 14]],
    [[0, 19], [10, 19]],

    // Right:
    [[17, 6], [30, 6]],
    [[17, 7], [30, 7]],
    [[30, 15], [17, 15]],
    [[30, 16], [17, 16]],
    [[30, 17], [17, 17]],
    [[30, 18], [17, 18]],
    [[30, 19], [17, 19]],
];
const npcs = [
    {
        name: "Barbara",
        x: 0,
        y: 18,
        text: "The last time I saw an egg was near a flower...",
        tip: "Have a look behind the flowers in this room.",
        imagePosition: [105, 11],
    },
    {
        name: "Bob",
        x: 16,
        y: 7,
        text: "I think there was one by the coffee machine!",
        tip: "Maybe by the window.",
        imagePosition: [56, 91],
    },
    {
        name: "Alice",
        x: 27,
        y: 2,
        text: "An egg is hiding behind the bookshelf.",
        tip: "Bottom right perhaps?",
        imagePosition: [146, 84],
    },
];

const game = document.getElementById("game");
const eggCount = document.getElementById("eggCount");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const dialogChoices = document.getElementById("dialogChoices");

let pendingTip = null;
let isTipDisplayed = false;


// Function to initialize the game
function drawMap() {
    game.innerHTML = "";
    game.style.gridTemplateColumns = 'repeat(' + gameWidth + ', 32px)';
    game.style.gridTemplateRows = 'repeat(' + gameHeight + ', 32px)';

    for (let y = 0; y < gameHeight; y++) {
        for (let x = 0; x < gameWidth; x++) {
            const isUpperWallTile = isUpperWall(x, y);
            const isLowerWallTile = isLowerWall(x, y);
            const isVoidTile = isVoid(x, y);
            const egg = eggs.find((e) => e[0] === x && e[1] === y);
            const flower = flowers.find((o) => o[0] === x && o[1] === y);
            const npc = npcs.find((n) => n.x === x && n.y === y);

            const tile = document.createElement("div");
            tile.classList.add("tile");

            if (isUpperWallTile) {
                tile.classList.add("wall_above");
            }
            if (isLowerWallTile) {
                tile.classList.add("wall_below");
            }
            if (isVoidTile) {
                tile.classList.add("void");
            }

            if (egg) {
                const e = document.createElement("div");
                e.classList.add("entity", "egg");
                tile.appendChild(e);
            }

            if (flower) {
                const o = document.createElement("div");
                o.classList.add("entity", "flower");
                tile.appendChild(o);
            }

            if (npc) {
                const n = document.createElement("div");
                n.classList.add("entity", "npc");
                const [bgX, bgY] = npc.imagePosition;
                n.style.backgroundPosition = `-${bgX}px -${bgY}px`;
                tile.appendChild(n);
            }

            if (player.x === x && player.y === y) {
                const p = document.createElement("div");
                p.classList.add("entity", "player");
                const [bgX, bgY] = playerSpritePositions[player.direction];
                p.style.backgroundPosition = `${bgX}px ${bgY}px`;
                tile.appendChild(p);
            }

            game.appendChild(tile);
        }
    }
}

function isBlocked(x, y) {
    if (x < 0 || y < 0 || x >= gameWidth || y >= gameHeight) return true;

    if (isUpperWall(x, y)) return true;
    if (isVoid(x, y)) return true;
    if (eggs.some((e) => e[0] === x && e[1] === y)) return true;
    if (flowers.some((o) => o[0] === x && o[1] === y)) return true;
    if (npcs.some((n) => n.x === x && n.y === y)) return true;

    return false;
}

function isVoid(x, y) {
    for (let range of voidRanges) {
        const [start, end] = range;
        const [x1, y1] = start;
        const [x2, y2] = end;

        if (y === y1 && y === y2) {
            if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) return true;
        }
        if (x === x1 && x === x2) {
            if (y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) return true;
        }
    }
    return false;
}

function isUpperWall(x, y) {
    for (let range of upperWallsRange) {
        const [start, end] = range;
        const [x1, y1] = start;
        const [x2, y2] = end;

        if (y === y1 && y === y2) {
            if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) return true;
        }
        if (x === x1 && x === x2) {
            if (y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) return true;
        }
    }
    return false;
}

function isLowerWall(x, y) {
    for (let range of lowerWallsRange) {
        const [start, end] = range;
        const [x1, y1] = start;
        const [x2, y2] = end;

        if (y === y1 && y === y2) {
            if (x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) return true;
        }
        if (x === x1 && x === x2) {
            if (y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) return true;
        }
    }
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
        dialogText.textContent = "🧠 Tip:" + pendingTip;
        dialogChoices.style.display = "none";
        isTipDisplayed = true;
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
    if (dialogBox.style.display === "block") {
        dialogBox.style.display = "none";
        isTipDisplayed = false;
    }

    switch (e.key) {
        case "w":
        case "ArrowUp":
            move(0, -1, "up");
            break;
        case "s":
        case "ArrowDown":
            move(0, 1, "down");
            break;
        case "a":
        case "ArrowLeft":
            move(-1, 0, "left");
            break;
        case "d":
        case "ArrowRight":
            move(1, 0, "right");
            break;
        case " ":
        case "Enter":
            checkInteraction();
            break;
    }
});

drawMap();