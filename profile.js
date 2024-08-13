window.onload = function() {
    const profilePicture = localStorage.getItem('profilePicture');
    const bio = localStorage.getItem('bio');
    const username = localStorage.getItem('username');
    const realName = localStorage.getItem('realName');
    const venters = JSON.parse(localStorage.getItem('venters')) || [];
    const ventees = JSON.parse(localStorage.getItem('ventees')) || [];

    // Set profile picture
    if (profilePicture) {
        document.getElementById('profilePicture').src = profilePicture;
        document.getElementById('viewProfilePictureBtn').style.display = 'inline-block';
        document.getElementById('removeProfilePictureBtn').style.display = 'inline-block';
    } else {
        document.getElementById('profilePicture').src = 'default_profile.png';
    }

    // Set bio
    document.getElementById('bio').textContent = bio || 'No bio available';

    // Set username
    document.getElementById('usernameDisplay').textContent = username || 'Username';

    // Set real name
    document.getElementById('realNameDisplay').textContent = realName || 'Real Name';

    // Set Venters (Followers) and Ventees (Following) counts
    document.getElementById('ventersCount').textContent = venters.length;
    document.getElementById('venteesCount').textContent = ventees.length;
};

// Update bio function
function updateBio() {
    const bioInput = document.getElementById('bioInput').value;
    if (bioInput.trim() !== '') {
        localStorage.setItem('bio', bioInput);
        document.getElementById('bio').textContent = bioInput;
        document.getElementById('bioInput').value = '';
    } else {
        alert('Please enter a valid bio.');
    }
}

// Open file input to change profile picture
function openProfilePictureInput() {
    document.getElementById('profilePictureInput').click();
}

// Upload and change profile picture
function uploadProfilePicture() {
    const fileInput = document.getElementById('profilePictureInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePictureSrc = e.target.result;
            document.getElementById('profilePicture').src = profilePictureSrc;
            localStorage.setItem('profilePicture', profilePictureSrc);
            document.getElementById('viewProfilePictureBtn').style.display = 'inline-block';
            document.getElementById('removeProfilePictureBtn').style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
}

// View full-size profile picture
function viewProfilePicture() {
    const profilePictureSrc = localStorage.getItem('profilePicture');
    if (profilePictureSrc) {
        window.open(profilePictureSrc, '_blank');
    }
}

// Remove profile picture and revert to default
function removeProfilePicture() {
    localStorage.removeItem('profilePicture');
    document.getElementById('profilePicture').src = 'default_profile.png';
    document.getElementById('viewProfilePictureBtn').style.display = 'none';
    document.getElementById('removeProfilePictureBtn').style.display = 'none';
}

// Toggle profile picture options
function toggleProfilePictureOptions() {
    const options = document.getElementById('profilePictureOptions');
    options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle settings modal visibility
function toggleSettingsBar() {
    const modal = document.getElementById('settingsModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// Close the settings modal
function closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'none';
}

// Submit a new post
function submitPost() {
    const postText = document.getElementById('postText').value;
    const postImage = document.getElementById('postImage').files[0];
    if (postText.trim() === '') {
        alert('Please enter some text to post.');
        return;
    }

    const postsContainer = document.getElementById('postsContainer');
    const newPost = document.createElement('div');
    newPost.classList.add('post');
    
    const postContent = `<p>${postText}</p>`;
    const imageContent = postImage ? `<img src="${URL.createObjectURL(postImage)}" alt="Post Image">` : '';
    
    newPost.innerHTML = `${postContent}${imageContent}`;
    
    postsContainer.prepend(newPost);

    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
    closePostDialog();
}

// Close the post dialog
function closePostDialog() {
    const dialog = document.getElementById('postDialog');
    dialog.style.display = 'none';
}

// Handle search functionality
function searchUser() {
    const searchInput = document.getElementById('searchUserInput').value.toLowerCase();
    if (searchInput === localStorage.getItem('username').toLowerCase()) {
        alert('User found: ' + localStorage.getItem('username'));
    } else {
        alert('User not found.');
    }
}

// Simulate a theme toggle (light/dark mode)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Show exercises (Placeholder function)
function showExercises() {
    alert('Show exercises placeholder.');
}

// Show screen management tools (Placeholder function)
function showScreenManagement() {
    alert('Show screen management tools placeholder.');
}
