// const thingToLoad = ["images/gameScript.json"];
const gameSetup = require('./game-setup.js');
var gameEngine = require('./game-engine.js');

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

