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
    [6, 5],
    [5, 10],
    [0, 17],
    [10, 11],

    // Middle:
    [11, 7],
    [14, 3],

    // Right:
    [29, 9],
    [25, 12],
    [27, 1],
];
const flowers = [
    // Left:
    [0, 10],
    [10, 16],
    [17, 14],
    [18, 1],

    // Center:
    [16, 6],

    // Right:
];
const bookshelves = [
    [0, 12],
    [10, 12],
    [25, 1],
    [26, 1],
    [27, 1],
    [28, 1],
    [29, 1],
];
const startLowerDesks = [
    [19, 13],
    [1, 17],
    [2, 4],
];
const startUpperDesks = [
    [19, 12],
    [1, 16],
    [2, 3],
];
const middleLowerDesks = [
    [20, 13],
    [21, 13],
    [22, 13],
    [23, 13],
    [24, 13],
    [25, 13],
    [26, 13],
    [27, 13],
    [2, 17],
    [3, 17],
    [4, 17],
    [5, 17],
    [6, 17],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
    [8, 4],
    [9, 4],
    [10, 4],
    [11, 4],
    [12, 4],
    [13, 4],
    [14, 4],
    [15, 4],
    [16, 4],
    [17, 4],
    [18, 4],
    [19, 4],
    [20, 4],
    [21, 4],
    [22, 4],
    [23, 4],
    [24, 4],
    [25, 4],
];
const middleUpperDesks = [
    [20, 12],
    [21, 12],
    [22, 12],
    [23, 12],
    [24, 12],
    [25, 12],
    [26, 12],
    [27, 12],
    [2, 16],
    [3, 16],
    [4, 16],
    [5, 16],
    [6, 16],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 3],
    [10, 3],
    [11, 3],
    [12, 3],
    [13, 3],
    [14, 3],
    [15, 3],
    [16, 3],
    [17, 3],
    [18, 3],
    [19, 3],
    [20, 3],
    [21, 3],
    [22, 3],
    [23, 3],
    [24, 3],
    [25, 3],
];
const endLowerDesks = [
    [28, 13],
    [7, 17],
    [26, 4],
];
const endUpperDesks = [
    [28, 12],
    [7, 16],
    [26, 3],
];
const lowerWatercoolers = [
    [17, 9],
    [9, 16],
    [17, 1],
    [10, 10],
];
const upperWatercoolers = [
    [17, 8],
    [9, 15],
    [17, 0],
    [10, 9],
];
const tv = [
    [21, 11],
    [22, 11],
    [24, 11],
    [25, 11],
    [16, 17],
    [11, 1], 
    [12, 1],
    [14, 1],
    [15, 1],
];
const lowerPcStation = [
    [2, 10],
    [3, 10],
    [4, 10],
    [6, 10],
    [7, 10],
    [8, 10],

    [19, 9],
    [20, 9],
    [21, 9],
    [23, 9],
    [24, 9],
    [25, 9],
    [27, 9],
    [28, 9],

    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [6, 1],
    [7, 1],
    [8, 1],

    [20, 1],
    [21, 1],
    [22, 1],
];
const upperPcStation = [
    [2, 9],
    [3, 9],
    [4, 9],
    [6, 9],
    [7, 9],
    [8, 9],

    [19, 8],
    [20, 8],
    [21, 8],
    [23, 8],
    [24, 8],
    [25, 8],
    [27, 8],
    [28, 8],

    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [6, 0],
    [7, 0],
    [8, 0],

    [20, 0],
    [21, 0],
    [22, 0],
];
const plantsLarge = [
    [0, 5],
    [29, 5],
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
        text: "I head some left theirs behind some chairs...",
        tip: "Check the desks from the upper and the the right meeting rooms.",
        imagePosition: [56, 91],
    },
    {
        name: "Alice",
        x: 19,
        y: 1,
        text: "An egg is hiding behind the bookshelf.",
        tip: "Third one perhaps?",
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
        game.innerHTML = "";
        game.style.gridTemplateColumns = `repeat(${gameWidth}, 32px)`;
        game.style.gridTemplateRows = `repeat(${gameHeight}, 32px)`;

        const objectMap = [
            { arr: flowers, className: "flower" },
            { arr: bookshelves, className: "bookshelf" },
            { arr: startLowerDesks, className: "start-lower-desk" },
            { arr: startUpperDesks, className: "start-upper-desk" },
            { arr: middleLowerDesks, className: "middle-lower-desk" },
            { arr: middleUpperDesks, className: "middle-upper-desk" },
            { arr: endLowerDesks, className: "end-lower-desk" },
            { arr: endUpperDesks, className: "end-upper-desk" },
            { arr: upperWatercoolers, className: "upper-watercooler" },
            { arr: lowerWatercoolers, className: "lower-watercooler" },
            { arr: tv, className: "tv" },
            { arr: upperPcStation, className: "upper-pc-station" },
            { arr: lowerPcStation, className: "lower-pc-station" },
            { arr: plantsLarge, className: "plant-large" },
        ];

        for (let y = 0; y < gameHeight; y++) {
            for (let x = 0; x < gameWidth; x++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.x = x;
                tile.dataset.y = y;

                if (isUpperWall(x, y)) tile.classList.add("wall_above");
                if (isLowerWall(x, y)) tile.classList.add("wall_below");
                if (isVoid(x, y)) tile.classList.add("void");

                // Add objects
                for (const obj of objectMap) {
                    if (obj.arr.find(o => o[0] === x && o[1] === y)) {
                        const oDiv = document.createElement("div");
                        oDiv.classList.add("entity", obj.className);
                        tile.appendChild(oDiv);
                    }
                }

                // NPCs
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
        // startUpperDesks,
        middleLowerDesks,
        // middleUpperDesks,
        endLowerDesks,
        // endUpperDesks,
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
