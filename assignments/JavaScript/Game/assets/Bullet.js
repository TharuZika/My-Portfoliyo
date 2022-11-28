export default class Bullet{
    constructor(canvas,x,y,velocity,bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 30;
        this.height = 30;
        this.bulletImage = new Image();

        if (this.bulletColor=="red"){
            this.bulletImage.src = 'assets/images/bulletPlayer.png';
        }else if (this.bulletColor=="white"){
            this.bulletImage.src = 'assets/images/bulletEnemy.png';
        }

    }

    draw(ctx){
        this.y -= this.velocity;
        // ctx.src = 'assets/images/bulletPlayer.png'
        ctx.drawImage(this.bulletImage,this.x, this.y, this.width, this.height)
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    collideWith(sprite){
        if (this.x + this.width > sprite.x && this.x < sprite.x +sprite.width && this.y + this.height > sprite.y && this.y <sprite.y +sprite.height){
            return true;
        }else {
            return false;
        }
    }
}