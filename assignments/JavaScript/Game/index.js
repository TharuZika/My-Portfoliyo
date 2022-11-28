import EnemyController from "./assets/EnemyController.js";
import Player from "./assets/Player.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

$("#btnStart").click(function (){
    $("#gameStart").css('display', 'none');
    setInterval(gameLoop, 1000/60);
});



const background = new Image();
background.src = 'assets/images/background.jpg'



canvas.width = 1700;
canvas.height = 800;

const enemyController = new EnemyController(canvas);
const player = new Player(canvas, 3);

function gameLoop(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);


}




