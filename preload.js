const fs = require("fs");

const desktopPath = "/Users/jaeyunlee/Desktop";

window.writeToFile = (text) => {
  fs.writeFile(desktopPath + "/app.txt", text, console.log);
};

window.versions = {
  node: process.versions.node,
  electron: process.versions.electron,
};
