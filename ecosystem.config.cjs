module.exports = {
  apps: [
    {
      name: "foldable",
      script: "./scripts/serve.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        PORT: 3040
      }
    }
  ]
};
