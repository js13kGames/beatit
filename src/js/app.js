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
- split hero image into parts
*/

var score = 0,
	enemiesNumber = 20,
	level = 1,
	hero = {
		heroSliceX: 0,
		heroSliceY: 0,
		heroPositionX: canvas.width / 2 + 3,
		heroPositionY: canvas.height - 150,
		positionX: canvas.width / 2 + 3,
		positionY: canvas.height - 150,
		moveToX: canvas.width / 2 + 3,
		moveToY: canvas.height - 150,
		speed: 10,
		animationDelay: 50,
		animationState: 'goingThere',
		actionListener: null,
	},
	livebar = {
		live: 100,
		speed: 0.03,
		positionX: 100,
		positionY: 20,
		colors: ['#b40101', '#99003d', '#99008b', '#610099', '#000099'],
	},
	enemies = [],
	speedTick = 0,
	pointsText = { mark: '+', points: 0, posX: 0, posY: 0 };

var mainAnimationFrame,
	stop = false,
	frameCount = 0,
	results = document.querySelector('#fps'),
	fps,
	fpsInterval,
	startTime,
	now,
	then,
	elapsed;

function init() {
	/*
	TODO:
	- licznik punktów (+ zapis w localstorage) - DONE
	- ekran startowy gry (+ komiks przedstawiający fabułę)
	*/
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.style.backgroundColor = '#61c46a';

	drawLogo();
	drawButtons();
}

function drawLogo() {
	ctx.save();
	ctx.fillStyle = '#ffffff';
	ctx.font = 'bold 140px Arial';
	ctx.rotate(-Math.PI / 10);
	ctx.fillText('B', canvas.width / 2 - 250, canvas.height / 2);
	ctx.restore();
	ctx.fillStyle = '#09437f';
	ctx.font = 'bold 100px Arial';
	ctx.fillText('Eat', canvas.width / 2 - 85, canvas.height / 2 - 130);
	ctx.fillStyle = '#007108';
	ctx.font = 'bold 140px Arial';
	ctx.fillText('It', canvas.width / 2 + 75, canvas.height / 2 - 115);
}

function drawButtons() {
	var startButton = {
		x: canvas.width / 2 - 120,
		y: canvas.height / 2 - 25,
		width: 240,
		height: 50,
	};
	generateButton(startButton, 'START GAME', -80, 8, 'big');

	var playInstructionsButton = {
		x: canvas.width / 2 - 100,
		y: canvas.height / 2 + 60,
		width: 200,
		height: 50,
	};
	generateButton(playInstructionsButton, 'SHOW INSTRUCTIONS', -92, 90, 'small');

	var showHighscoresButton = {
		x: canvas.width / 2 - 100,
		y: canvas.height / 2 + 120,
		width: 200,
		height: 50,
	};
	generateButton(showHighscoresButton, 'HIGHSCORES', -55, 150, 'small');

	var aboutButton = {
		x: canvas.width / 2 - 100,
		y: canvas.height / 2 + 180,
		width: 200,
		height: 50,
	};
	generateButton(aboutButton, 'ABOUT', -30, 210, 'small');

	canvas.addEventListener(
		'click',
		function _func() {
			var mousePos = getMousePos(canvas, event);
			if (isInside(mousePos, startButton)) {
				canvas.removeEventListener('click', _func, false);
				startGame();
			}
			if (isInside(mousePos, showHighscoresButton)) {
				canvas.removeEventListener('click', _func, false);
				drawHighscores(getHighScores());
			}
		},
		false
	);
}

function generateButton(btnObject, btnText, textOffsetX, textOffsetY, btnStyle) {
	var btn = btnObject;

	ctx.fillStyle = '#61c46a';
	ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
	if (btnStyle === 'small') {
		ctx.lineWidth = 2;
		ctx.font = '20px monospace';
	} else {
		ctx.lineWidth = 4;
		ctx.font = '30px monospace';
	}
	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);

	ctx.fillStyle = '#ffffff';
	ctx.fillText(btnText, canvas.width / 2 + textOffsetX, canvas.height / 2 + textOffsetY);
}

function getHighScores() {
	var highscores = [];
	if (localStorage.getItem('scores')) highscores = localStorage.getItem('scores');
	return highscores;
}

function drawHighscores(scores) {
	ctx.fillStyle = '#61c46a';
	ctx.strokeStyle = '#000000';
	ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
	ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
	//close button
	var closeButton = {
		x: canvas.width - 80,
		y: 75,
		width: 50,
		height: 50,
	};
	ctx.moveTo(canvas.width - 75, 75);
	ctx.lineTo(canvas.width - 90, 90);
	ctx.moveTo(canvas.width - 90, 75);
	ctx.lineTo(canvas.width - 75, 90);
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	canvas.addEventListener('click', function _func() {
		var mousePos = getMousePos(canvas, event);
		if (isInside(mousePos, closeButton)) {
			canvas.removeEventListener('click', _func, false);
			init();
		}
	});

	ctx.fillStyle = '#ffffff';
	ctx.font = '30px monospace';
	ctx.fillText('Highscores:', canvas.width / 2 - 80, 100);
	var sorterScores = scores.split(',');
	sorterScores.sort(function(a, b) {
		return b - a;
	});
	sorterScores.forEach(function(score, index) {
		if (index < 15) {
			ctx.fillText(index + 1 + '. ' + score, 100, 150 + 30 * index);
		} else if (index < 30) {
			ctx.fillText(index + 1 + '. ' + score, 400, 150 + 30 * (index - 15));
		}
	});
}

function playInstructions() {
	/* 
		TODO
	*/
}

function startGame() {
	canvas.style.backgroundColor = 'antiquewhite';
	createEnemies(enemiesNumber, false);
	canvas.addEventListener('click', makeAction, false);
	startAnimating(60);
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawHero();
	drawEnemies();
	drawTextData();
}

function drawHero() {
	/*
		TODO:
		-- zasięg postaci - jak daleko może chwycić wrogów (zaznaczyć na mapie okręgiem)
		-- szybkość postaci - jak szybko głowa postaci dosięgnie
	*/
	speedTick += 1;

	ctx.clearRect(hero.heroPositionX, hero.heroPositionY, 62, 100);
	ctx.drawImage(mainHero, hero.heroSliceX, hero.heroSliceY, 62, 100, hero.heroPositionX, hero.heroPositionY, 62, 100);

	if (speedTick % 10 === 0 || speedTick === 0) {
		hero.heroSliceX += 62;
		if (hero.heroSliceX >= mainHero.width) {
			hero.heroSliceX = 0;
		}

		speedTick = 1;
	}

	drawHeroBeam();

	//pot
	ctx.beginPath();
	ctx.moveTo(hero.positionX - 50, hero.positionY + 100);
	ctx.lineTo(hero.positionX + 111, hero.positionY + 100);
	ctx.lineTo(hero.positionX + 101, hero.positionY + 110);
	ctx.lineTo(hero.positionX + 90, canvas.height);
	ctx.lineTo(hero.positionX - 29, canvas.height);
	ctx.lineTo(hero.positionX - 39, hero.positionY + 110);
	ctx.closePath();
	ctx.fillStyle = '#7c2c04';
	ctx.fill();
}

function drawHeroBeam() {
	//beam
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(hero.positionX + 16, hero.positionY + 100);
	if (hero.moveToY < hero.positionY) {
		ctx.bezierCurveTo(
			hero.positionX + 16,
			hero.positionY,
			hero.heroPositionX + 16,
			hero.heroPositionY + 200,
			hero.heroPositionX + 16,
			hero.heroPositionY + 100
		);
	}
	ctx.lineTo(hero.heroPositionX + 31, hero.heroPositionY + 100);
	if (hero.moveToY < hero.positionY) {
		ctx.bezierCurveTo(
			hero.heroPositionX + 31,
			hero.heroPositionY + 200,
			hero.positionX + 31,
			hero.positionY,
			hero.positionX + 31,
			hero.positionY + 100
		);
	}
	ctx.lineTo(hero.positionX + 16, hero.positionY + 100);
	ctx.strokeStyle = '#020601';
	ctx.stroke();
	ctx.closePath();
	ctx.fillStyle = '#285a10';
	ctx.fill();
}

function makeAction(event) {
	var mousePos = getMousePos(canvas, event);
	//correct the cords (45 px), so clicked cords was the middle of head
	hero.moveToX = mousePos.x - 45;
	hero.moveToY = mousePos.y - 45;

	var goingThereSpeedMultipler = 3;
	var goingBackSpeedMultipler = 3;
	var framesToStayThere = 20;
	var makeActionframe;
	var actionJumpX = (hero.moveToX - hero.heroPositionX) / hero.speed;
	var actionJumpY = (hero.moveToY - hero.heroPositionY) / hero.speed;
	hero.animationState = 'goingThere';

	goBack();
	function goBack() {
		canvas.removeEventListener('click', makeAction, false);
		makeActionframe = requestAnimationFrame(goBack);
		/* 
			TODO:
			- hero image - turn head to the attack direction
		*/
		hero.heroSliceX = 124;
		drawHeroBeam();
		if (hero.animationState == 'goingThere') {
			if (hero.heroPositionX == hero.moveToX) {
				hero.animationState = 'beenThere';
			} else if (Math.abs(hero.heroPositionX - hero.moveToX) > Math.abs(actionJumpX * goingThereSpeedMultipler)) {
				hero.heroPositionX += actionJumpX * goingThereSpeedMultipler;
				hero.heroPositionY += actionJumpY * goingThereSpeedMultipler;
			} else {
				hero.heroPositionX = hero.moveToX;
				hero.heroPositionY = hero.moveToY;
			}
		} else if (hero.animationState == 'beenThere') {
			if (framesToStayThere >= 0) {
				pointsText = checkColision(hero.heroPositionX, hero.heroPositionY);
				if (pointsText.points !== 0) {
					ctx.font = '16px monospace';
					if (pointsText.mark === '-') {
						ctx.fillStyle = '#990000';
						ctx.fillText('Live ' + pointsText.mark + pointsText.points, pointsText.posX, pointsText.posY);
					} else {
						ctx.fillStyle = '#009900';
						ctx.fillText(pointsText.mark + pointsText.points, pointsText.posX, pointsText.posY);
					}
				}
				framesToStayThere--;
			} else {
				pointsText = { mark: '+', points: 0, posX: 0, posY: 0 };
				hero.animationState = 'goingBack';
			}
		} else if (hero.animationState == 'goingBack') {
			hero.heroSliceX = 0;
			if (hero.heroPositionX == hero.positionX) {
				hero.animationState = 'back';
			} else if (
				Math.abs(hero.heroPositionX - hero.positionX) > Math.abs(actionJumpX * goingThereSpeedMultipler)
			) {
				hero.heroPositionX -= actionJumpX * goingBackSpeedMultipler;
				hero.heroPositionY -= actionJumpY * goingBackSpeedMultipler;
			} else {
				hero.heroPositionX = hero.positionX;
				hero.heroPositionY = hero.positiony;
			}
		} else {
			hero.heroPositionX = hero.positionX;
			hero.heroPositionY = hero.positionY;
			hero.moveToX = hero.positionX;
			hero.moveToY = hero.positionY;
			cancelAnimationFrame(makeActionframe);
			canvas.addEventListener('click', makeAction, false);
			hero.animationDelay = 50;
		}
	}
}

function checkColision(heroHeadPositionX, heroHeadPositionY) {
	var scoreBefore = score;
	enemies.forEach(function(enemy, index) {
		if (
			enemy.posX >= heroHeadPositionX - 10 &&
			enemy.posX <= heroHeadPositionX + 50 &&
			(enemy.posY >= heroHeadPositionY && enemy.posY <= heroHeadPositionY + 50)
		) {
			var scoreTextX = enemy.posX;
			var scoreTextY = enemy.posY - 50;
			enemies.splice(index, 1);
			if (enemy.imageStage === 14) {
				createEnemies(200, false);
				score += 100;
			}
			if (enemy.imageStage <= 9 || enemy.imageStage === 14) {
				//if no vegetable
				score = Math.round(score + 1 * enemy.speed); //why 1 * ??
				//show single score
				pointsText = { mark: '+', points: score - scoreBefore, posX: scoreTextX, posY: scoreTextY };

				if (livebar.live + 7 * enemy.speed >= 100) {
					livebar.live = 100;
				} else {
					livebar.live += 7 * enemy.speed;
				}
			} else {
				//if vegetable
				livebar.live -= 7 * enemy.speed;
				pointsText = { mark: '-', points: 7 * enemy.speed, posX: scoreTextX, posY: scoreTextY };
			}

			createEnemy(false);
		}
	});
	level = Math.floor(score / 100) + 1;
	return pointsText;
}

function drawTextData() {
	ctx.fillStyle = '#000099';
	ctx.font = '20px monospace';
	ctx.fillText('Level: ' + level, canvas.width - 150, livebar.positionY + 15);

	ctx.fillStyle = '#000099';
	ctx.font = '20px monospace';
	ctx.fillText('Score: ' + score, livebar.positionX + 130, livebar.positionY + 15);

	ctx.font = '20px monospace';
	ctx.fillText('Live:', livebar.positionX - 70, livebar.positionY + 15);
	if (livebar.live >= 0) {
		livebar.live -= livebar.speed * level;
		canvas.style.backgroundColor = 'antiquewhite';
		if (livebar.live < 35) {
			canvas.style.backgroundColor = '#ffd4d4';
		}
		if (livebar.live < 15) {
			canvas.style.backgroundColor = '#fb9b9b';
		}

		for (var j = 1; j <= livebar.live; j++) {
			drawLiveBar(j);
		}
	} else {
		//You loose!
		var scores = getHighScores();
		scores += ',' + score.toString();
		localStorage.setItem('scores', scores);

		canvas.removeEventListener('click', makeAction, false);
		cancelAnimationFrame(mainAnimationFrame);
		ctx.fillStyle = '#AA0505';
		ctx.font = '60px monospace';
		ctx.fillText('GAME OVER', canvas.height / 2, canvas.width / 2 - 300);
	}
}

function createEnemy(bonusType) {
	var enemy = {
		speed: 1,
		speedDirect: 1,
		direction: 1,
		posX: 0,
		posY: 0,
		vMin: 0.5,
		vMax: 4,
		imageStage: 1,
		bonusType: bonusType,
	};

	enemy.direction = getRandomInt(0, 2) - 1;
	if (enemy.direction === 0) enemy.direction = -1;
	enemy.speed = getRandomInt(enemy.vMin, enemy.vMax);
	enemy.speedDirect = enemy.speed * enemy.direction;
	if (enemy.direction == -1) {
		enemy.posX = getRandomInt(canvas.width, canvas.width + 100);
	} else {
		enemy.posX = getRandomInt(-100, 0);
	}
	enemy.posY = getRandomInt(100, canvas.height - 200);

	//create bonus enemy
	if (enemy.bonusType === true) {
		enemy.imageStage = 14;
	} else {
		enemy.imageStage = getRandomInt(0, 13);
	}

	enemies.push(enemy);
}

function createEnemies(enemiesNumber, bonusType) {
	for (var i = 0; i < enemiesNumber; i++) {
		createEnemy(bonusType);
	}
}
function drawEnemies() {
	enemies.forEach(function(enemy, index) {
		ctx.drawImage(enemiesSprite, enemy.imageStage * 15, 0, 15, 15, enemy.posX, enemy.posY, 15, 15);
		enemy.posX += enemy.speedDirect;
		if (enemy.posX > canvas.width + 15 || enemy.posX < -15) {
			enemies.splice(index, 1);
			if (enemy.imageStage !== 14 && enemy.bonusType === false && enemies.length <= 20) {
				if (getRandomInt(1, 80) === 1) {
					createEnemy(true);
				} else {
					createEnemy(false);
				}
			}
		}
	});
}

function drawLiveBar(livePercent) {
	ctx.strokeStyle = '#000099';
	ctx.strokeRect(livebar.positionX, livebar.positionY, 100, 20);

	ctx.fillStyle = livebar.colors[Math.round(livebar.live / 25)];
	ctx.fillRect(livebar.positionX + livePercent, livebar.positionY, 1, 20);
}

// Helpers
function startAnimating(fps) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
	animate();
}

function animate() {
	mainAnimationFrame = window.requestAnimationFrame(animate);
	now = Date.now();
	elapsed = now - then;

	if (elapsed > fpsInterval) {
		then = now - elapsed % fpsInterval;
		gameLoop();
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}

function isInside(pos, rect) {
	return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
}
