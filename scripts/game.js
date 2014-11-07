/*!
 * Tic-Tac-Tow Game
 * https://github.com/rf3Studios/tic-tac-toe-web
 *
 * Copyright 2014 Rich Friedel
 * Released under the MIT license
 */

/**
 * Initializes the game
 *
 * @param canvasWidth
 * @param canvasHeight
 */
function initGame(canvasWidth, canvasHeight) {
    var canvas = document.getElementById("game-canvas");
    var context = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var turnsTaken = 0;

    // Make the board
    var gameBoard = new GameBoard(canvas, context);
    gameBoard.draw(4, "white");

    // Create a player X object
    var playerX = new GamePieceX(canvas, context, 4, "red");

    // Create a player O object
    var playerO = new GamePieceO(canvas, context, 4, "green");


    canvas.onclick = function (e) {
        // The max amount of turns possible is 9 so if we are above that
        // there is no need to do the rest of the stuff
        if (turnsTaken < 9) {
            var quad = gameBoard.getQuadrant(e.clientX, e.clientY);

            if (playerO.moves.indexOf(quad) === -1 && playerX.moves.indexOf(quad) === -1) {

                if (turnsTaken % 2) {
                    playerO.draw(quad);
                    playerO.moves.push(quad);

                    if (playerX.moves.length >= 3) {
                        if (checkForWin(playerO.moves)) {
                            // TODO: Fix this
                            turnsTaken = 9;
                            console.log("Player O WINS!!!");
                            return;
                        }
                    }
                } else {
                    playerX.draw(quad);
                    playerX.moves.push(quad);

                    if (playerX.moves.length >= 3) {
                        if (checkForWin(playerX.moves)) {
                            // TODO: Fix this
                            turnsTaken = 9;
                            console.log("Player X WINS!!!");
                            return;
                        }
                    }
                }

                turnsTaken++;
            }
        }
    }
}

/**
 * Helper function that takes an array of player moves and checks to see if
 * it matches a winning combination of quadrants.
 *
 * @param playerMoves An array of quadrants that the player has a piece.
 *
 * @returns {boolean} Returns true if there is a match, false if not.
 */
function checkForWin(playerMoves) {
    // Setup all the possible winning combinations
    var winningCombos = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

    // Set the flag to false
    var comboMatch = false;

    // Loop through the possible winning combos
    for (var i = 0; i < winningCombos.length; i++) {
        var matches = [];

        // Loop through each quad in each combo array
        for (var k = 0; k < winningCombos[i].length; k++) {

            // Loop through each quad in the players moves
            for (var j = 0; j < playerMoves.length; j++) {
                // If the quad in the player's moves matches the quad in the winningCombo array
                if (playerMoves[j] === winningCombos[i][k]) {
                    // Push the number into the matches array
                    matches.push(winningCombos[i][k]);
                }
            }
        }

        // If the matches array length equals 3 then we know we have a winningCombo
        if (matches.length === 3) {
            // Set the match flag to true
            comboMatch = true;

            // Break out of the loop
            break;
        }

        // Clear out the match array
        while (matches.length > 0) {
            matches.pop();
        }
    }

    // Return whether there was a winningCombo match or not
    return comboMatch;
}
