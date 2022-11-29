import EnemyController from "./assets/EnemyController.js";
import Player from "./assets/Player.js";
import BulletController from "./assets/BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameOver = false;
let level = 1;

const backgroundMusic = new Audio('assets/sounds/start.wav');
const playerDeath = new Audio('assets/sounds/death-player.wav');
backgroundMusic.volume = 0.2;
playerDeath.volume = 0.8;

const background = new Image();
background.src = 'assets/images/background.jpg'

canvas.width = 1700;
canvas.height = 800;



const playerBulletController = new BulletController(canvas,20,"player",true);
const enemyBulletController = new BulletController(canvas,4,"enemy",false);
const enemyController = new EnemyController(canvas, enemyBulletController,playerBulletController,level);
const player = new Player(canvas, 10, playerBulletController);





function gameLoop(){
    $("#score").text("Your Score: "+enemyController.score);
    $("#winScore").text("Your Score: "+enemyController.score);
    checkGameOver();
    levelChecker();
    if (gameOver){
        if (gameLoop!=null){
        }
        $("#gameOver").css('display', 'block');
    }else {
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }

    console.log(gameOver);
}

function checkGameOver(){
    if (gameOver){
        return;
    }
    if (enemyBulletController.collidenWith(player)){
        gameOver = true;
        playerDeath.currentTime = 0;
        playerDeath.play();
    }
}

$("#btnStart").click(function (){
    gameOver = false;
    $("#audioBackground").stop();
    gameStart();
});

$("#btnReStart").click(function (){
   location.reload();
});

$("#btnReload").click(function (){
    location.reload();
});


function gameStart(){
    $("#gameStart").css('display', 'none');
    $("#gameOver").css('display', 'none');
    backgroundMusic.pause();
    setInterval(gameLoop, 1000/75);
}

function levelChecker(){
    if (enemyController.level == 2){
        enemyController.enemyMap = [1,1,1,1,1,1];
    }
}




