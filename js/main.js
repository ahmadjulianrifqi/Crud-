// Cek login
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const navbarUser = document.getElementById('navbarUser');
const userBtn = document.getElementById('userBtn');
const userMenu = document.getElementById('userMenu');
const adminLink = document.getElementById('adminLink');

if(currentUser){
    // Tampilkan profil user
    navbarUser.classList.remove('hidden');
    userBtn.textContent = currentUser.email;

    // Tampilkan admin link kalau role = admin
    if(currentUser.role === 'admin'){
        adminLink.classList.remove('hidden');
    }

    // Toggle dropdown
    userBtn.addEventListener('click', ()=>{
        userMenu.classList.toggle('hidden');
    });

    // Sembunyikan login/register
    document.querySelector('a[href="auth.html"]')?.classList.add('hidden');
}

// Logout
function logout(){
    localStorage.removeItem('currentUser');
    window.location.reload();
}
