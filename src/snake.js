const tableau = document.querySelector('#tableau');
const ctxSn = tableau.getContext('2d');
const ctxSn1 = tableau.getContext('2d');
const blkSize = 26;
const row = 20;
const col = 20;
var gameOver = false;
let color = 'lime';

tableau.width = col * blkSize;
tableau.height = row * blkSize;

var snakeX = blkSize * 5;
var snakeY = blkSize * 5;

var snake = [];

var foodX;
var foodY;

var veloX = 0;
var veloY = 0;

function maj(loko) {
    if(gameOver) {
        return;
    }

    ctxSn.fillStyle = 'black';
    ctxSn.fillRect(0, 0, tableau.width, tableau.height );

    ctxSn1.beginPath();
    ctxSn1.fillStyle = 'red';
    ctxSn1.arc(foodX+13, foodY+13, blkSize/2, 0, 2*Math.PI );
    ctxSn1.fill();

    if( snakeX == foodX && snakeY == foodY ) {
        snake.push([foodX, foodY]);
        food();
        console.log(snake.length);
        document.querySelector('.score').innerHTML = snake.length;
    }

    ctxSn.fillStyle = loko;
    snakeX += veloX * blkSize;
    snakeY += veloY * blkSize;
    ctxSn.fillRect(snakeX, snakeY, blkSize, blkSize );

    snake.map((e) => {
        ctxSn.fillRect(e[0], e[1], blkSize, blkSize ); 
        if( snakeX == e[0] && snakeY == e[1]) {
            gameOver = true;
        alert("game over");
        }
    });

    for(let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    if(snake.length) {
        snake[0] = [snakeX, snakeY];
        // console.log(snake[0]);
    }

    if(snakeX < 0 || snakeX > col * blkSize || snakeY < 0 || snakeY > row * blkSize) {
        gameOver = true;
        alert("game over");
        window.location.href = "./";
    }

}

function food() {
    foodX = Math.floor(Math.random() * col) * blkSize;
    foodY = Math.floor(Math.random() * row) * blkSize;
}

function changeDrx(keys) {
    if (keys == 40 && veloY != 1){
        //down
        veloX = 0;
        veloY = 1;
    }else if (keys == 38 && veloY != 1){
        //up
        veloX = 0;
        veloY = -1;
    }else if (keys == 39 && veloX != -1){
        //right
        veloX = 1;
        veloY = 0;
    }else if (keys == 37 && veloX != 1){
        //left
        veloX = -1;
        veloY = 0;
    }
}

food();
setInterval(() => {
    maj(color);
},300);

addEventListener("keyup",(e)=>{
    changeDrx(e.keyCode);
    // console.log(e.keyCode);
})

function change(e) {
    color = e.target.value;
document.querySelectorAll('.serpent')[0].style.background = `${e.target.value}`;
document.querySelectorAll('.serpent')[1].style.background = `${e.target.value}`;
document.querySelectorAll('.serpent')[2].style.background = `${e.target.value}`;
}