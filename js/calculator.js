// Calculator.js - Core calculation engine
export class Calculator {
    constructor() {
        this.currentValue = '0';
        this.expression = '';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
        this.angleMode = 'DEG'; // DEG or RAD
        this.secondaryMode = false;
        this.lastResult = null;
    }

    // Input a number
    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentValue = String(num);
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? String(num) : this.currentValue + num;
        }
    }

    // Input a decimal point
    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }
    }

    // Clear current value
    clear() {
        this.currentValue = '0';
    }

    // All clear - reset everything
    allClear() {
        this.currentValue = '0';
        this.expression = '';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
    }

    // Backspace
    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
    }

    // Toggle sign
    toggleSign() {
        this.currentValue = String(parseFloat(this.currentValue) * -1);
    }

    // Percentage
    percentage() {
        this.currentValue = String(parseFloat(this.currentValue) / 100);
    }

    // Basic operations
    performOperation(nextOperation) {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operation) {
            const result = this.calculate(this.previousValue, inputValue, this.operation);
            this.currentValue = String(result);
            this.previousValue = result;
        }

        this.waitingForOperand = true;
        this.operation = nextOperation;
        
        // Update expression
        if (nextOperation) {
            this.expression = `${this.previousValue} ${this.getOperatorSymbol(nextOperation)}`;
        }
    }

    // Calculate result
    calculate(firstValue, secondValue, operation) {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                if (secondValue === 0) {
                    throw new Error('Cannot divide by zero');
                }
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }

    // Get operator symbol for display
    getOperatorSymbol(op) {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        };
        return symbols[op] || op;
    }

    // Execute equals
    equals() {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue !== null && this.operation) {
            const result = this.calculate(this.previousValue, inputValue, this.operation);
            this.expression = `${this.previousValue} ${this.getOperatorSymbol(this.operation)} ${inputValue} =`;
            this.currentValue = String(result);
            this.lastResult = result;
            this.previousValue = null;
            this.operation = null;
            this.waitingForOperand = true;
            return result;
        }
        
        return parseFloat(this.currentValue);
    }

    // Scientific functions
    sin() {
        const value = parseFloat(this.currentValue);
        const rad = this.angleMode === 'DEG' ? this.toRadians(value) : value;
        this.currentValue = String(Math.sin(rad));
        this.waitingForOperand = true;
    }

    cos() {
        const value = parseFloat(this.currentValue);
        const rad = this.angleMode === 'DEG' ? this.toRadians(value) : value;
        this.currentValue = String(Math.cos(rad));
        this.waitingForOperand = true;
    }

    tan() {
        const value = parseFloat(this.currentValue);
        const rad = this.angleMode === 'DEG' ? this.toRadians(value) : value;
        this.currentValue = String(Math.tan(rad));
        this.waitingForOperand = true;
    }

    asin() {
        const value = parseFloat(this.currentValue);
        if (value < -1 || value > 1) {
            throw new Error('Domain error');
        }
        const result = Math.asin(value);
        this.currentValue = String(this.angleMode === 'DEG' ? this.toDegrees(result) : result);
        this.waitingForOperand = true;
    }

    acos() {
        const value = parseFloat(this.currentValue);
        if (value < -1 || value > 1) {
            throw new Error('Domain error');
        }
        const result = Math.acos(value);
        this.currentValue = String(this.angleMode === 'DEG' ? this.toDegrees(result) : result);
        this.waitingForOperand = true;
    }

    atan() {
        const value = parseFloat(this.currentValue);
        const result = Math.atan(value);
        this.currentValue = String(this.angleMode === 'DEG' ? this.toDegrees(result) : result);
        this.waitingForOperand = true;
    }

    ln() {
        const value = parseFloat(this.currentValue);
        if (value <= 0) {
            throw new Error('Domain error');
        }
        this.currentValue = String(Math.log(value));
        this.waitingForOperand = true;
    }

    log() {
        const value = parseFloat(this.currentValue);
        if (value <= 0) {
            throw new Error('Domain error');
        }
        this.currentValue = String(Math.log10(value));
        this.waitingForOperand = true;
    }

    exp() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(Math.exp(value));
        this.waitingForOperand = true;
    }

    power10() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(Math.pow(10, value));
        this.waitingForOperand = true;
    }

    sqrt() {
        const value = parseFloat(this.currentValue);
        if (value < 0) {
            throw new Error('Domain error');
        }
        this.currentValue = String(Math.sqrt(value));
        this.waitingForOperand = true;
    }

    cbrt() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(Math.cbrt(value));
        this.waitingForOperand = true;
    }

    square() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(value * value);
        this.waitingForOperand = true;
    }

    cube() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(value * value * value);
        this.waitingForOperand = true;
    }

    power(exponent) {
        const base = parseFloat(this.currentValue);
        this.currentValue = String(Math.pow(base, exponent));
        this.waitingForOperand = true;
    }

    reciprocal() {
        const value = parseFloat(this.currentValue);
        if (value === 0) {
            throw new Error('Cannot divide by zero');
        }
        this.currentValue = String(1 / value);
        this.waitingForOperand = true;
    }

    factorial() {
        const value = parseFloat(this.currentValue);
        if (value < 0 || !Number.isInteger(value)) {
            throw new Error('Factorial only for non-negative integers');
        }
        if (value > 170) {
            throw new Error('Number too large');
        }
        
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        this.currentValue = String(result);
        this.waitingForOperand = true;
    }

    abs() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(Math.abs(value));
        this.waitingForOperand = true;
    }

    // Constants
    inputPi() {
        this.currentValue = String(Math.PI);
        this.waitingForOperand = true;
    }

    inputE() {
        this.currentValue = String(Math.E);
        this.waitingForOperand = true;
    }

    // Angle conversion
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    // Toggle angle mode
    toggleAngleMode() {
        this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
        return this.angleMode;
    }

    // Toggle secondary functions
    toggleSecondary() {
        this.secondaryMode = !this.secondaryMode;
        return this.secondaryMode;
    }

    // Get current state
    getState() {
        return {
            currentValue: this.currentValue,
            expression: this.expression,
            angleMode: this.angleMode,
            secondaryMode: this.secondaryMode
        };
    }
}
