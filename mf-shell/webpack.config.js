const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",

  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },

  output: {
    publicPath: "/",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        characters: `characters@${process.env.CHARACTERS_URL || "http://localhost:3001"}/remoteEntry.js`,
        characterDetail: `characterDetail@${process.env.CHARACTER_DETAIL_URL || "http://localhost:3002"}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.2.0",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^6.0.0",
        },
      },
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
  ],
};
