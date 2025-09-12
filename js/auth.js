// Dummy localStorage untuk latihan
// Format: {email, password, role} -> role: "user" atau "admin"

// REGISTER
document.getElementById('registerForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if(password !== confirm){
        return alert("Password dan konfirmasi tidak cocok!");
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(u => u.email === email)){
        return alert("Email sudah terdaftar!");
    }

    users.push({email, password, role: "user"});
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registrasi berhasil!");
    window.location.href = "login.html";
});

// LOGIN
document.getElementById('loginForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if(!user) return alert("Email atau password salah!");

    localStorage.setItem('currentUser', JSON.stringify(user));

    if(user.role === "admin") window.location.href = "admin.html";
    else window.location.href = "index.html";
});

// LOGOUT
function logout(){
    localStorage.removeItem('currentUser');
    window.location.href = "login.html";
}

// Cek akses halaman
if(document.body.dataset.auth === "true"){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) window.location.href = "login.html";
}
