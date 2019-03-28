let player;

class Player {
    constructor(level, health, weapon, coords, xp) {
        this.level = level;
        this.health = health;
        this.weapon = weapon;
        this.coords = coords;
        this.xp = xp;
        this.maps = 0
    }
}

function generatePlayer(coords) {
    player = new Player(1, 100, 15, coords, 30);
    addObjToMap(player.coords, ENTITIES.player);
}

function updatePlayerPosition(oldX, oldY, newX, newY) {
    removeObjFromMap(oldX, oldY);
    map[newY][newX] = ENTITIES.player;
    player.coords = {x: newX, y: newY};
}