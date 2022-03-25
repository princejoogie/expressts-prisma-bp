const { build } = require("esbuild");

const options = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["./node_modules/*"],
  minify: true,
  outdir: "dist",
  platform: "node",
  treeShaking: true,
};

build(options).then(console.log).catch(console.error);
