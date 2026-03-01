// Sunshine Coaching Center JavaScript

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const demoForm = document.getElementById('demo-form-element');

// Mobile Menu Toggle
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// Form Handling
if (demoForm) {
    demoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(demoForm);
        const data = Object.fromEntries(formData);
        
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(data.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Show loading state
        const submitButton = demoForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Booking...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Redirect to WhatsApp
            const message = `Hello, I'm ${data.parent_name}. My child ${data.student_name} is in class ${data.class}. I'd like to book a demo class for ${data.subject_interest || 'all subjects'}.`;
            const whatsappUrl = `https://wa.me/919892130056?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showMessage('Demo class booked successfully! Redirecting to WhatsApp...', 'success');
            
            // Reset form
            demoForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error booking your demo class. Please try again or call us directly.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Contact Form Handling (for contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(data.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Redirect to WhatsApp
            const message = `Hello, I'm ${data.parent_name}. My child ${data.student_name} is in class ${data.class}. ${data.message || 'I would like to enquire about coaching classes.'}`;
            const whatsappUrl = `https://wa.me/919892130056?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            showMessage('Enquiry sent successfully! Redirecting to WhatsApp...', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your enquiry. Please try again or call us directly.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Testimonial Slider (for reviews page)
const testimonials = [
    {
        name: "Parent of Class 10 Student",
        rating: 5,
        text: "My daughter's confidence in Mathematics has improved tremendously after joining Sunshine Coaching Center. The personal attention she receives is remarkable.",
        location: "Silvassa Local Parent"
    },
    {
        name: "Class 12 Science Student",
        rating: 5,
        text: "The teachers here make complex concepts so simple to understand. I scored 95% in my board exams thanks to their guidance.",
        location: "Sunshine Coaching Student"
    },
    {
        name: "Parent of Class 9 Student",
        rating: 5,
        text: "The personalized attention my son receives has helped him improve from 60% to 85% in just 6 months. Highly recommended!",
        location: "Amli Industrial Estate Resident"
    },
    {
        name: "Class 11 Commerce Student",
        rating: 5,
        text: "The commerce coaching here is excellent. The teachers explain concepts with real-life examples which makes learning interesting.",
        location: "Sunshine Coaching Student"
    },
    {
        name: "Parent of Class 8 Student",
        rating: 5,
        text: "Best coaching classes in Silvassa! My child loves attending classes here and his performance has improved significantly.",
        location: "Silvassa Parent"
    }
];

let currentTestimonial = 0;
const testimonialContainer = document.getElementById('testimonial-container');

if (testimonialContainer) {
    function displayTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        const stars = '⭐'.repeat(testimonial.rating);
        
        testimonialContainer.innerHTML = `
            <div class="review-card bg-white rounded-lg shadow-lg p-8">
                <div class="flex items-center mb-4">
                    <div class="text-yellow-500 text-xl mr-2">${stars}</div>
                    <div class="font-semibold text-gray-800">${testimonial.name}</div>
                </div>
                <p class="text-gray-600 mb-4 text-lg">"${testimonial.text}"</p>
                <div class="text-sm text-gray-500">- ${testimonial.location}</div>
            </div>
        `;
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        displayTestimonial();
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        displayTestimonial();
    }
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
    
    // Display initial testimonial
    displayTestimonial();
    
    // Navigation buttons
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
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

// Observe elements for animation
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Phone Number Formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
});

// Utility Functions
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Insert after the form
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms[forms.length - 1].parentNode.insertBefore(messageDiv, forms[forms.length - 1].nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }
}

// Google Analytics Event Tracking (if GA is installed)
function trackEvent(category, action, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track button clicks
document.querySelectorAll('.cta-button, .cta-button-primary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('CTA', 'click', buttonText);
    });
});

// Track phone calls
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('Contact', 'phone_call', this.href.replace('tel:', ''));
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('Contact', 'whatsapp', 'whatsapp_click');
    });
});

// Track form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const formId = this.id || 'unknown_form';
        trackEvent('Form', 'submit', formId);
    });
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Page Load Performance
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Track page load time
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            'name': 'page_load',
            'value': loadTime
        });
    }
});

// Local SEO: Update page title with location
function updatePageTitle() {
    const currentPage = window.location.pathname.split('/').pop();
    const location = 'Silvassa';
    
    let newTitle = 'Sunshine Coaching Center - Best Coaching Classes in ' + location;
    
    switch(currentPage) {
        case 'about.html':
            newTitle = 'About Us - Best Coaching Institute in ' + location + ' | Sunshine Coaching Center';
            break;
        case 'courses.html':
            newTitle = 'Courses - CBSE Coaching Classes in ' + location + ' | Sunshine Coaching Center';
            break;
        case 'reviews.html':
            newTitle = 'Reviews - Parent & Student Testimonials in ' + location + ' | Sunshine Coaching Center';
            break;
        case 'contact.html':
            newTitle = 'Contact - Admission Enquiry in ' + location + ' | Sunshine Coaching Center';
            break;
        default:
            newTitle = 'Best Coaching Classes in ' + location + ' | CBSE Tuition 7th-12th | Sunshine Coaching Center';
    }
    
    document.title = newTitle;
}

// Update page title on load
updatePageTitle();

// Console Welcome Message
console.log(`
🌟 Welcome to Sunshine Coaching Center Website! 🌟

📍 Location: Silvassa, Amli Industrial Estate
📞 Contact: 98921 30056
🌐 Website: https://sunshinecoachingcenter.com

This website is optimized for Local SEO in Silvassa.
Best Coaching Classes for CBSE Students (Std 7th-12th)
`);