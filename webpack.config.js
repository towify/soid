// webpack.config.js
const path = require('path');
module.exports = {
  mode:"production",
  entry: {
    app: './app/main.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "MA",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: [path.resolve(__dirname, "node_modules")]
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
};