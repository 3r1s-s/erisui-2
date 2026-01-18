export class EuiTabBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    set tabItems(items) {
        this._tabItems = items;
        this.render();
    }

    get tabItems() {
        return this._tabItems || [];
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: var(--tab-bar-height);
                    z-index: 100;
                    background-color: var(--app-200);
                    padding-bottom: env(safe-area-inset-bottom);
                }

                .inner {
                    width: 100%;
                    max-width: 600px;
                    height: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    padding: 0 8px;
                    box-sizing: border-box;
                }
            </style>
            <div class="inner">
                <slot>
                    ${this.tabItems.map(item => {
            const avatarSrc = item.avatar?.src || '';
            const avatarName = item.avatar?.name || '';
            return `<eui-tab-item path="${item.path}" icon="${item.icon}" avatar-src="${avatarSrc}" avatar-name="${avatarName}" label="${item.label}" badge="${item.badge || ''}"></eui-tab-item>`;
        }).join('')}
                </slot>
            </div>
        `;
    }
}

customElements.define("eui-tab-bar", EuiTabBar);