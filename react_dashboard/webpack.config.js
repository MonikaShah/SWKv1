const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./../swk/static/react_dashboard"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
          test:/\.css$/,
          use:['style-loader','css-loader']
      },{
          test:/\.(png|jpe?g|gif)$/i,
          use:['file-loader']
      },{
        test:/\.svg$/,
        use:['svg-url-loader']
      }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};