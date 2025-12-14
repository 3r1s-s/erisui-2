class EUIProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ["value", "intermediate", "id"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .progressbar {
                    width: 100%;
                    height: 5px;
                    overflow: hidden;
                    position: relative;
                    background: var(--app-300, #333);
                    border-radius: 4px;
                }

                .progress {
                    display: block;
                    height: 100%;
                    background: var(--app-accent, #2196F3);
                    border-radius: 4px;
                    transition: width 0.3s ease-in-out;
                }

                .progress.intermediate {
                    height: 100%;
                    transform-origin: 0% 50%;
                    transition-property: background;
                    animation: progressbar-indeterminate 1s infinite linear;
                }

                @keyframes progressbar-indeterminate {
                    0% {
                        transform: translateX(0) scaleX(0)
                    }

                    40% {
                        transform: translateX(0) scaleX(0.5)
                    }

                    100% {
                        transform: translateX(100%) scaleX(0.3)
                    }
                }
            </style>

            <div class="progressbar">
                <span class="progress"></span>
            </div>
        `;
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    connectedCallback() {
        const progress = this.shadowRoot.querySelector(".progress");

        if (this.hasAttribute('id')) this.progress.id = this.getAttribute('id');
        if (this.hasAttribute('intermediate')) progress.classList.add('intermediate');
        if (this.hasAttribute('value')) progress.style.width = this.getAttribute('value') + '%';
    }
}

customElements.define("eui-progressbar", EUIProgressBar);