const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const merge = require("webpack-merge")
const webpack = require("webpack")
const common = {
  devtool: "source-map",
  module: {
    rules: [
      {
        include: /examples|index.ts/,
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
    entry: "./index.ts",
    output: {
      filename: "index.js",
      library: "jelms",
      libraryTarget: "umd",
      sourceMapFilename: "index.js.map",
    },
    plugins: [new UglifyJSPlugin({ sourceMap: true })],
  })
} else {
  module.exports = merge(common, {
    devServer: {
      contentBase: "examples",
      hot: true,
    },
    entry: {
      counter: "./examples/counter",
      github: "./examples/github",
    },
    output: {
      filename: "[name]/app.js",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  })
}
