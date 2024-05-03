const terminalContent = document.getElementById('terminal-content');
const terminalInput = document.getElementById('terminal-input');
const prompt = document.getElementById('prompt');
let state = 'account'; // Tracks current state: account, password1, password2
let firstPassword = '';

function updateInputWidth() {
    const promptWidth = prompt.offsetWidth;
    terminalInput.style.width = `calc(100% - ${promptWidth + 20}px)`;
}

// Call this function after setting the prompt text
prompt.textContent = 'CodeSphere@register/enter your account name:~$ ';
updateInputWidth();

// Password validation function
function isValidPassword(password) {
    let errors = [];
    if (password.length <= 8) errors.push("Password must be more than 8 characters long.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special symbol.");
    return errors.length === 0 ? [true, "Password is valid."] : [false, errors];
}

function handleInput(event) {
    if (event.key === 'Enter') {
        const input = terminalInput.value.trim();
        terminalInput.value = '';
        processCommand(input);
    }
}

function processCommand(input) {
    terminalContent.textContent += '\n' + prompt.textContent + input;

    if (state === 'account') {
        // Proceed to password input
        prompt.textContent = 'CodeSphere@register/enter your password:~$ ';
        state = 'password1';
    } else if (state === 'password1') {
        const [isValid, message] = isValidPassword(input);
        if (isValid) {
            firstPassword = input;
            prompt.textContent = 'CodeSphere@register/enter your password again:~$ ';
            state = 'password2';
        } else {
            terminalContent.textContent += '\nInvalid password:';
            message.forEach(error => terminalContent.textContent += '\n - ' + error);
            prompt.textContent = 'CodeSphere@register/enter your password:~$ ';
        }
    } else if (state === 'password2') {
        if (input === firstPassword) {
            window.location.href = '/homePage';
        } else {
            terminalContent.textContent += '\nPasswords do not match, please enter your password again.';
            prompt.textContent = 'CodeSphere@register/enter your password again:~$ ';
        }
    }
    terminalContent.textContent += '\n' + prompt.textContent;
}

// Initialize terminal with the first prompt
terminalContent.textContent = 'Welcome to CodeSphere, feel free to discuss anything here\nenter "new" to create an account\n';
terminalContent.textContent += prompt.textContent;
