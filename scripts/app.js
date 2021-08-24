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

        let crash =
            character.positionX < obstacle.x + obstacle.width &&
            character.positionX + character.scaledWidth > obstacle.x &&
            character.positionY < obstacle.y + obstacle.height &&
            character.positionY + character.scaledHeight > obstacle.y;

        if (crash) {

            console.log("crash")
            clearInterval(obstaclesId);
            cancelAnimationFrame(frameCount);
            // alert('Crashed! Game over');
            window.location.reload();
        }
    }



    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bgImg.draw()

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

}