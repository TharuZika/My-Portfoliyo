export default class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 4;
    }

    draw(ctx){
        ctx.src = "../assets/objects/playerShip.png"
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}