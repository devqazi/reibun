const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: __dirname + "/src/index.js",
  target: "web",
  output: {
    path: __dirname + "/public/js",
    filename: "dist.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            // cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BACKEND_BASE_URL: '"http://3.138.113.146:3000"',
    }),
  ],
  devtool: "eval",
  resolve: {
    extensions: [".js", ".json"],
  },
};
