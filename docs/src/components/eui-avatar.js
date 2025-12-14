class EUIAvatar extends HTMLElement {
    static get observedAttributes() {
        return ["size", "border-radius", "name", "color"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    aspect-ratio: 1 / 1;
                    width: fit-content;

                    user-select: none;
                    -webkit-user-select: none;
                    -webkit-user-drag: none;
                    -webkit-user-modify: none;
                    -webkit-highlight: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .avatar {
                    width: 32px;
                    height: 100%;
                    aspect-ratio: 1 / 1;

                    border-radius: var(--border-radius, 50%);
                    overflow: hidden;
                    box-shadow: inset 0 0 0 1px #ffffff25;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #000;
                    color: #fff;
                    font-weight: 500;
                    font-size: 1.2rem;
                    text-transform: uppercase;
                }

                ::slotted(img) {
                    width: 100%;
                    height: 100%;
                    border-radius: var(--border-radius, 50%);
                    object-fit: cover;
                    display: block;
                }
            </style>
            <div class="avatar">
                <slot></slot>
                <span id="initials"></span>
            </div>
        `;
    }

    connectedCallback() {
        this.avatar = this.shadowRoot.querySelector(".avatar");
        this.initials = this.shadowRoot.querySelector("#initials");

        const slot = this.shadowRoot.querySelector("slot");
        const hasSlottedContent = slot && slot.assignedNodes().length > 0;

        if (hasSlottedContent) {
            const slottedNode = slot.assignedNodes()[0];
            if (slottedNode && slottedNode.tagName === 'IMG') {
                this.initials.style.display = "none";
                this.avatar.style.backgroundColor = "transparent";
            }
        } else {
            if (this.hasAttribute("color")) {
                this.avatar.style.backgroundColor = this.getAttribute("color");
            }
        }
        if (this.hasAttribute("color")) {
            this.avatar.style.backgroundColor = this.getAttribute("color");
        }
        if (this.hasAttribute("size")) {
            const size = this.getAttribute("size");
            this.avatar.style.width = size + "px";
            this.avatar.style.height = size + "px";
            this.initials.style.fontSize = size / 2 + "px";
        }

        if (this.hasAttribute("border-radius")) {
            this.avatar.style.borderRadius = this.getAttribute("border-radius") + "px";
        }

        if (this.hasAttribute("name")) {
            this.avatar.title = this.getAttribute("name");
        }

        if (!hasSlottedContent && this.hasAttribute("name")) {
            const name = this.getAttribute("name").trim();
            const parts = name.split(/\s+/);
            let initials = "";

            if (parts.length === 1) {
                initials = parts[0][0] || "";
            } else {
                initials = (parts[0][0] || "") + (parts[parts.length - 1][0] || "");
            }

            this.initials.textContent = initials.toUpperCase();
        }
    }
}

customElements.define("eui-avatar", EUIAvatar);