document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5s simulated loading

    // 2. Sticky Navbar & Active Menu Link
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger i');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            hamburgerIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            hamburgerIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerIcon.classList.replace('bx-x', 'bx-menu');
        });
    });

    // 4. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                if (entry.target.classList.contains('skill-category') || 
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('cert-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                        entry.target.classList.remove('hidden');
                    }, index * 100);
                } else {
                    entry.target.classList.add('show');
                    entry.target.classList.remove('hidden');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
    
    // Select specific grid children for staggered animation
    const gridItems = document.querySelectorAll('.skills-grid > div, .projects-grid > div, .certs-grid > div');
    gridItems.forEach(el => {
        el.classList.add('hidden'); // Ensure they have hidden class initially
        observer.observe(el);
    });

    // 5. Initial Hero Animation
    // We remove .hidden from hero immediately after load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if(heroContent) {
            heroContent.classList.add('show');
            heroContent.classList.remove('hidden');
        }
    }, 1600);
});
