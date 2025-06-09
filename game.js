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
const bookshelves = [
    [2, 5],
    [28, 10],
];
const startLowerDesks = [
    [25, 12],
    [12, 12],
];
const startUpperDesks = [
    [25, 11],
    [12, 11],
];
const middleLowerDesks = [
    [26, 12],
    [27, 12],
    [28, 12],
    [13, 12],
    [14, 12],
    [15, 12],
    [16, 12],
];
const middleUpperDesks = [
    [26, 11],
    [27, 11],
    [28, 11],
    [13, 11],
    [14, 11],
    [15, 11],
    [16, 11],
];
const endLowerDesks = [
    [29, 12],
    [17, 12],
];
const endUpperDesks = [
    [29, 11],
    [17, 11],
];
const upperWatercoolers = [
    [15, 4],
];
const lowerWatercoolers = [
    [15, 5],
];
const tv = [
    [20, 10],
    [8, 12],
];
const upperPcStation = [
    [3, 8],
    [28, 3],
    [19, 2],
];
const lowerPcStation = [
    [3, 9],
    [28, 4],
    [19, 3],
];
const plantsLarge = [
    [7, 12],
    [26, 4],
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

let loadingDotsInterval;
const game = document.getElementById("game");
const eggCount = document.getElementById("eggCount");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const dialogChoices = document.getElementById("dialogChoices");
const controlPanel = document.getElementById("controls-container");

let pendingTip = null;
let isTipDisplayed = false;


// Function to initialize the game
let mapInitialized = false;

function drawMap() {
    if (!mapInitialized) {
        // Map initial zum ersten Mal zeichnen
        game.innerHTML = "";
        game.style.gridTemplateColumns = `repeat(${gameWidth}, 32px)`;
        game.style.gridTemplateRows = `repeat(${gameHeight}, 32px)`;

        for (let y = 0; y < gameHeight; y++) {
            for (let x = 0; x < gameWidth; x++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.x = x;
                tile.dataset.y = y;

                if (isUpperWall(x, y)) tile.classList.add("wall_above");
                if (isLowerWall(x, y)) tile.classList.add("wall_below");
                if (isVoid(x, y)) tile.classList.add("void");

                if (flowers.find(f => f[0] === x && f[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "flower");
                    tile.appendChild(o);
                }

                if (bookshelves.find(b => b[0] === x && b[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "bookshelf");
                    tile.appendChild(o);
                }

                if (startLowerDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "start-lower-desk");
                    tile.appendChild(o);
                }

                if (startUpperDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "start-upper-desk");
                    tile.appendChild(o);
                }

                if (middleLowerDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "middle-lower-desk");
                    tile.appendChild(o);
                }

                if (middleUpperDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "middle-upper-desk");
                    tile.appendChild(o);
                }

                if (endLowerDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "end-lower-desk");
                    tile.appendChild(o);
                }

                if (endUpperDesks.find(d => d[0] === x && d[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "end-upper-desk");
                    tile.appendChild(o);
                }

                if (upperWatercoolers.find(w => w[0] === x && w[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "upper-watercooler");
                    tile.appendChild(o);
                }

                if (lowerWatercoolers.find(w => w[0] === x && w[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "lower-watercooler");
                    tile.appendChild(o);
                }

                if (tv.find(t => t[0] === x && t[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "tv");
                    tile.appendChild(o);
                }

                if (upperPcStation.find(p => p[0] === x && p[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "upper-pc-station");
                    tile.appendChild(o);
                }

                if (lowerPcStation.find(p => p[0] === x && p[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "lower-pc-station");
                    tile.appendChild(o);
                }

                if (plantsLarge.find(p => p[0] === x && p[1] === y)) {
                    const o = document.createElement("div");
                    o.classList.add("entity", "plant-large");
                    tile.appendChild(o);
                }

                const npc = npcs.find(n => n.x === x && n.y === y);
                if (npc) {
                    const n = document.createElement("div");
                    n.classList.add("entity", "npc");
                    const [bgX, bgY] = npc.imagePosition;
                    n.style.backgroundPosition = `-${bgX}px -${bgY}px`;
                    tile.appendChild(n);
                }

                game.appendChild(tile);
            }
        }

        mapInitialized = true;
        updateEggs();
    }

    // Update player position
    document.querySelectorAll(".player").forEach(el => el.remove());
    const playerTile = document.querySelector(`.tile[data-x='${player.x}'][data-y='${player.y}']`);
    if (playerTile) {
        const p = document.createElement("div");
        p.classList.add("entity", "player");
        const [bgX, bgY] = playerSpritePositions[player.direction];
        p.style.backgroundPosition = `${bgX}px ${bgY}px`;
        playerTile.appendChild(p);
    }
}


function isBlocked(x, y) {
    if (x < 0 || y < 0 || x >= gameWidth || y >= gameHeight) return true;
    if (isUpperWall(x, y) || isVoid(x, y)) return true;
    if (npcs.some(npc => npc.x === x && npc.y === y)) return true;

    const objectArrays = [
        eggs,
        flowers,
        bookshelves,
        startLowerDesks,
        startUpperDesks,
        middleLowerDesks,
        middleUpperDesks,
        endLowerDesks,
        endUpperDesks,
        lowerWatercoolers,
        upperWatercoolers,
        tv,
        lowerPcStation,
        upperPcStation,
        plantsLarge
    ];
    if (objectArrays.some(arr => arr.some(obj => obj[0] === x && obj[1] === y))) {
        return true;
    }

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
            if (eggs.length === 0) {
                endGame();
            } else {
                updateEggs();
            }
            return true;
        }
    }
    return false;
}

function updateEggs() {
    document.querySelectorAll(".egg").forEach(el => el.remove());

    eggs.forEach(([x, y]) => {
        const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
        if (tile) {
            const e = document.createElement("div");
            e.classList.add("entity", "egg");
            tile.appendChild(e);
        }
    });
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
        controlPanel.style.display = "flex";
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

// Start of the Game:
function startGame() {
    const onlyForMainScreen = document.getElementsByClassName("onlyForMainScreen");
    onlyForMainScreen[0].style.display = "none";

    const startGameButton = document.getElementById("startGameButton");
    startGameButton.style.display = "none";

    const mainButtonsContainer = document.getElementById("otherChoices");
    mainButtonsContainer.style.display = "flex";

    const mobileControls = document.getElementById("mobile-controls");
    mobileControls.style.display = "flex";

    const eggCounter = document.getElementById("hud");
    eggCounter.style.display = "flex";

    game.style.display = "grid";
    dialogBox.style.display = "none";

    // Functions bound directly to the web page
    document.addEventListener("keydown", handleKeyDown);

    drawMap();
}

function handleKeyDown(e) {
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
}


function startLoadingAnimation() {
    const btn = document.getElementById("startGameButton");
    const baseText = "Loading game files";
    let dotCount = 0;

    loadingDotsInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        btn.textContent = baseText + ".".repeat(dotCount);
    }, 500); // alle 0.5 Sekunden ändern
}

function enableButtonWhenReady() {
    window.onload = function () {
        const button = document.getElementById("startGameButton");

        clearInterval(loadingDotsInterval); // ⛔️ Animation stoppen
        button.disabled = false;
        button.textContent = "Start Game!";
    };
}

document.addEventListener("DOMContentLoaded", () => {
    startLoadingAnimation();
    enableButtonWhenReady();
});

// End of the game:
function endGame() {
    document.removeEventListener("keydown", handleKeyDown);
    game.style.display = "none";
    const onlyForMainScreen = document.getElementsByClassName("onlyForMainScreen");
    onlyForMainScreen[0].style.display = "none";
    const mobileControls = document.getElementById("mobile-controls");
    mobileControls.style.display = "none";
    const eggCounter = document.getElementById("hud");
    eggCounter.style.display = "none";

    dialogBox.style.display = "block";
    dialogText.textContent = "Congratulation! You found all the eggs! \n\nThank you for playing my game :)";
    dialogChoices.style.display = "none";
}
