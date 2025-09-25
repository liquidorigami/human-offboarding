let selectedAccessories = [];

// Format accessory list alphabetically
export function formatAccessoryList(accessories) {
  return [...accessories].sort((a, b) => a.localeCompare(b));
}

// Return selected accessories from modal
export function getSelectedAccessories() {
  return selectedAccessories;
}

// Show accessory modal with selectable items
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

// Hide accessory modal
export function hideAccessoryModal() {
  document.getElementById("accessory-modal").style.display = "none";
}

// Scoreboard pagination

let currentPage = 0;
const scoresPerPage = 5;

const SCORE_TABLE_ID = "score-table-body";

export function renderScoreboard(scores) {
  const start = currentPage * scoresPerPage;
  const end = start + scoresPerPage;
  const visibleScores = scores.slice(start, end);
  const tableBody = document.getElementById(SCORE_TABLE_ID);

  tableBody.innerHTML = ""; // Clear previous rows
  visibleScores.forEach(score => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${score.name}</td><td>${score.points}</td>`;
    tableBody.appendChild(row);
  });

  updatePaginationControls(scores.length); // Make sure this function exists
}

export function nextPage(scores) {
  const maxPage = Math.floor(scores.length / scoresPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderScoreboard(scores);
  }
}

export function prevPage(scores) {
  if (currentPage > 0) {
    currentPage--;
    renderScoreboard(scores);
  }
}
