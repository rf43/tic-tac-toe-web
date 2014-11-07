/*!
 * Tic-Tac-Tow Game
 * https://github.com/rf3Studios/tic-tac-toe-web
 *
 * Copyright 2014 Rich Friedel
 * Released under the MIT license
 */

/**
 * The game piece (player)
 *
 * @param canvas
 * @param context
 * @param lineWidth
 * @param lineColor
 *
 * @constructor
 */
function GamePiece(canvas, context, lineWidth, lineColor) {
    this.canvas = canvas;
    this.context = context;

    this.thickness = lineWidth === undefined ? 2 : lineWidth;
    this.color = lineColor === undefined ? "purple" : lineColor;

    this.moves = [];

    // Some coords to make things simpler
    this.lftThirdX = Math.floor(this.canvas.width / 3);
    this.rgtThirdX = Math.floor(this.canvas.width / 1.5);
    this.topThirdY = Math.floor(this.canvas.height / 3);
    this.btmThirdY = Math.floor(this.canvas.height / 1.5);
}

/**
 * The player that uses the X
 *
 * @param canvas
 * @param context
 * @param lineWidth
 * @param lineColor
 *
 * @constructor
 */
function GamePieceX(canvas, context, lineWidth, lineColor) {
    GamePiece.apply(this, [canvas, context, lineWidth, lineColor]);
}

/**
 * The player that uses the O
 *
 * @param canvas
 * @param context
 * @param lineWidth
 * @param lineColor
 *
 * @constructor
 */
function GamePieceO(canvas, context, lineWidth, lineColor) {
    GamePiece.apply(this, [canvas, context, lineWidth, lineColor]);
}

GamePieceX.prototype = Object.create(GamePiece);
GamePieceO.prototype = Object.create(GamePiece);

/**
 * Draws the X game piece on the GameBoard
 *
 * @param quadrant The quadrant that the X should be drawn in
 */
GamePieceX.prototype.draw = function (quadrant) {
    var leftLineStartPointX, leftLineStartPointY, leftLineEndPointX, leftLineEndPointY;
    var rightLineStartPointX, rightLineStartPointY, rightLineEndPointX, rightLineEndPointY;

    var widthPadding = this.lftThirdX * .1;
    var heightPadding = this.topThirdY * .1;

    switch (quadrant) {
        case 0:
            leftLineStartPointX = widthPadding;
            leftLineStartPointY = heightPadding;
            leftLineEndPointX = this.lftThirdX - widthPadding;
            leftLineEndPointY = this.topThirdY - heightPadding;

            rightLineStartPointX = this.lftThirdX - widthPadding;
            rightLineStartPointY = heightPadding;
            rightLineEndPointX = widthPadding;
            rightLineEndPointY = this.topThirdY - heightPadding;
            break;
        case 1:
            leftLineStartPointX = this.lftThirdX + widthPadding;
            leftLineStartPointY = heightPadding;
            leftLineEndPointX = this.rgtThirdX - widthPadding;
            leftLineEndPointY = this.topThirdY - heightPadding;

            rightLineStartPointX = this.rgtThirdX - widthPadding;
            rightLineStartPointY = heightPadding;
            rightLineEndPointX = this.lftThirdX + widthPadding;
            rightLineEndPointY = this.topThirdY - heightPadding;
            break;
        case 2:
            leftLineStartPointX = this.rgtThirdX + widthPadding;
            leftLineStartPointY = heightPadding;
            leftLineEndPointX = this.canvas.width - widthPadding;
            leftLineEndPointY = this.topThirdY - heightPadding;

            rightLineStartPointX = this.canvas.width - widthPadding;
            rightLineStartPointY = heightPadding;
            rightLineEndPointX = this.rgtThirdX + widthPadding;
            rightLineEndPointY = this.topThirdY - heightPadding;
            break;
        case 3:
            leftLineStartPointX = widthPadding;
            leftLineStartPointY = this.topThirdY + heightPadding;
            leftLineEndPointX = this.lftThirdX - widthPadding;
            leftLineEndPointY = this.btmThirdY - heightPadding;

            rightLineStartPointX = this.lftThirdX - widthPadding;
            rightLineStartPointY = this.topThirdY + heightPadding;
            rightLineEndPointX = widthPadding;
            rightLineEndPointY = this.btmThirdY - heightPadding;
            break;
        case 4:
            leftLineStartPointX = this.lftThirdX + widthPadding;
            leftLineStartPointY = this.topThirdY + heightPadding;
            leftLineEndPointX = this.rgtThirdX - widthPadding;
            leftLineEndPointY = this.btmThirdY - heightPadding;

            rightLineStartPointX = this.rgtThirdX - widthPadding;
            rightLineStartPointY = this.topThirdY + heightPadding;
            rightLineEndPointX = this.lftThirdX + widthPadding;
            rightLineEndPointY = this.btmThirdY - heightPadding;
            break;
        case 5:
            leftLineStartPointX = this.rgtThirdX + widthPadding;
            leftLineStartPointY = this.topThirdY + heightPadding;
            leftLineEndPointX = this.canvas.width - widthPadding;
            leftLineEndPointY = this.btmThirdY - heightPadding;

            rightLineStartPointX = this.canvas.width - widthPadding;
            rightLineStartPointY = this.topThirdY + heightPadding;
            rightLineEndPointX = this.rgtThirdX + widthPadding;
            rightLineEndPointY = this.btmThirdY - heightPadding;
            break;
        case 6:
            leftLineStartPointX = widthPadding;
            leftLineStartPointY = this.btmThirdY + heightPadding;
            leftLineEndPointX = this.lftThirdX - widthPadding;
            leftLineEndPointY = this.canvas.height - heightPadding;

            rightLineStartPointX = this.lftThirdX - widthPadding;
            rightLineStartPointY = this.btmThirdY + heightPadding;
            rightLineEndPointX = widthPadding;
            rightLineEndPointY = this.canvas.height - heightPadding;
            break;
        case 7:
            leftLineStartPointX = this.lftThirdX + widthPadding;
            leftLineStartPointY = this.btmThirdY + heightPadding;
            leftLineEndPointX = this.rgtThirdX - widthPadding;
            leftLineEndPointY = this.canvas.height - heightPadding;

            rightLineStartPointX = this.rgtThirdX - widthPadding;
            rightLineStartPointY = this.btmThirdY + heightPadding;
            rightLineEndPointX = this.lftThirdX + widthPadding;
            rightLineEndPointY = this.canvas.height - heightPadding;
            break;
        case 8:
            leftLineStartPointX = this.rgtThirdX + widthPadding;
            leftLineStartPointY = this.btmThirdY + heightPadding;
            leftLineEndPointX = this.canvas.width - widthPadding;
            leftLineEndPointY = this.canvas.height - heightPadding;

            rightLineStartPointX = this.canvas.width - widthPadding;
            rightLineStartPointY = this.btmThirdY + heightPadding;
            rightLineEndPointX = this.rgtThirdX + widthPadding;
            rightLineEndPointY = this.canvas.height - heightPadding;
            break;
        default :
            leftLineStartPointX = leftLineStartPointY = leftLineEndPointX = leftLineEndPointY = 0;
            rightLineStartPointX = rightLineStartPointY = rightLineEndPointX = rightLineEndPointY = 0;
            break;
    }

    // Left line
    this.context.beginPath();
    this.context.moveTo(leftLineStartPointX, leftLineStartPointY);
    this.context.lineTo(leftLineEndPointX, leftLineEndPointY);
    this.context.lineWidth = this.thickness;
    this.context.strokeStyle = this.color;
    this.context.stroke();

    // Right line
    this.context.beginPath();
    this.context.moveTo(rightLineStartPointX, rightLineStartPointY);
    this.context.lineTo(rightLineEndPointX, rightLineEndPointY);
    this.context.lineWidth = this.thickness;
    this.context.strokeStyle = this.color;
    this.context.stroke();
};

/**
 * Draws the O piece on the GameBoard
 *
 * @param quadrant The quadrant that the O should be drawn in
 */
GamePieceO.prototype.draw = function (quadrant) {
    var centerX, centerY;

    var leftColX = Math.floor(this.lftThirdX / 2);
    var midColX = Math.floor(this.lftThirdX + (this.lftThirdX / 2));
    var rightColX = Math.floor(this.canvas.width - (this.lftThirdX / 2));

    var topRowY = Math.floor(this.topThirdY / 2);
    var midRowY = Math.floor(this.topThirdY + (this.topThirdY / 2));
    var bottomRowY = Math.floor(this.canvas.height - (this.topThirdY / 2));

    var radius = Math.floor((this.lftThirdX / 2) - (this.lftThirdX / 2) * .2);

    switch (quadrant) {
        case 0:
            centerX = leftColX;
            centerY = topRowY;
            break;
        case 1:
            centerX = midColX;
            centerY = topRowY;
            break;
        case 2:
            centerX = rightColX;
            centerY = topRowY;
            break;
        case 3:
            centerX = leftColX;
            centerY = midRowY;
            break;
        case 4:
            centerX = midColX;
            centerY = midRowY;
            break;
        case 5:
            centerX = rightColX;
            centerY = midRowY;
            break;
        case 6:
            centerX = leftColX;
            centerY = bottomRowY;
            break;
        case 7:
            centerX = midColX;
            centerY = bottomRowY;
            break;
        case 8:
            centerX = rightColX;
            centerY = bottomRowY;
            break;
        default :
            centerX = centerY = 0;
            break;
    }

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.lineWidth = this.thickness;
    this.context.strokeStyle = this.color;
    this.context.stroke();
};