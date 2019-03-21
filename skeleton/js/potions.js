const POTIONS = [10, 20, 30, 40, 50];
const STARTING_POTIONS_AMOUNT = 4;

function generatePotions(amount) {
    for (let i = 0; i < amount; i++) {
        const coords = generateValidCoords();
        addObjToMap(coords, ENTITIES.potion);
        drawMapSegment(coords.x, coords.y);
    }
}

// TODO: Exercise 5
//  Make the player heal when he drinks a potion.
//  1) Increase players health by the amount the potion heals.
//  2) Remove the empty potion from the map.
//  3) Add a new potion to the map.

function drinkPotion(x, y) {
    player.health += POTIONS[Math.floor(Math.random() * POTIONS.length)];
    removeObjFromMap(x, y);
    generatePotions(1);
}