// Modules
const { app, BrowserWindow } = require("electron");

setTimeout(() => {
  console.log("Checking ready: " + app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("before-quit", (e) => {
  console.log("App is quitting");
  e.preventDefault();
});

// Electron `app` is ready
app.on("ready", () => {
  console.log("App is ready!");
  console.log(app.getPath("desktop"));
  console.log(app.getPath("music"));
  console.log(app.getPath("userData"));
  createWindow();
});

app.on("browser-window-blur", (e) => {
  console.log("app unfocused");
  setTimeout(() => {
    app.quit();
  }, 3000);
});

app.on("browser-window-focus", () => {
  console.log("app focus");
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
