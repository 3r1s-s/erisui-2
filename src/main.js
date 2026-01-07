import { router, loadPage, icons } from "@3r1s_s/erisui";
import "@3r1s_s/erisui/style.css";

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
router.add("/components/surface", () => loadPage("surface"));
router.add("/components/sliders", () => loadPage("sliders"));
router.add("/getting-started", () => loadPage("getting-started"));

router.add("/core/router", () => loadPage("router"));
router.add("/core/architecture", () => loadPage("architecture"));
router.add("/core/styling", () => loadPage("styling"));

router.setNotFound(() => loadPage("404"));

icons.register("star", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.785 3.10866L15.9287 7.45093L20.7219 8.14933C22.3552 8.38578 23.0066 10.3917 21.8259 11.5442L18.3559 14.925L19.1748 19.6995C19.4536 21.3249 17.7467 22.5651 16.2873 21.7978L11.9998 19.5429L7.71237 21.7978C6.25138 22.5651 4.5461 21.3249 4.82327 19.6995L5.6438 14.925L2.17531 11.5442C0.993053 10.3917 1.64447 8.38578 3.27771 8.14933L8.07253 7.45093L10.2147 3.10866C10.946 1.63045 13.0537 1.63045 13.785 3.10866Z" fill="currentColor"/></svg>`);
icons.register("home", `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5258 0.204649C11.2291 -0.0682165 10.7709 -0.0682161 10.4742 0.204649L0.249923 9.68588C-0.266994 10.1612 0.0714693 11.0197 0.775759 11.0197L3.48971 11.0197V18.6923C3.48971 19.542 4.18295 20.2308 5.03811 20.2308H16.9619C17.8171 20.2308 18.5103 19.542 18.5103 18.6923V11.0197L21.2242 11.0197C21.9285 11.0197 22.267 10.1612 21.7501 9.68588L11.5258 0.204649Z" fill="currentColor"/></svg>`);
icons.register("copy", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11C2 11.7956 2.31607 12.5587 2.87868 13.1213C3.44129 13.6839 4.20435 14 5 14H11C11.7956 14 12.5587 13.6839 13.1213 13.1213C13.6839 12.5587 14 11.7956 14 11V8H11.75C10.7554 8 9.80161 7.60491 9.09835 6.90165C8.39509 6.19839 8 5.24456 8 4.25V2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V11Z" fill="currentColor"/><path d="M13.7975 6.49965C13.6881 6.25457 13.5357 6.03105 13.3475 5.83965L10.16 2.65965C9.96921 2.4688 9.74565 2.31384 9.5 2.20215V4.24965C9.5 4.54512 9.5582 4.8377 9.67127 5.11069C9.78434 5.38367 9.95008 5.63171 10.159 5.84064C10.3679 6.04957 10.616 6.2153 10.889 6.32838C11.1619 6.44145 11.4545 6.49965 11.75 6.49965H13.7975Z" fill="currentColor"/></svg>`);
icons.register("arrow", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9.3 5.3a1 1 0 0 0 0 1.4l5.29 5.3-5.3 5.3a1 1 0 1 0 1.42 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.42 0Z"></path></svg>`);
icons.register("back", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg)"><path d="M9.3 5.3a1 1 0 0 0 0 1.4l5.29 5.3-5.3 5.3a1 1 0 1 0 1.42 1.4l6-6a1 1 0 0 0 0-1.4l-6-6a1 1 0 0 0-1.42 0Z"></path></svg>`);

icons.register("replyIn", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M21.7 7.3a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L18.58 9H13a7 7 0 0 0-7 7v4a1 1 0 1 1-2 0v-4a9 9 0 0 1 9-9h5.59l-3.3-3.3a1 1 0 0 1 1.42-1.4l5 5Z"></path></svg>`);
icons.register("send", `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.2738 8.49222L1.99997 9.09877L0.349029 14.3788C0.250591 14.691 0.347154 15.0322 0.595581 15.246C0.843069 15.4597 1.19464 15.5047 1.48903 15.3613L15.2384 8.7032C15.5075 8.57195 15.6781 8.29914 15.6781 8.00007C15.6781 7.70101 15.5074 7.4282 15.2384 7.29694L1.49839 0.634063C1.20401 0.490625 0.852453 0.535625 0.604941 0.749376C0.356493 0.963128 0.259941 1.30344 0.358389 1.61563L2.00932 6.89563L8.27093 7.50312C8.52405 7.52843 8.71718 7.74125 8.71718 7.99531C8.71718 8.24938 8.52406 8.46218 8.27093 8.4875L8.2738 8.49222Z" fill="currentColor"></path></svg>`)

const navItems = [
    { label: "Home", path: "/", icon: "home" },
    { label: "Getting Started", path: "/getting-started", icon: "star" },

];

window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("eui-app-nav");
    if (nav) nav.navItems = navItems;

    router.navigate(window.location.pathname, false);
});