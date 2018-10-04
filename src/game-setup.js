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

var bullet;
var bullets;
var alien;
var aliens;

var score;
var scoreDisplay;
var scoreNeededToWin;

var setup;
var gameEngine = require('./game-engine.js');

async function setup() {

    await gameEngine.loadAssets.then(data => {
        console.log("Background color: " + data.background);
        console.log("Human image: " + data.objAttack);
        console.log("Aliens images: " + data.objDefend);
        console.log("Velocity of bullets: " + data.velocityBullet + " pixel/frame");
        windowsXsize = data.windowsXsize;
        windowsYsize = data.windowsYsize;
        velocityBullet = data.velocityBullet;
        velocityAlient = data.velocityAlient;
        directionOfBullet = data.directionOfBullet;
        background = data.background;
        objAttack = data.objAttack;
        objDefend = data.objDefend;
    })

    // console.log(background);
    this.backgroundColor = Math.random() * background;
    human = this.sprite(objAttack);
    // alien = this.sprite(objDefend);
    // bullet = this.sprite(objDefend);
    human.setScale(0.3, 0.3);
    human.setPivot(0.5, 0.5);
    // alien.setScale(0.3, 0, 3);
    // bullet.setScale(0.2, 0.2);

    bullets = [];
    aliens = [];
    scoreDisplay = this.text("10", "50px emulogic", "#ffffff",
        this.canvas.width - (this.canvas.width - 20), 10);
    score = 100;
    scoreNeededToWin = 300;
    alienTimer = 0;
    alienFrequency = 100;

    this.state = play;
}

function play() {

    let self = this;

    this.move(human);
    this.followEase(human, this.pointer, 0.1);
    this.move(bullets);
    this.move(aliens);

    alienTimer++;
    if (alienTimer === alienFrequency) {
        alien = this.sprite(objDefend);
        alien.setScale(0.3, 0.3);
        alien.tint = Math.random() * 0xFFFFFF;
        alien.states = {
            normal: 0,
            destroyed: 1
        };
        // alien.y = 0 - alien.height;
        // alien.x = this.randomInt(0, windowsXsize);
        // console.log("position alien start: " + alien.x);
        // alien.vy = 1;

        alien.x = 0 - alien.width;
        alien.y = this.randomInt(0, windowsYsize);
        console.log("position alien start: " + alien.y);
        alien.vx = 1;

        aliens.push(alien);
        alienTimer = 0;
        if (alienFrequency > 2) {
            alienFrequency--;
        }
    }
    this.pointer.press = function () {

        //4.71 radians, used in this example, is up. 
        //0 is to the right, 
        //1.57 is down, 
        //and 3.14 is to the left.

        self.shoot(
            human, 
            directionOfBullet, 
            human.halfWidth - (human.width)/2, 
            - (human.height)/2, 
            self.stage, 
            velocityBullet, 
            bullets,
            function () {
                bullet = self.sprite(objDefend);
                bullet.setScale(0.2, 0.2);
                return bullet;
            });
    };
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
    scoreDisplay.content = score;
    if (score === scoreNeededToWin || score <= 0) {
        this.state = end;
    }
}


function end() {

    score = 100;
    alienFrequency = 100;
    alienTimer = 0;

    this.remove(aliens);
    this.remove(bullets);
    this.stage.putBottom(human, 0, -40);
    this.state = play;
    this.resume();

}

module.exports = {
    setup: setup
}