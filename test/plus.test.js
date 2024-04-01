const String = require('../StringMath');


describe('String.prototype.plus', () => {
    test('should correctly add two positive numbers of the same length', () => {
        expect('123'.plus('456')).toBe('579');
    });

    test('should correctly add two positive numbers of different lengths', () => {
        expect('1234'.plus('56')).toBe('1290');
    });

    test('should correctly add a positive number and zero', () => {
        expect('1234'.plus('0')).toBe('1234');
    });

    test('should correctly handle adding with leading zeros', () => {
        expect('005'.plus('05')).toBe('10');
    });
    test('adds two numbers with same length', () => {
        expect("123".plus("456")).toBe("579");
    });

    test('adds two numbers with different lengths', () => {
        expect("12345".plus("6789")).toBe("19134");
    });

    test('adds two zero strings', () => {
        expect("0".plus("0")).toBe("0");
    });

    test('adds a large number to a small number', () => {
        expect("999999999999999999999999999".plus("1")).toBe("1000000000000000000000000000");
    });

    test('adds two large numbers', () => {
        expect("12345678901234567890".plus("9876543210987654321")).toBe("22222222112222222211");
    });


    test('adds a large number to a large number', () => {
        expect("12345678901234567890".plus("9876543210987654321")).toBe("22222222112222222211");
    });

});