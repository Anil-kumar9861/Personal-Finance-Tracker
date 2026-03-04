document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert("Registration Successful! Please Login.");
        window.location.href = "index.html";
    } else {
        alert("Registration failed");
    }
});