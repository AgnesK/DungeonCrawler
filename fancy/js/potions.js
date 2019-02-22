const POTIONS = [10, 20, 30, 40, 50];
const STARTING_POTIONS_AMOUNT = 4;

function generatePotions(amount) {
    for (let i = 0; i < amount; i++) {
        const coords = generateValidCoords();
        addObjToMap(coords, ENTITIES.potion);
        if (!isShadowToggled) {
            drawObject(coords.x, coords.y, "green");
        }
    }
}

function drinkPotion(x, y) {
    player.health += POTIONS[Math.floor(Math.random() * POTIONS.length)];
    removeObjFromMap(x, y);
    generatePotions(1);
}