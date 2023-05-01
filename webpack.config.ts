import { IBuildEnv } from "./config/types/IBuildEnv";
import { IBuildPaths } from "./config/types/IBuildPaths";
import { buildConfig } from "./config/webpack/buildConfig";
import path from "path";

export default (env: IBuildEnv) => {

  const mode = env.mode || "development";
  const port = env.port || 3000;

  const paths: IBuildPaths = {
    build: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  }

  return buildConfig({
    mode,
    port, 
    paths
  });
}