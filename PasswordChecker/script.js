// Password Strength Checker
const passwordInput = document.getElementById("passwordInput");
const strengthMeter = document.getElementById("strengthMeter");
const strengthText = document.getElementById("strengthText");

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    updateStrengthMeter(strength);
});

function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 12) score += 2;
    if (/[A-Z]/.test(password)) score += 2;
    if (/[a-z]/.test(password)) score += 2;
    if (/\d/.test(password)) score += 2;
    if (/[\W_]/.test(password)) score += 2;

    return score;
}

function updateStrengthMeter(score) {
    strengthMeter.style.width = score * 10 + "%";

    if (score <= 4) {
        strengthMeter.style.background = "red";
        strengthText.textContent = "Very Weak (Crack: Seconds)";
    } else if (score <= 6) {
        strengthMeter.style.background = "orange";
        strengthText.textContent = "Weak (Crack: Hours)";
    } else if (score <= 8) {
        strengthMeter.style.background = "yellow";
        strengthText.textContent = "Good (Crack: Months)";
    } else {
        strengthMeter.style.background = "green";
        strengthText.textContent = "Strong (Crack: Centuries)";
    }
}

// Show/Hide Password
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", function () {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Generate Strong Password
const generatePasswordBtn = document.getElementById("generatePassword");
const generatedPassword = document.getElementById("generatedPassword");

generatePasswordBtn.addEventListener("click", function () {
    const password = generateStrongPassword();
    generatedPassword.value = password;
});

function generateStrongPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

// Copy to Clipboard
const copyPasswordBtn = document.getElementById("copyPassword");
copyPasswordBtn.addEventListener("click", function () {
    generatedPassword.select();
    document.execCommand("copy");
    alert("Password copied!");
});
