/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game-engine.js":
/*!****************************!*\
  !*** ./src/game-engine.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var background;
var objAttack;
var objDefend;
var loadAssets;
var windowsXsize;
var windowsYsize;
var velocityBullet;
var velocityAlient;
var directionOfBullet;
var directionOfAlient;
var bornHuman;
var scoreNeededToWin;
var alienTimer;
var alienFrequency;
var resetScore;
var textFont;
var textColor;

async function loadAssets() {
    var thingsToLoad = ["images/gameScript.json"];
    await $.ajax({
        url: thingsToLoad,
        dataType: "json",
        type: "GET",
        cache: false,
        success: function (data) {
            console.log(data)
            $(data.assets).each(function (index, value) {
                background = String(value.background.bgcolor);
                windowsXsize = String(value.background.windowsXsize);
                windowsYsize = String(value.background.windowsYsize);
                objAttack = String(value.triangular.url);
                objDefend = String(value.circle.url);
                textColor = String(value.text.color);
                textFont = String(value.text.font);
            });
            $(data.actors).each(function (index, value) {
                velocityBullet = value.bullet.lifecycle.rules.velocity;
                velocityAlient = value.alient.lifecycle.rules.velocity;
                directionOfBullet = String(value.bullet.lifecycle.rules.direction);
                directionOfAlient = String(value.alient.lifecycle.rules.direction);
                bornHuman = String(value.bullet.lifecycle.born);
                onColideWithAlient = String(value.bullet.lifecycle.death.onColideWithAlient);
                alienTimer = value.alient.alienTimer;
                alienFrequency = value.alient.alienFrequency;
            });
            $(data.rules).each(function (index, value) {
                scoreNeededToWin = value.score.scoreNeededToWin;
                resetScore = value.score.resetScore;
            });
        }
    });
    let data = {
        background: background,
        objAttack: objAttack,
        objDefend: objDefend,
        windowsXsize,
        windowsYsize,
        velocityBullet,
        velocityAlient,
        directionOfBullet,
        directionOfAlient,
        bornHuman,
        onColideWithAlient,
        scoreNeededToWin,
        alienFrequency,
        alienTimer,
        resetScore,
        textColor,
        textFont
    }
    return data;
}

module.exports = {
    loadAssets: loadAssets()

}

/***/ }),

/***/ "./src/game-setup.js":
/*!***************************!*\
  !*** ./src/game-setup.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var gameEngine = __webpack_require__(/*! ./game-engine.js */ "./src/game-engine.js");

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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const thingToLoad = ["images/gameScript.json"];
const gameSetup = __webpack_require__(/*! ./game-setup.js */ "./src/game-setup.js");
var gameEngine = __webpack_require__(/*! ./game-engine.js */ "./src/game-engine.js");

async function firstload() {
    await gameEngine.loadAssets.then(data => {
        console.log("Windows size: "+data.windowsXsize + "x" + data.windowsYsize +"(pixel)");
     
        x = data.windowsXsize;
        y = data.windowsYsize;
    })
    const g = hexi(x, y, gameSetup.setup);
    g.scaleToWindow();
    g.start();
}
firstload();



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLXNldHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyw4Q0FBa0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ3JOQTtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLDRDQUFpQjtBQUMzQyxpQkFBaUIsbUJBQU8sQ0FBQyw4Q0FBa0I7O0FBRTNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJ2YXIgYmFja2dyb3VuZDtcclxudmFyIG9iakF0dGFjaztcclxudmFyIG9iakRlZmVuZDtcclxudmFyIGxvYWRBc3NldHM7XHJcbnZhciB3aW5kb3dzWHNpemU7XHJcbnZhciB3aW5kb3dzWXNpemU7XHJcbnZhciB2ZWxvY2l0eUJ1bGxldDtcclxudmFyIHZlbG9jaXR5QWxpZW50O1xyXG52YXIgZGlyZWN0aW9uT2ZCdWxsZXQ7XHJcbnZhciBkaXJlY3Rpb25PZkFsaWVudDtcclxudmFyIGJvcm5IdW1hbjtcclxudmFyIHNjb3JlTmVlZGVkVG9XaW47XHJcbnZhciBhbGllblRpbWVyO1xyXG52YXIgYWxpZW5GcmVxdWVuY3k7XHJcbnZhciByZXNldFNjb3JlO1xyXG52YXIgdGV4dEZvbnQ7XHJcbnZhciB0ZXh0Q29sb3I7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQXNzZXRzKCkge1xyXG4gICAgdmFyIHRoaW5nc1RvTG9hZCA9IFtcImltYWdlcy9nYW1lU2NyaXB0Lmpzb25cIl07XHJcbiAgICBhd2FpdCAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdGhpbmdzVG9Mb2FkLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAkKGRhdGEuYXNzZXRzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBTdHJpbmcodmFsdWUuYmFja2dyb3VuZC5iZ2NvbG9yKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NYc2l6ZSA9IFN0cmluZyh2YWx1ZS5iYWNrZ3JvdW5kLndpbmRvd3NYc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzWXNpemUgPSBTdHJpbmcodmFsdWUuYmFja2dyb3VuZC53aW5kb3dzWXNpemUpO1xyXG4gICAgICAgICAgICAgICAgb2JqQXR0YWNrID0gU3RyaW5nKHZhbHVlLnRyaWFuZ3VsYXIudXJsKTtcclxuICAgICAgICAgICAgICAgIG9iakRlZmVuZCA9IFN0cmluZyh2YWx1ZS5jaXJjbGUudXJsKTtcclxuICAgICAgICAgICAgICAgIHRleHRDb2xvciA9IFN0cmluZyh2YWx1ZS50ZXh0LmNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRleHRGb250ID0gU3RyaW5nKHZhbHVlLnRleHQuZm9udCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKGRhdGEuYWN0b3JzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QnVsbGV0ID0gdmFsdWUuYnVsbGV0LmxpZmVjeWNsZS5ydWxlcy52ZWxvY2l0eTtcclxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QWxpZW50ID0gdmFsdWUuYWxpZW50LmxpZmVjeWNsZS5ydWxlcy52ZWxvY2l0eTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbk9mQnVsbGV0ID0gU3RyaW5nKHZhbHVlLmJ1bGxldC5saWZlY3ljbGUucnVsZXMuZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbk9mQWxpZW50ID0gU3RyaW5nKHZhbHVlLmFsaWVudC5saWZlY3ljbGUucnVsZXMuZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJvcm5IdW1hbiA9IFN0cmluZyh2YWx1ZS5idWxsZXQubGlmZWN5Y2xlLmJvcm4pO1xyXG4gICAgICAgICAgICAgICAgb25Db2xpZGVXaXRoQWxpZW50ID0gU3RyaW5nKHZhbHVlLmJ1bGxldC5saWZlY3ljbGUuZGVhdGgub25Db2xpZGVXaXRoQWxpZW50KTtcclxuICAgICAgICAgICAgICAgIGFsaWVuVGltZXIgPSB2YWx1ZS5hbGllbnQuYWxpZW5UaW1lcjtcclxuICAgICAgICAgICAgICAgIGFsaWVuRnJlcXVlbmN5ID0gdmFsdWUuYWxpZW50LmFsaWVuRnJlcXVlbmN5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChkYXRhLnJ1bGVzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlTmVlZGVkVG9XaW4gPSB2YWx1ZS5zY29yZS5zY29yZU5lZWRlZFRvV2luO1xyXG4gICAgICAgICAgICAgICAgcmVzZXRTY29yZSA9IHZhbHVlLnNjb3JlLnJlc2V0U2NvcmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogYmFja2dyb3VuZCxcclxuICAgICAgICBvYmpBdHRhY2s6IG9iakF0dGFjayxcclxuICAgICAgICBvYmpEZWZlbmQ6IG9iakRlZmVuZCxcclxuICAgICAgICB3aW5kb3dzWHNpemUsXHJcbiAgICAgICAgd2luZG93c1lzaXplLFxyXG4gICAgICAgIHZlbG9jaXR5QnVsbGV0LFxyXG4gICAgICAgIHZlbG9jaXR5QWxpZW50LFxyXG4gICAgICAgIGRpcmVjdGlvbk9mQnVsbGV0LFxyXG4gICAgICAgIGRpcmVjdGlvbk9mQWxpZW50LFxyXG4gICAgICAgIGJvcm5IdW1hbixcclxuICAgICAgICBvbkNvbGlkZVdpdGhBbGllbnQsXHJcbiAgICAgICAgc2NvcmVOZWVkZWRUb1dpbixcclxuICAgICAgICBhbGllbkZyZXF1ZW5jeSxcclxuICAgICAgICBhbGllblRpbWVyLFxyXG4gICAgICAgIHJlc2V0U2NvcmUsXHJcbiAgICAgICAgdGV4dENvbG9yLFxyXG4gICAgICAgIHRleHRGb250XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2FkQXNzZXRzOiBsb2FkQXNzZXRzKClcclxuXHJcbn0iLCJ2YXIgYmFja2dyb3VuZDtcclxudmFyIG9iakF0dGFjaztcclxudmFyIG9iakRlZmVuZDtcclxudmFyIGh1bWFuO1xyXG52YXIgb2JqQXR0YWNrO1xyXG52YXIgb2JqRGVmZW5kO1xyXG5cclxudmFyIHdpbmRvd3NYc2l6ZTtcclxudmFyIHdpbmRvd3NZc2l6ZTtcclxudmFyIHZlbG9jaXR5QnVsbGV0O1xyXG52YXIgdmVsb2NpdHlBbGllbnQ7XHJcbnZhciBkaXJlY3Rpb25PZkJ1bGxldDtcclxudmFyIGRpcmVjdGlvbk9mQWxpZW50O1xyXG52YXIgYm9ybkh1bWFuO1xyXG52YXIgb25Db2xpZGVXaXRoQWxpZW50O1xyXG5cclxudmFyIGJ1bGxldDtcclxudmFyIGJ1bGxldHM7XHJcbnZhciBhbGllbjtcclxudmFyIGFsaWVucztcclxuXHJcbnZhciBzY29yZTtcclxudmFyIHNjb3JlRGlzcGxheTtcclxudmFyIHNjb3JlTmVlZGVkVG9XaW47XHJcbnZhciByZXNldFNjb3JlO1xyXG52YXIgYWxpZW5UaW1lciwgYWxpZW5UaW1lclJlc2V0O1xyXG52YXIgYWxpZW5GcmVxdWVuY3ksIGFsaWVuRnJlcXVlbmN5UmVzZXQ7XHJcblxyXG52YXIgdGV4dEZvbnQ7XHJcbnZhciB0ZXh0Q29sb3I7XHJcblxyXG52YXIgc2V0dXA7XHJcbnZhciBnYW1lRW5naW5lID0gcmVxdWlyZSgnLi9nYW1lLWVuZ2luZS5qcycpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcblxyXG4gICAgYXdhaXQgZ2FtZUVuZ2luZS5sb2FkQXNzZXRzLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kIGNvbG9yOiBcIiArIGRhdGEuYmFja2dyb3VuZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIdW1hbiBpbWFnZTogXCIgKyBkYXRhLm9iakF0dGFjayk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGllbnMgaW1hZ2VzOiBcIiArIGRhdGEub2JqRGVmZW5kKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlbG9jaXR5IG9mIGJ1bGxldHM6IFwiICsgZGF0YS52ZWxvY2l0eUJ1bGxldCArIFwiIHBpeGVsL2ZyYW1lXCIpO1xyXG4gICAgICAgIHdpbmRvd3NYc2l6ZSA9IGRhdGEud2luZG93c1hzaXplO1xyXG4gICAgICAgIHdpbmRvd3NZc2l6ZSA9IGRhdGEud2luZG93c1lzaXplO1xyXG4gICAgICAgIHZlbG9jaXR5QnVsbGV0ID0gZGF0YS52ZWxvY2l0eUJ1bGxldDtcclxuICAgICAgICB2ZWxvY2l0eUFsaWVudCA9IGRhdGEudmVsb2NpdHlBbGllbnQ7XHJcbiAgICAgICAgZGlyZWN0aW9uT2ZCdWxsZXQgPSBkYXRhLmRpcmVjdGlvbk9mQnVsbGV0O1xyXG4gICAgICAgIGRpcmVjdGlvbk9mQWxpZW50ID0gZGF0YS5kaXJlY3Rpb25PZkFsaWVudDtcclxuICAgICAgICBvbkNvbGlkZVdpdGhBbGllbnQgPSBkYXRhLm9uQ29saWRlV2l0aEFsaWVudDtcclxuXHJcbiAgICAgICAgYm9ybkh1bWFuID0gZGF0YS5ib3JuSHVtYW47XHJcbiAgICAgICAgYmFja2dyb3VuZCA9IGRhdGEuYmFja2dyb3VuZDtcclxuICAgICAgICBvYmpBdHRhY2sgPSBkYXRhLm9iakF0dGFjaztcclxuICAgICAgICBvYmpEZWZlbmQgPSBkYXRhLm9iakRlZmVuZDtcclxuXHJcbiAgICAgICAgc2NvcmVOZWVkZWRUb1dpbiA9IGRhdGEuc2NvcmVOZWVkZWRUb1dpbjtcclxuICAgICAgICByZXNldFNjb3JlID0gZGF0YS5yZXNldFNjb3JlO1xyXG5cclxuICAgICAgICBhbGllblRpbWVyICA9IGRhdGEuYWxpZW5UaW1lcjtcclxuICAgICAgICBhbGllblRpbWVyUmVzZXQgPSBhbGllblRpbWVyO1xyXG4gICAgICAgIGFsaWVuRnJlcXVlbmN5ID0gZGF0YS5hbGllbkZyZXF1ZW5jeTtcclxuICAgICAgICBhbGllbkZyZXF1ZW5jeVJlc2V0ID0gYWxpZW5GcmVxdWVuY3k7XHJcblxyXG4gICAgICAgIHRleHRDb2xvciA9IGRhdGEudGV4dENvbG9yO1xyXG4gICAgICAgIHRleHRGb250ID0gZGF0YS50ZXh0Rm9udDtcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBNYXRoLnJhbmRvbSgpICogYmFja2dyb3VuZDtcclxuICAgIGh1bWFuID0gdGhpcy5zcHJpdGUob2JqQXR0YWNrKTtcclxuICAgIGh1bWFuLnNldFNjYWxlKDAuMywgMC4zKTtcclxuICAgIGh1bWFuLnNldFBpdm90KDAuNSwgMC41KTtcclxuXHJcbiAgICBidWxsZXRzID0gW107XHJcbiAgICBhbGllbnMgPSBbXTtcclxuICAgIHNjb3JlRGlzcGxheSA9IHRoaXMudGV4dChzY29yZSwgdGV4dEZvbnQsIHRleHRDb2xvcixcclxuICAgICAgICB3aW5kb3dzWHNpemUgLSAod2luZG93c1hzaXplIC0gMjApLCB3aW5kb3dzWXNpemUgLSAod2luZG93c1lzaXplIC0gMjApKTtcclxuICAgIHNjb3JlID0gcmVzZXRTY29yZTtcclxuICAgIHRoaXMuc3RhdGUgPSBwbGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5KCkge1xyXG5cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLm1vdmUoaHVtYW4pO1xyXG4gICAgdGhpcy5mb2xsb3dFYXNlKGh1bWFuLCB0aGlzLnBvaW50ZXIsIDAuMSk7XHJcbiAgICB0aGlzLm1vdmUoYnVsbGV0cyk7XHJcbiAgICB0aGlzLm1vdmUoYWxpZW5zKTtcclxuICAgIGFsaWVuVGltZXIrKztcclxuXHJcbi8vRGlyZWN0aW9uIGFuZCByYW5kb21cclxuXHJcbiAgICBpZiAoYWxpZW5UaW1lciA9PT0gYWxpZW5GcmVxdWVuY3kpIHtcclxuICAgICAgICBhbGllbiA9IHRoaXMuc3ByaXRlKG9iakRlZmVuZCk7XHJcbiAgICAgICAgYWxpZW4uc2V0U2NhbGUoMC4zLCAwLjMpO1xyXG4gICAgICAgIGFsaWVuLnRpbnQgPSBNYXRoLnJhbmRvbSgpICogMHhGRkZGRkY7XHJcbiAgICAgICAgYWxpZW4uc3RhdGVzID0ge1xyXG4gICAgICAgICAgICBub3JtYWw6IDAsXHJcbiAgICAgICAgICAgIGRlc3Ryb3llZDogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChkaXJlY3Rpb25PZkFsaWVudCA9PT0gXCJUT19SSUdIVFwiKSB7XHJcbiAgICAgICAgICAgIFRPX1JJR0hUKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb25PZkFsaWVudCA9PT0gXCJUT19MRUZUXCIpIHtcclxuICAgICAgICAgICAgVE9fTEVGVCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uT2ZBbGllbnQgPT09IFwiVE9fVE9QXCIpIHtcclxuICAgICAgICAgICAgVE9fVE9QKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVE9fQk9UVE9NKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGllbnMucHVzaChhbGllbik7XHJcbiAgICAgICAgYWxpZW5UaW1lciA9IGFsaWVuVGltZXJSZXNldDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYWxpZW5GcmVxdWVuY3kgPiAxMCkge1xyXG4gICAgICAgICAgICBhbGllbkZyZXF1ZW5jeSA9IGFsaWVuRnJlcXVlbmN5IC0gMTA7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbi8vb25DbGlja1NjcmVlblxyXG5cclxuICAgIGlmIChib3JuSHVtYW4gPT09IFwib25DbGlja1NjcmVlblwiKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyLnByZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLzQuNzEgcmFkaWFucywgdXNlZCBpbiB0aGlzIGV4YW1wbGUsIGlzIHVwLiBcclxuICAgICAgICAgICAgLy8wIGlzIHRvIHRoZSByaWdodCwgXHJcbiAgICAgICAgICAgIC8vMS41NyBpcyBkb3duLCBcclxuICAgICAgICAgICAgLy9hbmQgMy4xNCBpcyB0byB0aGUgbGVmdC5cclxuICAgICAgICAgICAgc2VsZi5zaG9vdChcclxuICAgICAgICAgICAgICAgIGh1bWFuLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uT2ZCdWxsZXQsXHJcbiAgICAgICAgICAgICAgICBodW1hbi5oYWxmV2lkdGggLSAoaHVtYW4ud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgIC0oaHVtYW4uaGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgICAgICBzZWxmLnN0YWdlLFxyXG4gICAgICAgICAgICAgICAgdmVsb2NpdHlCdWxsZXQsXHJcbiAgICAgICAgICAgICAgICBidWxsZXRzLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldCA9IHNlbGYuc3ByaXRlKG9iakRlZmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LnNldFNjYWxlKDAuMiwgMC4yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVsbGV0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbi8vaGl0VGVzdFJlY3RhbmdsZVxyXG5cclxuICAgIGlmKG9uQ29saWRlV2l0aEFsaWVudCA9PT0gXCJoaXRUZXN0UmVjdGFuZ2xlXCIpe1xyXG4gICAgICAgIGFsaWVucyA9IGFsaWVucy5maWx0ZXIoZnVuY3Rpb24gKGFsaWVuKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGllbklzQWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBidWxsZXRzID0gYnVsbGV0cy5maWx0ZXIoZnVuY3Rpb24gKGJ1bGxldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuaGl0VGVzdFJlY3RhbmdsZShhbGllbiwgYnVsbGV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKGJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZW4udnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWVuSXNBbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKGFsaWVuKTtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGllbklzQWxpdmU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vL1Njb3JlXHJcbiAgICBzY29yZURpc3BsYXkuY29udGVudCA9IHNjb3JlO1xyXG4gICAgaWYgKHNjb3JlID09PSBzY29yZU5lZWRlZFRvV2luKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGVuZDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBUT19SSUdIVCgpIHtcclxuICAgIGFsaWVuLnggPSAwIC0gYWxpZW4ud2lkdGg7XHJcbiAgICBhbGllbi55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHdpbmRvd3NZc2l6ZSkpO1xyXG4gICAgY29uc29sZS5sb2coXCJwb3NpdGlvbiBhbGllbiBzdGFydDogXCIgKyBhbGllbi55KTtcclxuICAgIGFsaWVuLnZ4ID0gdmVsb2NpdHlBbGllbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFRPX0xFRlQoKSB7XHJcbiAgICBhbGllbi54ID0gd2luZG93c1hzaXplIC0gYWxpZW4ud2lkdGg7XHJcbiAgICBhbGllbi55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHdpbmRvd3NZc2l6ZSkpO1xyXG4gICAgY29uc29sZS5sb2coXCJQb3NpdGlvbiBhbGllbiBzdGFydDogXCIgKyBhbGllbi55KTtcclxuICAgIGFsaWVuLnZ4ID0gMCAtIHZlbG9jaXR5QWxpZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBUT19UT1AoKSB7XHJcbiAgICBhbGllbi55ID0gd2luZG93c1lzaXplIC0gYWxpZW4uaGVpZ2h0O1xyXG4gICAgYWxpZW4ueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh3aW5kb3dzWHNpemUpKTtcclxuICAgIGNvbnNvbGUubG9nKFwicG9zaXRpb24gYWxpZW4gc3RhcnQ6IFwiICsgYWxpZW4ueCk7XHJcbiAgICBhbGllbi52eSA9IDAgLSB2ZWxvY2l0eUFsaWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gVE9fQk9UVE9NKCkge1xyXG4gICAgYWxpZW4ueSA9IDAgLSBhbGllbi5oZWlnaHQ7XHJcbiAgICBhbGllbi54ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHdpbmRvd3NYc2l6ZSkpO1xyXG4gICAgY29uc29sZS5sb2coXCJwb3NpdGlvbiBhbGllbiBzdGFydDogXCIgKyBhbGllbi54KTtcclxuICAgIGFsaWVuLnZ5ID0gdmVsb2NpdHlBbGllbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuZCgpIHtcclxuXHJcbiAgICBzY29yZSA9IHJlc2V0U2NvcmU7XHJcbiAgICBhbGllbkZyZXF1ZW5jeSA9IGFsaWVuRnJlcXVlbmN5UmVzZXQ7XHJcbiAgICBhbGllblRpbWVyID0gYWxpZW5UaW1lclJlc2V0O1xyXG4gICAgdGhpcy5yZW1vdmUoYWxpZW5zKTtcclxuICAgIHRoaXMucmVtb3ZlKGJ1bGxldHMpO1xyXG4gICAgdGhpcy5zdGFnZS5wdXRCb3R0b20oaHVtYW4sIDAsIC00MCk7XHJcbiAgICB0aGlzLnN0YXRlID0gcGxheTtcclxuICAgIHRoaXMucmVzdW1lKCk7XHJcblxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgc2V0dXA6IHNldHVwXHJcbn0iLCIvLyBjb25zdCB0aGluZ1RvTG9hZCA9IFtcImltYWdlcy9nYW1lU2NyaXB0Lmpzb25cIl07XHJcbmNvbnN0IGdhbWVTZXR1cCA9IHJlcXVpcmUoJy4vZ2FtZS1zZXR1cC5qcycpO1xyXG52YXIgZ2FtZUVuZ2luZSA9IHJlcXVpcmUoJy4vZ2FtZS1lbmdpbmUuanMnKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZpcnN0bG9hZCgpIHtcclxuICAgIGF3YWl0IGdhbWVFbmdpbmUubG9hZEFzc2V0cy50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2luZG93cyBzaXplOiBcIitkYXRhLndpbmRvd3NYc2l6ZSArIFwieFwiICsgZGF0YS53aW5kb3dzWXNpemUgK1wiKHBpeGVsKVwiKTtcclxuICAgICBcclxuICAgICAgICB4ID0gZGF0YS53aW5kb3dzWHNpemU7XHJcbiAgICAgICAgeSA9IGRhdGEud2luZG93c1lzaXplO1xyXG4gICAgfSlcclxuICAgIGNvbnN0IGcgPSBoZXhpKHgsIHksIGdhbWVTZXR1cC5zZXR1cCk7XHJcbiAgICBnLnNjYWxlVG9XaW5kb3coKTtcclxuICAgIGcuc3RhcnQoKTtcclxufVxyXG5maXJzdGxvYWQoKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=