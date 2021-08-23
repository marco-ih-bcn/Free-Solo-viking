
window.onload = () => {
    //all const variables
    // const scale = 2;
    // const width = 113;
    // const height = 292;
    // const scaledWidth = width / scale;
    // const scaledHeight = height / scale;
    const cycleLoop = [0, 1, 0, 1];
    const movementSpeed = 2;
    const frameLimit = 12


    //all let variable 
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let currentLoopIndex = 0;
    let frameCount = 0;
    let currentDirection = 0;
    let keyPresses = {}
    let positionX = 280;
    let positionY = 450;
    let bgImg = new Background(ctx)
    //inistialise character class
    let character = new Character(ctx, positionX, positionY)
    // let obstaclesId = null;
    let obstaclesArray = [];


    // let background = new Background(ctx)
    //event listeners
    window.addEventListener('keydown', keyDownListner, false);


    function keyDownListner(event) {
        console.log()
        switch (event.key) {
            case "w":
                character.move(0, -movementSpeed);
                hasMoved = true;
                break;
            case "s":
                character.move(0, movementSpeed); hasMoved = true;
                break;
            case "a":
                character.move(-movementSpeed, 0); hasMoved = true;
                break;
            case 'd':
                character.move(movementSpeed, 0);
                hasMoved = true;
                break;
        }


    }
    window.addEventListener('keyup', keyUpListner, false);
    function keyUpListner(event) {
        console.log(event.key)
        keyPresses[event.key] = false;
    }

    obstaclesId = setInterval(function () {
        let obstacle = new Obstacle(
            ctx, //canvas context
            Math.random() * canvas.width - 200, //position X
            0, //position Y
            Math.ceil(Math.random() * 5) //speed
        );
        obstaclesArray.push(obstacle);
    }, 1000);

    // function checkCollision(character, obstacle) {
    //     let collision =
    //         character.positionX < obstacle.x + obstacle.width &&
    //         character.positionX + character.width > obstacle.x &&
    //         character.positionX < obstacle.y + obstacle.height &&
    //         character.positionY + character.height > obstacle.y;





    // }


    //load character

    // // img.src = '/assets/climber-images.png';
    // character.onload = function () {
    //     window.requestAnimationFrame(gameLoop);
    // };
    // // img.src = '/assets/climber-images.png';
    // bgImg.onload = function () {
    //     console.log('load')
    //     window.requestAnimationFrame(gameLoop);
    // };


    // draws the image frame for animation
    // function drawFrame(frameX, frameY, canvasX, canvasY) {
    //     ctx.drawImage(img,
    //         frameX * width, frameY * height, width, height,
    //         canvasX, canvasY, scaledWidth, scaledHeight);
    // }



    // game loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bgImg.draw()
        //charcter draw function
        character.draw(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
        window.requestAnimationFrame(gameLoop);


        obstaclesArray.forEach((eachObstacle) => {
            eachObstacle.draw();
            eachObstacle.move();

        });


        let hasMoved = false;
        // console.log(keyPresses.w)
        // if (keyPresses.w) {
        //     character.move(0, -movementSpeed);
        //     hasMoved = true;
        // } else if (keyPresses.s) {
        //     character.move(0, movementSpeed); hasMoved = true;
        // }
        // if (keyPresses.a) {
        //     character.move(-movementSpeed, 0); hasMoved = true;
        // } else if (keyPresses.d) {
        //     character.move(movementSpeed, 0);
        //     hasMoved = true;
        // }



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



    }
    gameLoop()
    // // move character function stops the character from leaving the canvas
    // // function moveCharacter(deltaX, deltaY) {
    // //     if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
    // //         positionX += deltaX;
    // //     }
    // //     if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
    // //         positionY += deltaY;
    // //     }

    // }



}