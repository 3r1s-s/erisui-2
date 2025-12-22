import { router } from "../scripts/router.js";
import "./eui-nav-item.js";

class AppNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.updateActiveState();

        window.addEventListener('popstate', () => this.updateActiveState());
        window.addEventListener('route-changed', () => this.updateActiveState());
        window.addEventListener('toggle-nav', () => this.classList.toggle("expanded"));
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: fixed;
                top: var(--titlebar-height, 65px);
                left: 0;
                height: calc(100% - var(--titlebar-height, 65px));
                z-index: 100;

                width: var(--nav-width, 75px);
                transition: width 0.2s cubic-bezier(0.2, 0, 0, 1);
            }

            :host(.expanded) {
                width: var(--nav-expanded-width, 250px);
                --nav-item-label-opacity: 1;
            }

            .app-nav-container {
                width: 100%;
                min-width: var(--nav-width, 75px);
                height: 100%;
                box-sizing: border-box;
                background-color: var(--app-200);
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
            }

            .nav-items {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.5rem;
                box-sizing: border-box;
                overflow-y: auto;
                overflow-x: hidden;
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
            }

            .menu-button:hover {
                background-color: var(--app-300);
                box-shadow: 0 0 2px 0 #00000011;
            }

            .menu-button:active {
                transform: scale(0.95);
            }

            .menu-button:focus-visible {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            #skip_navigation_link {
                position: fixed;
                top: -100px;
                left: -100px;
                z-index: 1001;
                width: 1px;
                height: 1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
                padding: 0;
                margin: 0;
            }

            #skip_navigation_link:focus {
                top: 0;
                left: 0;
                overflow: visible;
                clip: auto;
                border: 1px dotted;
                padding: 4px 8px;
                margin: 4px;
                width: 80px;
                height: auto;
                background-color: var(--app-link);
                color: var(--app-white);
                text-align: center;
            }
        </style>

        <div class="app-nav-container">
            <a href="#content" id="skip_navigation_link">Skip To Content</a>
            <div class="nav-items">
                ${this.navItems.map(item => {
            if (item.type === 'divider') {
                return '<div style="height: 1px; background: var(--app-300); margin: 0.5rem 0;"></div>';
            }
            const avatarSrc = item.avatar?.src || '';
            const avatarName = item.avatar?.name || '';
            return `<eui-nav-item path="${item.path}" icon="${item.icon}" avatar-src="${avatarSrc}" avatar-name="${avatarName}" label="${item.label}"></eui-nav-item>`;
        }).join('')}
            </div>
        </div>
        `;
    }

    set navItems(items) {
        this._navItems = items;
        this.render();
        this.updateActiveState();
    }

    get navItems() {
        return this._navItems || [];
    }

    updateActiveState(currentPath) {
        if (!currentPath) {
            currentPath = router.location();
        }

        if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;

        const navItems = this.shadowRoot.querySelectorAll("eui-nav-item");
        navItems.forEach(item => {
            const itemPath = item.getAttribute("path");
            if (itemPath === currentPath) {
                item.setAttribute("active", "");
            } else {
                item.removeAttribute("active");
            }
        });
    }
}

customElements.define("eui-app-nav", AppNav);
