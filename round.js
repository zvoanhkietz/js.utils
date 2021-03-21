/**
 * Round a number to int
 *
 * @param {number} value 
 * @param {string} mode ROUND_HALF_DOWN | ROUND_HALF_EVEN | ROUND_HALF_ODD
 * @returns int
 */
function roundToInt(value, mode) {
    let tmp = Math.floor(Math.abs(value) + 0.5)

    if (
        (mode === 'ROUND_HALF_DOWN' && value === (tmp - 0.5)) ||
        (mode === 'ROUND_HALF_EVEN' && value === (0.5 + 2 * Math.floor(tmp / 2))) ||
        (mode === 'ROUND_HALF_ODD' && value === (0.5 + 2 * Math.floor(tmp / 2) - 1))) {
        tmp -= 1
    }

    return value < 0 ? -tmp : tmp
}

/**
 * Round number to float
 *
 * @param {number} value 
 * @param {number} precision 
 * @param {string} mode ROUND_HALF_DOWN | ROUND_HALF_EVEN | ROUND_HALF_ODD
 * @returns float
 */
function round(value, precision = 0, mode = 'ROUND_HALF_UP') {
    let p = Math.pow(10, precision);

    if (isNaN(value) || !isFinite(value)) {
        return value;
    }

    // if value already integer and positive precision
    // then nothing to do, return early
    if (Math.trunc(value) === value && precision >= 0) {
        return value;
    }

    const preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)));

    if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
        value = roundToInt(value * Math.pow(10, preRoundPrecision), mode);
        value /= Math.pow(10, Math.abs(precision - preRoundPrecision));
    } else {
        value *= p;
    }

    value = roundToInt(value, mode);

    return value / p;
}
