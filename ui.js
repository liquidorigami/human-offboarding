let selectedAccessories = [];

// ─────────────────────────────────────────────────────────────
// Format accessory list
// ─────────────────────────────────────────────────────────────
export function formatAccessoryList(accessories) {
  return [...accessories].sort((a, b) => a.localeCompare(b));
}


// ─────────────────────────────────────────────────────────────
// Modal title logic
// ─────────────────────────────────────────────────────────────
export function getModalTitle(caseCount) {
  return caseCount % 5 === 0
    ? "Choose Your Next Set"
    : "Your Current Set";
}

// ─────────────────────────────────────────────────────────────
// Accessory selection tracking
// ─────────────────────────────────────────────────────────────
export function getSelectedAccessories() {
  return selectedAccessories;
}

// ─────────────────────────────────────────────────────────────
// Modal display logic with selection
// ─────────────────────────────────────────────────────────────
export function showAccessoryModal(pool) {
  const modal = document.getElementById("accessory-modal");
  const optionList = document.getElementById("accessory-modal-options");
  optionList.innerHTML = "";
  selectedAccessories = [];

  pool.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    li.addEventListener("click", () => {
      if (selectedAccessories.includes(item)) {
        selectedAccessories = selectedAccessories.filter(i => i !== item);
        li.classList.remove("selected");
      } else if (selectedAccessories.length < 3) {
        selectedAccessories.push(item);
        li.classList.add("selected");
      }
    });
    optionList.appendChild(li);
  });

  modal.style.display = "flex";
}

export function hideAccessoryModal() {
  const modal = document.getElementById("accessory-modal");
  modal.style.display = "none";
}

// ─────────────────────────────────────────────────────────────
// Tone label styling
// ─────────────────────────────────────────────────────────────
export const toneLabels = {
  PRO: "Professional",
  AWK: "Awkward",
  DAF: "Direct",
  LOL: "Funny",
  EH:  "Neutral"
};
