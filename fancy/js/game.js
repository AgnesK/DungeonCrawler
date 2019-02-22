startGame();

function startGame() {
    generateMap();
    setTimeout(gameSetUp(), 1000);

    // difficulty settings, the base game takes ages to complete
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
// mobile?
// this has to be fundamentally different if we want smooth movement (game loop)
// not necessary right now, because updates are bound to the player moving
document.addEventListener("keydown", function (e) {
    let x = player.coords.x;
    let y = player.coords.y;
    let oldX = player.coords.x;
    let oldY = player.coords.y;
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
    if (map[y][x] === ENTITIES.enemy) {
        fightEnemy(x, y);
    } else if (map[y][x] !== ENTITIES.wall) {
        // if next spot is potion
        if (map[y][x] === ENTITIES.potion) {
            drinkPotion(x, y);
        } else if (map[y][x] === ENTITIES.weapon) {
            takeWeapon(x, y);
        }
        updatePlayerPosition(player.coords.x, player.coords.y, x, y);
        updateLegend();
        drawMap(oldX - VISIBILITY - 1, oldY - VISIBILITY - 1, x + VISIBILITY + 2, y + VISIBILITY + 2);
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

function resetGame() {
    defeatedEnemies = 0;
    enemies = [];
    busyCoordinates = [];
    shadow = [];
    map = [];
}

function userWins() {
    alert("YOU CONQUERED THE DUNGEON!");
    // how could we make this more awesome
    resetGame();
    startGame();
}

function gameOver() {
    alert("GAME OVER");
    resetGame();
    startGame();
}
