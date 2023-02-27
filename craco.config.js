const path = require('path');

module.exports = {
    webpack: {
        // configure: (webpackConfig, { env, paths }) => {
        //     webpackConfig.alias = path.join(path.resolve(__dirname, './src'));
        //     return webpackConfig;
        // },
        alias: {
            '@': path.join(path.resolve(__dirname, './src')),
        }
    },
};