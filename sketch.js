const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var alien
var aliens = []
var arrows = []
var numberOfArrows = 30;


function preload() {
  backgroundImg = loadImage("./assetsa/bg.jpeg");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 800, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

showAliens();
alien_collision();
  playerBase.display();
  player.display();
  playerArcher.display();

  for (var i = 0; i < arrows.length; i++) {
    showArrows(arrows[i], i);
   alien_collision(i) 
  }

 // for (var i = 0; i < arrows.length; i++) {
    if (arrows[i] !== undefined) {
      arrows[i].display();

      var board1Collision = Matter.SAT.collides(
        alien1.body,
        arrows[i].body
      ); 
      var posX = arrows[i].body.position.x;
      var posY = arrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!arrows[i].isRemoved) {
          arrows[i].remove(i);
        } else {
          arrows[i].trajectory = [];
        }
      }
    }
  //}

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("MISSION #B6", width / 2, 100);



  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);

  fill("#FFFF");
  textSize(30);
  text("Press Space Bar to shoot🔫 ", 1700, 100);

  fill("#FFFF");
  textSize(30);
  text("Use the Up Arrow ⬆️   ", 1700, 800);

    fill("#FFFF");
  textSize(30);
  text("and Down Arrow ⬇️ ", 1700, 840);


    fill("#FFFF");
  textSize(30);
  text("on your keyboard to change ", 1700, 880);

      fill("#FFFF");
  textSize(30);
  text("the angle of the bow  ", 1700, 920);
  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

  if (numberOfArrows == 0) {
    gameOver();
  }

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      arrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (arrows.length) {
      var angle = playerArcher.body.angle;
      arrows[arrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "assetsa/game_over.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function showArrows(arrow1, index) {
  if (arrow1) {
    arrow1.display();
    if (arrow1.body.position.x>=width || arrow1.body.position.y >=height-50){
      arrow1.remove(index)
    }
  }
}


function showAliens() {
  if (aliens.length > 0) {
    if (
     aliens[aliens.length - 1] === undefined ||
     aliens[aliens.length - 1].body.position.x < width - 160
    ) {
      var positions = [-140, -510, 10, -120];
      var position = random(positions);
      var alien = new Alien(width, height - 400, 100, 100, position);

      aliens.push(alien);
    }

    for (var i = 0; i < aliens.length; i++) {
      if (aliens[i]) {
        Matter.Body.setVelocity(aliens[i].body, {
          x: -5,
          y: -1
        });

        aliens[i].display();
      } 
    }
  } else {
    var alien = new Alien(width, height - 450, 100, 100, -160);
    aliens.push(alien);
  }
}



function alien_collision(index){

for (var i = 0; i<aliens.length; i++){

if(arrows[index]!== undefined && aliens[i]!== undefined){

var collision = Matter.SAT.collides(arrows[index].body,aliens[i].body)

if (collision.collided){

aliens[i].remove(i)
arrows[index].remove(index)

}}}}