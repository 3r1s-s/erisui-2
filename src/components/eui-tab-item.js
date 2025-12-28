import { router } from "../scripts/router.js";
import "./eui-avatar.js";
import "./eui-icon.js";

class TabItem extends HTMLElement {
    static get observedAttributes() {
        return ["path", "icon", "label", "badge", "active", "avatar-src", "avatar-name"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        if (!this.hasRendered) {
            this.render();
            this.setupEventListeners();
            this.hasRendered = true;
        }
        this.updateContent();
        this.updateActiveState();
        this.addEventListener("click", this.handleClick);

        this._onRouteSubstitute = () => this.updateActiveState();
        window.addEventListener("popstate", this._onRouteSubstitute);
        window.addEventListener("route-changed", this._onRouteSubstitute);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
        window.removeEventListener("popstate", this._onRouteSubstitute);
        window.removeEventListener("route-changed", this._onRouteSubstitute);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.hasRendered) {
            if (name === 'active') return;
            this.updateContent();
            if (name === 'path') this.updateActiveState();
        }
    }

    handleClick = () => {
        const path = this.getAttribute("path");
        if (path) {
            router.navigate(path);
        }
    }

    updateActiveState() {
        let currentPath = router.location();
        let path = this.getAttribute("path");

        if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;
        if (path && !path.startsWith('/')) path = '/' + path;

        if (path && currentPath === path) {
            this.setAttribute("active", "");
        } else {
            this.removeAttribute("active");
        }
    }

    setupEventListeners() {
        this.addEventListener("pointerdown", (event) => {
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

            this.shadowRoot.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    }

    updateContent() {
        const icon = this.getAttribute("icon");
        const avatarSrc = this.getAttribute("avatar-src");
        const avatarName = this.getAttribute("avatar-name");
        const label = this.getAttribute("label") || "";
        const badge = this.getAttribute("badge");

        const existingBadge = this.shadowRoot.querySelector(".badge");
        if (badge) {
            if (existingBadge) {
                existingBadge.textContent = badge;
            } else {
                const badgeEl = document.createElement("span");
                badgeEl.className = "badge";
                badgeEl.textContent = badge;
                this.shadowRoot.appendChild(badgeEl);
            }
        } else if (existingBadge) {
            existingBadge.remove();
        }

        const iconSlot = this.shadowRoot.querySelector("slot[name='icon']");
        if (iconSlot) {
            if (avatarSrc || avatarName) {
                let content = `<eui-avatar size="24"`;
                if (avatarName) content += ` name="${avatarName}"`;
                content += `>`;
                if (avatarSrc) content += `<img src="${avatarSrc}" alt="${avatarName || 'Avatar'}" />`;
                content += `</eui-avatar>`;
                iconSlot.innerHTML = content;
            } else if (icon) {
                iconSlot.innerHTML = `<eui-icon width="20" height="20" name="${icon}"></eui-icon>`;
            } else {
                iconSlot.innerHTML = '';
            }
        }

        const labelEl = this.shadowRoot.querySelector(".label");
        if (labelEl) labelEl.textContent = label;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    height: 100%;
                    cursor: pointer;
                    padding: 4px 0;
                    box-sizing: border-box;
                    color: var(--app-700);
                    transition: color 0.2s var(--transition-function);
                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }

                :host([active]) {
                    color: var(--app-link);
                }

                .icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    transition: transform 0.2s var(--transition-function);
                }

                .label {
                    font-size: 12px;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    padding: 0 4px;
                }

                :host([active]) .label {
                    font-weight: 600;
                }

                .badge {
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    margin-left: 8px;
                    min-width: 16px;
                    height: 16px;
                    padding: 0 4px;
                    border-radius: 8px;
                    background-color: var(--app-red);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 700;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    pointer-events: none;
                    z-index: 2;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    opacity: 0.15;
                    animation: ripple 600ms linear forwards;
                    background-color: currentColor; 
                    pointer-events: none;
                    z-index: 0;
                }

                .inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 32px;
                    width: 56px;
                    border-radius: 100px;
                    cursor: pointer;
                    margin-bottom: 4px;
                    box-sizing: border-box;
                    transition: color 0.2s var(--transition-function);
                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }

                :host([active]) .inner {
                    background-color: color-mix(in srgb, var(--app-link) 25%, transparent 100%);
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            </style>
            <div class="inner">
                <div class="icon-container">
                    <slot name="icon"></slot>
                </div>
                </div>
                <span class="label"></span>
            <slot></slot>
        `;
    }
}

customElements.define("eui-tab-item", TabItem);