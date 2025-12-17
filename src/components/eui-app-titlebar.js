class AppTitlebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ["name"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "name") {
            this.render();
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        const toggleBtn = this.shadowRoot.querySelector("#nav-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                window.dispatchEvent(new CustomEvent("toggle-nav"));
            });
        }
    }

    render() {
        const title = this.getAttribute("name") || "Title";

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                height: var(--titlebar-height, 65px);
                background-color: var(--app-200);
                flex-shrink: 0;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 200;
                box-sizing: border-box;
            }

            .titlebar {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
            }

            .left-section {
                display: flex;
                align-items: center;
            }

            .title {
                font-size: 1.25rem;
                font-weight: 400;
                color: var(--app-text);
                margin: 0;
                user-select: none;
            }

            .menu-button {
                border: none;
                background-color: transparent;
                cursor: pointer;
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border-radius: 50%;
                color: inherit;
                padding: 0;
            }

            .menu-button:hover {
                background-color: var(--app-300);
            }

            .menu-button:active {
                transform: scale(0.95);
            }

            .menu-button:focus-visible {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            .right-section {
                display: flex;
                align-items: center;
                padding-right: 1rem;
            }

            .nav-section {
                width: var(--nav-width, 75px);

                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>

        <div class="titlebar">
            <div class="left-section">
                <div class="nav-section">
                    <eui-button class="menu-button" id="nav-toggle" aria-label="Toggle Navigation" aria-expanded="false" aria-controls="nav-items" tabindex="0" type="transparent" border-radius="100">
                        <eui-icon width="24" height="24" name="menu"></eui-icon>
                    </eui-button>
                </div>
                <h2 class="title">${title}</h2>
            </div>
            <div class="right-section">
                <slot></slot>
            </div>
        </div>
        `;
    }
}

customElements.define("eui-app-titlebar", AppTitlebar);
