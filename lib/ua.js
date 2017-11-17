// Native
const os = require("os");

// Ours
const { version } = 1.2;//require("./pkg");

module.exports = `now ${version} node-${process.version} ${os.platform()} (${os.arch()})`;
