// Captone project
// Luka Sullivan
// December 10, 2024
//

let gameStarted = false;
let puck;
let ball;
let scoreLeft = 0;
let scoreRight = 0;

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
    displayScores();
    puck.display();
    puck.move();
    puck2.display();
    puck2.move();
    ball.display();
    ball.move();
  }
}

<<<<<<< Updated upstream
function Spectator(x, y) {
  let r = random(int(255));
  let g = random(int(255));
  let b = random(int(255));

    

  //bottom
  if (random(100) < 50) {
    random(fill(r, g, b));  
    strokeWeight(1);
    ellipse(x + random(-3,3), y + random(-3,3), 15); //bottom

  } else {
    random(fill(r, g, b));  
    strokeWeight(1);  
    rect(x - 7.5 + random(-3,3), y - 7.5 + random(-3,3), 15);   //right
=======
function displayScores(){
  fill(255);
  textSize(50);
  text(scoreLeft, width/4, 80);
  text(scoreRight, width - width/4, 80);
}

function drawSpectator(x, y) {
    let r = random(int(255));
    let g = random(int(255));
    let b = random(int(255));

    if (random(100) < 50) {
      random(fill(r, g, b));  
      strokeWeight(1);
        ellipse(x + random(-5,5), y + random(-5,5), 15); //bottom
    } else {
      random(fill(r, g, b));  
      strokeWeight(1);  
        rect(x - 7.5, y - 7.5, 15);  
        }
      }

function Spectators() {
  randomSeed(1);
  let spacing = 20;
  let fieldLeft = 300;
  let fieldRight = width - 300;
  let fieldTop = 120;
  let fieldBottom = height - 120;

  for (let y = fieldTop - 80; y > 0; y -= spacing) {
    for (let x = fieldLeft; x < fieldRight; x += spacing) {
      drawSpectator(x, y);
    }
  }

  for (let y = fieldBottom + 80; y < height; y += spacing) {
    for (let x = fieldLeft; x < fieldRight; x += spacing) {
      drawSpectator(x, y);
    }
  }

  for (let x = fieldLeft - 80; x > 0; x -= spacing) {
    for (let y = fieldTop; y < fieldBottom; y += spacing) {
      drawSpectator(x, y);
    }
  }

  for (let x = fieldRight + 80; x < width; x += spacing) {
    for (let y = fieldTop; y < fieldBottom; y += spacing) {
      drawSpectator(x, y);
    }
  }
>>>>>>> Stashed changes
}







function Spectators() {
  randomSeed(1);
  let spacing = 20;
  let fieldLeft = 300;
  let fieldRight = width - 300;
  let fieldTop = 120;
  let fieldBottom = height - 120;

  for (let y = fieldTop - 40; y > 0; y -= spacing) {
    for (let x = fieldLeft; x < fieldRight; x += spacing) {
      Spectator(x, y);
    }
  }

  for (let y = fieldBottom + 40; y < height; y += spacing) {
    for (let x = fieldLeft; x < fieldRight; x += spacing) {
      Spectator(x, y);
    }
  }

  for (let x = fieldLeft - 80; x > 0; x -= spacing) {
    for (let y = fieldTop; y < fieldBottom; y += spacing) {
      Spectator(x, y);
    }
  }

  for (let x = fieldRight + 80; x < width; x += spacing) {
    for (let y = fieldTop; y < fieldBottom; y += spacing) {
      Spectator(x, y);
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
    if (keyIsDown(65)) {
      this.x -= this.speed + 0.5;
    }

    if (keyIsDown(68)) {
      this.x += this.speed + 0.5;
    }

    if (keyIsDown(87)) {
      this.y -= this.speed;
    }

    if (keyIsDown(83)) {
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
    this.bounceCooldown2 = 0;
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
      if (this.y - this.diameter/2 <= height - 300) {
        this.speedX *= -1; //switches the direction to the opposite way by making the speed nagative
      }
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



    //Checks for goals
    if (this.x - this.diameter/2 <= 300) {
      if (this.y >= height/2 - 120) {
        if (this.y <= height/2 + 120) {
          this.resetPosition();
          scoreRight++;
        }
      }
    }
    if (this.x + this.diameter/2 >= width - 300) {
      if (this.y >= height/2 - 120) {
        if (this.y <= height/2 + 120){
          this.resetPosition();
          scoreLeft++;
        }
      }
    }


    









    //puck
    if (this.bounceCooldown === 0) {
      let d = dist(this.x, this.y, puck.x, puck.y); //distance between the ball and puck
      let d2 = dist(this.x, this.y, puck2.x, puck2.y); //distance between the ball and puck

      let combinedRadius = this.diameter / 2 + puck.diameter / 2; //finds the combined radius which is 50
      let combinedRadius2 = this.diameter / 2 + puck2.diameter / 2; //finds the combined radius which is 50

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


    //puck2
    if (this.bounceCooldown === 0) {
      let d2 = dist(this.x, this.y, puck2.x, puck2.y); //distance between the ball and puck
      let combinedRadius2 = this.diameter / 2 + puck2.diameter / 2; //finds the combined radius which is 50

      if (puck.speed > 0) {

        if (d2 <= combinedRadius2) { //if
          this.bounceCooldown2 = 5;
          if (this.y <= puck2.y - puck2.diameter / 2) {
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
      this.bounceCooldown2 --;
    }



  }
<<<<<<< Updated upstream
    if (puck2.speed > 0) {

      if (d <= combinedRadius2) { //if
        this.bounceCooldown = 5;
        if (this.y <= puck2.y - puck2.diameter / 2) {
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

  } else {
    this.bounceCooldown --;
  }
}

  
=======

  resetPosition() {
    this.x = width/2;
    this.y = height/2;
    this.speedX = random(-6, 6);
    this.speedY = random(-6, 6);
  }
>>>>>>> Stashed changes
}