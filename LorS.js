// Function to sign in a user
async function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[type="checkbox"]').checked;

    try {
        const response = await fetch('http://localhost:3001/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, rememberMe })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = 'feed.html'; // Redirect to feed page
        } else {
            alert(data.message || 'Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('sign-in-form');
    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            signIn();
        });
    }
});

// Function to open forgot password modal
function openForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Function to close forgot password modal
function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}

// Event listener for the reset password button
document.getElementById('resetPasswordButton').addEventListener('click', () => {
    const email = document.getElementById('resetEmail').value;

    fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeForgotPasswordModal();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
