/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");

    config.experiments = { asyncWebAssembly: true, ...config.experiments };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[modulehash].wasm",
      },
    });
    return config;
  },
};

export default config;
