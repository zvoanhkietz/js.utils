// refer: https://locutus.io/php/math/round/
function castInt(value) {
    const type = typeof value

    switch (type) {
        case 'number':
            if (isNaN(value) || !isFinite(value)) {
                // from PHP 7, NaN and Infinity are casted to 0
                return 0
            }

            return value < 0 ? Math.ceil(value) : Math.floor(value)
        case 'string':
            return parseInt(value, 10) || 0
        case 'boolean':
        // fall through
        default:
            return +!!value
    }
}

function castFloat(value) {
    const type = typeof value

    switch (type) {
        case 'number':
            return value
        case 'string':
            return parseFloat(value) || 0
        case 'boolean':
        // fall through
        default:
            // PHP docs state, that for types other than string
            // conversion is {input type}->int->float
            return castInt(value)
    }
}

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

function round(value, precision = 0, mode = 'ROUND_HALF_UP') {
    value = castFloat(value)
    precision = castInt(precision)
    let p = Math.pow(10, precision)

    if (isNaN(value) || !isFinite(value)) {
        return value
    }

    // if value already integer and positive precision
    // then nothing to do, return early
    if (Math.trunc(value) === value && precision >= 0) {
        return value
    }

    const preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)))

    if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
        value = roundToInt(value * Math.pow(10, preRoundPrecision), mode)
        value /= Math.pow(10, Math.abs(precision - preRoundPrecision))
    } else {
        value *= p
    }

    value = roundToInt(value, mode)

    return value / p
}

