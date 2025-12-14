import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                ...getHtmlEntries('src/pages')
            }
        }
    }
});

function getHtmlEntries(dir) {
    const entries = {};
    const fullDir = resolve(__dirname, dir);

    if (fs.existsSync(fullDir)) {
        const files = fs.readdirSync(fullDir);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                const name = path.basename(file, '.html');
                // Avoid naming collision if a page is named 'main' (though unlikely with index.html as main)
                entries[name === 'index' ? 'pages-index' : name] = resolve(fullDir, file);
            }
        });
    }
    return entries;
}
