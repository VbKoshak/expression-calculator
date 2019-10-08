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

/*class SmartCalculator {
    constructor(initialValue) {
        this.arrInts = [];
        this.arrSignas = [];
        this.length = 0;
        this.arrInts.push(initialValue);
    }

    valueOf() {
        for (let i = this.length - 1; i >= 0; i--) {
            if (this.arrSignas[i] == '^') {
                let temp = Math.pow(this.arrInts[i], this.arrInts[i + 1]);
                this.arrInts[i] = temp;
                this.arrInts.splice(i + 1, 1);
                this.arrSignas.splice(i, 1);
                this.length--;
                i++;
            }
        };
        for (let i = 0; i < this.length; i++) {
            if (this.arrSignas[i] == '*') {
                let temp = this.arrInts[i] * this.arrInts[i + 1];
                this.arrInts[i] = temp;
                this.arrInts.splice(i + 1, 1);
                this.arrSignas.splice(i, 1);
                this.length--;
                i--;
            };
        };
        for (let i = 0; i < this.length; i++) {
            if (this.arrSignas[i] == '/') {
                let temp = this.arrInts[i] / this.arrInts[i + 1];
                this.arrInts[i] = temp;
                this.arrInts.splice(i + 1, 1);
                this.arrSignas.splice(i, 1);
                i--;
                this.length--;
            }
        };
        for (let i = 0; i < this.length; i++) {
            if (this.arrSignas[i] == 'plus') {
                this.arrInts[i] += this.arrInts[i + 1];
                this.arrInts.splice(i + 1, 1);
                this.arrSignas.splice(i, 1);
                i--;
                this.length--;
            }
            if (this.arrSignas[i] == 'minus') {
                this.arrInts[i] -= this.arrInts[i + 1];
                this.arrInts.splice(i + 1, 1);
                this.arrSignas.splice(i, 1);
                i--;
                this.length--;
            }
        };
        return this.arrInts[0];
    }

    add(number) {
        this.arrInts[this.length + 1] = number;
        this.arrSignas[this.length] = 'plus';
        this.length++;
        return this;
    }

    subtract(number) {
        this.arrInts[this.length + 1] = number;
        this.arrSignas[this.length] = 'minus';
        this.length++;
        return this;
    }

    multiply(number) {
        this.arrInts[this.length + 1] = number;
        this.arrSignas[this.length] = '*';
        this.length++;
        return this;
    }

    devide(number) {
        this.arrInts[this.length + 1] = number;
        this.arrSignas[this.length] = '/';
        this.length++;
        return this;
    }

    pow(number) {
        this.arrInts[this.length + 1] = number;
        this.arrSignas[this.length] = '^';
        this.length++;
        return this;
    }
}

module.exports = SmartCalculator;*/