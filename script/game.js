const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const retryBtn = document.querySelector('.retry-btn')
const backBtn = document.querySelector('.back-btn')
const score = document.querySelector('.score')
const scoreResult = document.querySelector('.score-result')

let point = 0

const jump = () => {

    mario.classList.add('mario-jump')
    setTimeout(() => {
        mario.classList.remove('mario-jump')
    }, 700)
}

const pointCounter = setInterval(() => {

    if(mario.src = './assets/images/mario.webp'){
        point++
    }

    score.innerHTML = `SCORE: ${point}`

}, 2500)

const verifyDeffeat = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','')
    const cloudsPosition = clouds.offsetLeft;

    if(pipePosition <= 235 && pipePosition > 130 && marioPosition <= 80){
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = './assets/images/mario-game-over.png'
        mario.style.width = '60px'
        mario.style.left = '200px'

        retryBtn.style.display = 'flex'
        backBtn.style.display = 'flex'
        score.style.display = 'none'
        scoreResult.style.display = 'flex'
        scoreResult.innerHTML = `SCORE: ${point}`

        if(mario.src = './assets/images/mario-game-over.png'){
            clearInterval(verifyDeffeat)
            clearInterval(pointCounter)
        }
    }

}, 10)

document.addEventListener('keydown', jump)
window.addEventListener('click', jump)