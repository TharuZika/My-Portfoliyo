import EnemyController from "./assets/EnemyController.js";
import Player from "./assets/Player.js";
import BulletController from "./assets/BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameOver = false;
let level = 1;

const backgroundMusic = new Audio('assets/sounds/start.wav');
const playerDeath = new Audio('assets/sounds/death-player.wav');
backgroundMusic.volume = 0.05;
playerDeath.volume = 0.8;

const background = new Image();
background.src = 'assets/images/background.jpg'

canvas.width = 1700;
canvas.height = 800;



const playerBulletController = new BulletController(canvas,5,"player",true);
const enemyBulletController = new BulletController(canvas,4,"enemy",false);
const enemyController = new EnemyController(canvas, enemyBulletController,playerBulletController,level);
const player = new Player(canvas, 10, playerBulletController);





function gameLoop(){
    $("#score").text("Your Score: "+enemyController.score);
    $("#winScore").text("Your Score: "+enemyController.score);
    $("#txtLevel").text("Level: "+enemyController.level);
    $("#liveLevel").text("Level "+enemyController.level);
    $("#liveScore").text("Score "+enemyController.score);
    checkGameOver();
    if (gameOver){
        if (gameLoop!=null){
        }
        $("#gameOver").css('display', 'block');
        backgroundMusic.pause();
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
        backgroundMusic.pause();
    }
}

$("#btnStart").click(function (){
    gameOver = false;
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
    backgroundMusic.currentTime = 0;
    backgroundMusic.loop = true;
    backgroundMusic.play();
    setInterval(gameLoop, 1000/75);
}




