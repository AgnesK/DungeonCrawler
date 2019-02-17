var WEAPONS = [{
    name: "Knife",
    damage: 15 },
    {
        name: "Gun",
        damage: 30 },
    {
        name: "Bazooka",
        damage: 60 },
    {
        name: "Atomic Bomb",
        damage: 100 }];
var STARTING_WEAPONS_AMOUNT = 3;

function generateWeapon(amount) {
    for (var i = 0; i < amount; i++) {
        var coords = generateValidCoords();
        addObjToMap(coords, "weapon");
        if (!isShadowToggled) {
            drawObject(coords.x, coords.y, "orange");
        }
    }
}

function takeWeapon(x, y) {
    player.weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
    removeObjFromMap(x, y);
    generateWeapon(1);
}