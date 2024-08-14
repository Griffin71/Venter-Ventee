  // function scrollToTop() {
       //     window.scrollTo({ top: 0, behavior: 'smooth' });
       // }

      //  function scrollToBottom() {
      //      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      //  }

        function toggleButton() {
            const checkbox = document.getElementById('terms');
            const button = document.getElementById('continueButton');
            if (checkbox.checked) {
                button.style.pointerEvents = 'auto';
                button.style.opacity = '1';
            } else {
                button.style.pointerEvents = 'none';
                button.style.opacity = '0.5';
            }
        }