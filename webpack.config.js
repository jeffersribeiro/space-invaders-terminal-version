const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[path][name].[ext]", // Keeps the original file structure in the dist/assets folder
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map", // Optional: to generate source maps for debugging
  devServer: {
    compress: true,
    port: 9000, // The server will run on this port
    open: true, // Automatically opens the browser
    historyApiFallback: true, // Returns index.html even for different URLs
  },
  mode: "development", // Use 'production' for optimizations
};
