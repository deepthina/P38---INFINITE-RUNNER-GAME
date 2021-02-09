var monkey, monkeyImage;

var ground, groundImage, invisibleGround;

var treeImage;

var bananaImage;

var bananaGroup, obstacleGroup, treeGroup;

var score = 0;

var obstacleImage;

var gameState = "play";

var gameOver, gameOverImage;


function preload() {

  monkeyImage = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  groundImage = loadImage("Road.png");

  treeImage = loadImage("tree.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");

  gameOverImage = loadImage("gameOver.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);


  ground = createSprite(windowWidth / 2, windowHeight / 2, width, 20);
  ground.addImage("ground", groundImage);

  monkey = createSprite(windowWidth / 2, windowHeight - 80);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.1;

  invisibleGround = createSprite(windowWidth / 2, windowHeight - 20, width, 20);
  invisibleGround.visible = false;

  gameOver = createSprite(width / 2, height / 2);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  treeGroup = new Group();


}

function draw() {

  background(76, 77, 79);


  camera.position.y = monkey.y;

  if (keyDown("space")) {
    monkey.velocityY = -10;
  }


  if (keyDown("left")) {
    monkey.x -= 10;
  }

  if (keyDown("right")) {
    monkey.x += 10;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  ground.velocityX = -5;

  monkey.collide(invisibleGround);

  if (monkey.isTouching(bananaGroup)) {
    score = score + 10;
    bananaGroup.destroyEach();
    monkey.scale = monkey.scale * 1.2;
  }

  if (monkey.isTouching(obstacleGroup)) {

    gameState = "end";
  }

  spawnTrees();
  spawnObstacles();

  drawSprites();

  textSize(20);


  text("Score: " + score, 100, 50);


  if (gameState === "end") {
    //background("black");

    monkey.destroy();
    treeGroup.destroyEach();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.velocityX = 0;

    gameOver.y = camera.position.y;
    gameOver.visible = true;

  }

}


function spawnTrees() {

  if (frameCount % 200 === 0) {
    var tree = createSprite(width, random(camera.y));
    var banana = createSprite(random(tree.x + 100, tree.x - 100), tree.y - 50);

    tree.addImage("tree", treeImage);
    banana.addImage("banana", bananaImage);

    tree.scale = 0.3;
    banana.scale = 0.05;

    tree.velocityX = -5;
    banana.velocityX = tree.velocityX;

    tree.lifetime = width / tree.velocityX;
    banana.lifetime = tree.lifetime;

    treeGroup.add(tree);
    bananaGroup.add(banana);

    tree.depth = 1;
    banana.depth = 2;
    monkey.depth = 3;
  }

}

function spawnObstacles() {

  if (frameCount % 90 === 0) {
    var obstacle = createSprite(width, camera.y);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -5;
    obstacle.lifetime = width / obstacle.velocityX;
  }
}