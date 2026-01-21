import { router, loadPage } from "./scripts/router.js";
import { storage } from "./scripts/storage.js";

import './components/eui-avatar.js';
import './components/eui-icon.js';
import './components/eui-input.js';
import './components/eui-loader.js';
import './components/eui-progressbar.js';
import './components/eui-switch.js';
import './components/eui-chip.js';
import './components/eui-app-nav.js';
import './components/eui-nav-item.js';
import './components/eui-header.js';
import './components/eui-checkbox.js';
import './components/eui-button.js';
import './components/eui-heading.js';
import './components/eui-code.js';
import './components/eui-app-titlebar.js';
import './components/eui-surface.js';
import './components/eui-slider.js';
import './components/eui-tab-bar.js';
import './components/eui-tab-item.js';
import './components/eui-modal.js';

router.add("/", () => loadPage("index"));

router.setNotFound(() => loadPage("404"));

storage.name("eui-data");

const navItems = [
    { label: "Home", path: "/", icon: "home" },
];

window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("eui-app-nav");
    if (nav && navItems) nav.navItems = navItems;

    const tabBar = document.querySelector("eui-tab-bar");
    if (tabBar && tabBarItems) tabBar.tabItems = tabBarItems;

    router.navigate(window.location.pathname, false);
});