// Function to sign up a user
async function signUp() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('Gmail').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, username, email, password, confirmPassword })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            window.location.href = 'feed.html'; // Redirect to feed page after successful sign-up
        } else {
            alert(data.message || 'Sign up failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to sign in a user
async function signIn() {
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    try {
        const response = await fetch('/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                rememberMe: rememberMe
            })
        });

        if (response.ok) {
            window.location.href = '/feed.html'; // Redirect on successful sign-in
        } else {
            const data = await response.json();
            alert(data.message || 'Sign in failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add event listener to sign-in form submit
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('sign-in-form');
    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            signIn();
        });
    }
});

// Function to toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(`eye-${inputId}`);

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.src = 'eyeopen.png'; // Update with your eye-open icon
    } else {
        input.type = 'password';
        eyeIcon.src = 'eyeclosed1.png'; // Update with your eye-closed icon
    }
}
