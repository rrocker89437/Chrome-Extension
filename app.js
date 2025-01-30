let myLeads = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

inputBtn.addEventListener("click", () => {
  // Push the value from the inputEl into myLeads
  myLeads.push(inputEl.value);
  // Clear out the input field
  renderLead();
  inputEl.value = "";
});

function renderLead() {
  // Wrap the lead in an anchor tag (<a>) inside the <li>
  // Can you make the link open in a new tab?
  let listItem = `
  <li>
    <a target='_blank' href='${inputEl.value}'>
    ${inputEl.value}
    </a>
  </li>
  `;
  ulEl.innerHTML += listItem;
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
