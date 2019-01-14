const Grid = require('./grid');

const compass = ['N', 'E', 'S', 'W'];
let history = [];
let scents = [];

class Robot {

    constructor({grid, position, instructions}) {
        this.grid = grid.toUpperCase();
        this.position = position.toUpperCase();
        this.instructions = instructions.toUpperCase();
        this.marsGrid = new Grid(grid).createGrid();
    }

    // Initiate the robot
    start() {

        const positionArr = this.position.split(/[ ,]+/);

        // Push initial position
        history.push({
            x: parseInt(positionArr[0]),
            y: parseInt(positionArr[1]),
            direction: positionArr[2]
        });

        return this.runSequence(this.instructions);
    }

    // Rotate robot to given direction
    rotate(orientation) {

        const direction = compass.indexOf(history[history.length - 1].direction) + orientation;

        const currentDir = direction < 0 ?
            3 : direction > 3 ? 0 : direction;

        this.addStep({direction: compass[currentDir]});

    }

    // Add the next step in the sequence
    addStep(coords) {

        const curPos = history[history.length - 1];
        const step = Object.assign({}, curPos, coords);

        // Exit if last step has lost value
        if (curPos.lost) {
            return;
        }

        if (this.inBounds(step)) {
            history.push(step);
        } else {
            history.push(Object.assign({}, {lost: true}, curPos));
            scents.push(Object.assign({}, {lost: true}, curPos));
        }
    }

    // Check if the next step is in bounds of the grid
    inBounds(coords) {

        const inBounds = parseInt(coords.x) <= this.marsGrid.x
        && parseInt(coords.y) <= this.marsGrid.y;

        return inBounds;

    }

    // Move robot forward based on current direction
    moveForward() {
        let step = {};

        const {y, x, direction} = history[history.length - 1];

        switch (direction) {
            case  String(direction.match(/n/gi)):
                step.y = parseInt(y) + 1;
                break;
            case String(direction.match(/e/gi)):
                step.x = parseInt(x) + 1;
                break;
            case String(direction.match(/s/gi)):
                step.y = parseInt(y) - 1;
                break;
            case String(direction.match(/w/gi)):
                step.x = parseInt(x) - 1;
                break;
            default:
                console.log('no movement');
                break;
        }

        this.addStep(step);
    }

    // Run the instruction sequence
    runSequence(instructions) {

        instructions.split('').map(instruction => {

            const {x, y, direction} = history[history.length - 1];

            // Check for robot scent
            let activeScent = false;

            if (scents.length) {
                scents.forEach(scent =>{
                    if (x === scent.x && y === scent.y
                        && scent.direction === direction) {
                        activeScent = true;
                    }
                });
            }

            switch (instruction) {
                case  String(instruction.match(/l/gi)):
                    this.rotate(-1);
                    break;
                case String(instruction.match(/r/gi)):
                    this.rotate(1);
                    break;
                case String(instruction.match(/f/gi)):
                    if (!activeScent) {
                        this.moveForward();
                    }
                    break;
                default:
                    console.log('no match');
                    break;
            }
        });

        const {x, y, direction, lost} = history[history.length - 1];

        const result = `${x} ${y} ${direction}${lost ? ' LOST' : ''}`;

        return result;
    }
}

module.exports = Robot;
