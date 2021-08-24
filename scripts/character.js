const characterImg = document.createElement('img');
characterImg.src = '/assets/climber-images.png';



class Character {
    constructor(canvasContext, positionX, positionY) {

        this.ctx = canvasContext;
        this.positionX = positionX;
        this.positionY = positionY;
        this.movementSpeed = 2;
        this.scale = 0.5;
        this.width = 113;
        this.height = 292;
        this.scaledWidth = this.width * this.scale;
        this.scaledHeight = this.height * this.scale;
        this.hasMoved = false;
        this.keyPresses = {}
        //properties added for if(hasMoved) in draw function
        this.currentDirection = 0;
        this.frameCount = 0;
        this.currentLoopIndex = 0;
        this.cycleLoop = [0, 1, 0, 1];
        this.frameLimit = 12;
    }


    draw() {

        const frameX = this.cycleLoop[this.currentLoopIndex]
        const frameY = this.currentDirection




        // this.positionX & this.positionY = NaN
        this.ctx.drawImage(characterImg,
            frameX * this.width, frameY * this.height, this.width, this.height,
            this.positionX, this.positionY, this.scaledWidth, this.scaledHeight);
    }

    move() {
        if (this.keyPresses.w) {
            this.positionY += -1;
        }
        if (this.keyPresses.d) {
            this.positionX += 1;
        }
        if (this.keyPresses.s) {
            this.positionY += 1;
        } else if (this.keyPresses.a) {
            this.positionX += -1;
        }



        if (this.hasMoved) {
            this.frameCount++;
            if (this.frameCount >= this.frameLimit) {
                this.frameCount = 0;
                this.currentLoopIndex++
                if (this.currentLoopIndex >= this.cycleLoop.length) {
                    this.currentLoopIndex = 0;
                }
            }
        }
    }




    // set deltaX and deltaY to pick up key presses


}