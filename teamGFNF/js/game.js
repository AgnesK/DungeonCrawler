startGame();

function startGame() {
    generateMap();
    drawMapSegment(0, 0, COLS, ROWS);
    updateLegend();
}

function updateLegend() {
    document.getElementById("health").innerText = player.health;
    document.getElementById("enemies").innerText = `${enemies.length}`;
}

function resetGame() {
    enemies = [];
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

// ____________________________________________________

// TODO: Exercise 3a
//  Understand how the player walks through the dungeon.
//  What happens when the player meets an enemy?
//  What happens when the player walks into a wall?
//  What happens when the player encounters a potion?

function movePlayer(oldX, oldY, newX, newY) {
    // check if next spot is enemy
    if (map[newY][newX] === ENTITIES.enemy) {
        fightEnemy(newX, newY);
    } else if (map[newY][newX] !== ENTITIES.wall) {
        // if next spot is potion
        if (map[newY][newX] === ENTITIES.potion) {
            drinkPotion(newX, newY);
        }
        if (map[newY][newX] === ENTITIES.teleporter){
            newX = player.coords.x
            newY = player.coords.y + 10
            if (newY >= ROWS-2) {
                newY = newY - 15
            }
            // let coords = generateValidCoords()
            // newX = coords.x
            // newY = coords.y
        }
        if (map[newY][newX] === ENTITIES.kiste){
            player.maps++
        }
        updatePlayerPosition(player.coords.x, player.coords.y, newX, newY);
        updateLegend();
        drawMapSegment(0, 0, COLS, ROWS);
    }
    if(player.maps === MAPS){
        userWins()
    }
}

// TODO: Exercise 3b
//  Reacting to keyboard strokes:

// To get the proper keycode, see e.g. https://keycode.info/
const KEYCODES = Object.freeze({left: 37, up: 38, right: 39, down: 40})

document.addEventListener("keydown", function (e) {
    let newX = player.coords.x;
    let newY = player.coords.y;
    const oldX = player.coords.x;
    const oldY = player.coords.y;

    switch (e.which) {
        case KEYCODES.left:
            newX--;
            break;
        case KEYCODES.up:
            newY--;
            break;
        case KEYCODES.right:
            newX++;
            break;
        case KEYCODES.down:
            newY++;
            break;
        default:
            return; // exit this handler for other keys
    }

    movePlayer(oldX, oldY, newX, newY);
    moveEnemies()
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// TODO: Exercise 3c
//  Reacting to touch on mobile devices:

canvas.addEventListener("touchstart", function (e) {
    let newX = player.coords.x;
    let newY = player.coords.y;
    const oldX = player.coords.x;
    const oldY = player.coords.y;

    if (e.touches) {
        const touchX = Math.floor((e.touches[0].pageX - canvas.offsetLeft) / PIXEL_SIZE);
        const touchY = Math.floor((e.touches[0].pageY - canvas.offsetTop) / PIXEL_SIZE);
        const touchIsFurtherFromPlayerOnXThanYAxis = Math.abs(oldX - touchX) > Math.abs(oldY - touchY);

        if (touchIsFurtherFromPlayerOnXThanYAxis) {
            // touch was to the right of player, i.e. player walks one step to the right
            if (oldX - touchX < 0) {
                newX++;
            } else newX--; // touch was to the left of player
            // touch was to below player, i.e. player walks one step down
        } else if (oldY - touchY < 0) {
            newY++;
        } else newY--; // touch was above player
    }

    movePlayer(oldX, oldY, newX, newY);
    e.preventDefault();
});
// Needed in order to prevent zoom on double tap on mobile devices.
canvas.addEventListener("touchend", function (e) {
    e.preventDefault()
});
