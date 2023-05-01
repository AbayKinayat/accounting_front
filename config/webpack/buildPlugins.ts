import { WebpackPluginInstance } from "webpack";
import { IBuildOptions } from "../types/IBuildOptions";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin"

export function buildPlugins(options: IBuildOptions): WebpackPluginInstance[] {
  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      title: "Accounting",
      template: options.paths.html
    })
  ]

  if (options.mode !== "development")
    plugins.push(new MiniCssExtractPlugin({
      filename: "style.[contenthash:8].css"
    }))

  return plugins
}