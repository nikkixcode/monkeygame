let monkey;
let bananaImg;
let monkeyImg;
let monkeyX = 100;
let monkeyY = 300;
let monkeyVelY = 0;
let gravity = 0.5;
let jumpPower = -10;
let groundY = 300;
let bananaPeels = [];
let score = 0;
let obstacleFrequency = 1500;
let lastObstacleTime = 0;

function preload() {
    monkeyImg = loadImage('assets/monkey.png');  
    bananaImg = loadImage('assets/banana_peel.png');
}

function setup() {
    createCanvas(800, 400);
    textSize(24);
    textAlign(LEFT);
}

function draw() {
    background(255);

    // display monkey with gravity? idk
    image(monkeyImg, monkeyX, monkeyY, 50, 50);
    monkeyVelY += gravity;
    monkeyY += monkeyVelY;

    if (monkeyY > groundY) {
        monkeyY = groundY;
        monkeyVelY = 0;
    }

    // add some bananas!
    if (millis() - lastObstacleTime > obstacleFrequency) {
        bananaPeels.push({ x: width, y: groundY + 20 });
        lastObstacleTime = millis();
    }

    // move the bananas 
    for (let i = bananaPeels.length - 1; i >= 0; i--) {
        let banana = bananaPeels[i];
        image(bananaImg, banana.x, banana.y, 30, 30);
        banana.x -= 5;

        if (monkeyX + 50 > banana.x && monkeyX < banana.x + 30 &&
            monkeyY + 50 > banana.y && monkeyY < banana.y + 30) {
            noLoop();  // end game!
            text("Game Over", width / 2 - 50, height / 2);
        }

        // remove bananas that move  off screen
        if (banana.x < -30) {
            bananaPeels.splice(i, 1);
            score++;
        }
    }

    // display the final score!!
    fill(0);
    text("Score: " + score, 10, 30);
}

function keyPressed() {
    if (key === ' ' && monkeyY === groundY) {
        monkeyVelY = jumpPower;
    }
}
