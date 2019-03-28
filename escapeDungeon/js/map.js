let canvas = document.getElementById("grid");
let context = canvas.getContext("2d");

let map = [];

const PIXEL_SIZE = 30;
const COLS = Math.floor(canvas.width / PIXEL_SIZE);
const ROWS = Math.floor(canvas.height / PIXEL_SIZE);

const ENTITIES = Object.freeze({enemy: 'E', player: 'P', potion: 'p', wall: '#', floor: '.'});

const level1 = [
    "##########################",
    "#........................#",
    "#........................#",
    "#....................E...#",
    "#........................#",
    "#......................E.#",
    "#........................#",
    "#.p......................#",
    "#........................#",
    "#........................#",
    "#..........P.............#",
    "#........................#",
    "#........................#",
    "#.........E.......E..p...#",
    "#........................#",
    "#....................p...#",
    "#........................#",
    "#..................E.....#",
    "#.p......................#",
    "##########################"
];

function generateMap() {
    generateMapFromText(level1);
}

function generateMapFromText(level) {
    // Check if textMap has same size as ROW/COLS
    if (ROWS !== level.length || COLS !== level[0].length) {
        alert("The text map doesn't have the right size, can't generate a map");
        return
    }

    // Generate Player, Enemies, Potions and Weapon Upgrades
    for (let row = 0; row < level.length; row++) {
        map.push([]);
        for (let col = 0; col < level[0].length; col++) {
            map[row][col] = (level[row].charAt(col));
            switch (level[row].charAt(col)) {
                case ENTITIES.player:
                    generatePlayer({
                        x: col,
                        y: row
                    });
                    break;
                case ENTITIES.enemy:
                    generateEnemy({
                        x: col,
                        y: row
                    });
                    break;
                case ENTITIES.potion:
                    generatePotion({
                        x: col,
                        y: row
                    });
                    break;
                default:
            }
        }
    }
}

/** update a part (or all of) the map */
function drawMapSegment(startX, startY, endX, endY) {
    // if only called with 2 arguments, update square (y,x)
    if (endX === undefined || endY === undefined) {
        endX = startX + 1;
        endY = startY + 1;
    }

    for (let row = Math.max(0, startY); row < Math.min(ROWS, endY); row++) {
        for (let col = Math.max(0, startX); col < Math.min(COLS, endX); col++) {
            drawSquare(col, row, map[row][col]);
        }
    }
}

function areCoordsFree(x, y) {
    if (map[y][x] !== ENTITIES.floor) {
        return false;
    }
    return true;
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
}

function removeObjFromMap(x, y) {
    map[y][x] = ENTITIES.floor;
}

function drawSquare(x, y, obj) {
    let color = undefined;
    let sprite = undefined;
    switch (obj) {
        case ENTITIES.floor:
            color = "white";
            break;
        case ENTITIES.player:
            color = "blue";
            drawColoredSquare(x, y,"white")
            sprite = new Image();
            sprite.onload=()=>drawMapSegment(x,y)
            sprite.src = "assets/player.png";
            drawWithSprite(x, y, sprite);
            break;
        case ENTITIES.enemy:
            color = "red";
            drawColoredSquare(x, y,"white")
            sprite=new Image()
            sprite.onload=()=>drawMapSegment(x,y)
            sprite.src="assets/enemy.png"
            drawWithSprite(x,y, sprite)
            break;
        case ENTITIES.potion:
            color = "lightgreen";
            drawColoredSquare(x, y,"white")
            sprite=new Image()
            sprite.onload=()=>drawMapSegment(x,y)
            sprite.src="assets/potions.png"
            drawWithSprite(x,y, sprite)

            break;
        case ENTITIES.wall:
        default:
            color = "dimgrey";
    }

    if (sprite === undefined) {
        // draw the square
        drawColoredSquare(x, y, color);
    }
}

function drawColoredSquare(x, y, color) {
    context.beginPath();
    context.rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    context.fillStyle = color;
    context.fill();
}

function drawWithSprite(x, y, sprite) {
    context.drawImage(sprite, x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
}