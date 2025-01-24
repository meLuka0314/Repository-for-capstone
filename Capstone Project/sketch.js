// Captone project
// Luka Sullivan
// January 23, 2025
// Puck soccer is game that combines ellements  of soccer and hockey. Who ever scores 5 goals first wins.
// P1 uses the arrow keys and P2 uses AWSD to control the puck.

let clap, bounce; //declares variable for cheering and bouncing sound effect
let gameStarted = false; //initial state is false
let puck;
let ball;
let scoreLeft = 0; //score starts at 0
let scoreRight = 0; //score starts at 0

function preload() {
  clap = loadSound("assets/clap.mp3"); //loads clap sound effect
  bounce = loadSound("assets/bounce.mp3"); //loads bounce sound effect
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  puck2 = new Puck2(); //initializes puck2
  puck = new Puck(); //initializes puck
  ball = new Ball(); //initializes ball
  if (!gameStarted) { //when game isn't started, shows menu
    showMenu();
  }
}

function draw() {
  if (gameStarted) { //if game started
    drawField(); //draws the field
    Spectators(); //draws the spectators
    displayScores(); //shows the score
    puck.display(); //displays puck
    puck.move(); //moves puck
    puck2.display(); //displays puck2
    puck2.move(); //moves puck2
    ball.display(); //displays ball
    ball.move(); //moves ball
  }
}

//creates the menu
function showMenu() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("Puck Soccer", width / 2, 250);
  textSize(30);
  text("Press Enter to start", width / 2, height / 2 + 20);
}

//when enter key is pressed gameStarted is true
function keyPressed() {
  if (keyCode === ENTER) {
    gameStarted = true;
  }
}

function drawField() {
  background(0, 180, 0); //sets background color for the field

  //makes the field boundaries
  stroke(255);
  strokeWeight(4);
  noFill();
  rect(300, 120, width - 600, height - 240);

  //creates center line
  line(width / 2, 120, width / 2, height - 120);

  //creates cenetr circle
  ellipse(width / 2, height / 2, 300);

  //creates goals 
  rect(280, height / 2 - 120, 20, 240);
  rect(width - 300, height / 2 - 120, 20, 240);

  //creates center points
  ellipse(width / 2, height / 2, 7, 7);
}

//displays scores
function displayScores(){
  fill(255); //color is white
  textSize(50); //text size of 50
  text(scoreLeft, width/4, 80); //sets location of puck2's score display
  text(scoreRight, width - width/4, 80); //sets location of puck's score display
}

//function for a spectator
function Spectator(x, y) {
  let r = random(int(255)); //random int for r
  let g = random(int(255)); //random int for g
  let b = random(int(255)); //random int for b

  //bottom
  if (random(100) < 50) { //if random number to 100 is less than 50
    fill(r, g, b);  //fills random color
    strokeWeight(1); //stroke weight is one 
    ellipse(x + random(-3,3), y + random(-3,3), 15); //create a circle spectator
    //adds random spacing from -3 to 3

  } else {
    fill(r, g, b);  
    strokeWeight(1);  
    rect(x - 7.5 + random(-3,3), y - 7.5 + random(-3,3), 15); //creates a square spectator
  }
}

function Spectators() {
  randomSeed(1);
  let spacing = 20; 
  let fieldLeft = 300; //boundary of fieldLeft
  let fieldRight = width - 300; //boundary of fieldRight
  let fieldTop = 120; //boundary of fieldTop
  let fieldBottom = height - 120; //boundary of fieldBottom

  //loop to draw spectators on the top side of the field
  for (let y = fieldTop - 80; y > 0; y -= spacing) { //loops through y position starting above the fields top boundary, decreasing by spacing
    for (let x = fieldLeft; x < fieldRight; x += spacing) { //loops through x position from the left to the right boundary
      Spectator(x, y); //draws a spectator at (x,y) position
    }
  }
  //loop to draw spectators on the bottom side of the field  
  for (let y = fieldBottom + 40; y < height; y += spacing) { //loops through y position starting below the fields bottom boundary, increasing by spacing
    for (let x = fieldLeft; x < fieldRight; x += spacing) { //loops through x position from the left to the right boundary
      Spectator(x, y); //draws a spectator at (x,y) position
    }
  }

  //loop to draw spectators on the left side of the field
  for (let x = fieldLeft - 80; x > 0; x -= spacing) { //loops through x position starting left of the fields left boundary, decreasing by spacing
    for (let y = fieldTop; y < fieldBottom; y += spacing) { //loops through y position from the top to the bottom boundary of the field
      Spectator(x, y); //draws a spectator at (x,y) position
    }
  }

  //loop to draw spectators on the right side of the field
  for (let x = fieldRight + 80; x < width; x += spacing) { //loops through x position starting right of the fields right boundary, decreasing by spacing
    for (let y = fieldTop; y < fieldBottom; y += spacing) {  //loops through y position from the top to the bottom boundary of the field
      Spectator(x, y); //draws a spectator at (x,y) position
    }
  }
}


class Puck {
  constructor() {
    this.x = width - 400; //starting x position of puck
    this.y = height / 2; //starting y position of puck
    this.diameter = 60; //sets diameter of puck
    this.speed = 5; //sets speed of puck
  }

  display() {
    fill(200, 0, 0); //red
    strokeWeight(4); //sets stroke thickness 
    ellipse(this.x, this.y, this.diameter); //draws puck
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) { //checks if left arrow key is pressed
      this.x -= this.speed + 0.5; //goes left
    }

    if (keyIsDown(RIGHT_ARROW)) { //checks if right arrow key is pressed
      this.x += this.speed + 0.5; //goes right
    }

    if (keyIsDown(UP_ARROW)) { //checks if up arrow key is pressed
      this.y -= this.speed; //goes up
    }

    if (keyIsDown(DOWN_ARROW)) { //checks if down arrow key is pressed
      this.y += this.speed; //goes down
    }
  }
}

//the same as puck but different starting position and keys
class Puck2 {
  constructor() {
    this.x = width / 5;
    this.y = height / 2;
    this.diameter = 60;
    this.speed = 5;
  }

  display() {
    fill(0, 200, 0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    if (keyIsDown(65)) { //if A key is pressed
      this.x -= this.speed + 0.5; //goes left
    }

    if (keyIsDown(68)) { //if D key is pressed
      this.x += this.speed + 0.5; //goes right
    }

    if (keyIsDown(87)) { //if W key is pressed
      this.y -= this.speed; //goes up
    }

    if (keyIsDown(83)) { //if S key is pressed
      this.y += this.speed; //goes down
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 40;
    this.speedX = random(-6, 6); //sets SpeedX value as random of -6 to 6 to go to a random direction
    this.speedY = random(-6, 6); //sets SpeedY value as random of -6 to 6 to go to a random direction
    this.bounceCooldown = 0; //cooldown timer to prevent continous collisions with the puck
  }

  display() {
    fill(0, 0, 200);
    strokeWeight(0);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    //recreates friction by continously slowing down the x and y speed slowly
    this.speedX *= 0.99;
    this.speedY *= 0.99;

    //field boundaries so the ball doesnt get out
    if (this.x - this.diameter / 2 <= 300) { //if the ball is going past the left vertical line
        this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
        bounce.play(); //plays a sound of the ball bouncing
      }

    if (this.x + this.diameter / 2 >= width - 300) { //if the ball is going past the right vertical line
      this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
      bounce.play(); //plays a sound of the ball bouncing
    }

    if (this.y - this.diameter / 2 <= 120) { //if the ball is going past the top horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
      bounce.play(); //plays a sound of the ball bouncing
    }

    if (this.y + this.diameter / 2 >= height - 120) { //if the ball is going past the bottom horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
      bounce.play(); //plays a sound of the ball bouncing
    }

    //Checks for goals
    //if ball touches the left goal line
    if (this.x - this.diameter/2 <= 300) {
      if (this.y >= height/2 - 120) {
        if (this.y <= height/2 + 120) {
          this.resetPosition(); //resets position
          scoreRight++; //adds score to puck1
        }          
        if (scoreRight === 5) { //if Puck1s score is 5
          gameStarted = false; //stops the game so that the game doesnt interfere
          showMenu(); //shows menu
          scoreLeft = 0;
          scoreRight = 0;
        }
      }
    }

    //if ball touches the right goal line
    if (this.x + this.diameter/2 >= width - 300) {
      if (this.y >= height/2 - 120) {
        if (this.y <= height/2 + 120){
          this.resetPosition(); //resets position
          scoreLeft++; //adds score to puck2
          if (scoreLeft === 5) { //if puck2s score is 5
            gameStarted = false; //stops the game so that the game doesnt interfere
            showMenu();//shows menu
            scoreLeft = 0;
            scoreRight = 0;
          }
        }
      }
    }
    this.CheckCollisionPuck(puck); //checks for collision between puck1 and ball
    this.CheckCollisionPuck(puck2); //checks for collision between puck2 and ball
  }

  //checks for collision
  CheckCollisionPuck(puck) {
    if (this.bounceCooldown === 0) { //makes sure there is no cool down
      let d = dist(this.x, this.y, puck.x, puck.y); //distance between the ball and puck
      let combinedRadius = this.diameter / 2 + puck.diameter / 2; //finds the combined radius of ball and puck

      //checks if the ball and puck are in a collision
      if (d <= combinedRadius) { //if the distance is smaller than the combined radius then their overlapping and if its equal their hitting 
        this.bounceCooldown = 5; //sets cooldown to avoid many collisions over a short period of time
        //calculates the relative position
        //if positive, it goes right
        //if negative, it goes left
        this.speedX = (this.x - puck.x) * 0.3; 
        //if positive, it goes down
        //if negative, it goes up
        this.speedY = (this.y - puck.y) * 0.3; 
        bounce.play(); //plays the sound of the ball bouncing
      }
    } else {
      this.bounceCooldown --; //decreases the cooldown timer
    }
  }

  resetPosition() {
    //resets ball position
    this.x = width/2;
    this.y = height/2;
    //resets puck1s position
    puck.x = width - width/4;
    puck.y = height/2;
    //resets puck2s position
    puck2.x = width/4;
    puck2.y = height/2;
    this.speedX = random(-6, 6); //sets SpeedX value as random of -6 to 6 to go to a random direction
    this.speedY = random(-6, 6); //sets SpeedY value as random of -6 to 6 to go to a random direction
    clap.play(); //plays sound of the crowd clapping 
  }
}