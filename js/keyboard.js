// Keyboard.js - Keyboard input handler
export class Keyboard {
    constructor(calculator, display) {
        this.calculator = calculator;
        this.display = display;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        const key = e.key;

        // Prevent default for calculator keys
        if (this.isCalculatorKey(key)) {
            e.preventDefault();
        }

        // Numbers
        if (/^[0-9]$/.test(key)) {
            this.calculator.inputNumber(key);
            this.display.updateResult(this.calculator.currentValue);
            return;
        }

        // Decimal point
        if (key === '.' || key === ',') {
            this.calculator.inputDecimal();
            this.display.updateResult(this.calculator.currentValue);
            return;
        }

        // Operations
        if (['+', '-', '*', '/'].includes(key)) {
            this.calculator.performOperation(key);
            const state = this.calculator.getState();
            this.display.updateExpression(state.expression);
            this.display.updateResult(state.currentValue);
            return;
        }

        // Equals
        if (key === 'Enter' || key === '=') {
            try {
                const result = this.calculator.equals();
                const state = this.calculator.getState();
                this.display.updateExpression(state.expression);
                this.display.updateResult(state.currentValue);
            } catch (error) {
                this.display.showError(error.message);
            }
            return;
        }

        // Backspace
        if (key === 'Backspace') {
            this.calculator.backspace();
            this.display.updateResult(this.calculator.currentValue);
            return;
        }

        // Clear
        if (key === 'Escape' || key === 'c' || key === 'C') {
            this.calculator.allClear();
            this.display.clear();
            return;
        }

        // Percentage
        if (key === '%') {
            this.calculator.percentage();
            this.display.updateResult(this.calculator.currentValue);
            return;
        }

        // Parentheses (for future expression support)
        if (key === '(' || key === ')') {
            // To be implemented with expression parser
            return;
        }
    }

    isCalculatorKey(key) {
        return /^[0-9+\-*/=.,()%]$/.test(key) ||
            ['Enter', 'Backspace', 'Escape'].includes(key);
    }
}
