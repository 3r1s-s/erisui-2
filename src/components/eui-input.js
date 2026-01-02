class EUIInput extends HTMLElement {
    static get observedAttributes() {
        return ["label", "value", "id", "type", "filled"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                    max-width: 300px;
                    margin: 0.75rem 0;
                    position: relative;
                }

                .form-input {
                    padding: 5px 10px;
                    border-radius: 5px;
                    width: 100%;
                    box-sizing: border-box;
                    font-size: 1em;
                    font-family: inherit;
                    height: 52px;
                    background: var(--app-100, #111);
                    outline: none;
                    border: 1px solid var(--app-300, #2196F3);
                    caret-color: var(--app-text);
                    color: var(--app-text);
                    transition: border .15s ease-out;
                }

                .filled.form .form-input {
                    background: var(--app-200, #222);
                    padding-bottom: 0;
                    padding-top: 0.6rem;
                    border: none;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    border-bottom: 1px solid var(--app-300, #333);
                }

                .form-input:focus {
                    border: 1px solid var(--app-blue, #2196F3);
                }

                .filled.form .form-input:focus {
                    border-bottom: 2.5px solid var(--app-blue, #2196F3);
                }

                .form {
                    --form-inactive-top: 14.5px;
                    --form-inactive-left: 6px;

                    --form-active-top: -10px;
                    --form-active-left: 5px;
                }

                .filled.form {
                    --form-active-top: 3px;
                    --form-active-left: 6px;
                }

                .form label {
                    transition: all .15s ease-out;
                    color: var(--app-400, #999);
                    background: var(--app-100, #111);
                    pointer-events: none;
                    display: block;
                    padding: 0 .25rem;
                    position: absolute;
                    left: var(--form-inactive-left);
                    top: var(--form-inactive-top);
                    border-radius: 5px;
                    width: fit-content;

                    user-select: none;
                    -webkit-user-select: none;
                }

                .filled.form label {
                    background: transparent;
                }

                .form-input:focus+label,
                .form-input:not(:placeholder-shown)+label,
                .form-input.filled+label,
                .form.always-active label {
                    top: var(--form-active-top);
                    left: var(--form-active-left);
                    font-size: .75em;
                }

                .form-input:focus+label {
                    font-weight: 600;
                    color: var(--app-blue, #2196F3);
                    width: auto;
                }
            </style>

            <div class="form">
                <input class="form-input" placeholder=" ">
                <label></label>
            </div>
        `;
    }

    connectedCallback() {
        this.form = this.shadowRoot.querySelector('.form');
        this.inputEl = this.shadowRoot.querySelector('.form-input');
        this.labelEl = this.shadowRoot.querySelector('label');

        if (this.hasAttribute('value')) this.inputEl.value = this.getAttribute('value');
        if (this.hasAttribute('id')) this.inputEl.id = this.getAttribute('id');
        if (this.hasAttribute('label')) this.labelEl.textContent = this.getAttribute('label');
        if (this.hasAttribute('type')) this.inputEl.type = this.getAttribute('type');
        if (this.hasAttribute('filled')) this.form.classList.add('filled');

        this.inputEl.addEventListener('input', (e) => {
            this.setAttribute('value', this.inputEl.value);
            this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        });

        this.inputEl.addEventListener('change', (e) => {
            this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.inputEl || !this.labelEl) return;

        switch (name) {
            case 'value':
                if (this.inputEl.value !== newValue) this.inputEl.value = newValue;
                break;
            case 'id':
                this.inputEl.id = newValue;
                break;
            case 'label':
                this.labelEl.textContent = newValue;
                break;
        }
    }

    get value() {
        return this.inputEl.value;
    }

    set value(val) {
        this.setAttribute('value', val);
    }
}

customElements.define("eui-input", EUIInput);