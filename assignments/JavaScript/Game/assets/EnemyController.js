import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController{

    enemyMap = [
        [1,0,1,0,1]
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xMove = 0;
    yMove = 0;
    defaultXMove = 5;
    defaultYMove = 1;
    moveDownTimerDefault = 1;
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, enemyBulletController, playerBulletController, level) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemyExplodeSound = new Audio('assets/sounds/death.mp3');
        this.enemyShootSound = new Audio('assets/sounds/enemy-shoot.mp3');
        this.enemyShootSound.volume = 0.5;
        this.enemyExplodeSound.volume = 0.5;
        this.createEnemies();
        this.score = 0;
        this.level = 1;
    }


    draw(ctx){
        if (this.enemyRows.length==0){
            if (this.level == 2){
                this.enemyMap = [[1,0,1,0,1],[0,1,0,1,0]];
                this.createEnemies();
            }else if (this.level == 3){
                this.enemyMap = [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]];
                this.createEnemies();
            }else if (this.level == 4) {
                this.enemyMap = [[1, 0, 1, 0, 1], [0, 1, 0, 1, 0],[1, 0, 1, 0, 1], [0, 1, 0, 1, 0]];
                this.createEnemies();
            }else if(this.level == 5){
                $("#gameWin").css('display', 'block');
            }
        }
        this.decrementMoveDownTimer();
        this.updateMoveAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection(){
        this.enemyRows.forEach(enemyRow =>{
            enemyRow.forEach((enemy,enemyIndex)=>{
                if (this.playerBulletController.collidenWith(enemy)){
                    this.enemyExplodeSound.currentTime = 0;
                    this.enemyExplodeSound.play();
                    this.score = this.score+10;
                    enemyRow.splice(enemyIndex, 1);
                    if (this.score == 30){
                        this.level = 2;
                    }else if(this.score == 80){
                        this.level = 3;
                    }else if(this.score == 160){
                        this.level = 4;
                    }else if(this.score == 260){
                        this.level = 5;
                    }
                }
            });
        });
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length>0);
    }

    fireBullet(){
        this.fireBulletTimer--;
        if (this.fireBulletTimer<=0){
            this,this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random()*allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            if (this.enemyRows.length != 0){
                this.enemyShootSound.currentTime = 0;
                this.enemyShootSound.play();
                this.enemyBulletController.shoot(enemy.x+enemy.width/2, enemy.y+enemy.height-10,-3);
            }
        }
    }


    resetMoveDownTimer(){
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        if (
            this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection === MovingDirection.downRight
        ) {
            this.moveDownTimer--;
        }
    }

    updateMoveAndDirection(){
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == MovingDirection.right) {
                this.xMove = this.defaultXMove;
                this.yMove = 0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            } else if (this.currentDirection === MovingDirection.left) {
                this.xMove = -this.defaultXMove;
                this.yMove = 0;
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection){
        this.xMove = 0;
        this.yMove = this.defaultYMove;
        if (this.moveDownTimer <=0){
            this.currentDirection = newDirection;
        }
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) =>{
            enemy.move(this.xMove, this.yMove);
            enemy.draw(ctx);
        })
    }

    createEnemies() {
        console.log(this.enemyMap);
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 90, rowIndex * 80)
                    );
                }
            });
        });
    }
}