import { IBuildOptions } from "../types/IBuildOptions";
import webpack from "webpack";

export function buildResolvers(options: IBuildOptions): webpack.ResolveOptions {
  return {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [options.paths.src, "node_modules"],
    preferAbsolute: true,
    mainFiles: ["index"],
    alias: {}
  }
}