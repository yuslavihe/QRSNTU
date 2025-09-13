import { animate, inView } from "https://esm.run/framer-motion";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            // Animate hamburger menu
            const spans = mobileMenuButton.querySelectorAll('span');
            if (mobileMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'rotate(0deg) translateY(0px)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg) translateY(0px)';
            } else {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const spans = mobileMenuButton.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0deg) translateY(0px)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0deg) translateY(0px)';
                }
            }
        });
    });

    // Animated elements on scroll
    const animatedElements = document.querySelectorAll('.project-card, .quick-link-card');

    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        inView(el, () => {
            animate(
                el,
                {
                    opacity: 1,
                    y: 0
                },
                {
                    duration: 0.6,
                    delay: (index % 4) * 0.1,
                    ease: "easeOut"
                }
            );
        }, {
            once: true,
            margin: "-80px 0px"
        });
    });

    // Hero section parallax effect (subtle)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Add loading animation to cards
    const cards = document.querySelectorAll('.project-card, .quick-link-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            animate(
                card,
                {
                    scale: 1.02,
                    y: -4
                },
                {
                    duration: 0.3,
                    ease: "easeOut"
                }
            );
        });

        card.addEventListener('mouseleave', () => {
            animate(
                card,
                {
                    scale: 1,
                    y: 0
                },
                {
                    duration: 0.3,
                    ease: "easeOut"
                }
            );
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Animate section title
                const title = entry.target.querySelector('.section-title');
                if (title) {
                    animate(
                        title,
                        {
                            opacity: [0, 1],
                            y: [20, 0]
                        },
                        {
                            duration: 0.8,
                            ease: "easeOut"
                        }
                    );
                }

                // Animate section subtitle
                const subtitle = entry.target.querySelector('.section-subtitle');
                if (subtitle) {
                    animate(
                        subtitle,
                        {
                            opacity: [0, 1],
                            y: [20, 0]
                        },
                        {
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut"
                        }
                    );
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            animate(
                button,
                {
                    scale: 1.05
                },
                {
                    duration: 0.2,
                    ease: "easeOut"
                }
            );
        });

        button.addEventListener('mouseleave', () => {
            animate(
                button,
                {
                    scale: 1
                },
                {
                    duration: 0.2,
                    ease: "easeOut"
                }
            );
        });
    });

    // Card link hover effects
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const arrow = link.querySelector('::after') || link;
            animate(
                arrow,
                {
                    x: 4
                },
                {
                    duration: 0.2,
                    ease: "easeOut"
                }
            );
        });

        link.addEventListener('mouseleave', () => {
            const arrow = link.querySelector('::after') || link;
            animate(
                arrow,
                {
                    x: 0
                },
                {
                    duration: 0.2,
                    ease: "easeOut"
                }
            );
        });
    });

    // Performance optimization: reduce animations on slow devices
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            animate(
                heroContent,
                {
                    opacity: [0, 1],
                    y: [30, 0]
                },
                {
                    duration: 1,
                    ease: "easeOut"
                }
            );
        }
    });
});