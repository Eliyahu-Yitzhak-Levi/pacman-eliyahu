'use strict'

const GHOST = '&#9781' //'\u{1F47B}'
var gGhosts = [] // a global array of the amount of ghosts.
var gEatenGhosts = [] // a global variable for eaten ghosts, stores them and returns them after 5 seconds to the model.
var gGhostsInterval // interval for moving the ghosts

function createGhosts(board, ghostAmount = 3) { // recives a board, inorder to to make a ghost , INORDER TO MAKE ghosts
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < ghostAmount; i++) {
        createGhost(board) // createGhost need a param ,  thefor we pass param at the start(could pass gBoard aswell.)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000) // THIS MAKES THE MOVE GHOST FUNCTION REPEAT ITSELF
    // NO WHERE IN THIS CODE DID WE CLEAN THIS INTERVAL, THERFOR WE KEEP IT ALIVE.
}

//color updated after next move only
//function acting weird, 


function createGhost(board) { // makes a ghost 
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = { // HAS 2 PROPERTIS : 

        location: { i: 3, j: 3 },//location with I and J ,

        currCellContent: FOOD,//currentCellContent (used to save w/e came before the ghost moved)

        color: getRandomColor()


    }
    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost) // adds the ghost into the global array

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST // sets the location of the ghost in the MODEL, on the board
}


function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]) // goes over the array of the global ghosts, and uses moveGhost on each one of them.
    }
}

function moveGhost(ghost) { // recives a ghost with location i,j and currCellContent

    const moveDiff = getMoveDiff() // recives an object which tells us the diffrence between :
    // the current move of the ghost and the next move of the ghost
    const nextLocation = { // makes a new object : adding the ghost object i and j and moveDiff object i and j
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j] // store the next cell TYPE(FOOD,GHOST,WALL)
    // gBoard - the mat
    // nextLocation.i - the next cell i
    // nextLocation.j - the next cell j


    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return // used to ignore ghosts and walls collision, INTERVAL ISNT CLEARD THATS WHY
    // GHOSTS KEEP MOVING

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) { // are you not true? are you false?
            gameOver()
            return
        }
        else {
            //console.log('iam in else pacman super');
            // removeGhost(ghost.location)
            // console.log(ghost.location);
            // console.log('nextLocation', nextLocation);
            // setTimeout(() => renderCell(nextLocation, PACMAN), 1)
            // if(nextLocation.i !== gPacman.location.i && 
            //     nextLocation.j !== gPacman.location.j){
            //     renderCell(nextLocation, EMPTY)
            // }
            // renderCell(nextLocation, PACMAN)
            // gPacman.location = nextLocation
            return
        }
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function removeGhost(location) {
    for (let i = 0; i < gGhosts.length; i++) {
        if ((location.i === gGhosts[i].location.i) && (location.j === gGhosts[i].location.j)) {
            if (gGhosts[i].currCellContent === FOOD) {
                updateScore(1);
            }
            gGhosts[i].currCellContent = EMPTY; // Update currCellContent before splicing
            gEatenGhosts.push(gGhosts.splice(i, 1)[0]);
        }
    }
}


function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    //console.log(ghost);
    if (gPacman.isSuper === true) {
        return `<span style="color: aliceblue;">${GHOST}</span>`
    } else {
        return `<span style="color: ${ghost.color};">${GHOST}</span>`
    }
}