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