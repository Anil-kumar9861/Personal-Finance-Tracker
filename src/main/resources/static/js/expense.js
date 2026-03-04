async function addExpense() {

    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const expense = {
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value
    };

    console.log(expense);

    const response = await fetch(`api/expenses/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    });

    if (response.ok) {
        alert("Expense Added");
        loadExpenses();   // refresh list
        loadSummary();    // refresh totals
    } else {
        alert("Failed to add expense");
    }
}