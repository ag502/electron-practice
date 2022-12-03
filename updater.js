const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// Configure log debugging
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

// Disable auto downloading of updates
autoUpdater.autoDownload = false;

module.exports = () => {
  // Check for update (GH release)
  autoUpdater.checkForUpdates();

  // Listen for update found
  autoUpdater.on("update-available", () => {
    // Prompt user to start download
    dialog
      .showMessageBox({
        type: "info",
        title: "Update available",
        message:
          "A new version of Readit is available. Do you want to update now?",
        buttons: ["Update", "No"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      });
  });

  // Listen for update downloaded
  autoUpdater.on("update-downloaded", () => {
    // Prompt the user to install the update
    dialog
      .showMessageBox({
        type: "info",
        title: "Update ready",
        message: "Install & restart now",
        buttons: ["Yes", "Later"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
      });
  });
};
