class EUIButton extends HTMLElement {
    static observedAttributes = ["type", "width", "height", "border-radius", "icon", "link", "href"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const href = this.getAttribute("href");
        const tag = href ? "a" : "button";

        this.shadowRoot.innerHTML = `
            <style>
                button, a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: inherit;
                    border-radius: 0.6rem;
                    border: none;
                    background: var(--app-300);
                    color: var(--app-text, #FFF);
                    cursor: pointer;
                    box-sizing: border-box;
                    text-decoration: none;

                    width: fit-content;

                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;

                    transition: background 0.2s cubic-bezier(.2,0,0,1);

                    position: relative;
                    overflow: hidden;
                }

                button:hover, a:hover {
                    background: var(--app-400);
                    text-decoration: none;
                }

                .light button, .light a {
                    background: var(--app-500);
                }

                button.filled, a.filled {
                    background: var(--app-accent-100);
                    color: #fff;
                }

                button.filled:hover, a.filled:hover {
                    background: var(--app-accent-50);
                }

                button.outlined, a.outlined {
                    background: transparent;
                    box-shadow: inset 0 0 0 2px var(--app-400);
                    color: var(--app-accent-100);
                }

                button.outlined:hover, a.outlined:hover {
                    background: var(--app-300);
                }

                button.icon, a.icon {
                    padding: 0.5rem;
                    border-radius: 50%;
                }

                button.transparent, a.transparent {
                    background: transparent;
                    color: var(--app-text);
                }

                button.transparent:hover, a.transparent:hover {
                    background: var(--app-300);
                }

                button:disabled, a[disabled] {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                button.link, a.link {
                    text-decoration: none;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    opacity: 0.2;
                    animation: ripple 600ms linear forwards;
                    background-color: currentColor;
                    pointer-events: none;
                    z-index: 10;
                    will-change: transform, opacity;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

            </style>
            <${tag}>
                <slot></slot>
            </${tag}>
        `;

        const element = this.shadowRoot.querySelector(tag);

        if (href) element.setAttribute("href", href);

        if (this.hasAttribute("type")) element.classList.add(this.getAttribute("type"));
        if (this.hasAttribute("icon")) element.classList.add("icon");
        if (this.hasAttribute("width")) element.style.width = this.getAttribute("width") + "px";
        if (this.hasAttribute("height")) element.style.height = this.getAttribute("height") + "px";
        if (this.hasAttribute("border-radius")) element.style.borderRadius = this.getAttribute("border-radius") + "px";

        element.addEventListener("pointerdown", (event) => {
            const ripple = document.createElement("span");
            const target = event.currentTarget;
            const rect = target.getBoundingClientRect();

            const diameter = Math.max(target.offsetWidth, target.offsetHeight);
            const radius = diameter / 2;

            ripple.classList.add("ripple");

            ripple.style.width = `${diameter}px`;
            ripple.style.height = `${diameter}px`;
            ripple.style.left = `${event.clientX - rect.left - radius}px`;
            ripple.style.top = `${event.clientY - rect.top - radius}px`;

            element.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    }
}

customElements.define("eui-button", EUIButton);