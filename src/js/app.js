'use strict';

var canvas = document.getElementById('game');
canvas.style.backgroundColor = 'antiquewhite';
canvas.style.border = '10px solid #0a0a0a';
var ctx = canvas.getContext('2d');
ctx.save();

var mainHero = new Image();
mainHero.src = 'hero_sprite.png';

var intervalRef,
	score = 0,
	enemiesNumber = 10,
	level = 1,
	hero = {
		heroSliceX: 0,
		heroSliceY: 0,
		heroPositionX: 515,
		heroPositionY: 650,
		speed: 10
	},
	livebar = {
		live: 100,
		positionX: 500,
		positionY: 750
	},
	enemies = [];


//eslint-disable-next-line no-unused-vars
function init(){
	/*
		TODO:
		- licznik punktów (+ zapis w localstorage)
		- ekran startowy gry (+ komiks przedstawiający fabułę)
	*/
	setup();
}

function setup() {
	drawHero();
	startHeroAnimation();
	drawTextData();
	createEnemies(enemiesNumber);
	canvas.addEventListener('click',makeAction, false);
	setInterval('drawEnemy()',50);
}

function makeAction(event){
	var x = event.clientX - canvas.offsetLeft;
	var y = event.clientY - canvas.offsetTop;
	hero.heroPositionX = x;
	hero.heroPositionY = y;
}

function drawHero(){
	ctx.save();
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

	ctx.drawImage(mainHero, hero.heroSliceX, hero.heroSliceY, 62, 100, hero.heroPositionX, hero.heroPositionY, 62,100);

	hero.heroSliceX+=62;
	if(hero.heroSliceX>=mainHero.width) {
		hero.heroSliceX = 0;
	}
	ctx.restore();
}

function drawTextData() {
	ctx.fillStyle = '#000099';
	ctx.font = '20px monospace';
	ctx.fillText('Score: '+score,livebar.positionX + 130,livebar.positionY + 15);

	ctx.font = '20px monospace';
	ctx.fillText('Live:',livebar.positionX - 70,livebar.positionY + 15);
	if( livebar.live > 0 ){
		for(var j = 1; j <= livebar.live; j++) {
			drawLiveBar(j);
		}
	}
}

function createEnemy(positionX, positionY) {
	/*
		TODO:
		- przeciwnicy nadlatują z lewej lub prawej, na losowej wysokości z różną prędkością
		- grafika dla przeciwników
		- dwa rodzaje przeciwników: mięsne i warzywne. Mięsne dodają punktów i życia, warzywne odbierają życie.
	*/
	var enemy = {
		speed: 1,
		direction: 1,
		posX: 0,
		posY: 0,
		vMin: 1,
		vMax: 10
	};

	enemy.direction = getRandomInt(0,2)-1;
	enemy.speed = getRandomInt(enemy.vMin,enemy.vMax)*enemy.direction;
	if(enemy.direction == -1){
		enemy.posX = getRandomInt(canvas.width,canvas.width+100);
	} else {
		enemy.posX = getRandomInt(-100,0);
	}
	positionX = enemy.posX;
	enemy.posY = positionY;

	// ctx.clearRect(enemy.posX - 15, enemy.posY, 15, 15);
	// ctx.fillStyle = '#a1a1a1';
	// ctx.fillRect(enemy.posX, enemy.posY, 15, 15);
	// if(enemy.posX >= canvas.width) {
	// 	enemy.posX = 0;
	// 	ctx.clearRect(enemy.posX -15, enemy.posY, 15, 15);
	// }

	enemies.push(enemy);
	// setTimeout('drawEnemy(enemy.posX, enemy.posY)',10);
}

function createEnemies(enemiesNumber){
	for (var i = 0; i < enemiesNumber; i++) {
		var positionX = 0,
			positionY = getRandomInt(20, canvas.height - 200);
		createEnemy(positionX,positionY);
	}
}

function drawEnemy() {
	// ctx.clearRect(0,0,canvas.width, canvas.height - 180);
	enemies.forEach(function(enemy){
		ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		ctx.fillStyle = '#a1a1a1';
		ctx.fillRect(enemy.posX, enemy.posY, 15, 15);
		if(enemy.posX > canvas.width + 115) {
			// if true - remove from array and genrate new one
			enemy.posX = 0;
			ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		}
		if(enemy.posX < -115) {
			enemy.posX = canvas.width + 100;
			ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		}
		enemy.posX += enemy.speed;
	});
}


function startHeroAnimation() {
	if(!intervalRef) {
		setInterval('drawHero() ',300);
	}
}

function drawLiveBar(livePercent) {
	ctx.fillStyle = '#000099';
	ctx.fillRect(livebar.positionX+livePercent,livebar.positionY,1,20);
}

// Helpers
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
