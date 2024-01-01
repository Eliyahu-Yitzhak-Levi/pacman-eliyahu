'use strict'

function renderBoard(mat, selector) { // makes a board, takes a mat and a selector to add the HTML mat into it.

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j] // WHATS IN THE CELL? WALL, PACMAN, FOOD
            const className = `cell cell-${i}-${j}` // A CLASS WITH I AND J changes accordingly 

            strHTML += `<td class="${className}">${cell}</td>` // MAKES A TEMPLATE STRING WITH CLASS NAME AND WHATS IN IT
        }
        strHTML += '</tr>'
    }

    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector) // WHERE U ADD THE HTML TABLE.
    elContainer.innerHTML = strHTML

}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    // const elCell = document.querySelector(`[data-i="${location.i}"][data-j="${location.j}"]`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getClassName(position) {// receives an object of i and j, therfor dot notion here works (its like assgining position = {i , j})
    const cellClass = `cell-${position.i}-${position.j}` // template string of a cell to be added into every td in the HTML,
    // with a uniqe class of the current position of given {i , j} for example : cell-3-4  // cell-${i}-${j}`
    return cellClass
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}