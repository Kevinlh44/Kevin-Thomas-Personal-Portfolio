document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Dynamic Footer Year ----
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ---- 2. Navbar Scroll Effect ----
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- 3. Mobile Menu Toggle ----
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle Menu
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.contains('active');
        if (isActive) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
        } else {
            navLinks.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="ph ph-x"></i>';
        }
    });

    // Close Menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
            }
        });
    });

    // ---- 4. Smooth Scrolling for Anchors ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- 5. Futuristic Reveal Animations (Intersection Observer) ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on dom hierarchy if it's a list item
                if(entry.target.classList.contains('reveal-stagger')) {
                    const delay = Math.random() * 0.3; // Add a slight chaotic futuristic delay
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                entry.target.classList.add('is-visible');
                // Unobserve so it stays visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        sectionObserver.observe(el);
    });
});
