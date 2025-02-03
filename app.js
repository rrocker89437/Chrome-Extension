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
  // databaseURL: process.env.DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

// console.log(firebaseConfig.databaseURL);

// let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
// const tabBtn = document.getElementById("tab-btn");
// const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Save Leads in local Storage
// if (leadsFromLocalStorage) {
//   myLeads = leadsFromLocalStorage;
//   render(myLeads);
// }

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
    // Find the index of the URL within the myLeads array.
    // const index = myLeads.indexOf(url);
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
  // If the URL is found, remove it from the array, update local storage, and remove the list item from the DOM.
  // if (index !== -1) {
  // referenceInDB.splice(index, 1);
  // localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // listItem.remove();
  // remove(referenceInDB);
  // }
});

// *Remove link
// function removeLink(counter) {
//   const listItem = document.getElementsByClassName(`remove-link-${counter}`);
//   if (listItem) {
//     const parent = listItem.parentNode;
//     if (parent) {
//       const url = parent.querySelector("a")?.getAttribute("href");
//       // const index = myLeads.indexOf(url);
//       const index = referenceInDB.indexOf(url);
//       if (index !== -1) {
//         // myLeads.splice(index, 1);
//         inputEl.value.splice(index, 1);
//         // localStorage.setItem("myLeads", JSON.stringify(myLeads));
//       }
//       parent.remove(referenceInDB);
//     }
//   }
// }

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
  // localStorage.clear();
  // myLeads = [];
  // render(myLeads);
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

//* Save Input
inputBtn.addEventListener("click", function () {
  // myLeads.push(inputEl.value);
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
  console.log("Clicked");
  // localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // render(myLeads);
});

//* Save Tab
// tabBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
//   });
// });

// -----------------------------------------------------------

// function renderLeads() {
// Create a variable, listItems
//  let listItems = ""

// Log out the items using a for loop
//   for (let i = 1; i < myLeads.length; i++) {
// Render the leads using ulEl.innerHTML
//   ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
//-----------------------------------------------
// Add the item to the listItems variable instead of the ulEl.innerHTML
// listItems += "<li>" + myLeads[i] + "</li>";
//-----------------------------------------------
//}
//     ulEl.innerHTML = listItems
// }

//-----------------------------------------------

// store leads in local storage
// let myLeads = `["www.awesomelead.com"]`;

// 1. Turn the myLeads string into an array
// myLeads = JSON.parse(myLeads);
// 2. Push a new value to the array
// myLeads.push("www.lead2.com");
// 3. Turn the array into a string again
// myLeads = JSON.stringify(myLeads);
// 4. Console.log the string using typeof to verify that it's a string
// console.log(typeof myLeads);

// localStorage.clear();
// let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// localStorage.setItem("myLeads", JSON.stringify(myLeads));
//-----------------------------------------------

//Parameters
// function greetUser(greeting, name) {
//   welcomeEl.textContent = `${greeting}, ${name} 👋`;
// }
//Arguments
// greetUser("Howdy", "James");

// function add(num1, num2) {
//   return num1 + num2;
// }
// add(3, 4);
//-----------------------------------------------

// Create a function, getFirst(arr), that returns the first item in the array
// function getFirst(arr) {
//   return arr[0];
// }
// let f
// console.log(firstCard);
//-----------------------------------------------

// let myCourses = [
//   "Learn CSS Animations",
//   "UI Design Fundamentals",
//   "Intro to Clean Code",
// ];

// Create a function that takes a single parameter, an array,
// and logs all the items of the array to the console.
// Call the function while passing in myCourses as an argument

// function logItems(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
//   }
// }

// logItems(myCourses);
