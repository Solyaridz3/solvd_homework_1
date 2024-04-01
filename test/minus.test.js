const String = require('../StringMath');


describe('String.prototype.minus', () => {
    test('subtracts a smaller number from a larger number', () => {
        expect("1000".minus("999")).toBe("1");
    });

    test('subtracts a larger number from a smaller number', () => {
        expect(() => "999".minus("1000")).toThrowError('For subtraction, ensure that the first parameter is always greater than the second parameter.');
    });

    test('subtracts a positive number from a negative number', () => {
        expect("5".minus("2")).toBe("3");
    });

    test('subtracts zero from a positive number', () => {
        expect("5".minus("0")).toBe("5");
    });

    test('subtracts a positive number from zero', () => {
        expect(()=>"0".minus("5")).toThrowError('For subtraction, ensure that the first parameter is always greater than the second parameter.');
    });

    test('subtracts zero from zero', () => {
        expect("0".minus("0")).toBe("0");
    });

    test('subtracts large numbers', () => {
        expect("12345678901234567890".minus("9876543210987654321")).toBe("2469135690246913569");
    });

});