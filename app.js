
var g = ga(800,600,setup);
var gameScene, player, enemies;

g.start();

function setup() {
  g.backgroundColor = "antiquewhite";
  gameScene = g.group();
  createEnemies(10);
  createPlayer();
  g.state = play;
}

function createPlayer() {
  var ball = g.circle(
    30,
    "yellow",
    "black",
    2,
    100,
    100
  );
  gameScene.addChild(ball);
  g.stage.putCenter(ball, 0, 250);
}

function createEnemies(enemiesNumber) {
    //Make the enemies
  var numberOfEnemies = enemiesNumber || 6,
      spacing = 48,
      xOffset = 150,
      speed = 2,
      direction = 1;

  enemies = [];
  for (var i = 0; i < numberOfEnemies; i++) {
    var enemy = g.rectangle(32, 32, "red");
    var x = spacing * i + xOffset;
    var y = g.randomInt(0, g.canvas.height - enemy.height);

    enemy.x = x;
    enemy.y = y;
    enemy.vy = speed * direction;
    direction *= -1;
    enemies.push(enemy);
    gameScene.addChild(enemy);
  }
}


function play() {
  enemies.forEach(function(enemy) {
      g.move(enemy);

      var enemyHitsEdges = g.contain(enemy, g.stage.localBounds);

      if (enemyHitsEdges === "top" || enemyHitsEdges === "bottom") {
        enemy.vy *= -1;
      }
  });
}
