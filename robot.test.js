const Robot = require('./robot');

describe('Robot Tests', () => {

    // Check successful instructions
    test('Check output when robot successfully stays on grid', () => {

        const testData = {grid: '5 3', position: '1 1 E', instructions: 'RFRFRFRF'};

        const result = new Robot(testData).start();

        expect(result).toBe('1 1 E');

    });

    // Check when fallen off grid (unsuccessful)
    test('Check output when robot falls off grid', () => {

        const testData = {grid: '5 3', position: '3 2 N', instructions: 'FRRFLLFFRRFLL'};

        const result = new Robot(testData).start();

        expect(result).toBe('3 3 N LOST');

    });

    // Detect scent and ignore move
    test('Detect scent and ignore move', () => {

        const testData = {grid: '5 3', position: '0 3 W', instructions: 'LLFFFLFLFL'};

        const result = new Robot(testData).start();

        expect(result).toBe('2 3 S');

    });

    // Test lowercase input
    test('Test lowercase input', () => {

        const testData = {grid: '5 3', position: '1 1 e', instructions: 'rfrfrfrf'};

        const result = new Robot(testData).start();

        expect(result).toBe('1 1 E');

    });

    // Test uppercase input
    test('Test uppercase input', () => {

        const testData = {grid: '5 3', position: '1 1 e', instructions: 'RFRFRFRF'};

        const result = new Robot(testData).start();

        expect(result).toBe('1 1 E');

    });

});
