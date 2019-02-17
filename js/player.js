var player;

var Player =
    function Player(level, health, weapon, coords, xp) {_classCallCheck(this, Player);
        this.level = level;
        this.health = health;
        this.weapon = weapon;
        this.coords = coords;
        this.xp = xp;
    };

function generatePlayer() {
    var coords = generateValidCoords();
    player = new Player(1, 100, WEAPONS[0], coords, 30);
    addObjToMap(player.coords, "player");
}

function updatePlayerPosition(oldX, oldY, newX, newY) {
    removeObjFromMap(oldX, oldY);
    map[newY][newX] = "player";
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