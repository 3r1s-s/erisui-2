const BASE_PATH = '';

export const router = (() => {
    const routes = [];

    function add(path, renderFn) {
        const paramNames = [];
        const regexPath = path
            .replace(/:([^/]+)/g, (_, key) => {
                paramNames.push(key);
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');

        const regex = new RegExp(`^${BASE_PATH}${regexPath}$`);
        routes.push({ regex, paramNames, renderFn });
    }

    function match(path) {
        for (const { regex, paramNames, renderFn } of routes) {
            const match = path.match(regex);
            if (match) {
                const params = {};
                paramNames.forEach((name, i) => {
                    params[name] = decodeURIComponent(match[i + 1]);
                });
                return { renderFn, params };
            }
        }
        return null;
    }

    function navigate(path, push = true) {
        if (!path.startsWith(BASE_PATH)) {
            path = BASE_PATH + (path.startsWith('/') ? '' : '/') + path;
        }

        // Extract pathname for matching, ignoring query and hash for routing logic
        const pathname = path.split(/[?#]/)[0];

        // OPTIMIZATION: If same page and has hash, just scroll
        if (pathname === window.location.pathname && path.includes('#')) {
            if (push) history.pushState({}, '', path);
            const hash = '#' + path.split('#')[1];
            _scrollToHash(hash);
            return;
        }

        const result = match(pathname);


        // dont use window
        if (result) {
            if (push) history.pushState({}, '', path);
            result.renderFn(result.params);
            window.dispatchEvent(new CustomEvent('route-changed', { detail: { path } }));

            // Handle scrolling if there's a hash
            if (path.includes('#')) {
                const hash = '#' + path.split('#')[1];
                setTimeout(() => _scrollToHash(hash), 100);
            } else {
                const main = document.getElementById("main");
                if (main) main.scrollTo(0, 0);
            }
        } else if (notFoundHandler) {
            if (push) history.pushState({}, '', path);
            notFoundHandler();
        } else {
            console.warn(`No route found for ${pathname}`);
        }
    }

    function _scrollToHash(hash) {
        if (!hash) return;
        try {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (e) {
            console.warn('Invalid hash:', hash);
        }
    }

    let notFoundHandler = null;

    function setNotFound(fn) {
        notFoundHandler = fn;
    }

    function back() {
        history.back();
    }

    function location() {
        return window.location.pathname.replace(BASE_PATH, '') || '/';
    }

    window.addEventListener('popstate', () => {
        const path = window.location.pathname + window.location.search + window.location.hash;
        navigate(path, false);
    });

    window.addEventListener('click', (event) => {
        if (event.button !== 0) return;

        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;

        const link = event.target.closest('a');
        if (!link) return;

        if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;

        const href = link.getAttribute('href');
        if (!href) return;

        const isExternal = href.startsWith('http') && !href.startsWith(window.location.origin);
        if (isExternal) return;

        event.preventDefault();

        if (href.startsWith('#')) {
            history.pushState({}, '', href);
            _scrollToHash(href);
            return;
        }

        navigate(href);
    });

    return { add, navigate, back, location, setNotFound };
})();

export async function loadPage(path) {
    try {
        const main = document.getElementById("main");

        main.classList.add("fade-out");

        await new Promise(resolve => setTimeout(resolve, 200));

        const html = await fetch(`/src/pages/${path}.html`).then(r => r.text());
        main.innerHTML = html;

        main.classList.remove("fade-out");
        main.classList.add("fade-in");

        if (window.location.hash) {
            setTimeout(() => {
                try {
                    const el = document.querySelector(window.location.hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } catch (e) { }
            }, 100);
        } else {
            if (main) main.scrollTo(0, 0);
        }

        setTimeout(() => {
            main.classList.remove("fade-in");
        }, 200);

    } catch (err) {
        console.error("Page load failed:", err);
    }
}