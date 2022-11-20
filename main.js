// Modules
const { app, BrowserWindow, Menu, MenuItem } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// let mainMenu = new Menu();
// let mainMenu = new Menu.buildFromTemplate([
//   {
//     label: "Electron",
//     submenu: [
//       { label: "Item1" },
//       { label: "Item2", submenu: [{ label: "Sub Item1" }] },
//       { label: "Item3" },
//     ],
//   },
//   {
//     label: "Actions",
//     submenu: [{ label: "Action 1" }, { label: "Action 2" }],
//   },
// ]);

let mainMenu = new Menu.buildFromTemplate(require("./mainMenu"));

// let menuItem1 = new MenuItem({
//   label: "Electron",
//   submenu: [
//     { label: "Item1" },
//     { label: "Item2", submenu: [{ label: "Sub Item1" }] },
//     { label: "Item3" },
//   ],
// });

// mainMenu.append(menuItem1);

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

  Menu.setApplicationMenu(mainMenu);

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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
