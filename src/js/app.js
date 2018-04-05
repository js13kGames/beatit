'use strict';

/* eslint-disable no-unused-vars */

var canvas = document.getElementById('game');
canvas.style.border = '10px solid #0a0a0a';
var ctx = canvas.getContext('2d');
ctx.save();

var mainHero = new Image();
mainHero.src = 'hero_sprite.png';

var enemiesSprite = new Image();
enemiesSprite.src = 'food_sprite.png';

/*
TODO:
- change every Y position to canvas.height - ...
*/
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
	moveToX: 515,
	moveToY: 650, 
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
	canvas.style.backgroundColor = '#61c46a';

	var startButton = {
		x:canvas.width / 2 - 100,
		y:canvas.height / 2 - 25,
		width:200,
		height:50
	};

	ctx.fillStyle = '#61c46a';
	ctx.fillRect(startButton.x, startButton.y , startButton.width, startButton.height);
	ctx.lineWidth = 4;
	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(startButton.x, startButton.y , startButton.width, startButton.height);

	ctx.fillStyle = '#ffffff';
	ctx.font = '30px monospace';
	ctx.fillText('START GAME',canvas.width / 2 - 80, canvas.height / 2 + 8);

	canvas.addEventListener('click', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		if (isInside(mousePos,startButton)) {
			startGame();
		}
	}, false);
}

function playTutorial() {
	/* 
		TODO
	*/
}

function startGame(){
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.style.backgroundColor = 'antiquewhite';
	setup();
}

function setup() {
	drawTextData();
	createEnemies(enemiesNumber);
	canvas.addEventListener('click', makeAction, true);
	gameLoop ();
}

function gameLoop () {
	
	window.requestAnimationFrame(gameLoop);

	ctx.clearRect(0, 0, canvas.width, livebar.positionY);
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

	ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100);
	ctx.drawImage(mainHero, hero.heroSliceX, hero.heroSliceY, 62, 100, hero.heroPositionX, hero.heroPositionY, 62,100);

	
	if((speedTick % 10 === 0) || (speedTick === 0)){
		
		hero.heroSliceX+=62;
		if(hero.heroSliceX>=mainHero.width) {
			hero.heroSliceX = 0;
		}

		speedTick = 1;
	}

	/*
		TODO:
		- użyć bezierCurveTo zamiast line
	*/
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(hero.positionX + 15, hero.positionY + 100);
	// ctx.lineTo(hero.moveToX + 16,  hero.moveToY + 100);
	ctx.bezierCurveTo(hero.positionX + 15, hero.positionY + 100, hero.moveToX + 16,  hero.moveToY + 200, hero.moveToX + 16, hero.moveToY + 100);
	ctx.moveTo(hero.positionX + 30, hero.positionY + 100);
	ctx.bezierCurveTo(hero.positionX + 30, hero.positionY + 100, hero.moveToX + 31,  hero.moveToY + 200, hero.moveToX + 31, hero.moveToY + 100);
	// ctx.lineTo(hero.moveToX + 31, hero.moveToY + 100);
	ctx.strokeStyle = '#020601';
	ctx.stroke();
	ctx.closePath();
	
	// ctx.beginPath();
	// ctx.moveTo(hero.positionX + 16, hero.positionY + 100);
	// ctx.lineTo(hero.moveToX + 16, hero.moveToY + 100);
	// ctx.lineTo(hero.moveToX + 30, hero.moveToY + 100);
	// ctx.lineTo(hero.positionX + 29, hero.positionY + 100);
	// ctx.lineTo(hero.positionX + 16,hero.positionY + 100);
	// ctx.closePath();
	// ctx.fillStyle='#285a10';
	// ctx.fill();
}

function makeAction(event){
	//correct the cords, so clicked cords was the middle of head
	hero.moveToX = event.clientX - canvas.offsetLeft - 45;
	hero.moveToY = event.clientY - canvas.offsetTop + 45;

	hero.heroPositionX = hero.moveToX;
	hero.heroPositionY = hero.moveToY;

	checkColision(hero.heroPositionX + 30, hero.heroPositionY + 30);
	
	setTimeout(function(){
		hero.heroPositionX = hero.positionX;
		hero.heroPositionY = hero.positionY;
		hero.moveToX = hero.positionX;
		hero.moveToY = hero.positionY;
	},500);
}

function checkColision(heroHeadPositionX, heroHeadPositionY){
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
	enemy.imageStage = getRandomInt(0,8);

	enemies.push(enemy);
}

function createEnemies(enemiesNumber){
	for (var i = 0; i < enemiesNumber; i++) {
		createEnemy();
	}
}

function drawEnemy() {
	enemies.forEach(function(enemy, index){
		ctx.drawImage(enemiesSprite, enemy.imageStage * 15, 0 , 15, 15, enemy.posX, enemy.posY, 15, 15);
		enemy.posX += enemy.speedDirect;
		if((enemy.posX > canvas.width + 15)||(enemy.posX < -15)) {
			enemies.splice(index, 1);
			createEnemy();
		}
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

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}