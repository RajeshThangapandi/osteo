// ===========================
// STICKY NAVIGATION
// ===========================
const stickyNav = document.getElementById('stickyNav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow on scroll
    if (scrollTop > 100) {
        stickyNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        stickyNav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = stickyNav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// FAQ ACCORDION
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================
const heroBookingForm = document.getElementById('heroBookingForm');

// Handle hero booking form
if (heroBookingForm) {
    heroBookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleFormSubmission(heroBookingForm);
    });
}

async function handleFormSubmission(form) {
    // Get form values from hero form
    const formData = {
        name: document.getElementById('hero-name').value,
        phone: document.getElementById('hero-phone').value,
        location: document.getElementById('hero-location').value,
        message: document.getElementById('hero-message').value
    };

    // Basic validation
    if (!formData.name || !formData.phone || !formData.location) {
        alert('Please fill in all required fields marked with *');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful submission
        await simulateFormSubmission(formData);

        // Show success message
        alert('Thank you! Your consultation request has been received. Our team will contact you within 24 hours.');

        // Reset form
        form.reset();

        // Track conversion (if you have analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Consultation',
                'event_label': 'Hero Form'
            });
        }

    } catch (error) {
        console.error('Form submission error:', error);
        alert('Sorry, there was an error submitting your request. Please call us directly at +91 78999 03943');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 1500);
    });
}

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.treatment-card, .symptom-card, .doctor-card, .story-card, .option-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 100000) {
        return (num / 100000).toFixed(0) + ' LAKHS +';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + ',000 +';
    }
    return num.toString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const numberMatch = text.match(/[\d,]+/);

            if (numberMatch) {
                const number = parseInt(numberMatch[0].replace(/,/g, ''));
                entry.target.classList.add('animated');

                // Determine the actual target based on the text
                let target = number;
                if (text.includes('LAKHS')) {
                    target = number * 100000;
                }

                animateCounter(statNumber, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===========================
// PHONE NUMBER FORMATTING
// ===========================
const heroPhoneInput = document.getElementById('hero-phone');

if (heroPhoneInput) {
    heroPhoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// ===========================
// WHATSAPP INTEGRATION
// ===========================
function openWhatsApp(phone, message = '') {
    const encodedMessage = encodeURIComponent(message || 'Hi, I would like to book a consultation for osteoarthritis treatment.');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Add WhatsApp click handlers if needed
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = link.href.match(/\d+/)[0];
        openWhatsApp(phone);
    });
});

// ===========================
// CALL TRACKING
// ===========================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track phone calls if you have analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_call', {
                'event_category': 'Contact',
                'event_label': link.href
            });
        }
    });
});

// ===========================
// LAZY LOADING IMAGES (if you add images later)
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}



// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🏥 Osteoarthritis Treatment Landing Page', 'color: #0066CC; font-size: 20px; font-weight: bold;');
console.log('%cFor support, contact: +91 78999 03943', 'color: #00A896; font-size: 14px;');

// ===========================
// PAGE LOAD PERFORMANCE
// ===========================
window.addEventListener('load', () => {
    // Hide loading spinner if you have one
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Log page load time
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

/* ===========================
   VIDEO MODAL FUNCTIONALITY
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeBtn = document.querySelector('.close-modal');
    const videoCards = document.querySelectorAll('.video-card');

    if (videoModal && videoCards.length > 0) {
        
        // Open Modal
        videoCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get URL from href
                const url = this.getAttribute('href');
                let videoId = '';
                
                // Extract ID from youtube.com/watch?v=ID
                if (url.includes('youtube.com/watch?v=')) {
                    videoId = url.split('v=')[1];
                    const ampersandPos = videoId.indexOf('&');
                    if (ampersandPos !== -1) {
                        videoId = videoId.substring(0, ampersandPos);
                    }
                } 
                // Extract ID from youtu.be/ID
                else if (url.includes('youtu.be/')) {
                    videoId = url.split('youtu.be/')[1];
                }

                if (videoId) {
                    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    
                    // Show modal
                    videoModal.style.display = 'flex';
                    // Trigger reflow
                    videoModal.offsetHeight;
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        // Close Modal Function
        const closeModal = () => {
            videoModal.classList.remove('active');
            setTimeout(() => {
                videoModal.style.display = 'none';
                videoPlayer.src = ''; // Stop video
                document.body.style.overflow = '';
            }, 300); // Match transition duration
        };

        // Close events
        closeBtn.addEventListener('click', closeModal);
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

/* ===========================
   CONSULTATION MODAL FUNCTIONALITY
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('consultationModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const consultationForm = document.getElementById('consultationForm');
    
    // Get all CTA buttons (Book Appointment, Book Consultation, etc.)
    const ctaButtons = document.querySelectorAll('a[href="#book-now"], .btn-primary, .cta-button, a[href*="book"]');
    
    // Open modal function
    function openModal(e) {
        // Check if it's a link that should open modal
        const href = e.currentTarget.getAttribute('href');
        if (href && (href === '#book-now' || href.includes('book') || e.currentTarget.classList.contains('btn-primary'))) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        consultationForm.reset();
    }
    
    // Attach click handlers to all CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Close modal on close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle form submission
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you! We will contact you shortly.');
        
        // Close modal
        closeModal();
        
        // Here you can add actual form submission logic
        // e.g., send to your backend API
    });
});
