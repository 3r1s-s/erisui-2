class EUIHeading extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'anchor'];
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        
        this.hd = this.shadowRoot.querySelector('.hd');
        if (this.hasAttribute('type')) this.hd.classList.add(this.getAttribute('type'));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    margin: 16px 0;
                }

                .hd {
                    font-size: 2.5rem;
                    font-weight: 600;
                    margin: 0;
                }

                .h2 {
                    font-size: 2rem;
                }

                .h3 {
                    font-size: 1.5rem;
                }

                .anchor {
                    position: absolute;
                    width: 100%;
                    height: 100%;

                    inset: 0;
                    inset-inline-start: -24px;
                    opacity: 0;
                    transition: opacity .25s var(--transition-function);

                    display: flex;
                    align-items: center;

                    text-decoration: none;
                    color: var(--app-accent);
                    font-size: 1.5rem;
                }

                .anchor:hover {
                    opacity: 1;
                }

                .anchor-hash {
                    margin-inline-end: 8px;
                    font-weight: 700;
                }
            </style>

            <span class="hd">
                <slot></slot>
            </span>
            ${this.getAttribute("anchor") ? `
            <a class="anchor" href="#${this.getAttribute("anchor")}" id="${this.getAttribute("anchor")}">
                <span class="anchor-hash">#</span>
            </a>
            ` : ""}
        `;
    }
}

customElements.define("eui-heading", EUIHeading);