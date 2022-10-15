const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const titleCount = 16

const dragged = {
    el: null,
    class:null,
    index:null
}

let isPlaying = false;
let playSec = 0;
let intervalID = null;

function createImageTiles () {
    const tempListArr = [];
    Array(titleCount).fill().forEach((_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i);
        li.setAttribute('draggable', 'true');
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
        index--;
    }
    return array
}

function setPlayTime() {
    clearInterval(intervalID)
    intervalID = setInterval(function(){
        playSec++
        playTime.innerText = playSec;
    }, 1000)
}

function setGame() {
    isPlaying = false;
    playSec = 0;
    playTime.style.display = 'block';
    gameText.style.display = 'none';
    const tiles = createImageTiles();
    container.innerHTML = '';
    tiles.forEach(tile=>container.appendChild(tile));
    setTimeout(function(){
        isPlaying = true;
        setPlayTime()
        container.innerHTML = '';
        shuffle(tiles).forEach(tile=>container.appendChild(tile))
        startDrag()
    }, 1000)
}

function checkEnd() {
    const unMatchedArr = [];
    let isEnd = true;
    [...container.children].forEach((list, index)=>{
        if (parseInt(list.getAttribute('data-index'), 10) !== index) isEnd = false
    })
    if (isEnd) {
        playTime.style.display = 'none';
        gameText.style.display = 'block';
        stopDrag()
    }
    return isEnd;
}

startButton.addEventListener('click', setGame)

function dragStart (e) {
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className; 
    dragged.index = [...obj.parentNode.children].indexOf(obj);
}

function drag (e) {
    e.preventDefault()
}

function drop (e) {
    const obj = e.target;
    if(obj.className !== dragged.class) {
        let originPlace;
        let isLast = false;

        if (dragged.el.nextSibling) {
            originPlace = dragged.el.nextSibling;
        } else {
            originPlace = dragged.el.previousSibling;
            isLast = true;
        }
        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        if (droppedIndex < dragged.index)
            obj.before(dragged.el);
        else
            obj.after(dragged.el);
        
        if (isLast)
            originPlace.after(obj)
        else
            originPlace.before(obj)
    }
    checkEnd()
}

// event

function startDrag() {
    container.addEventListener('dragstart', dragStart)
    container.addEventListener('dragover', drag)
    container.addEventListener('drop', drop)
}

function stopDrag() {
    container.removeEventListener('dragstart', dragStart)
    container.removeEventListener('dragover', drag)
    container.removeEventListener('drop', drop)
}


