// Captone project
// Luka Sullivan
// December 10, 2024
//

let gameStarted = false;
let puck = 60;
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  puck2 = new Puck2();
  puck = new Puck();
  ball = new Ball();
  if (!gameStarted) {
    showMenu();
  }
}

function draw() {
  if (gameStarted) {
    drawField();
    Spectators();
    puck.display();
    puck.move();
    puck2.display();
    puck2.move();
    ball.display();
    ball.move();
  }
}

function Spectators() {

  randomSeed(1);
  for (let i = 0; i < 50; i++) {
    let r = random(int(255));
    let g = random(int(255));
    let b = random(int(255));
    if (random(100) < 50) {
      random(fill(r, g, b));  
      strokeWeight(1);
      ellipse(20 + 38 * i, height/12, 40);
    } else {
      random(fill(r, g, b));  
      strokeWeight(1);  
      rect(0 + 38 * i, height/12 - 20, 40);  
    }
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

class Puck {
  constructor() {
    this.x = width - 400;
    this.y = height / 2;
    this.diameter = 60;
    this.speed = 4;
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

class Puck2 {
  constructor() {
    this.x = width / 5;
    this.y = height / 2;
    this.diameter = 60;
    this.speed = 4;
  }

  display() {
    fill(0, 200, 0);
    strokeWeight(4);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    if (keyCode === a) {
      this.x -= this.speed + 0.5;
    }

    if (keyCode === d) {
      this.x += this.speed + 0.5;
    }

    if (keyCode === w) {
      this.y -= this.speed;
    }

    if (keyCode === d) {
      this.y += this.speed;
    }
  }


}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 40;
    this.speedX = 6;
    this.speedY = 6;
    this.bounceCooldown = 0;
    this.position = this.x, this.y;
  }

  display() {
    fill(0, 0, 200);
    strokeWeight(0);
    ellipse(this.x, this.y, this.diameter);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX *= 0.99;
    this.speedY *= 0.99;



    if (this.x - this.diameter / 2 <= 300) { //if the ball is going past the left vertical line
      this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.x + this.diameter / 2 >= width - 300) { //if the ball is going past the right vertical line
      this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.y - this.diameter / 2 <= 120) { //if the ball is going past the top horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
    }

    if (this.y + this.diameter / 2 >= height - 120) { //if the ball is going past the bottom horizontal line
      this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
    }










    if (this.bounceCooldown === 0) {
      let d = dist(this.x, this.y, puck.x, puck.y); //distance between the ball and puck
      let combinedRadius = this.diameter / 2 + puck.diameter / 2; //finds the combined radius which is 50

      if (puck.speed > 0) {

        if (d <= combinedRadius) { //if
          this.bounceCooldown = 5;
          if (this.y <= puck.y - puck.diameter / 2) {
            this.speedY *= -1;


          } else {
            this.speedX *= -1;
            this.speedY *= -1; //switches the direction to the opposite way by making the speed nagative
            if (this.speedX < 0) {
              this.speedX -= 5;
            }
            if (this.speedY < 0) {
              this.speedY -= 5;
            }
            if (this.speedX > 0) {
              this.speedX += 5;
            }
            if (this.speedY > 0) {
              this.speedY += 5;
            }
          }
        }

      }
    } else {
      this.bounceCooldown --;
    }



  }
}