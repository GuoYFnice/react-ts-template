const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxySetting = require('../../src/setProxy.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    // * 终端仅打印 error.
    stats: 'errors-only',
    // * 日志等级。
    clientLogLevel: 'silent',
    // * gzip 压缩。
    compress: true,
    open: true,
    // * 热更新。
    hot: true,
    proxy: { ...proxySetting }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
