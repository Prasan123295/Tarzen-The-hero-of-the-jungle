var backGround,backGroundImage;
var tarzen,tarzenAnimation,youloseImage;
var coinsImage,coinSound;
var invisibleground;
var coinGroup;
var score = 0;
var jumpSound;
var bomb, bombImage,bombGroup;
var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  
    backGroundImage = loadImage("forest.jpg");
  
   tarzenAnimation = loadAnimation("tarzen(2).png","tarzen(3).png","tarzen(4).png","tarzen(5).png","tarzen(6).png","tarzen(7).png");
  
  coinImage = loadImage("coin2.gif");
  
  coinSound = loadSound("coin.wav");

  bombImage = loadImage("bomb.png");
  
  youloseImage = loadImage("youlose.png");
  
}

function setup() {
  createCanvas(600,600);
  
  coinGroup = createGroup();
  bombGroup = createGroup();
  
  backGround = createSprite(500,300,30,30);
  backGround.addImage("jungle",backGroundImage);
  backGround.scale = 2;
  backGround.velocityX = -7;
  
  tarzen = createSprite(150,500,30,30);
  tarzen.addAnimation("hohoho",tarzenAnimation);
  tarzen.addImage("youlose",youloseImage);
  tarzen.scale = 0.5;
                                     invisibleground = createSprite(300,550,600,10);
  
  
  
}

function draw() {
 background("white");
  invisibleground.visible = false;
  
  if(gameState === PLAY){
  
  coins();
  bombs();
    
  if(backGround.x < 0){
     backGround.x = 500;
}
  backGround.velocityX = -(7 + 3*score/10);
  tarzen.collide(invisibleground);
  
  if(keyDown("j") && tarzen.y>=350 ){
    tarzen.velocityY = -15; 
}
    tarzen.velocityY = tarzen.velocityY+1;  
  
  if(coinGroup.isTouching(tarzen)){
   coinSound.play();
    score = score+1; 
    coinGroup.destroyEach();
}
  }    
  if(bombGroup.isTouching(tarzen)){
    gameState = END;

  } else if(gameState === END){
    coinGroup.destroyEach();
    bombGroup.destroyEach();
    coinGroup.setVelocityEach(0);
    bombGroup.setVelocityEach(0);
    backGround.velocityX = 0;
    tarzen.velocityY = 0;
    tarzen.x = 300;
    tarzen.y = 250;
    
    tarzen.changeImage("youlose",youloseImage);
    tarzen.scale = 4.7;
    
   
    
    }
    
   
 
  
 drawSprites();
  textSize(30);
  fill("blue");
  text("COINS COLLECTED : "+score,150,80);
 
  
  
  
}



function coins(){
  if(frameCount % 80 === 0){
   
    var coin = createSprite(600,300,10,10);
     
    coin.y = Math.round(random(400,200));
  coin.velocityX = -10;   
    coin.addImage("gold",coinImage);
    
    coin.scale = 0.3;
    coin.lifetime =60;
    coinGroup.add(coin);
}
}

function bombs(){
  if(frameCount % 50 === 0){
    bomb = createSprite(600,300,10,10);
  bomb.y = Math.round(random(350,550));  bomb.addImage("grenade",bombImage);
    bomb.velocityX = -18;
    bomb.scale = 0.3;
    bombGroup.add(bomb);
  } 
     
     
     
     }
   
   
 
  




















