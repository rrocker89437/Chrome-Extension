let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const list = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//* Save Leads in local storage
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//* Render Leads in Extension
function render(leads) {
  let listItems = "";
  let counter = 0;
  for (let i = 0; i < leads.length; i++) {
    counter++;
    listItems += `
            <li class="draggable" draggable="true">
                <a draggable="true" target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <p data-counter="${counter}" class="remove-link">-</p>
            </li>
        `;
  }
  list.innerHTML = listItems; // Re-add event listeners after rendering
}

// Add a click event listener to the list unordered list element.
list.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-link")) {
    const listItem = event.target.closest("li");
    const url = listItem.querySelector("a").getAttribute("href");
    const index = myLeads.indexOf(url);
    if (index !== -1) {
      myLeads.splice(index, 1);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      listItem.remove();
    }
  }
});

// Remove Link
function removeLink(counter) {
  const listItem = document.getElementsByClassName(`remove-link-${counter}`);
  if (listItem) {
    const parent = listItem.parentNode;
    if (parent) {
      const url = parent.querySelector("a")?.getAttribute("href");
      const index = myLeads.indexOf(url);
      if (index !== -1) {
        myLeads.splice(index, 1);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
      }
      parent.remove();
    }
  }
}

//* Delete All
deleteBtn.addEventListener("dblclick", function () {
  // remove(referenceInDB);
  // list.innerHTML = "";
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

//* Save Input
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  inputEl.value = "";
});

//* Save Tab
// tabBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
//   });
// });

//* Drag and Drop Functions
let draggedItem = null;

document.querySelectorAll(".draggable").forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    draggedItem = item;
    item.classList.add("dragging");
    setTimeout(() => (item.style.display = "none"), 0);
  });

  item.addEventListener("dragend", (e) => {
    item.classList.remove("dragging");
    item.style.display = "flex";
    draggedItem = null;
  });
});

list.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggedItem);
  } else {
    list.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Prevent remove button from interfering with drag
document.querySelectorAll(".remove-link").forEach((btn) => {
  btn.addEventListener("mousedown", (e) => e.stopPropagation());
});
