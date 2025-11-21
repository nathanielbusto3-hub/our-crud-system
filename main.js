// Toggle Login/Register
const toggleForm = document.getElementById("toggleForm");
if (toggleForm) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    toggleForm.addEventListener("click", () => {
        loginForm.classList.toggle("hidden");
        registerForm.classList.toggle("hidden");

        toggleForm.innerText = loginForm.classList.contains("hidden")
            ? "Switch to Login"
            : "Switch to Register";
    });
}

// Password visibility toggle
function setupPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);

    if (!toggle || !input) return;

    toggle.addEventListener("click", () => {
        input.type = input.type === "password" ? "text" : "password";
        toggle.classList.toggle("fa-eye");
        toggle.classList.toggle("fa-eye-slash");
    });
}

setupPasswordToggle("toggleLoginPassword", "loginPassword");
setupPasswordToggle("toggleRegisterPassword", "registerPassword");
setupPasswordToggle("toggleConfirmPassword", "confirmPassword");

// Edit student fill form
document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("studentId").value = btn.dataset.id;
        document.getElementById("name").value = btn.dataset.name;
        document.getElementById("email").value = btn.dataset.email;
        document.getElementById("course").value = btn.dataset.course;
        document.getElementById("age").value = btn.dataset.age;

        document.getElementById("formAction").value = "update";

        const submitBtn = document.getElementById("submitBtn");
        submitBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Update`;
        submitBtn.style.background = "#FFD700";
    });
});

// Search filter
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll("table tbody tr");

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(value) ? "" : "none";
        });
    });
}
