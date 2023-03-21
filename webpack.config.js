const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: "main.css",
  })],
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
  ],
  }
};
