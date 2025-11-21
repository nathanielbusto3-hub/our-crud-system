// Default login credentials
const USER = "admin";
const PASS = "1234";

// Student data storage
let students = [];

/* ========================= LOGIN ========================= */
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (user === USER && pass === PASS) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
    } else {
        document.getElementById("loginError").innerText = "Invalid username or password!";
    }
}

/* ========================= LOGOUT ========================= */
function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

/* ========================= ADD / EDIT STUDENT ========================= */
function saveStudent() {
    let id = document.getElementById("editId").value;
    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let course = document.getElementById("studentCourse").value;
    let age = document.getElementById("studentAge").value;

    if (name === "" || email === "" || course === "" || age === "") {
        alert("Please fill all fields!");
        return;
    }

    if (id === "") {
        // ADD
        students.push({
            id: Date.now(),
            name,
            email,
            course,
            age
        });
    } else {
        // UPDATE
        let s = students.find(st => st.id == id);
        s.name = name;
        s.email = email;
        s.course = course;
        s.age = age;
    }

    clearForm();
    renderTable();
}

/* ========================= DELETE ========================= */
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    renderTable();
}

/* ========================= EDIT ========================= */
function editStudent(id) {
    let s = students.find(st => st.id === id);

    document.getElementById("editId").value = s.id;
    document.getElementById("studentName").value = s.name;
    document.getElementById("studentEmail").value = s.email;
    document.getElementById("studentCourse").value = s.course;
    document.getElementById("studentAge").value = s.age;
}

/* ========================= CLEAR FORM ========================= */
function clearForm() {
    document.getElementById("editId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentCourse").value = "";
    document.getElementById("studentAge").value = "";
}

/* ========================= RENDER TABLE ========================= */
function renderTable() {
    let list = "";
    let count = 1;

    students.forEach(s => {
        list += `
            <tr>
                <td>${count++}</td>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.course}</td>
                <td>${s.age}</td>
                <td>
                    <button class="action-btn edit" onclick="editStudent(${s.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("studentTable").innerHTML = list;
}

/* ========================= SEARCH ========================= */
document.getElementById("search").addEventListener("keyup", () => {
    let keyword = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
});
