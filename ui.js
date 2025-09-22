// ─────────────────────────────────────────────────────────────
// Format accessory list
// ─────────────────────────────────────────────────────────────
export function formatAccessoryList(accessories) {
  return sortAccessoriesAlphabetically(accessories).map(a => a.item);
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
// Tone label styling
// ─────────────────────────────────────────────────────────────
export const toneLabels = {
  PRO: "Professional",
  AWK: "Awkward",
  DAF: "Direct",
  LOL: "Funny",
  EH:  "Neutral"
};

// ─────────────────────────────────────────────────────────────
// Modal display logic
// ─────────────────────────────────────────────────────────────
export function showAccessoryModal(accessoryList) {
  const modal = document.getElementById("accessory-modal");
  const optionList = document.getElementById("accessory-modal-options");
  optionList.innerHTML = "";

  accessoryList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("option");
    optionList.appendChild(li);
  });

  modal.style.display = "flex";
}

export function hideAccessoryModal() {
  const modal = document.getElementById("accessory-modal");
  modal.style.display = "none";
}
