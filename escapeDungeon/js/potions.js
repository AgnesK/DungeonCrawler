const POTIONS = [10, 20, 30, 40, 50];

function generatePotion(coords) {
    addObjToMap(coords, ENTITIES.potion);
    drawMapSegment(coords.x, coords.y);
}

function drinkPotion(x, y) {
    // TODO: Exercise 5
    //  Make the player heal when he drinks a potion.
    //  1) Increase players health by the amount the potion heals.
    player.health = player.health + POTIONS[Math.floor(Math.random()*5)]
    //  2) Remove the empty potion from the map.
    removeObjFromMap(x, y)
}