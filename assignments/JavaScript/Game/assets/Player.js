export default class Player {
    rightPressed = false
    leftPressed = false

    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height -180;

        this.width = 140;
        this.height = 120;

        this.image = new Image();
        this.image.src = 'assets/images/playerShip.png';

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls(){
        //left
        if (this.x < 0){
            this.x =0;
        }
    }

    move(){
        if (this.rightPressed){
            this.x += this.velocity;
        }else if (this.leftPressed){
            this.x += -this.velocity;
        }
    }

    keydown = event =>{
        if (event.code == 'ArrowRight'){
            this.rightPressed = true;
        }
        if (event.code == 'ArrowLeft'){
            this.leftPressed = true;
        }
    }

    keyup = event =>{
        if (event.code == 'ArrowRight'){
            this.rightPressed = false;
        }
        if (event.code == 'ArrowLeft'){
            this.leftPressed = false;
        }
    }
}