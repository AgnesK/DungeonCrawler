const WEAPONS = [{
    name: "Knife",
    damage: 15
},
    {
        name: "Gun",
        damage: 30
    },
    {
        name: "Bazooka",
        damage: 60
    },
    {
        name: "Atomic Bomb",
        damage: 100
    }];
const STARTING_WEAPONS_AMOUNT = 3;

function generateWeapon(amount) {
    for (let i = 0; i < amount; i++) {
        const coords = generateValidCoords();
        addObjToMap(coords, ENTITIES.weapon);
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