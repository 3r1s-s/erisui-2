import { copystr } from "../scripts/utils.js";

class EUICode extends HTMLElement {
    static get observedAttributes() {
        return ["copy", "id", "type"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._boundCopy = this._onCopy.bind(this);
        this._isRendered = false;
    }

    connectedCallback() {
        if (!this._isRendered) {
            this.render();
            this._isRendered = true;
        }
    }

    render() {
        const showCopy = this.hasAttribute("copy");

        this.shadowRoot.innerHTML = `
            <style>
            :host {
                position: relative;
                display: block;
            }
            
            pre {
                padding: 20px;
                background: var(--app-100);
                border: 1px solid var(--app-300);
                border-radius: 20px;
                font-family: 'Reddit Mono', consolas;
                overflow-x: auto;
                line-height: 1.25;
                white-space: pre;
            }

            .copy {
                position: absolute;
                top: 8px;
                right: 8px;
            }
            pre.g {
                padding-right: 60px;
            }
            </style>

            <eui-button class="copy" width="45" height="45" border-radius="100">
                <eui-icon name="copy" width="24" height="24"></eui-icon>
            </eui-button>

            <pre class="${showCopy ? "g" : ""}"><code></code></pre>
        `;

        this.copyBtn = this.shadowRoot.querySelector(".copy");
        this.codeEl = this.shadowRoot.querySelector("code");

        this.codeEl.textContent = this._getFormattedText();

        if (!showCopy) {
            this.copyBtn.style.display = "none";
        } else {
            this.copyBtn.addEventListener("click", this._boundCopy);
        }
    }

    _getFormattedText() {
        let raw = this.textContent || "";

        raw = raw.replace(/^\s*\n/, "").replace(/\n\s*$/, "");

        raw = raw.replace(/[ \t]+$/gm, "");

        const lines = raw.split("\n");
        const indents = lines
            .filter(l => l.trim())
            .map(l => l.match(/^\s*/)[0].length);

        const commonIndent = indents.length ? Math.min(...indents) : 0;

        raw = lines.map(l => l.slice(commonIndent)).join("\n");

        return raw;
    }

    _onCopy() {
        copystr(this._getFormattedText());
    }

    disconnectedCallback() {
        if (this.copyBtn) {
            this.copyBtn.removeEventListener("click", this._boundCopy);
        }
    }
}

customElements.define("eui-code", EUICode);