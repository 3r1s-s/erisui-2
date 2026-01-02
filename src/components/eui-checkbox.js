import { haptic } from '../scripts/haptics.js';

class Checkbox extends HTMLElement {
    static get observedAttributes() {
        return ["selected"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    vertical-align: bottom;
                    position: relative;
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                }

                .checkbox {
                    position: relative;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    box-shadow: inset 0px 0px 0px 2px var(--app-400);

                    color: #fff;
                }

                .checkbox.selected, .checkbox.indeterminate {
                    background-color: var(--app-accent);
                    box-shadow: none;
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

                .mark.long {
                    height:2px;
                    transition-property:transform,width;
                    width:0px;
                }

                .mark.short {
                    height: 2px;
                    transition-property: transform,height;
                    width: 0px;
                }

                .mark {
                    fill: #fff;
                    transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
                }

                .selected .mark.long {
                    animation-duration: 350ms;
                    animation-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
                    transition-duration: 350ms;
                    transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
                }

                .selected .mark.short {
                    width: 2px;
                    height: 5.6568542495px;
                }

                .selected .mark.long{
                    width: 11.313708499px;
                }
            </style>

            <div class="checkbox">
                <input type="checkbox" role="checkbox">
                <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
                    <rect class="mark short"></rect>
                    <rect class="mark long"></rect>
                </svg>
            </div>
        `;
    }

    connectedCallback() {
        this.inputEl = this.shadowRoot.querySelector("input");
        this.checkEl = this.shadowRoot.querySelector(".checkbox");

        this.updateFromAttribute();

        this.checkEl.addEventListener("click", () => this.toggle());
    }

    toggle() {
        this.selected = !this.selected;
        haptic();

        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }

    updateFromAttribute() {
        const on = this.hasAttribute("selected");
        this.inputEl.checked = on;
        this.checkEl.classList.toggle("selected", on);
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

customElements.define("eui-checkbox", Checkbox);