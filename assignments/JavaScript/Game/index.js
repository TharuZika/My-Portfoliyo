import EnemyController from "./assets/EnemyController.js";
import Player from "./assets/Player.js";
import BulletController from "./assets/BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameOver = false;
let level = 1;
var score = 0;

$("#btnStart").click(function (){
    gameOver = false;
    gameStart();
});

$("#btnReStart").click(function (){
    gameOver = false;
    gameStart();
});


function gameStart(){
    $("#gameStart").css('display', 'none');
    $("#gameOver").css('display', 'none');
    setInterval(gameLoop, 1000/75);
}


const background = new Image();
background.src = 'assets/images/background.jpg'

canvas.width = 1700;
canvas.height = 800;

const playerBulletController = new BulletController(canvas,10,"red",true);
const enemyBulletController = new BulletController(canvas,4,"white",false);
const enemyController = new EnemyController(canvas, enemyBulletController,playerBulletController,level);
const player = new Player(canvas, 10, playerBulletController);

function gameLoop(){
    // score = score+1;
    // $("#score").text("Score: "+score);
    checkGameOver();
    if (gameOver){
        $("#gameOver").css('display', 'block');
    }
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);

    console.log(gameOver);
}

function checkGameOver(){
    if (gameOver){
        return;
    }
    if (enemyBulletController.collidenWith(player)){
        gameOver = true;
        console.log("game is over")

    }
}

function levelChecker(){

}




