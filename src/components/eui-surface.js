class EuiSurface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._handleMouseDown = this._addRipple.bind(this);
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ["elevated", "interactive", "ripple"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === "ripple") {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.removeEventListener("mousedown", this._handleMouseDown);

        if (this.hasAttribute("ripple")) {
            this.addEventListener("mousedown", this._handleMouseDown);
        }
    }

    _addRipple(event) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");

        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add("ripple");

        const wrapper = this.shadowRoot.querySelector('.surface');
        wrapper.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                border-radius: 12px;
                background-color: var(--app-200);
                transition: background-color 0.2s cubic-bezier(.4, 0, .2, 1), 
                            box-shadow 0.2s cubic-bezier(.4, 0, .2, 1);
                overflow: hidden;
                position: relative;
                height: auto;
                z-index: 1;
            }

            :host([elevated]) {
                background-color: var(--app-100);
                box-shadow: inset 0 0 0 1px var(--app-300);
            }

            :host([interactive]) {
                cursor: pointer;
            }

            :host([interactive]:hover) {
                background-color: var(--app-300);
            }
                
            :host([interactive][elevated]:hover) {
                background-color: var(--app-100);
                box-shadow: inset 0 0 0 1px var(--app-300), 0 4px 12px rgba(0,0,0,0.1);
            }

            .surface {
                position: relative;
                z-index: 2; 
                width: 100%;
                height: 100%;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                opacity: 0.2;
                animation: ripple 600ms linear forwards;
                background-color: currentColor;
                pointer-events: none;
                z-index: -1;
                will-change: transform, opacity;
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        </style>
        <div class="surface">
            <slot></slot>
        </div>
        `;
    }
}

customElements.define("eui-surface", EuiSurface);