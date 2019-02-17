var ENEMIES_HEALTH = [30, 30, 30, 30, 40, 40, 60, 80];
var ENEMIES_DAMAGE = [30, 30, 30, 30, 40, 40, 60, 80];
var TOTAL_ENEMIES = 10;

var defeatedEnemies = 0;
var enemies = [];

var Enemy =
    function Enemy(health, coords, damage) {_classCallCheck(this, Enemy);
        this.health = health;
        this.coords = coords;
        this.damage = damage;
    };

function generateEnemies(amount) {
    for (var i = 0; i < amount; i++) {
        var coords = generateValidCoords();
        enemies.push(new Enemy(ENEMIES_HEALTH[Math.floor(Math.random() * ENEMIES_HEALTH.length)], coords, ENEMIES_DAMAGE[Math.floor(Math.random() * ENEMIES_DAMAGE.length)]));
        addObjToMap(coords, "enemy");
    }
}

function getEnemy(x, y) {
    return enemies.filter(function (item) {
        return item.coords.x === x && item.coords.y === y;
    })[0]
}

function fightEnemy(x, y) {
    var enemy = getEnemy(x, y);
    if (player.health - enemy.damage <= 0) {
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