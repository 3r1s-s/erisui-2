var S = Object.defineProperty;
var z = (o, t, i) => t in o ? S(o, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[t] = i;
var m = (o, t, i) => z(o, typeof t != "symbol" ? t + "" : t, i);
class T extends HTMLElement {
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
    const t = this.shadowRoot.querySelector("slot"), i = t && t.assignedNodes().length > 0;
    if (i) {
      const e = t.assignedNodes()[0];
      e && e.tagName === "IMG" && (this.initials.style.display = "none", this.avatar.style.backgroundColor = "transparent");
    } else
      this.hasAttribute("color") && (this.avatar.style.backgroundColor = this.getAttribute("color"));
    if (this.hasAttribute("color") && (this.avatar.style.backgroundColor = this.getAttribute("color")), this.hasAttribute("size")) {
      const e = this.getAttribute("size");
      this.avatar.style.width = e + "px", this.avatar.style.height = e + "px", this.initials.style.fontSize = e / 2 + "px";
    }
    if (this.hasAttribute("border-radius") && (this.avatar.style.borderRadius = this.getAttribute("border-radius") + "px"), this.hasAttribute("name") && (this.avatar.title = this.getAttribute("name")), !i && this.hasAttribute("name")) {
      const s = this.getAttribute("name").trim().split(/\s+/);
      let a = "";
      s.length === 1 ? a = s[0][0] || "" : a = (s[0][0] || "") + (s[s.length - 1][0] || ""), this.initials.textContent = a.toUpperCase();
    }
  }
}
customElements.define("eui-avatar", T);
const u = /* @__PURE__ */ (() => {
  let o = {};
  return {
    register(t, i) {
      o[t] = i;
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
u.register("cross", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.3527 12.0051L19.8447 6.51314C20.496 5.86247 20.496 4.80714 19.8447 4.15647C19.1933 3.50514 18.1387 3.50514 17.488 4.15647L11.996 9.64847L6.50401 4.15647C5.85334 3.50514 4.79734 3.50514 4.14734 4.15647C3.49601 4.80714 3.49601 5.86247 4.14734 6.51314L9.63934 12.0051L4.13401 17.5105C3.48267 18.1618 3.48267 19.2165 4.13401 19.8671C4.45934 20.1925 4.88601 20.3551 5.31267 20.3551C5.73934 20.3551 6.16601 20.1925 6.49134 19.8671L11.9967 14.3611L17.4887 19.8531C17.814 20.1785 18.2407 20.3411 18.6673 20.3411C19.094 20.3411 19.52 20.1785 19.846 19.8531C20.4973 19.2018 20.4973 18.1471 19.846 17.4965L14.3527 12.0051Z" fill="currentColor"/></svg>');
class R extends HTMLElement {
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
    const t = this.getAttribute("name"), i = u.get(t);
    if (!i) {
      this.shadowRoot.innerHTML = '<span style="color:red;">?</span>';
      return;
    }
    const e = document.createElement("template");
    e.innerHTML = i.trim();
    const s = e.content.cloneNode(!0), a = s.firstElementChild;
    if (a && a.style) {
      const n = this.getAttribute("width"), l = this.getAttribute("height");
      n && a.setAttribute("width", n), l && a.setAttribute("height", l), a.style.display = "block";
    }
    this.shadowRoot.innerHTML = "", this.shadowRoot.appendChild(s);
  }
}
customElements.define("eui-icon", R);
class M extends HTMLElement {
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
    this.form = this.shadowRoot.querySelector(".form"), this.inputEl = this.shadowRoot.querySelector(".form-input"), this.labelEl = this.shadowRoot.querySelector("label"), this.hasAttribute("value") && (this.inputEl.value = this.getAttribute("value")), this.hasAttribute("id") && (this.inputEl.id = this.getAttribute("id")), this.hasAttribute("label") && (this.labelEl.textContent = this.getAttribute("label")), this.hasAttribute("type") && (this.inputEl.type = this.getAttribute("type")), this.hasAttribute("filled") && this.form.classList.add("filled"), this.inputEl.addEventListener("input", (t) => {
      this.setAttribute("value", this.inputEl.value), this.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 }));
    }), this.inputEl.addEventListener("change", (t) => {
      this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    });
  }
  attributeChangedCallback(t, i, e) {
    if (!(!this.inputEl || !this.labelEl))
      switch (t) {
        case "value":
          this.inputEl.value !== e && (this.inputEl.value = e);
          break;
        case "id":
          this.inputEl.id = e;
          break;
        case "label":
          this.labelEl.textContent = e;
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
customElements.define("eui-input", M);
class $ extends HTMLElement {
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
customElements.define("eui-loader", $);
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
                    background: var(--app-200, #333);
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
  set intermediate(t) {
    t ? this.setAttribute("intermediate", "") : this.removeAttribute("intermediate");
  }
  set id(t) {
    this.setAttribute("id", t);
  }
  get intermediate() {
    return this.hasAttribute("intermediate");
  }
  get value() {
    return this.getAttribute("value");
  }
  attributeChangedCallback() {
    this.connectedCallback();
  }
  connectedCallback() {
    const t = this.shadowRoot.querySelector(".progress");
    this.hasAttribute("id") && (t.id = this.getAttribute("id")), this.hasAttribute("intermediate") ? t.classList.add("intermediate") : t.classList.remove("intermediate"), this.hasAttribute("value") && (t.style.width = this.getAttribute("value") + "%");
  }
}
customElements.define("eui-progressbar", H);
const y = {
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
}, Q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  device: y
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
function v(o) {
  y.supports.haptics ? navigator.vibrate(o || 50) : y.is.iPhone && _();
}
const tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  haptic: v
}, Symbol.toStringTag, { value: "Module" })), k = (() => {
  let o = {}, t;
  try {
    o = JSON.parse(localStorage.getItem(t) || "{}");
  } catch (i) {
    console.error(i);
  }
  return {
    get(i) {
      return o[i];
    },
    set(i, e) {
      o[i] = e, localStorage.setItem(t, JSON.stringify(o));
    },
    delete(i) {
      delete o[i], localStorage.setItem(t, JSON.stringify(o));
    },
    all() {
      return o;
    },
    clear() {
      o = {}, localStorage.setItem(t, JSON.stringify(o));
    },
    name(i) {
      t = i;
      try {
        o = JSON.parse(localStorage.getItem(t) || "{}");
      } catch (e) {
        console.error(e);
      }
    },
    settings: {
      get(i) {
        return o && o.settings && o.settings[i];
      },
      set(i, e) {
        o.settings || (o.settings = {}), o.settings[i] = e, localStorage.setItem(t, JSON.stringify(o));
      },
      delete(i) {
        o.settings && (delete o.settings[i], localStorage.setItem(t, JSON.stringify(o)));
      },
      all() {
        return o.settings || {};
      },
      clear() {
        o.settings && (o.settings = {}, localStorage.setItem(t, JSON.stringify(o)));
      }
    }
  };
})(), I = k.settings, et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  settings: I,
  storage: k
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
    this.selected = !this.selected, v(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
  }
  updateFromAttribute() {
    const t = this.hasAttribute("selected");
    this.inputEl.checked = t, this.switchEl.classList.toggle("selected", t);
  }
  attributeChangedCallback(t, i, e) {
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
class D extends HTMLElement {
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
      const i = document.createElement("span"), e = t.currentTarget, s = Math.max(e.offsetWidth, e.offsetHeight);
      i.classList.add("ripple"), i.style.left = t.clientX - e.getBoundingClientRect().left - s / 2 + "px", i.style.top = t.clientY - e.getBoundingClientRect().top - s / 2 + "px", i.style.width = s + "px", i.style.height = s + "px", this.shadowRoot.appendChild(i), setTimeout(() => {
        i.remove();
      }, 600);
    });
  }
}
customElements.define("eui-chip", D);
const b = "", f = (() => {
  const o = [];
  function t(r, c) {
    const h = [], g = r.replace(/:([^/]+)/g, (x, w) => (h.push(w), "([^/]+)")).replace(/\//g, "\\/"), p = new RegExp(`^${b}${g}$`);
    o.push({ regex: p, paramNames: h, renderFn: c });
  }
  function i(r) {
    for (const { regex: c, paramNames: h, renderFn: g } of o) {
      const p = r.match(c);
      if (p) {
        const x = {};
        return h.forEach((w, L) => {
          x[w] = decodeURIComponent(p[L + 1]);
        }), { renderFn: g, params: x };
      }
    }
    return null;
  }
  function e(r, c = !0) {
    r.startsWith(b) || (r = b + (r.startsWith("/") ? "" : "/") + r);
    const h = r.split(/[?#]/)[0];
    if (h === window.location.pathname && r.includes("#")) {
      c && history.pushState({}, "", r);
      const p = "#" + r.split("#")[1];
      s(p);
      return;
    }
    const g = i(h);
    if (g)
      if (c && history.pushState({}, "", r), g.renderFn(g.params), window.dispatchEvent(new CustomEvent("route-changed", { detail: { path: r } })), r.includes("#")) {
        const p = "#" + r.split("#")[1];
        setTimeout(() => s(p), 100);
      } else {
        const p = document.getElementById("main");
        p && p.scrollTo(0, 0);
      }
    else a ? (c && history.pushState({}, "", r), a()) : console.warn(`No route found for ${h}`);
  }
  function s(r) {
    if (r)
      try {
        const c = document.querySelector(r);
        c && c.scrollIntoView({ behavior: "smooth" });
      } catch {
        console.warn("Invalid hash:", r);
      }
  }
  let a = null;
  function n(r) {
    a = r;
  }
  function l() {
    history.back();
  }
  function d() {
    return window.location.pathname.replace(b, "") || "/";
  }
  return window.addEventListener("popstate", () => {
    const r = window.location.pathname + window.location.search + window.location.hash;
    e(r, !1);
  }), window.addEventListener("click", (r) => {
    if (r.button !== 0 || r.metaKey || r.altKey || r.ctrlKey || r.shiftKey) return;
    const c = r.target.closest("a");
    if (!c || c.hasAttribute("download") || c.getAttribute("target") === "_blank") return;
    const h = c.getAttribute("href");
    if (!(!h || h.startsWith("http") && !h.startsWith(window.location.origin))) {
      if (r.preventDefault(), h.startsWith("#")) {
        history.pushState({}, "", h), s(h);
        return;
      }
      e(h);
    }
  }), { add: t, navigate: e, back: l, location: d, setNotFound: n };
})();
async function it(o) {
  try {
    const t = document.getElementById("main");
    t.classList.add("fade-out"), await new Promise((e) => setTimeout(e, 200));
    const i = await fetch(`/src/pages/${o}.html`).then((e) => e.text());
    t.innerHTML = i, t.classList.remove("fade-out"), t.classList.add("fade-in"), window.location.hash ? setTimeout(() => {
      try {
        const e = document.querySelector(window.location.hash);
        e && e.scrollIntoView({ behavior: "smooth" });
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
    m(this, "handleClick", () => {
      const i = this.getAttribute("path");
      i && f.navigate(i);
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
  attributeChangedCallback(i, e, s) {
    if (e !== s && this.hasRendered) {
      if (i === "active")
        return;
      this.updateContent();
    }
  }
  setupEventListeners() {
    this.addEventListener("pointerdown", (i) => {
      const e = document.createElement("span"), s = i.currentTarget, a = s.getBoundingClientRect(), n = Math.max(s.offsetWidth, s.offsetHeight), l = n / 2;
      e.classList.add("ripple"), e.style.width = `${n}px`, e.style.height = `${n}px`, e.style.left = `${i.clientX - a.left - l}px`, e.style.top = `${i.clientY - a.top - l}px`, this.shadowRoot.appendChild(e), e.addEventListener("animationend", () => {
        e.remove();
      });
    });
  }
  updateContent() {
    const i = this.getAttribute("icon"), e = this.getAttribute("avatar-src"), s = this.getAttribute("avatar-name"), a = this.getAttribute("label") || "", n = this.getAttribute("badge"), l = this.shadowRoot.querySelector(".badge");
    if (n)
      if (l)
        l.textContent = n;
      else {
        const c = document.createElement("span");
        c.className = "badge", c.textContent = n, this.shadowRoot.appendChild(c);
      }
    else l && l.remove();
    const d = this.shadowRoot.querySelector("slot[name='icon']");
    if (d)
      if (e || s) {
        let c = '<eui-avatar size="24"';
        s && (c += ` name="${s}"`), c += ">", e && (c += `<img src="${e}" alt="${s || "Avatar"}" />`), c += "</eui-avatar>", d.innerHTML = c;
      } else {
        const c = d.querySelector("eui-icon");
        i && c ? c.getAttribute("name") !== i && c.setAttribute("name", i) : i ? d.innerHTML = `<eui-icon width="24" height="24" name="${i}"></eui-icon>` : d.innerHTML = "";
      }
    const r = this.shadowRoot.querySelector(".label");
    r && (r.textContent = a);
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
      var s, a;
      if (t.type === "divider")
        return '<div style="height: 1px; background: var(--app-300); margin: 0.5rem 0;"></div>';
      const i = ((s = t.avatar) == null ? void 0 : s.src) || "", e = ((a = t.avatar) == null ? void 0 : a.name) || "";
      return `<eui-nav-item path="${t.path}" icon="${t.icon}" avatar-src="${i}" avatar-name="${e}" label="${t.label}"></eui-nav-item>`;
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
    t || (t = f.location()), t.startsWith("/") || (t = "/" + t), this.shadowRoot.querySelectorAll("eui-nav-item").forEach((e) => {
      e.getAttribute("path") === t ? e.setAttribute("active", "") : e.removeAttribute("active");
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

                @media (max-width: 768px) {
                    .header {
                        padding: 1rem;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }

                    .hero h1 {
                        font-size: 4rem;
                    }

                    .large h1 {
                        font-size: 2.5rem;
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
    this.hd = this.shadowRoot.querySelector(".header"), this.hasAttribute("type") && this.hd.classList.add(this.getAttribute("type"));
  }
  attributeChangedCallback(t, i, e) {
    const s = this.shadowRoot.querySelector("h1"), a = this.shadowRoot.querySelector("p"), n = this.shadowRoot.querySelector(".img");
    t === "title" && (s.textContent = e), t === "subtitle" && (a.textContent = e), t === "img" && (n.style.backgroundImage = e ? `url(${e})` : "");
  }
}
customElements.define("eui-header", B);
class O extends HTMLElement {
  static get observedAttributes() {
    return ["selected"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    vertical-align: bottom;
                    position: relative;
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                }

                .checkbox {
                    position: relative;
                    width: 20px;
                    height: 20px;
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
    this.selected = !this.selected, v(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
  }
  updateFromAttribute() {
    const t = this.hasAttribute("selected");
    this.inputEl.checked = t, this.checkEl.classList.toggle("selected", t);
  }
  attributeChangedCallback(t, i, e) {
    t === "selected" && this.inputEl && this.updateFromAttribute();
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(t) {
    t ? this.setAttribute("selected", "") : this.removeAttribute("selected");
  }
}
customElements.define("eui-checkbox", O);
class C extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const t = this.getAttribute("href"), i = t ? "a" : "button";
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
            <${i}>
                <slot></slot>
            </${i}>
        `;
    const e = this.shadowRoot.querySelector(i);
    t && e.setAttribute("href", t), this.hasAttribute("type") && e.classList.add(this.getAttribute("type")), this.hasAttribute("icon") && e.classList.add("icon"), this.hasAttribute("width") && (e.style.width = this.getAttribute("width") + "px"), this.hasAttribute("height") && (e.style.height = this.getAttribute("height") + "px"), this.hasAttribute("border-radius") && (e.style.borderRadius = this.getAttribute("border-radius") + "px"), e.addEventListener("pointerdown", (s) => {
      const a = document.createElement("span"), n = s.currentTarget, l = n.getBoundingClientRect(), d = Math.max(n.offsetWidth, n.offsetHeight), r = d / 2;
      a.classList.add("ripple"), a.style.width = `${d}px`, a.style.height = `${d}px`, a.style.left = `${s.clientX - l.left - r}px`, a.style.top = `${s.clientY - l.top - r}px`, e.appendChild(a), a.addEventListener("animationend", () => {
        a.remove();
      });
    });
  }
}
m(C, "observedAttributes", ["type", "width", "height", "border-radius", "icon", "link", "href"]);
customElements.define("eui-button", C);
class N extends HTMLElement {
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
customElements.define("eui-heading", N);
function U(o) {
  const e = Date.now() - o, s = Math.floor(e / 1e3), a = Math.floor(s / 60), n = Math.floor(a / 60), l = Math.floor(n / 24), d = Math.floor(l / 30), r = Math.floor(d / 12);
  return r > 0 ? `${r}y` : d > 0 ? `${d}mo` : l > 0 ? `${l}d` : n > 0 ? `${n}h` : a > 0 ? `${a}m` : `${s}s`;
}
function P(o) {
  const e = Date.now() - o, s = Math.floor(e / 1e3), a = Math.floor(s / 60), n = Math.floor(a / 60), l = Math.floor(n / 24), d = Math.floor(l / 30), r = Math.floor(d / 12);
  return r > 0 ? `${r} year${r > 1 ? "s" : ""} ago` : d > 0 ? `${d} month${d > 1 ? "s" : ""} ago` : l > 0 ? `${l} day${l > 1 ? "s" : ""} ago` : n > 0 ? `${n} hour${n > 1 ? "s" : ""} ago` : a > 0 ? `${a} minute${a > 1 ? "s" : ""} ago` : `${s} second${s > 1 ? "s" : ""} ago`;
}
function V(o) {
  return o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`/g, "&#96;").replace(/'/g, "&#39;");
}
function E(o) {
  const t = document.createElement("input");
  t.value = o, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
}
const st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  copystr: E,
  joinedAgo: P,
  sanitize: V,
  timeAgo: U
}, Symbol.toStringTag, { value: "Module" }));
class Y extends HTMLElement {
  static get observedAttributes() {
    return ["copy", "id", "type", "language"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this._boundCopy = this._onCopy.bind(this), this._isRendered = !1;
  }
  connectedCallback() {
    this._isRendered || (this.render(), this._isRendered = !0);
  }
  attributeChangedCallback(t, i, e) {
    this._isRendered && i !== e && this.render();
  }
  render() {
    const t = this.hasAttribute("copy"), i = this.getAttribute("language") || "text";
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
    const e = this._getFormattedText();
    this.codeEl.innerHTML = this._highlight(e, i), t ? this.copyBtn.addEventListener("click", this._boundCopy) : this.copyBtn.style.display = "none";
  }
  _getFormattedText() {
    let i = (this.querySelector("code") || this).innerHTML || "";
    i = this._unescapeHtml(i), i = i.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
    const e = i.split(`
`), s = e.filter((n) => n.trim()).map((n) => n.match(/^\s*/)[0].length), a = s.length ? Math.min(...s) : 0;
    return e.map((n) => n.slice(a)).join(`
`);
  }
  _unescapeHtml(t) {
    const i = document.createElement("textarea");
    return i.innerHTML = t, i.value;
  }
  _highlight(t, i) {
    t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const e = {};
    let s = 0;
    function a(n, l) {
      const d = `__TOKEN_${l}_${s++}__`;
      return e[d] = `<span class="token ${l}">${n}</span>`, d;
    }
    return ["javascript", "js", "json", "bash", "sh", "css"].includes(i) ? (t = t.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (n) => a(n, "string")), i === "bash" || i === "sh" ? t = t.replace(/(#.*$)/gm, (n) => a(n, "comment")) : i === "css" ? t = t.replace(/(\/\*[\s\S]*?\*\/)/g, (n) => a(n, "comment")) : t = t.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (n) => a(n, "comment"))) : ["html", "xml"].includes(i) && (t = t.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (n) => a(n, "comment")), t = t.replace(/(&lt;\/?[a-z0-9:-]+)/gi, (n) => a(n, "tag"))), i === "javascript" || i === "js" || i === "json" ? (t = t.replace(/\b(const|let|var|if|else|for|while|return|function|class|import|export|from|default|switch|case|break|continue|new|this|async|await)\b/g, '<span class="token keyword">$1</span>'), t = t.replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>'), t = t.replace(/\b([a-zA-Z0-9_]+)\s*(?=\()/g, '<span class="token function">$1</span>')) : i === "bash" || i === "sh" ? (t = t.replace(/\b(npm|npx|node|git|cd|ls|mkdir|rm|mv|cp|echo|cat|sudo|docker|brew|grep|curl|wget|chmod|chown|touch)\b/g, '<span class="token keyword">$1</span>'), t = t.replace(/\b(install|run|build|start|test|dev|init|clone|pull|push|commit|add|checkout|branch|merge)\b/g, '<span class="token function">$1</span>'), t = t.replace(/(\s-+[a-zA-Z0-9-]+)/g, '<span class="token attr-name">$1</span>'), t = t.replace(/(\$[A-Z0-9_]+)/g, '<span class="token number">$1</span>')) : i === "html" || i === "xml" ? (t = t.replace(/\s([a-z0-9:-]+)=/gi, (n, l) => " " + a(l, "attr-name") + "="), t = t.replace(/(".*?")/g, (n) => a(n, "attr-value")), t = t.replace(/&gt;/g, '<span class="token tag">&gt;</span>')) : i === "css" && (t = t.replace(/([a-z-]+)(?=:)/g, '<span class="token keyword">$1</span>')), Object.keys(e).reverse().forEach((n) => {
      t = t.replace(n, e[n]);
    }), t;
  }
  _onCopy() {
    E(this._getFormattedText());
    const t = this.copyBtn.querySelector("eui-icon");
    if (t) {
      const i = t.getAttribute("name");
      t.setAttribute("name", "check"), setTimeout(() => t.setAttribute("name", i), 2e3);
    }
  }
  disconnectedCallback() {
    this.copyBtn && this.copyBtn.removeEventListener("click", this._boundCopy);
  }
}
customElements.define("eui-code", Y);
class W extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render(), this.setupEventListeners();
  }
  static get observedAttributes() {
    return ["name"];
  }
  attributeChangedCallback(t, i, e) {
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
customElements.define("eui-app-titlebar", W);
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
  attributeChangedCallback(t, i, e) {
    i !== e && t === "ripple" && this.setupEventListeners();
  }
  setupEventListeners() {
    this.removeEventListener("mousedown", this._handleMouseDown), this.hasAttribute("ripple") && this.addEventListener("mousedown", this._handleMouseDown);
  }
  _addRipple(t) {
    const i = this.getBoundingClientRect(), e = document.createElement("span"), s = Math.max(i.width, i.height), a = s / 2;
    e.style.width = e.style.height = `${s}px`, e.style.left = `${t.clientX - i.left - a}px`, e.style.top = `${t.clientY - i.top - a}px`, e.classList.add("ripple"), this.shadowRoot.querySelector(".surface").appendChild(e), e.addEventListener("animationend", () => {
      e.remove();
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
class Z extends HTMLElement {
  static get observedAttributes() {
    return ["value", "min", "max", "step", "label", "vertical", "disabled", "thickness"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    width: 100%;
                    max-width: 300px;
                    margin: 0.75rem 0;
                    user-select: none;
                    --track-thickness: 5px;
                    --thumb-size: 20px;
                    --touch-size: var(--eui-slider-touch-target-size, 44px);
                }

                :host([vertical]) {
                    flex-direction: row;
                    height: 300px;
                    width: max-content;
                    max-width: none;
                }
                
                :host([vertical]) .header {
                    width: 100%;
                    justify-content: center;
                    text-align: center;
                    flex-direction: column;
                }

                :host([disabled]) {
                    opacity: 0.5;
                    pointer-events: none;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    font-weight: 500;
                    padding: 0 4px;
                }

                .slider-container {
                    position: relative;
                    min-height: var(--thumb-size);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                }

                :host([vertical]) .slider-container {
                    height: 100%;
                    min-width: var(--track-thickness, 4px);
                    flex-direction: column;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    opacity: 0;
                    width: 100%;
                    height: var(--touch-size);
                    background: transparent;
                    outline: none;
                    margin: 0;
                    cursor: pointer;
                    position: absolute;
                    z-index: 1;
                    top: 50%;
                    transform: translateY(-50%);
                }

                :host([vertical]) input[type="range"] {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-90deg);
                    transform-origin: center;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: var(--thumb-size);
                    height: var(--touch-size);
                    cursor: pointer;
                }

                input[type="range"]::-moz-range-thumb {
                    width: var(--thumb-size);
                    height: var(--touch-size);
                    cursor: pointer;
                    border: none;
                    background: transparent;
                }

                .track {
                    position: relative;
                    height: var(--track-thickness);
                    width: 100%;
                    background: var(--slider-track, #333);
                    border-radius: 16px;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                :host([vertical]) .track {
                    width: var(--track-thickness);
                    height: 100%;
                }

                .track-fill {
                    position: absolute;
                    height: 100%;
                    background: var(--app-accent, #6366f1);
                    pointer-events: none;
                    z-index: 0;
                    left: 0;
                    width: var(--progress, 0%);
                    border-radius: 3px 3px 0 0;
                }

                :host([vertical]) .track-fill {
                    width: 100%;
                    height: var(--progress, 0%);
                    bottom: 0;
                    top: auto;
                }
                
                :host([no-thumb]) .slider-thumb {
                    display: none;
                }

                :host([no-number]) .value-badge {
                    display: none;
                }

                :host([no-header]) .header,
                :host([no-number]:not([label])) .header {
                    display: none;
                }

                .slider-thumb {
                    position: absolute;
                    width: var(--thumb-size);
                    height: var(--thumb-size);
                    background: var(--app-accent, #6366f1);
                    box-shadow: inset 0 0 0 1px var(--app-500, #131318), inset 0 0 0 4px var(--app-200, #131318);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                    
                    left: calc(var(--progress, 0%) - var(--thumb-offset, 0px));
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                :host([vertical]) .slider-thumb {
                    left: 50%;
                    top: auto;
                    bottom: calc(var(--progress, 0%) - var(--thumb-offset, 0px));
                    transform: translate(-50%, 0);
                }

                .slider-thumb.active {
                    background: var(--app-accent-50, #7376ff);
                }

                .value-badge {
                    color: var(--app-text);
                    font-weight: 600;
                }
            </style>
            <div class="header">
                <span class="label"></span>
                <span class="value-badge"></span>
            </div>
            <div class="slider-container">
                <div class="track">
                    <div class="track-fill"></div>
                </div>
                <div class="slider-thumb"></div>
                <input type="range">
            </div>
        `;
  }
  connectedCallback() {
    this.inputEl = this.shadowRoot.querySelector("input"), this.labelEl = this.shadowRoot.querySelector(".label"), this.valueEl = this.shadowRoot.querySelector(".value-badge"), this.trackFillEl = this.shadowRoot.querySelector(".track-fill"), this.sliderThumbEl = this.shadowRoot.querySelector(".slider-thumb"), this.containerEl = this.shadowRoot.querySelector(".slider-container"), this.inputEl.min = this.getAttribute("min") || 0, this.inputEl.max = this.getAttribute("max") || 100, this.inputEl.step = this.getAttribute("step") || 1, this.inputEl.value = this.getAttribute("value") || 50, this.hasAttribute("label") && (this.labelEl.textContent = this.getAttribute("label")), this.hasAttribute("disabled") && (this.inputEl.disabled = !0), this.hasAttribute("thickness") && this.style.setProperty("--track-thickness", this.getAttribute("thickness")), this.updateUI(), this.inputEl.addEventListener("input", () => {
      this.updateValue(this.inputEl.value), this.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 }));
    }), this.inputEl.addEventListener("change", () => {
      this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }), this.inputEl.addEventListener("mousedown", () => this.sliderThumbEl.classList.add("active")), this.inputEl.addEventListener("touchstart", () => this.sliderThumbEl.classList.add("active"), { passive: !0 }), this.onUp = () => this.sliderThumbEl.classList.remove("active"), window.addEventListener("mouseup", this.onUp), window.addEventListener("touchend", this.onUp), this.resizeObserver = new ResizeObserver(() => this.updateDimensions()), this.resizeObserver.observe(this.containerEl), this.updateDimensions();
  }
  disconnectedCallback() {
    this.resizeObserver && this.resizeObserver.disconnect(), window.removeEventListener("mouseup", this.onUp), window.removeEventListener("touchend", this.onUp);
  }
  updateDimensions() {
    !this.inputEl || !this.containerEl || (this.hasAttribute("vertical") ? this.inputEl.style.width = `${this.containerEl.offsetHeight}px` : this.inputEl.style.width = "");
  }
  updateValue(t) {
    this.setAttribute("value", t), this.updateUI();
  }
  updateUI() {
    if (!this.inputEl) return;
    const t = parseFloat(this.inputEl.min), i = parseFloat(this.inputEl.max), e = parseFloat(this.inputEl.value), s = (e - t) / (i - t) * 100;
    this.containerEl.style.setProperty("--progress", `${s}%`);
    const a = s / 100 * 20;
    this.containerEl.style.setProperty("--thumb-offset", `${a}px`), this.valueEl.textContent = e;
  }
  attributeChangedCallback(t, i, e) {
    this.inputEl && (t === "value" && e !== this.inputEl.value ? (this.inputEl.value = e, this.updateUI()) : ["min", "max", "step"].includes(t) ? (this.inputEl[t] = e, this.updateUI()) : t === "label" ? this.labelEl.textContent = e : t === "vertical" ? this.updateDimensions() : t === "disabled" ? this.inputEl.disabled = e !== null : t === "thickness" && (e ? this.style.setProperty("--track-thickness", e) : this.style.removeProperty("--track-thickness")));
  }
  get value() {
    return parseFloat(this.inputEl.value);
  }
  set value(t) {
    this.setAttribute("value", t);
  }
}
customElements.define("eui-slider", Z);
class J extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  set tabItems(t) {
    this._tabItems = t, this.render();
  }
  get tabItems() {
    return this._tabItems || [];
  }
  badge(t, i) {
    const e = this.tabItems.findIndex((a) => a.path === t);
    e > -1 && (this.tabItems[e].badge = i);
    const s = this.shadowRoot.querySelector(`eui-tab-item[path="${t}"]`);
    s && (i ? s.setAttribute("badge", i) : s.removeAttribute("badge"));
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
                    ${this.tabItems.map((t) => {
      var s, a;
      const i = ((s = t.avatar) == null ? void 0 : s.src) || "", e = ((a = t.avatar) == null ? void 0 : a.name) || "";
      return `<eui-tab-item path="${t.path}" icon="${t.icon}" avatar-src="${i}" avatar-name="${e}" label="${t.label}" badge="${t.badge || ""}"></eui-tab-item>`;
    }).join("")}
                </slot>
            </div>
        `;
  }
}
customElements.define("eui-tab-bar", J);
class K extends HTMLElement {
  constructor() {
    super();
    m(this, "handleClick", () => {
      const i = this.getAttribute("path");
      i && f.navigate(i);
    });
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["path", "icon", "label", "badge", "active", "avatar-src", "avatar-name"];
  }
  connectedCallback() {
    this.hasRendered || (this.render(), this.setupEventListeners(), this.hasRendered = !0), this.updateContent(), this.updateActiveState(), this.addEventListener("click", this.handleClick), this._onRouteSubstitute = () => this.updateActiveState(), window.addEventListener("popstate", this._onRouteSubstitute), window.addEventListener("route-changed", this._onRouteSubstitute);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick), window.removeEventListener("popstate", this._onRouteSubstitute), window.removeEventListener("route-changed", this._onRouteSubstitute);
  }
  attributeChangedCallback(i, e, s) {
    if (e !== s && this.hasRendered) {
      if (i === "active") return;
      this.updateContent(), i === "path" && this.updateActiveState();
    }
  }
  updateActiveState() {
    let i = f.location(), e = this.getAttribute("path");
    i.startsWith("/") || (i = "/" + i), e && !e.startsWith("/") && (e = "/" + e), e && i === e ? this.setAttribute("active", "") : this.removeAttribute("active");
  }
  setupEventListeners() {
    this.addEventListener("pointerdown", (i) => {
      const e = document.createElement("span"), s = i.currentTarget, a = s.getBoundingClientRect(), n = Math.max(s.offsetWidth, s.offsetHeight), l = n / 2;
      e.classList.add("ripple"), e.style.width = `${n}px`, e.style.height = `${n}px`, e.style.left = `${i.clientX - a.left - l}px`, e.style.top = `${i.clientY - a.top - l}px`, this.shadowRoot.appendChild(e), e.addEventListener("animationend", () => {
        e.remove();
      });
    });
  }
  updateContent() {
    const i = this.getAttribute("icon"), e = this.getAttribute("avatar-src"), s = this.getAttribute("avatar-name"), a = this.getAttribute("label") || "", n = this.getAttribute("badge"), l = this.shadowRoot.querySelector(".badge");
    if (n)
      if (l)
        l.textContent = n;
      else {
        const c = document.createElement("span");
        c.className = "badge", c.textContent = n, this.shadowRoot.appendChild(c);
      }
    else l && l.remove();
    const d = this.shadowRoot.querySelector("slot[name='icon']");
    if (d)
      if (e || s) {
        let c = '<eui-avatar size="24"';
        s && (c += ` name="${s}"`), c += ">", e && (c += `<img src="${e}" alt="${s || "Avatar"}" />`), c += "</eui-avatar>", d.innerHTML = c;
      } else i ? d.innerHTML = `<eui-icon width="20" height="20" name="${i}"></eui-icon>` : d.innerHTML = "";
    const r = this.shadowRoot.querySelector(".label");
    r && (r.textContent = a);
  }
  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    height: 100%;
                    cursor: pointer;
                    padding: 4px 0;
                    box-sizing: border-box;
                    color: var(--app-700);
                    transition: color 0.2s var(--transition-function);
                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }

                :host([active]) {
                    color: var(--app-link);
                }

                .icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    transition: transform 0.2s var(--transition-function);
                }

                .label {
                    font-size: 12px;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    padding: 0 4px;
                }

                :host([active]) .label {
                    font-weight: 600;
                }

                .badge {
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    margin-left: 8px;
                    min-width: 16px;
                    height: 16px;
                    padding: 0 4px;
                    border-radius: 8px;
                    background-color: var(--app-red);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                    pointer-events: none;
                    z-index: 2;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    opacity: 0.15;
                    animation: ripple 600ms linear forwards;
                    background-color: currentColor; 
                    pointer-events: none;
                    z-index: 0;
                }

                .inner {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 32px;
                    width: 56px;
                    border-radius: 100px;
                    cursor: pointer;
                    margin-bottom: 4px;
                    box-sizing: border-box;

                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }

                .inner::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transform: scaleX(.9);
                    border-radius: 100px;
                    background-color: transparent;
                    transition: color 0.2s var(--transition-function),
                    transform 0.2s var(--transition-function);
                    z-index: -1;
                }

                :host([active]) .inner::before {
                    transform: scaleX(1);
                    background-color: color-mix(in srgb, var(--app-link) 25%, transparent 100%);
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            </style>
            <div class="inner">
                <div class="icon-container">
                    <slot name="icon"></slot>
                </div>
                </div>
                <span class="label"></span>
            <slot></slot>
        `;
  }
}
customElements.define("eui-tab-item", K);
class A extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.isDragging = !1, this.sy = 0, this.startHeight = 0, this.y = 0, this.t = 0, this.vel = 0, this.isExpanded = !1, this.startDrag = this.startDrag.bind(this), this.handleDrag = this.handleDrag.bind(this), this.stopDrag = this.stopDrag.bind(this), this.close = this.close.bind(this), this.onOutsideClick = this.onOutsideClick.bind(this), this._returnValue = "";
  }
  get returnValue() {
    return this._returnValue;
  }
  set returnValue(t) {
    this._returnValue = t, t ? this.setAttribute("return", t) : this.removeAttribute("return");
  }
  connectedCallback() {
    this.render(), this.setupResultListeners();
  }
  attributeChangedCallback(t, i, e) {
    i !== e && (t === "open" ? e !== null ? this.open() : this.close() : t === "width" ? this.modal && (this.modal.style.width = e) : t === "height" ? this.modal && (this.modal.style.height = e) : t === "return" && (this._returnValue = e || ""));
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
        `, this.modal = this.shadowRoot.querySelector(".modal"), this.modalOuter = this.shadowRoot.querySelector(".modal-outer"), this.handleArea = this.shadowRoot.querySelector("#drag-handle"), this.modalOuter.addEventListener("click", this.onOutsideClick), this.handleArea.addEventListener("mousedown", this.startDrag), this.handleArea.addEventListener("touchstart", this.startDrag, { passive: !1 }), this.hasAttribute("width") && (this.modal.style.width = this.getAttribute("width")), this.hasAttribute("height") && (this.modal.style.height = this.getAttribute("height"));
  }
  setupResultListeners() {
    window.addEventListener("mousemove", this.handleDrag), window.addEventListener("touchmove", this.handleDrag, { passive: !1 }), window.addEventListener("mouseup", this.stopDrag), window.addEventListener("touchend", this.stopDrag);
  }
  disconnectedCallback() {
    window.removeEventListener("mousemove", this.handleDrag), window.removeEventListener("touchmove", this.handleDrag), window.removeEventListener("mouseup", this.stopDrag), window.removeEventListener("touchend", this.stopDrag);
  }
  onOutsideClick(t) {
    t.target === this.modalOuter && this.close();
  }
  startDrag(t) {
    if (window.innerWidth > 768 || this.getAttribute("type") === "alert") return;
    this.isDragging = !0;
    const i = t.type.startsWith("touch") ? t.touches[0].clientY : t.clientY;
    this.sy = i, this.y = i, this.t = Date.now(), this.startHeight = this.modal.offsetHeight, this.modal.style.transition = "none", document.body.style.cursor = "ns-resize";
  }
  handleDrag(t) {
    if (!this.isDragging) return;
    t.type.startsWith("touch") && t.preventDefault();
    const i = t.type.startsWith("touch") ? t.touches[0].clientY : t.clientY, e = Date.now(), s = e - this.t;
    s > 0 && (this.vel = (this.y - i) / s), this.y = i, this.t = e;
    const a = this.sy - i;
    let n = this.startHeight + a;
    const l = window.innerHeight * 0.95;
    n > l && (n = l + (n - l) * 0.2), this.modal.style.height = `${n}px`;
  }
  stopDrag() {
    if (!this.isDragging) return;
    this.isDragging = !1, this.modal.style.transition = "height 0.4s cubic-bezier(0.38, 1.21, 0.22, 1), transform 0.4s cubic-bezier(0.38, 1.21, 0.22, 1)", document.body.style.cursor = "";
    const t = this.modal.offsetHeight;
    this.vel < -0.5 || t < 200 ? this.close() : this.vel > 0.5 ? this.modal.style.height = "90%" : t > window.innerHeight * 0.5 ? this.modal.style.height = "90%" : this.close(), this.vel = 0;
  }
  open() {
    this._returnValue = "", this.hasAttribute("open") || this.setAttribute("open", ""), v(), window.innerWidth <= 768 && this.getAttribute("type") !== "alert" ? (this.modal.style.height = "90%", this.modal.style.transform = "translateY(0)") : (this.modal.style.height = this.getAttribute("height") || "auto", this.modal.style.transform = "");
  }
  close(t) {
    t !== void 0 && (this.returnValue = t), this.classList.add("closing"), this.modal && (this.modal.style.transform = "", this.modal.style.transition = ""), setTimeout(() => {
      const i = this.hasAttribute("open");
      this.removeAttribute("open"), this.classList.remove("closing"), this.modal && (this.modal.style.height = "", this.modal.style.transform = "", this.modal.style.transition = ""), i && this.dispatchEvent(new CustomEvent("close", {
        detail: { returnValue: this.returnValue },
        bubbles: !0,
        composed: !0
      }));
    }, 200);
  }
}
m(A, "observedAttributes", ["width", "height", "open", "type", "return"]);
customElements.define("eui-modal", A);
typeof window < "u" && console.log("ErisUI loaded successfully");
export {
  Q as device,
  tt as haptics,
  u as icons,
  it as loadPage,
  f as router,
  et as storage,
  st as utils
};
