 const bcrypt = require('bcrypt');

async function resetPassword(email, token, newPassword) {
    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

    const user = users.find(user => user.email === email);
    if (!user) {
        console.error('User not found');
        return;
    }

    // Check if the token is valid and not expired
    if (user.resetToken === token && Date.now() < user.tokenExpiration) {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        delete user.resetToken;
        delete user.tokenExpiration;
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
        console.log('Password reset successfully');
    } else {
        console.error('Invalid or expired token');
    }
}
 function signIn() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify({ username: data.username }));
                    window.location.href = 'feed.html';
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function openForgotPasswordModal() {
            document.getElementById('forgotPasswordModal').style.display = 'block';
        }
		const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Path to the user.json file
const userFilePath = path.join(__dirname, 'user.json');

// Function to send reset link via email
function sendResetLink(email) {
    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

    const user = users.find(user => user.email === email);
    if (!user) {
        console.error('Email not found');
        return;
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token expiration time (1 hour)
    const tokenExpiration = Date.now() + 3600000;

    // Update user data with reset token and expiration
    user.resetToken = resetToken;
    user.tokenExpiration = tokenExpiration;
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

    // Create reset link
    const resetLink = `http://localhost:3001/reset.html?token=${resetToken}&email=${email}`;

    // Setup email transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your preferred email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password' // Your email password
        }
    });

    // Email options
    const mailOptions = {
        from: 'venterVentee@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetLink}`,
        html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    };


    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Password reset email sent:', info.response);
    });
}
		// Function to reset the password
function resetPassword(email, token, newPassword) {
    const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

    const user = users.find(user => user.email === email);
    if (!user) {
        console.error('User not found');
        return;
    }

    // Check if the token is valid and not expired
    if (user.resetToken === token && Date.now() < user.tokenExpiration) {
        // Update the user's password
        user.password = newPassword; // Ideally, hash the password before saving
        delete user.resetToken;
        delete user.tokenExpiration;
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
        console.log('Password reset successfully');
    } else {
        console.error('Invalid or expired token');
    }
}
sendResetLink('user@example.com');
// Assume newPassword is provided by the user via reset.html form
resetPassword('user@example.com', 'received-token-from-link', 'newPassword123');


        function closeForgotPasswordModal() {
            document.getElementById('forgotPasswordModal').style.display = 'none';
        }

        document.getElementById('resetPasswordButton').addEventListener('click', function() {
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

        document.getElementById('scrollButton').onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        document.getElementById('popBallButton').onclick = function() {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.style.top = Math.random() * window.innerHeight + 'px';
            ball.style.left = Math.random() * window.innerWidth + 'px';
            ball.innerText = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 10);
            document.body.appendChild(ball);

            setTimeout(() => {
                document.body.removeChild(ball);
            }, 5000);
        };