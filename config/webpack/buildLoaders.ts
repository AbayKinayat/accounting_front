import { RuleSetRule } from "webpack";
import { IBuildOptions } from "../types/IBuildOptions";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(options: IBuildOptions): RuleSetRule[]  {

  const cssLoader = {
    test: /\.(s*)css$/,
    use: [
      options.mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader"
    ]
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    tsLoader,
    cssLoader,
  ]
}