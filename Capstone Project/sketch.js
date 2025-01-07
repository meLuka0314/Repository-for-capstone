// Captone project
// Luka Sullivan
// December 10, 2024
//

let gameStarted = false;
let puck = 60;
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  puck = new Puck();
  ball = new Ball();
  if (!gameStarted) {
    showMenu();
  }
}

function draw() {
  if (gameStarted) {
    drawField();
    puck.display();
    puck.move();
    ball.display();
    ball.move();
  }
}

//creates the menu
function showMenu() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("Puck Soccer", width/2, 250);
  textSize(30);
  text("Press Enter to start", width/2, height/2 + 20);
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
  line(width/2, 120, width/2, height - 120);

  //creates cenetr circle
  ellipse(width/2, height/2, 300);
  
  //creates goals 
  rect(280, height/2 - 120, 20, 240);
  rect(width - 300, height/2 - 120, 20, 240);

  //creates center points
  ellipse(width/2, height/2, 7, 7);
}

class Puck {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.diameter = 60;
    this.speed = 5;
  }

  display() {
    fill(200, 0, 0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed + 0.5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed + 0.5;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }
}

class Ball {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.diameter = 40;
    this.speedX = 6; 
    this.speedY = 6; 
  }
  
  display() {
    fill(0, 0, 200);
    strokeWeight(1);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x - this.diameter/2 <= 300) { //if the ball is going past the left vertical line
      this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.x + this.diameter/2 >= width - 300) { //if the ball is going past the right vertical line
      this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.y - this.diameter/2 <= 120) { //if the ball is going past the top horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.y + this.diameter/2 >= height - 120) { //if the ball is going past the bottom horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
    }











    let d = dist(this.x, this.y, puck.x, puck.y); //distance between the ball and puck
    let combinedRadius = this.diameter/2 + puck.diameter/2; //finds the combined radius which is 50

    if (puck.speed > 0) {
      
      if (d <= combinedRadius+1) { //if
        this.speedX *= -1;
        this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
      }

    }
    

    if (d <= combinedRadius) { //
      //this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
    }
  }
}