var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

var map = [];
var directions = [-1, 0, 1];

var COLS = 80;
var ROWS = 60;
var busyCoordinates = [];
var MAX_ERRORS_COUNT = 1000;
var MINIMUM_TILES_AMOUNT = 1000;

var VISIBILITY = 3;
var shadow = []; //show only a part of map
var isShadowToggled = true;

function generateMap() {
    for (var row = 0; row < ROWS; row++) {
        map.push([]);
        for (var col = 0; col < COLS; col++) {
            map[row].push(0);
        }
    }
    var tiles = 0;
    var errors = 0;
    var x = COLS / 2;
    var y = ROWS / 2;
    for (var i = 0; i < 30000; i++) {
        var increment = directions[Math.floor(Math.random() * directions.length)];
        if (Math.random() < 0.5) {
            x += increment;
            while (x <= 3 || x >= COLS - 4) {
                x += directions[Math.floor(Math.random() * directions.length)];
                errors++;
                if (errors > MAX_ERRORS_COUNT) {
                    if (tiles < MINIMUM_TILES_AMOUNT) {
                        x = COLS / 2;
                        y = ROWS / 2;
                    } else {
                        return;
                    }
                }
            }
        } else {
            y += increment;
            while (y <= 3 || y >= ROWS - 4) {
                y += directions[Math.floor(Math.random() * directions.length)];
                errors++;
                if (errors > MAX_ERRORS_COUNT) {
                    if (tiles < MINIMUM_TILES_AMOUNT) {
                        x = COLS / 2;
                        y = ROWS / 2;
                    } else {
                        return;
                    }
                }
            }
        }
        if (map[y][x] !== 1) {
            map[y][x] = 1;
            tiles++;
        }
        errors = 0;
    }

};

function drawMap(startX, startY, endX, endY) {
    var color;
    for (var row = startY; row < endY; row++) {
        for (var col = startX; col < endX; col++) {
            if (isShadowToggled && shadow[row][col] === 0) {
                drawObject(col, row, "black");
            } else {
                switch (map[row][col]) {
                    case 1:
                        color = "white";
                        break;
                    case 2:
                        color = "blue";
                        break;
                    case "enemy":
                        color = "red";
                        break;
                    case "potion":
                        color = "green";
                        break;
                    case "weapon":
                        color = "orange";
                        break;
                    default:
                        color = "grey";}

                drawObject(col, row, color);
            }
        }
    }
}

function areCoordsFree(x, y) {
    if (map[y][x] !== 1) {
        return false;
    }
    for (var i = 0; i < busyCoordinates.length; i++) {
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
function addBusyCoords(x, y) {
    busyCoordinates.push({
        x: x,
        y: y });

}

function generateValidCoords() {
    var x = Math.floor(Math.random() * COLS);
    var y = Math.floor(Math.random() * ROWS);
    while (!areCoordsFree(x, y)) {
        x = Math.floor(Math.random() * COLS);
        y = Math.floor(Math.random() * ROWS);
    }
    return {
        x: x,
        y: y };

}

// add given coords to map
// make the coords and neighbors busy
// and draw object with given color
function addObjToMap(coords, identifier) {
    map[coords.y][coords.x] = identifier;
    addBusyCoords(coords.x, coords.y);
}

function drawObject(x, y, color) {
    context.beginPath();
    context.rect(x * 10, y * 10, 10, 10);
    context.fillStyle = color;
    context.fill();
}

function removeObjFromMap(x, y) {
    map[y][x] = 1;
};

function generateShadow() {
    var startX = player.coords.x - VISIBILITY < 0 ? 0 : player.coords.x - VISIBILITY;
    var startY = player.coords.y - VISIBILITY < 0 ? 0 : player.coords.y - VISIBILITY;
    var endX = player.coords.x + VISIBILITY >= COLS ? COLS - 1 : player.coords.x + VISIBILITY;
    var endY = player.coords.y + VISIBILITY >= ROWS ? ROWS - 1 : player.coords.y + VISIBILITY;
    for (var row = 0; row < ROWS; row++) {
        shadow.push([]);
        for (var col = 0; col < COLS; col++) {
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