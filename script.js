// ! for feather icon

feather.replace();

// ! Expense tracker working

// ! Elements of the group

let expensePopup = document.getElementById("expense-popup");
let crossIcon = document.getElementById("cross");
let expenseTitle = document.getElementById("title");
let expenseAmount = document.getElementById("amount");
let expenseDate = document.getElementById("date");
let submit = document.getElementById("submit");

// ! Elements of the landing page

let expenseContainer = document.getElementById("expense-container");
let entryButton = document.getElementById("expense-entry-button");
let totalAmount = document.getElementById("expense-total");
let expenseList = document.querySelector(".expense-list");

// ! Working of the popup view

entryButton.addEventListener("click", function () {
  expensePopup.classList.remove("hide");
  expenseContainer.style.opacity = "0.5";
});

crossIcon.addEventListener("click", function () {
  expensePopup.classList.add("hide");
  expenseContainer.style.opacity = "1";
});

// ! Form functionality

let expenseForm = document.querySelector("form");

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let title = expenseTitle.value;
  let amount = expenseAmount.value;
  let rawDate = expenseDate.value;

  let formattedDate = moment(rawDate).format("MM/DD/YY");

  let expenseData = {
    title: title,
    amount: amount,
    date: formattedDate,
  };

  //   ! create a new list item

  let newExpenseItem = document.createElement("li");

  newExpenseItem.classList.add("expense");

  //   ! create inner HTML for the new list item

  newExpenseItem.innerHTML = `
  <div class="expense-details">
    <p class="expense-title">${expenseData.title}</p>
    <p class= "expense-date">${expenseData.date}</p>
   </div>
   <p class="expense-amount">- Rs.${(expenseData, amount)}</p> 
  `;

  // ! append the list item to the ul

  expenseList.appendChild(newExpenseItem);

  // ! Reset the form fields
  expenseForm.reset();

  // ! close the expense popup

  expensePopup.classList.add("hide");
  expenseContainer.style.opacity = "1";

  updateExpenseOverview(expenseData.amount);
  emptyListMessage();
});

// ! update total expense amount

let total = 0;

function updateExpenseOverview(amount) {
  total += parseFloat(amount);
  totalAmount.innerHTML = "Rs." + total.toFixed(2);
}

// ! Empty list Message

function emptyListMessage() {
  let message = "No expense recorded!";
  let messageNode = document.createElement("li");
  messageNode.classList.add("list-info");
  messageNode.textContent = message;
  if (expenseList.children.length === 0) {
    expenseList.appendChild(messageNode);
  } else {
    let existingMessage = expenseList.querySelector(".list-info");
    if (existingMessage) {
      expenseList.removeChild(existingMessage);
    }
  }
}
emptyListMessage();
