var PLAY=1;
var END=0;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;

var gameState = PLAY;

var SurvialTime = 0 ;


function preload(){
  createCanvas(400,400);
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
 // ground.visible = false;
  
}


function draw() {
  
  background("lightgreen");
  
  stroke("black");
    fill("black");
      textSize(20);
  
  
  text("Survial Time:"+   SurvialTime, 100, 50);
  
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score,250,100);
  

  
  if(gameState === PLAY){
    

SurvialTime = Math.ceil(frameCount/frameRate());
  
    
    obstacles();
    food();
    
     if (ground.x < 0){
      ground.x = ground.width/2;
  
    }
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score+1;
    }
 
    
  monkey.collide(ground);
    monkey.velocityY = monkey.velocityY + 0.3;
  }
  
  if(keyDown("space")){
    
    monkey.velocityY = -10;
  }
  
  
  if(obstacleGroup.isTouching(monkey)){
    console.log("jai");
  gameState = END;
    
  }
  
  if(gameState === END){
    console.log("inside end");
  obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     SurvialTime.visible = false;
    ground.visible = false;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 100, 240);
   }
  
  drawSprites();

  
}



function food (){
  if(frameCount%80 ===0){
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,120));
    banana.scale  = 0.1;
    
    banana.velocityX= -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    
  }
  
}

function obstacles(){
  
  if(frameCount%300===0){
    obstacle = createSprite(300,325,10,10);
   //bstacle.y = Math.round(random(80,100));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
   
    
    
    
  }
}






