const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = require("./webpack.config");

const config = {
  entry: "./src/web/app.tsx",
  target: "electron-renderer",
  output: {
    path: path.resolve(__dirname, "./dist/web"),
    // publicPath: "/dist/",
    filename: "web.js",
    clean: true,
  },
  plugins: commonConfig.plugins.concat([
    new HtmlWebpackPlugin({
      title: "首页", //生成的页面标题<head><title>首页</title></head>
      filename: "index.html", // dist目录下生成的文件名
      template: "./src/web/index.html", // 我们原来的index.html，作为模板
    }),
  ]),
};

module.exports = Object.assign({}, commonConfig, config);
