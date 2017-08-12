const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const merge = require("webpack-merge")
const webpack = require("webpack")
const common = {
  devtool: "source-map",
  module: {
    rules: [
      {
        include: /example|src/,
        loader: "awesome-typescript-loader",
        test: /\.tsx?$/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
}

if (process.env.npm_lifecycle_event === "build") {
  module.exports = merge(common, {
    entry: "./src",
    output: {
      filename: "jelms.js",
      path: __dirname + "/dist",
      sourceMapFilename: "jelms.js.map",
    },
    plugins: [new UglifyJSPlugin({ sourceMap: true })],
  })
} else {
  module.exports = merge(common, {
    devServer: {
      contentBase: "example",
      hot: true,
    },
    entry: "./example",
    output: {
      filename: "app.js",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  })
}
