import { router, loadPage } from "./scripts/router.js";

import "./components/eui-avatar.js";
import "./components/eui-icon.js";
import "./components/eui-input.js";
import "./components/eui-loader.js";
import "./components/eui-progressbar.js";
import "./components/eui-switch.js";
import "./components/eui-chip.js";
import "./components/eui-app-nav.js";
import "./components/eui-header.js";
import "./components/eui-checkbox.js";
import "./components/eui-button.js";
import "./components/eui-heading.js";
import "./components/eui-code.js";

router.add("/", () => loadPage("index"));
router.add("/components/checkboxes", () => loadPage("checkboxes"));
router.add("/components/textfields", () => loadPage("textfields"));
router.add("/components/progressbars", () => loadPage("progressbars"));
router.add("/components/switch", () => loadPage("switch"));
router.add("/components/button", () => loadPage("button"));
router.add("/components/icons", () => loadPage("icons"));
router.add("/components/avatar", () => loadPage("avatar"));
router.add("/components/chips", () => loadPage("chips"));
router.add("/components/app-nav", () => loadPage("app-nav"));
router.add("/getting-started", () => loadPage("getting-started"));

router.add("/core/router", () => loadPage("router"));
router.add("/core/architecture", () => loadPage("architecture"));
router.add("/core/styling", () => loadPage("styling"));

router.setNotFound(() => loadPage("404"));

const navItems = [
    { label: "Home", path: "/", icon: "home" },
    { label: "Getting Started", path: "/getting-started", icon: "star" },
];

window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("eui-app-nav");
    if (nav) nav.navItems = navItems;

    router.navigate(window.location.pathname, false);
});