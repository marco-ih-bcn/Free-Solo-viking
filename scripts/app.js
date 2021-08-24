window.onload = () => {
    //all const variables
    const scale = 2;
    const width = 113;
    const height = 292;
    const scaledWidth = width / scale;
    const scaledHeight = height / scale;
    const cycleLoop = [0, 1, 0, 1];
    const movementSpeed = 2;
    const frameLimit = 12


    //all let variable 
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let currentLoopIndex = 0;
    let frameCount = null;
    let currentDirection = 0;
    let keyPresses = {}
    let positionX = 250;
    let positionY = 450;
    let climber = new Image();
    let bgImg = new Background(ctx)
    let obstaclesId = null;
    let obstaclesArray = [];
    let bonusId = null;
    let bonusArray = [];

    climber.src = '/assets/climber-images.png';
    climber.onload = function () {
        window.requestAnimationFrame(gameLoop);
    };





    // let background = new Background(ctx)
    //event listeners
    window.addEventListener('keydown', keyDownListner, false);
    function keyDownListner(event) {
        keyPresses[event.key] = true;
    }
    window.addEventListener('keyup', keyUpListner, false);
    function keyUpListner(event) {
        keyPresses[event.key] = false;
    }
    //obstacle load
    obstaclesId = setInterval(function () {
        let obstacle = new Obstacle(
            ctx, //canvas context
            Math.random() * canvas.width - 200, //position X
            0, //position Y
            Math.ceil(Math.random() * 3) //speed
        );
        // score.points += 10;
        obstaclesArray.push(obstacle);
    }, 2000);
    //bonus load
    bonusId = setInterval(function () {

        let bonus = new Bonus(
            ctx, //canvas context
            Math.random() * canvas.width - 200, //position X
            0, //position Y
            Math.ceil(Math.random() * 3) //speed
        );
        bonusArray.push(bonus);
    }, 5000);





    function checkCollisions(obstacle) {

        let crash =
            positionX < obstacle.x + obstacle.width &&
            positionX + scaledWidth > obstacle.x &&
            positionY < obstacle.y + obstacle.height &&
            positionY + scaledHeight > obstacle.y;

        if (crash) {

            console.log("crash")
            clearInterval(obstaclesId);
            cancelAnimationFrame(frameCount);
            // alert('Crashed! Game over');
            window.location.reload();
        }
    }


    // draws the image frame for animation
    function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(climber,
            frameX * width, frameY * height, width, height,
            canvasX, canvasY, scaledWidth, scaledHeight);
    }



    // game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bgImg.draw()
        // pushes to obstacle array
        obstaclesArray.forEach((eachObstacle) => {
            eachObstacle.draw();
            eachObstacle.move();
            checkCollisions(eachObstacle);
        });
        bonusArray.forEach((eachBonus) => {
            eachBonus.draw();
            eachBonus.move();
            // checkCollisions(eachObstacle);
        });



// >>>>>> ALL the following code has to go into the .move() method
// >>>>>> of the character class
        let hasMoved = false;

        if (keyPresses.w) {
            // >>>>> this function call will become character.move()
            // >>>>> after the refactoring if the character class
            moveCharacter(0, -movementSpeed);
            hasMoved = true;
        } else if (keyPresses.s) {
            moveCharacter(0, movementSpeed); hasMoved = true;
        }
        if (keyPresses.a) {
            moveCharacter(-movementSpeed, 0); hasMoved = true;
        } else if (keyPresses.d) {
            moveCharacter(movementSpeed, 0);
            hasMoved = true;
        }

        if (hasMoved) {
            frameCount++;
            if (frameCount >= frameLimit) {
                frameCount = 0;
                currentLoopIndex++
                if (currentLoopIndex >= cycleLoop.length) {
                    currentLoopIndex = 0;
                }
            }
        }

        //>>>>> The drawFrame is a character method and needs to go there
        drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
       
       
        window.requestAnimationFrame(gameLoop);


    }

// >>>>> ALL the following code
// >>>>> has to go into the .move() method of the character class

    // move character function stops the character from leaving the canvas
    function moveCharacter(deltaX, deltaY) {
        if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {

            positionX += deltaX;
        }
        if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
            console.log(positionY)
            positionY += deltaY;
        }

    }






}