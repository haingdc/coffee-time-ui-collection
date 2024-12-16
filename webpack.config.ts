import webpack from "webpack";
import { resolve } from "node:path";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
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
        use: [{
          loader: "babel-loader",
          options: { },
        }],
      },
      {
        test: /\.css$/, // Kiểm tra tệp CSS
        use: ['style-loader', 'css-loader'], // Sử dụng loader để xử lý
      },
    ],
  },
};

export default config;
