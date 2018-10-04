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

                // console.log(background)
            });
            $(data.actors).each(function (index, value) {
                velocityBullet = String(value.bullet.lifecycle.rules.velocity);
                velocityAlient = String(value.alient.lifecycle.rules.velocity);
                directionOfBullet = String(value.bullet.lifecycle.rules.direction);
                directionOfAlient = String(value.alient.lifecycle.rules.direction);

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
        directionOfAlient
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

var bullet;
var bullets;
var alien;
var aliens;

var score;
var scoreDisplay;
var scoreNeededToWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUtZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLXNldHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQzs7Ozs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyw4Q0FBa0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDL0pBO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMsNENBQWlCO0FBQzNDLGlCQUFpQixtQkFBTyxDQUFDLDhDQUFrQjs7QUFFM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciBiYWNrZ3JvdW5kO1xyXG52YXIgb2JqQXR0YWNrO1xyXG52YXIgb2JqRGVmZW5kO1xyXG52YXIgbG9hZEFzc2V0cztcclxudmFyIHdpbmRvd3NYc2l6ZTtcclxudmFyIHdpbmRvd3NZc2l6ZTtcclxudmFyIHZlbG9jaXR5QnVsbGV0O1xyXG52YXIgdmVsb2NpdHlBbGllbnQ7XHJcbnZhciBkaXJlY3Rpb25PZkJ1bGxldDtcclxudmFyIGRpcmVjdGlvbk9mQWxpZW50O1xyXG5hc3luYyBmdW5jdGlvbiBsb2FkQXNzZXRzKCkge1xyXG4gICAgdmFyIHRoaW5nc1RvTG9hZCA9IFtcImltYWdlcy9nYW1lU2NyaXB0Lmpzb25cIl07XHJcbiAgICBhd2FpdCAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdGhpbmdzVG9Mb2FkLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAkKGRhdGEuYXNzZXRzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBTdHJpbmcodmFsdWUuYmFja2dyb3VuZC5iZ2NvbG9yKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3NYc2l6ZSA9IFN0cmluZyh2YWx1ZS5iYWNrZ3JvdW5kLndpbmRvd3NYc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dzWXNpemUgPSBTdHJpbmcodmFsdWUuYmFja2dyb3VuZC53aW5kb3dzWXNpemUpO1xyXG4gICAgICAgICAgICAgICAgb2JqQXR0YWNrID0gU3RyaW5nKHZhbHVlLnRyaWFuZ3VsYXIudXJsKTtcclxuICAgICAgICAgICAgICAgIG9iakRlZmVuZCA9IFN0cmluZyh2YWx1ZS5jaXJjbGUudXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYWNrZ3JvdW5kKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChkYXRhLmFjdG9ycykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eUJ1bGxldCA9IFN0cmluZyh2YWx1ZS5idWxsZXQubGlmZWN5Y2xlLnJ1bGVzLnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgIHZlbG9jaXR5QWxpZW50ID0gU3RyaW5nKHZhbHVlLmFsaWVudC5saWZlY3ljbGUucnVsZXMudmVsb2NpdHkpO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uT2ZCdWxsZXQgPSBTdHJpbmcodmFsdWUuYnVsbGV0LmxpZmVjeWNsZS5ydWxlcy5kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uT2ZBbGllbnQgPSBTdHJpbmcodmFsdWUuYWxpZW50LmxpZmVjeWNsZS5ydWxlcy5kaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogYmFja2dyb3VuZCxcclxuICAgICAgICBvYmpBdHRhY2s6IG9iakF0dGFjayxcclxuICAgICAgICBvYmpEZWZlbmQ6IG9iakRlZmVuZCxcclxuICAgICAgICB3aW5kb3dzWHNpemUsXHJcbiAgICAgICAgd2luZG93c1lzaXplLFxyXG4gICAgICAgIHZlbG9jaXR5QnVsbGV0LFxyXG4gICAgICAgIHZlbG9jaXR5QWxpZW50LFxyXG4gICAgICAgIGRpcmVjdGlvbk9mQnVsbGV0LFxyXG4gICAgICAgIGRpcmVjdGlvbk9mQWxpZW50XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2FkQXNzZXRzOiBsb2FkQXNzZXRzKClcclxuXHJcbn0iLCJ2YXIgYmFja2dyb3VuZDtcclxudmFyIG9iakF0dGFjaztcclxudmFyIG9iakRlZmVuZDtcclxudmFyIGh1bWFuO1xyXG52YXIgb2JqQXR0YWNrO1xyXG52YXIgb2JqRGVmZW5kO1xyXG5cclxudmFyIHdpbmRvd3NYc2l6ZTtcclxudmFyIHdpbmRvd3NZc2l6ZTtcclxudmFyIHZlbG9jaXR5QnVsbGV0O1xyXG52YXIgdmVsb2NpdHlBbGllbnQ7XHJcbnZhciBkaXJlY3Rpb25PZkJ1bGxldDtcclxudmFyIGRpcmVjdGlvbk9mQWxpZW50O1xyXG5cclxudmFyIGJ1bGxldDtcclxudmFyIGJ1bGxldHM7XHJcbnZhciBhbGllbjtcclxudmFyIGFsaWVucztcclxuXHJcbnZhciBzY29yZTtcclxudmFyIHNjb3JlRGlzcGxheTtcclxudmFyIHNjb3JlTmVlZGVkVG9XaW47XHJcblxyXG52YXIgc2V0dXA7XHJcbnZhciBnYW1lRW5naW5lID0gcmVxdWlyZSgnLi9nYW1lLWVuZ2luZS5qcycpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcblxyXG4gICAgYXdhaXQgZ2FtZUVuZ2luZS5sb2FkQXNzZXRzLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kIGNvbG9yOiBcIiArIGRhdGEuYmFja2dyb3VuZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIdW1hbiBpbWFnZTogXCIgKyBkYXRhLm9iakF0dGFjayk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGllbnMgaW1hZ2VzOiBcIiArIGRhdGEub2JqRGVmZW5kKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlbG9jaXR5IG9mIGJ1bGxldHM6IFwiICsgZGF0YS52ZWxvY2l0eUJ1bGxldCArIFwiIHBpeGVsL2ZyYW1lXCIpO1xyXG4gICAgICAgIHdpbmRvd3NYc2l6ZSA9IGRhdGEud2luZG93c1hzaXplO1xyXG4gICAgICAgIHdpbmRvd3NZc2l6ZSA9IGRhdGEud2luZG93c1lzaXplO1xyXG4gICAgICAgIHZlbG9jaXR5QnVsbGV0ID0gZGF0YS52ZWxvY2l0eUJ1bGxldDtcclxuICAgICAgICB2ZWxvY2l0eUFsaWVudCA9IGRhdGEudmVsb2NpdHlBbGllbnQ7XHJcbiAgICAgICAgZGlyZWN0aW9uT2ZCdWxsZXQgPSBkYXRhLmRpcmVjdGlvbk9mQnVsbGV0O1xyXG4gICAgICAgIGJhY2tncm91bmQgPSBkYXRhLmJhY2tncm91bmQ7XHJcbiAgICAgICAgb2JqQXR0YWNrID0gZGF0YS5vYmpBdHRhY2s7XHJcbiAgICAgICAgb2JqRGVmZW5kID0gZGF0YS5vYmpEZWZlbmQ7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGJhY2tncm91bmQpO1xyXG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBNYXRoLnJhbmRvbSgpICogYmFja2dyb3VuZDtcclxuICAgIGh1bWFuID0gdGhpcy5zcHJpdGUob2JqQXR0YWNrKTtcclxuICAgIC8vIGFsaWVuID0gdGhpcy5zcHJpdGUob2JqRGVmZW5kKTtcclxuICAgIC8vIGJ1bGxldCA9IHRoaXMuc3ByaXRlKG9iakRlZmVuZCk7XHJcbiAgICBodW1hbi5zZXRTY2FsZSgwLjMsIDAuMyk7XHJcbiAgICBodW1hbi5zZXRQaXZvdCgwLjUsIDAuNSk7XHJcbiAgICAvLyBhbGllbi5zZXRTY2FsZSgwLjMsIDAsIDMpO1xyXG4gICAgLy8gYnVsbGV0LnNldFNjYWxlKDAuMiwgMC4yKTtcclxuXHJcbiAgICBidWxsZXRzID0gW107XHJcbiAgICBhbGllbnMgPSBbXTtcclxuICAgIHNjb3JlRGlzcGxheSA9IHRoaXMudGV4dChcIjEwXCIsIFwiNTBweCBlbXVsb2dpY1wiLCBcIiNmZmZmZmZcIixcclxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLmNhbnZhcy53aWR0aCAtIDIwKSwgMTApO1xyXG4gICAgc2NvcmUgPSAxMDA7XHJcbiAgICBzY29yZU5lZWRlZFRvV2luID0gMzAwO1xyXG4gICAgYWxpZW5UaW1lciA9IDA7XHJcbiAgICBhbGllbkZyZXF1ZW5jeSA9IDEwMDtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0gcGxheTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheSgpIHtcclxuXHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5tb3ZlKGh1bWFuKTtcclxuICAgIHRoaXMuZm9sbG93RWFzZShodW1hbiwgdGhpcy5wb2ludGVyLCAwLjEpO1xyXG4gICAgdGhpcy5tb3ZlKGJ1bGxldHMpO1xyXG4gICAgdGhpcy5tb3ZlKGFsaWVucyk7XHJcblxyXG4gICAgYWxpZW5UaW1lcisrO1xyXG4gICAgaWYgKGFsaWVuVGltZXIgPT09IGFsaWVuRnJlcXVlbmN5KSB7XHJcbiAgICAgICAgYWxpZW4gPSB0aGlzLnNwcml0ZShvYmpEZWZlbmQpO1xyXG4gICAgICAgIGFsaWVuLnNldFNjYWxlKDAuMywgMC4zKTtcclxuICAgICAgICBhbGllbi50aW50ID0gTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGO1xyXG4gICAgICAgIGFsaWVuLnN0YXRlcyA9IHtcclxuICAgICAgICAgICAgbm9ybWFsOiAwLFxyXG4gICAgICAgICAgICBkZXN0cm95ZWQ6IDFcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGFsaWVuLnkgPSAwIC0gYWxpZW4uaGVpZ2h0O1xyXG4gICAgICAgIC8vIGFsaWVuLnggPSB0aGlzLnJhbmRvbUludCgwLCB3aW5kb3dzWHNpemUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicG9zaXRpb24gYWxpZW4gc3RhcnQ6IFwiICsgYWxpZW4ueCk7XHJcbiAgICAgICAgLy8gYWxpZW4udnkgPSAxO1xyXG5cclxuICAgICAgICBhbGllbi54ID0gMCAtIGFsaWVuLndpZHRoO1xyXG4gICAgICAgIGFsaWVuLnkgPSB0aGlzLnJhbmRvbUludCgwLCB3aW5kb3dzWXNpemUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicG9zaXRpb24gYWxpZW4gc3RhcnQ6IFwiICsgYWxpZW4ueSk7XHJcbiAgICAgICAgYWxpZW4udnggPSAxO1xyXG5cclxuICAgICAgICBhbGllbnMucHVzaChhbGllbik7XHJcbiAgICAgICAgYWxpZW5UaW1lciA9IDA7XHJcbiAgICAgICAgaWYgKGFsaWVuRnJlcXVlbmN5ID4gMikge1xyXG4gICAgICAgICAgICBhbGllbkZyZXF1ZW5jeS0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucG9pbnRlci5wcmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy80LjcxIHJhZGlhbnMsIHVzZWQgaW4gdGhpcyBleGFtcGxlLCBpcyB1cC4gXHJcbiAgICAgICAgLy8wIGlzIHRvIHRoZSByaWdodCwgXHJcbiAgICAgICAgLy8xLjU3IGlzIGRvd24sIFxyXG4gICAgICAgIC8vYW5kIDMuMTQgaXMgdG8gdGhlIGxlZnQuXHJcblxyXG4gICAgICAgIHNlbGYuc2hvb3QoXHJcbiAgICAgICAgICAgIGh1bWFuLCBcclxuICAgICAgICAgICAgZGlyZWN0aW9uT2ZCdWxsZXQsIFxyXG4gICAgICAgICAgICBodW1hbi5oYWxmV2lkdGggLSAoaHVtYW4ud2lkdGgpLzIsIFxyXG4gICAgICAgICAgICAtIChodW1hbi5oZWlnaHQpLzIsIFxyXG4gICAgICAgICAgICBzZWxmLnN0YWdlLCBcclxuICAgICAgICAgICAgdmVsb2NpdHlCdWxsZXQsIFxyXG4gICAgICAgICAgICBidWxsZXRzLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBidWxsZXQgPSBzZWxmLnNwcml0ZShvYmpEZWZlbmQpO1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnNldFNjYWxlKDAuMiwgMC4yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWxsZXQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGFsaWVucyA9IGFsaWVucy5maWx0ZXIoZnVuY3Rpb24gKGFsaWVuKSB7XHJcbiAgICAgICAgdmFyIGFsaWVuSXNBbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYnVsbGV0cyA9IGJ1bGxldHMuZmlsdGVyKGZ1bmN0aW9uIChidWxsZXQpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuaGl0VGVzdFJlY3RhbmdsZShhbGllbiwgYnVsbGV0KSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmUoYnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIGFsaWVuLnZ5ID0gMDtcclxuICAgICAgICAgICAgICAgIGFsaWVuSXNBbGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmUoYWxpZW4pO1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gMTAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYWxpZW5Jc0FsaXZlO1xyXG4gICAgfSk7XHJcbiAgICBzY29yZURpc3BsYXkuY29udGVudCA9IHNjb3JlO1xyXG4gICAgaWYgKHNjb3JlID09PSBzY29yZU5lZWRlZFRvV2luIHx8IHNjb3JlIDw9IDApIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gZW5kO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZW5kKCkge1xyXG5cclxuICAgIHNjb3JlID0gMTAwO1xyXG4gICAgYWxpZW5GcmVxdWVuY3kgPSAxMDA7XHJcbiAgICBhbGllblRpbWVyID0gMDtcclxuXHJcbiAgICB0aGlzLnJlbW92ZShhbGllbnMpO1xyXG4gICAgdGhpcy5yZW1vdmUoYnVsbGV0cyk7XHJcbiAgICB0aGlzLnN0YWdlLnB1dEJvdHRvbShodW1hbiwgMCwgLTQwKTtcclxuICAgIHRoaXMuc3RhdGUgPSBwbGF5O1xyXG4gICAgdGhpcy5yZXN1bWUoKTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgc2V0dXA6IHNldHVwXHJcbn0iLCIvLyBjb25zdCB0aGluZ1RvTG9hZCA9IFtcImltYWdlcy9nYW1lU2NyaXB0Lmpzb25cIl07XHJcbmNvbnN0IGdhbWVTZXR1cCA9IHJlcXVpcmUoJy4vZ2FtZS1zZXR1cC5qcycpO1xyXG52YXIgZ2FtZUVuZ2luZSA9IHJlcXVpcmUoJy4vZ2FtZS1lbmdpbmUuanMnKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZpcnN0bG9hZCgpIHtcclxuICAgIGF3YWl0IGdhbWVFbmdpbmUubG9hZEFzc2V0cy50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2luZG93cyBzaXplOiBcIitkYXRhLndpbmRvd3NYc2l6ZSArIFwieFwiICsgZGF0YS53aW5kb3dzWXNpemUgK1wiKHBpeGVsKVwiKTtcclxuICAgICBcclxuICAgICAgICB4ID0gZGF0YS53aW5kb3dzWHNpemU7XHJcbiAgICAgICAgeSA9IGRhdGEud2luZG93c1lzaXplO1xyXG4gICAgfSlcclxuICAgIGNvbnN0IGcgPSBoZXhpKHgsIHksIGdhbWVTZXR1cC5zZXR1cCk7XHJcbiAgICBnLnNjYWxlVG9XaW5kb3coKTtcclxuICAgIGcuc3RhcnQoKTtcclxufVxyXG5maXJzdGxvYWQoKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=