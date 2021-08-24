window.onload = () => {

    //all let variable 
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let frameCount = null;
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






    window.addEventListener('keydown', keyDownListner, false);
    function keyDownListner(event) {
        character.keyPresses[event.key] = true;
    }
    window.addEventListener('keyup', keyUpListner, true);
    function keyUpListner(event) {
        character.keyPresses[event.key] = false;
    }

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

        // let crash =
        //     positionX < obstacle.x + obstacle.width &&
        //     positionX + scaledWidth > obstacle.x &&
        //     positionY < obstacle.y + obstacle.height &&
        //     positionY + scaledHeight > obstacle.y;

        // if (crash) {

        //     console.log("crash")
        //     clearInterval(obstaclesId);
        //     cancelAnimationFrame(frameCount);
        //     // alert('Crashed! Game over');
        //     window.location.reload();
        // }
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

        character.draw();
        character.move()

        window.requestAnimationFrame(gameLoop);

    }
    gameLoop()

    // >>>>> ALL the following code
    // >>>>> has to go into the .move() method of the character class

    // // move character function stops the character from leaving the canvas


}