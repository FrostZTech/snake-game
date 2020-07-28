// Definitions
let box = 20;   // Unit for one box
let game = true;   // Game state
let score = 0;  // Score of the player
let speed = 100;    // Speed of the game, can be changed by the player in the menu/options

// Main Menu
const menuElements = {
    start: document.getElementById('start'),
    options: document.getElementById('options'),
    about: document.getElementById('about'),
    canvas: document.getElementById('board')
};

// Start Game
menuElements.start.addEventListener('click', () => {
    menuElements.canvas.classList.remove('menuAct');
});

// Snake
let snake = [];
snake[0] = {
    x: 14 * box,
    y: 15 * box 
};

// Collision
function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x == body[i].x && head.y == body[i].y) {
            return true;
        }
    }
    return false;
};

// Initialize
function init() {   // Function is called in the markup at <canvas>
    var canvas = document.getElementById('board');
    var ctx = canvas.getContext('2d');

    // Load the audio
    const dead = new Audio();
    dead.src = 'audios/oof.mp3';
    const eat = new Audio();
    eat.src = 'audios/eat.mp3';

    // Draw the board #323232
    ctx.fillStyle = '#323232';
    ctx.fillRect(0, 0, 500, 580);
    
    // Drawing the Score Board
    ctx.fillStyle = '#212121';
    ctx.fillRect(0, 0, 500, 80);

    // Draw the snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#e84a5f' : '#ff847b';   // Color the head of snake red and other blocks light
        ctx.fillRect(snake[i].x , snake[i].y, box, box);
    }

    // Get previous head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Add new according to the direction moving
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    // If snake eats food
    if (snakeX == Food.x && snakeY == Food.y) {
        score++;    // Increase the score
        eat.play();
        Food = {    // Generate new co-ordinates for the food
            x: Math.floor(Math.random() * 24 + 1) * box,
            y: Math.floor(Math.random() * 24 + 4) * box   
        };
        // The tail is not deleted but is added to the snake
    } else {
        // Remove tail of the snake
        snake.pop(); 
    } 

    // Define new head of snake
    let newSnakeHead = {
        x: snakeX,
        y: snakeY
    };
    
    // Game over
    if (snakeX < 0 || snakeX > 24 * box || snakeY < 4 * box || snakeY > 28 * box || collision(newSnakeHead, snake)) {
        dead.play();
        clearInterval(game);
    }

    snake.unshift(newSnakeHead);    // Add new head to snake

    // Print the score
    // Food Icon
    ctx.fillStyle = 'yellowgreen';
    ctx.fillRect(box, box, 2*box, 2*box); 
    // Score
    ctx.fillStyle = 'white';
    ctx.font = '45px Raleway';
    ctx.fillText(score, 3.5*box, 2.65*box);

    // Randomnly create food
    ctx.fillStyle = 'yellowgreen'
    ctx.fillRect(Food.x, Food.y, box, box); 
};

// Food Object; generates random x and y positions
let Food = {
    x: Math.floor(Math.random() * 24 + 1) * box,
    y: Math.floor(Math.random() * 24 + 4) * box   
};

// Snake Control
let d;
document.addEventListener('keydown', direction);
function direction(event) {
    if(event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if(event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if(event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if(event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    } 
};

// Game state
if (game) {
    let gameCall = setInterval(init, speed);
}