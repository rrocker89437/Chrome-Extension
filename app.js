let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
});

function renderLeads() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

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
