// Function to toggle the search bar visibility
function toggleSearchBar() {
    const searchBarContainer = document.getElementById('searchBarContainer');
    searchBarContainer.style.display = searchBarContainer.style.display === 'none' ? 'block' : 'none';
}
// Example implementation of toggleSettingsBar function
function toggleSettingsBar() {
    const settingsBar = document.getElementById('settingsBar');
    settingsBar.style.display = settingsBar.style.display === 'none' ? 'block' : 'none';
}

// Example implementation of toggleTheme function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// You need to implement the other functions similarly
// Function to create a new post
function createPost(type) {
    // Implementation for creating a post based on type (text, photo, live)
}

// Function to show create options
function showCreateOptions() {
    const createOptions = document.getElementById('createOptions');
    createOptions.style.display = createOptions.style.display === 'none' ? 'block' : 'none';
}

// Function to heart-break a post
function heartbreakPost(button) {
    // Implementation for heart-breaking a post
}

// Function to show comments
function showComments(button) {
    // Implementation for showing comments
}

// Function to share a post
function sharePost(button) {
    // Implementation for sharing a post
}

// Function to toggle positive content
function togglePositiveContent() {
    // Implementation for toggling positive content
}


// Function to handle search and display results
async function search(query, type) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length === 0) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    try {
        // Make API request to search based on type
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&type=${type}`);
        const data = await response.json();
        
        if (data.length === 0) {
            resultsContainer.innerHTML = 'No results found.';
        } else {
            resultsContainer.innerHTML = data.map(item => {
                switch (type) {
                    case 'people':
                        return `
                            <div class="search-result">
                                <img src="${item.profilePicture || 'default_profile.png'}" alt="${item.username}" class="search-profile-pic">
                                <span class="search-username">${item.username}</span>
                                ${item.verified ? '<span class="verified-badge">✔️</span>' : ''}
                            </div>
                        `;
                    case 'photos':
                        return `
                            <div class="search-result">
                                <img src="${item.photoUrl}" alt="Photo" class="search-photo">
                            </div>
                        `;
                    case 'videos':
                        return `
                            <div class="search-result">
                                <video controls class="search-video">
                                    <source src="${item.videoUrl}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        `;
                    case 'posts':
                        return `
                            <div class="search-result">
                                <p><strong>${item.username}</strong>: ${item.content}</p>
                            </div>
                        `;
                    default:
                        return '';
                }
            }).join('');
        }
    } catch (error) {
        console.error('Error fetching search data:', error);
        resultsContainer.innerHTML = 'An error occurred. Please try again later.';
    }
}

// Event handler for search input
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    const type = document.querySelector('input[name="searchType"]:checked').value; // Assuming radio buttons for type
    search(query, type);
});

// Function to load user data
async function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = 'sign-in.html'; // Redirect if not logged in
        return;
    }

    // Display user information
    document.getElementById('userProfilePic').src = user.profilePicture || 'default_profile.png';
    document.getElementById('username').textContent = user.username;

    // Fetch and display user's posts
    try {
        const response = await fetch(`/api/posts?userId=${user.id}`);
        const posts = await response.json();
        
        const feedContainer = document.querySelector('.feed');
        feedContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-header">
                    <img src="${user.profilePicture || 'default_profile.png'}" alt="User Profile" class="post-profile-pic">
                    <p><strong>${user.username}</strong> <span class="time-posted">${post.timePosted}</span></p>
                </div>
                <p>${post.content}</p>
                <div class="actions">
                    <button onclick="heartbreakPost(this)">Heartbreak <span class="heartbreak-count">${post.heartbreakCount}</span></button>
                    <button onclick="showComments(this)">Comments</button>
                    <button onclick="sharePost(this)">Share</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Call loadUserData on page load
document.addEventListener('DOMContentLoaded', loadUserData);

        }
