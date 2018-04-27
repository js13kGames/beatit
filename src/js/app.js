'use strict';



var canvas = document.getElementById('game');
canvas.style.border = '10px solid #0a0a0a';
var ctx = canvas.getContext('2d');
ctx.save();

var mainHero = new Image();
mainHero.src = 'hero_sprite.png';

var enemiesSprite = new Image();
enemiesSprite.src = 'food_sprite.png';

var kitchenBg = new Image();
kitchenBg.src = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYxNkNDRDQ3NEE1OTExRTg4MEIzQzkwNTg0NjAyMDE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYxNkNDRDQ4NEE1OTExRTg4MEIzQzkwNTg0NjAyMDE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjE2Q0NENDU0QTU5MTFFODgwQjNDOTA1ODQ2MDIwMTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjE2Q0NENDY0QTU5MTFFODgwQjNDOTA1ODQ2MDIwMTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQ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';

var score = 0,
	enemiesNumber = 20,
	level = 1,
	gameOver = false,
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
		potColor: '#7c2c04'
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
	fpsInterval,
	startTime,
	now,
	then,
	elapsed;

	
function init() {
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.style.backgroundColor = '#61c46a';
	ctx.restore();
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
			if (isInside(mousePos, playInstructionsButton)) {
				canvas.removeEventListener('click', _func, false);
				playInstructions();
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
	if (scores.length > 0) {
		var sortedScores = scores.split(',');
		sortedScores.sort(function(a, b) {
			return b - a;
		});
		sortedScores.forEach(function(score, index) {
			if (index < 15) {
				ctx.fillText(index + 1 + '. ' + score, 100, 150 + 30 * index);
			} else if (index < 30) {
				ctx.fillText(index + 1 + '. ' + score, 400, 150 + 30 * (index - 15));
			}
		});
	}
}

function playInstructions() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
	ctx.font = '24px monospace';
	var textPositionX = 150;
	ctx.fillText('You are a little hungry plant.', textPositionX, 100);
	ctx.fillText('Your goal is to satisfy your hunger!', textPositionX, 150);
	ctx.font = '20px monospace';
	var textPositionY = 200;
	ctx.fillText('Rules:', textPositionX, (textPositionY += 30));
	ctx.fillText('1. Eat meat!', textPositionX, (textPositionY += 30));
	ctx.fillText('2. Don\'t eat plants! (that\'s a cannibalism)', textPositionX, (textPositionY += 30));
	ctx.fillText('3. If you don\'t eat you\'re gonna wither until you die!', textPositionX, (textPositionY += 30));
	ctx.fillText('4. Look for a pig. Pig is good. Pig is yummy.', textPositionX, (textPositionY += 30));

}

function startGame() {
	createEnemies(enemiesNumber);
	canvas.addEventListener('click', makeAction, false);
	startAnimating(60);
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(kitchenBg,0, 0, 400, 311, 0, 0, canvas.width, canvas.height);
	drawEnemies();
	drawHero();
	drawTextData();
}

function drawHero() {

	speedTick += 1;

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
	ctx.fillStyle = hero.potColor;
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
	ctx.strokeStyle = '#285a10';
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
	ctx.strokeStyle = '#285a10';
	ctx.lineTo(hero.positionX + 16, hero.positionY + 100);
	ctx.strokeStyle = '#020601';
	ctx.stroke();
	ctx.closePath();
	ctx.fillStyle = '#285a10';
	ctx.fill();
}

function makeAction(event) {
	if (!gameOver) {
		var mousePos = getMousePos(canvas, event);
		if (mousePos.y < canvas.height - 100) {
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
		}
	}
	function goBack() {
		canvas.removeEventListener('click', makeAction, false);
		makeActionframe = requestAnimationFrame(goBack);
		/* 
			TODO:
			- hero image - turn head to the attack direction
			*/
		hero.heroSliceX = 62;
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
		} else if (hero.animationState == 'beenThere' && !gameOver) {
			if (framesToStayThere >= 0) {
				pointsText = checkColision(hero.heroPositionX, hero.heroPositionY);
				if (pointsText.points !== 0) {
					ctx.font = '16px monospace';
					if (pointsText.mark === '-') {
						ctx.save();
						ctx.fillStyle = '#990000';
						ctx.fillText('Live ' + pointsText.mark + pointsText.points, pointsText.posX, pointsText.posY);
						ctx.restore();
					} else {
						ctx.save();
						ctx.fillStyle = '#009900';
						ctx.fillText(pointsText.mark + pointsText.points, pointsText.posX, pointsText.posY);
						ctx.restore();
					}
				}
				framesToStayThere--;
			} else {
				pointsText = { mark: '+', points: 0, posX: 0, posY: 0 };
				hero.animationState = 'goingBack';
			}
		} else if (hero.animationState == 'goingBack' && !gameOver) {
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
				createEnemies(200);
				score += 100;
			}
			if (enemy.imageStage <= 9 || enemy.imageStage === 14) {
				//if no vegetable
				score = Math.round(score + 1 * enemy.speed);
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
	ctx.save();
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
		if (livebar.live < 35) {
			ctx.save();
			ctx.fillStyle = 'rgba(242, 10, 10, 0.1)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.restore();
		}
		if (livebar.live < 15) {
			ctx.save();
			ctx.fillStyle = 'rgba(242, 10, 10, 0.3)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.restore();
		}

		for (var j = 1; j <= livebar.live; j++) {
			drawLiveBar(j);
		}
	} else {
		//You loose!
		cancelAnimationFrame(mainAnimationFrame);
		canvas.removeEventListener('click', makeAction, false);

		var scores = getHighScores();
		if (scores.length > 0) {
			scores += ',' + score.toString();
		} else {
			scores = score.toString();
		}
		localStorage.setItem('scores', scores);
		gameOver = true;
		ctx.fillStyle = '#AA0505';
		ctx.font = '60px monospace';
		ctx.fillText('GAME OVER', canvas.height / 2, canvas.width / 2 - 300);

	}
	ctx.restore();
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

	if (level >= 2) {
		enemy.vMin = 1;
	}

	if (level >= 5) {
		enemy.vMin = 1.5;
		enemy.vMax = 4.5;
	}

	if (level >= 7) {
		enemy.vMin = 2;
		enemy.vMax = 4.5;
	}

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

function createEnemies(enemiesNumber) {
	for (var i = 0; i < enemiesNumber; i++) {
		createEnemy(false);
	}
}
function drawEnemies() {
	enemies.forEach(function(enemy, index) {
		if (enemy.imageStage === 14) {
			ctx.save();
			ctx.shadowColor = '#00ff00';
			ctx.shadowBlur = 40;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
		}
		ctx.drawImage(enemiesSprite, enemy.imageStage * 15, 0, 15, 15, enemy.posX, enemy.posY, 15, 15);
		ctx.restore();
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
	ctx.save();
	ctx.strokeStyle = '#000099';
	ctx.strokeRect(livebar.positionX, livebar.positionY, 100, 20);
	
	ctx.fillStyle = livebar.colors[Math.round(livebar.live / 25)];
	ctx.fillRect(livebar.positionX + livePercent, livebar.positionY, 1, 20);
	ctx.restore();
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
