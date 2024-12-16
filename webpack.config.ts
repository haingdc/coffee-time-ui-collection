import type webpack from "webpack";
import { resolve } from "node:path";

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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig-ts-loader.json",
          },
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { },
        }],
      },
      {
        test: /\.css$/, // Kiểm tra tệp CSS
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'], // Sử dụng loader để xử lý
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
