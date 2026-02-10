// Main.js - Application entry point
import { Calculator } from './calculator.js';
import { Display } from './display.js';
import { History } from './history.js';
import { Memory } from './memory.js';
import { Keyboard } from './keyboard.js';
import { Theme } from './theme.js';

class CalculatorApp {
    constructor() {
        // Initialize all modules
        this.calculator = new Calculator();
        this.display = new Display();
        this.history = new History();
        this.memory = new Memory();
        this.theme = new Theme();
        this.keyboard = new Keyboard(this.calculator, this.display);

        // Setup event listeners
        this.setupButtonListeners();
        this.setupModeToggle();

        // Set history callback
        this.history.onSelect = (value) => {
            this.calculator.currentValue = String(value);
            this.display.updateResult(value);
        };
    }

    setupButtonListeners() {
        const buttonGrid = document.getElementById('buttonGrid');

        buttonGrid.addEventListener('click', (e) => {
            const button = e.target.closest('.btn');
            if (!button) return;

            this.display.animateButton(button);
            this.handleButtonClick(button);
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;
        const secondary = button.dataset.secondary;

        // Check if we should use secondary function
        const useSecondary = this.calculator.secondaryMode && secondary;
        const actualAction = useSecondary ? secondary : action;

        try {
            // Handle different button types
            if (value !== undefined) {
                // Number button
                if (value === '.') {
                    this.calculator.inputDecimal();
                } else {
                    this.calculator.inputNumber(value);
                }
                this.display.updateResult(this.calculator.currentValue);
            } else if (actualAction) {
                // Action button
                this.handleAction(actualAction);
            }

            // Reset secondary mode after use
            if (this.calculator.secondaryMode && actualAction !== '2nd') {
                this.calculator.toggleSecondary();
                this.updateSecondaryButton();
            }
        } catch (error) {
            this.display.showError(error.message);
            setTimeout(() => {
                this.calculator.allClear();
                this.display.clear();
            }, 2000);
        }
    }

    handleAction(action) {
        const state = this.calculator.getState();

        switch (action) {
            // Basic operations
            case '+':
            case '-':
            case '*':
            case '/':
                this.calculator.performOperation(action);
                break;

            case '=':
                const result = this.calculator.equals();
                this.history.add(state.expression, result);
                break;

            case 'clear':
                this.calculator.allClear();
                this.display.clear();
                return;

            case 'backspace':
                this.calculator.backspace();
                break;

            case '+/-':
                this.calculator.toggleSign();
                break;

            case '%':
                this.calculator.percentage();
                break;

            // Scientific functions
            case 'sin':
                this.calculator.sin();
                break;
            case 'cos':
                this.calculator.cos();
                break;
            case 'tan':
                this.calculator.tan();
                break;
            case 'asin':
                this.calculator.asin();
                break;
            case 'acos':
                this.calculator.acos();
                break;
            case 'atan':
                this.calculator.atan();
                break;

            case 'ln':
                this.calculator.ln();
                break;
            case 'log':
                this.calculator.log();
                break;
            case 'e^x':
                this.calculator.exp();
                break;
            case '10^x':
                this.calculator.power10();
                break;

            case 'sqrt':
                this.calculator.sqrt();
                break;
            case 'cbrt':
                this.calculator.cbrt();
                break;
            case 'x^2':
                this.calculator.square();
                break;
            case 'x^3':
                this.calculator.cube();
                break;

            case '1/x':
                this.calculator.reciprocal();
                break;
            case '!':
                this.calculator.factorial();
                break;
            case 'abs':
                this.calculator.abs();
                break;

            case 'pi':
                this.calculator.inputPi();
                break;
            case 'e':
                this.calculator.inputE();
                break;

            // Memory operations
            case 'mc':
                this.memory.clear();
                return;
            case 'mr':
                this.calculator.currentValue = String(this.memory.recall());
                this.calculator.waitingForOperand = true;
                break;
            case 'm+':
                this.memory.add(this.calculator.currentValue);
                return;
            case 'm-':
                this.memory.subtract(this.calculator.currentValue);
                return;

            // Other actions
            case '2nd':
                this.calculator.toggleSecondary();
                this.updateSecondaryButton();
                return;

            case 'history':
                this.history.toggle();
                return;

            default:
                console.log('Unhandled action:', action);
                return;
        }

        // Update display
        const newState = this.calculator.getState();
        this.display.updateExpression(newState.expression);
        this.display.updateResult(newState.currentValue);
    }

    setupModeToggle() {
        const modeBtn = document.getElementById('angleMode');
        modeBtn.addEventListener('click', () => {
            const newMode = this.calculator.toggleAngleMode();
            modeBtn.textContent = newMode;
            modeBtn.classList.add('active');
        });
    }

    updateSecondaryButton() {
        const btn = document.querySelector('[data-action="2nd"]');
        if (this.calculator.secondaryMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.calculatorApp = new CalculatorApp();
    console.log('Scientific Calculator initialized');
});
