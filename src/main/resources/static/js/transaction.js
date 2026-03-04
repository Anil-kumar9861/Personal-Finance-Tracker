const email = localStorage.getItem("userEmail");

if (!email) {
    window.location.href = "index.html";
}

let allTransactions = [];

async function loadTransactions() {

    const incomeResponse = await fetch(`/api/income/${email}`);
    const incomes = await incomeResponse.json();

    const expenseResponse = await fetch(`/api/expenses/${email}`);
    const expenses = await expenseResponse.json();

    // Convert both into same format
    const incomeData = incomes.map(i => ({
        date: i.date,
        type: "Income",
        name: i.source,
        amount: i.amount
    }));

    const expenseData = expenses.map(e => ({
        date: e.date,
        type: "Expense",
        name: e.category,
        amount: e.amount
    }));

    allTransactions = [...incomeData, ...expenseData];

    // Sort by date (latest first)
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    displayTransactions(allTransactions);
}

function displayTransactions(transactions) {

    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

    transactions.forEach(t => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.type}</td>
            <td>${t.name}</td>
            <td>Rs.${t.amount}</td>
        `;

        table.appendChild(row);
    });
}

function filterTransactions() {

    const search = document.getElementById("searchInput").value.toLowerCase();
    const type = document.getElementById("typeFilter").value;

    const filtered = allTransactions.filter(t => {

        const matchesSearch =
            t.name.toLowerCase().includes(search) ||
            t.type.toLowerCase().includes(search);

        const matchesType =
            type === "All" || t.type === type;

        return matchesSearch && matchesType;
    });

    displayTransactions(filtered);
}

loadTransactions();