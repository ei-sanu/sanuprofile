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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.classList.add('loading');

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    submitBtn.classList.remove('loading');
                    contactForm.reset();

                    // Show success checkmark
                    const checkmark = document.querySelector('.success-checkmark');
                    checkmark.classList.add('show');

                    // Remove checkmark after animation
                    setTimeout(() => {
                        checkmark.classList.remove('show');
                    }, 2500);
                } else {
                    submitBtn.classList.remove('loading');
                    alert('Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.classList.remove('loading');
                alert('An error occurred. Please try again later.');
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
});
