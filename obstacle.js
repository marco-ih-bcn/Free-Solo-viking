const obstacleImg = document.createElement('img')

obstacleImg.src = '/assets/face-boulder.png'

class Obstacle {
    constructor(canvasContext, positionX, positionY, speed) {
        this.ctx = canvasContext,
            this.x = positionX,
            this.y = positionY,
            this.width = 50,
            this.height = 50,
            this.speed = speed
    }

    draw() {

        this.ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.speed;
    }
}