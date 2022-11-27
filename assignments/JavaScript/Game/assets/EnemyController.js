import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController{

    enemyMap = [
        [1,1,1,1,1],
        [1,1,1,1,]
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;

    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx){
        this.updateVelocityAndDirection();

        this.drawEnemies(ctx);
    }

    updateVelocityAndDirection(){
        for (const enemyRow of this.enemyRows){
            if (this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
            }
        }
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) =>{
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
                    );
                }
            });
        });
    }
}