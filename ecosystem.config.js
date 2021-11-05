module.exports = {
  apps: [{
    script: "server/index.js",
    instances: "4",
    exec_mode: "cluster"
  }]
}