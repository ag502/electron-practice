const { ipcRenderer } = require("electron");
const items = require("./items");

// Dom Nodes
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const addItem = document.getElementById("add-item");
const itemUrl = document.getElementById("url");
const search = document.getElementById("search");

ipcRenderer.on("menu-show-modal", () => {
  showModal.click();
});

ipcRenderer.on("menu-open-item", () => {
  items.open();
});

ipcRenderer.on("menu-delet-item", () => {
  // delete
});

// Filter items with "search"
search.addEventListener("keyup", (e) => {
  // Loop items
  Array.from(document.getElementsByClassName("read-item")).forEach((item) => {
    // Hide items that don't match search value
    const hasMatch = item.innerText.toLowerCase().includes(search.value);
    item.style.display = hasMatch ? "flex" : "none";
  });
});

// Navigate item selection with up/down arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    items.changeSelection(e.key);
  }
});

// Diable $ Enable modal buttons
const toggleModalButtons = () => {
  // Check state of buttons
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding...";
    closeModal.style.display = "none";
  }
};

// Show modal
showModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
  itemUrl.focus();
});

// Hide modal
closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

// Handle new item
addItem.addEventListener("click", (e) => {
  // Check a url exist
  if (itemUrl.value) {
    // Send new item url to main process
    ipcRenderer.send("new-item", itemUrl.value);
    toggleModalButtons();
  }
});

// Listen for new item from main process
ipcRenderer.on("new-item-success", (e, newItem) => {
  // Add new item to "items" node
  items.addItem(newItem, true);

  // Enable button
  toggleModalButtons();
  closeModal.click();
});

// Listen for keyboard submit
itemUrl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});
