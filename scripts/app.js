window.onload = () => {

    function start() {
        startPage.style.display = 'none'
        gamePage.style.display = 'block'
    }

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
    let startButton = document.getElementById('start-button')
    let startPage = document.getElementById('start-page')
    let gamePage = document.getElementById('game-page')


    startButton.addEventListener('click', () => {
        start()
        gameLoop()
    })
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

    bonusId = setInterval(function () {

        let bonus = new Bonus(
            ctx, //canvas context
            Math.random() * canvas.width - 200, //position X
            0, //position Y
            Math.ceil(Math.random() * 3) //speed
        );
        bonusArray.push(bonus);
    }, 6000);



    function bonusCheck(bonus) {
        let bonusContact =
            character.positionX < bonus.x + bonus.width &&
            character.positionX + character.scaledWidth > bonus.x &&
            character.positionY < bonus.y + bonus.height &&
            character.positionY + character.scaledHeight > bonus.y;

        if (bonusContact) {
            bonusArray.splice(bonus, 1)
        }
    }




    function checkCollisions(obstacle) {

        let obstacleCollision =
            character.positionX < obstacle.x + obstacle.width &&
            character.positionX + character.scaledWidth > obstacle.x &&
            character.positionY < obstacle.y + obstacle.height &&
            character.positionY + character.scaledHeight > obstacle.y;


        if (obstacleCollision) {
            obstaclesArray.splice(obstacle, 1)
            clearInterval(obstaclesId);
            cancelAnimationFrame(frameCount);
            //go to game over page!
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
            bonusCheck(eachBonus);
        });

        character.draw();
        character.move()
        window.requestAnimationFrame(gameLoop);
    }


}