import type webpack from "webpack";
import { resolve } from "node:path";

const __dirname = import.meta.dirname as string

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    index: "./src/index.ts",
  },
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      type: 'module',
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    modules: [
      resolve(__dirname, "src"),
      "node_modules",
    ],
    alias: {},
    extensions: [".js", ".jsx", ".json", ".css", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: "tsconfig-ts-loader.json",
            },
          },
          // {
          //   loader: "babel-loader",
          //   options: { },
          // }
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // The `injectType`  option can be avoided because it is default behaviour
          { loader: "style-loader", options: { injectType: "styleTag" } },
          {
            loader: "css-loader",
            // Uncomment it if you want to use CSS modules
            // options: { modules: true }
          },
        ],
      }, 
    ],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
    chunkIds: "named",
    splitChunks: false,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};

export default config;
