export default class Enemy{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 150;

        this.image = new Image();
        this.image.src = 'assets/images/enemyShip.png';
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xMove,yMove){
        this.x += xMove;
        this.y += yMove;
    }
}