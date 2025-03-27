// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Pixel Companion with Logo Home Feature
document.addEventListener('DOMContentLoaded', function() {
    // Create main companion
    const pixelCompanion = document.createElement('div');
    pixelCompanion.id = 'pixel-companion';
    pixelCompanion.innerHTML = `
        <div class="pixel-body">
            <div class="pixel-face">^_^</div>
        </div>
    `;
    document.body.appendChild(pixelCompanion);
    
    // Find the logo in the header
    const logo = document.querySelector('.nav .logo');
    
    // State variables
    let mouseX = 0, mouseY = 0;
    let companionX = window.innerWidth / 2;
    let companionY = window.innerHeight / 2;
    let isAtHome = false;
    let isFollowingMouse = true;
    let isAnimatingToHome = false;
    let rotationDegrees = 0;
    let scaleValue = 1;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Make companion clickable
    pixelCompanion.style.pointerEvents = 'auto';
    pixelCompanion.style.cursor = 'pointer';
    
    // Toggle home state on click
    pixelCompanion.addEventListener('click', function() {
        if (isAtHome || isAnimatingToHome) {
            // Leave home
            isAtHome = false;
            isAnimatingToHome = false;
            isFollowingMouse = true;
            pixelCompanion.querySelector('.pixel-face').textContent = '^_^';
            pixelCompanion.querySelector('.pixel-body').style.transform = 'rotate(0deg) scale(1)';
            logo.classList.remove('active');
        } else {
            // Go to home
            isAnimatingToHome = true;
            isFollowingMouse = false;
            pixelCompanion.querySelector('.pixel-face').textContent = 'o_o';
            logo.classList.add('active');
            
            // Start rotation and scaling animation
            rotationDegrees = 0;
            scaleValue = 1;
        }
    });
    
    // Update position of companion
    function updatePosition() {
        if (isFollowingMouse) {
            // Calculate distance to target
            const dx = mouseX - companionX;
            const dy = mouseY - companionY;
            
            // Move a percentage of the distance (lower = slower)
            companionX += dx * 0.03;
            companionY += dy * 0.03;
            
            // Update position
            pixelCompanion.style.left = (companionX - 20) + 'px';
            pixelCompanion.style.top = (companionY - 20) + 'px';
            
            // Reset transform
            pixelCompanion.querySelector('.pixel-body').style.transform = 'rotate(0deg) scale(1)';
            
            // Change expression based on section
            const sections = ['hero', 'projects', 'team', 'contact'];
            sections.forEach(section => {
                const el = document.querySelector('.' + section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (mouseY >= rect.top && mouseY <= rect.bottom) {
                        const face = pixelCompanion.querySelector('.pixel-face');
                        if (face) {
                            face.textContent = 
                                section === 'hero' ? '^_^' :
                                section === 'projects' ? '>o<' :
                                section === 'team' ? 'ºmº' : '♥‿♥';
                        }
                    }
                }
            });
        } else if (isAnimatingToHome) {
            // Get logo position
            const logoRect = logo.getBoundingClientRect();
            const homeX = logoRect.left+logoRect.width/6+2;
            const homeY = logoRect.top + logoRect.height/2-0.5;
            
            // Calculate distance to logo
            const dx = homeX - companionX;
            const dy = homeY - companionY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Gradually slow down as we get closer for smoother animation
            const speedFactor = Math.min(0.1, distance / 500);
            
            // Move towards logo with easing
            companionX += dx * (0.05 + speedFactor);
            companionY += dy * (0.05 + speedFactor);
            
            // Update position
            pixelCompanion.style.left = (companionX - 20) + 'px';
            pixelCompanion.style.top = (companionY - 20) + 'px';
            
            // Rotate and scale as it gets closer
            rotationDegrees += 0;
            
            // Smooth scaling transition
            const targetScale = distance < 100 ? 0.5 : 1;
            scaleValue = scaleValue + (targetScale - scaleValue) * 0.1;
            
            // Apply rotation and scaling
            pixelCompanion.querySelector('.pixel-body').style.transform = 
                `rotate(${rotationDegrees % 360}deg) scale(${scaleValue})`;
            
            // If very close to logo, finish animation
            if (distance < 3) {
                isAnimatingToHome = false;
                isAtHome = true;
                pixelCompanion.querySelector('.pixel-face').textContent = 'z_z';
                
                // Final position exactly on the logo
                companionX = homeX;
                companionY = homeY;
                pixelCompanion.style.left = (companionX - 20) + 'px';
                pixelCompanion.style.top = (companionY - 20) + 'px';
                
                // Final transform
                pixelCompanion.querySelector('.pixel-body').style.transform = 
                    'rotate(45deg) scale(0.5)';
            }
        }
        
        requestAnimationFrame(updatePosition);
    }
    
    // Start the animation
    updatePosition();
    
    // Handle form submissions
    document.addEventListener('DOMContentLoaded', function() {
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const formValues = {};
                
                // Convert FormData to object
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                // Log form data (for demonstration)
                console.log('Contact form submitted:', formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                `;
                
                // Replace form with success message
                contactForm.parentNode.replaceChild(successMessage, contactForm);
            });
        }
    });
});