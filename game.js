function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

// create board
var map = [];
var rooms = 0;
var shadow = []; //show only a part of map
var VISIBILITY = 3;
var MAX_ROOM_SIZE = 15;
var MIN_ROOM_SIZE = 4;
var MAX_ROOM_DISTANCE = 4;
var MIN_ROOM_DISTANCE = 2;
var COLS = 80;
var ROWS = 60;
var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");
var busyCoordinates = [];
var player;
var weapon;
var isShadowToggled = true;
var directions = [-1, 0, 1];
var MAX_ERRORS_COUNT = 1000;
var MINIMUM_TILES_AMOUNT = 1000;

var Player =
        function Player(level, health, weapon, coords, xp) {_classCallCheck(this, Player);
            this.level = level;
            this.health = health;
            this.weapon = weapon;
            this.coords = coords;
            this.xp = xp;
        };




startGame();

function startGame() {
    generateMap();
    setTimeout(gameSetUp(), 1000);
    function gameSetUp() {
        generatePlayer();
        generateWeapon(STARTING_WEAPONS_AMOUNT);
        generateEnemies(TOTAL_ENEMIES);
        generatePotions(STARTING_POTIONS_AMOUNT);
        generateShadow();
        drawMap(0, 0, COLS, ROWS);
        updateLegend();
    }
}

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
        if (map[y][x] != 1) {
            map[y][x] = 1;
            tiles++;
        }
        errors = 0;
    }

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

function updateLegend() {
    document.getElementById("xp").innerText = player.xp;
    document.getElementById("level").innerText = player.level;
    document.getElementById("health").innerText = player.health;
    document.getElementById("weapon").innerText = player.weapon.name;
    document.getElementById("damage").innerText = player.weapon.damage;
    document.getElementById("enemies").innerText = TOTAL_ENEMIES - defeatedEnemies;
}

function drawMap(startX, startY, endX, endY) {
    var color;
    for (var row = startY; row < endY; row++) {
        for (var col = startX; col < endX; col++) {
            if (isShadowToggled && shadow[row][col] == 0) {
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
    if (map[y][x] != 1) {
        return false;
    }
    for (var i = 0; i < busyCoordinates.length; i++) {
        try {
            if (busyCoordinates[i].x == x && busyCoordinates[i].y == y) {
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



function generatePlayer() {
    var coords = generateValidCoords();
    player = new Player(1, 100, WEAPONS[0], coords, 30);
    addObjToMap(player.coords, 2);
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

// key down events
document.addEventListener("keydown", function (e) {
    var x = player.coords.x;
    var y = player.coords.y;
    var oldX = player.coords.x;
    var oldY = player.coords.y;
    switch (e.which) {
        case 37: // left
            x--;
            break;
        case 38: // up
            y--;
            break;
        case 39: // right
            x++;
            break;
        case 40: // down
            y++;
            break;
        default:
            return; // exit this handler for other keys
    }
    // check if next spot is enemy
    if (map[y][x] === "enemy") {
        fightEnemy(x, y);
    } else if (map[y][x] !== 0) {
        // if next spot is potion
        if (map[y][x] === "potion") {
            drinkPotion(x, y);
        } else if (map[y][x] === "weapon") {
            takeWeapon(x, y);
        }
        updatePlayerPosition(player.coords.x, player.coords.y, x, y);
        updateLegend();
        drawMap(oldX - VISIBILITY - 1, oldY - VISIBILITY - 1, x + VISIBILITY + 2, y + VISIBILITY + 2);
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function resetGame() {
    defeatedEnemies = [];
    enemies = [];
    busyCoordinates = [];
    shadow = [];
    map = [];
}

function userWins() {
    alert("YOU CONQUERED THE DUNGEON!");
    resetGame();
    startGame();
};

function gameOver() {
    alert("GAME OVER");
    resetGame();
    startGame();
};

function removeObjFromMap(x, y) {
    map[y][x] = 1;
};

function updatePlayerPosition(oldX, oldY, newX, newY) {
    removeObjFromMap(oldX, oldY);
    map[newY][newX] = 2;
    player.coords = { x: newX, y: newY };

    var startX = oldX - VISIBILITY < 0 ? 0 : oldX - VISIBILITY;
    var startY = oldY - VISIBILITY < 0 ? 0 : oldY - VISIBILITY;
    var endX = newX + VISIBILITY >= COLS ? COLS - 1 : newX + VISIBILITY;
    var endY = newY + VISIBILITY >= ROWS ? ROWS - 1 : newY + VISIBILITY;

    if (oldX > newX) {
        startX = newX - VISIBILITY;
        endX = oldX + VISIBILITY;
    }
    if (oldY > newY) {
        startY = newY - VISIBILITY;
        endY = oldY + VISIBILITY;
    }
    for (var row = startY; row <= endY; row++) {
        for (var col = startX; col <= endX; col++) {
            if (row >= newY - VISIBILITY && row <= newY + VISIBILITY && col >= newX - VISIBILITY && col <= newX + VISIBILITY) {
                shadow[row][col] = 1;
            } else {
                shadow[row][col] = 0;
            }
        }
    }
}

function toggleShadow() {
    isShadowToggled = !isShadowToggled;
    drawMap(0, 0, COLS, ROWS);
}