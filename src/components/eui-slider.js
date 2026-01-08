class EUISlider extends HTMLElement {
    static get observedAttributes() {
        return ["value", "min", "max", "step", "label", "vertical", "disabled", "thickness"];
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
                    --track-thickness: 5px;
                    --thumb-size: 20px;
                    --touch-size: var(--eui-slider-touch-target-size, 44px);
                }

                :host([vertical]) {
                    flex-direction: row;
                    height: 300px;
                    width: max-content;
                    max-width: none;
                }
                
                :host([vertical]) .header {
                    width: 100%;
                    justify-content: center;
                    text-align: center;
                    flex-direction: column;
                }

                :host([disabled]) {
                    opacity: 0.5;
                    pointer-events: none;
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
                    min-height: var(--thumb-size);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                }

                :host([vertical]) .slider-container {
                    height: 100%;
                    min-width: var(--track-thickness, 4px);
                    flex-direction: column;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    opacity: 0;
                    width: 100%;
                    height: var(--touch-size);
                    background: transparent;
                    outline: none;
                    margin: 0;
                    cursor: pointer;
                    position: absolute;
                    z-index: 1;
                    top: 50%;
                    transform: translateY(-50%);
                }

                :host([vertical]) input[type="range"] {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-90deg);
                    transform-origin: center;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: var(--thumb-size);
                    height: var(--touch-size);
                    cursor: pointer;
                }

                input[type="range"]::-moz-range-thumb {
                    width: var(--thumb-size);
                    height: var(--touch-size);
                    cursor: pointer;
                    border: none;
                    background: transparent;
                }

                .track {
                    position: relative;
                    height: var(--track-thickness);
                    width: 100%;
                    background: var(--slider-track, #333);
                    border-radius: 16px;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                :host([vertical]) .track {
                    width: var(--track-thickness);
                    height: 100%;
                }

                .track-fill {
                    position: absolute;
                    height: 100%;
                    background: var(--app-accent, #6366f1);
                    pointer-events: none;
                    z-index: 0;
                    left: 0;
                    width: var(--progress, 0%);
                    border-radius: 3px 3px 0 0;
                }

                :host([vertical]) .track-fill {
                    width: 100%;
                    height: var(--progress, 0%);
                    bottom: 0;
                    top: auto;
                }
                
                :host([no-thumb]) .slider-thumb {
                    display: none;
                }

                :host([no-number]) .value-badge {
                    display: none;
                }

                :host([no-header]) .header,
                :host([no-number]:not([label])) .header {
                    display: none;
                }

                .slider-thumb {
                    position: absolute;
                    width: var(--thumb-size);
                    height: var(--thumb-size);
                    background: var(--app-accent, #6366f1);
                    box-shadow: inset 0 0 0 1px var(--app-500, #131318), inset 0 0 0 4px var(--app-200, #131318);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    
                    left: calc(var(--progress, 0%) - var(--thumb-offset, 0px));
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                :host([vertical]) .slider-thumb {
                    left: 50%;
                    top: auto;
                    bottom: calc(var(--progress, 0%) - var(--thumb-offset, 0px));
                    transform: translate(-50%, 0);
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
        this.containerEl = this.shadowRoot.querySelector('.slider-container');

        this.inputEl.min = this.getAttribute('min') || 0;
        this.inputEl.max = this.getAttribute('max') || 100;
        this.inputEl.step = this.getAttribute('step') || 1;
        this.inputEl.value = this.getAttribute('value') || 50;

        if (this.hasAttribute('label')) {
            this.labelEl.textContent = this.getAttribute('label');
        }

        if (this.hasAttribute('disabled')) {
            this.inputEl.disabled = true;
        }

        if (this.hasAttribute('thickness')) {
            this.style.setProperty('--track-thickness', this.getAttribute('thickness'));
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

        this.onUp = () => this.sliderThumbEl.classList.remove('active');
        window.addEventListener('mouseup', this.onUp);
        window.addEventListener('touchend', this.onUp);

        this.resizeObserver = new ResizeObserver(() => this.updateDimensions());
        this.resizeObserver.observe(this.containerEl);
        this.updateDimensions();
    }

    disconnectedCallback() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        window.removeEventListener('mouseup', this.onUp);
        window.removeEventListener('touchend', this.onUp);
    }

    updateDimensions() {
        if (!this.inputEl || !this.containerEl) return;

        if (this.hasAttribute('vertical')) {
            this.inputEl.style.width = `${this.containerEl.offsetHeight}px`;
        } else {
            this.inputEl.style.width = '';
        }
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

        this.containerEl.style.setProperty('--progress', `${percentage}%`);

        const offset = (percentage / 100) * 20;
        this.containerEl.style.setProperty('--thumb-offset', `${offset}px`);

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
        } else if (name === 'vertical') {
            this.updateDimensions();
        } else if (name === 'disabled') {
            this.inputEl.disabled = (newVal !== null);
        } else if (name === 'thickness') {
            if (newVal) this.style.setProperty('--track-thickness', newVal);
            else this.style.removeProperty('--track-thickness');
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
