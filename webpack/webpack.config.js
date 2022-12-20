const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // 虚拟路径 引入时使用 /virtual/bundle.js
    publicPath: "/virtual/",
  },
  devServer: {
    // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。。
    static: {
      directory: path.join(__dirname, "public"),
    },
    // 压缩
    compress: false,
    port: 9000,
    hot: true,
  },
    // source-map 方便进行调试
  devtool: "eval-source-map",
};

