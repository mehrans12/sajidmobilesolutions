// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
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

// Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !service || !message) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Create WhatsApp message
    const whatsappNumber = '923183312203'; // WhatsApp number without + sign
    const whatsappMessage = `Hello, I am ${name}. My email is ${email}. My phone number is ${phone}. I need help with: ${service}. Message: ${message}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show success message
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Redirecting to WhatsApp...';
    submitBtn.style.background = '#25d366';
    
    // Log form data
    console.log('Form Submitted:', {
        name,
        email,
        phone,
        service,
        message
    });
    
    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Reset button and form
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        form.reset();
    }, 500);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and team members
document.querySelectorAll('.service-card, .team-member, .info-item').forEach(element => {
    observer.observe(element);
});

// Navbar Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color);
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images (if needed in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-in-out';
});

// Service Card Click Handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h4').textContent;
        console.log('Service selected:', title);
        // You can add more functionality here, like opening a modal or redirecting to a service page
    });
});

// CTA Button Click Handler
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

console.log('Sajid Mobile Solutions Website Loaded Successfully! 🎉');
