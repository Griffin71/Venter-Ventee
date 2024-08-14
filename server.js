const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
const port = 3001; // Port number

// Path to the users and reviews file
const userFilePath = path.join(__dirname, 'users.json');
const reviewFilePath = path.join(__dirname, 'reviews.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files
app.use(express.static('public'));

// Route to handle sign-in
app.post('/sign-in', async (req, res) => {
    const { username, password, rememberMe } = req.body;
    
    try {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const user = users.find(user => user.username === username);

        if (user && await bcrypt.compare(password, user.password)) {
            // Set a cookie to remember the user if 'remember me' is checked
            if (rememberMe) {
                res.cookie('username', username, { maxAge: 86400000, httpOnly: true }); // 1 day
            } else {
                res.cookie('username', '', { maxAge: 0 }); // Delete cookie
            }
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Route to handle sign-up
app.post('/sign-up', async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;
    
    // Validate passwords
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    try {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const existingUser = users.find(user => user.email === email || user.username === username);

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email or username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { firstName, lastName, username, email, password: hashedPassword, bio: '', ventersCount: 0, venteesCount: 0 };
        users.push(newUser);
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf-8');

        res.json({ success: true, message: 'Sign up successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Route for serving the Feed page
app.get('/feed', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feed.html'));
});

// Route for serving the Box page
app.get('/box', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'box.html'));
});

// Route for serving the Profile page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Route to get user profile data
app.get('/api/profile', (req, res) => {
    const { username } = req.query; // Get username from query params

    try {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const user = users.find(user => user.username === username);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile.' });
    }
});

// Route to update user bio
app.post('/api/update-bio', (req, res) => {
    const { username, bio } = req.body;

    try {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex > -1) {
            users[userIndex].bio = bio;
            fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf-8');
            res.json({ success: true, message: 'Bio updated successfully!' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error updating bio:', error);
        res.status(500).json({ message: 'Error updating bio.' });
    }
});

// Handle forgot password requests
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    // Logic to handle password reset email
    res.json({ message: 'Password reset link has been sent to your email.' });
});

// API route to get search results
app.get('/api/search', async (req, res) => {
    const { query, type } = req.query;

    try {
        // Mocked search data, replace with real database queries
        const data = {
            people: [
                { username: 'john_doe', profilePicture: 'john_profile.png', verified: true },
                // Add more mock data if needed
            ],
            photos: [
                { photoUrl: 'photo1.png' },
                // Add more mock data if needed
            ],
            videos: [
                { videoUrl: 'video1.mp4' },
                // Add more mock data if needed
            ],
            posts: [
                { username: 'john_doe', content: 'This is a post content.' },
                // Add more mock data if needed
            ]
        };

        res.json(data[type] || []);
    } catch (error) {
        console.error('Error handling search:', error);
        res.status(500).json({ message: 'Error handling search.' });
    }
});

// Route to get user posts
app.get('/api/posts', async (req, res) => {
    const { userId } = req.query;

    try {
        // Mocked user posts, replace with real database queries
        const posts = [
            { id: 1, username: 'john_doe', content: 'This is a sample post.', timePosted: 'Just now', heartbreakCount: 0 },
            // Add more mock posts if needed
        ];

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



