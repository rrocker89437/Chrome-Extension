let myLeads = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

inputBtn.addEventListener("click", () => {
  //   console.log("Button Clicked");
  // Push the value from the inputEl into myLeads
  myLeads.push(inputEl.value);
  renderLeads();
});

function renderLeads() {
  // Create a variable, listItems
  let listItems = "";

  // Log out the items using a for loop
  for (let i = 1; i < myLeads.length; i++) {
    // Render the leads using ulEl.textContent
    //   ulEl.textContent = myLeads[i] + " ";
    //-----------------------------------------------
    // Replace .textContent with .innerHTML and use <li> tags
    //   ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
    //-----------------------------------------------
    // Add the item to the listItems variable instead of the ulEl.innerHTML
    listItems += "<li>" + myLeads[i] + "</li>";
    //-----------------------------------------------
    // create element
    //   const li = document.createElement("li");
    // set text content
    //   li.textContent = myLeads[i];
    // append to ul
    //   ulEl.append(li);
  }
  // Render the listItems inside the unordered list using ulEl.innerHTML
  ulEl.innerHTML = listItems;
}
