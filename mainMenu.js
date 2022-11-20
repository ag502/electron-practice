module.exports = [
  {
    label: "Electron",
    submenu: [
      { label: "Item1" },
      { label: "Item2", submenu: [{ label: "Sub Item1" }] },
      { label: "Item3" },
    ],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { role: "copy" },
      { role: "paste" },
    ],
  },
  {
    label: "Actions",
    submenu: [
      { label: "DevTools", role: "toggleDevTools" },
      { role: "toggleFullScreen" },
      {
        label: "Action 3",
        click: () => {
          console.log("Hello from Main Menu");
        },
        accelerator: "Shift+Alt+G",
      },
    ],
  },
];
