const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:8888/restchain_war_exploded',
            pathRewrite: {
                '^/api': '/rest',
            },
            changeOrigin: true,
            logLevel: 'debug',
        }),
    );
    app.use(
        '/api2',
        proxy({
            target: 'http://localhost:8085/',
            pathRewrite: {
                '^/api2': '/',
            },
            changeOrigin: false,
            logLevel: 'debug',
        })
    );


};
