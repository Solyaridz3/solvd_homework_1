const LEADING_ZEROS = /^0+/;


/**
 * Function to compare two numbers represented as strings and check
 * if the first number is greater than the second number
 *
 * @param {string} num1 First number
 * @param {string} num2 Second number
 * @returns {boolean}
 */
const checkForBigger = (num1, num2) => {
    // If num1 or num2 is empty, return false
    if (!num1 || !num2) return false;

    // Remove leading zeros from num1 and num2
    num1 = num1.replace(LEADING_ZEROS, '');
    num2 = num2.replace(LEADING_ZEROS, '');

    // If the length of num1 is greater than the length of num2, num1 is greater
    if (num1.length > num2.length) return true;

    // If the lengths are equal, compare the numbers
    if (num1.length === num2.length) {
        for (let i = 0; i < num1.length; i++) {
            // Compare digits at each position
            if (Number(num1[i]) > Number(num2[i])) return true;
            if (Number(num1[i]) < Number(num2[i])) return false;
        }
    }

    // If num1 is not greater than num2 return false
    return false;
}


/**
 * Adds a number represented as a string to the current string.
 * @param {string} plusString The number string to add to the current string.
 * @returns {string} The result of adding the number string to the current string.
 */
String.prototype.plus = function (plusString) {
    // Determine biggest length of strings
    const biggestLength = plusString.length > this.length ? plusString.length : this.length;

    // Initialize variables to store the result and variable to store temp value (carry-over)
    let result = '';
    let temp = 0;

    for (let i = 1; i <= biggestLength; i++) {
        // Get the digits to add at the current position, assigning 0 if the strings are shorter
        const baseNum = this[this.length - i] || '0';
        const toPlusNum = plusString[plusString.length - i] || '0';

        // Perform addition and store the result
        const sum = Number(toPlusNum) + Number(baseNum) + temp;
        temp = Math.floor(sum / 10); // Calculate carry-over
        result = sum % 10 + result; // Prepending remainder from division by 10 to the result string
    }

    // Add any remaining carry-over
    result = temp + result;

    // Remove leading zeros from the result, or return '0' if the result is zero
    return result.replace(LEADING_ZEROS, '') || '0';
}

/**
 * Subtracts a number represented as a string from the current string.
 * @param {string} numString The number string to subtract from the current string.
 * @returns {string} The result of subtracting the number string from the current string.
 * @throws {Error} If the number from which we subtract is less than the denominator
 */
String.prototype.minus = function (numString) {
    // Remove leading zeros from both the current string and the number string
    // or assign 0 if string contains only zero values or string is empty
    let base = this.toString().replace(LEADING_ZEROS, '') || '0';
    numString = numString.replace(LEADING_ZEROS, '') || '0';

    // Check if the current string is greater than or equal to the number string
    let isBaseGreater = checkForBigger(base, numString);
    if (!isBaseGreater && numString !== base) {
        // If the current string is not greater (or at least equal) than the number string, throw an error
        throw new Error('For subtraction, ensure that the first parameter is always greater than the second parameter.');
    }

    // Reverse the digits of both strings for easier subtraction
    base = base.split('').toReversed();
    const numStringArray = numString.split('').toReversed();

    let result = [];
    let numToTake = 0;

    for (let i = 0; i < base.length; i++) {
        // Get the minuend and subtrahend digits at the current position, assign 0 if there is no such index
        let minuend = Number(base[i]) || 0;
        let subtrahend = Number(numStringArray[i]) || 0;

        // Calculate the subtraction result
        let subtractionResult = minuend - subtrahend - numToTake;

        // Adjust the subtraction result and carry-over value if the result is negative
        if (subtractionResult < 0) {
            subtractionResult += 10;
            numToTake = 1;
        } else {
            numToTake = 0;
        }

        // Add the subtraction result to the result array
        result.push(subtractionResult);
    }

    // If the result is zero, return '0'. Otherwise, return the result without leading zeros
    return result.toReversed().join('').replace(LEADING_ZEROS, '') || '0';
}


/**
 * Divides the current string (dividend) by the provided divisor and returns the result.
 * @param {string} divisor The divisor string to divide the current string by.
 * @returns {string} The result of dividing the current string by the divisor.
 * @throws {Error} If the divisor is '0', throws an error indicating division by zero is not allowed.
 */
String.prototype.divide = function (divisor) {
    // Convert the current string to a dividend, removing leading zeros, or defaulting to '0'
    const dividend = this.toString().replace(LEADING_ZEROS, '') || '0';
    // Remove leading zeros from the divisor, or default to '0'
    divisor = divisor.replace(LEADING_ZEROS, '') || '0';

    // Check if the divisor is '0', and if so, throw an error
    if (divisor === '0') throw new Error('Unable to divide by 0');

    // If the dividend is not greater than or equal to the divisor, return "0"
    if ((!checkForBigger(dividend, divisor) && dividend !== divisor)) return "0";

    // Initialize variables to store the result, temporary dividend and step
    let result = "";
    let tempDividend = dividend.slice(0, divisor.length);
    let step = divisor.length;

    while (step <= dividend.length) {
        let count = 0;
        // Perform subtraction until tempDividend is not greater than or equal to divisor
        while ((checkForBigger(tempDividend, divisor) || tempDividend === divisor)) {
            tempDividend = tempDividend.minus(divisor);
            count++;
        }
        // Append the count to the result
        result += count;
        // If step is less than dividend length, append the next digit to tempDividend
        if (step < dividend.length) {
            tempDividend += dividend[step];
        }
        step++;
    }
    // Remove leading zeros from the result, or return '0' if the result is zero
    return result.replace(LEADING_ZEROS, "") || "0";
}

/**
 * Multiplies the current string (base) by the provided stringNum (multiplier) and returns the result.
 * @param {string} stringNum The multiplier string to multiply the current string by.
 * @returns {string} The result of multiplying the current string by the multiplier.
 */
String.prototype.multiply = function (stringNum) {
    // Convert the current string to a base, remove leading zeros, and reverse its digits, or default to '0' if string is empty or contains only zeros
    const base = this.toString().replace(LEADING_ZEROS, '').split('').toReversed().join('') || '0';
    // Remove leading zeros from stringNum and store it in multiplier variable, reverse its digits, or default to '0' if string is empty or contains only zeros
    const multiplier = stringNum.replace(LEADING_ZEROS, '').split('').toReversed().join('') || '0';

    // Initialize the result as '0'
    let result = '0';

    for (let i = 0; i < multiplier.length; i++) {
        let temp = 0;
        let counter = '';
        const toMultiply1 = parseInt(multiplier[i]); // Convert the current digit of the multiplier to a Number (integer)

        // Iterate through each digit of the base
        for (let j = 0; j < base.length; j++) {
            const toMultiply2 = parseInt(base[j]); // Convert the current digit of the base to a Number (integer)
            const toAdd = toMultiply1 * toMultiply2; // Calculate the product of the two digits

            // Add the product and temp to the counter
            counter = counter + (toAdd + temp) % 10;
            temp = Math.floor((toAdd + temp) / 10);

            // If it's the last digit of the base, add the remaining temp (carry-over) to the counter
            if (j === base.length - 1) {
                counter = counter + temp;
            }
        }
        // Reverse the counter
        counter = counter.split('').toReversed().join('');
        // Add zeros to handle dozens the right way
        counter += '0'.repeat(i);
        result = result.plus(counter);
    }
    // Return the final result
    return result;
}

module.exports = {String};