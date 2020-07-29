const glob = require('glob');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const proxyConfig = require('./proxy.config'); // 配置代理服务器，可以自定义cookie，因此能携带登录态调试任何主机服务
const entryConfigProd = require('./entry.config'); // 可以指定只编译一个或多个入口，减少内存爆仓
const entryConfigDev = require('./entry.config.dev');
const entryConfig = isProduction && entryConfigProd || entryConfigDev;

const PUBLIC_DIR = 'public';
const PAGES_DIR = 'pages';
const OUTPUT_DIR = 'dist';
const ENTRY_FILE = 'index.js';
// const PORT = '8080';

const pages = {};

(entryConfig.length && entryConfig || glob.sync(`./${PAGES_DIR}/**/${ENTRY_FILE}`)).forEach(entry => {
    const pageDir = entry.split(`/${PAGES_DIR}/`)[1].split(`/${ENTRY_FILE}`)[0];
    pages[`${pageDir}`] = {
        entry,
        template: `./${PUBLIC_DIR}/${pageDir}.html`,
        chunk: ['chunk-vendors', 'chunk-common', 'index'],
    };
});

const config = {
    transpileDependencies: ['strict-uri-encode'],
    outputDir: path.resolve(__dirname, `./${OUTPUT_DIR}`),
    publicPath: isProduction ? '${ctx}' : '.',
    devServer: {
        // port: PORT,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        socket: 'socket',
        // public: `localhost:${PORT}`,
        proxy: {
            '/': {
                ws: false,
                target: proxyConfig.server,
                onProxyReq: proxyReq => {
                    proxyConfig.headers && proxyConfig.headers.forEach(headerStr => {
                        const header = headerStr.split(':');
                        proxyReq.setHeader(header[0], header[1]);
                    });
                },
                onProxyRes: (proxyRes, req, res) => {
                    proxyRes.headers['x-request-cookie'] = req.headers.cookie;
                }
            },
        },
    }
};

config.pages = pages;

module.exports = config;
