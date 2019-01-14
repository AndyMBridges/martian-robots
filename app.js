const readline = require('readline');
const Robot = require('./robot');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let grid = '';
let position = '';
let instructions = '';

const createGrid = () => {

    rl.question('Please enter grid size for world: ', answer => {
        grid = answer;
        getPosition();
    });

};

const getPosition = () => {

    rl.question('Please enter robot starting position: ', answer => {
        position = answer;
        getInstructions();
    });

};

const getInstructions = () => {

    rl.question('Please enter instructions: ', answer => {
        instructions = answer;
        let answers = {grid, position, instructions};

        if (answer.length >= 100) {
            throw new Error('Instructions must be 100 characters max');
        }

        if (!answer.match(/^[l|r|f]*$/gi)) {
            throw new Error('Invalid instruction sequence');
        }

        const result = new Robot(answers).start();

        console.log('result: ', result);
        nextRobot();
    });

};

const nextRobot = () => {

    rl.question('Would you like to add another robot? (Y/N) ', answer => {
        if (answer.match(/y/gi)) {
            getPosition();
        } else {
            rl.close();
        }
    });

};

createGrid();
