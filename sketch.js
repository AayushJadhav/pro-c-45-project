const Engine = Matter.Engine,
      World = Matter.World,
      Body = Matter.Body,
      Bodies = Matter.Bodies,
      Constraint = Matter.Constraint;

var engine, world;

var bgImg0, bgImg1, bgImg2, bgImgSprite;

var playBtnImg1, playBtnImg2, playBtn;

var fff_forward, backTo1982, karmaticArcade;

var adventurer;
var adventurerImgL, adventurerImgR, adventurerRunningR, adventurerRunningL;

var ground, ground1, ground2, ground3, ground4, ground5;

var gameState = 0;

// var falling = false;

function preload() {
  bgImg0 = loadImage("assets/images/background0.png");
  bgImg1 = loadImage("assets/images/background1.png");
  adventurerImgR = loadAnimation("assets/images/protagonist_00.png");
  adventurerImgL = loadAnimation("assets/images/protagonist_01.png");
  adventurerRunningR = loadAnimation(
    "assets/images/protagonist_06.png",
    "assets/images/protagonist_07.png",
    "assets/images/protagonist_08.png",
    "assets/images/protagonist_09.png"
  );
  adventurerRunningL = loadAnimation(
    "assets/images/protagonist_02.png",
    "assets/images/protagonist_03.png",
    "assets/images/protagonist_04.png",
    "assets/images/protagonist_05.png"
  );

  fff_forward = loadFont("assets/fonts/FFFFORWA.TTF");
  backTo1982 = loadFont("assets/fonts/BACKTO1982.TTF");
}

function setup() {
  createCanvas(800, 400);
  engine = Engine.create();
  world = engine.world;

  playBtn = createButton("START");
  playBtn.position(620, 300);
  playBtn.id("startBtn");

  adventurer = createSprite(40, 330);
  adventurer.addAnimation("standingR", adventurerImgR);
  adventurer.addAnimation("standingL", adventurerImgL);
  adventurer.addAnimation("runningR", adventurerRunningR);
  adventurer.addAnimation("runningL", adventurerRunningL);
  adventurer.scale = 1;

  ground = createSprite(400, 360, 800, 20);
  ground.shapeColor = "red";
  ground1 = createSprite(190, 270, 80, 20);
  ground1.shapeColor = "red";
  ground2 = createSprite(320, 210, 60, 20);
  ground2.shapeColor = "red";
  ground3 = createSprite(450, 160, 60, 20);
  ground3.shapeColor = "red";
  ground4 = createSprite(540, 240, 80, 20);
  ground4.shapeColor = "red";
  ground5 = createSprite(630, 280, 60, 20);
  ground5.shapeColor = "red";

  // console.log(ground1.height);
}

function draw() {
  Engine.update(engine);
  if (gameState == 0) {
    adventurer.visible = false;
    ground.visible = false;
    ground1.visible = false;
    ground2.visible = false;
    ground3.visible = false;
    ground4.visible = false;
    ground5.visible = false;

    background(bgImg0);
    textFont(backTo1982);
    fill("red");
    textSize(30);
    text("Tales of Adventurer", 160, 150);
    
    fill("black");
    textFont(fff_forward);
    var instructionY = windowHeight / windowHeight + 25;
    textStyle(BOLD);
    textSize(12);
    text("Rules:", windowWidth / windowWidth + 20, instructionY);
    textStyle(NORMAL);
    textSize(10);
    text("1.Don't get killed!", windowWidth / windowWidth + 20, instructionY + 20);
    text("2.Jump and pass through obstacles.", windowWidth / windowWidth + 20, instructionY + 40);
    text("3.Get to the end line to get a reward that would be helpful for you in the next level.", windowWidth / windowWidth + 20, instructionY + 60);
    
    playBtn.mousePressed(()=>{
      gameState = 1;
      playBtn.hide();
      // var fs = fullscreen();
      // fullscreen(!fs);
    });
  }
  
  if (gameState == 1) {
    
    adventurer.visible = true;
    ground.visible = true;
    ground1.visible = true;
    ground2.visible = true;
    ground3.visible = true;
    
    background("grey");
    
    image(bgImg1, 0, 0, width + 40  , height);
    // text(mouseX  + "," + mouseY, mouseX, mouseY);
    
    if (keyIsDown(RIGHT_ARROW)) {
      adventurer.x += 4;
      adventurer.changeAnimation("runningR");
    } else {
      adventurer.changeAnimation("standingR");
    }

    if (keyIsDown(LEFT_ARROW)) {
      adventurer.x -= 4;
      adventurer.changeAnimation("runningL");
    } else {
      adventurer.changeAnimation("standingL")
    }

    if(keyIsDown(UP_ARROW)) {
      adventurer.velocityY = -11;
    } else {
      adventurer.velocityY = 0;
    }
    
    if (adventurer.y !== 330 && adventurer.y < 330) {
      adventurer.velocityY += 4;
      falling = true;
    }

    adventurer.collide(ground);
    adventurer.collide(ground1);
    adventurer.collide(ground2);
    adventurer.collide(ground3);
    adventurer.collide(ground4);
    adventurer.collide(ground5);
  }

  drawSprites();
}
