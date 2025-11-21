/* ===========================
   AUTHENTICATION (LocalStorage)
=========================== */

let mode = "login"; // login/register

function switchAuth() {
    mode = mode === "login" ? "register" : "login";

    document.getElementById("authTitle").innerText = mode === "login" ? "Login" : "Register";
    document.getElementById("authBtn").innerText = mode === "login" ? "Login" : "Register";
    document.getElementById("switchText").innerText =
        mode === "login" ? "Don't have an account? Register here" : "Already have an account? Login here";

    document.getElementById("confirmWrap").classList.toggle("hidden");
}

function togglePassword(id, icon) {
    let input = document.getElementById(id);
    const eye = icon.querySelector("i");

    input.type = input.type === "password" ? "text" : "password";
    eye.classList.toggle("fa-eye");
    eye.classList.toggle("fa-eye-slash");
}

function authAction() {
    let username = document.getElementById("authUser").value;
    let password = document.getElementById("authPass").value;

    if (username === "" || password === "") {
        return showError("All fields are required!");
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (mode === "register") {
        let confirm = document.getElementById("authConfirm").value;

        if (password !== confirm) return showError("Passwords do not match!");

        if (users.find(u => u.username === username)) return showError("User already exists!");

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        showError("Registration successful!", true);
        switchAuth();
    } 
    else {
        let found = users.find(u => u.username === username && u.password === password);

        if (!found) return showError("Invalid username or password!");

        localStorage.setItem("loggedIn", username);
        loadDashboard();
    }
}

function showError(msg, success = false) {
    let el = document.getElementById("authError");
    el.style.color = success ? "lightgreen" : "red";
    el.innerText = msg;
}

/* ===========================
   DASHBOARD
=========================== */

function loadDashboard() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    renderTable();
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

/* ===========================
   STUDENT CRUD (LocalStorage)
=========================== */

function saveStudent() {
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;
    let age = document.getElementById("age").value;

    if (!name || !email || !course || !age) {
        alert("Please fill all fields!");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students") || "[]");

    if (id === "") {
        // Add new
        students.push({
            id: Date.now(),
            name,
            email,
            course,
            age
        });
    } else {
        // Update
        let s = students.find(st => st.id == id);
        s.name = name;
        s.email = email;
        s.course = course;
        s.age = age;
    }

    localStorage.setItem("students", JSON.stringify(students));
    clearForm();
    renderTable();
}

function clearForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
    document.getElementById("age").value = "";
    document.getElementById("formTitle").innerText = "Add Student";
}

function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem("students") || "[]");
    students = students.filter(s => s.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
}

function editStudent(id) {
    let students = JSON.parse(localStorage.getItem("students") || "[]");
    let s = students.find(x => x.id === id);

    document.getElementById("studentId").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("course").value = s.course;
    document.getElementById("age").value = s.age;

    document.getElementById("formTitle").innerText = "Edit Student";
}

function renderTable() {
    let students = JSON.parse(localStorage.getItem("students") || "[]");
    let body = "";
    let count = 1;

    students.forEach(s => {
        body += `
        <tr>
            <td>${count++}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
            <td>${s.age}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${s.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        </tr>`;
    });

    document.getElementById("studentTable").innerHTML = body;
}

/* ===========================
   SEARCH FUNCTION
=========================== */

document.getElementById("search").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
});

/* ===========================
   AUTO LOGIN CHECK
=========================== */
if (localStorage.getItem("loggedIn")) {
    loadDashboard();
}
