// Theme.js - Theme management
export class Theme {
    constructor() {
        this.currentTheme = this.loadFromStorage() || this.getSystemPreference();
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');

        this.apply(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggle());

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('calculator-theme')) {
                    this.apply(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // Toggle between light and dark
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.apply(this.currentTheme);
        this.saveToStorage();
    }

    // Apply theme
    apply(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcon(theme);
    }

    // Update theme icon
    updateIcon(theme) {
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Get system preference
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('calculator-theme', this.currentTheme);
        } catch (e) {
            console.error('Failed to save theme:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            return localStorage.getItem('calculator-theme');
        } catch (e) {
            console.error('Failed to load theme:', e);
            return null;
        }
    }
}
