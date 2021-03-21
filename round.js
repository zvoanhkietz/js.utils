function round(value, fractionDigits) {
    const strNum = String(value);
    if (strNum.indexOf('e+') != -1) {
        // Can't round numbers this large because their string representation
        // contains an exponent, like 9.99e+37
        throw new Error("number of value too large");
    }
    if (strNum.indexOf('.') == -1) {
        return parseInt(strNum);
    }

    let [beforeDot, afterDot] = strNum.split('.');
    let result;

    afterDot = afterDot.slice(0, fractionDigits);
    if (afterDot[fractionDigits] < 5) {
        result = beforeDot + '.' + afterDot;
    } else if (/^9+$/.test(afterDot)) {
        // If we need to round up a number like 1.9999, increment the integer
        // before the decimal Dot and discard the fractional part.
        result = Number(beforeDot) + 1;
    } else {
        // Starting from the last digit, increment digits until we find one
        // that is not 9, then stop
        let i = fractionDigits - 1;
        while (true) {
            if (afterDot[i] == '9') {
                afterDot = afterDot.substr(0, i) + '0' + afterDot.substr(i + 1);
            } else {
                afterDot = afterDot.substr(0, i) + (Number(afterDot[i]) + 1) + afterDot.substr(i + 1);
                break;
            }
            i--;
        }

        result = beforeDot + '.' + afterDot;
    }
    return parseFloat(result.replace(/0+$/, ''));
}
