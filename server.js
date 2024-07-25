const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;
const USERS_FILE = './users.json';
const MOOD_LOGS_FILE = './mood_logs.json';

app.use(bodyParser.json());
app.use(cors());

// Helper function to read users from file
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper function to write users to file
const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Endpoint to handle sign-up requests
app.post('/signup', (req, res) => {
  const { firstName, lastName, username, age, contactMethod, email, phoneNumber, password } = req.body;
  const users = readUsersFromFile();

  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already taken' });
  }

  // Create new user object
  const newUser = { firstName, lastName, username, age, contactMethod, email, phoneNumber, password };
  users.push(newUser);

  // Write updated users array back to file
  writeUsersToFile(users);

  res.status(201).json({ success: true, message: 'Sign up successful' });
});

// Endpoint to handle sign-in requests
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();

  // Find user in users array based on username and password
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid username or password' });
  }

  res.status(200).json({ success: true, message: 'Login successful', username });
});

// Endpoint to handle forgot password requests (placeholder for real implementation)
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const users = readUsersFromFile();

  // Find user based on email (in real implementation, would send password reset email)
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Email not found' });
  }

  res.status(200).json({ success: true, message: 'Password reset email sent' });
});

// Function to add a reply from the developer
app.post('/add-reply', (req, res) => {
  const { reviewDate, replyText } = req.body;
  const reviews = JSON.parse(fs.readFileSync('./reviews.json'));
  const reviewIndex = reviews.findIndex(review => review.date === reviewDate);
  if (reviewIndex === -1) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }

  reviews[reviewIndex].reply = replyText;

  fs.writeFileSync('./reviews.json', JSON.stringify(reviews, null, 2));

  res.status(200).json({ success: true, message: 'Reply added successfully' });
});

// Endpoint to handle mood log submissions
app.post('/mood-log', (req, res) => {
  const { username, mood, highlight, bother } = req.body;
  const moodLogs = JSON.parse(fs.readFileSync(MOOD_LOGS_FILE, 'utf8') || '[]');
  const newLog = { username, mood, highlight, bother, date: new Date().toISOString() };
  moodLogs.push(newLog);
  fs.writeFileSync(MOOD_LOGS_FILE, JSON.stringify(moodLogs, null, 2));
  res.status(201).json({ success: true, message: 'Mood log saved successfully' });
});

// Endpoint to get user details by username
app.get('/api/user/:username', (req, res) => {
  const username = req.params.username;
  const users = readUsersFromFile();
  const user = users.find(user => user.username === username);

  if (user) {
    res.json({ success: true, username: user.username });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


