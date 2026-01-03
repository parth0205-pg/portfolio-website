document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 2. Contact Form Handling (Sends Email via Web3Forms) ---
    const form = document.getElementById('feedbackForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Change button text to indicate loading
            const submitButton = form.querySelector('button');
            const originalText = submitButton.innerText;
            submitButton.innerText = "Sending...";

            // Send data to Web3Forms API
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {

                    alert(`Thank you! Your feedback has been sent successfully.`);
                    form.reset();
                } else {

                    console.log(response);
                    alert("Something went wrong. Please try again.");
                }
            })
            .catch(error => {

                console.log(error);
                alert("Something went wrong with the internet connection.");
            })
            .finally(() => {

                submitButton.innerText = originalText;
            });
        });
    }

    // --- 3. Typing Text Animation ---
    const textElement = document.querySelector('.typing-text');
    const texts = ["Full Stack Developer", "BCA Student", "Java Enthusiast", "Tech Learner"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        if(textElement){
            textElement.textContent = letter;
        }
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }());
});

// --- 4. Auto-Scroll Certificates ---
    const slider = document.querySelector('.slider');
    
    if(slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Auto Scroll Function
        const autoScroll = () => {

            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Scroll to the next slide
                slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
            }
        };


        let scrollInterval = setInterval(autoScroll, 3000);

        
        slider.addEventListener('mouseover', () => clearInterval(scrollInterval));
        slider.addEventListener('touchstart', () => clearInterval(scrollInterval));

        
        slider.addEventListener('mouseout', () => {
            scrollInterval = setInterval(autoScroll, 3000);
        });
    }