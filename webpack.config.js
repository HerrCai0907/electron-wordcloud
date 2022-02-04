module.exports = {
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
