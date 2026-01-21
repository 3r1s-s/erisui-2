import { haptic } from "../scripts/haptics.js";

class EUIModal extends HTMLElement {
    static observedAttributes = ["width", "height", "open", "type", "return"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isDragging = false;
        this.sy = 0;
        this.startHeight = 0;
        this.y = 0;
        this.t = 0;
        this.vel = 0;
        this.isExpanded = false;

        this.startDrag = this.startDrag.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.close = this.close.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);

        this._returnValue = "";
    }

    get returnValue() {
        return this._returnValue;
    }

    set returnValue(val) {
        this._returnValue = val;
        if (val) {
            this.setAttribute("return", val);
        } else {
            this.removeAttribute("return");
        }
    }

    connectedCallback() {
        this.render();
        this.setupResultListeners();
    }

    attributeChangedCallback(name, oldv, newv) {
        if (oldv === newv) return;

        if (name === "open") {
            if (newv !== null) {
                this.open();
            } else {
                this.close();
            }
        } else if (name === "width") {
            if (this.modal) this.modal.style.width = newv;
        } else if (name === "height") {
            if (this.modal) this.modal.style.height = newv;
        } else if (name === "return") {
            this._returnValue = newv || "";
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1000;
                    pointer-events: none;
                    visibility: hidden;

                    --modal-bg: var(--app-200);
                    --modal-overlay: rgba(0, 0, 0, 0.8);

                    --ease-spring-enter: cubic-bezier(0.38, 1.21, 0.22, 1);
                    --ease-spring-exit: cubic-bezier(0.38, 1.21, 0.22, 1);
                    --ease-bounce: cubic-bezier(0, -0.25, 0, 1.5);
                    --ease-smooth: cubic-bezier(0, -0.25, 0, 1);

                    --trans-mobile-enter: transform 0.5s var(--ease-spring-enter), height 0s;
                    --trans-mobile-exit: height 0.4s var(--ease-spring-exit);
                    
                    --trans-scale-enter: transform 0.15s var(--ease-bounce), opacity 0.2s var(--ease-smooth);
                    --trans-scale-exit: transform 0.2s var(--ease-smooth), opacity 0.2s var(--ease-smooth);
                }

                :host([open]) {
                    visibility: visible;
                    pointer-events: auto;
                }

                .modal-outer {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    transition: background 0.2s cubic-bezier(.2, 0, 0, 1);
                }

                :host([open]) .modal-outer {
                    background-color: var(--modal-overlay);
                }

                :host(.closing) .modal-outer {
                    background-color: transparent;
                }

                .modal {
                    background: var(--modal-bg);
                    color: var(--app-text);
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    user-select: none;
                    overflow: hidden;
                }

                .modal-handle-area {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 30px;
                    padding-bottom: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-shrink: 0;
                    cursor: grab;
                    touch-action: none;
                    z-index: 0;
                }

                .modal-handle {
                    width: 32px;
                    height: 4px;
                    background: var(--app-text);
                    opacity: 0.2;
                    border-radius: 100px;
                }

                .modal-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 28px;
                    scrollbar-width: none;
                    position: relative;
                    z-index: -1;
                }

                .modal-header {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    width: 100%;
                    padding: 18px;
                    padding-bottom: 0;
                    box-sizing: border-box;
                    box-shadow: 0 10px 10px var(--modal-bg);
                    position: relative;
                    z-index: 2;
                }

                slot[name="header-title"] {
                    grid-column: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                slot[name="header-title"]::slotted(*) {
                    text-align: center;
                    font-weight: 600;
                    margin: 0;
                }

                slot[name="header-left"] {
                    grid-column: 1;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                slot[name="header-right"] {
                    grid-column: 3;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    padding-inline: 28px;
                    padding-bottom: calc(28px + env(safe-area-inset-bottom));
                    padding-top: 10px;               
                }

                /* Mobile Default Layout */
                .modal {
                    width: 100%;
                    max-width: 500px;
                    height: 90%;
                    align-self: end;
                    border-radius: 40px 40px 0 0;
                    padding-bottom: env(safe-area-inset-bottom, 20px);
                    
                    /* Visuals */
                    /* Shadow + Extra block at bottom to plug bounce gaps */
                    box-shadow: 0 100px 0 var(--modal-bg);

                    /* Entry State */
                    transform: translateY(100%);
                    transition: var(--trans-mobile-enter);
                    position: relative;
                }

                :host([open]) .modal {
                    transform: translateY(0);
                }

                :host(.closing) .modal {
                    height: 0 !important;
                    min-height: 0;
                    transform: translateY(0);
                    transition: var(--trans-mobile-exit);
                }

                /* Alert Layout */
                :host([type="alert"]) .modal {
                    width: 90%;
                    max-width: 400px;
                    height: auto;
                    max-height: 80vh;
                    align-self: center;
                    border-radius: 20px;
                    padding-bottom: 0;
                    border: 3px solid var(--app-200);

                    transform: scale(0.95);
                    opacity: 0;
                    transition: var(--trans-scale-enter);
                }

                :host([type="alert"][open]) .modal {
                    transform: scale(1);
                    opacity: 1;
                }

                :host([type="alert"]) .modal-handle-area {
                    display: none;
                }

                /* Alert Closing State */
                :host([type="alert"].closing) .modal {
                    height: auto !important; /* Prevent shrink */
                    transform: scale(0.95);
                    opacity: 0;
                    transition: var(--trans-scale-exit);
                }

                /* Desktop Layout */
                @media (min-width: 768px) {
                    .modal, 
                    :host([type="alert"]) .modal {
                        width: 70%;
                        max-width: 700px;
                        height: auto;
                        max-height: 80%;
                        align-self: center;
                        border-radius: 30px;
                        border: 3px solid var(--app-200);
                        padding-bottom: 0;

                        /* Standard Shadow */
                        box-shadow: 0 -4px 20px rgba(0,0,0,0.3); 

                        /* Unified Desktop Animation */
                        transform: scale(0.95);
                        opacity: 0;
                        transition: var(--trans-scale-enter);
                    }

                    :host([open]) .modal, 
                    :host([type="alert"][open]) .modal {
                        transform: scale(1);
                        opacity: 1;
                    }

                    /* Desktop Closing State */
                    :host(.closing) .modal,
                    :host([type="alert"].closing) .modal {
                        transform: scale(0.95);
                        opacity: 0;
                        transition: var(--trans-scale-exit);
                        /* Ensure height doesn't animate */
                        height: auto !important;
                    }

                    .modal-handle-area {
                        display: none;
                    }

                    .modal-body {
                        padding-top: 0;
                    }

                    .modal-header {
                        box-shadow: none;
                    }

                    .modal-footer {
                        padding-inline: 20px;
                        padding-bottom: 20px;
                    }
                }
            </style>
            
            <div class="modal-outer">
                <div class="modal">
                    <div class="modal-handle-area" id="drag-handle">
                        <div class="modal-handle"></div>
                    </div>

                    <div class="modal-header">
                        <slot name="header-left"></slot>
                        <slot name="header-title"></slot>
                        <slot name="header-right"></slot>
                    </div>
                    
                    <div class="modal-body">
                        <slot></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        `;

        this.modal = this.shadowRoot.querySelector(".modal");
        this.modalOuter = this.shadowRoot.querySelector(".modal-outer");
        this.handleArea = this.shadowRoot.querySelector("#drag-handle");

        this.modalOuter.addEventListener("click", this.onOutsideClick);
        this.handleArea.addEventListener("mousedown", this.startDrag);
        this.handleArea.addEventListener("touchstart", this.startDrag, { passive: false });

        if (this.hasAttribute("width")) {
            this.modal.style.width = this.getAttribute("width");
        }
        if (this.hasAttribute("height")) {
            this.modal.style.height = this.getAttribute("height");
        }
    }

    setupResultListeners() {
        window.addEventListener("mousemove", this.handleDrag);
        window.addEventListener("touchmove", this.handleDrag, { passive: false });
        window.addEventListener("mouseup", this.stopDrag);
        window.addEventListener("touchend", this.stopDrag);
    }

    disconnectedCallback() {
        window.removeEventListener("mousemove", this.handleDrag);
        window.removeEventListener("touchmove", this.handleDrag);
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("touchend", this.stopDrag);
    }

    onOutsideClick(e) {
        if (e.target === this.modalOuter) {
            this.close();
        }
    }

    startDrag(e) {
        if (window.innerWidth > 768) return;
        if (this.getAttribute("type") === "alert") return;

        this.isDragging = true;
        const currentY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        this.sy = currentY;
        this.y = currentY;
        this.t = Date.now();
        this.startHeight = this.modal.offsetHeight;

        this.modal.style.transition = "none";
        document.body.style.cursor = "ns-resize";
    }

    handleDrag(e) {
        if (!this.isDragging) return;
        if (e.type.startsWith('touch')) e.preventDefault();

        const currentY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        const currentTime = Date.now();

        const dt = currentTime - this.t;
        if (dt > 0) {
            this.vel = (this.y - currentY) / dt;
        }
        this.y = currentY;
        this.t = currentTime;

        const deltaY = this.sy - currentY;
        let newHeight = this.startHeight + deltaY;

        const minHeight = 150;
        const maxHeight = window.innerHeight * 0.95;

        if (newHeight > maxHeight) {
            newHeight = maxHeight + (newHeight - maxHeight) * 0.2;
        }

        this.modal.style.height = `${newHeight}px`;
    }

    stopDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;

        this.modal.style.transition = "height 0.4s cubic-bezier(0.38, 1.21, 0.22, 1), transform 0.4s cubic-bezier(0.38, 1.21, 0.22, 1)";
        document.body.style.cursor = "";

        const currentHeight = this.modal.offsetHeight;
        const threshold = window.innerHeight * 0.3;

        const closeThresholdHeight = 200;

        if (this.vel < -0.5 || currentHeight < closeThresholdHeight) {
            this.close();
        } else if (this.vel > 0.5) {
            this.modal.style.height = "90%";
        } else {
            if (currentHeight > window.innerHeight * 0.5) {
                this.modal.style.height = "90%";
            } else {
                this.close();
            }
        }

        this.vel = 0;
    }

    open() {
        this._returnValue = ""; // Matching native dialog behavior
        if (!this.hasAttribute("open")) {
            this.setAttribute("open", "");
        }
        haptic();

        if (window.innerWidth <= 768 && this.getAttribute("type") !== "alert") {
            this.modal.style.height = "90%";
            this.modal.style.transform = "translateY(0)";
        } else {
            this.modal.style.height = this.getAttribute("height") || "auto";
            this.modal.style.transform = "";
        }
    }

    close(result) {
        if (result !== undefined) {
            this.returnValue = result;
        }

        this.classList.add('closing');

        if (this.modal) {
            this.modal.style.transform = "";
            this.modal.style.transition = "";
        }

        setTimeout(() => {
            const wasOpen = this.hasAttribute("open");
            this.removeAttribute("open");
            this.classList.remove('closing');

            if (this.modal) {
                this.modal.style.height = "";
                this.modal.style.transform = "";
                this.modal.style.transition = "";
            }

            if (wasOpen) {
                this.dispatchEvent(new CustomEvent("close", {
                    detail: { returnValue: this.returnValue },
                    bubbles: true,
                    composed: true
                }));
            }
        }, 200);
    }
}

customElements.define("eui-modal", EUIModal);
