var background;
var objAttack;
var objDefend;
var human;
var objAttack;
var objDefend;

var windowsXsize;
var windowsYsize;
var velocityBullet;
var velocityAlient;
var directionOfBullet;
var directionOfAlient;
var bornHuman;
var onColideWithAlient;

var bullet;
var bullets;
var alien;
var aliens;

var score;
var scoreDisplay;
var scoreNeededToWin;
var resetScore;
var alienTimer, alienTimerReset;
var alienFrequency, alienFrequencyReset;

var textFont;
var textColor;

var setup;
var gameEngine = require('./game-engine.js');

async function setup() {

    await gameEngine.loadAssets.then(data => {
        // console.log("Background color: " + data.background);
        // console.log("Human image: " + data.objAttack);
        // console.log("Aliens images: " + data.objDefend);
        // console.log("Velocity of bullets: " + data.velocityBullet + " pixel/frame");
        windowsXsize = data.windowsXsize;
        windowsYsize = data.windowsYsize;
        velocityBullet = data.velocityBullet;
        velocityAlient = data.velocityAlient;
        directionOfBullet = data.directionOfBullet;
        directionOfAlient = data.directionOfAlient;
        onColideWithAlient = data.onColideWithAlient;

        bornHuman = data.bornHuman;
        background = data.background;
        objAttack = data.objAttack;
        objDefend = data.objDefend;

        scoreNeededToWin = data.scoreNeededToWin;
        resetScore = data.resetScore;

        alienTimer  = data.alienTimer;
        alienTimerReset = alienTimer;
        alienFrequency = data.alienFrequency;
        alienFrequencyReset = alienFrequency;

        textColor = data.textColor;
        textFont = data.textFont;
    })

    this.backgroundColor = Math.random() * background;
    human = this.sprite(objAttack);
    human.setScale(0.3, 0.3);
    human.setPivot(0.5, 0.5);

    bullets = [];
    aliens = [];
    scoreDisplay = this.text(score, textFont, textColor,
        windowsXsize - (windowsXsize - 20), windowsYsize - (windowsYsize - 20));
    score = resetScore;
    this.state = play;
}

function play() {

    let self = this;

    this.move(human);
    this.followEase(human, this.pointer, 0.1);
    this.move(bullets);
    this.move(aliens);
    alienTimer++;

//Direction and random

    if (alienTimer === alienFrequency) {
        alien = this.sprite(objDefend);
        alien.setScale(0.3, 0.3);
        alien.tint = Math.random() * 0xFFFFFF;
        alien.states = {
            normal: 0,
            destroyed: 1
        };

        if (directionOfAlient === "TO_RIGHT") {
            TO_RIGHT();
        } else if (directionOfAlient === "TO_LEFT") {
            TO_LEFT();
        } else if (directionOfAlient === "TO_TOP") {
            TO_TOP();
        } else {
            TO_BOTTOM();
        }

        aliens.push(alien);
        alienTimer = alienTimerReset;
        
        if (alienFrequency > 10) {
            alienFrequency = alienFrequency - 10;;
        }
    }

//onClickScreen

    if (bornHuman === "onClickScreen") {
        this.pointer.press = function () {
            //4.71 radians, used in this example, is up. 
            //0 is to the right, 
            //1.57 is down, 
            //and 3.14 is to the left.
            self.shoot(
                human,
                directionOfBullet,
                human.halfWidth - (human.width) / 2,
                -(human.height) / 2,
                self.stage,
                velocityBullet,
                bullets,
                function () {
                    bullet = self.sprite(objDefend);
                    bullet.setScale(0.2, 0.2);
                    return bullet;
                });
        };
    }

//hitTestRectangle

    if(onColideWithAlient === "hitTestRectangle"){
        aliens = aliens.filter(function (alien) {
            var alienIsAlive = true;
            bullets = bullets.filter(function (bullet) {
                if (self.hitTestRectangle(alien, bullet)) {
                    self.remove(bullet);
                    alien.vy = 0;
                    alienIsAlive = false;
                    self.remove(alien);
                    score += 100;
                    return false;
                } else {
                    return true;
                }
            });
            return alienIsAlive;
        });
    }

//Score
    scoreDisplay.content = score;
    if (score === scoreNeededToWin) {
        this.state = end;
    }
    
}

function TO_RIGHT() {
    alien.x = 0 - alien.width;
    alien.y = Math.floor(Math.random() * (windowsYsize));
    console.log("position alien start: " + alien.y);
    alien.vx = velocityAlient;
}

function TO_LEFT() {
    alien.x = windowsXsize - alien.width;
    alien.y = Math.floor(Math.random() * (windowsYsize));
    console.log("Position alien start: " + alien.y);
    alien.vx = 0 - velocityAlient;
}

function TO_TOP() {
    alien.y = windowsYsize - alien.height;
    alien.x = Math.floor(Math.random() * (windowsXsize));
    console.log("position alien start: " + alien.x);
    alien.vy = 0 - velocityAlient;
}

function TO_BOTTOM() {
    alien.y = 0 - alien.height;
    alien.x = Math.floor(Math.random() * (windowsXsize));
    console.log("position alien start: " + alien.x);
    alien.vy = velocityAlient;
}

function end() {

    score = resetScore;
    alienFrequency = alienFrequencyReset;
    alienTimer = alienTimerReset;
    this.remove(aliens);
    this.remove(bullets);
    this.stage.putBottom(human, 0, -40);
    this.state = play;
    this.resume();

}
module.exports = {
    setup: setup
}