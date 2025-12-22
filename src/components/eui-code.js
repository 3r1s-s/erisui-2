import { copystr } from "../scripts/utils.js";

class EUICode extends HTMLElement {
    static get observedAttributes() {
        return ["copy", "id", "type", "language"];
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

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._isRendered && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const showCopy = this.hasAttribute("copy");
        const language = this.getAttribute("language") || "text";

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
                font-family: 'Reddit Mono', monospace;
                font-size: 14px;
                overflow-x: auto;
                line-height: 1.5;
                white-space: pre;
                color: var(--app-text);
            }

            .copy {
                position: absolute;
                top: 8px;
                right: 8px;
                opacity: 0;
                transition: opacity 0.2s;
            }

            :host(:hover) .copy {
                opacity: 1;
            }

            pre.g {
                padding-right: 60px;
            }

            .token.comment { color: var(--app-700); font-style: italic; }
            .token.string { color: #9ECE6A; }
            .token.number { color: #F97C5F; }
            .token.keyword { color: #7DCFFF; }
            .token.function { color: #7DCFFF; }
            .token.tag { color: #DE5971; }
            .token.attr-name { color: #BB9AF7; }
            .token.attr-value { color: #9ECE6A; }
            .token.boolean { color: #F97C5F; }
            </style>

            <eui-button class="copy" width="36" height="36" border-radius="100">
                <eui-icon name="copy" width="18" height="18"></eui-icon>
            </eui-button>

            <pre class="${showCopy ? "g" : ""}"><code></code></pre>
        `;

        this.copyBtn = this.shadowRoot.querySelector(".copy");
        this.codeEl = this.shadowRoot.querySelector("code");

        const rawCode = this._getFormattedText();
        this.codeEl.innerHTML = this._highlight(rawCode, language);

        if (!showCopy) {
            this.copyBtn.style.display = "none";
        } else {
            this.copyBtn.addEventListener("click", this._boundCopy);
        }
    }

    _getFormattedText() {
        const target = this.querySelector("code") || this;

        let raw = target.innerHTML || "";

        raw = this._unescapeHtml(raw);

        raw = raw.replace(/^\s*\n/, "").replace(/\n\s*$/, "");

        const lines = raw.split("\n");
        const indents = lines
            .filter(l => l.trim())
            .map(l => l.match(/^\s*/)[0].length);

        const commonIndent = indents.length ? Math.min(...indents) : 0;

        return lines.map(l => l.slice(commonIndent)).join("\n");
    }

    _unescapeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    _highlight(code, lang) {
        code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const tokens = {};
        let tokenCount = 0;

        function storeToken(content, type) {
            const key = `__TOKEN_${type}_${tokenCount++}__`;
            tokens[key] = `<span class="token ${type}">${content}</span>`;
            return key;
        }

        if (["javascript", "js", "json", "bash", "sh", "css"].includes(lang)) {
            code = code.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => storeToken(match, "string"));

            if (lang === "bash" || lang === "sh") {
                code = code.replace(/(#.*$)/gm, (match) => storeToken(match, "comment"));
            } else if (lang === "css") {
                code = code.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => storeToken(match, "comment"));
            } else {
                code = code.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => storeToken(match, "comment"));
            }
        } else if (["html", "xml"].includes(lang)) {
            code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => storeToken(match, "comment"));
            code = code.replace(/(&lt;\/?[a-z0-9:-]+)/gi, (match) => storeToken(match, "tag"));
        }

        if (lang === "javascript" || lang === "js" || lang === "json") {
            code = code.replace(/\b(const|let|var|if|else|for|while|return|function|class|import|export|from|default|switch|case|break|continue|new|this|async|await)\b/g, '<span class="token keyword">$1</span>');
            code = code.replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>');
            code = code.replace(/\b([a-zA-Z0-9_]+)\s*(?=\()/g, '<span class="token function">$1</span>');
        }
        else if (lang === "bash" || lang === "sh") {
            code = code.replace(/\b(npm|npx|node|git|cd|ls|mkdir|rm|mv|cp|echo|cat|sudo|docker|brew|grep|curl|wget|chmod|chown|touch)\b/g, '<span class="token keyword">$1</span>');
            code = code.replace(/\b(install|run|build|start|test|dev|init|clone|pull|push|commit|add|checkout|branch|merge)\b/g, '<span class="token function">$1</span>');
            code = code.replace(/(\s-+[a-zA-Z0-9-]+)/g, '<span class="token attr-name">$1</span>');
            code = code.replace(/(\$[A-Z0-9_]+)/g, '<span class="token number">$1</span>');
        }
        else if (lang === "html" || lang === "xml") {
            code = code.replace(/\s([a-z0-9:-]+)=/gi, (match, name) => " " + storeToken(name, "attr-name") + "=");
            code = code.replace(/(".*?")/g, (match) => storeToken(match, "attr-value"));

            code = code.replace(/&gt;/g, '<span class="token tag">&gt;</span>');
        }
        else if (lang === "css") {
            code = code.replace(/([a-z-]+)(?=:)/g, '<span class="token keyword">$1</span>');
        }

        Object.keys(tokens).reverse().forEach(key => {
            code = code.replace(key, tokens[key]);
        });

        return code;
    }

    _onCopy() {
        copystr(this._getFormattedText());
        const icon = this.copyBtn.querySelector("eui-icon");
        if (icon) {
            const original = icon.getAttribute("name");
            icon.setAttribute("name", "check");
            setTimeout(() => icon.setAttribute("name", original), 2000);
        }
    }

    disconnectedCallback() {
        if (this.copyBtn) {
            this.copyBtn.removeEventListener("click", this._boundCopy);
        }
    }
}

customElements.define("eui-code", EUICode);