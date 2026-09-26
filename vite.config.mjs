import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { createLogger, defineConfig } from 'vite';

const logger = createLogger();
const originalWarnOnce = logger.warnOnce;

logger.warnOnce = (/** @type string */ message, /** @type {any} */ options) => {
    // ignore warnings about images/fonts not resolving
    if (message.includes("didn't resolve at build time")) {
        if (message.includes('/images/') || message.includes('/webfonts/')) return;
    }
    originalWarnOnce(message, options);
};

export default defineConfig({
    customLogger: logger,
    css: {
        preprocessorOptions: {
            // I need these deprecations because bs5 hasn't updated their deprecations yet
            scss: {
                quietDeps: true,
                silenceDeprecations: ['import', 'legacy-js-api'],
            },
        },
    },
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/app.scss', 'resources/js/app.ts'],
            refresh: true,
        }),
    ],
    build: {
        chunkSizeWarningLimit: 1024,
        rolldownOptions: {
            checks: {
                pluginTimings: false
            }
        },
        minify: false
    },
    server: {
        cors: true,
        // proxy images and fonts through to the dev server, I don't want these in the vite bundle.
        proxy: {
            '/webfonts': 'http://snarkpit',
            '/images': 'http://snarkpit',
        },
    },
});
