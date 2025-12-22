class EUIHeader extends HTMLElement {
    static get observedAttributes() {
        return ["type", "title", "subtitle", "img"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    border-radius: 24px;
                    background: var(--app-200, #111);
                    color: var(--app-text, #FFF);
                    overflow: hidden;
                    display: block;
                }

                .header {
                    min-height: 180px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 48px;
                    box-sizing: border-box;
                    position: relative;
                }

                .hero {
                    min-height: 280px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    color: #fff;
                    background: #333;
                }

                .img {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    z-index: 0;
                    opacity: .5;
                }

                .content {
                    position: relative;
                    z-index: 1;
                }

                h1 {
                    margin: 0 0 8px;
                    font-size: 3rem;
                }

                .large h1, .hero h1 {
                    font-size: 5.5rem;
                }

                .small h1 {
                    font-size: 2rem;
                    margin: 0;
                }

                .small p {
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .header {
                        padding: 1rem;
                    }

                    .hero {
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }

                    .large h1, .hero h1 {
                        font-size: 4rem;
                    }
                }
            </style>

            <div class="header">
                <div class="img"></div>
                <div class="content">
                    <h1></h1>
                    <p></p>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.hd = this.shadowRoot.querySelector('.header');

        if (this.hasAttribute('type')) this.hd.classList.add(this.getAttribute('type'));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const h1 = this.shadowRoot.querySelector("h1");
        const sub = this.shadowRoot.querySelector("p");
        const bg = this.shadowRoot.querySelector(".img");

        if (name === "title") h1.textContent = newValue;
        if (name === "subtitle") sub.textContent = newValue;
        if (name === "img") bg.style.backgroundImage = newValue ? `url(${newValue})` : "";
    }
}

customElements.define("eui-header", EUIHeader);