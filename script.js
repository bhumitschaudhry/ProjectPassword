const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordOutput = document.getElementById('passwordOutput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let characterSet = '';
    
    if (includeUppercase.checked) characterSet += uppercaseChars;
    if (includeLowercase.checked) characterSet += lowercaseChars;
    if (includeNumbers.checked) characterSet += numberChars;
    if (includeSymbols.checked) characterSet += symbolChars;
    
    if (characterSet === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }
    
    passwordOutput.value = password;
}

function copyToClipboard() {
    if (!passwordOutput.value) {
        return;
    }
    
    passwordOutput.select();
    passwordOutput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        showNotification();
    }).catch(() => {
        document.execCommand('copy');
        showNotification();
    });
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

generatePassword();
