const howPlay = document.querySelector('.how-to-play')
const how = document.querySelector('.how')

const viewHowPlay = () => {
    how.style.display = 'flex'
}

howPlay.addEventListener('click', viewHowPlay)