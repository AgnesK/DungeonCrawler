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

function updateLegend() {
    document.getElementById("xp").innerText = player.xp;
    document.getElementById("level").innerText = player.level;
    document.getElementById("health").innerText = player.health;
    document.getElementById("weapon").innerText = player.weapon.name;
    document.getElementById("damage").innerText = player.weapon.damage;
    document.getElementById("enemies").innerText = TOTAL_ENEMIES - defeatedEnemies;
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
}

function gameOver() {
    alert("GAME OVER");
    resetGame();
    startGame();
}

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}