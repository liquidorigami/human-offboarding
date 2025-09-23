let selectedAccessories = [];

export function formatAccessoryList(accessories) {
  return [...accessories].sort((a, b) => a.localeCompare(b));
}

export function getSelectedAccessories() {
  return selectedAccessories;
}

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
      if (li.classList.contains("selected")) {
        li.classList.remove("selected");
        selectedAccessories = selectedAccessories.filter(i => i !== item);
      } else if (selectedAccessories.length < 3) {
        li.classList.add("selected");
        selectedAccessories.push(item);
      }
    });

    optionList.appendChild(li);
  });

  modal.style.display = "flex";
}

export function hideAccessoryModal() {
  document.getElementById("accessory-modal").style.display = "none";
}
