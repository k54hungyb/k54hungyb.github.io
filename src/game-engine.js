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