import React, { Component } from 'react';
import './Board.scss';

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const DEFAULT_OPTIONS = {
    lineWidthDevider: 15,
};

function getRelativeMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.handleMouseEvent = this.handleMouseEvent.bind(this);
    }

    componentDidMount() {
        const { boardSize, options = DEFAULT_OPTIONS } = this.props;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const tileSize = CANVAS_WIDTH / boardSize;
        const lineWidth = tileSize / options.lineWidthDevider;

        this.drawBoard({ ctx, tileSize, lineWidth });
        this.drawTileList({ ctx, tileSize, lineWidth });
    }

    componentDidUpdate(prevProps, prevState) {
        const { boardSize, options = DEFAULT_OPTIONS } = this.props;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const tileSize = CANVAS_WIDTH / boardSize;
        const lineWidth = tileSize / options.lineWidthDevider;

        this.drawBoard({ ctx, tileSize, lineWidth });
        this.drawTileList({ ctx, tileSize, lineWidth });
    }

    drawBoard({ ctx, tileSize, lineWidth }) {
        const { boardSize } = this.props;

        // draw the background
        ctx.fillStyle = 'rgb(114, 192, 232)'; // $primary3
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // draw the lines
        ctx.fillStyle = 'rgb(77, 75, 73)'; // $neutral3-5
        for (let i = 1; i <= boardSize - 1; i++) {
            ctx.fillRect(tileSize * i - lineWidth / 2, 0, lineWidth, CANVAS_WIDTH);
            ctx.fillRect(0, tileSize * i - lineWidth / 2, CANVAS_WIDTH, lineWidth);
        }
    }

    drawTileList({ ctx, tileSize, lineWidth }) {
        const { tileList, boardSize } = this.props;

        tileList.forEach((char, index) => {
            const tile = {
                char,
                x: (index) % boardSize,
                y: Math.floor((index) / boardSize),
            };
            this.drawTile(tile, { ctx, tileSize, lineWidth });
        });
    }

    drawTile(tile, { ctx, tileSize }) {
        ctx.strokeStyle = "rgb(175, 175, 175)";
        ctx.lineWidth = tileSize / 10;

        ctx.font = `${tileSize - 4}px Arial`;
        const textWidth = ctx.measureText(tile.char).width;
        const offsetX = (tileSize - textWidth) / 2;
        const textPos = {
            x: tile.x * tileSize + offsetX, // select the x-position based on the width of the rendered symbol
            y: (tile.y + 0.85) * tileSize,
        }
        ctx.fillText(tile.char, textPos.x, textPos.y);
    }

    handleMouseEvent(event) {
        const { boardSize, tileClicked } = this.props;
        const canvas = document.getElementById('canvas');
        const tileSize = CANVAS_WIDTH / boardSize;

        var pos = getRelativeMousePos(canvas, event);

        const i = Math.floor(pos.x / tileSize);
        const j = Math.floor(pos.y / tileSize);
        const tileIndex = j * boardSize + i;

        tileClicked(tileIndex);
    }

    render() {
        return (
            <canvas id='canvas' width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onClick={this.handleMouseEvent}></canvas>
        );
    }
}

export default Board;
