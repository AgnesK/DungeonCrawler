var POTIONS = [10, 20, 30, 40, 50];
var STARTING_POTIONS_AMOUNT = 4;

function generatePotions(amount) {
    for (var i = 0; i < amount; i++) {
        var coords = generateValidCoords();
        addObjToMap(coords, "potion");
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