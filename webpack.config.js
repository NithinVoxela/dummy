const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const devEnvironments = ["local"];
const prod = !devEnvironments.includes(process.env.NODE_ENV);

const IndexHTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: "index.html",
  filename: "index.html",
  chunks: ["index"],
  favicon: "favicon.ico",
  inject: true,
});

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production"),
});

const CircularDependencyPluginConfig = new CircularDependencyPlugin({
  exclude: /a\.js|node_modules/,
  failOnError: true,
  cwd: process.cwd(),
});

let CopyWebpackPluginConfig;
if (process.env.NODE_ENV === "local") {
  CopyWebpackPluginConfig = new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, `/config/environments/config.local.json`),
        to: path.join(__dirname, "/build/config.json"),
      },
    ],
  });
}

// const CopyWebpackPluginMessages = new CopyWebpackPlugin({
//   patterns: [
//     {
//       from: path.join(__dirname, `src/services/translation/messages.json`),
//       to: path.join(__dirname, "/build/messages.json"),
//     },
//   ],
// });
const CopyCriticalPathAssetsConfig = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join(__dirname, `src/style.css`),
      to: path.join(__dirname, "/build/style.css"),
    },
    {
      from: path.join(__dirname, "src/assets/icons/loader.svg"),
      to: path.join(__dirname, "/build/loading.svg"),
    },
    {
      from: path.join(__dirname, `src/services/translation/locale/`),
      to: path.join(__dirname, "/build/locale/"),
    },
    {
      from: path.join(__dirname, `firebase-messaging-sw.js`),
      to: path.join(__dirname, "/build/firebase-messaging-sw.js"),
    },
    {
      from: path.join(__dirname, `config/environments/config.${process.env.NODE_ENV === "production" ? 'prod' : 'local'}.json`),
      to: path.join(__dirname, "/build/config.json"),
    },
  ],
});

module.exports = {
  devServer: {
    host: "localhost",
    port: "3001",
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    disableHostCheck: true,
    stats: { children: false },
  },
  entry: {
    index: path.join(__dirname, "/src/index.tsx"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              camelCase: true,
              localIdentName: "[contenthash:base64:5][path]-[local]",
            },
          },
          { loader: "resolve-url-loader" },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/i,
        loader: "url-loader",
        exclude: [/\.component\.svg$/],
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.component\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
      {
        test: /\.woff$|\.ttf$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      'react-dom': prod ? 'react-dom' : '@hot-loader/react-dom',
      assets: path.join(__dirname, 'src', 'assets'),
      components: path.join(__dirname, 'src', 'components'),
      containers: path.join(__dirname, 'src', 'containers'),
      configs: path.join(__dirname, 'src', 'configs'),
      actions: path.join(__dirname, 'src', 'store', 'actions'),
      reducers: path.join(__dirname, 'src', 'store', 'reducers'),
      sagas: path.join(__dirname, 'src', 'store', 'sagas'),
      selectors: path.join(__dirname, 'src', 'store', 'selectors'),
      services: path.join(__dirname, 'src', 'services'),
      store: path.join(__dirname, 'src', 'store'),
      models: path.join(__dirname, 'src', 'models'),
      src: path.join(__dirname, 'src'),
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "/build"),
    publicPath: "/",
  },
  mode: prod ? "production" : "development",
  plugins: prod
    ? [
      IndexHTMLWebpackPluginConfig,
      DefinePluginConfig,
      CopyCriticalPathAssetsConfig,
    ]
    : [
      IndexHTMLWebpackPluginConfig,
      CopyWebpackPluginConfig,      
      CircularDependencyPluginConfig,
      CopyCriticalPathAssetsConfig,
      new webpack.HotModuleReplacementPlugin(),
    ],
};