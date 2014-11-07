/*!
 * Tic-Tac-Tow Game
 * https://github.com/rf3Studios/tic-tac-toe-web
 *
 * Copyright 2014 Rich Friedel
 * Released under the MIT license
 */

/**
 * The playing area
 *
 * @param canvas
 * @param context
 *
 * @constructor
 */
function GameBoard(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.lineWidth = 2;

    // Some coords to make things simpler
    this.lftThirdX = Math.floor(this.canvas.width / 3);
    this.rgtThirdX = Math.floor(this.canvas.width / 1.5);
    this.topThirdY = Math.floor(this.canvas.height / 3);
    this.btmThirdY = Math.floor(this.canvas.height / 1.5);

    // Each quadrant array item is read clockwise starting at the top left corner
    // example -> [TopLeftCorner, TopRightCorner, BottomRightCorner, BottomLeftCorner]
    this.quadrants = [
        [ // Quad -> 0
            [0, 0],
            [this.lftThirdX, 0],
            [this.lftThirdX, this.topThirdY],
            [0, this.topThirdY]
        ],
        [ // Quad -> 1
            [this.lftThirdX, 0],
            [this.rgtThirdX, 0],
            [this.rgtThirdX, this.topThirdY],
            [this.lftThirdX, this.topThirdY]
        ],
        [ // Quad -> 2
            [this.rgtThirdX, 0],
            [this.canvas.width, 0],
            [this.canvas.width, this.topThirdY],
            [this.rgtThirdX, this.topThirdY]
        ],
        [ // Quad -> 3
            [0, this.topThirdY],
            [this.lftThirdX, this.topThirdY],
            [this.lftThirdX, this.btmThirdY],
            [0, this.btmThirdY]
        ],
        [ // Quad -> 4
            [this.lftThirdX, this.topThirdY],
            [this.rgtThirdX, this.topThirdY],
            [this.rgtThirdX, this.btmThirdY],
            [this.lftThirdX, this.btmThirdY]
        ],
        [ // Quad -> 5
            [this.rgtThirdX, this.topThirdY],
            [this.canvas.width, this.topThirdY],
            [this.canvas.width, this.btmThirdY],
            [this.rgtThirdX, this.btmThirdY]
        ],
        [ // Quad -> 6
            [0, this.btmThirdY],
            [this.lftThirdX, this.btmThirdY],
            [this.lftThirdX, this.canvas.height],
            [0, this.canvas.height]
        ],
        [ // Quad -> 7
            [this.lftThirdX, this.btmThirdY],
            [this.rgtThirdX, this.btmThirdY],
            [this.rgtThirdX, this.canvas.height],
            [this.lftThirdX, this.canvas.height]
        ],
        [ // Quad -> 8
            [this.rgtThirdX, this.btmThirdY],
            [this.canvas.width, this.btmThirdY],
            [this.canvas.width, this.canvas.height],
            [this.rgtThirdX, this.canvas.height]
        ]
    ];
}

/**
 * Draws the playing area (grid) on the GameBoard
 *
 * @param lnWidth The thickness of the grid lines
 * @param lnColor The color of the grid lines
 */
GameBoard.prototype.draw = function (lnWidth, lnColor) {
    // Give this at least a value of 2 pixels
    this.lineWidth = lnWidth === undefined ? 2 : lnWidth;

    // Default to white
    var lineColor = lnColor === undefined ? "white" : lnColor;

    var coords = [
        [0, this.lftThirdX, this.canvas.width, this.lftThirdX],
        [this.rgtThirdX, 0, this.rgtThirdX, this.canvas.width],
        [0, this.btmThirdY, this.canvas.height, this.btmThirdY],
        [this.topThirdY, 0, this.topThirdY, this.canvas.height]
    ];

    for (var i = 0; i < 4; i++) {
        this.context.beginPath();
        this.context.moveTo(coords[i][0], coords[i][1]);
        this.context.lineTo(coords[i][2], coords[i][3]);
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = lineColor;
        this.context.stroke();
    }
};

/**
 * Helper function that will return a quadrant given a specific set of (x, y) coordinates
 * If no quadrant can be found returns -1
 *
 * @param x The X coordinate
 * @param y The Y coordinate
 *
 * @returns {number} The quadrant on the GameBoard that correlates with the x and y coords or -1
 */
GameBoard.prototype.getQuadrant = function (x, y) {
    var quad = -1;

    // Each corner of the quadrant
    var insideTopLeft = false;
    var insideTopRight = false;
    var insideBottomLeft = false;
    var insideBottomRight = false;

    // This gives us a buffer to make sure that the x and y coords are inside of a quadrant
    var lineBuffer = Math.floor(this.lineWidth / 2);

    for (var i = 0; i < this.quadrants.length; i++) {
        for (var k = 0; k < this.quadrants[i].length; k++) {
            // There are going to be four items in each of these
            // So, for example, item[0] will look like
            // [x, y], [x, y], [x, y], [x, y]
            switch (k) {
                case 0: // Top Left
                    if (x > (this.quadrants[i][k][0] + lineBuffer) && y > (this.quadrants[i][k][1] + lineBuffer)) {
                        insideTopLeft = true;
                    }
                    break;
                case 1: // Top Right
                    if (x < (this.quadrants[i][k][0] - lineBuffer) && y > (this.quadrants[i][k][1] + lineBuffer)) {
                        insideTopRight = true;
                    }
                    break;
                case 2: // Bottom Right
                    if (x < (this.quadrants[i][k][0] - lineBuffer) && y < (this.quadrants[i][k][1] - lineBuffer)) {
                        insideBottomRight = true;
                    }
                    break;
                case 3: // Bottom Left
                    if (x > (this.quadrants[i][k][0] + lineBuffer) && y < (this.quadrants[i][k][1] - lineBuffer)) {
                        insideBottomLeft = true;
                    }
                    break;
                default :
                    break;
            }

        }

        // Check to see if all of the flags are true and if so set the quad to the current quadrant
        if (insideTopLeft && insideTopRight && insideBottomRight && insideBottomLeft) {
            quad = i;
            break;
        }
    }

    return Number(quad);
};