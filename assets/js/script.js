const pixelDensity = 4;
let nbX, nbY = 0;

let grid = [];
let oldGrid = [];

let gameOfLife = new GameOfLife();

let pause = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateMapDimension();
    resetGrid();
    displayGrid();

    frameRate(30);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateMapDimension();
    resetGrid();
    displayGrid();
}

function updateMapDimension() {
    nbX = width / pixelDensity;
    nbY = height / pixelDensity;
}

function resetGrid() {
    for (let x = 0; x < nbX; x++) {
        grid[x] = [];
        for (let y = 0; y < nbY; y++) {
            grid[x][y] = -1;
        }
    }

    gameOfLife.setGrid(grid);
}

function deepCopy2DArray(array) {
    // Use map to create a new array with new inner arrays
    return array.map(row => row.slice());
}

function loadPattern(patternNumber) {
    switch (patternNumber) {
        case 1:
            // glider generator
            gameOfLife.updateCell(2, 6, 1);
            gameOfLife.updateCell(2, 7, 1);
            gameOfLife.updateCell(3, 6, 1);
            gameOfLife.updateCell(3, 7, 1);

            gameOfLife.updateCell(12, 6, 1);
            gameOfLife.updateCell(12, 7, 1);
            gameOfLife.updateCell(12, 8, 1);

            gameOfLife.updateCell(13, 5, 1);
            gameOfLife.updateCell(13, 9, 1);

            gameOfLife.updateCell(14, 4, 1);
            gameOfLife.updateCell(14, 10, 1);

            gameOfLife.updateCell(15, 4, 1);
            gameOfLife.updateCell(15, 10, 1);

            gameOfLife.updateCell(16, 7, 1);

            gameOfLife.updateCell(17, 5, 1);
            gameOfLife.updateCell(17, 9, 1);

            gameOfLife.updateCell(18, 6, 1);
            gameOfLife.updateCell(18, 7, 1);
            gameOfLife.updateCell(18, 8, 1);

            gameOfLife.updateCell(19, 7, 1);

            gameOfLife.updateCell(22, 4, 1);
            gameOfLife.updateCell(22, 5, 1);
            gameOfLife.updateCell(22, 6, 1);

            gameOfLife.updateCell(23, 4, 1);
            gameOfLife.updateCell(23, 5, 1);
            gameOfLife.updateCell(23, 6, 1);

            gameOfLife.updateCell(24, 3, 1);
            gameOfLife.updateCell(24, 7, 1);

            gameOfLife.updateCell(26, 2, 1);
            gameOfLife.updateCell(26, 3, 1);
            gameOfLife.updateCell(26, 7, 1);
            gameOfLife.updateCell(26, 8, 1);

            gameOfLife.updateCell(36, 5, 1);
            gameOfLife.updateCell(36, 4, 1);

            gameOfLife.updateCell(37, 5, 1);
            gameOfLife.updateCell(37, 4, 1);
            break;
        case 2:
            let = middleX = Math.round(nbX / 2);

            for (let y = 0; y < nbY; y++) {
                gameOfLife.updateCell(middleX, y, 1);
            }
            break;
        case 3:
            let = middleY = Math.round(nbY / 2);

            for (let x = 0; x < nbX; x++) {
                gameOfLife.updateCell(x, middleY, 1);
            }
            break;
    }
}

function mousePressed() {
    handleMouseAction();
}

function mouseDragged() {
    handleMouseAction();
}


function handleMouseAction() {
    pause = true;

    let mx = parseCoord(mouseX);
    let my = parseCoord(mouseY);

    let oldGrid = deepCopy2DArray(gameOfLife.grid);
    let isChange = gameOfLife.updateCell(mx, my, mouseButton == "left" ? 1 : -1);

    if (isChange) displayGrid(oldGrid);
}

function parseCoord(val) {
    return Math.floor(val / pixelDensity);
}

function keyPressed() {
    let oldGrid = null;

    switch (key) {
        case 'Enter':
            pause = true;
            gameIteration();
            break;
        case ' ':
            pause = false;
            break;
        case 'Backspace':
            oldGrid = deepCopy2DArray(gameOfLife.grid);
            resetGrid();
            displayGrid(oldGrid);
            break;
        case '1':
        case '2':
        case '3':
            pause = true;
            oldGrid = deepCopy2DArray(gameOfLife.grid);
            loadPattern(parseInt(key));
            displayGrid(oldGrid);
            break;
        case 'c':
            console.log(grid);
            break;
    }
}

function draw() {
    if (!pause) {
        gameIteration();
    }
}

function gameIteration() {
    let oldGrid = deepCopy2DArray(gameOfLife.grid);
    gameOfLife.calculateNextState();
    displayGrid(oldGrid);
}

function displayGrid(oldGrid = null) {
    // strokeWeight(0.1);
    // stroke(80);
    noStroke();
    for (let x = 0; x < gameOfLife.grid.length; x++) {
        for (let y = 0; y < gameOfLife.grid[x].length; y++) {
            if (!oldGrid || oldGrid[x][y] != gameOfLife.grid[x][y]) {
                if (oldGrid) console.log("draw");
                let color = gameOfLife.grid[x][y] == 1 ? 220 : 0;
                fill(color);
                rect(x * pixelDensity, y * pixelDensity, pixelDensity, pixelDensity);
            }
        }
    }
}