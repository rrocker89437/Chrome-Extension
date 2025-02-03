import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://link-saver-app-4736c-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

//* Render Leads in Extension
function render(leads) {
  let listItems = "";
  let counter = 0;
  for (let i = 0; i < leads.length; i++) {
    counter++;
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <p data-counter="${counter}" class="remove-link">-</p>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

// Add a click event listener to the ulEl unordered list element.
ulEl.addEventListener("click", function (event) {
  // Check if the clicked element has the "remove-link" class.
  if (event.target.classList.contains("remove-link")) {
    // Find the closest parent <li> element.
    const listItem = event.target.closest("li");
    // Retrieve the URL from the <a> element within the <li>.
    const url = listItem.querySelector("a").getAttribute("href");
    // Find the index of the URL
    const linkRef = ref(database, `leads/${url}`); // Assuming the link is stored with its URL as key
    remove(linkRef)
      .then(() => {
        console.log("Link successfully deleted!");
        listItem.remove(); // Remove the list item from the DOM
      })
      .catch((error) => {
        console.error("Error removing link: ", error);
      });
  }
});

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

//* Delete All
deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

//* Save Input
inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
  console.log("Clicked");
});

//* Save Tab
// tabBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
//   });
// });
