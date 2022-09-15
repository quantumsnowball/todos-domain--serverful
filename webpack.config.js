// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const dotenv = require('dotenv')


dotenv.config()


const isProduction = process.env.NODE_ENV == "production";
const port_client = process.env.PORT_CLIENT
const port_server = process.env.PORT_SERVER
const stylesHandler = "style-loader";


const config = {
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: port_client,
    proxy: {
      '/api': {
        target: `http://localhost:${port_server}`,
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
        options: {
          configFile: 'src/client/tsconfig.json'
        }
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
