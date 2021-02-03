var PLAY = 1;
var END = 0;
var gameState = PLAY;



var bg, bgImg
var mario, marioImg
var ground, groundImg
var coin, coinImg
var coinGroup
var score
var obstacle, obstacleImg
var obstaclesGroup

function preload(){
  bgImg = loadImage("bg.png")
  marioImg = loadImage("mario.png")
  groundImg = loadImage("ground.jpeg")
coinImg = loadImage("coins.png")
obstacleImg = loadImage("obstacle.png")
}

function setup() {
  createCanvas(1500,800);
  bg = createSprite(1000,300);
  bg.addImage(bgImg);
  bg.x = bg.width/2
  bg.scale = 1.4
  
  
  ground = createSprite(720,780,1500, 20);
  ground.addImage(groundImg);
  ground.scale = 3.5
  mario = createSprite(200,750,10,10);
  mario.addImage(marioImg)
  mario.scale = 0.1
  coinGroup = new Group()
  score = 0;
}

function draw() {
  background(255,255,255);  
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){


  bg.velocityX = -3
  if(keyDown("UP_ARROW")){
    mario.velocityY = -10
  }
  mario.velocityY = mario.velocityY +0.5
  //if(coinGroup.isTouching(mario)){
   
    //score = score+1
   
 //}
  if(bg.x < 100){
    bg.x = bg.width/2
  }
  spawnCoins();
  spawnObstacles();

  
if(obstaclesGroup.isTouching(mario)){
  gameState = END
}
}
else{
  if(gameState == END){
    textSize(80)
    text("GAME OVER!!!", 600,600)
    mario.velocityY = 0
    bg.velocityX = 0
    ground.velocityX = 0
    coinGroup.velocityXEach(0);
    obstaclesGroup.velocityXEach(0);

  }
}
  mario.collide(ground)
  drawSprites();

} 

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var coin = createSprite(1400,900,40,10);
    coin.y = Math.round(random(120,600));
    coin.addImage(coinImg);
    coin.scale = 0.1;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 2000;
    
    //adjust the depth
    bg.depth = coin.depth;
    coin.depth = coin.depth + 1;
    bg.depth = mario.depth
    mario.depth = mario.depth +1
    bg.depth = ground.depth
    ground.depth = ground.depth + 1
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(1400,900,40,10);
    obstacle.y = Math.round(random(120,600));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 2000;
    //adjust the depth
    bg.depth = obstacle.depth;
    obstacle.depth = obstacle.depth + 1;
    bg.depth = obstacle.depth
    mario.depth = mario.depth +1
    bg.depth = ground.depth
    ground.depth = ground.depth + 1
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}


