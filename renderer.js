// 새로운 버전에서 Main Process로 이동

const { desktopCapturer } = require("electron");

document.getElementById("screenshot-button").addEventListener("click", () => {
  desktopCapturer
    .getSources({
      types: ["screen"], // ["window"]
      thumbnailSize: { width: 1920, height: 1080 },
    })
    .then((sources) => {
      document.getElementById("screenshot").src =
        sources[0].thumbnail.toDataURL();
    });
});
