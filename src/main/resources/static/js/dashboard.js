const email = localStorage.getItem("userEmail");

if (!email) {
    window.location.href = "index.html";
}

async function addIncome() {

    const income = {
        amount: document.getElementById("incomeAmount").value,
        source: document.getElementById("source").value,
        frequency: document.getElementById("frequency").value,
        date: document.getElementById("incomeDate").value
    };

    const response = await fetch(`/api/income/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(income)
    });

    if (response.ok) {
        alert("Income Added");
        loadIncome();
        loadSummary();
    }
}

async function loadIncome() {

    const email = localStorage.getItem("userEmail");

    const response = await fetch(`/api/income/${email}`);
    const incomeList = await response.json();

    const table = document.getElementById("incomeList");
    table.innerHTML = "";

    incomeList.forEach(inc => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${inc.source}</td>
            <td>Rs.${inc.amount}</td>
            <td>${inc.date}</td>
            <td>${inc.frequency}</td>
        `;

        table.appendChild(row);
    });
}
async function loadExpenses() {

    const email = localStorage.getItem("userEmail");

    const response = await fetch(`/api/expenses/${email}`);
    const expenses = await response.json();

    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    const categoryTotals = {};

    expenses.forEach(exp => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exp.category}</td>
            <td>Rs.${exp.amount}</td>
            <td>${exp.date}</td>
            <td>${exp.description}</td>
        `;

        list.appendChild(row);

        // 🔥 Calculate category total
        if (!categoryTotals[exp.category]) {
            categoryTotals[exp.category] = 0;
        }
        categoryTotals[exp.category] += exp.amount;
    });

    createPieChart(categoryTotals);
}

let chart;  // global

function createPieChart(categoryTotals) {

    const ctx = document.getElementById('expenseChart').getContext('2d');

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4CAF50',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        }
    });
}
async function loadSummary() {

    const response = await fetch(`/api/summary/${email}`);
    const data = await response.json();

    document.getElementById("totalIncome").innerText = data.totalIncome;
    document.getElementById("totalExpense").innerText = data.totalExpense;
    document.getElementById("balance").innerText = data.balance;
}
async function loadBudgets() {

    const email = localStorage.getItem("userEmail");

    const budgetResponse = await fetch(`/api/budget/${email}`);
    const budgets = await budgetResponse.json();

    const expenseResponse = await fetch(`/api/expenses/${email}`);
    const expenses = await expenseResponse.json();

    const container = document.getElementById("budgetList");
    container.innerHTML = "";

    budgets.forEach(budget => {

        let totalSpent = 0;

        expenses.forEach(exp => {
            if (exp.category === budget.category) {
                totalSpent += exp.amount;
            }
        });

        let percentage = (totalSpent / budget.monthlyLimit) * 100;

        if (percentage > 100) {
            percentage = 100;
        }

        const color = totalSpent > budget.monthlyLimit ? "red" : "#4CAF50";

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${budget.category} - Rs.${totalSpent} / Rs.${budget.monthlyLimit}</p>
            <div style="background:#ddd; width:300px; height:20px;">
                <div style="background:${color}; width:${percentage}%; height:20px;"></div>
            </div>
        `;

        container.appendChild(div);
    });
}

async function addBudget() {

    const email = localStorage.getItem("userEmail");

    const budget = {
        category: document.getElementById("budgetCategory").value,
        monthlyLimit: document.getElementById("monthlyLimit").value
    };

    const response = await fetch(`/api/budget/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budget)
    });

    if (response.ok) {
        alert("Budget Set");
        loadBudgets();
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const email = localStorage.getItem("userEmail");

    if (!email) {
        window.location.href = "login.html";
        return;
    }

    // Show email as name (temporary)
    document.getElementById("userName").innerText = email;
});

function logout() {
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}

loadBudgets();
loadExpenses();
loadIncome();
loadSummary();