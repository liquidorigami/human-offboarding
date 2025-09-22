console.log("Controller loaded");

// Imports
import { setZodiacSign, incrementCaseCount, getCaseCount, recordSelections } from "./gamestate.js";
import { getStarterOpeningLineSet } from "./lines.js";
import { getStarterAccessorySet, getAccessorySelectionPool } from "./accessories.js";
import {
  formatAccessoryList,
  showAccessoryModal,
  hideAccessoryModal,
  getSelectedAccessories
} from "./ui.js";

// DOM Helpers
function showMainScreen() {
  document.getElementById("main-screen").style.display = "block";
}

function hideIntroScreen() {
  document.getElementById("intro-screen").style.display = "none";
}

// Ready Button Logic
document.getElementById("ready-btn")?.addEventListener("click", () => {
  const select = document.getElementById("zodiac-select");
  const selected = select.value;

  if (!selected) {
    console.warn("No zodiac selected");
    return;
  }

  setZodiacSign(selected);
  hideIntroScreen();
  showMainScreen();
  setupCase();
});

// Placeholder: Case Setup
function setupCase() {
  incrementCaseCount();
  const currentCase = getCaseCount();

  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("human-number").textContent = humanNumber;

  const lines = getStarterOpeningLineSet(currentCase);
  const lineList = document.getElementById("opening-line-options");
  lineList.innerHTML = "";
  lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line.line;
    li.classList.add("option");
    lineList.appendChild(li);
  });

  if (currentCase % 5 === 0) {
    const pool = getAccessorySelectionPool();
    showAccessoryModal(pool);
  } else {
    const accessories = getStarterAccessorySet(currentCase);
    renderAccessories(formatAccessoryList(accessories));
  }
}

// Accessory Rendering
function renderAccessories(accessories) {
  const accessoryList = document.getElementById("accessory-options");
  accessoryList.innerHTML = "";
  accessories.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    accessoryList.appendChild(li);
  });
}

// Modal Confirm Logic
document.getElementById("confirm-modal").addEventListener("click", () => {
  const selected = getSelectedAccessories();
  if (selected.length === 3) {
    hideAccessoryModal();
    renderAccessories(selected);
    recordSelections({ accessory: selected });
  } else {
    alert("Please select exactly 3 accessories.");
  }
});
