import webpack from "webpack"
import { IBuildOptions } from "../types/IBuildOptions"
import { buildResolvers } from "./buildResolvers"
import { buildPlugins } from "./buildPlugins"
import { buildLoaders } from "./buildLoaders"
import { buildDevServer } from "./buildDevServer"

export function buildConfig(options: IBuildOptions): webpack.Configuration {

  return {
    mode: options.mode,
    entry: options.paths.entry,
    output: {
      path: options.paths.build,
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: "/"
    },
    resolve: buildResolvers(options),
    module: {
      rules: buildLoaders(options),
    },
    plugins: buildPlugins(options),
    devtool: options.mode === "development" ? "inline-source-map" : undefined,
    devServer: options.mode === "development" ? buildDevServer(options) : undefined
  }
}