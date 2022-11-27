const { Menu, shell } = require("electron");

// Modeul function to create main app menu
module.exports = (appWin) => {
  // Menu template
  const template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add New",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            appWin.send("menu-show-modal");
          },
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            appWin.send("menu-open-item");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            appWin.send("menu-delete-item");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal("http://naver.com");
          },
        },
      ],
    },
  ];

  // Create Mac app menu
  if (process.platform === "darwin") template.unshift({ role: "appMenu" });

  // Build Menu
  const menu = Menu.buildFromTemplate(template);

  // Set ad main app menu
  Menu.setApplicationMenu(menu);
};
