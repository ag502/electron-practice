// DOM nodes
const items = document.getElementById("items");

// Track items in storage
exports.storage = JSON.parse(localStorage.getItem("readit-items")) || [];

// Listen from "done" message from reader window
window.addEventListener("message", (e) => {
  // Delete item at given index
});

// Get selected item index
exports.getSelectedItem = () => {
  // Get selected node
  const currentItem = document.getElementsByClassName("read-item selected")[0];

  // Get item index
  const itemIndex = 0;
  const child = currentItem;

  while ((child = child.previousElementSibling) !== null) itemIndex++;

  // Return selected item and index
  return { node: currentItem, index: itemIndex };
};

// Persis storage
exports.save = () => {
  localStorage.setItem("readit-items", JSON.stringify(this.storage));
};

// Set item as selected
exports.select = (e) => {
  // Remove currently selected item class
  document
    .getElementsByClassName("read-item selected")[0]
    .classList.remove("selected");

  // Add to clicked item
  e.currentTarget.classList.add("selected");
};

// Move to newly selected item
exports.changeSelection = (direction) => {
  // Get selected item
  const currentItem = document.getElementsByClassName("read-item selected")[0];

  // Handle up/down
  if (direction === "ArrowUp" && currentItem.previousElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.previousElementSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextElementSibling.classList.add("selected");
  }
};

// Open selected item
exports.open = () => {
  // Only if we have items (in case of menu open)
  if (!this.storage.length) return;

  // Get selected item
  const selectedItem = document.getElementsByClassName("read-item selected")[0];

  // Get item's url
  const contentURL = selectedItem.dataset.url;

  // Open item in proxy BrowswerWindow
  const readerWin = window.open(
    contentURL,
    "",
    `
    maxwidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor="#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );
};

// Add new item
exports.addItem = (item, isNew = false) => {
  // Create a new DOM node
  const itemNode = document.createElement("div");

  // Assign "read-item" class
  itemNode.setAttribute("class", "read-item");

  // Set item url as data attribute
  itemNode.setAttribute("data-url", item.url);

  // Add inner HTML
  itemNode.innerHTML = /* html */ `
    <img src="${item.screenshot}">
    <h2>
        ${item.title}
    </h2>
  `;

  // Append new node to "items"
  items.appendChild(itemNode);

  // Attach click handler to select
  itemNode.addEventListener("click", this.select);

  // Attach doubleclick handler to open
  itemNode.addEventListener("dblclick", this.open);

  // If this is the first item, select it
  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected");
  }

  // Add item to storage and persist
  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

// Add items from storage when app loads
this.storage.forEach((item) => {
  this.addItem(item);
});
