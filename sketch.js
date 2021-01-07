 var towerImage, tower
 var door, doorsGroup ,doorImage
 var climberImage, climber, climbersGroup
 var ghostImage, ghost
 var invisibleBlock, invisibleBlocksGroup
 var gameState = "play"
 var spookySound
 
function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200, 200, 50, 50)
  ghost.scale = 0.3
  ghost.addImage("ghost", ghostImage)
  invisibleBlocksGroup = new Group();
}
function draw(){
  background(0);
  if(gameState === "play"){
    if(tower.y > 400){
    tower.y = 300
    
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3
  }
  
if(keyDown("right_arrow")){
  ghost.x = ghost.x +3
}
 if(keyDown("space")){
   ghost.velocityY = -5
 } 
    ghost.velocityY = ghost.velocityY +0.8
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
    spawnDoors();
  }
  
  
  if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy()
    gameState = "end"
  }

  
  drawSprites();
  
}
 if(gameState === "end"){
  stroke("yellow")
   fill("yellow")
   textSize(30)
   text("gameOver", 230, 250)
 }
function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200, -50)
    door.addImage(doorImage)
    door.x = Math.round(random(120, 400))
    door.velocityY = 1
    door.lifetime = 800
    doorsGroup.add(door)
    var climber = createSprite(200, 10)
    climber.addImage(climberImage)
    climber.x = door.x
    climber.velocityY = 1
    climber.lifetime = 800
    climbersGroup.add(climber)
    ghost.depth = door.x
    ghost.depth += 1
    var invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    invisibleBlock.debug = true
    invisibleBlocksGroup.add(invisibleBlock)
    
  }
  
}



