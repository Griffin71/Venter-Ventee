document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var review = document.getElementById('review').value;
    var rating = document.querySelector('input[name="star"]:checked').value;
    var date = new Date().toLocaleDateString();

    var reviewData = {
        name: name,
        review: review,
        rating: rating,
        date: date
    };

    // Save the review data to LocalStorage
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    displayReviews();
    document.getElementById('reviewForm').reset();
});

function displayReviews() {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    var reviewsContainer = document.getElementById('reviews');
    
    // Clear existing reviews
    reviewsContainer.innerHTML = '';

    // Add the heading once
    if (reviews.length > 0) {
        reviewsContainer.innerHTML += `<center><h2>Comments...</h2></center>`;
    }

    reviews.forEach(function(review) {
        var reviewHTML = `
            <div class="review" id="review-${review.date}">
                <p><strong>Name:</strong> ${review.name}</p>
                <p><strong>Review:</strong> ${review.review}</p>
                <p><strong>Rating:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p class="date"><strong>Date:</strong> ${review.date}</p>
                <div class="reply" id="reply-${review.date}">
                    <!-- Developer replies will go here -->
                </div>
                <button onclick="editReview('${review.date}')">Edit Review</button>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHTML;
    });
}

// Function to edit a review
function editReview(reviewDate) {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    var review = reviews.find(r => r.date === reviewDate);

    if (review) {
        document.getElementById('name').value = review.name;
        document.getElementById('review').value = review.review;
        document.querySelector(`input[name="star"][value="${review.rating}"]`).checked = true;
        
        // Remove the old review
        reviews = reviews.filter(r => r.date !== reviewDate);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        displayReviews();
    }
}

// Function to add a reply from the developer
function addReply(reviewDate, replyText) {
    var replyContainer = document.getElementById(`reply-${reviewDate}`);
    var replyHTML = `
        <p><strong>venter-ventee dev <span class="verified">✔️</span>:</strong> ${replyText}</p>
    `;
    replyContainer.innerHTML += replyHTML;
}
function addReply(reviewDate, replyText) {
    fetch(`/reviews/${reviewDate}/reply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ replyText: replyText })
    }).then(response => {
        if (response.ok) {
            displayReviews();
        }
    }).catch(error => {
        console.error('Error adding reply:', error);
    });
}


document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var review = document.getElementById('review').value;
    var rating = document.querySelector('input[name="star"]:checked').value;
    var date = new Date().toLocaleDateString();

    var reviewData = {
        name: name,
        review: review,
        rating: rating,
        date: date
    };

    try {
        await fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });
        displayReviews();
        document.getElementById('reviewForm').reset();
    } catch (error) {
        console.error('Error submitting review:', error);
    }
});

function editReview(reviewDate) {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    var review = reviews.find(r => r.date === reviewDate);

    if (review) {
        document.getElementById('name').value = review.name;
        document.getElementById('review').value = review.review;
        document.querySelector(`input[name="star"][value="${review.rating}"]`).checked = true;
        
        // Update the review on the server
        fetch(`/reviews/${reviewDate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: review.name, review: review.review, rating: review.rating })
        }).then(response => {
            if (response.ok) {
                displayReviews();
            }
        });
    }
}



// Display the reviews on page load
displayReviews();
