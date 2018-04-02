"use strict";function init(){setup()}function setup(){drawTextData(),createEnemies(enemiesNumber),canvas.addEventListener("click",makeAction,!1),gameLoop()}function gameLoop(){window.requestAnimationFrame(gameLoop),ctx.clearRect(0,0,canvas.width,livebar.positionY),drawHero(),drawEnemy()}function drawHero(){speedTick+=1,ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100),ctx.drawImage(mainHero,hero.heroSliceX,hero.heroSliceY,62,100,hero.heroPositionX,hero.heroPositionY,62,100),speedTick%10!=0&&0!==speedTick||(hero.heroSliceX+=62,hero.heroSliceX>=mainHero.width&&(hero.heroSliceX=0),speedTick=1),ctx.beginPath(),ctx.lineWidth=1,ctx.moveTo(hero.positionX+15,hero.positionY+100),ctx.lineTo(hero.moveToX+16,hero.moveToY+100),ctx.moveTo(hero.positionX+30,hero.positionY+100),ctx.lineTo(hero.moveToX+31,hero.moveToY+100),ctx.strokeStyle="#020601",ctx.stroke(),ctx.closePath(),ctx.beginPath(),ctx.moveTo(hero.positionX+16,hero.positionY+100),ctx.lineTo(hero.moveToX+16,hero.moveToY+100),ctx.lineTo(hero.moveToX+30,hero.moveToY+100),ctx.lineTo(hero.positionX+29,hero.positionY+100),ctx.lineTo(hero.positionX+16,hero.positionY+100),ctx.closePath(),ctx.fillStyle="#285a10",ctx.fill()}function makeAction(e){hero.moveToX=e.clientX-canvas.offsetLeft-45,hero.moveToY=e.clientY-canvas.offsetTop-45,hero.heroPositionX=hero.moveToX,hero.heroPositionY=hero.moveToY,checkColision(hero.heroPositionX+30,hero.heroPositionY+30),setTimeout(function(){hero.heroPositionX=hero.positionX,hero.heroPositionY=hero.positionY,hero.moveToX=hero.positionX,hero.moveToY=hero.positionY},500)}function checkColision(e,o){ctx.fillStyle="red",ctx.fillRect(e,o,5,5),enemies.forEach(function(i,t){i.posX>=e-20&&i.posX<=e+20&&i.posY>=o-20&&i.posY<=o+20&&(enemies.splice(t,1),score=Math.round(score+1*i.speed),ctx.clearRect(livebar.positionX-70,livebar.positionY,500,40),drawTextData(),createEnemy())})}function drawTextData(){if(ctx.fillStyle="#000099",ctx.font="20px monospace",ctx.fillText("Score: "+score,livebar.positionX+130,livebar.positionY+15),ctx.font="20px monospace",ctx.fillText("Live:",livebar.positionX-70,livebar.positionY+15),livebar.live>0)for(var e=1;e<=livebar.live;e++)drawLiveBar(e)}function createEnemy(){var e={speed:1,speedDirect:1,direction:1,posX:0,posY:0,vMin:.5,vMax:4,imageStage:1};e.direction=getRandomInt(0,2)-1,0===e.direction&&(e.direction=-1),e.speed=getRandomInt(e.vMin,e.vMax),e.speedDirect=e.speed*e.direction,-1==e.direction?e.posX=getRandomInt(canvas.width,canvas.width+100):e.posX=getRandomInt(-100,0),e.posY=getRandomInt(20,canvas.height-200),e.imageStage=getRandomInt(0,8),enemies.push(e)}function createEnemies(e){for(var o=0;o<e;o++)createEnemy()}function drawEnemy(){enemies.forEach(function(e,o){ctx.drawImage(enemiesSprite,15*e.imageStage,0,15,15,e.posX,e.posY,15,15),e.posX+=e.speedDirect,(e.posX>canvas.width+15||e.posX<-15)&&(enemies.splice(o,1),createEnemy())})}function drawLiveBar(e){ctx.fillStyle="#000099",ctx.fillRect(livebar.positionX+e,livebar.positionY,1,20)}function getRandomInt(e,o){return Math.floor(Math.random()*(o-e+1))+e}var canvas=document.getElementById("game");canvas.style.backgroundColor="antiquewhite",canvas.style.border="10px solid #0a0a0a";var ctx=canvas.getContext("2d");ctx.save();var mainHero=new Image;mainHero.src="hero_sprite.png";var enemiesSprite=new Image;enemiesSprite.src="food_sprite.png";var score=0,enemiesNumber=10,level=1,hero={heroSliceX:0,heroSliceY:0,heroPositionX:515,heroPositionY:650,positionX:515,positionY:650,moveToX:515,moveToY:650,speed:10},livebar={live:100,positionX:500,positionY:750},enemies=[],speedTick=0;