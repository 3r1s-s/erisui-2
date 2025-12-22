var S = Object.defineProperty;
var M = (o, t, e) => t in o ? S(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var v = (o, t, e) => M(o, typeof t != "symbol" ? t + "" : t, e);
class z extends HTMLElement {
  static get observedAttributes() {
    return ["size", "border-radius", "name", "color"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
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
    this.avatar = this.shadowRoot.querySelector(".avatar"), this.initials = this.shadowRoot.querySelector("#initials");
    const t = this.shadowRoot.querySelector("slot"), e = t && t.assignedNodes().length > 0;
    if (e) {
      const i = t.assignedNodes()[0];
      i && i.tagName === "IMG" && (this.initials.style.display = "none", this.avatar.style.backgroundColor = "transparent");
    } else
      this.hasAttribute("color") && (this.avatar.style.backgroundColor = this.getAttribute("color"));
    if (this.hasAttribute("color") && (this.avatar.style.backgroundColor = this.getAttribute("color")), this.hasAttribute("size")) {
      const i = this.getAttribute("size");
      this.avatar.style.width = i + "px", this.avatar.style.height = i + "px", this.initials.style.fontSize = i / 2 + "px";
    }
    if (this.hasAttribute("border-radius") && (this.avatar.style.borderRadius = this.getAttribute("border-radius") + "px"), this.hasAttribute("name") && (this.avatar.title = this.getAttribute("name")), !e && this.hasAttribute("name")) {
      const n = this.getAttribute("name").trim().split(/\s+/);
      let s = "";
      n.length === 1 ? s = n[0][0] || "" : s = (n[0][0] || "") + (n[n.length - 1][0] || ""), this.initials.textContent = s.toUpperCase();
    }
  }
}
customElements.define("eui-avatar", z);
const u = /* @__PURE__ */ (() => {
  let o = {};
  return {
    register(t, e) {
      o[t] = e;
    },
    get(t) {
      return o[t] || "";
    }
  };
})();
u.register("menu", '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"></path></svg>');
u.register("home", '<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5258 0.204649C11.2291 -0.0682165 10.7709 -0.0682161 10.4742 0.204649L0.249923 9.68588C-0.266994 10.1612 0.0714693 11.0197 0.775759 11.0197L3.48971 11.0197V18.6923C3.48971 19.542 4.18295 20.2308 5.03811 20.2308H16.9619C17.8171 20.2308 18.5103 19.542 18.5103 18.6923V11.0197L21.2242 11.0197C21.9285 11.0197 22.267 10.1612 21.7501 9.68588L11.5258 0.204649Z" fill="currentColor"/></svg>');
u.register("kit", '<svg width="26" height="28" viewBox="0 0 26 28" xmlns="http://www.w3.org/2000/svg"><path d="m13.118 14.831c0.433 0 1.257-0.024 1.795-0.344l9.151-4.057c0.869-0.59 1.051-1.255 1.067-1.773 0.02-0.662-0.313-1.634-1.181-2.15l-8.515-3.921c-0.537-0.309-2.096-0.552-2.529-0.552-0.444 0-1.958 0.42-2.496 0.73l-8.643 4.034c-0.85 0.602-1.022 1.284-0.951 1.942 0.098 0.887 0.206 0.857 0.889 1.503l9.577 4.212c0.537 0.32 1.391 0.376 1.836 0.376zm-0.12 5.467c0.403 0 1.443-0.068 1.928-0.345l8.858-3.991c0.497-0.3 1.448-1.117 1.382-1.952-0.091-1.138-0.598-1.7-0.948-1.906l-9.22 3.888c-0.454 0.261-1.417 0.478-1.916 0.478-0.542 0-1.539-0.228-1.766-0.362l-9.395-4.012c-0.462 0.022-1.174 0.911-1.201 1.642-0.03 0.761 0.7 1.62 1.135 1.839l9.408 4.384c0.485 0.278 1.322 0.337 1.735 0.337zm0.09 5.344c0.403 0 1.296-0.053 1.781-0.342l9.147-4.299c0.485-0.289 1.129-0.789 1.053-1.879-0.056-0.794-0.071-1.123-0.918-1.765l-9.203 4.113c-0.228 0.134-0.948 0.39-1.853 0.39-0.939 0-1.603-0.224-1.831-0.359l-9.451-4.017c-0.979 0.247-1.005 1.45-1.005 1.947 0 0.455 0.403 1.279 0.9 1.568l9.465 4.262c0.486 0.29 1.502 0.381 1.915 0.381z" fill="currentColor"></path></svg>');
u.register("settings", '<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.644169 15.2044C0.751639 15.4175 0.866389 15.627 0.988219 15.8323C1.34503 16.445 1.76284 17.0223 2.23048 17.545C2.3967 17.7307 2.65856 17.7968 2.89375 17.7126L5.25826 16.8621C5.96645 16.608 6.74841 17.07 6.87902 17.8018L7.32018 20.2764C7.36418 20.5227 7.55119 20.7167 7.79454 20.7688C8.86201 20.9976 9.95753 21.057 11.0418 20.9452C11.427 20.9061 11.8095 20.8457 12.1863 20.7643C12.375 20.7232 12.5303 20.5969 12.6121 20.4275C12.6441 20.37 12.6671 20.3068 12.6794 20.2397L13.132 17.7739C13.1978 17.4162 13.4191 17.1252 13.7102 16.9498C13.7478 16.9275 13.7867 16.9072 13.8264 16.8889C14.1041 16.7654 14.426 16.7408 14.7301 16.8496L17.0889 17.6938C17.2068 17.7362 17.3318 17.7406 17.4482 17.7107C17.5805 17.6872 17.7044 17.6208 17.7983 17.5172C18.2857 16.9783 18.7189 16.3833 19.0875 15.7497C19.4503 15.1137 19.748 14.4403 19.9703 13.7471C20.0128 13.6142 20.0083 13.4742 19.9629 13.3481C19.9307 13.2315 19.8646 13.1245 19.7685 13.043L17.8596 11.4179C17.6114 11.2067 17.4714 10.912 17.4409 10.6065C17.4371 10.563 17.4355 10.5194 17.4361 10.4758C17.444 10.1379 17.5847 9.80337 17.8591 9.56905L19.7638 7.94348C19.8146 7.90007 19.857 7.84958 19.8904 7.7944C19.9978 7.63842 20.0299 7.43844 19.9706 7.25291C19.8534 6.88733 19.7151 6.52704 19.5572 6.17466C19.1114 5.17572 18.5115 4.2528 17.7787 3.43934C17.612 3.25429 17.3509 3.18886 17.1161 3.27382L14.7569 4.12827C14.0592 4.38082 13.2679 3.93321 13.1344 3.19155L12.6871 0.714256C12.6423 0.468053 12.4542 0.273849 12.2106 0.22246C11.5182 0.0764882 10.803 0.00250031 10.088 0.000608251C9.88769 -0.0015584 9.68739 0.002064 9.48735 0.0114648C8.92415 0.0369819 8.36389 0.107332 7.81778 0.222459C7.78135 0.230146 7.74615 0.241028 7.71249 0.2548C7.5098 0.328781 7.35888 0.505679 7.31996 0.723547L6.8788 3.19817C6.81394 3.56157 6.58834 3.85866 6.29097 4.03446C5.98991 4.2061 5.61923 4.25412 5.27153 4.12827L2.91237 3.27382C2.70694 3.1995 2.48138 3.24016 2.31657 3.37545C2.2857 3.39886 2.25676 3.42543 2.23026 3.45505C1.81793 3.91588 1.44433 4.4192 1.11714 4.95183C1.05788 5.04799 1.00019 5.14513 0.944072 5.24319C0.878302 5.35619 0.814661 5.4704 0.753186 5.58577C0.464267 6.12611 0.222113 6.69081 0.0338354 7.26739C0.0213426 7.30567 0.0127871 7.34455 0.00802709 7.38352C-0.0257478 7.59364 0.0518458 7.809 0.218337 7.94974L2.13633 9.56992C2.41146 9.80242 2.55518 10.1364 2.56469 10.4743C2.56917 10.8294 2.42529 11.1857 2.13611 11.4301L0.218115 13.0503C0.0484589 13.1937 -0.0289685 13.4145 0.00982709 13.6284C0.0147983 13.6634 0.0228404 13.6982 0.0340542 13.7326C0.198098 14.235 0.403035 14.7283 0.644169 15.2044ZM10 14.5C12.2091 14.5 14 12.7091 14 10.5C14 8.29086 12.2091 6.5 10 6.5C7.79086 6.5 6 8.29086 6 10.5C6 12.7091 7.79086 14.5 10 14.5Z" fill="currentColor"></path></svg>');
u.register("home", '<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5258 0.204649C11.2291 -0.0682165 10.7709 -0.0682161 10.4742 0.204649L0.249923 9.68588C-0.266994 10.1612 0.0714693 11.0197 0.775759 11.0197L3.48971 11.0197V18.6923C3.48971 19.542 4.18295 20.2308 5.03811 20.2308H16.9619C17.8171 20.2308 18.5103 19.542 18.5103 18.6923V11.0197L21.2242 11.0197C21.9285 11.0197 22.267 10.1612 21.7501 9.68588L11.5258 0.204649Z" fill="currentColor"/></svg>');
u.register("copy", '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11C2 11.7956 2.31607 12.5587 2.87868 13.1213C3.44129 13.6839 4.20435 14 5 14H11C11.7956 14 12.5587 13.6839 13.1213 13.1213C13.6839 12.5587 14 11.7956 14 11V8H11.75C10.7554 8 9.80161 7.60491 9.09835 6.90165C8.39509 6.19839 8 5.24456 8 4.25V2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V11Z" fill="currentColor"/><path d="M13.7975 6.49965C13.6881 6.25457 13.5357 6.03105 13.3475 5.83965L10.16 2.65965C9.96921 2.4688 9.74565 2.31384 9.5 2.20215V4.24965C9.5 4.54512 9.5582 4.8377 9.67127 5.11069C9.78434 5.38367 9.95008 5.63171 10.159 5.84064C10.3679 6.04957 10.616 6.2153 10.889 6.32838C11.1619 6.44145 11.4545 6.49965 11.75 6.49965H13.7975Z" fill="currentColor"/></svg>');
u.register("arrow", '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9.3 5.3a1 1 0 0 0 0 1.4l5.29 5.3-5.3 5.3a1 1 0 1 0 1.42 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.42 0Z"></path></svg>');
u.register("back", '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg)"><path d="M9.3 5.3a1 1 0 0 0 0 1.4l5.29 5.3-5.3 5.3a1 1 0 1 0 1.42 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.42 0Z"></path></svg>');
u.register("check", '<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.86368 9.12226C3.82463 9.16131 3.76131 9.16131 3.72226 9.12226L0.146522 5.54652C-0.0487403 5.35126 -0.0487401 5.03468 0.146522 4.83942L0.839416 4.14652C1.03468 3.95126 1.35126 3.95126 1.54652 4.14652L3.72226 6.32226C3.76131 6.36131 3.82463 6.36131 3.86368 6.32226L10.0394 0.146522C10.2347 -0.0487398 10.5513 -0.0487399 10.7465 0.146522L11.4394 0.839416C11.6347 1.03468 11.6347 1.35126 11.4394 1.54652L3.86368 9.12226Z" fill="currentColor"/></svg>');
class T extends HTMLElement {
  static get observedAttributes() {
    return ["name", "width", "height"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const t = this.getAttribute("name"), e = u.get(t);
    if (!e) {
      this.shadowRoot.innerHTML = '<span style="color:red;">?</span>';
      return;
    }
    const i = document.createElement("template");
    i.innerHTML = e.trim();
    const n = i.content.cloneNode(!0), s = n.firstElementChild;
    if (s && s.style) {
      const r = this.getAttribute("width"), c = this.getAttribute("height");
      r && s.setAttribute("width", r), c && s.setAttribute("height", c), s.style.display = "block";
    }
    this.shadowRoot.innerHTML = "", this.shadowRoot.appendChild(n);
  }
}
customElements.define("eui-icon", T);
class $ extends HTMLElement {
  static get observedAttributes() {
    return ["label", "value", "id", "type", "filled"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
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
    this.form = this.shadowRoot.querySelector(".form"), this.inputEl = this.shadowRoot.querySelector(".form-input"), this.labelEl = this.shadowRoot.querySelector("label"), this.hasAttribute("value") && (this.inputEl.value = this.getAttribute("value")), this.hasAttribute("id") && (this.inputEl.id = this.getAttribute("id")), this.hasAttribute("label") && (this.labelEl.textContent = this.getAttribute("label")), this.hasAttribute("type") && (this.inputEl.type = this.getAttribute("type")), this.hasAttribute("filled") && this.form.classList.add("filled"), this.inputEl.addEventListener("input", () => {
      this.setAttribute("value", this.inputEl.value);
    });
  }
  attributeChangedCallback(t, e, i) {
    if (!(!this.inputEl || !this.labelEl))
      switch (t) {
        case "value":
          this.inputEl.value !== i && (this.inputEl.value = i);
          break;
        case "id":
          this.inputEl.id = i;
          break;
        case "label":
          this.labelEl.textContent = i;
          break;
      }
  }
  get value() {
    return this.inputEl.value;
  }
  set value(t) {
    this.setAttribute("value", t);
  }
}
customElements.define("eui-input", $);
class R extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                .loader {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    position: relative;
                }

                .loader-icon {
                    stroke: var(--app-accent, #2196F3);
                    fill: none;
                    stroke-width: 2px;
                    stroke-linecap: round;
                    transform-origin: 50% 50%;
                    transform: rotate(-90deg);
                    transition: all 0.2s ease-in-out 0s;
                    animation: 2s linear 0s infinite normal none running loader-spin;
                }

                .loader-icon {
                    stroke: var(--app-text, #F2F3F6);
                }

                @keyframes loader-spin {
                    0% {
                        stroke-dasharray: 0.01px, 43.97px;
                        transform: rotate(0deg)
                    }

                    50% {
                        stroke-dasharray: 21.99px, 21.99px;
                        transform: rotate(450deg)
                    }

                    100% {
                        stroke-dasharray: 0.01px, 43.97px;
                        transform: rotate(1080deg)
                    }
                }
            </style>

            <span class="loader animate">
                <svg viewBox="0 0 16 16"><circle class="loader-icon" cx="8px" cy="8px" r="7px"></circle></svg>
            </span>
        `;
  }
}
customElements.define("eui-loader", R);
class H extends HTMLElement {
  static get observedAttributes() {
    return ["value", "intermediate", "id"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                .progressbar {
                    width: 100%;
                    height: 5px;
                    overflow: hidden;
                    position: relative;
                    background: var(--app-300, #333);
                    border-radius: 4px;
                }

                .progress {
                    display: block;
                    height: 100%;
                    background: var(--app-accent, #2196F3);
                    border-radius: 4px;
                    transition: width 0.3s ease-in-out;
                }

                .progress.intermediate {
                    height: 100%;
                    transform-origin: 0% 50%;
                    transition-property: background;
                    animation: progressbar-indeterminate 1s infinite linear;
                }

                @keyframes progressbar-indeterminate {
                    0% {
                        transform: translateX(0) scaleX(0)
                    }

                    40% {
                        transform: translateX(0) scaleX(0.5)
                    }

                    100% {
                        transform: translateX(100%) scaleX(0.3)
                    }
                }
            </style>

            <div class="progressbar">
                <span class="progress"></span>
            </div>
        `;
  }
  set value(t) {
    this.setAttribute("value", t);
  }
  attributeChangedCallback() {
    this.connectedCallback();
  }
  connectedCallback() {
    const t = this.shadowRoot.querySelector(".progress");
    this.hasAttribute("id") && (this.progress.id = this.getAttribute("id")), this.hasAttribute("intermediate") && t.classList.add("intermediate"), this.hasAttribute("value") && (t.style.width = this.getAttribute("value") + "%");
  }
}
customElements.define("eui-progressbar", H);
const x = {
  is: {
    iPhone: /iPhone/.test(navigator.userAgent),
    iPad: /iPad/.test(navigator.userAgent),
    iOS: /iPhone|iPad|iPod/.test(navigator.userAgent),
    android: /Android/.test(navigator.userAgent),
    mobile: /Mobi|Android/i.test(navigator.userAgent)
    // matches most mobile browsers
  },
  prefers: {
    language: navigator.language || navigator.userLanguage,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    reducedTransparency: window.matchMedia("(prefers-reduced-transparency: reduce)").matches
  },
  supports: {
    share: typeof navigator.share == "function",
    directDownload: "download" in document.createElement("a"),
    haptics: "vibrate" in navigator || "Vibrate" in window || typeof window.navigator.vibrate == "function"
  },
  userAgent: navigator.userAgent
}, J = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  device: x
}, Symbol.toStringTag, { value: "Module" }));
function _() {
  try {
    const o = document.createElement("label");
    o.ariaHidden = "true", o.style.display = "none";
    const t = document.createElement("input");
    t.type = "checkbox", t.setAttribute("switch", ""), o.appendChild(t), document.head.appendChild(o), o.click(), document.head.removeChild(o);
  } catch {
  }
}
function w(o) {
  x.supports.haptics ? navigator.vibrate(o || 50) : x.is.iPhone && _();
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  haptic: w
}, Symbol.toStringTag, { value: "Module" })), y = (() => {
  let o = {}, t;
  try {
    o = JSON.parse(localStorage.getItem(t) || "{}");
  } catch (e) {
    console.error(e);
  }
  return {
    get(e) {
      return o[e];
    },
    set(e, i) {
      o[e] = i, localStorage.setItem(t, JSON.stringify(o));
    },
    delete(e) {
      delete o[e], localStorage.setItem(t, JSON.stringify(o));
    },
    all() {
      return o;
    },
    clear() {
      o = {}, localStorage.setItem(t, JSON.stringify(o));
    },
    name(e) {
      t = e;
      try {
        o = JSON.parse(localStorage.getItem(t) || "{}");
      } catch (i) {
        console.error(i);
      }
    },
    settings: {
      get(e) {
        return o && o.settings && o.settings[e];
      },
      set(e, i) {
        o.settings || (o.settings = {}), o.settings[e] = i, localStorage.setItem(t, JSON.stringify(o));
      },
      delete(e) {
        o.settings && (delete o.settings[e], localStorage.setItem(t, JSON.stringify(o)));
      },
      all() {
        return o.settings || {};
      },
      clear() {
        o.settings && (o.settings = {}, localStorage.setItem(t, JSON.stringify(o)));
      }
    }
  };
})(), k = y.settings, Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  settings: k,
  storage: y
}, Symbol.toStringTag, { value: "Module" }));
class F extends HTMLElement {
  static get observedAttributes() {
    return ["selected"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                .switch {
                    background-color: var(--app-200);
                    border-radius: 16px;

                    box-shadow: inset 0px 0px 0px 2px var(--app-400);
                    width: 52px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    position: relative;
                }

                .switch.selected {
                    background-color: #B8C4FF;
                    box-shadow: none;
                }

                .handle {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: var(--app-900);
                    margin-inline-start: 0;
                    margin-inline-end: calc(52px - 32px);

                    transition: margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    width 250ms cubic-bezier(0.2, 0, 0, 1),
                    height 250ms cubic-bezier(0.2, 0, 0, 1);

                    pointer-events: none;
                    user-select: none;
                }

                .switch.selected .handle {
                    background-color: #5F7AFF;
                    margin-inline-start: calc(52px - 32px);
                    margin-inline-end: 0;
                    width: 24px;
                    height: 24px;
                }

                .switch:active .handle {
                    width: 28px;
                    height: 28px;
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
            </style>

            <div class="switch">
                <input type="checkbox" role="switch">
                <span class="handle"></span>
            </div>
        `;
  }
  connectedCallback() {
    this.inputEl = this.shadowRoot.querySelector("input"), this.switchEl = this.shadowRoot.querySelector(".switch"), this.updateFromAttribute(), this.switchEl.addEventListener("click", () => this.toggle());
  }
  toggle() {
    this.selected = !this.selected, w();
  }
  updateFromAttribute() {
    const t = this.hasAttribute("selected");
    this.inputEl.checked = t, this.switchEl.classList.toggle("selected", t);
  }
  attributeChangedCallback(t, e, i) {
    t === "selected" && this.inputEl && this.updateFromAttribute();
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(t) {
    t ? this.setAttribute("selected", "") : this.removeAttribute("selected");
  }
}
customElements.define("eui-switch", F);
class I extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    border-radius: 8px;
                    border: 2px solid var(--app-400);
                    font-weight: 500;
                    font-size: 1rem;
                    position: relative;
                    color: var(--app-text);
                    overflow: hidden;
                    z-index: 1;

                    user-select: none;
                    -webkit-user-select: none;
                    -webkit-user-drag: none;
                    -webkit-user-modify: none;
                    -webkit-highlight: none;
                    -webkit-tap-highlight-color: transparent;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    filter: blur(4px);
                    opacity: 0.2;
                    animation: ripple 600ms linear;
                    background-color: var(--app-400); 
                    pointer-events: none;
                    z-index: -1;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                        filter: blur(10px);
                    }
                }
            </style>
            <slot></slot>
        `, this.addEventListener("pointerdown", (t) => {
      const e = document.createElement("span"), i = t.currentTarget, n = Math.max(i.offsetWidth, i.offsetHeight);
      e.classList.add("ripple"), e.style.left = t.clientX - i.getBoundingClientRect().left - n / 2 + "px", e.style.top = t.clientY - i.getBoundingClientRect().top - n / 2 + "px", e.style.width = n + "px", e.style.height = n + "px", this.shadowRoot.appendChild(e), setTimeout(() => {
        e.remove();
      }, 600);
    });
  }
}
customElements.define("eui-chip", I);
const m = "", C = (() => {
  const o = [];
  function t(a, l) {
    const h = [], g = a.replace(/:([^/]+)/g, (b, f) => (h.push(f), "([^/]+)")).replace(/\//g, "\\/"), p = new RegExp(`^${m}${g}$`);
    o.push({ regex: p, paramNames: h, renderFn: l });
  }
  function e(a) {
    for (const { regex: l, paramNames: h, renderFn: g } of o) {
      const p = a.match(l);
      if (p) {
        const b = {};
        return h.forEach((f, L) => {
          b[f] = decodeURIComponent(p[L + 1]);
        }), { renderFn: g, params: b };
      }
    }
    return null;
  }
  function i(a, l = !0) {
    a.startsWith(m) || (a = m + (a.startsWith("/") ? "" : "/") + a);
    const h = a.split(/[?#]/)[0];
    if (h === window.location.pathname && a.includes("#")) {
      l && history.pushState({}, "", a);
      const p = "#" + a.split("#")[1];
      n(p);
      return;
    }
    const g = e(h);
    if (g)
      if (l && history.pushState({}, "", a), g.renderFn(g.params), window.dispatchEvent(new CustomEvent("route-changed", { detail: { path: a } })), a.includes("#")) {
        const p = "#" + a.split("#")[1];
        setTimeout(() => n(p), 100);
      } else {
        const p = document.getElementById("main");
        p && p.scrollTo(0, 0);
      }
    else s ? (l && history.pushState({}, "", a), s()) : console.warn(`No route found for ${h}`);
  }
  function n(a) {
    if (a)
      try {
        const l = document.querySelector(a);
        l && l.scrollIntoView({ behavior: "smooth" });
      } catch {
        console.warn("Invalid hash:", a);
      }
  }
  let s = null;
  function r(a) {
    s = a;
  }
  function c() {
    history.back();
  }
  function d() {
    return window.location.pathname.replace(m, "") || "/";
  }
  return window.addEventListener("popstate", () => {
    const a = window.location.pathname + window.location.search + window.location.hash;
    i(a, !1);
  }), window.addEventListener("click", (a) => {
    if (a.button !== 0 || a.metaKey || a.altKey || a.ctrlKey || a.shiftKey) return;
    const l = a.target.closest("a");
    if (!l || l.hasAttribute("download") || l.getAttribute("target") === "_blank") return;
    const h = l.getAttribute("href");
    if (!(!h || h.startsWith("http") && !h.startsWith(window.location.origin))) {
      if (a.preventDefault(), h.startsWith("#")) {
        history.pushState({}, "", h), n(h);
        return;
      }
      i(h);
    }
  }), { add: t, navigate: i, back: c, location: d, setNotFound: r };
})();
async function G(o) {
  try {
    const t = document.getElementById("main");
    t.classList.add("fade-out"), await new Promise((i) => setTimeout(i, 200));
    const e = await fetch(`/src/pages/${o}.html`).then((i) => i.text());
    t.innerHTML = e, t.classList.remove("fade-out"), t.classList.add("fade-in"), window.location.hash ? setTimeout(() => {
      try {
        const i = document.querySelector(window.location.hash);
        i && i.scrollIntoView({ behavior: "smooth" });
      } catch {
      }
    }, 100) : t && t.scrollTo(0, 0), setTimeout(() => {
      t.classList.remove("fade-in");
    }, 200);
  } catch (t) {
    console.error("Page load failed:", t);
  }
}
class j extends HTMLElement {
  constructor() {
    super();
    v(this, "handleClick", () => {
      const e = this.getAttribute("path");
      e && C.navigate(e);
    });
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["path", "icon", "label", "badge", "active", "avatar-src", "avatar-name"];
  }
  connectedCallback() {
    this.hasRendered || (this.render(), this.setupEventListeners(), this.hasRendered = !0), this.updateContent(), this.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
  attributeChangedCallback(e, i, n) {
    if (i !== n && this.hasRendered) {
      if (e === "active")
        return;
      this.updateContent();
    }
  }
  setupEventListeners() {
    this.addEventListener("pointerdown", (e) => {
      const i = document.createElement("span"), n = e.currentTarget, s = n.getBoundingClientRect(), r = Math.max(n.offsetWidth, n.offsetHeight), c = r / 2;
      i.classList.add("ripple"), i.style.width = `${r}px`, i.style.height = `${r}px`, i.style.left = `${e.clientX - s.left - c}px`, i.style.top = `${e.clientY - s.top - c}px`, this.shadowRoot.appendChild(i), i.addEventListener("animationend", () => {
        i.remove();
      });
    });
  }
  updateContent() {
    const e = this.getAttribute("icon"), i = this.getAttribute("avatar-src"), n = this.getAttribute("avatar-name"), s = this.getAttribute("label") || "", r = this.getAttribute("badge"), c = this.shadowRoot.querySelector(".badge");
    if (r)
      if (c)
        c.textContent = r;
      else {
        const l = document.createElement("span");
        l.className = "badge", l.textContent = r, this.shadowRoot.appendChild(l);
      }
    else c && c.remove();
    const d = this.shadowRoot.querySelector("slot[name='icon']");
    if (d)
      if (i || n) {
        let l = '<eui-avatar size="24"';
        n && (l += ` name="${n}"`), l += ">", i && (l += `<img src="${i}" alt="${n || "Avatar"}" />`), l += "</eui-avatar>", d.innerHTML = l;
      } else {
        const l = d.querySelector("eui-icon");
        e && l ? l.getAttribute("name") !== e && l.setAttribute("name", e) : e ? d.innerHTML = `<eui-icon width="24" height="24" name="${e}"></eui-icon>` : d.innerHTML = "";
      }
    const a = this.shadowRoot.querySelector(".label");
    a && (a.textContent = s);
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: relative;
                overflow: hidden;
                z-index: 1;
                display: flex;
                align-items: center;
                height: 50px;
                width: 100%;
                cursor: pointer;
                border-radius: 100px;
                justify-content: flex-start;
                padding: 0 1rem;
                box-sizing: border-box;
                transition: background-color 0.2s cubic-bezier(.4, 0, .2, 1), transform 0.2s cubic-bezier(.4, 0, .2, 1);
                user-select: none;
                -webkit-user-select: none;
                color: var(--app-text);
            }

            :host(:hover) {
                background-color: var(--app-300);
            }

            :host(:focus-visible) {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            :host([active]) {
                background-color: color-mix(in srgb, var(--app-link) 25%, transparent 100%);
                color: var(--app-link);
            }
            
            :host([active]) .label {
                 font-weight: 600;
            }

            .icon-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                flex-shrink: 0;
                border-radius: 100px;
            }

            :host([active]) .icon-container eui-avatar {
                outline: 2px solid var(--app-link);
                outline-offset: 1px;
                border-radius: 50%;
            }

            .label {
                opacity: var(--nav-item-label-opacity, 0);
                margin-left: 1rem;
                display: block;
                transition: opacity 0.1s ease;
                white-space: nowrap;
            }

            .badge {
                position: absolute;
                top: 4px;
                left: calc(32px + 2px);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--app-red);
                color: var(--app-white);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 600;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                opacity: 0.2;
                animation: ripple 600ms linear forwards;
                background-color: currentColor; 
                pointer-events: none;
                z-index: -1;
                will-change: transform, opacity;
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        </style>

        <div class="icon-container">
            <slot name="icon">
                 <eui-icon width="24" height="24" name=""></eui-icon>
            </slot>
        </div>
        <span class="label"></span>
        `;
  }
}
customElements.define("eui-nav-item", j);
class q extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.updateActiveState(), window.addEventListener("popstate", () => this.updateActiveState()), window.addEventListener("route-changed", () => this.updateActiveState()), window.addEventListener("toggle-nav", () => this.classList.toggle("expanded"));
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: fixed;
                top: var(--titlebar-height, 65px);
                left: 0;
                height: calc(100% - var(--titlebar-height, 65px));
                z-index: 100;

                width: var(--nav-width, 75px);
                transition: width 0.2s cubic-bezier(0.2, 0, 0, 1);
            }

            :host(.expanded) {
                width: var(--nav-expanded-width, 250px);
                --nav-item-label-opacity: 1;
            }

            .app-nav-container {
                width: 100%;
                min-width: var(--nav-width, 75px);
                height: 100%;
                box-sizing: border-box;
                background-color: var(--app-200);
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
            }

            .nav-items {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.5rem;
                box-sizing: border-box;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .menu-button {
                border: none;
                background-color: transparent;
                cursor: pointer;
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border-radius: 50%;
                color: inherit;
            }

            .menu-button:hover {
                background-color: var(--app-300);
                box-shadow: 0 0 2px 0 #00000011;
            }

            .menu-button:active {
                transform: scale(0.95);
            }

            .menu-button:focus-visible {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            #skip_navigation_link {
                position: fixed;
                top: -100px;
                left: -100px;
                z-index: 1001;
                width: 1px;
                height: 1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
                padding: 0;
                margin: 0;
            }

            #skip_navigation_link:focus {
                top: 0;
                left: 0;
                overflow: visible;
                clip: auto;
                border: 1px dotted;
                padding: 4px 8px;
                margin: 4px;
                width: 80px;
                height: auto;
                background-color: var(--app-link);
                color: var(--app-white);
                text-align: center;
            }
        </style>

        <div class="app-nav-container">
            <a href="#content" id="skip_navigation_link">Skip To Content</a>
            <div class="nav-items">
                ${this.navItems.map((t) => {
      var n, s;
      if (t.type === "divider")
        return '<div style="height: 1px; background: var(--app-300); margin: 0.5rem 0;"></div>';
      const e = ((n = t.avatar) == null ? void 0 : n.src) || "", i = ((s = t.avatar) == null ? void 0 : s.name) || "";
      return `<eui-nav-item path="${t.path}" icon="${t.icon}" avatar-src="${e}" avatar-name="${i}" label="${t.label}"></eui-nav-item>`;
    }).join("")}
            </div>
        </div>
        `;
  }
  set navItems(t) {
    this._navItems = t, this.render(), this.updateActiveState();
  }
  get navItems() {
    return this._navItems || [];
  }
  updateActiveState(t) {
    t || (t = C.location()), t.startsWith("/") || (t = "/" + t), this.shadowRoot.querySelectorAll("eui-nav-item").forEach((i) => {
      i.getAttribute("path") === t ? i.setAttribute("active", "") : i.removeAttribute("active");
    });
  }
}
customElements.define("eui-app-nav", q);
class B extends HTMLElement {
  static get observedAttributes() {
    return ["type", "title", "subtitle", "img"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
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
    this.hd = this.shadowRoot.querySelector(".header"), this.hasAttribute("type") && this.hd.classList.add(this.getAttribute("type"));
  }
  attributeChangedCallback(t, e, i) {
    const n = this.shadowRoot.querySelector("h1"), s = this.shadowRoot.querySelector("p"), r = this.shadowRoot.querySelector(".img");
    t === "title" && (n.textContent = i), t === "subtitle" && (s.textContent = i), t === "img" && (r.style.backgroundImage = i ? `url(${i})` : "");
  }
}
customElements.define("eui-header", B);
class N extends HTMLElement {
  static get observedAttributes() {
    return ["selected"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                }

                .checkbox {
                    position: relative;
                    width: 24px;
                    height: 24px;
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
    this.inputEl = this.shadowRoot.querySelector("input"), this.checkEl = this.shadowRoot.querySelector(".checkbox"), this.updateFromAttribute(), this.checkEl.addEventListener("click", () => this.toggle());
  }
  toggle() {
    this.selected = !this.selected, w();
    const t = this.selected, e = this.dataset.setting;
    e && k.set(e, t);
  }
  updateFromAttribute() {
    const t = this.hasAttribute("selected");
    this.inputEl.checked = t, this.checkEl.classList.toggle("selected", t);
  }
  attributeChangedCallback(t, e, i) {
    t === "selected" && this.inputEl && this.updateFromAttribute();
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(t) {
    t ? this.setAttribute("selected", "") : this.removeAttribute("selected");
  }
}
customElements.define("eui-checkbox", N);
class E extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const t = this.getAttribute("href"), e = t ? "a" : "button";
    this.shadowRoot.innerHTML = `
            <style>
                button, a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    font-weight: 600;
                    font-family: inherit;
                    border-radius: 0.6rem;
                    border: none;
                    background: var(--app-300);
                    color: var(--app-text, #FFF);
                    cursor: pointer;
                    box-sizing: border-box;
                    text-decoration: none;

                    width: fit-content;

                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;

                    transition: background 0.2s cubic-bezier(.2,0,0,1);

                    position: relative;
                    overflow: hidden;
                }

                button:hover, a:hover {
                    background: var(--app-400);
                    text-decoration: none;
                }

                .light button, .light a {
                    background: var(--app-500);
                }

                button.filled, a.filled {
                    background: var(--app-accent-100);
                    color: #fff;
                }

                button.filled:hover, a.filled:hover {
                    background: var(--app-accent-50);
                }

                button.outlined, a.outlined {
                    background: transparent;
                    box-shadow: inset 0 0 0 2px var(--app-400);
                    color: var(--app-accent-100);
                }

                button.outlined:hover, a.outlined:hover {
                    background: var(--app-300);
                }

                button.icon, a.icon {
                    padding: 0.5rem;
                    border-radius: 50%;
                }

                button.transparent, a.transparent {
                    background: transparent;
                    color: var(--app-text);
                }

                button.transparent:hover, a.transparent:hover {
                    background: var(--app-300);
                }

                button:disabled, a[disabled] {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                button.link, a.link {
                    text-decoration: none;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    opacity: 0.2;
                    animation: ripple 600ms linear forwards;
                    background-color: currentColor;
                    pointer-events: none;
                    z-index: 10;
                    will-change: transform, opacity;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

            </style>
            <${e}>
                <slot></slot>
            </${e}>
        `;
    const i = this.shadowRoot.querySelector(e);
    t && i.setAttribute("href", t), this.hasAttribute("type") && i.classList.add(this.getAttribute("type")), this.hasAttribute("icon") && i.classList.add("icon"), this.hasAttribute("width") && (i.style.width = this.getAttribute("width") + "px"), this.hasAttribute("height") && (i.style.height = this.getAttribute("height") + "px"), this.hasAttribute("border-radius") && (i.style.borderRadius = this.getAttribute("border-radius") + "px"), i.addEventListener("pointerdown", (n) => {
      const s = document.createElement("span"), r = n.currentTarget, c = r.getBoundingClientRect(), d = Math.max(r.offsetWidth, r.offsetHeight), a = d / 2;
      s.classList.add("ripple"), s.style.width = `${d}px`, s.style.height = `${d}px`, s.style.left = `${n.clientX - c.left - a}px`, s.style.top = `${n.clientY - c.top - a}px`, i.appendChild(s), s.addEventListener("animationend", () => {
        s.remove();
      });
    });
  }
}
v(E, "observedAttributes", ["type", "width", "height", "border-radius", "icon", "link", "href"]);
customElements.define("eui-button", E);
class O extends HTMLElement {
  static get observedAttributes() {
    return ["type", "anchor"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render(), this.hd = this.shadowRoot.querySelector(".hd"), this.hasAttribute("type") && this.hd.classList.add(this.getAttribute("type"));
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
customElements.define("eui-heading", O);
function P(o) {
  const i = Date.now() - o, n = Math.floor(i / 1e3), s = Math.floor(n / 60), r = Math.floor(s / 60), c = Math.floor(r / 24), d = Math.floor(c / 30), a = Math.floor(d / 12);
  return a > 0 ? `${a}y` : d > 0 ? `${d}mo` : c > 0 ? `${c}d` : r > 0 ? `${r}h` : s > 0 ? `${s}m` : `${n}s`;
}
function V(o) {
  const i = Date.now() - o, n = Math.floor(i / 1e3), s = Math.floor(n / 60), r = Math.floor(s / 60), c = Math.floor(r / 24), d = Math.floor(c / 30), a = Math.floor(d / 12);
  return a > 0 ? `${a} year${a > 1 ? "s" : ""} ago` : d > 0 ? `${d} month${d > 1 ? "s" : ""} ago` : c > 0 ? `${c} day${c > 1 ? "s" : ""} ago` : r > 0 ? `${r} hour${r > 1 ? "s" : ""} ago` : s > 0 ? `${s} minute${s > 1 ? "s" : ""} ago` : `${n} second${n > 1 ? "s" : ""} ago`;
}
function D(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`/g, "&#96;").replace(/'/g, "&#39;");
}
function A(o) {
  const t = document.createElement("input");
  t.value = o, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
}
const Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copystr: A,
  joinedAgo: V,
  sanitize: D,
  timeAgo: P
}, Symbol.toStringTag, { value: "Module" }));
class U extends HTMLElement {
  static get observedAttributes() {
    return ["copy", "id", "type", "language"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._boundCopy = this._onCopy.bind(this), this._isRendered = !1;
  }
  connectedCallback() {
    this._isRendered || (this.render(), this._isRendered = !0);
  }
  attributeChangedCallback(t, e, i) {
    this._isRendered && e !== i && this.render();
  }
  render() {
    const t = this.hasAttribute("copy"), e = this.getAttribute("language") || "text";
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

            <pre class="${t ? "g" : ""}"><code></code></pre>
        `, this.copyBtn = this.shadowRoot.querySelector(".copy"), this.codeEl = this.shadowRoot.querySelector("code");
    const i = this._getFormattedText();
    this.codeEl.innerHTML = this._highlight(i, e), t ? this.copyBtn.addEventListener("click", this._boundCopy) : this.copyBtn.style.display = "none";
  }
  _getFormattedText() {
    let e = (this.querySelector("code") || this).innerHTML || "";
    e = this._unescapeHtml(e), e = e.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
    const i = e.split(`
`), n = i.filter((r) => r.trim()).map((r) => r.match(/^\s*/)[0].length), s = n.length ? Math.min(...n) : 0;
    return i.map((r) => r.slice(s)).join(`
`);
  }
  _unescapeHtml(t) {
    const e = document.createElement("textarea");
    return e.innerHTML = t, e.value;
  }
  _highlight(t, e) {
    t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const i = {};
    let n = 0;
    function s(r, c) {
      const d = `__TOKEN_${c}_${n++}__`;
      return i[d] = `<span class="token ${c}">${r}</span>`, d;
    }
    return ["javascript", "js", "json", "bash", "sh", "css"].includes(e) ? (t = t.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (r) => s(r, "string")), e === "bash" || e === "sh" ? t = t.replace(/(#.*$)/gm, (r) => s(r, "comment")) : e === "css" ? t = t.replace(/(\/\*[\s\S]*?\*\/)/g, (r) => s(r, "comment")) : t = t.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (r) => s(r, "comment"))) : ["html", "xml"].includes(e) && (t = t.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (r) => s(r, "comment")), t = t.replace(/(&lt;\/?[a-z0-9:-]+)/gi, (r) => s(r, "tag"))), e === "javascript" || e === "js" || e === "json" ? (t = t.replace(/\b(const|let|var|if|else|for|while|return|function|class|import|export|from|default|switch|case|break|continue|new|this|async|await)\b/g, '<span class="token keyword">$1</span>'), t = t.replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>'), t = t.replace(/\b([a-zA-Z0-9_]+)\s*(?=\()/g, '<span class="token function">$1</span>')) : e === "bash" || e === "sh" ? (t = t.replace(/\b(npm|npx|node|git|cd|ls|mkdir|rm|mv|cp|echo|cat|sudo|docker|brew|grep|curl|wget|chmod|chown|touch)\b/g, '<span class="token keyword">$1</span>'), t = t.replace(/\b(install|run|build|start|test|dev|init|clone|pull|push|commit|add|checkout|branch|merge)\b/g, '<span class="token function">$1</span>'), t = t.replace(/(\s-+[a-zA-Z0-9-]+)/g, '<span class="token attr-name">$1</span>'), t = t.replace(/(\$[A-Z0-9_]+)/g, '<span class="token number">$1</span>')) : e === "html" || e === "xml" ? (t = t.replace(/\s([a-z0-9:-]+)=/gi, (r, c) => " " + s(c, "attr-name") + "="), t = t.replace(/(".*?")/g, (r) => s(r, "attr-value")), t = t.replace(/&gt;/g, '<span class="token tag">&gt;</span>')) : e === "css" && (t = t.replace(/([a-z-]+)(?=:)/g, '<span class="token keyword">$1</span>')), Object.keys(i).reverse().forEach((r) => {
      t = t.replace(r, i[r]);
    }), t;
  }
  _onCopy() {
    A(this._getFormattedText());
    const t = this.copyBtn.querySelector("eui-icon");
    if (t) {
      const e = t.getAttribute("name");
      t.setAttribute("name", "check"), setTimeout(() => t.setAttribute("name", e), 2e3);
    }
  }
  disconnectedCallback() {
    this.copyBtn && this.copyBtn.removeEventListener("click", this._boundCopy);
  }
}
customElements.define("eui-code", U);
class Z extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render(), this.setupEventListeners();
  }
  static get observedAttributes() {
    return ["name"];
  }
  attributeChangedCallback(t, e, i) {
    t === "name" && (this.render(), this.setupEventListeners());
  }
  setupEventListeners() {
    const t = this.shadowRoot.querySelector("#nav-toggle");
    t && t.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("toggle-nav"));
    });
  }
  render() {
    const t = this.getAttribute("name") || "Title";
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                height: var(--titlebar-height, 65px);
                background-color: var(--app-200);
                flex-shrink: 0;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 200;
                box-sizing: border-box;
            }

            .titlebar {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
            }

            .left-section {
                display: flex;
                align-items: center;
            }

            .title {
                font-size: 1.25rem;
                font-weight: 400;
                color: var(--app-text);
                margin: 0;
                user-select: none;
            }

            .menu-button {
                border: none;
                background-color: transparent;
                cursor: pointer;
                width: 42px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border-radius: 50%;
                color: inherit;
                padding: 0;
            }

            .menu-button:hover {
                background-color: var(--app-300);
            }

            .menu-button:active {
                transform: scale(0.95);
            }

            .menu-button:focus-visible {
                outline: 2px solid var(--app-link);
                outline-offset: 2px;
            }

            .right-section {
                display: flex;
                align-items: center;
                padding-right: 1rem;
            }

            .nav-section {
                width: var(--nav-width, 75px);

                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>

        <div class="titlebar">
            <div class="left-section">
                <div class="nav-section">
                    <eui-button class="menu-button" id="nav-toggle" aria-label="Toggle Navigation" aria-expanded="false" aria-controls="nav-items" tabindex="0" type="transparent" border-radius="100">
                        <eui-icon width="24" height="24" name="menu"></eui-icon>
                    </eui-button>
                </div>
                <h2 class="title">${t}</h2>
            </div>
            <div class="right-section">
                <slot></slot>
            </div>
        </div>
        `;
  }
}
customElements.define("eui-app-titlebar", Z);
class X extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._handleMouseDown = this._addRipple.bind(this);
  }
  connectedCallback() {
    this.render(), this.setupEventListeners();
  }
  static get observedAttributes() {
    return ["elevated", "interactive", "ripple"];
  }
  attributeChangedCallback(t, e, i) {
    e !== i && t === "ripple" && this.setupEventListeners();
  }
  setupEventListeners() {
    this.removeEventListener("mousedown", this._handleMouseDown), this.hasAttribute("ripple") && this.addEventListener("mousedown", this._handleMouseDown);
  }
  _addRipple(t) {
    const e = this.getBoundingClientRect(), i = document.createElement("span"), n = Math.max(e.width, e.height), s = n / 2;
    i.style.width = i.style.height = `${n}px`, i.style.left = `${t.clientX - e.left - s}px`, i.style.top = `${t.clientY - e.top - s}px`, i.classList.add("ripple"), this.shadowRoot.querySelector(".surface").appendChild(i), i.addEventListener("animationend", () => {
      i.remove();
    });
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                border-radius: 12px;
                background-color: var(--app-200);
                transition: background-color 0.2s cubic-bezier(.4, 0, .2, 1), 
                            box-shadow 0.2s cubic-bezier(.4, 0, .2, 1);
                overflow: hidden;
                position: relative;
                height: auto;
                z-index: 1;
            }

            :host([elevated]) {
                background-color: var(--app-100);
                box-shadow: inset 0 0 0 1px var(--app-300);
            }

            :host([interactive]) {
                cursor: pointer;
            }

            :host([interactive]:hover) {
                background-color: var(--app-300);
            }
                
            :host([interactive][elevated]:hover) {
                background-color: var(--app-100);
                box-shadow: inset 0 0 0 1px var(--app-300), 0 4px 12px rgba(0,0,0,0.1);
            }

            .surface {
                position: relative;
                z-index: 2; 
                width: 100%;
                height: 100%;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                opacity: 0.2;
                animation: ripple 600ms linear forwards;
                background-color: currentColor;
                pointer-events: none;
                z-index: -1;
                will-change: transform, opacity;
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        </style>
        <div class="surface">
            <slot></slot>
        </div>
        `;
  }
}
customElements.define("eui-surface", X);
typeof window < "u" && console.log("ErisUI loaded successfully");
export {
  J as device,
  K as haptics,
  u as icons,
  G as loadPage,
  C as router,
  Y as storage,
  Q as utils
};
