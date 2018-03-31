"use strict";function init(){setup()}function setup(){drawTextData(),createEnemies(enemiesNumber),canvas.addEventListener("click",makeAction,!1),gameLoop()}function gameLoop(){window.requestAnimationFrame(gameLoop),drawHero(),drawEnemy()}function drawHero(){(speedTick+=1)%10!=0&&0!==speedTick||(ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100),ctx.drawImage(mainHero,hero.heroSliceX,hero.heroSliceY,62,100,hero.heroPositionX,hero.heroPositionY,62,100),hero.heroSliceX+=62,hero.heroSliceX>=mainHero.width&&(hero.heroSliceX=0),speedTick=1)}function makeAction(e){speedTick=-500,ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100),ctx.drawImage(mainHero,124,hero.heroSliceY,62,100,hero.heroPositionX,hero.heroPositionY,62,100);var o=e.clientX-canvas.offsetLeft-35,t=e.clientY-canvas.offsetTop-35;ctx.clearRect(515,650,62,100),ctx.beginPath(),ctx.moveTo(530,750),ctx.lineWidth=1,ctx.lineTo(o+16,t+100),ctx.strokeStyle="#020601",ctx.stroke(),ctx.closePath(),ctx.beginPath(),ctx.moveTo(545,750),ctx.lineTo(o+31,t+100),ctx.strokeStyle="#020601",ctx.stroke(),ctx.closePath(),ctx.beginPath(),ctx.moveTo(531,750),ctx.lineTo(o+16,t+100),ctx.lineTo(o+30,t+100),ctx.lineTo(544,750),ctx.lineTo(531,750),ctx.closePath(),ctx.fillStyle="#285a10",ctx.fill(),hero.heroPositionX=o,hero.heroPositionY=t,checkColision(hero.heroPositionX+30,hero.heroPositionY+30),setTimeout(function(){ctx.clearRect(0,0,canvas.width,livebar.positionY),hero.heroPositionX=hero.positionX,hero.heroPositionY=hero.positionY},500)}function checkColision(e,o){ctx.fillStyle="red",ctx.fillRect(e,o,5,5),enemies.forEach(function(t,i){t.posX>=e-20&&t.posX<=e+20&&t.posY>=o-20&&t.posY<=o+20&&(enemies.splice(i,1),score=Math.round(score+1*t.speed),ctx.clearRect(livebar.positionX-70,livebar.positionY,500,40),drawTextData(),createEnemy())})}function drawTextData(){if(ctx.fillStyle="#000099",ctx.font="20px monospace",ctx.fillText("Score: "+score,livebar.positionX+130,livebar.positionY+15),ctx.font="20px monospace",ctx.fillText("Live:",livebar.positionX-70,livebar.positionY+15),livebar.live>0)for(var e=1;e<=livebar.live;e++)drawLiveBar(e)}function createEnemy(){var e={speed:1,speedDirect:1,direction:1,posX:0,posY:0,vMin:.5,vMax:4,imageStage:1};e.direction=getRandomInt(0,2)-1,0===e.direction&&(e.direction=-1),e.speed=getRandomInt(e.vMin,e.vMax),e.speedDirect=e.speed*e.direction,-1==e.direction?e.posX=getRandomInt(canvas.width,canvas.width+100):e.posX=getRandomInt(-100,0),e.posY=getRandomInt(20,canvas.height-200),e.imageStage=getRandomInt(0,4),enemies.push(e)}function createEnemies(e){for(var o=0;o<e;o++)createEnemy()}function drawEnemy(){enemies.forEach(function(e){ctx.clearRect(e.posX,e.posY,15,15),ctx.clearRect(e.posX-15*e.direction,e.posY,15,15),ctx.drawImage(enemiesSprite,15*e.imageStage,0,15,15,e.posX,e.posY,15,15),e.posX>canvas.width+115&&(e.posX=0,ctx.clearRect(e.posX-15*e.direction,e.posY,15,15)),e.posX<-115&&(e.posX=canvas.width+100,ctx.clearRect(e.posX-15*e.direction,e.posY,15,15)),e.posX+=e.speedDirect})}function drawLiveBar(e){ctx.fillStyle="#000099",ctx.fillRect(livebar.positionX+e,livebar.positionY,1,20)}function getRandomInt(e,o){return Math.floor(Math.random()*(o-e+1))+e}var canvas=document.getElementById("game");canvas.style.backgroundColor="antiquewhite",canvas.style.border="10px solid #0a0a0a";var ctx=canvas.getContext("2d");ctx.save();var mainHero=new Image;mainHero.src="hero_sprite.png";var enemiesSprite=new Image;enemiesSprite.src="food_sprite.png";var score=0,enemiesNumber=10,level=1,hero={heroSliceX:0,heroSliceY:0,heroPositionX:515,heroPositionY:650,positionX:515,positionY:650,speed:10},livebar={live:100,positionX:500,positionY:750},enemies=[],speedTick=0;