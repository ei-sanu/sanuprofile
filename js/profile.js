const scriptURL = "https://script.google.com/macros/s/AKfycbww-M15Fnf6R5yXaJIju9TP7b3xM4zXQwUklUXhh-rTrbhxxNW8NS2qzYOvkhpyru8v/exec"; // Replace this

let captchaValue = '';
let loginCaptchaValue = '';

function generateCaptcha() {
    captchaValue = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('captchaCode').textContent = captchaValue;
}

function generateLoginCaptcha() {
    loginCaptchaValue = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('loginCaptchaCode').textContent = loginCaptchaValue;
}

function toggleCaptcha() {
    const termsCheck = document.getElementById('termsCheck');
    const captchaSection = document.getElementById('captchaSection');
    const registerBtn = document.getElementById('registerBtn');

    if (termsCheck.checked) {
        captchaSection.style.display = 'block';
        generateCaptcha();
        registerBtn.disabled = false;
    } else {
        captchaSection.style.display = 'none';
        registerBtn.disabled = true;
    }
}

function toggleLoginCaptcha() {
    const termsCheck = document.getElementById('loginTermsCheck');
    const captchaSection = document.getElementById('loginCaptchaSection');
    const loginBtn = document.getElementById('loginBtn');

    if (termsCheck.checked) {
        captchaSection.style.display = 'block';
        generateLoginCaptcha();
        loginBtn.disabled = false;
    } else {
        captchaSection.style.display = 'none';
        loginBtn.disabled = true;
    }
}

function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

function closeTerms() {
    document.getElementById('termsModal').style.display = 'none';
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('successModal').style.display = 'none';
    }, 3000);
}

function showError(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.color = 'var(--neon-red)';
    errorModal.style.display = 'block';

    setTimeout(() => {
        errorModal.style.display = 'none';
        toggleAuth('login');
    }, 3000);
}

async function register() {
    showLoading();
    const regEmail = document.getElementById("regEmail");
    const regPhone = document.getElementById("regPhone");
    const errorDiv = document.getElementById("registerError");

    // Basic validation for phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(regPhone.value)) {
        hideLoading();
        regPhone.classList.add('error-shake');
        errorDiv.textContent = "Please enter a valid 10-digit phone number";
        errorDiv.classList.add('show');
        setTimeout(() => {
            regPhone.classList.remove('error-shake');
            errorDiv.classList.remove('show');
        }, 600);
        return;
    }

    const params = new URLSearchParams({
        action: "register",
        email: regEmail.value,
        name: document.getElementById("regName").value,
        phone: regPhone.value,
        password: document.getElementById("regPass").value
    });

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: params });
        const data = await response.text();
        hideLoading();

        if (data.includes("email_exists") && data.includes("phone_exists")) {
            // Both email and phone exist
            showError("This email and phone number are already registered!");
            regEmail.classList.add('error-shake');
            regPhone.classList.add('error-shake');
            errorDiv.textContent = "Account already exists!";
            errorDiv.classList.add('show');

            setTimeout(() => {
                regEmail.classList.remove('error-shake');
                regPhone.classList.remove('error-shake');
                errorDiv.classList.remove('show');
                toggleAuth('login');
            }, 2000);
        } else if (data.includes("email_exists")) {
            // Email exists
            regEmail.classList.add('error-shake');
            errorDiv.textContent = "Email already registered!";
            errorDiv.classList.add('show');
            showError("This email is already registered. Redirecting to login...");

            setTimeout(() => {
                regEmail.classList.remove('error-shake');
                errorDiv.classList.remove('show');
                toggleAuth('login');
            }, 2000);
        } else if (data.includes("phone_exists")) {
            // Phone exists
            regPhone.classList.add('error-shake');
            errorDiv.textContent = "Phone number already registered!";
            errorDiv.classList.add('show');
            showError("This phone number is already registered. Redirecting to login...");

            setTimeout(() => {
                regPhone.classList.remove('error-shake');
                errorDiv.classList.remove('show');
                toggleAuth('login');
            }, 2000);
        } else {
            // Successfully registered
            showSuccess('Profile created successfully! Please login.');
            setTimeout(() => {
                toggleAuth('login');
            }, 2000);
        }
    } catch (error) {
        hideLoading();
        showError('Registration failed. Please try again.');
    }
}

async function validateAndRegister() {
    const captchaInput = document.getElementById('captchaInput').value;
    if (captchaInput !== captchaValue) {
        showError('Invalid captcha code. Please try again.');
        generateCaptcha();
        document.getElementById('captchaInput').value = '';
        return;
    }

    // Call the existing register function
    await register();
}

function validateAndLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPass').value;
    const captchaInput = document.getElementById('loginCaptchaInput').value;
    const captchaCode = document.getElementById('loginCaptchaCode').textContent;

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'flex';

    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        document.getElementById('loadingSpinner').style.display = 'none';
        return;
    }

    // Validate captcha
    if (captchaInput !== captchaCode) {
        showError('Invalid captcha code');
        document.getElementById('loadingSpinner').style.display = 'none';
        return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';

        // Show success message
        const successModal = document.getElementById('successModal');
        document.getElementById('successMessage').textContent = 'Login successful!';
        successModal.style.display = 'flex';

        // Wait for 1.5 seconds, then redirect to index.html
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1000);
}

async function login() {
    showLoading();
    const loginForm = document.getElementById('login');
    const loginPass = document.getElementById('loginPass');
    const errorDiv = document.getElementById('loginError');

    const params = new URLSearchParams({
        action: "login",
        email: document.getElementById("loginEmail").value,
        password: loginPass.value
    });

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: params });
        const data = await response.text();
        hideLoading();

        if (data === "Invalid credentials") {
            // Add shake animation
            loginPass.classList.add('shake');
            errorDiv.textContent = "Invalid password! Please try again.";
            errorDiv.classList.add('show');

            // Remove shake animation after it completes
            setTimeout(() => {
                loginPass.classList.remove('shake');
            }, 600);

            // Clear password field
            loginPass.value = '';
            loginPass.focus();
        } else {
            const user = JSON.parse(data);
            // Store user info in session
            sessionStorage.setItem('userEmail', user.email);
            sessionStorage.setItem('userName', user.name);

            errorDiv.classList.remove('show');
            document.getElementById("login").style.display = "none";
            document.getElementById("register").style.display = "none";
            document.getElementById("profile").style.display = "block";

            document.getElementById("profileEmail").value = user.email;
            document.getElementById("profileName").value = user.name;
            document.getElementById("profilePhone").value = user.phone;
            showSuccess('Login successful!');
        }
    } catch (error) {
        hideLoading();
        alert('Login failed. Please try again.');
    }
}

async function updateProfile() {
    showLoading();
    const params = new URLSearchParams({
        action: "update",
        email: document.getElementById("profileEmail").value,
        name: document.getElementById("profileName").value,
        phone: document.getElementById("profilePhone").value
    });

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: params });
        const data = await response.text();
        hideLoading();
        showSuccess('Profile updated successfully!');
    } catch (error) {
        hideLoading();
        alert('Update failed. Please try again.');
    }
}

function toggleAuth(show) {
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    const loginPass = document.getElementById('loginPass');

    loginError.classList.remove('show');
    registerError.classList.remove('show');
    loginPass.classList.remove('shake');

    document.getElementById("regEmail").classList.remove('error-shake');
    document.getElementById("regPhone").classList.remove('error-shake');

    if (show === 'login') {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';

        // Reset captcha and terms state
        document.getElementById('loginTermsCheck').checked = false;
        document.getElementById('loginCaptchaSection').style.display = 'none';
        document.getElementById('loginBtn').disabled = true;
        document.getElementById('loginCaptchaInput').value = '';
    } else {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';

        // Reset captcha and terms state
        document.getElementById('termsCheck').checked = false;
        document.getElementById('captchaSection').style.display = 'none';
        document.getElementById('registerBtn').disabled = true;
        document.getElementById('captchaInput').value = '';
    }
}

function logout() {
    // Clear session storage
    sessionStorage.clear();
    document.getElementById('profile').style.display = 'none';
    document.getElementById('register').style.display = 'block';
    // Clear form fields
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPass').value = '';
}

function toggleAuthForms() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const loginText = document.querySelector('.text.login');
    const signupText = document.querySelector('.text.signup');
    const formsContainer = document.getElementById('formsContainer');

    toggleBtn.classList.toggle('signup');

    if (toggleBtn.classList.contains('signup')) {
        loginText.classList.remove('active');
        signupText.classList.add('active');
        formsContainer.classList.add('flip');
    } else {
        loginText.classList.add('active');
        signupText.classList.remove('active');
        formsContainer.classList.remove('flip');
    }
}

// Initialize active state
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.text.login').classList.add('active');
});
