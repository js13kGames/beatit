'use strict';

/* eslint-disable no-unused-vars */

var canvas = document.getElementById('game');
canvas.style.backgroundColor = 'antiquewhite';
canvas.style.border = '10px solid #0a0a0a';
var ctx = canvas.getContext('2d');
ctx.save();

var mainHero = new Image();
mainHero.src = 'hero_sprite.png';

var enemiesSprite = new Image();
enemiesSprite.src = 'food_sprite.png';

var score = 0,
	enemiesNumber = 10,
	level = 1,
	hero = {
		heroSliceX: 0,
		heroSliceY: 0,
		heroPositionX: 515,
		heroPositionY: 650,
		positionX: 515,
		positionY: 650,
		speed: 10
	},
	livebar = {
		live: 100,
		positionX: 500,
		positionY: 750
	},
	enemies = [],
	speedTick = 0;


function init(){
	/*
		TODO:
		- licznik punktów (+ zapis w localstorage)
		- ekran startowy gry (+ komiks przedstawiający fabułę)
	*/
	setup();
}

function setup() {
	drawTextData();
	createEnemies(enemiesNumber);
	canvas.addEventListener('click',makeAction, false);
	gameLoop ();
}

function gameLoop () {

	window.requestAnimationFrame(gameLoop);
	// ctx.clear ()
	drawHero();
	drawEnemy();
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
	speedTick += 1;

	if((speedTick % 10 === 0) || (speedTick === 0)){

		ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100);
		//!move clear and Draw below if statement
		ctx.drawImage(mainHero, hero.heroSliceX, hero.heroSliceY, 62, 100, hero.heroPositionX, hero.heroPositionY, 62,100);
		
		hero.heroSliceX+=62;
		if(hero.heroSliceX>=mainHero.width) {
			hero.heroSliceX = 0;
		}

		speedTick = 1;
	}
}

function makeAction(event){
	speedTick = -500;
	ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100);
	ctx.drawImage(mainHero, 124, hero.heroSliceY, 62, 100, hero.heroPositionX, hero.heroPositionY, 62,100);
	//correct the cords, so clicked cords was the middle of head
	var x = event.clientX - canvas.offsetLeft - 35;
	var y = event.clientY - canvas.offsetTop - 35;
	ctx.clearRect(515,650,62,100);
	/*
		TODO:
		- użyć bezierCurveTo zamiast line
	*/
	ctx.beginPath();
	ctx.moveTo(530, 750);
	ctx.lineWidth = 1;
	ctx.lineTo(x + 16, y + 100);
	ctx.strokeStyle = '#020601';
	ctx.stroke();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.moveTo(545, 750);
	ctx.lineTo(x + 31, y + 100);
	ctx.strokeStyle = '#020601';
	ctx.stroke();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.moveTo(531, 750);
	ctx.lineTo(x + 16, y + 100);
	ctx.lineTo(x + 30, y+ 100);
	ctx.lineTo(544, 750);
	ctx.lineTo(531,750);
	ctx.closePath();
	ctx.fillStyle='#285a10';
	ctx.fill();
	
	
	hero.heroPositionX = x;
	hero.heroPositionY = y;

	checkColision(hero.heroPositionX + 30, hero.heroPositionY + 30);
	
	setTimeout(function(){
		ctx.clearRect(0, 0, canvas.width, livebar.positionY);
		// ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100);
		hero.heroPositionX = hero.positionX;
		hero.heroPositionY = hero.positionY;
	},500);
}

function checkColision(heroHeadPositionX, heroHeadPositionY){
	ctx.fillStyle = 'red';
	ctx.fillRect(heroHeadPositionX, heroHeadPositionY, 5, 5);
	enemies.forEach(function(enemy, index) {
		if(
			((enemy.posX >= heroHeadPositionX - 20) && (enemy.posX <= heroHeadPositionX + 20)) &&
			((enemy.posY >= heroHeadPositionY - 20) && (enemy.posY <= heroHeadPositionY + 20)) 
		) { 
			enemies.splice(index, 1);
			score = Math.round(score + 1 * enemy.speed);
			ctx.clearRect(livebar.positionX - 70, livebar.positionY, 500, 40);
			drawTextData();
			createEnemy();
		}
	});
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

function createEnemy() {
	/*
		TODO:
		- przeciwnicy nadlatują z lewej lub prawej, na losowej wysokości z różną prędkością - done
		- grafika dla przeciwników
		- dwa rodzaje przeciwników: mięsne i warzywne. Mięsne dodają punktów i życia, warzywne odbierają życie.
	*/
	var enemy = {
		speed: 1,
		speedDirect: 1,
		direction: 1,
		posX: 0,
		posY: 0,
		vMin: 0.5,
		vMax: 4,
		imageStage: 1
	};

	enemy.direction = getRandomInt(0,2)-1;
	if(enemy.direction === 0) enemy.direction = -1;
	enemy.speed = getRandomInt(enemy.vMin,enemy.vMax);
	enemy.speedDirect = enemy.speed * enemy.direction;
	if(enemy.direction == -1){
		enemy.posX = getRandomInt(canvas.width,canvas.width+100);
	} else {
		enemy.posX = getRandomInt(-100,0);
	}
	enemy.posY = getRandomInt(20, canvas.height - 200);
	enemy.imageStage = getRandomInt(0,4);

	enemies.push(enemy);
}

function createEnemies(enemiesNumber){
	for (var i = 0; i < enemiesNumber; i++) {
		createEnemy();
	}
}

function drawEnemy() {
	enemies.forEach(function(enemy){
		ctx.clearRect(enemy.posX, enemy.posY, 15, 15);
		ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		ctx.drawImage(enemiesSprite, enemy.imageStage * 15, 0 , 15, 15, enemy.posX, enemy.posY, 15, 15);
		if(enemy.posX > canvas.width + 115) {
			// if true - remove from array and genrate new one
			enemy.posX = 0;
			ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		}
		if(enemy.posX < -115) {
			enemy.posX = canvas.width + 100;
			ctx.clearRect(enemy.posX - 15 * enemy.direction, enemy.posY, 15, 15);
		}
		enemy.posX += enemy.speedDirect;
	});
}


function drawLiveBar(livePercent) {
	ctx.fillStyle = '#000099';
	ctx.fillRect(livebar.positionX+livePercent,livebar.positionY,1,20);
}

// Helpers
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
