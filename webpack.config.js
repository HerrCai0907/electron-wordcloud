const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader", // 可以把css放在页面上
          },
          {
            loader: "css-loader", // 放在后面的先被解析
          },
        ],
      },
      {
        test: /(\.ttf|\.utf8|(pdf\.worker\.min\.js))/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  plugins: [],
};

const mainConfig = {
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

const webConfig = {
  entry: "./src/web/index.tsx",
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

module.exports = [Object.assign({}, commonConfig, mainConfig), Object.assign({}, commonConfig, webConfig)];
