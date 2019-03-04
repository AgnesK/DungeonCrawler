let canvas = document.getElementById("grid");
let context = canvas.getContext("2d");

let map = [];
let directions = [-1, 0, 1];

const PIXEL_SIZE = 15;
const COLS = Math.floor(canvas.width / PIXEL_SIZE);
const ROWS = Math.floor(canvas.height / PIXEL_SIZE);
// unclear what 'busy' means. seems to prevent coordinates from being picked (e.g. for spawning)
// if at any time something was already on that spot. Even if the coords are now free/floor
let busyCoordinates = [];
const MAX_TRIES_COUNT = 1000;
const MINIMUM_TILES_AMOUNT = 1000;

const VISIBILITY = 3;
let shadow = []; //show only a part of map
let isShadowToggled = false;

const ENTITIES = Object.freeze({enemy: 'E', player: 'P', potion: 'p', weapon: 'W', wall: '#', floor: '.'});

function textMap(map) {
    let tmp = "";
    for (let row of map) {
        for (let col of row) {
            tmp += col
        }
        tmp += '\n'
    }
    return tmp
}

// replace with static map gen/allow switching
function generateMap() {
    if (COLS <= 5 || ROWS <= 5) {
        alert("The map is too small, can't generate a map");
        return
    }

    // fill the whole map with walls
    for (let row = 0; row < ROWS; row++) {
        map.push([]);
        for (let col = 0; col < COLS; col++) {
            map[row].push(ENTITIES.wall);
        }
    }
    let tiles = 0;
    let tries = 0;
    let x = Math.floor(COLS / 2);
    let y = Math.floor(ROWS / 2);
    for (let i = 0; i < 30000; i++) {
        // ensure the next step does leave a n-wide border of walls
        let nextx = x;
        let nexty = y;
        do {
            tries++;
            // walk a random distance either in x or y direction
            let increment = directions[Math.floor(Math.random() * directions.length)];
            if (Math.random() < 0.5) {
                nextx = x + increment;
            } else {
                nexty = y + increment;
            }

            // if we still need tiles, reset into the center to continue
            if (tries > MAX_TRIES_COUNT) {
                if (tiles < MINIMUM_TILES_AMOUNT) {
                    console.log(`reset with ${x},${y}`);
                    nextx = Math.floor(COLS / 2);
                    nexty = Math.floor(ROWS / 2);
                } else {
                    return;
                }
            }
        } while (nextx <= 2 || nextx >= COLS - 3 || nexty <= 2 || nexty >= ROWS - 3);
        x = nextx;
        y = nexty;

        if (map[y][x] !== ENTITIES.floor) {
            map[y][x] = ENTITIES.floor;
            tiles++;
        }
        tries = 0;
    }
}

function drawMap(startX, startY, endX, endY) {
    let color;
    for (let row = Math.max(0, startY); row < Math.min(ROWS, endY); row++) {
        for (let col = Math.max(0, startX); col < Math.min(COLS, endX); col++) {
            if (isShadowToggled && shadow[row][col] === 0) {
                drawObject(col, row, "black");
            } else {
                switch (map[row][col]) {
                    case ENTITIES.floor:
                        color = "white";
                        break;
                    case ENTITIES.player:
                        color = "blue";
                        break;
                    case ENTITIES.enemy:
                        color = "red";
                        break;
                    case ENTITIES.potion:
                        color = "lightgreen";
                        break;
                    case ENTITIES.weapon:
                        color = "orange";
                        break;
                    case ENTITIES.wall:
                    default:
                        color = "dimgrey";
                }

                drawObject(col, row, color);
            }
        }
    }
}

function areCoordsFree(x, y) {
    if (map[y][x] !== ENTITIES.floor) {
        return false;
    }
    for (let i = 0; i < busyCoordinates.length; i++) {
        try {
            if (busyCoordinates[i].x === x && busyCoordinates[i].y === y) {
                return false;
            }
        } catch (e) {
            console.log("Error: " + e);
        }
    }
    return true;
}

// set the given coords as busy + the 8 neighbors
// what are these used for? right now they are only used to check if there is space on the floor.
// but since everything is also added to map[y][x], why is it needed?
function addBusyCoords(x, y) {
    busyCoordinates.push({
        x: x,
        y: y
    });
}

function generateValidCoords() {
    let x = Math.floor(Math.random() * COLS);
    let y = Math.floor(Math.random() * ROWS);
    while (!areCoordsFree(x, y)) {
        x = Math.floor(Math.random() * COLS);
        y = Math.floor(Math.random() * ROWS);
    }
    return {
        x: x,
        y: y
    };
}

// add given coords to map
// make the coords and neighbors busy
// and draw object with given color
function addObjToMap(coords, identifier) {
    map[coords.y][coords.x] = identifier;
    addBusyCoords(coords.x, coords.y);
}

let img = new Image();
img.src = 'assets/green_character.png';

function drawObject(x, y, color) {
    let colorn = color !== 'blue' ? color : 'white';
    context.beginPath();
    context.rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    context.fillStyle = colorn;
    context.fill();
    if (color === 'blue') {
        context.drawImage(img, x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
}

function removeObjFromMap(x, y) {
    map[y][x] = ENTITIES.floor;
}

// keep or unnecessary complexity?
function generateShadow() {
    const startX = player.coords.x - VISIBILITY < 0 ? 0 : player.coords.x - VISIBILITY;
    const startY = player.coords.y - VISIBILITY < 0 ? 0 : player.coords.y - VISIBILITY;
    const endX = player.coords.x + VISIBILITY >= COLS ? COLS - 1 : player.coords.x + VISIBILITY;
    const endY = player.coords.y + VISIBILITY >= ROWS ? ROWS - 1 : player.coords.y + VISIBILITY;
    for (let row = 0; row < ROWS; row++) {
        shadow.push([]);
        for (let col = 0; col < COLS; col++) {
            if (row >= startY && row <= endY && col >= startX && col <= endX) {
                shadow[row].push(1);
            } else {
                shadow[row].push(0);
            }
        }
    }
}

function toggleShadow() {
    isShadowToggled = !isShadowToggled;
    drawMap(0, 0, COLS, ROWS);
}