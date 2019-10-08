function eval() {
    // Do not use eval!!!
    return;
}

function simpleCalc(expr) {
    expr = expr.replace(/\(|\)/g,'');
    console.log(expr);
    expr = expr.replace(/\-\-/g,'+');
    let nums = expr.match(/[-+]?[0-9]+\.?[0-9]*/g).map(n => +n);
    expr = expr.replace(/\d(\-)\d/g, '+'); // (/\d(\-)/g,'+');
    let signs = expr.match(/\*|\/|\+/g).join('').split(''); //(/\*|\/|\+/g)
    let signLength = signs.length;
    let temp;
    for (let i = 0;i < signLength; i++) {
        if (signs[i] == '*' || signs[i] == "/") {
            if (signs[i] == '/' && nums[i+1] == 0) {
                throw ("TypeError: Devision by zero.");
            }
            temp = signs[i] == '*' ? nums[i] * nums[i+1] : nums[i] / nums[i+1];
            console.log("" + nums[i] + " " + signs[i] + " " + nums[i + 1] + " = " + temp + ";\n");
            nums[i] = temp;
            nums.splice(i+1,1);
            signs.splice(i,1);
            i--;
            signLength--;
        }
    }

    for (let i = 0; i < signLength; i++) {
        if (signs[i] == '+' || signs[i] == "-") {
            temp = signs[i] == '+' ? nums[i] + nums[i + 1] : nums[i] - nums[i + 1];
            console.log("" + nums[i] + " " + signs[i] + " " + nums[i + 1] + " = " + temp + ";\n");
            nums[i] = temp;
            nums.splice(i + 1, 1);
            signs.splice(i, 1);
            i--;
            signLength--;
        }
    }
    console.log ("res: " + nums);
    return nums[0];
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.replace(/\s/g,'');
    let bracketCounter = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == '(') {
            bracketCounter++;
        } else if (expr[i] == ")") {
            bracketCounter--;
        }
        if (bracketCounter < 0) {
            throw "ExpressionError: Brackets must be paired";
        }
    }
    if (bracketCounter !== 0){
        throw "ExpressionError: Brackets must be paired";
    }

    let openindex = expr.lastIndexOf('(');
    let closeindex;
    let res;
    while (openindex != -1) {
        closeindex = expr.indexOf(')',openindex);
        miniexpr = expr.substring(openindex,closeindex+1);
        res = simpleCalc(miniexpr);
        expr = expr.replace(miniexpr,res);
        openindex = expr.lastIndexOf('(');
    }
    return simpleCalc(expr);
}

module.exports = {
    expressionCalculator
}

