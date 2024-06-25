const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const retryBtn = document.querySelector('.retry-btn');
const backBtn = document.querySelector('.back-btn');
const score = document.querySelector('.score');
const scoreResult = document.querySelector('.score-result');

const marioImg = new Image();
marioImg.src = './assets/images/mario.webp';

const pipeImg = new Image();
pipeImg.src = './assets/images/pipe.png';

const cloudsImg = new Image();
cloudsImg.src = './assets/images/clouds.png';

const marioGameOverImg = new Image();
marioGameOverImg.src = './assets/images/mario-game-over.png';

let point = 0;
let marioY = canvas.height - 100;
let pipeX = canvas.width;
let cloudsX = canvas.width;
let isJumping = false;
let gameOver = false;

const jump = () => {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        jumpHeight -= 5;
                        marioY += 5;
                    }
                }, 20);
            } else {
                jumpHeight += 5;
                marioY -= 5;
            }
        }, 20);
    }
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clouds
    ctx.drawImage(cloudsImg, cloudsX, 0, 800, 200);
    cloudsX -= 1;
    if (cloudsX <= -800) {
        cloudsX = canvas.width;
    }

    // Draw pipe
    ctx.drawImage(pipeImg, pipeX, canvas.height - 100, 50, 100);
    pipeX -= 5;
    if (pipeX <= -50) {
        pipeX = canvas.width;
    }

    // Draw Mario
    ctx.drawImage(marioImg, 50, marioY, 50, 50);

    // Check for collision
    if (pipeX <= 100 && pipeX > 50 && marioY >= canvas.height - 100) {
        ctx.drawImage(marioGameOverImg, 50, marioY, 50, 50);
        retryBtn.style.display = 'flex';
        backBtn.style.display = 'flex';
        score.style.display = 'none';
        scoreResult.style.display = 'flex';
        scoreResult.innerHTML = `SCORE: ${point}`;
        gameOver = true;
        return;
    }

    if (!gameOver) {
        requestAnimationFrame(draw);
    }
};

const pointCounter = setInterval(() => {
    if (!gameOver) {
        point++;
        score.innerHTML = `SCORE: ${point}`;
    }
}, 1200);

document.addEventListener('keydown', jump);
window.addEventListener('click', jump);

retryBtn.style.display = 'none';
backBtn.style.display = 'none';
scoreResult.style.display = 'none';

draw();
