console.log("Controller loaded");
console.log("Ready button clicked");

// Imports
import { setZodiacSign } from "./gamestate.js";
import { incrementCaseCount, getCaseCount, recordSelections } from "./gamestate.js";
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

function showError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "block";
  setTimeout(() => {
    el.style.display = "none";
  }, 500);
}

// Ready Button Logic
console.log("Ready button clicked");

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

// Case Setup
function setupCase() {
  incrementCaseCount();
  const currentCase = getCaseCount();

  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("human-number").textContent = humanNumber;

  const lines = getStarterOpeningLineSet(currentCase); 
  renderLines(lines);
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

//  Rendering
function renderLines(lines) {
  const lineList = document.getElementById("opening-line-options");
  lineList.innerHTML = "";
  lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line.line;
    li.classList.add("option");
    li.addEventListener("click", () => {
      currentLine = line.line;
      li.classList.toggle("selected");
    });
    lineList.appendChild(li);
  });
}

function renderAccessories(accessories) {
  const accessoryList = document.getElementById("accessory-options");
  accessoryList.innerHTML = "";
  accessories.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    li.addEventListener("click", () => {
      currentAccessory = item;
      li.classList.toggle("selected");
    });
    accessoryList.appendChild(li);
  });
}


// MassOffboard logic
let massClicks = 0;

document.getElementById("mass-offboard-btn").addEventListener("click", () => {
  const caseCount = getCaseCount();
  if (caseCount < 8) return showError("error-mass");
  if (massClicks >= 2) return showError("error-exhausted");
  massClicks++;

  // Trigger mass offboarding
  incrementCaseCount();
  const newCase = getCaseCount();

  const humanNumber = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("human-number").textContent = humanNumber;

  const lines = getStarterOpeningLineSet(newCase);
  renderLines(lines);

  const accessories = getStarterAccessorySet(newCase);
  renderAccessories(formatAccessoryList(accessories));
});

