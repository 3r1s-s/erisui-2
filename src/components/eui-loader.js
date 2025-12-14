class EUISpinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .loader {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    position: relative;
                }

                .loader-icon {
                    stroke: var(--app-accent, #2196F3);
                    fill: none;
                    stroke-width: 2px;
                    stroke-linecap: round;
                    transform-origin: 50% 50%;
                    transform: rotate(-90deg);
                    transition: all 0.2s ease-in-out 0s;
                    animation: 2s linear 0s infinite normal none running loader-spin;
                }

                .loader-icon {
                    stroke: var(--app-text, #F2F3F6);
                }

                @keyframes loader-spin {
                    0% {
                        stroke-dasharray: 0.01px, 43.97px;
                        transform: rotate(0deg)
                    }

                    50% {
                        stroke-dasharray: 21.99px, 21.99px;
                        transform: rotate(450deg)
                    }

                    100% {
                        stroke-dasharray: 0.01px, 43.97px;
                        transform: rotate(1080deg)
                    }
                }
            </style>

            <span class="loader animate">
                <svg viewBox="0 0 16 16"><circle class="loader-icon" cx="8px" cy="8px" r="7px"></circle></svg>
            </span>
        `;
    }
}

customElements.define("eui-loader", EUISpinner);