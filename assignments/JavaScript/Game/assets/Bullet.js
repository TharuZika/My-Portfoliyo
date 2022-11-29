export default class Bullet{
    constructor(canvas,x,y,move,bulletType) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.move = move;
        this.bulletType = bulletType;

        this.width = 30;
        this.height = 30;
        this.bulletImage = new Image();

        if (this.bulletType=="player"){
            this.bulletImage.src = 'assets/images/bulletPlayer.png';
        }else if (this.bulletType=="enemy"){
            this.bulletImage.src = 'assets/images/bulletEnemy.png';
        }

    }

    draw(ctx){
        this.y -= this.move;
        ctx.drawImage(this.bulletImage,this.x, this.y, this.width, this.height)
    }
    collideWith(sprite){
        if (this.x + this.width > sprite.x && this.x < sprite.x +sprite.width && this.y + this.height > sprite.y && this.y <sprite.y +sprite.height){
            return true;
        }else {
            return false;
        }
    }
}