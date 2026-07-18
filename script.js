// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Select Room function for buttons
window.selectRoom = function(roomType) {
    const select = document.getElementById('room-selection');
    if (select) {
        select.value = roomType;
    }
};

// Booking Form Mock
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingMessage.classList.remove('hidden');
        setTimeout(() => {
            bookingMessage.classList.add('hidden');
            bookingForm.reset();
        }, 3000);
    });
}

// Contact Form Mock
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactMessage.classList.remove('hidden');
        setTimeout(() => {
            contactMessage.classList.add('hidden');
            contactForm.reset();
        }, 3000);
    });
}

// Scroll Animation Observer (Fade In)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Wait for DOM to load, then add fade-in class to major sections
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToFade = document.querySelectorAll('.fade-in, .section-header, .card, .amenity-item, .gallery-img, .about-text, .about-image, .booking-info, .booking-form, .contact-info, .contact-form');
    sectionsToFade.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Map interaction
const mapContainer = document.getElementById('map-container');
if (mapContainer) {
    mapContainer.addEventListener('click', () => {
        mapContainer.classList.add('active');
    });
    
    // Disable map interaction again if mouse leaves (so scrolling isn't trapped)
    mapContainer.addEventListener('mouseleave', () => {
        mapContainer.classList.remove('active');
    });
}

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.lightbox-close');
const prevLightbox = document.querySelector('.lightbox-prev');
const nextLightbox = document.querySelector('.lightbox-next');
const galleryImages = document.querySelectorAll('.gallery-img');
let currentImageIndex = 0;

if (lightbox && lightboxImg && galleryImages) {
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.classList.add('show');
            lightboxImg.src = img.src;
            currentImageIndex = index;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    if (prevLightbox && nextLightbox) {
        prevLightbox.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex].src;
        });

        nextLightbox.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex].src;
        });
    }
}
