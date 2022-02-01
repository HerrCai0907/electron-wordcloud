const path = require("path");

const commonConfig = require("./webpack.config");

const config = {
  entry: "./src/main/index.ts",
  target: "electron-main",
  output: {
    path: path.resolve(__dirname, "./dist/main/"),
    // publicPath: "/dist/",
    filename: "main.js",
    clean: true,
  },
  externals: {
    nodejieba: "commonjs nodejieba",
  },
};

module.exports = Object.assign({}, commonConfig, config);
