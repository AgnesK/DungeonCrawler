const POTIONS = [10, 20, 30, 40, 50];

function generatePotion(coords) {
    addObjToMap(coords, ENTITIES.potion);
    drawMapSegment(coords.x, coords.y);
}

// TODO: Exercise 5
//  Make the player heal when he drinks a potion.
//  1) Increase players health by the amount the potion heals.
//  2) Remove the empty potion from the map.
//  3) Add a new potion to the map.

function drinkPotion(x, y) {
    player.health += POTIONS[Math.floor(Math.random() * POTIONS.length)];
    removeObjFromMap(x, y);
    const coords = generateValidCoords();
    generatePotion(coords);
}