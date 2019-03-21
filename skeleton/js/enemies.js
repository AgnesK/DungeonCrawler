const ENEMIES_HEALTH = [30, 30, 30, 30, 40, 40, 60, 80];
const ENEMIES_DAMAGE = [30, 30, 30, 30, 40, 40, 60, 80];
const TOTAL_ENEMIES = 5;

let enemies = [];

class Enemy {
    constructor(health, coords, damage) {
        this.coords = coords;
        this.health = health;
        this.damage = damage;
    }
}

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

// TODO: Exercise 4a
// Make the player fight the enemy.
// 1) Check which player is sitting on those coordinates x and y.
// 2) Decrease the enemies health by the damage the players weapon deals.
// 3) Decrease the players health by the damage the enemy deals.
// 4) Check if the enemy is still alive. What should happen then?
// 5) Check if the player might have won or lost the game.

function fightEnemy(x, y) {
    const enemy = getEnemy(x, y);
    enemy.health -= player.weapon.damage;
    player.health -= enemy.damage;
    if (enemy.health <= 0) {
        enemyDefeated(enemy);
    }
    updateLegend();

    if (player.health <= 0) {
        gameOver();
    } else if (player.health > 0 && enemies.length === 0) {
        userWins();
    }
}

// TODO: Exercise 4b
//  What happens when the player defeats an enemy?
function enemyDefeated(enemy) {
    removeObjFromMap(enemy.coords.x, enemy.coords.y);
    drawMapSegment(enemy.coords.x - 1, enemy.coords.y - 1, enemy.coords.x + 1, enemy.coords.y + 1);
    enemies.splice(enemies.indexOf(enemy), 1);
    player.xp += 50;
    if (player.xp - 100 * (player.level - 1) >= 100) {
        player.level++;
    }
    updateLegend();
}