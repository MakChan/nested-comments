const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
  externals: [nodeExternals()],
  plugins: [new webpack.IgnorePlugin(/\.\/native/, /\/pg\//)]
};
