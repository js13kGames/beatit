var canvas = document.getElementById('game');
canvas.style.backgroundColor = 'antiquewhite';
var ctx = canvas.getContext('2d');
var mainHero = new Image();
mainHero.addEventListener('load', setup, false);
mainHero.src = 'hero_sprite.png';
var intervalRef, 
	enemiesNumber = 10,
	heroSliceX = 0,
	heroSliceY = 0,
	heroPositionX = 522,
	heroPositionY = 650;

function setup() {
	/*
		TODO:
		- licznik punktów (+ zapis w localstorage)
		- ekran startowy gry (+ komiks przedstawiający fabułę)
	*/

	drawHero();
	startHeroAnimation();
	drawEnemies(enemiesNumber);
}

function drawHero(){
	/*
		TODO: 
		- akcje bohatera:
		-- kliknięcie w obszar na mapie powoduje przemieszczenie się głowy bohatera w kliknięte miejsce. Jeśli głowa postaci i wróg znajdą się w tym samym czasie w miejscu kliknięcia, wtedy dostaje się punkty.
		- poziom bohatera. Poziom zwiększa się na podstawie punktów. Im większy poziom tym większy: 
		-- zasięg postaci - jak daleko może chwycić wrogów (zaznaczyć na mapie okręgiem)
		-- szybkość postaci - jak szybko głowa postaci dosięgnie 
		- możliwość śmierci bohatera - roślina usycha. Roślina potrzebuję jedzenia żeby nie uschnąć. W miarę zwiększenia poziomu roślina potrzebuje więcej jedzenia i szybciej usycha.
		- poziom życia bohatera (poziom wyschnięcia rośliny) - jako symboliczna "doniczka" w której zmniejsza się np. poziom wody.
	*/

	ctx.clearRect(515,650,100,100);

	ctx.drawImage(mainHero, heroSliceX, heroSliceY, 76, 100, heroPositionX, heroPositionY, 76,100);

	heroSliceX+=76;
	heroPositionX = 515;
	if(heroSliceX>=mainHero.width) {
		heroSliceX = 0;
		heroPositionX = 522;
	}
}

function drawEnemies(enemiesNumber) {
	/*
		TODO:
		- przeciwnicy nadlatują z lewej lub prawej, na losowej wysokości z różną prędkością
		- grafika dla przeciwników
		- dwa rodzaje przeciwników: mięsne i warzywne. Mięsne dodają punktów i życia, warzywne odbierają życie.
	*/

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

function startHeroAnimation() {
	if(!intervalRef) setInterval('drawHero()',500);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}