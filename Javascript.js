// ===== JAVASCRIPT FILE: script.js =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initTypingAnimation();
    initParallaxEffect();
    initFormValidation();
    initLoadingScreen();
    initActiveNavigation();
    initProjectHover();
    initSkillAnimation();
    initDiscordLink(); // Added Discord functionality
});

// ===== DISCORD FUNCTIONALITY =====
function initDiscordLink() {
    // Cari tombol Discord di project overlay
    const discordButton = document.querySelector('.project-overlay .overlay-btn .fa-discord');
    
    if (discordButton) {
        const parentButton = discordButton.parentElement;
        
        // Tambahkan event listener untuk klik
        parentButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ganti URL ini dengan link Discord server Anda yang sebenarnya
            const discordURL = 'https://discord.gg/ftPx8T3ACw';
            
            // Buka di tab baru
            window.open(discordURL, '_blank');
            
            // Tampilkan notifikasi
            showNotification('Opening Discord Server...', 'info');
        });
        
        // Tambahkan efek hover khusus untuk Discord button
        parentButton.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)';
            this.style.transform = 'scale(1.1)';
        });
        
        parentButton.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'scale(1)';
        });
        
        // Tambahkan cursor pointer dan tooltip
        parentButton.style.cursor = 'pointer';
        parentButton.title = 'Join our Discord Server';
    }
    
    // Event delegation untuk handling yang lebih robust
    document.addEventListener('click', function(e) {
        // Cek apakah yang diklik adalah tombol Discord
        if (e.target.classList.contains('fa-discord') || 
            (e.target.classList.contains('overlay-btn') && e.target.querySelector('.fa-discord'))) {
            
            e.preventDefault();
            e.stopPropagation();
            
            // Ganti dengan link Discord server Anda yang sebenarnya
            const discordURL = 'https://discord.gg/your-server-invite-code';
            
            // Buka di tab baru
            window.open(discordURL, '_blank');
            
            // Tampilkan notifikasi
            showNotification('Redirecting to Discord...', 'success');
        }
    });
}

// Fungsi helper untuk mengatur Discord link
function setDiscordLink(inviteCode) {
    const discordButtons = document.querySelectorAll('.fa-discord');
    const discordURL = `https://discord.gg/${inviteCode}`;
    
    discordButtons.forEach(button => {
        const parentButton = button.parentElement;
        parentButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(discordURL, '_blank');
            showNotification('Opening Discord Server...', 'info');
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = [
        '.stat-item',
        '.skill-category',
        '.project-card',
        '.contact-item'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });

    // Special animations for about section
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText && aboutImage) {
        aboutText.classList.add('slide-in-left');
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutText);
        observer.observe(aboutImage);
    }
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 500);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.classList.add('typing-complete');
        }
    }, speed);
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        // Navbar background opacity
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const opacity = Math.min(scrolled / 100, 0.95);
            navbar.style.background = `rgba(255, 255, 255, ${opacity * 0.1})`;
        }
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const subject = form.querySelector('input[type="text"]:nth-of-type(2)');
            const message = form.querySelector('textarea');
            const submitBtn = form.querySelector('.btn');
            
            // Validate fields
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    showNotification('Message sent successfully!', 'success');
                }, 2000);
            }, 1500);
        });
    }
}

function validateForm(name, email, message) {
    let isValid = true;
    
    // Remove existing error styles
    [name, email, message].forEach(field => {
        field.style.borderColor = '';
    });
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showFieldError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }, 3000);
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const current = getCurrentSection(sections);
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function getCurrentSection(sections) {
    const scrollPos = window.pageYOffset + 100;
    
    for (let section of sections) {
        const top = section.getBoundingClientRect().top + window.pageYOffset;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
            return section.id;
        }
    }
    return 'home';
}

// ===== PROJECT HOVER EFFECTS =====
function initProjectHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Project overlay buttons
    const overlayBtns = document.querySelectorAll('.overlay-btn');
    overlayBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            createRipple(this, e);
        });
    });
}

// ===== SKILL ANIMATION =====
function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            
            // Add particle effect
            createParticles(this);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function createRipple(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createParticles(element) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = rect.left + Math.random() * rect.width + 'px';
        particle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${-50 - Math.random() * 50}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.addEventListener('finish', () => {
            particle.remove();
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .typing-complete {
        border-right: 2px solid var(--accent-color);
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: var(--accent-color); }
    }
    
    .nav-link.active {
        color: var(--accent-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* Discord button specific styles */
    .overlay-btn:has(.fa-discord) {
        transition: all 0.3s ease;
    }
    
    .overlay-btn:has(.fa-discord):hover {
        background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%) !important;
        transform: scale(1.1) !important;
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // This will be called at most once every 16ms (60fps)
}, 16));

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation support
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 4000);
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== CONTOH PENGGUNAAN DISCORD LINK =====
// Uncomment dan ganti dengan invite code Discord Anda yang sebenarnya
// setDiscordLink('AbC123XyZ');