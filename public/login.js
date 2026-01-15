let isLoginMode = true;

function toggleMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('title');
    const btn = document.getElementById('submitBtn');
    const roleSelect = document.getElementById('role');
    const toggleBtn = document.querySelector('.toggle-btn');

    if (isLoginMode) {
        title.innerText = "Giriş Yap";
        btn.innerText = "Giriş Yap";
        roleSelect.style.display = "none";
        toggleBtn.innerText = "Hesabın yok mu? Kayıt Ol";
    } else {
        title.innerText = "Kayıt Ol";
        btn.innerText = "Kayıt Ol";
        roleSelect.style.display = "block";
        toggleBtn.innerText = "Zaten hesabın var mı? Giriş Yap";
    }
}

document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    const bodyData = isLoginMode ? { username, password } : { username, password, role };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });
        
        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            // Kullanıcıyı tarayıcı hafızasına kaydet (Basit Oturum Yönetimi)
            localStorage.setItem('user', JSON.stringify(data.user));

            // Role göre yönlendir
            if (data.user.role === 'admin') {
                window.location.href = '/admin'; // Admin paneline git
            } else {
                window.location.href = '/game'; // Oyuna git
            }
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert("Bir hata oluştu!");
    }
});

function guestLogin() {
    localStorage.setItem('user', JSON.stringify({ username: 'Misafir', role: 'guest' }));
    window.location.href = '/game';
}