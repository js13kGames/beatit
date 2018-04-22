"use strict";function init(){ctx.clearRect(0,0,canvas.width,canvas.height),canvas.style.backgroundColor="#61c46a",drawLogo(),drawButtons()}function drawLogo(){ctx.save(),ctx.fillStyle="#ffffff",ctx.font="bold 140px Arial",ctx.rotate(-Math.PI/10),ctx.fillText("B",canvas.width/2-250,canvas.height/2),ctx.restore(),ctx.fillStyle="#09437f",ctx.font="bold 100px Arial",ctx.fillText("Eat",canvas.width/2-85,canvas.height/2-130),ctx.fillStyle="#007108",ctx.font="bold 140px Arial",ctx.fillText("It",canvas.width/2+75,canvas.height/2-115)}function drawButtons(){var e={x:canvas.width/2-120,y:canvas.height/2-25,width:240,height:50};generateButton(e,"START GAME",-80,8,"big"),generateButton({x:canvas.width/2-100,y:canvas.height/2+60,width:200,height:50},"SHOW INSTRUCTIONS",-92,90,"small");var o={x:canvas.width/2-100,y:canvas.height/2+120,width:200,height:50};generateButton(o,"HIGHSCORES",-55,150,"small"),generateButton({x:canvas.width/2-100,y:canvas.height/2+180,width:200,height:50},"ABOUT",-30,210,"small"),canvas.addEventListener("click",function t(){var i=getMousePos(canvas,event);isInside(i,e)&&(canvas.removeEventListener("click",t,!1),startGame()),isInside(i,o)&&(canvas.removeEventListener("click",t,!1),drawHighscores(getHighScores()))},!1)}function generateButton(e,o,t,i,n){var a=e;ctx.fillStyle="#61c46a",ctx.fillRect(a.x,a.y,a.width,a.height),"small"===n?(ctx.lineWidth=2,ctx.font="20px monospace"):(ctx.lineWidth=4,ctx.font="30px monospace"),ctx.strokeStyle="#ffffff",ctx.strokeRect(a.x,a.y,a.width,a.height),ctx.fillStyle="#ffffff",ctx.fillText(o,canvas.width/2+t,canvas.height/2+i)}function getHighScores(){var e=[];return localStorage.getItem("scores")&&(e=localStorage.getItem("scores")),e}function drawHighscores(e){ctx.fillStyle="#61c46a",ctx.strokeStyle="#000000",ctx.fillRect(50,50,canvas.width-100,canvas.height-100),ctx.strokeRect(50,50,canvas.width-100,canvas.height-100);var o={x:canvas.width-80,y:75,width:50,height:50};ctx.moveTo(canvas.width-75,75),ctx.lineTo(canvas.width-90,90),ctx.moveTo(canvas.width-90,75),ctx.lineTo(canvas.width-75,90),ctx.strokeStyle="#000000",ctx.stroke(),canvas.addEventListener("click",function e(){isInside(getMousePos(canvas,event),o)&&(canvas.removeEventListener("click",e,!1),init())}),ctx.fillStyle="#ffffff",ctx.font="30px monospace",ctx.fillText("Highscores:",canvas.width/2-80,100);var t=e.split(",");t.sort(function(e,o){return o-e}),t.forEach(function(e,o){o<15?ctx.fillText(o+1+". "+e,100,150+30*o):o<30&&ctx.fillText(o+1+". "+e,400,150+30*(o-15))})}function playInstructions(){}function startGame(){canvas.style.backgroundColor="antiquewhite",createEnemies(enemiesNumber,!1),canvas.addEventListener("click",makeAction,!1),startAnimating(60)}function gameLoop(){ctx.clearRect(0,0,canvas.width,canvas.height),drawHero(),drawEnemies(),drawTextData()}function drawHero(){ctx.save(),ctx.shadowColor="#8dc771",livebar.live<35&&(ctx.shadowColor="#cbd45d"),livebar.live<15&&(ctx.shadowColor="#c1a923"),ctx.shadowBlur=5,ctx.shadowOffsetX=0,ctx.shadowOffsetY=0,speedTick+=1,ctx.clearRect(hero.heroPositionX,hero.heroPositionY,62,100),ctx.drawImage(mainHero,hero.heroSliceX,hero.heroSliceY,62,100,hero.heroPositionX,hero.heroPositionY,62,100),speedTick%10!=0&&0!==speedTick||(hero.heroSliceX+=62,hero.heroSliceX>=mainHero.width&&(hero.heroSliceX=0),speedTick=1),drawHeroBeam(),ctx.restore(),ctx.beginPath(),ctx.moveTo(hero.positionX-50,hero.positionY+100),ctx.lineTo(hero.positionX+111,hero.positionY+100),ctx.lineTo(hero.positionX+101,hero.positionY+110),ctx.lineTo(hero.positionX+90,canvas.height),ctx.lineTo(hero.positionX-29,canvas.height),ctx.lineTo(hero.positionX-39,hero.positionY+110),ctx.closePath(),ctx.fillStyle="#7c2c04",ctx.fill()}function drawHeroBeam(){ctx.beginPath(),ctx.lineWidth=1,ctx.moveTo(hero.positionX+16,hero.positionY+100),hero.moveToY<hero.positionY&&ctx.bezierCurveTo(hero.positionX+16,hero.positionY,hero.heroPositionX+16,hero.heroPositionY+200,hero.heroPositionX+16,hero.heroPositionY+100),ctx.lineTo(hero.heroPositionX+31,hero.heroPositionY+100),hero.moveToY<hero.positionY&&ctx.bezierCurveTo(hero.heroPositionX+31,hero.heroPositionY+200,hero.positionX+31,hero.positionY,hero.positionX+31,hero.positionY+100),ctx.lineTo(hero.positionX+16,hero.positionY+100),ctx.strokeStyle="#020601",ctx.stroke(),ctx.closePath(),ctx.fillStyle="#285a10",ctx.fill()}function makeAction(e){function o(){canvas.removeEventListener("click",makeAction,!1),i=requestAnimationFrame(o),hero.heroSliceX=124,drawHeroBeam(),"goingThere"==hero.animationState?hero.heroPositionX==hero.moveToX?hero.animationState="beenThere":Math.abs(hero.heroPositionX-hero.moveToX)>Math.abs(s*n)?(hero.heroPositionX+=s*n,hero.heroPositionY+=c*n):(hero.heroPositionX=hero.moveToX,hero.heroPositionY=hero.moveToY):"beenThere"!=hero.animationState||gameOver?"goingBack"!=hero.animationState||gameOver?(hero.heroPositionX=hero.positionX,hero.heroPositionY=hero.positionY,hero.moveToX=hero.positionX,hero.moveToY=hero.positionY,cancelAnimationFrame(i),canvas.addEventListener("click",makeAction,!1),hero.animationDelay=50):(hero.heroSliceX=0,hero.heroPositionX==hero.positionX?hero.animationState="back":Math.abs(hero.heroPositionX-hero.positionX)>Math.abs(s*n)?(hero.heroPositionX-=s*a,hero.heroPositionY-=c*a):(hero.heroPositionX=hero.positionX,hero.heroPositionY=hero.positiony)):r>=0?(pointsText=checkColision(hero.heroPositionX,hero.heroPositionY),0!==pointsText.points&&(ctx.font="16px monospace","-"===pointsText.mark?(ctx.fillStyle="#990000",ctx.fillText("Live "+pointsText.mark+pointsText.points,pointsText.posX,pointsText.posY)):(ctx.fillStyle="#009900",ctx.fillText(pointsText.mark+pointsText.points,pointsText.posX,pointsText.posY))),r--):(pointsText={mark:"+",points:0,posX:0,posY:0},hero.animationState="goingBack")}if(!gameOver){var t=getMousePos(canvas,e);hero.moveToX=t.x-45,hero.moveToY=t.y-45;var i,n=3,a=3,r=20,s=(hero.moveToX-hero.heroPositionX)/hero.speed,c=(hero.moveToY-hero.heroPositionY)/hero.speed;hero.animationState="goingThere",o()}}function checkColision(e,o){var t=score;return enemies.forEach(function(i,n){if(i.posX>=e-10&&i.posX<=e+50&&i.posY>=o&&i.posY<=o+50){var a=i.posX,r=i.posY-50;enemies.splice(n,1),14===i.imageStage&&(createEnemies(200,!1),score+=100),i.imageStage<=9||14===i.imageStage?(score=Math.round(score+1*i.speed),pointsText={mark:"+",points:score-t,posX:a,posY:r},livebar.live+7*i.speed>=100?livebar.live=100:livebar.live+=7*i.speed):(livebar.live-=7*i.speed,pointsText={mark:"-",points:7*i.speed,posX:a,posY:r}),createEnemy(!1)}}),level=Math.floor(score/100)+1,pointsText}function drawTextData(){if(ctx.fillStyle="#000099",ctx.font="20px monospace",ctx.fillText("Level: "+level,canvas.width-150,livebar.positionY+15),ctx.fillStyle="#000099",ctx.font="20px monospace",ctx.fillText("Score: "+score,livebar.positionX+130,livebar.positionY+15),ctx.font="20px monospace",ctx.fillText("Live:",livebar.positionX-70,livebar.positionY+15),livebar.live>=0){livebar.live-=livebar.speed*level,canvas.style.backgroundColor="antiquewhite",livebar.live<35&&(canvas.style.backgroundColor="#ffd4d4"),livebar.live<15&&(canvas.style.backgroundColor="#fb9b9b");for(var e=1;e<=livebar.live;e++)drawLiveBar(e)}else{var o=getHighScores();o+=","+score.toString(),localStorage.setItem("scores",o),gameOver=!0,cancelAnimationFrame(mainAnimationFrame),canvas.removeEventListener("click",makeAction,!1),ctx.fillStyle="#AA0505",ctx.font="60px monospace",ctx.fillText("GAME OVER",canvas.height/2,canvas.width/2-300)}}function createEnemy(e){var o={speed:1,speedDirect:1,direction:1,posX:0,posY:0,vMin:.5,vMax:4,imageStage:1,bonusType:e};o.direction=getRandomInt(0,2)-1,0===o.direction&&(o.direction=-1),o.speed=getRandomInt(o.vMin,o.vMax),o.speedDirect=o.speed*o.direction,-1==o.direction?o.posX=getRandomInt(canvas.width,canvas.width+100):o.posX=getRandomInt(-100,0),o.posY=getRandomInt(100,canvas.height-200),!0===o.bonusType?o.imageStage=14:o.imageStage=getRandomInt(0,13),enemies.push(o)}function createEnemies(e,o){for(var t=0;t<e;t++)createEnemy(o)}function drawEnemies(){enemies.forEach(function(e,o){14===e.imageStage&&(ctx.save(),ctx.shadowColor="#00ff00",ctx.shadowBlur=40,ctx.shadowOffsetX=0,ctx.shadowOffsetY=0),ctx.drawImage(enemiesSprite,15*e.imageStage,0,15,15,e.posX,e.posY,15,15),ctx.restore(),e.posX+=e.speedDirect,(e.posX>canvas.width+15||e.posX<-15)&&(enemies.splice(o,1),14!==e.imageStage&&!1===e.bonusType&&enemies.length<=20&&createEnemy(1===getRandomInt(1,80)?!0:!1))})}function drawLiveBar(e){ctx.strokeStyle="#000099",ctx.strokeRect(livebar.positionX,livebar.positionY,100,20),ctx.fillStyle=livebar.colors[Math.round(livebar.live/25)],ctx.fillRect(livebar.positionX+e,livebar.positionY,1,20)}function startAnimating(e){fpsInterval=1e3/e,then=Date.now(),startTime=then,animate()}function animate(){mainAnimationFrame=window.requestAnimationFrame(animate),now=Date.now(),(elapsed=now-then)>fpsInterval&&(then=now-elapsed%fpsInterval,gameLoop())}function getRandomInt(e,o){return Math.floor(Math.random()*(o-e+1))+e}function getMousePos(e,o){var t=e.getBoundingClientRect();return{x:o.clientX-t.left,y:o.clientY-t.top}}function isInside(e,o){return e.x>o.x&&e.x<o.x+o.width&&e.y<o.y+o.height&&e.y>o.y}var canvas=document.getElementById("game");canvas.style.border="10px solid #0a0a0a";var ctx=canvas.getContext("2d");ctx.save();var mainHero=new Image;mainHero.src="hero_sprite.png";var enemiesSprite=new Image;enemiesSprite.src="food_sprite.png";var score=0,enemiesNumber=20,level=1,gameOver=!1,hero={heroSliceX:0,heroSliceY:0,heroPositionX:canvas.width/2+3,heroPositionY:canvas.height-150,positionX:canvas.width/2+3,positionY:canvas.height-150,moveToX:canvas.width/2+3,moveToY:canvas.height-150,speed:10,animationDelay:50,animationState:"goingThere",actionListener:null},livebar={live:100,speed:.03,positionX:100,positionY:20,colors:["#b40101","#99003d","#99008b","#610099","#000099"]},enemies=[],speedTick=0,pointsText={mark:"+",points:0,posX:0,posY:0},mainAnimationFrame,stop=!1,frameCount=0,results=document.querySelector("#fps"),fps,fpsInterval,startTime,now,then,elapsed;