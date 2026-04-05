// scripts/build-server.js
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/server.ts"], // ✅ your entry file
    bundle: true,
    outdir: "dist",
    format: "cjs", // or 'cjs' if you're not using ESM
    platform: "node",
    target: "node20", // Adjust based on your Node version
    sourcemap: true,
    outExtension: { ".js": ".cjs" }, // Ensures .js extension,
    external: ["webpack", "webpack/*", "next", "next/*"],
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
    },
    tsconfig: "tsconfig.server.json",
  })
  .catch(() => process.exit(1));
