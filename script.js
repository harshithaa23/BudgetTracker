// Variables to track budget, expenses, and the budget name
let totalBudget = 0;
let totalExpenses = 0;
let balance = 0;
let budgetList = [];
let expenseList = [];

// Function to add a budget
document.getElementById("addBudget").addEventListener("click", function() {
  const budgetName = document.getElementById("budgetName").value;
  const budgetAmount = parseFloat(document.getElementById("budgetAmount").value);

  if (budgetName && budgetAmount && budgetAmount > 0) {
    totalBudget += budgetAmount;
    budgetList.push({
      budgetName,
      budgetAmount
    });
    updateSummary();
    renderBudgetDetails();
  } else {
    alert("Please enter valid budget details!");
  }
});

// Function to add an expense
document.getElementById("addExpense").addEventListener("click", function() {
  const expenseDesc = document.getElementById("expenseDesc").value;
  const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

  if (expenseDesc && expenseAmount && expenseAmount > 0) {
    totalExpenses += expenseAmount;
    expenseList.push({
      expenseDesc,
      expenseAmount
    });
    updateSummary();
    renderExpenseDetails();
  } else {
    alert("Please enter valid expense details!");
  }
});

// Function to update the budget summary
function updateSummary() {
  balance = totalBudget - totalExpenses;

  document.getElementById("totalBudget").querySelector("h3").innerText = `$${totalBudget}`;
  document.getElementById("totalExpenses").querySelector("h3").innerText = `$${totalExpenses}`;
  document.getElementById("balance").querySelector("h3").innerText = `$${balance}`;
}

// Function to render the list of budget details
function renderBudgetDetails() {
  const budgetListEl = document.getElementById("budgetDetailsList");
  budgetListEl.innerHTML = "";

  budgetList.forEach((budget, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${budget.budgetName}</td>
      <td>$${budget.budgetAmount}</td>
      <td>
        <button class="edit" onclick="editBudget(${index})">Edit</button>
        <button class="delete" onclick="deleteBudget(${index})">Delete</button>
      </td>
    `;
    budgetListEl.appendChild(row);
  });
}

// Function to render the list of expense details
function renderExpenseDetails() {
  const expenseListEl = document.getElementById("expenseDetailsList");
  expenseListEl.innerHTML = "";

  expenseList.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.expenseDesc}</td>
      <td>$${expense.expenseAmount}</td>
      <td>
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expenseListEl.appendChild(row);
  });
}

// Function to delete a budget detail
function deleteBudget(index) {
  const budget = budgetList[index];
  totalBudget -= budget.budgetAmount;
  budgetList.splice(index, 1);
  updateSummary();
  renderBudgetDetails();
}

// Function to delete an expense detail
function deleteExpense(index) {
  const expense = expenseList[index];
  totalExpenses -= expense.expenseAmount;
  expenseList.splice(index, 1);
  updateSummary();
  renderExpenseDetails();
}

// Function to edit a budget detail
function editBudget(index) {
  const budget = budgetList[index];
  document.getElementById("budgetName").value = budget.budgetName;
  document.getElementById("budgetAmount").value = budget.budgetAmount;
  deleteBudget(index);
}

// Function to edit an expense detail
function editExpense(index) {
  const expense = expenseList[index];
  document.getElementById("expenseDesc").value = expense.expenseDesc;
  document.getElementById("expenseAmount").value = expense.expenseAmount;
  deleteExpense(index);
}

