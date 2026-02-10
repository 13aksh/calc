// Display.js - Manages display updates and animations
export class Display {
    constructor() {
        this.expressionElement = document.getElementById('expression');
        this.resultElement = document.getElementById('result');
    }

    // Update the result display
    updateResult(value) {
        // Format the number for display
        const formatted = this.formatNumber(value);

        // Add animation
        this.resultElement.classList.remove('slide-up');
        void this.resultElement.offsetWidth; // Trigger reflow
        this.resultElement.classList.add('slide-up');

        this.resultElement.textContent = formatted;
        this.resultElement.classList.remove('error');
    }

    // Update the expression display
    updateExpression(expr) {
        this.expressionElement.classList.remove('fade-in');
        void this.expressionElement.offsetWidth; // Trigger reflow
        this.expressionElement.classList.add('fade-in');

        this.expressionElement.textContent = expr;
    }

    // Show error
    showError(message) {
        this.resultElement.textContent = message;
        this.resultElement.classList.add('error');
        this.expressionElement.textContent = '';

        // Vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    // Clear display
    clear() {
        this.resultElement.textContent = '0';
        this.expressionElement.textContent = '';
        this.resultElement.classList.remove('error');
    }

    // Format number for display
    formatNumber(value) {
        const num = parseFloat(value);

        if (isNaN(num)) {
            return '0';
        }

        // Handle very large or very small numbers
        if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }

        // Limit decimal places for display
        const str = String(num);
        if (str.length > 12) {
            return num.toPrecision(10);
        }

        return str;
    }

    // Add button press animation
    animateButton(button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 150);

        // Haptic feedback for mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }
}
