import EnemyController from "./assets/EnemyController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

$("#btnStart").click(function (){
    $("#gameStart").css('display', 'none');
    startSong.play();
})

var startSong = new Audio();
startSong.src = 'assets/sounds/start.wav';
startSong.currentTime = 0;
startSong.volume = 0.1;


canvas.width = 1700;
canvas.height = 800;

const enemyController = new EnemyController(canvas);

function gameLoop(){
    enemyController.draw(ctx);
}

setInterval(gameLoop, 1000/60);