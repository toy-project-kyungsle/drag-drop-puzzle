const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const titleCount = 16

Array(titleCount).fill().forEach((_, i) => {
    const li = document.createElement("li");
    li.setAttribute('data-index', i);
    li.classList.add(`list${i}`);
    container.appendChild(li)
})

function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        console.log(randomIndex)
        index--;
    }
}