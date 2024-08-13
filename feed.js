  // Function to toggle settings bar visibility
        function toggleSettingsBar() {
            var settingsBar = document.getElementById('settingsBar');
            if (settingsBar.style.display === 'none' || settingsBar.style.display === '') {
                settingsBar.style.display = 'flex';
            } else {
                settingsBar.style.display = 'none';
            }
        }

        // Slideshow functionality
        var currentSlide = 0;
        var slides = document.querySelectorAll('#slideshow .slide');

        function nextSlide() {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'block';
        }

        function finishSlideshow() {
            document.getElementById('slideshow').style.display = 'none';
        }

        // Function to toggle theme
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }

        // Function stubs for other actions
        function showCreateOptions() {
            var options = document.getElementById('createOptions');
            options.style.display = options.style.display === 'none' ? 'flex' : 'none';
        }

        function createPost(type) {
            alert('Create a ' + type + ' post');
        }

        function showComments(button) {
            alert('Show comments for this post');
        }

        function heartbreakPost(button) {
            var countSpan = button.querySelector('.heartbreak-count');
            var count = parseInt(countSpan.textContent);
            countSpan.textContent = count + 1;
        }

        function sharePost(button) {
            alert('Share this post');
        }

        function searchUser() {
            var input = document.getElementById('searchUserInput').value;
            alert('Search for: ' + input);
        }

        function showScreenManagement() {
            alert('Show screen management options');
        }

        function showExercises() {
            alert('Show exercises');
        }

        function setScreenTimeLimit() {
            alert('Set daily screen time limit');
        }

        function togglePositiveContent() {
            var button = document.getElementById('togglePositiveContentBtn');
            button.textContent = button.textContent.includes('Enable') ? 'Disable Positive Content' : 'Enable Positive Content';
        }