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
        // this.color = 'black'
        this.hasMoved = false;
        this.keyPresses = {}
        //properties added for if(hasMoved) in draw function
        this.frameCount = 0;
        this.currentLoopIndex = 0;
        this.cycleLoop = [0, 1, 0, 1];
        this.frameLimit = 12;
    }


    draw() {

        // >>>>> I simplified the fucntion using propertie taht we hava available on the class
        const frameX = character.cycleLoop[character.currentLoopIndex]
        const frameY = character.currentDirection

        this.ctx.drawImage(characterImg,
            frameX * this.width, frameY * this.height, this.width, this.height,
            character.positionX, character.positionY, this.scaledWidth, this.scaledHeight);



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
        //what to do with this vvvv

    }

    // Let's try to write te move() method here in the character.
    // You can copypaste code that makes the character move from the app.js file
    move(deltaX, deltaY) {

        if (this.keyPresses.w) {
            this.positionX -= deltaX;
            hasMoved = true;
        } else if (this.keyPresses.s) {
            this.positionX += deltaX;
            hasMoved = true;
        }
        if (this.keyPresses.a) {
            this.positionY -= deltaY;
            hasMoved = true;
        } else if (this.keyPresses.d) {
            this.positionY -= deltaY;;
            hasMoved = true;
        }


        //>>>>> The drawFrame is a character method and needs to go there
    }


}