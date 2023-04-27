const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Add the HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      // Add the WebpackPwaManifest plugin and configure it
      new WebpackPwaManifest({
        name: "My PWA",
        short_name: "My PWA",
        description: "My Progressive Web App",
        start_url: ".",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: "maskable any",
          },
        ],
      }),
      // Add the GenerateSW plugin to generate the service worker
      new GenerateSW(),
      // Add the InjectManifest plugin to inject the manifest into the service worker
      new InjectManifest({
        swSrc: "./src/js/sw.js",
      }),
    ],

    module: {
      rules: [
        // Adding css loaders and babel to webpack:
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
