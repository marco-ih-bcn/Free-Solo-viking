window.onload = () => {
    //all const variables
    const scale = 2;
    const width = 113;
    const height = 292;
    const scaledWidth = width / scale;
    const scaledHeight = height / scale;
    // const cycleLoop = [0, 1, 0, 1];
    // const movementSpeed = 2;
    // const frameLimit = 12


    //all let variable 
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    // let currentLoopIndex = 0;
    let frameCount = null;
    // let currentDirection = 0;
    let keyPresses = {}
    let positionX = 250;
    let positionY = 450;
    // let climber = new Image();
    let character = new Character(ctx, 250, 450)
    let bgImg = new Background(ctx)
    let obstaclesId = null;
    let obstaclesArray = [];
    let bonusId = null;
    let bonusArray = [];

    // climber.src = '/assets/climber-images.png';
    // climber.onload = function () {
    //     window.requestAnimationFrame(gameLoop);
    // };





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

        // Actually, we do not need to pass anything to this function from here.
        // All the paramas are available insisde the class
        character.draw();
        character.move()




        window.requestAnimationFrame(gameLoop);

    }
    gameLoop()

    // >>>>> ALL the following code
    // >>>>> has to go into the .move() method of the character class

    // // move character function stops the character from leaving the canvas
    // function moveCharacter(deltaX, deltaY) {
    //     if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {

    //         positionX += deltaX;
    //     }
    //     if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
    //         console.log(positionY)
    //         positionY += deltaY;
    //     }

    // }

}