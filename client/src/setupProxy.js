const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api/*',
        createProxyMiddleware({
            changeOrigin: true,
            secure: false,
            target: 'http://localhost:5000'
        }));

    app.use('/graphql',
        createProxyMiddleware({
            changeOrigin: true,
            secure: false,
            target: 'http://localhost:5000'
        }));
}