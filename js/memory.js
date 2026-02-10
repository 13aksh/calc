// Memory.js - Memory functions (M+, M-, MR, MC)
export class Memory {
    constructor() {
        this.value = 0;
        this.indicator = document.getElementById('memoryIndicator');
        this.loadFromStorage();
        this.updateIndicator();
    }

    // Memory add
    add(value) {
        this.value += parseFloat(value);
        this.saveToStorage();
        this.updateIndicator();
    }

    // Memory subtract
    subtract(value) {
        this.value -= parseFloat(value);
        this.saveToStorage();
        this.updateIndicator();
    }

    // Memory recall
    recall() {
        return this.value;
    }

    // Memory clear
    clear() {
        this.value = 0;
        this.saveToStorage();
        this.updateIndicator();
    }

    // Update memory indicator
    updateIndicator() {
        if (this.value !== 0) {
            this.indicator.classList.add('active');
        } else {
            this.indicator.classList.remove('active');
        }
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('calculator-memory', String(this.value));
        } catch (e) {
            console.error('Failed to save memory:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('calculator-memory');
            this.value = stored ? parseFloat(stored) : 0;
        } catch (e) {
            console.error('Failed to load memory:', e);
            this.value = 0;
        }
    }
}
