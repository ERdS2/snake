

let canvas = document.getElementById("main-canvas");
let ctx = canvas.getContext("2d");


let canvasHeight;
let canvasWidth;



let box = 10;
let snake = [];
let timerId;
let apple = [0, 40];



let directions = [
  [box, 0], // right
  [0, box], //down
  [-1 * box, 0], // left
  [0, -1 * box], // up
];


let actDirection = directions[0];

// --------------------------- Print Table -----------------------------------------


function startGame() {
  let snakeBody = { widthP: box, heightP: 0 };
  snake.push(snakeBody);
  printTable();
  timerId = setInterval(moveSnake, 200);
}

startGame();

function printTable() {
  ctx.fillStyle = "#e6ffb5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0], apple[1], box, box);
  for (let snakeBody of snake) {
    ctx.fillStyle = "#67940f";
    ctx.fillRect(snakeBody.widthP, snakeBody.heightP, box, box);
  }
}


function moveSnake() {
    let newPosition = {
      widthP: snake[0].widthP + actDirection[0],
      heightP: snake[0].heightP + actDirection[1],
    };
    if(hasCollision(newPosition)){
        clearInterval(timerId);
        alert("GAME OVER");
        return;
    }
    snake.unshift(newPosition);
    if(!(checkEating(newPosition))){
        snake.pop();
    }
    printTable();
    
  }

window.addEventListener("keydown", (event) => {
    let move = true;
    if (event.code === "ArrowDown") {
        actDirection = directions[1];
    } else if (event.code === "ArrowUp") {
        actDirection = directions[3];
    } else if (event.code === "ArrowLeft") {
        actDirection = directions[2];
    } else if (event.code === "ArrowRight") {
        actDirection = directions[0];
    } else {
        move = false;
    }
    if (move) {
        event.preventDefault();
    }
});



// ---------------------------------------- Az Evés ----------------------------------

function checkEating(newPosition) {
    if ((apple[0] === newPosition.widthP) && (apple[1] === newPosition.heightP)){
        apple[0]=Math.floor(Math.random() * canvas.width/box)*box;
        apple[1]=Math.floor(Math.random() * canvas.height/box)*box;
        return true
    } else {
        return false
    }
}


// ----------------------------------- Az Ütközés ---------------------------------

function hasCollision(newPosition) {
    if((newPosition.widthP>canvas.width-box)||(newPosition.heightP>canvas.height-box)){
        return true;
    }
    if((newPosition.widthP<0)||(newPosition.heightP<0)){
        return true;
    }
    for(let snakeBody of snake){
        if((newPosition.widthP===snakeBody.widthP) && (newPosition.heightP===snakeBody.heightP)){
            return true;
        }
    }
}


// ----------------------------------- GAME OVER -------------------------------------
