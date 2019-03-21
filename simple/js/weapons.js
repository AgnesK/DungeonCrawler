const WEAPONS = [15, 15, 15, 30, 30, 60, 100];

function generateWeapon(coords) {
    addObjToMap(coords, ENTITIES.weapon);
    drawMapSegment(coords.x, coords.y);
}

function takeWeapon(x, y) {
    player.weapon += WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    removeObjFromMap(x, y);
    const coords = generateValidCoords();
    generateWeapon(coords);
}