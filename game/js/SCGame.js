var myTime  = null;
var giftTime = null;
var tBg = 100;       // top position of background image
var lBg = 100;       // left position of background image
var wBg = 720;     // width of background image
var hBg = 540;     // height of background image
var xSc = 0;
var ySc = 0;
var speed = 1.5;
var imgSize = 40;  //size of Santa Claus and gift
var giftsCaught = 0;
var error = imgSize/4;

function Timer() // update loop for game
{
    // Get current positions
    var ys =document.getElementById('SantaClaus').offsetTop;
    var xs =document.getElementById('SantaClaus').offsetLeft;

    // New positions
    xs += xSc;
    ys += ySc;

    //modify the position
    if(xs <= lBg){xs = lBg;}
    if((xs + imgSize) >= (lBg + wBg)){xs = lBg + wBg - imgSize;}
    if(ys <= tBg){ys = tBg;}
    if((ys + imgSize) >= (tBg + hBg)){ys = tBg + hBg -imgSize;}

    // Store positions
    document.getElementById('SantaClaus').style.top= ys + "px"; // vertical movment
    document.getElementById('SantaClaus').style.left= xs + "px"; // horizontal movment

    //decide the game will continue or over
    Gameover();

    //update the loop
    myTime=setTimeout('Timer()',10);
    document.getElementById("display").innerHTML="Gifts caught: " + giftsCaught;
}

function  UpdateGift() {  //updating the position of gift

    document.getElementById('gift').style.left= lBg + imgSize + (Math.random() * (wBg -2*imgSize)) + "px"; // horizontal position
    document.getElementById('gift').style.top= tBg + imgSize + (Math.random() * (hBg -2*imgSize)) + "px"; // vertical position

    giftTime = setTimeout("UpdateGift()", 3000);
}

function Gameover() {

    var topS = document.getElementById('SantaClaus').offsetTop;
    var leftS = document.getElementById('SantaClaus').offsetLeft;
    var topG = document.getElementById('gift').offsetTop;
    var leftG = document.getElementById('gift').offsetLeft;

    if(topS == tBg || topS == tBg + hBg -imgSize || leftS == lBg || leftS == lBg + wBg - imgSize){
        alert("Game Over!!!");
        Reset();
    }

    // determine whether the user catch the gift
    else if ( topS >= (topG - error) && (topS + imgSize) <= (topG + imgSize + error)
        && (leftS + imgSize) <= (leftG + imgSize + error)&& leftS >= (leftG - error) ){
        speed += 0.3;
        giftsCaught++;
        clearTimeout(giftTime);
        UpdateGift();
    }
}

// when key is pressed  (user input)
function KeyDown(e)
{
    if (e.keyCode == 39) {  xSc =  speed;   } // right key
    if (e.keyCode == 37) {  xSc = -speed;   } // left key
    if (e.keyCode == 38) {  ySc = -speed;   } // up key
    if (e.keyCode == 40 ) {  ySc = speed;   } // down key
}

function Reset()
{
    xSc = 0;
    ySc = 0;
    speed = 1.5;
    giftsCaught = 0;

    clearTimeout(myTime);
    clearTimeout(giftTime);
    document.getElementById('SantaClaus').style.top= tBg + hBg/2 + "px";
    document.getElementById('SantaClaus').style.left= lBg + wBg/2 + "px";
    document.removeEventListener("keydown", KeyDown, false);
}

function StartGame() {

    Reset();

    // Add an event listener to the keypress event.
    document.addEventListener("keydown", KeyDown, false);

    Timer();
    UpdateGift();
}