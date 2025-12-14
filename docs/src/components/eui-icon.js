import { icon } from "../scripts/icons.js";

class UIIcon extends HTMLElement {
    static get observedAttributes() {
        return ["name", "width", "height"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute("name");
        const svg = icon[name];

        if (!svg) {
            this.shadowRoot.innerHTML = `<span style="color:red;">?</span>`;
            return;
        }

        const template = document.createElement("template");
        template.innerHTML = svg.trim();
        const node = template.content.cloneNode(true);

        const el = node.firstElementChild;
        if (el && el.style) {
            const w = this.getAttribute("width");
            const h = this.getAttribute("height");

            if (w) el.setAttribute("width", w);
            if (h) el.setAttribute("height", h);

            el.style.display = "block";
        }

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(node);
    }
}

customElements.define("eui-icon", UIIcon);