const CopyPlugin = require('copy-webpack-plugin');
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin([
      { from: 'public/', to: '../' },
      { from: 'dev/icon.png', to: '../icon16.png', force: true },
      { from: 'dev/icon.png', to: '../icon48.png', force: true },
      { from: 'dev/icon.png', to: '../icon128.png', force: true },
      { from: 'dev/icon-inactive.png', to: '../icon16-inactive.png', force: true },
      { from: 'dev/icon-inactive.png', to: '../icon48-inactive.png', force: true },
      { from: 'dev/icon-inactive.png', to: '../icon128-inactive.png', force: true },
    ]),
  ],
});
