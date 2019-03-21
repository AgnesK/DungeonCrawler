const POTIONS = [10, 20, 30, 40, 50];

function generatePotion(coords) {
    addObjToMap(coords, ENTITIES.potion);
    drawMapSegment(coords.x, coords.y);
}

function drinkPotion(x, y) {
    player.health += POTIONS[Math.floor(Math.random() * POTIONS.length)];
    removeObjFromMap(x, y);
    const coords = generateValidCoords();
    generatePotion(coords);
}