const WEAPONS = [15, 15, 15, 30, 30, 60, 100];
const STARTING_WEAPONS_AMOUNT = 3;

function generateWeapon(amount) {
    for (let i = 0; i < amount; i++) {
        const coords = generateValidCoords();
        addObjToMap(coords, ENTITIES.weapon);
        drawMapSegment(coords.x, coords.y);
    }
}

function takeWeapon(x, y) {
    player.weapon += WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    removeObjFromMap(x, y);
    generateWeapon(1);
}