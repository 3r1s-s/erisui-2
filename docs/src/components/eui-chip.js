class EUIChip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    border-radius: 8px;
                    border: 2px solid var(--app-400);
                    font-weight: 500;
                    font-size: 1rem;
                    position: relative;
                    color: var(--app-text);
                    overflow: hidden;
                    z-index: 1;

                    user-select: none;
                    -webkit-user-select: none;
                    -webkit-user-drag: none;
                    -webkit-user-modify: none;
                    -webkit-highlight: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    filter: blur(4px);
                    opacity: 0.2;
                    animation: ripple 600ms linear;
                    background-color: var(--app-400); 
                    pointer-events: none;
                    z-index: -1;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                        filter: blur(10px);
                    }
                }
            </style>
            <slot></slot>
        `;

        this.addEventListener("pointerdown", (event) => {
            const ripple = document.createElement("span");
            const target = event.currentTarget;
            const diameter = Math.max(target.offsetWidth, target.offsetHeight);

            ripple.classList.add("ripple");
            ripple.style.left = event.clientX - target.getBoundingClientRect().left - diameter / 2 + "px";
            ripple.style.top = event.clientY - target.getBoundingClientRect().top - diameter / 2 + "px";
            ripple.style.width = diameter + "px";
            ripple.style.height = diameter + "px";

            this.shadowRoot.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }


}

customElements.define("eui-chip", EUIChip);