import { router } from "../scripts/router.js";
import "./eui-avatar.js";

class NavItem extends HTMLElement {
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
        this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.hasRendered) {
            if (name === 'active') {
                return;
            }
            this.updateContent();
        }
    }

    handleClick = () => {
        const path = this.getAttribute("path");
        if (path) {
            router.navigate(path);
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
            } else {
                const currentIcon = iconSlot.querySelector("eui-icon");
                if (icon && currentIcon) {
                    if (currentIcon.getAttribute("name") !== icon) {
                        currentIcon.setAttribute("name", icon);
                    }
                } else if (icon) {
                    iconSlot.innerHTML = `<eui-icon width="24" height="24" name="${icon}"></eui-icon>`;
                } else {
                    iconSlot.innerHTML = '';
                }
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
                z-index: 1;
                display: flex;
                align-items: center;
                height: 50px;
                width: 100%;
                cursor: pointer;
                border-radius: 100px;
                justify-content: flex-start;
                padding: 0 1rem;
                box-sizing: border-box;
                transition: background-color 0.2s cubic-bezier(.4, 0, .2, 1), transform 0.2s cubic-bezier(.4, 0, .2, 1);
                user-select: none;
                -webkit-user-select: none;
                color: var(--app-text);
            }

            :host(:hover) {
                background-color: var(--app-300);
            }

            :host(:focus-visible) {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            :host([active]) {
                background-color: color-mix(in srgb, var(--app-link) 25%, transparent 100%);
                color: var(--app-link);
            }
            
            :host([active]) .label {
                 font-weight: 600;
            }

            .icon-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                flex-shrink: 0;
                border-radius: 100px;
            }

            :host([active]) .icon-container eui-avatar {
                outline: 2px solid var(--app-link);
                outline-offset: 1px;
                border-radius: 50%;
            }

            .label {
                opacity: var(--nav-item-label-opacity, 0);
                margin-left: 1rem;
                display: block;
                transition: opacity 0.1s ease;
                white-space: nowrap;
            }

            .badge {
                position: absolute;
                top: 4px;
                left: calc(32px + 2px);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--app-red);
                color: var(--app-white);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 600;
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

        <div class="icon-container">
            <slot name="icon">
                 <eui-icon width="24" height="24" name=""></eui-icon>
            </slot>
        </div>
        <span class="label"></span>
        `;
    }
}

customElements.define("eui-nav-item", NavItem);
