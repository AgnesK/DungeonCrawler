const POTIONS = [10, 20, 30, 40, 50];

function generatePotion(coords) {
    addObjToMap(coords, ENTITIES.potion);
    drawMapSegment(coords.x, coords.y);
}

function drinkPotion(x, y) {

    player.health = player.health + 15
    removeObjFromMap(x, y)
    let coords = generateValidCoords()
    generatePotion(coords)
    // TODO: generiere potions nach einer Zeit
}
