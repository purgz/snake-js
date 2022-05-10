const board = document.querySelector(".board-container")
const WIDTH = 800;
const numRows = 30;
const numCols = 30;

function drawGrid(rows,cols){

    for (let i = 0; i < rows; i++){
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < cols; j ++){
            let col = document.createElement("div");
            col.classList.add("col");

            let width = WIDTH / cols;
            col.style.width = `${width}px`;

            row.appendChild(col);
        }
        board.appendChild(row);
    }
}

drawGrid(numRows,numCols);

//snake
var snake = [];
var xVel;
var yVel;
var gameLoop;
var running;
var foodx;
var foody;

const cell = document.querySelectorAll(".col");
const reset = document.querySelector("#reset");

function startGame(){
    running = true;
    snake = [
        {y: 10,x: 10},
        {y: 9,x: 10},
        {y: 8,x: 10},
        {y: 7,x: 10},
    ];
    
    xVel = 1;
    yVel = 0;
    generateFood();

    gameLoop = setInterval(() => {
        cell.forEach((e)=>{
            e.classList.remove("snake");
        })
        if (checkGameOver()){return; };
        drawSnake();
        moveSnake();
        checkFood();
        
    }, 100);
}


function drawSnake(){
    for (let i = 0; i < snake.length; i++){
        let x = snake[i].x;
        let y = snake[i].y;
        let cell = board.childNodes[x].childNodes[y]
        cell.classList.add("snake")
    }
}

function moveSnake(){

    let x = snake[0].x + xVel;
    let y = snake[0].y + yVel;
    snake.unshift({y,x});
    snake.pop();
}

function checkGameOver(){
    let x = snake[0].x;
    let y = snake[0].y;

    if (x >= numRows || x < 0){
        clearInterval(gameLoop);
       // alert("Game over")
        running = false;
        return true;
    }
    if (y >= numCols || y < 0){
        clearInterval(gameLoop);
        //alert("Game over")
        running = false;
        return true;
    }

    for (let i = 1; i < snake.length; i++){
        if (x == snake[i].x && y == snake[i].y){
            clearInterval(gameLoop);
            running = false;
            return true;
        }
    }
}

function generateFood(){
    foodx = Math.floor(Math.random() * numRows);
    foody = Math.floor(Math.random() * numCols);

    board.childNodes[foodx].childNodes[foody].classList.add("food");
}

function checkFood(){
    if (snake[0].x == foodx && snake[0].y == foody){
        let x = snake[0].x + xVel;
        let y = snake[0].y + yVel;
        snake.unshift({y,x});
        board.childNodes[foodx].childNodes[foody].classList.remove("food");
        generateFood();
    }
}

document.addEventListener("keydown",(event)=>{
    

    switch(event.code){
        case "ArrowLeft":
        case "KeyA":
            if (yVel == 1){break;}
            yVel = -1;
            xVel = 0;
            break;
        case "ArrowRight":
        case "KeyD":
            if (yVel == -1){break;}
            yVel = 1;
            xVel = 0;
            break;
        case "ArrowUp":
        case "KeyW":
            if (xVel == 1){break;}
            yVel = 0;
            xVel = -1;
            break;
        case "ArrowDown":
        case "KeyS":
            if (xVel == -1){break;}
            yVel = 0;
            xVel = 1;
            break;
    }
})

reset.addEventListener("click",()=>{
    if (!running){
        startGame();
    }
});

startGame();