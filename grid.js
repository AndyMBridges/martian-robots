class Grid {

    constructor(grid) {
        this.grid = grid;
    }

    createGrid() {
        return {
            x: parseInt(this.grid.charAt(0)),
            y: parseInt(this.grid.slice(-1))
        };
    }
}

module.exports = Grid;
