// ========================================
// BASRA Barbershop - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Loader
    // ========================================
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Fallback: hide loader after 3 seconds even if load event doesn't fire
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 3000);

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ========================================
    // Smooth Scroll for Navigation
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Fade In Animation on Scroll
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Copy to Clipboard for Contact Info
    // ========================================
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get the text content from contact details
            const contactDetails = this.querySelector('.contact-details p');
            if (contactDetails) {
                const textToCopy = contactDetails.textContent.trim();
                
                // Copy to clipboard
                navigator.clipboard.writeText(textToCopy).then(function() {
                    // Show feedback (optional toast or visual feedback)
                    showToast('Copied to clipboard: ' + textToCopy);
                }).catch(function(err) {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    // Toast notification function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-gold);
            color: var(--primary-black);
            padding: 12px 25px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }

    // ========================================
    // Phone Click Tracking (Analytics)
    // ========================================
    const ctaButton = document.querySelector('.cta-button');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked:', this.getAttribute('href'));
        });
    });

    // ========================================
    // Scroll Progress Indicator (Optional)
    // ========================================
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-gold);
        width: 0%;
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ========================================
    // Parallax Effect for Hero (Optional)
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
        }
    });

    // ========================================
    // Add hover sound effect (Optional - disabled by default)
    // ========================================
    // Uncomment below to enable hover sounds
    /*
    const hoverSound = new Audio('path/to/hover-sound.mp3');
    
    document.querySelectorAll('.about-card, .review-card, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play().catch(() => {});
        });
    });
    */

    // ========================================
    // Lazy Loading for Images
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ========================================
    // Keyboard Accessibility
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // ========================================
    // Reduce Motion for Accessibility
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Remove animations for users who prefer reduced motion
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        
        document.querySelector('.loader').style.display = 'none';
    }

    // ========================================
    // Initialize - Trigger scroll once to set initial state
    // ========================================
    window.dispatchEvent(new Event('scroll'));
});