class Calculator {
    constructor(val1, val2, operation) {
        this.val1 = val1;
        this.val2 = val2;
        this.operation = operation;
    }

    getResult() {
        switch (this.operation) {
            case '+':
                return this.val1 + this.val2;
            case '-':
                return this.val1 - this.val2;
            case '*':
                return this.val1 * this.val2;
            case '/':
                return this.val1 / this.val2;
            case '%':
                return this.val1 % this.val2;
            case '**':
                return this.val1 ** this.val2;
            default:
                return 'Invalid operation';
        }
    }
}

class Addition extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getSum() {
        return this.val1 + this.val2;
    }
}

class Subtraction extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getSub() {
        return this.val1 - this.val2;
    }
}

class Multiplication extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getMul() {
        return this.val1 * this.val2;
    }
}

class Division extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getDiv() {
        return this.val1 / this.val2;
    }
}

class Remainder extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getRem() {
        return this.val1 % this.val2;
    }
}

class Exponentiation extends Calculator {
    constructor(val1, val2, operation) {
        super(val1, val2, operation);
    }

    getExp() {
        return this.val1 ** this.val2;
    }
}

add = new Addition(2, 3, '+');
console.log(add.getResult());

sub = new Subtraction(4, 2, '-');
console.log(sub.getResult());

mul = new Multiplication(5, 2, '*');
console.log(mul.getResult());

div = new Division(5, 2, '/');
console.log(div.getResult());

rem = new Remainder(5, 2, '%');
console.log(rem.getResult());

exp = new Exponentiation(2, 3, '**');
console.log(exp.getResult());