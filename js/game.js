'use strict'

const WALL = '&#8251;'
const FOOD =  '.' //'\u{1F344}'
const SUPERFOOD = '🥧'
const EMPTY = ' '
var gFoodCount = 0
const gGame = { // AN OBJECT WITH SCORE AND BOOLEAN THAT INDICATES IF THE GAME IS WORKING
    score: 0,
    isOn: false
}
var gBoard // THE BOARD IAM WORKING ON (MAT)

function init() { // STARTS THE GAME
    console.log('hello')
    const elModal = document.querySelector('div.modal')
    console.log(elModal);
    elModal.classList.add('hidden')

    gBoard = buildBoard()
    console.log(gFoodCount);
    createPacman(gBoard)
    createGhosts(gBoard) //  can make any ghost amount u want , function is upgraded

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() { // MAKES A BOARD WITH A GIVEN SIZE, THE BOARD GOES INTO GBOARD
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFoodCount++
            if (i === 0 || i === size - 1 || // outer layer
                j === 0 || j === size - 1 || // outer layer
                (j === 3 && i > 4 && i < size - 2)) { // certain spots for a wall
                board[i][j] = WALL
                gFoodCount--
            }
            if ((i === 1 && j === 1) || (i === 1 && j === size - 2)
                || (i === size - 2 && j === size - 2 ) || (i === size - 2 && j === 1)) {
                gFoodCount--
                board[i][j] = SUPERFOOD
            }
        }
    }
    gFoodCount-- // for pacman
    console.log(gFoodCount);
    //gFoodAmount = Math.pow((size - 2), 2) - 3 - 1 // food amount is equal to : the inner board squared - amount of walls - pacman himself 
    // make it dynamic
    return board
}

function updateScore(diff) { // updates the score, with a given parameter,  its in pacman JS, when pacman eats 
    // food its sent here as a param , sends 1 everytime.
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score

}

function gameOver() { //  ends the the game, setting the property isOn to false
    var elH3 = document.querySelector('div.modal h3')
    const elModal = document.querySelector('div.modal')
    var condition = 'Victorius'

    console.log(elH3);
    if (gFoodCount === 0) {
        elH3.innerText = condition
        clearInterval(gGhostsInterval)
        console.log('you won');
        gGame.isOn = false
        elModal.classList.remove('hidden')

    } else {
        condition = 'You lost'
        elH3.innerText = condition
        clearInterval(gGhostsInterval)
        console.log('Game Over')
        gGame.isOn = false
        elModal.classList.remove('hidden')
    }

}


function restartGame() {
    gGame.score = gFoodCount = 0
    const elScore = document.querySelector('h2 span')
    elScore.innerText = 0
    gGhosts = []
    init()
}