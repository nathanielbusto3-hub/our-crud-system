<?php
session_start();
$host = "localhost";
$user = "root";
$pass = "";
$db   = "student_db";
$port = 3309; // change to 3306 if needed

$conn = mysqli_connect($host, $user, $pass, $db, $port);

if (!$conn) {
    die("Database Connection Failed: " . mysqli_connect_error());
}

// ---------------- STATS & CHART DATA ENDPOINT ----------------
if(isset($_POST['stats'])){
    header('Content-Type: application/json');

    // total students
    $totalStudents = (int) mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS c FROM students"))['c'];

    // students per distinct course
    $perCourse = (int) mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(DISTINCT course) AS c FROM students"))['c'];

    // new students today
    // if created_at doesn't exist, this query returns 0; ensure created_at column exists
    $newTodayRes = mysqli_query($conn, "SELECT COUNT(*) AS c FROM students WHERE DATE(created_at)=CURDATE()");
    $newToday = $newTodayRes ? (int) mysqli_fetch_assoc($newTodayRes)['c'] : 0;

    // students per day (last 7 days)
    $studentsPerDay = [];
    $labels = [];
    // initialize last 7 days labels with 0 counts
    for($i=6;$i>=0;$i--){
        $d = date('Y-m-d', strtotime("-{$i} days"));
        $labels[] = $d;
        $studentsPerDay[$d] = 0;
    }
    $res = mysqli_query($conn, "SELECT DATE(created_at) as d, COUNT(*) as c FROM students WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) GROUP BY DATE(created_at)");
    if($res){
        while($r=mysqli_fetch_assoc($res)){
            $studentsPerDay[$r['d']] = (int)$r['c'];
        }
    }
    $students_per_day_arr = array_map(function($d) use ($studentsPerDay){ return $studentsPerDay[$d]; }, $labels);

    // course distribution
    $courseDist = [];
    $res2 = mysqli_query($conn, "SELECT course, COUNT(*) as c FROM students GROUP BY course");
    if($res2){
        while($r=mysqli_fetch_assoc($res2)){
            $courseDist[] = ['course'=>$r['course'], 'count'=>(int)$r['c']];
        }
    }

    // USERS ONLINE (simple session tracking using sessions.json)
    $session_file = __DIR__ . "/sessions.json";
    $sessions = file_exists($session_file) ? json_decode(file_get_contents($session_file), true) : [];
    // update current session timestamp
    $sessions[session_id()] = time();
    // remove sessions older than 5 minutes (300s)
    foreach($sessions as $sid => $t){
        if(time() - $t > 300) unset($sessions[$sid]);
    }
    file_put_contents($session_file, json_encode($sessions));
    $usersOnline = count($sessions);

    echo json_encode([
        'total' => $totalStudents,
        'perCourse' => $perCourse,
        'newToday' => $newToday,
        'online' => $usersOnline,
        'students_per_day' => ['labels'=>$labels, 'data'=>$students_per_day_arr],
        'course_distribution' => $courseDist
    ]);
    exit;
}

// ---------------- LOGIN ----------------
if(isset($_POST['login'])){
    $u = $_POST['username'];
    $p = $_POST['password'];
    $q = mysqli_query($conn,"SELECT * FROM admin WHERE username='$u' AND password='$p'");
    if(mysqli_num_rows($q)==1){
        $_SESSION['admin']=$u;
        $_SESSION['role']='admin';
        header("Location:index.php"); exit;
    }else{
        $login_error="Incorrect username or password!";
    }
}

if(isset($_GET['logout'])){
    session_destroy();
    header("Location:index.php"); exit;
}

// ---------------- STUDENT CRUD AJAX ----------------
if(isset($_POST['action'])){
    $action = $_POST['action'];

    if($action=="fetch"){
        $search = $_POST['search'] ?? '';
        $page = $_POST['page'] ?? 1;
        $limit = 5;
        $offset = ($page-1)*$limit;
        $where = $search!="" ? "WHERE name LIKE '%$search%' OR email LIKE '%$search%' OR course LIKE '%$search%'" : "";
        $total_res = mysqli_query($conn,"SELECT COUNT(*) as total FROM students $where");
        $total = mysqli_fetch_assoc($total_res)['total'];

        $res = mysqli_query($conn,"SELECT * FROM students $where ORDER BY id DESC LIMIT $offset,$limit");
        $data = [];
        while($row=mysqli_fetch_assoc($res)) $data[] = $row;
        echo json_encode(['students'=>$data,'total'=>$total,'limit'=>$limit,'page'=>$page]);
        exit;
    }

    if($action=="add" || $action=="update"){
        $id = $_POST['id'] ?? '';
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $course = trim($_POST['course']);
        $gender = $_POST['gender'];
        $photo_name = '';

        if(isset($_FILES['photo']) && $_FILES['photo']['error']==0){
            $tmp = $_FILES['photo']['tmp_name'];
            $photo_name = time().'_'.basename($_FILES['photo']['name']);
            if(!is_dir('uploads')) mkdir('uploads', 0755, true);
            move_uploaded_file($tmp, 'uploads/'.$photo_name);
        }

        if($action=="add"){
            $stmt = $conn->prepare("INSERT INTO students (name,email,course,gender,photo) VALUES (?,?,?,?,?)");
            $stmt->bind_param("sssss", $name, $email, $course, $gender, $photo_name);
            $stmt->execute(); $stmt->close(); echo "success"; exit;
        }else{
            if($photo_name==""){
                $res = mysqli_query($conn,"SELECT photo FROM students WHERE id='$id'");
                $photo_name = mysqli_fetch_assoc($res)['photo'];
            }
            $stmt = $conn->prepare("UPDATE students SET name=?, email=?, course=?, gender=?, photo=? WHERE id=?");
            $stmt->bind_param("sssssi", $name, $email, $course, $gender, $photo_name, $id);
            $stmt->execute(); $stmt->close(); echo "success"; exit;
        }
    }

    if($action=="get"){
        $id = $_POST['id'];
        $res = mysqli_query($conn,"SELECT * FROM students WHERE id='$id'");
        echo json_encode(mysqli_fetch_assoc($res)); exit;
    }

    if($action=="delete"){
        $id = $_POST['id'];
        $res = mysqli_query($conn,"SELECT photo FROM students WHERE id='$id'");
        $photo = mysqli_fetch_assoc($res)['photo'];
        if($photo && file_exists('uploads/'.$photo)) unlink('uploads/'.$photo);
        mysqli_query($conn,"DELETE FROM students WHERE id='$id'");
        echo "success"; exit;
    }
}

// ---------------- REQUIRE LOGIN ----------------
if(!isset($_SESSION['admin'])):
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login - Admin Panel</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
body {background:#0f0f15; color:#0ff; font-family:'Orbitron',sans-serif;}
.card {transition: all 0.4s ease; background: rgba(0,0,0,0.3); border:1px solid #0ff; box-shadow: 0 0 15px #0ff;}
input, select {background: rgba(0,0,0,0.3); color:#0ff; border:1px solid #0ff;}
button {transition: all 0.3s ease;}
#togglePassword:hover {transform: scale(1.2); filter: drop-shadow(0 0 10px #0ff);}
</style>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
</head>
<body class="flex items-center justify-center h-screen">
<div class="w-full max-w-md">
    <div class="p-8 rounded-xl border border-cyan-400 shadow-xl" style="background: rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
        <h2 class="text-3xl font-bold text-center mb-6 text-cyan-400">Admin Login</h2>
        <?php if(isset($login_error)) echo "<p class='text-red-500 text-center mb-2'>$login_error</p>"; ?>
        <form method="POST" class="space-y-4 relative">
            <input type="text" name="username" placeholder="Username" class="w-full px-4 py-2 rounded-lg" required>
            <div class="relative">
                <input type="password" name="password" id="password" placeholder="Password" class="w-full px-4 py-2 rounded-lg" required>
                <svg id="togglePassword" xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
            </div>
            <button class="w-full py-2 rounded-lg text-black font-bold" name="login" style="background: linear-gradient(90deg,#0ff,#06f); box-shadow:0 0 10px #0ff;">Login</button>
        </form>
    </div>
</div>

<script>
const toggle = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
toggle.addEventListener('click',()=>{ const type = password.getAttribute('type')==='password'?'text':'password'; password.setAttribute('type',type); });
</script>
</body>
</html>
<?php exit; endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard</title>

<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- XLSX & jsPDF (exports) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --neon:#00ffe6;
  --neon-2:#66f;
  --glass: rgba(0,0,0,0.25);
}
body {font-family:'Orbitron',sans-serif; background:#05060a; color:var(--neon);}
#sidebar {background: linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)); border-right:1px solid rgba(0,255,255,0.08); backdrop-filter: blur(10px);}
#sidebar a {color:var(--neon); text-shadow:0 0 6px rgba(0,255,255,0.12);}
nav {background: rgba(0,0,0,0.2); border-bottom:1px solid rgba(0,255,255,0.06); backdrop-filter: blur(6px);}

/* card */
.card {
  background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.18));
  border: 1px solid rgba(0,255,255,0.08);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 30px rgba(0,255,255,0.03), inset 0 0 30px rgba(0,255,255,0.01);
  transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s;
  position: relative;
  overflow: hidden;
}
.card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 12px 40px rgba(0,255,255,0.08); }

/* neon title */
.card h3 { color: var(--neon); font-weight:700; text-shadow:0 0 8px rgba(0,255,255,0.08); }

/* counter */
.counter { font-size: 1.8rem; font-weight:800; color: #ffffff; background: linear-gradient(90deg,var(--neon),var(--neon-2)); -webkit-background-clip:text; background-clip:text; color: transparent; }

/* small canvas sizing */
.card-canvas { position:absolute; right:10px; top:10px; width:110px; height:60px; opacity:0.9; }

/* student table */
table {background: rgba(0,0,0,0.12); border:1px solid rgba(0,255,255,0.04); backdrop-filter: blur(3px); width:100%;}
table th, table td {border-bottom:1px solid rgba(0,255,255,0.03); color:var(--neon); text-align:center; padding:0.5rem;}

/* modal */
.modal-bg {position: fixed; inset:0; background: rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:50;}
.modal-content {background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.2)); backdrop-filter: blur(10px); border:1px solid rgba(0,255,255,0.05); padding:20px; border-radius:12px; width:400px;}
.input-highlight span {background: rgba(0,255,255,0.08);}

/* pagination */
.pagination button { margin-right:6px; }

/* helper highlight */
.highlight { background: rgba(0,255,255,0.12); padding:2px 4px; border-radius:4px; }

/* responsive */
@media (max-width:900px){
  .card-canvas { display:none; }
  #sidebar { display:none; }
}
</style>
</head>
<body class="flex h-screen overflow-hidden">

<!-- SIDEBAR -->
<div id="sidebar" class="w-64 h-full shadow-lg flex-shrink-0 p-6">
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <ul>
        <li class="mb-3"><a href="#students" class="block py-2 px-4 rounded hover:bg-cyan-400 hover:text-black transition">Students</a></li>
        <li class="mb-3"><a href="?logout=1" class="block py-2 px-4 rounded hover:bg-red-500 hover:text-white transition">Logout</a></li>
    </ul>
</div>

<div class="flex-1 flex flex-col">
    <!-- NAVBAR -->
    <nav class="flex justify-between items-center p-4">
        <button id="sidebarToggle" class="px-4 py-2 rounded bg-cyan-400 text-black hover:shadow-[0_0_20px_cyan]">Toggle Sidebar</button>
        <div class="text-sm text-gray-300">Signed in as <span class="font-semibold"><?php echo htmlspecialchars($_SESSION['admin']); ?></span></div>
    </nav>

    <!-- CARDS (with embedded charts) -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card relative">
            <h3 class="mb-2">Total Students</h3>
            <p class="counter" id="totalStudents">0</p>
            <canvas id="chartTotal" class="card-canvas"></canvas>
        </div>
        <div class="card relative">
            <h3 class="mb-2">Students per Course</h3>
            <p class="counter" id="perCourse">0</p>
            <canvas id="chartCourse" class="card-canvas"></canvas>
        </div>
        <div class="card relative">
            <h3 class="mb-2">New Students (Today)</h3>
            <p class="counter" id="newStudents">0</p>
            <canvas id="chartNew" class="card-canvas"></canvas>
        </div>
        <div class="card relative">
            <h3 class="mb-2">Users Online</h3>
            <p class="counter" id="usersOnline">0</p>
            <canvas id="chartOnline" class="card-canvas"></canvas>
        </div>
    </div>

    <!-- CONTENT (students table & controls) -->
    <div id="content" class="p-6 flex-1 overflow-auto"></div>
</div>

<!-- STUDENT MODAL TEMPLATE -->
<div id="studentModal" class="modal-bg" style="display:none;">
    <div class="modal-content">
        <h3 class="text-xl font-bold mb-4 text-cyan-400" id="modalTitle">Add Student</h3>
        <form id="studentForm" enctype="multipart/form-data">
            <input type="hidden" name="id" id="studentId">
            <input type="hidden" name="action" id="formAction" value="add">
            <div class="mb-2"><input type="text" name="name" id="studentName" placeholder="Name" class="w-full p-2 border border-cyan-400 rounded text-cyan-400 bg-black input-highlight" required></div>
            <div class="mb-2"><input type="email" name="email" id="studentEmail" placeholder="Email" class="w-full p-2 border border-cyan-400 rounded text-cyan-400 bg-black input-highlight" required></div>
            <div class="mb-2"><input type="text" name="course" id="studentCourse" placeholder="Course" class="w-full p-2 border border-cyan-400 rounded text-cyan-400 bg-black input-highlight" required></div>
            <div class="mb-2">
                <select name="gender" id="studentGender" class="w-full p-2 border border-cyan-400 rounded text-cyan-400 bg-black">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div class="mb-4">
                <input type="file" name="photo" id="studentPhoto" class="w-full text-cyan-400">
                <div id="photoPreview" class="mt-2"></div>
            </div>
            <div class="flex justify-end space-x-2">
                <button type="button" id="modalClose" class="px-4 py-2 rounded bg-red-600 text-white">Cancel</button>
                <button type="submit" class="px-4 py-2 rounded bg-cyan-400 text-black font-bold" id="modalSubmit">Save</button>
            </div>
        </form>
    </div>
</div>

<script>
/* ----------------- UI Helpers ----------------- */
$('#sidebarToggle').click(()=>$('#sidebar').toggleClass('hidden'));
function debounce(fn, delay){ let timer; return function(){ clearTimeout(timer); timer=setTimeout(()=>fn.apply(this,arguments),delay); }; }

/* ----------------- FETCH STUDENTS / BUILD TABLE (existing logic) ----------------- */
let currentPage=1, currentSearch='';
function fetchStudents(page=1,search=''){
    currentPage=page; currentSearch=search;
    $.post('index.php',{action:'fetch',page,search},function(res){
        let obj=JSON.parse(res);
        let students=obj.students,total=obj.total,limit=obj.limit;
        // build table
        let html=`<div class="flex justify-between mb-4">
            <h2 class="text-xl font-bold">Students</h2>
            <div class="flex space-x-2">
                <input type="text" id="searchInput" placeholder="Search..." class="px-2 py-1 rounded bg-black text-cyan-400 border border-cyan-400" value="${search}">
                <button id="addStudentBtn" class="px-4 py-2 bg-green-600 text-white rounded">Add Student</button>
                <button id="exportExcelBtn" class="px-4 py-2 bg-blue-600 text-white rounded">Excel</button>
                <button id="exportPDFBtn" class="px-4 py-2 bg-yellow-500 text-black rounded">PDF</button>
            </div>
        </div><div class="overflow-auto"><table class="w-full rounded-lg"><thead><tr>
        <th>#</th><th>Photo</th><th>Name</th><th>Email</th><th>Course</th><th>Gender</th><th>Actions</th>
        </tr></thead><tbody>`;
        students.forEach((s,index)=>{
            let rowNumber=(page-1)*limit+index+1;
            // highlight search matches
            function hl(text){ if(!search) return text; let regex=new RegExp('('+search.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&')+')','ig'); return text.replace(regex,'<span class="highlight">$1</span>'); }
            html+=`<tr>
                <td>${rowNumber}</td>
                <td>${s.photo?`<img src="uploads/${s.photo}" class="w-10 h-10 rounded-full">`:"-"}</td>
                <td>${hl(s.name)}</td>
                <td>${hl(s.email)}</td>
                <td>${hl(s.course)}</td>
                <td>${hl(s.gender)}</td>
                <td>
                    <button class="px-2 py-1 bg-blue-600 text-white rounded editBtn" data-id="${s.id}">Edit</button>
                    <button class="px-2 py-1 bg-red-600 text-white rounded deleteBtn" data-id="${s.id}">Delete</button>
                </td>
            </tr>`;
        });
        html+=`</tbody></table></div>`;
        // pagination
        let totalPages=Math.ceil(total/limit);
        if(totalPages>1){ html+='<div class="mt-4 space-x-1 pagination">'; for(let i=1;i<=totalPages;i++) html+=`<button class="px-3 py-1 border border-cyan-400 rounded ${i===page?'bg-cyan-400 text-black':''}" onclick="fetchStudents(${i},'${search}')">${i}</button>`; html+='</div>'; }
        $('#content').fadeOut(150,function(){$(this).html(html).fadeIn(150);});
    });
}
fetchStudents();

// live search
$(document).on('input','#searchInput',debounce(function(){ fetchStudents(1,this.value); updateModalHighlight(this.value); },300));

// add student
$(document).on('click','#addStudentBtn',function(){
    $('#modalTitle').text('Add Student'); $('#formAction').val('add'); $('#studentForm')[0].reset(); $('#studentId').val(''); $('#photoPreview').html(''); $('#studentModal').fadeIn();
});

// edit student
$(document).on('click','.editBtn',function(){
    let id=$(this).data('id');
    $.post('index.php',{action:'get',id},function(res){
        let s=JSON.parse(res);
        $('#modalTitle').text('Edit Student'); $('#formAction').val('update'); $('#studentId').val(s.id);
        $('#studentName').val(s.name); $('#studentEmail').val(s.email); $('#studentCourse').val(s.course); $('#studentGender').val(s.gender);
        $('#photoPreview').html(s.photo?`<img src="uploads/${s.photo}" class="w-16 h-16 rounded-full">`:'');
        $('#studentModal').fadeIn();
        updateModalHighlight(currentSearch);
    });
});

// save student
$('#studentForm').submit(function(e){
    e.preventDefault();
    let formData=new FormData(this);
    $.ajax({url:'index.php',type:'POST',data:formData,contentType:false,processData:false,success:function(res){
        if(res==='success'){ $('#studentModal').fadeOut(); fetchStudents(currentPage,currentSearch); }
    }});
});

// modal close
$('#modalClose').click(()=>$('#studentModal').fadeOut());

// delete
$(document).on('click','.deleteBtn',function(){
    if(confirm("Delete this student?")){
        $.post('index.php',{action:'delete',id:$(this).data('id')},function(res){ if(res==='success') fetchStudents(currentPage,currentSearch); });
    }
});

// export excel
$(document).on('click','#exportExcelBtn',function(){
    let table=document.querySelector('#content table');
    if(!table){ alert('No table to export'); return; }
    let wb=XLSX.utils.table_to_book(table,{sheet:"Students"});
    XLSX.writeFile(wb,'students.xlsx');
});

// export pdf
$(document).on('click','#exportPDFBtn',function(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18); doc.text("Student List",14,20);
    const rows=[]; $('#content table tbody tr').each(function(){
        const row=[]; $(this).find('td').each(function(i){ if(i!==1) row.push($(this).text().trim()); }); rows.push(row);
    });
    doc.autoTable({head:[['#','Name','Email','Course','Gender','Actions']],body:rows,startY:30,theme:'grid',headStyles:{fillColor:[0,255,255],textColor:0},styles:{textColor:[0,255,255]}});
    doc.save('students.pdf');
});

// modal inline highlight
function updateModalHighlight(search){
    $('.input-highlight').each(function(){
        let val=$(this).val();
        if(!search){ $(this).html(val); return; }
        let regex=new RegExp('('+search+')','ig');
        $(this).html(val.replace(regex,'<span class="highlight">$1</span>'));
    });
}
$('#studentName, #studentEmail, #studentCourse').on('input',function(){ updateModalHighlight(currentSearch); });

/* ----------------- STATS, CHARTS & ANIMATIONS ----------------- */

let statsInterval = null;
let chartTotal, chartCourse, chartNew, chartOnline;
let chartColors = [
    'rgba(0,255,230,0.9)',
    'rgba(102,102,255,0.9)',
    'rgba(0,200,255,0.9)',
    'rgba(0,180,220,0.9)',
    'rgba(120,100,255,0.9)',
    'rgba(0,150,200,0.9)',
];

function animateCounter(el, to){
    let start = parseInt($(el).data('value') || 0);
    to = parseInt(to);
    $(el).data('value', to);
    let duration = 700;
    let startTime = null;
    function step(ts){
        if(!startTime) startTime = ts;
        let progress = Math.min((ts-startTime)/duration,1);
        let val = Math.floor(start + (to - start) * progress);
        $(el).text(val);
        if(progress<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function initCharts(){
    // total (line sparkline)
    const ctxTotal = document.getElementById('chartTotal').getContext('2d');
    chartTotal = new Chart(ctxTotal, {
        type: 'line',
        data: { labels: [], datasets:[{ label:'', data:[], tension:0.4, borderWidth:2, borderColor:chartColors[0], pointRadius:0, fill:true, backgroundColor:'rgba(0,255,230,0.06)'}] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{display:false}, y:{display:false}}, elements:{line:{capStyle:'round'}}}
    });

    // course (pie)
    const ctxCourse = document.getElementById('chartCourse').getContext('2d');
    chartCourse = new Chart(ctxCourse, {
        type: 'doughnut',
        data: { labels: [], datasets:[{ data: [], backgroundColor: chartColors, hoverOffset:6 }] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} }
    });

    // new students (tiny line)
    const ctxNew = document.getElementById('chartNew').getContext('2d');
    chartNew = new Chart(ctxNew, {
        type:'line',
        data:{ labels:[], datasets:[{ data:[], tension:0.4, borderWidth:2, borderColor:chartColors[2], pointRadius:0, fill:true, backgroundColor:'rgba(0,200,255,0.05)'}]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{display:false}, y:{display:false}}}
    });

    // online (sparkline)
    const ctxOnline = document.getElementById('chartOnline').getContext('2d');
    chartOnline = new Chart(ctxOnline, {
        type:'bar',
        data:{ labels:[], datasets:[{ data:[], borderRadius:3, backgroundColor:chartColors[3] }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{display:false}, y:{display:false}}}
    });
}
initCharts();

function updateStatsAndCharts(){
    $.post('index.php',{stats:1},function(res){
        // parse result (already parsed by jQuery if JSON header)
        let data = (typeof res === 'string') ? JSON.parse(res) : res;

        // counters
        animateCounter('#totalStudents', data.total);
        animateCounter('#perCourse', data.perCourse);
        animateCounter('#newStudents', data.newToday);
        animateCounter('#usersOnline', data.online);

        // students per day - update total chart
        if(data.students_per_day && data.students_per_day.labels){
            chartTotal.data.labels = data.students_per_day.labels.map(d => d.slice(5)); // show MM-DD
            chartTotal.data.datasets[0].data = data.students_per_day.data;
            chartTotal.update();
            // also update new students sparkline (use last 7 days values and highlight last value)
            chartNew.data.labels = chartTotal.data.labels;
            chartNew.data.datasets[0].data = data.students_per_day.data;
            chartNew.update();
        }

        // course distribution - pie
        if(data.course_distribution){
            const labels = data.course_distribution.map(x=>x.course);
            const counts = data.course_distribution.map(x=>x.count);
            chartCourse.data.labels = labels;
            chartCourse.data.datasets[0].data = counts;
            // ensure enough colors
            while(chartCourse.data.datasets[0].backgroundColor.length < labels.length){
                chartCourse.data.datasets[0].backgroundColor.push(chartColors[chartCourse.data.datasets[0].backgroundColor.length % chartColors.length]);
            }
            chartCourse.update();

            // update perCourse counter to show distinct courses (already set), optionally show tooltip? left as count
        }

        // online sparkline: we will simulate by shifting small history array stored in element
        let hist = $('#chartOnline').data('hist') || [];
        hist.push(data.online);
        if(hist.length>7) hist.shift();
        $('#chartOnline').data('hist', hist);
        chartOnline.data.labels = hist.map((v,i)=>i);
        chartOnline.data.datasets[0].data = hist;
        chartOnline.update();
    }).fail(function(){ console.warn('Failed to fetch stats'); });
}

// start interval
updateStatsAndCharts();
statsInterval = setInterval(updateStatsAndCharts, 3000);

/* ----------------- Keep alive cleanup when unloading (remove session) ----------------- */
$(window).on('beforeunload', function(){
    // we won't explicitly delete session file entry here; sessions.json cleanup in stats handles expiry
});

/* ----------------- modal highlight behavior already present ----------------- */
</script>

</body>
</html>
