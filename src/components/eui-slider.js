class EUISlider extends HTMLElement {
    static get observedAttributes() {
        return ["value", "min", "max", "step", "label"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    width: 100%;
                    max-width: 300px;
                    margin: 0.75rem 0;
                    user-select: none;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    font-weight: 500;
                    padding: 0 4px;
                }

                .slider-container {
                    position: relative;
                    height: 32px;
                    display: flex;
                    align-items: center;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    opacity: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--app-300, #333);
                    border-radius: 3px;
                    outline: none;
                    margin: 0;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                }

                .track {
                    position: absolute;
                    height: 4px;
                    width: 100%;
                    background: var(--slider-track, #333);
                    border-radius: 3px;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .track-fill {
                    position: absolute;
                    height: 4px;
                    background: var(--app-accent, #6366f1);
                    pointer-events: none;
                    z-index: 0;
                    left: 0;
                }

                .slider-thumb {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: var(--app-accent, #6366f1);
                    box-shadow: inset 0 0 0 1px var(--app-500, #131318), inset 0 0 0 4px var(--app-200, #131318);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    left: 0;
                }

                .slider-thumb.active {
                    background: var(--app-accent-50, #7376ff);
                }

                .value-badge {
                    color: var(--app-text);
                    font-weight: 600;
                }
            </style>
            <div class="header">
                <span class="label"></span>
                <span class="value-badge"></span>
            </div>
            <div class="slider-container">
            <div class="track">
            <div class="track-fill"></div>
            </div>
                <div class="slider-thumb"></div>
                <input type="range">
            </div>
        `;
    }

    connectedCallback() {
        this.inputEl = this.shadowRoot.querySelector('input');
        this.labelEl = this.shadowRoot.querySelector('.label');
        this.valueEl = this.shadowRoot.querySelector('.value-badge');
        this.trackFillEl = this.shadowRoot.querySelector('.track-fill');
        this.sliderThumbEl = this.shadowRoot.querySelector('.slider-thumb');

        this.inputEl.min = this.getAttribute('min') || 0;
        this.inputEl.max = this.getAttribute('max') || 100;
        this.inputEl.step = this.getAttribute('step') || 1;
        this.inputEl.value = this.getAttribute('value') || 50;

        if (this.hasAttribute('label')) {
            this.labelEl.textContent = this.getAttribute('label');
        }

        this.updateUI();

        this.inputEl.addEventListener('input', () => {
            this.updateValue(this.inputEl.value);
            this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        });

        this.inputEl.addEventListener('change', () => {
            this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        });

        this.inputEl.addEventListener('mousedown', () => this.sliderThumbEl.classList.add('active'));
        this.inputEl.addEventListener('touchstart', () => this.sliderThumbEl.classList.add('active'), { passive: true });

        window.addEventListener('mouseup', () => this.sliderThumbEl.classList.remove('active'));
        window.addEventListener('touchend', () => this.sliderThumbEl.classList.remove('active'));
    }

    updateValue(val) {
        this.setAttribute('value', val);
        this.updateUI();
    }

    updateUI() {
        if (!this.inputEl) return;

        const min = parseFloat(this.inputEl.min);
        const max = parseFloat(this.inputEl.max);
        const val = parseFloat(this.inputEl.value);

        const percentage = ((val - min) / (max - min)) * 100;
        this.trackFillEl.style.width = `${percentage}%`;

        this.sliderThumbEl.style.left = `calc(${percentage}% - ${(percentage / 100) * 20}px)`;

        this.valueEl.textContent = val;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (!this.inputEl) return;

        if (name === 'value' && newVal !== this.inputEl.value) {
            this.inputEl.value = newVal;
            this.updateUI();
        } else if (['min', 'max', 'step'].includes(name)) {
            this.inputEl[name] = newVal;
            this.updateUI();
        } else if (name === 'label') {
            this.labelEl.textContent = newVal;
        }
    }

    get value() {
        return parseFloat(this.inputEl.value);
    }

    set value(val) {
        this.setAttribute('value', val);
    }
}

customElements.define("eui-slider", EUISlider);
