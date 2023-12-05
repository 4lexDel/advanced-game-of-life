class GameOfLife {
    constructor(grid = null) {
        // Grid value :
        /**
         * -1 => dead cell
         * 1 => alive cell
         * -10 => cell will die
         * 10 => cell will born
         */
        this.grid = grid;
    }

    updateCell(x, y, val) {
        let result = false;
        if (this.isCoordValid(x, y)) {
            if (this.grid[x][y] != val) result = true;
            this.grid[x][y] = val;
        }
        return result;
    }

    isCoordValid(x, y) {
        if (!this.grid || x < 0 || x >= this.grid.length || y < 0 || y >= this.grid[0].length) return false;
        return true;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    calculateNextState() {
        if (grid) {
            for (let x = 0; x < this.grid.length; x++) {
                for (let y = 0; y < this.grid[x].length; y++) {
                    let neighboursCount = this.countNeighbours(x, y);

                    if (this.grid[x][y] == -1) {
                        if (neighboursCount == 3) {
                            this.grid[x][y] = 10;
                        }
                    } else if (this.grid[x][y] == 1) {
                        if (neighboursCount < 2 || neighboursCount > 3) {
                            this.grid[x][y] = -10;
                        }
                    }
                }
            }
            this.setFinalState();
        }
    }

    setFinalState() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                if (this.grid[x][y] == -10) this.grid[x][y] = -1;
                else if (this.grid[x][y] == 10) this.grid[x][y] = 1;
            }
        }
    }

    countNeighbours(x, y) {
        const directions = [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: -1, y: -1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
        ];

        let neighboursCount = 0;

        directions.forEach(direction => {
            let tx = x + direction.x;
            let ty = y + direction.y;

            if (this.isCoordValid(tx, ty)) {
                if (this.grid[tx][ty] == 1 || this.grid[tx][ty] == -10) neighboursCount++;
            }
        });

        return neighboursCount;
    }
}