const ENEMIES_HEALTH = [30, 30, 30, 30, 40, 40, 60, 80];
const ENEMIES_DAMAGE = [30, 30, 30, 30, 40, 40, 60, 80];
const TOTAL_ENEMIES = 10;

var defeatedEnemies = 0;
var enemies = [];

class Enemy {
    constructor(health, coords, damage){
        this.coords = coords;
        this.health = health;
        this.damage = damage;
    }
}

// TODO function place enemy
function generateEnemies(amount) {
    for (let i = 0; i < amount; i++) {
        const coords = generateValidCoords();
        enemies.push(new Enemy(ENEMIES_HEALTH[Math.floor(Math.random() * ENEMIES_HEALTH.length)], coords, ENEMIES_DAMAGE[Math.floor(Math.random() * ENEMIES_DAMAGE.length)]));
        addObjToMap(coords, ENTITIES.enemy);
    }
}

function getEnemy(x, y) {
    return enemies.filter(function (item) {
        return item.coords.x === x && item.coords.y === y;
    })[0]
}

function fightEnemy(x, y) {
    const enemy = getEnemy(x, y);
    if (player.health - enemy.damage <= 0) {
        // shouldn't this be in the main loop
        gameOver();
        return;
    } else if (enemy.health - player.weapon.damage <= 0) {
        enemyDefeated(enemy);
    }
    enemy.health -= player.weapon.damage;
    player.health -= enemy.damage;
    updateLegend();
}

function enemyDefeated(enemy) {
    defeatedEnemies++;
    if (defeatedEnemies === 10) {
        // shouldn't this be in the main loop
        userWins();
        return;
    }
    removeObjFromMap(enemy.coords.x, enemy.coords.y);
    drawMap(enemy.coords.x - 1, enemy.coords.y - 1, enemy.coords.x + 1, enemy.coords.y + 1);
    enemies.slice(enemies.indexOf(enemy), 1);
    player.xp += 50;
    if (player.xp - 100 * (player.level - 1) >= 100) {
        player.level++;
    }
    updateLegend();
}