function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    expr = expr.split('');
    let expArrayTrim = [];
    let element = '';
//делаем массив без пробелов с помощью регулярных выражений
    for (let i = 0; i < expr.length; i++) {
        if (expr[i].match(/[0-9]/)) {
            element = element + expr[i];
            continue;
        }
        if (element.length > 0) {
            expArrayTrim.push(parseInt(element))
            element = [];
        }
        if (expr[i].match(/\W/)) {
            expArrayTrim.push(expr[i]);
        }
    }
    if (element.length > 0) {
        expArrayTrim.push(parseInt(element))
        element = [];
    }


// проверяем закрывающиеся и открывающиеся скобки
    let openBrackets = 0;
    let closeBrackets = 0;
    for (let index = 0; index < expArrayTrim.length; index++) {
        if (expArrayTrim[index] === '(') {
            openBrackets++;
        }
        if (expArrayTrim[index] === ')') {
            closeBrackets++;
            if (closeBrackets > openBrackets) {
                throw new Error("ExpressionError: Brackets must be paired");
            }
        }
    }

    if (openBrackets != closeBrackets) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    //данной функцией делаем арифметические операции 
    function makeOperation(array) {
        let result = 0;
        for (let index = 0; index < array.length; index++) {
            if (array[index] === '/') {
                if (+array[index + 1] === +'0') {
                    throw new Error("TypeError: Division by zero.");
                } else {
                    result = +array[index - 1] / +array[index + 1];
                    array.splice(index - 1, 3, result);
                    index = -1;
                }
            }
            if (array[index] === '*') {
                result = +array[index - 1] * +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
        }

        for (let index = 0; index < array.length; index++) {
            if (array[index] === '+') {
                result = +array[index - 1] + +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
            if (array[index] === '-') {
                result = +array[index - 1] - +array[index + 1];
                array.splice(index - 1, 3, result);
                index = -1;
            }
        }
        return array;
    }
    // делаем арифметические операции в скобках
    function makeOperationInBracket(array) {
        let arrayForOperation = [];
        let openBracket = 0;
        let elements = 0;
        for (let index = 0; index < array.length; index++) {
            if (array[index] === "(") {
                arrayForOperation = [];
                openBracket = index;
                elements = 1;
            } else if (array[index] === ")") {
                break;
            }
            if (array[index] != "(") {
                arrayForOperation.push(array[index]);
                elements++;
            }
        }
        arrayForOperation = +makeOperation(arrayForOperation);
        array.splice(openBracket, elements + 1, arrayForOperation);
        return array;
    }
// считаем выражения в скобках пока они есть, если скобки кончаются то считаем обычное выражение
    while (expArrayTrim.includes('(')) {
        expArrayTrim = makeOperationInBracket(expArrayTrim);
    }
    result = makeOperation(expArrayTrim);
    return +result
}
module.exports = {
    expressionCalculator
}