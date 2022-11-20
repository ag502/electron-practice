const { ipcRenderer } = require("electron");

let i = 1;
setInterval(() => {
  console.log(i++);
}, 1000);

document.getElementById("talk").addEventListener("click", () => {
  //   ipcRenderer.send("channel1", "Hello from Main Window");

  let response = ipcRenderer.sendSync("sync-message", "Waiting for response");

  console.log(response);
});

ipcRenderer.on("channel1-response", (e, args) => {
  console.log(args);
});

ipcRenderer.on("mailbox", (e, args) => {
  console.log(args);
});
