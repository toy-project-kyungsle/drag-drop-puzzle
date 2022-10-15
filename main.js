const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const titleCount = 16

function createImageTiles () {
    const tempListArr = [];
    Array(titleCount).fill().forEach((_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i);
        li.classList.add(`list${i}`);
        tempListArr.push(li);
    })
    return tempListArr;
}

function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        console.log(randomIndex)
        index--;
    }
    return array
}

const tiles = createImageTiles();

shuffle(tiles).forEach(tile=>container.appendChild(tile))



