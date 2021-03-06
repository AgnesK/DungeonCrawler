const POTIONS = [10, 20, 30, 40, 50, 500];

function generatePotion(coords) {
    addObjToMap(coords, ENTITIES.potion);
    drawMapSegment(coords.x, coords.y);
}

function drinkPotion(x, y) {
    // TODO: Exercise 5
    //  Make the player heal when he drinks a potion.
    //  1) Increase players health by the amount the potion heals.
	let randomValue = Math.floor(Math.random()*6)
	if (randomValue == 5) {
		alert("ITS A TRAP!")
		trapCoords = [
		[x-1, y-1],
		[x, y-1],
		[x+1, y-1],	
		[x-1, y],	
		[x+1, y],
		[x-1, y+1],
		[x, y+1],
		[x+1, y+1]			
		]
		for (durchlauf=0;durchlauf<8;durchlauf++) {
      	generateEnemy(trapCoords[durchlauf])
		}            
            
            drawMapSegment(0,0,COLS-1, ROWS-1 )
	}
   player.health = player.health + POTIONS[randomValue]
    //  2) Remove the empty potion from the map.
    removeObjFromMap(x,y)
    //  3) Add a new potion to the map.
    generatePotion(generateValidCoords())
}