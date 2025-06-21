// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Script starting...');
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenu && navUl) {
        mobileMenu.addEventListener('click', () => {
            navUl.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Krishna Image Section Enhancement
    const krishnaSection = document.querySelector('.krishna-image-section');
    
    if (krishnaSection) {
        // Add parallax effect to Krishna image
        const krishnaImage = krishnaSection.querySelector('.krishna-image');
        
        // Ensure image is visible and loaded
        if (krishnaImage) {
            console.log('Krishna image found:', krishnaImage.src);
            
            krishnaImage.addEventListener('load', function() {
                console.log('Krishna image loaded successfully');
                this.style.opacity = '1';
            });
            
            krishnaImage.addEventListener('error', function() {
                console.log('Krishna image failed to load, trying fallback');
                this.src = 'images/krishna-cow.jpg';
            });
            
            // Parallax effect
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                krishnaImage.style.transform = `translateY(${rate}px)`;
            });
        }
        
        // Add fade-in animation when page loads
        krishnaSection.style.opacity = '0';
        
        window.addEventListener('load', function() {
            krishnaSection.style.transition = 'opacity 1s ease-in-out';
            krishnaSection.style.opacity = '1';
        });
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.count');
    let counted = false;
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounting, 30);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counting when about section is in view
    const aboutSection = document.querySelector('.about-section');
    
    function checkIfInView() {
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isInView = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (isInView && !counted) {
            counted = true;
            startCounting();
        }
    }
    
    // Check if about section is in view on scroll
    window.addEventListener('scroll', checkIfInView);
    // Also check on initial load
    checkIfInView();
    
    // FAQ Accordion - Simplified and working version
    console.log('Initializing FAQ...');
    
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('Found FAQ items:', faqItems.length);
        
        if (faqItems.length === 0) {
            console.error('No FAQ items found!');
            return;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            console.log(`Setting up FAQ item ${index + 1}:`, question ? 'Question found' : 'No question', answer ? 'Answer found' : 'No answer');
            
            if (question && answer) {
                // Remove any existing listeners
                question.replaceWith(question.cloneNode(true));
                
                // Get the new element after cloning
                const newQuestion = item.querySelector('.faq-question');
                
                newQuestion.addEventListener('click', function(e) {
                    console.log(`FAQ ${index + 1} clicked!`);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close all other FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current FAQ
                    const isActive = item.classList.contains('active');
                    if (isActive) {
                        item.classList.remove('active');
                        console.log(`FAQ ${index + 1} closed`);
                    } else {
                        item.classList.add('active');
                        console.log(`FAQ ${index + 1} opened`);
                    }
                });
                
                // Add visual feedback
                newQuestion.style.transition = 'all 0.3s ease';
                newQuestion.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#f8f9fa';
                });
                
                newQuestion.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                });
                
                console.log(`FAQ item ${index + 1} initialized successfully`);
            } else {
                console.error(`FAQ item ${index + 1} missing question or answer element`);
            }
        });
        
        console.log('FAQ initialization completed');
    }
    
    // Initialize FAQ immediately and also after a short delay
    initializeFAQ();
    setTimeout(initializeFAQ, 1000);
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Show success message (in a real application, this would happen after successful AJAX call)
            alert('आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a, .footer-links ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // टेस्टिमोनियल स्लाइडर
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        if (testimonialSlides.length === 0) return;
        
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        
        currentTestimonial = index;
        if (currentTestimonial >= testimonialSlides.length) currentTestimonial = 0;
        if (currentTestimonial < 0) currentTestimonial = testimonialSlides.length - 1;
        
        testimonialSlides[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }
    
    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }
    
    if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', prevTestimonial);
    if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', nextTestimonial);
    
    // Auto change testimonials
    setInterval(nextTestimonial, 7000);
    
    // AOS (Animate on Scroll) like functionality
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
    
    // Donation Amount Selector
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const customAmountInput = document.getElementById('customAmount');
    
    if (donationAmounts.length > 0) {
        donationAmounts.forEach(amount => {
            amount.addEventListener('click', function() {
                donationAmounts.forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                if (customAmountInput) {
                    if (this.getAttribute('data-custom') === 'true') {
                        customAmountInput.style.display = 'block';
                        customAmountInput.focus();
                    } else {
                        customAmountInput.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // Nav menu active state based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksForHighlight = document.querySelectorAll('nav ul li a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksForHighlight.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Check on initial load
    
    console.log('Script initialization completed');
});