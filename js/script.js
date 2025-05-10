document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');

    // Simulate loading time (remove this in production)
    setTimeout(() => {
        loader.classList.add('fade-out');
        // Enable scrolling
        document.body.style.overflow = 'auto';

        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000); // Adjust time as needed
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        // Enable scrolling
        document.body.style.overflow = 'auto';

        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Matrix Cyberpunk Background Effect
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!?><~';
    const matrixContainer = document.querySelector('.matrix-characters');

    function createMatrixCharacter() {
        const character = document.createElement('div');
        character.className = 'matrix-character';
        character.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        character.style.left = `${Math.random() * 100}%`;
        character.style.animationDuration = `${Math.random() * 5 + 3}s`;
        matrixContainer.appendChild(character);

        setTimeout(() => {
            character.remove();
        }, 8000);
    }

    setInterval(createMatrixCharacter, 100);

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Glitch animation for terminal
    function runTerminalGlitch() {
        const terminal = document.querySelector('.terminal');
        if (terminal) {
            setTimeout(() => {
                terminal.style.opacity = '0.8';
                setTimeout(() => {
                    terminal.style.opacity = '1';
                    setTimeout(() => {
                        terminal.style.opacity = '0.9';
                        setTimeout(() => {
                            terminal.style.opacity = '1';
                        }, 50);
                    }, 100);
                }, 50);
            }, 3000);
        }
    }

    setInterval(runTerminalGlitch, 10000);

    // Animated text typing effect
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    });

    // Animate elements on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.project-card, .skill-item, .section-title, .contact-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const submitBtn = form.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');

            try {
                // Show loading state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';

                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Show success state
                    btnText.textContent = 'Submitted!';
                    submitBtn.classList.add('success');

                    // Reset form
                    form.reset();

                    // Reset button state after 3 seconds
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error(result.message || 'Something went wrong!');
                }
            } catch (error) {
                console.error('Error:', error);
                btnText.textContent = 'Error! Try Again';
                submitBtn.classList.add('error');

                // Reset error state after 3 seconds
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.classList.remove('error');
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Generate glitch effects
    function createGlitchEffect() {
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-glitch');
            if (heroTitle) {
                heroTitle.style.textShadow = '2px 2px 0px var(--neon-red), -2px -2px 0px var(--neon-blue)';

                setTimeout(() => {
                    heroTitle.style.textShadow = '-2px -2px 0px var(--neon-red), 2px 2px 0px var(--neon-blue)';

                    setTimeout(() => {
                        heroTitle.style.textShadow = '2px 2px 0px var(--neon-blue), -2px -2px 0px var(--neon-red)';
                    }, 100);
                }, 100);
            }
        }, 3000);
    }

    setInterval(createGlitchEffect, 5000);

    // Map popup functionality
    const locationTrigger = document.querySelector('.location-trigger');
    const mapPopup = document.querySelector('.map-popup');
    const mapClose = document.querySelector('.map-close');

    locationTrigger.addEventListener('click', () => {
        mapPopup.classList.add('active');
        document.querySelector('.overlay').classList.add('active');
    });

    mapClose.addEventListener('click', () => {
        mapPopup.classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    });

    // Close map when clicking overlay
    document.querySelector('.overlay').addEventListener('click', () => {
        mapPopup.classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    });

    // Close map with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mapPopup.classList.contains('active')) {
            mapPopup.classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        }
    });

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const responseMsg = document.getElementById('newsletterResponse');
    const submitBtn = document.querySelector('.newsletter-btn');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const emailInput = form.querySelector('.newsletter-input');
            const submitBtn = form.querySelector('.newsletter-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            // Show loading state
            submitBtn.classList.add('loading');
            btnText.textContent = 'Subscribing...';
            btnIcon.style.display = 'none';

            const scriptURL = 'https://script.google.com/macros/s/AKfycbyL4Gt01t4ZhjCW27vdq1pQdN9HNl97NIH3PPWyxU61UrC3Qf3GiOjABzKbK5GIjVhh/exec';

            try {
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `email=${encodeURIComponent(emailInput.value)}`
                });

                if (response.ok) {
                    // Show success state
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    btnText.textContent = 'Subscribed!';
                    emailInput.value = '';

                    // Show success checkmark animation
                    showSuccessAnimation();

                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        btnText.textContent = 'Subscribe';
                        btnIcon.style.display = 'inline-block';
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Show error state
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('error');
                btnText.textContent = 'Error! Try again';

                setTimeout(() => {
                    submitBtn.classList.remove('error');
                    btnText.textContent = 'Subscribe';
                    btnIcon.style.display = 'inline-block';
                }, 3000);
            }
        });

        function showSuccessAnimation() {
            const successAnim = document.createElement('div');
            successAnim.className = 'success-animation';
            document.body.appendChild(successAnim);

            setTimeout(() => {
                successAnim.remove();
            }, 2000);
        }
    }

    // Profile Modal Functionality
    function openProfileModal() {
        const modal = document.getElementById('profileModal');
        const frame = document.getElementById('profileFrame');

        // Load the profile page
        frame.src = 'profile.html';

        // Show the modal
        modal.style.display = 'block';

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    function closeProfileModal() {
        const modal = document.getElementById('profileModal');
        const frame = document.getElementById('profileFrame');

        // Clear the iframe src
        frame.src = '';

        // Hide the modal
        modal.style.display = 'none';

        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    const profileModal = document.getElementById('profileModal');
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            closeProfileModal();
        }
    });

    // Add this to handle messages from the iframe
    window.addEventListener('message', function (event) {
        if (event.data === 'authSuccess') {
            // Close the modal after successful auth
            closeProfileModal();
            // Optionally refresh the page or update UI
            location.reload();
        }
    });

    // Login Form Handling
    function handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Here you would typically validate against your backend
        // For demo purposes, we'll just do a simple check
        if (email && password) {
            // Show success message
            document.querySelector('.success-checkmark').style.display = 'block';

            // Wait for 1 second before redirecting
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            alert('Please fill in all fields');
        }
    }
});
