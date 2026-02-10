// History.js - Manages calculation history
export class History {
    constructor() {
        this.historyPanel = document.getElementById('historyPanel');
        this.historyContent = document.getElementById('historyContent');
        this.closeBtn = document.getElementById('closeHistory');
        this.clearBtn = document.getElementById('clearHistory');
        this.items = this.loadFromStorage();

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.clearBtn.addEventListener('click', () => this.clearAll());
    }

    // Add calculation to history
    add(expression, result) {
        const item = {
            expression,
            result,
            timestamp: Date.now()
        };

        this.items.unshift(item);

        // Keep only last 50 items
        if (this.items.length > 50) {
            this.items = this.items.slice(0, 50);
        }

        this.saveToStorage();
        this.render();
    }

    // Open history panel
    open() {
        this.historyPanel.classList.add('active');
    }

    // Close history panel
    close() {
        this.historyPanel.classList.remove('active');
    }

    // Toggle history panel
    toggle() {
        if (this.historyPanel.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }

    // Clear all history
    clearAll() {
        if (confirm('Clear all history?')) {
            this.items = [];
            this.saveToStorage();
            this.render();
        }
    }

    // Render history items
    render() {
        if (this.items.length === 0) {
            this.historyContent.innerHTML = '<p class="history-empty">No calculations yet</p>';
            return;
        }

        this.historyContent.innerHTML = this.items
            .map((item, index) => `
                <div class="history-item" data-index="${index}">
                    <div class="history-expression">${this.escapeHtml(item.expression)}</div>
                    <div class="history-result">${this.escapeHtml(String(item.result))}</div>
                </div>
            `)
            .join('');

        // Add click listeners to history items
        this.historyContent.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.onItemClick(this.items[index]);
            });
        });
    }

    // Handle history item click
    onItemClick(item) {
        // This will be set by main.js
        if (this.onSelect) {
            this.onSelect(item.result);
        }
        this.close();
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('calculator-history', JSON.stringify(this.items));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('calculator-history');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load history:', e);
            return [];
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
