/* global module */
/* global require */

// eslint-disable-next-line import/no-dynamic-require,global-require
const buildConfig = env => require(`./config/webpack.${env.mode}.js`)(env);

module.exports = buildConfig;
