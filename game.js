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
const eggs = [
    [2, 2],
    [6, 4],
    [10, 7],
    [14, 3],
    [18, 9],
    [22, 6],
    [25, 11],
    [3, 14],
    [1, 16],
    [8, 18],
];
const flowers = [
    [1, 3],
    [3, 1],
    [5, 5],
    [6, 2],
    [7, 7],
];
const voidRanges = [
    [[30, 0], [17, 0]],
    [[30, 1], [17, 1]],
    [[30, 2], [17, 2]],
    [[30, 3], [17, 3]],
    [[30, 4], [17, 4]],
    [[30, 5], [17, 5]],
    [[30, 6], [17, 6]],
    [[30, 7], [17, 7]],
    [[30, 15], [17, 15]],
    [[30, 16], [17, 16]],
    [[30, 17], [17, 17]],
    [[30, 18], [17, 18]],
    [[30, 19], [17, 19]],
];
const npcs = [
    {
        x: 3,
        y: 8,
        text: "The last time I saw an egg was near a laptop...",
        tip: "Have a look at the desks.",
        imagePosition: [105, 11],
    },
    {
        x: 6,
        y: 6,
        text: "I think there was one by the coffee machine!",
        tip: "Maybe by the window.",
        imagePosition: [56, 91],
    },
    {
        x: 20,
        y: 12,
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
    game.style.gridTemplateColumns = 'repeat(' + width + ', 32px)';
    game.style.gridTemplateRows = 'repeat(' + height + ', 32px)';

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const egg = eggs.find((e) => e[0] === x && e[1] === y);
            const flower = flowers.find((o) => o[0] === x && o[1] === y);
            const npc = npcs.find((n) => n.x === x && n.y === y);

            const tile = document.createElement("div");
            tile.classList.add("tile");

            if (y === 0) {
                tile.classList.add("wall_above");
            }
            if (y === 1) {
                tile.classList.add("wall_below");
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

            const isVoidTile = isVoid(x, y);
            if (isVoidTile) {
                const v = document.createElement("div");
                v.classList.add("entity", "void");
                tile.appendChild(v);
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
    if (flowers.some((o) => o[0] === x && o[1] === y)) return true;
    if (isVoid(x, y)) return true;
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