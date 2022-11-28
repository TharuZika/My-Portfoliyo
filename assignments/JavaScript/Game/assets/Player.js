export default class Player {
    rightPressed = false
    leftPressed = false
    shootPressed = false


    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height -180;

        this.width = 140;
        this.height = 120;

        this.image = new Image();
        this.image.src = 'assets/images/startShip3.gif';

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("mousemove" , this.mousemove);
        document.addEventListener("mousedown" , this.mousedown);
        document.addEventListener("mouseup" , this.mouseup);
    }

    draw(ctx){
        if (this.shootPressed){
            this.bulletController.shoot(this.x+this.width/2-14, this.y,4,10)
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }



    collideWithWalls(){
        //left
        if (this.x < 0){
            this.x =0;
        }

        //right
        if (this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }
    }



    move(){
        if (this.rightPressed){
            this.x += this.velocity;
        }else if (this.leftPressed){
            this.x += -this.velocity;
        }
    }

    mousemove = event => {
        this.x = event.pageX-162;
    }

    mousedown = event =>{
        this.shootPressed = true;
    }

    mouseup = event =>{
        this.shootPressed = false;
    }

    keydown = event =>{
        if (event.code == 'ArrowRight'){
            this.rightPressed = true;
        }
        if (event.code == 'ArrowLeft'){
            this.leftPressed = true;
        }
        if (event.code == 'Space'){
            this.shootPressed = true;
        }
    }

    keyup = event =>{
        if (event.code == 'ArrowRight'){
            this.rightPressed = false;
        }
        if (event.code == 'ArrowLeft'){
            this.leftPressed = false;
        }
        if (event.code == 'Space'){
            this.shootPressed = false;
        }
    }
}