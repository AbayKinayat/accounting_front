import { IBuildPaths } from "./IBuildPaths";

export interface IBuildOptions {
  mode: "development" | "production",
  port: number,
  paths: IBuildPaths
}