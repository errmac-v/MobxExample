/* global require */

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  port: 8080,
  host: '0.0.0.0',
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  noInfo: false,
  quiet: false,
  compress: true,
  stats: { colors: true },
  open: false,
  hot: true,
  inline: true,
  https: true,
  proxy: [
    {
      context: ['/api/*'],
      target: isDev ? 'dev-stage-url' : 'live-stage-url',
      secure: false,
    },
  ],
};
