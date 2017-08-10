const webpack = require("webpack");

module.exports = {
  devServer: {
    contentBase: "example",
    hot: true,
    noInfo: true,
    port: 5000,
    stats: {
      cached: false,
      colors: true
    }
  },
  devtool: "source-map",
  entry: "./example",
  module: {
    rules: [
      {
        include: /example|src/,
        loader: "awesome-typescript-loader",
        test: /\.tsx?$/
      }
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname,
    publicPath: "/"
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.ProvidePlugin({
      preact: "preact"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      jelms: __dirname + "/src/"
    },
    extensions: [".js", ".ts", ".tsx"]
  }
};
