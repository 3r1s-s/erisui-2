import { haptic } from '../scripts/haptics.js';
import { storage, settings } from '../scripts/storage.js';

class Switch extends HTMLElement {
    static get observedAttributes() {
        return ["selected"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .switch {
                    background-color: var(--app-200);
                    border-radius: 16px;

                    box-shadow: inset 0px 0px 0px 2px var(--app-400);
                    width: 52px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }

                .switch.selected {
                    background-color: #B8C4FF;
                    box-shadow: none;
                }

                .handle {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: var(--app-900);
                    margin-inline-start: 0;
                    margin-inline-end: calc(52px - 32px);

                    transition: margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    width 250ms cubic-bezier(0.2, 0, 0, 1),
                    height 250ms cubic-bezier(0.2, 0, 0, 1);

                    pointer-events: none;
                    user-select: none;
                }

                .switch.selected .handle {
                    background-color: #5F7AFF;
                    margin-inline-start: calc(52px - 32px);
                    margin-inline-end: 0;
                    width: 24px;
                    height: 24px;
                }

                .switch:active .handle {
                    width: 28px;
                    height: 28px;
                }

                input {
                    appearance: none;
                    opacity: 0;
                    height: max(100%, var(--eui-switch-touch-target-size, 48px));
                    width: max(100%, var(--eui-switch-touch-target-size, 48px));
                    position: absolute;
                    margin: 0;
                    cursor: inherit;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                }
            </style>

            <div class="switch">
                <input type="checkbox" role="switch">
                <span class="handle"></span>
            </div>
        `;
    }

    connectedCallback() {
        this.inputEl = this.shadowRoot.querySelector("input");
        this.switchEl = this.shadowRoot.querySelector(".switch");

        this.updateFromAttribute();

        this.switchEl.addEventListener("click", () => this.toggle());
    }

    toggle() {
        this.selected = !this.selected;
        haptic();
    }

    updateFromAttribute() {
        const on = this.hasAttribute("selected");
        this.inputEl.checked = on;
        this.switchEl.classList.toggle("selected", on);
    }

    attributeChangedCallback(name, oldV, newV) {
        if (name === "selected" && this.inputEl) {
            this.updateFromAttribute();
        }
    }

    get selected() {
        return this.hasAttribute("selected");
    }

    set selected(v) {
        if (v) this.setAttribute("selected", "");
        else this.removeAttribute("selected");
    }
}

customElements.define("eui-switch", Switch);