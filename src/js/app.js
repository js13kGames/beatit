var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var mainHero = new Image();
mainHero.addEventListener('load',drawSetup, false);
mainHero.src = 'hero.png';
var enemiesNumber = 10;

function drawSetup() {
	ctx.drawImage(mainHero, 522,650);
	createEnemies(enemiesNumber);
}

function createEnemies(enemiesNumber) {
	//Make the enemies
	var spacing = 48,
		xOffset = 150,
		speed = 2,
		direction = 1,
		posX, posY;

	enemies = [];
	for (var i = 0; i <= enemiesNumber; i++) {
		// var enemy = g.rectangle(32, 32, 'red');
		// var x = spacing * i + xOffset;
		// var y = g.randomInt(0, g.canvas.height - enemy.height);

		// enemy.x = x;
		// enemy.y = y;
		// enemy.vy = speed * direction;
		// direction *= -1;
		// enemies.push(enemy);
		// gameScene.addChild(enemy);
		posX = getRandomInt(0, canvas.width - 15);
		posY = getRandomInt(0, canvas.height - 200 - 15);
		ctx.fillStyle = '#a1a1a1';
		ctx.fillRect(posX, posY, 15, 15);
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}