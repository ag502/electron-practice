// Modules
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    // to prevent flicker
    // backgroundColor: "#2b2e3b",
    // show: false,
  });

  // child window
  // secondaryWindow = new BrowserWindow({
  //   width: 600,
  //   height: 300,
  //   webPreferences: {
  //     // --- !! IMPORTANT !! ---
  //     // Disable 'contextIsolation' to allow 'nodeIntegration'
  //     // 'contextIsolation' defaults to "true" as from Electron v12
  //     contextIsolation: false,
  //     nodeIntegration: true,
  //   },
  //   parent: mainWindow,
  //   modal: true,
  //   show: false,
  // });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  // secondaryWindow.loadFile("secondary.html");

  // setTimeout(() => {
  //   secondaryWindow.show();
  //   setTimeout(() => {
  //     secondaryWindow.close();
  //     secondaryWindow = null;
  //   }, 3000);
  // }, 2000);

  // load outter url
  //   mainWindow.loadURL("https://naver.com");

  // show after load finish
  //   mainWindow.once("ready-to-show", mainWindow.show);

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // secondaryWindow.on("closed", () => {
  //   secondaryWindow = null;
  // });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
